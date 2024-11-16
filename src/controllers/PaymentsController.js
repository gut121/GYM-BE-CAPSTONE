const stripe = require('stripe')(
  'sk_test_51QJDfcFdsn2f4I4G6V89hIwEIk0JmneFswVilWyV1YYOQBY5i7mHirlXjgNcJPgxIpOyjD6Ev4TrhqIzjRBkk1Mi00lbTvsPJQ'
);
const { Payments } = require('../models');

const PaymentsController = {
  async createPaymentStripe(req, res) {
    try {
      const { client_id, trainer_id, amount, payment_method, description } =
        req.body;

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency: 'usd',
        payment_method_types: ['card'],
        description,
      });

      const payment = await Payments.create({
        client_id,
        trainer_id,
        amount,
        total_amount: amount,
        payment_method,
        transaction_id: paymentIntent.id,
        payment_date: new Date(),
      });

      res.status(201).json({
        message: 'Payment successfully created',
        payment,
        client_secret: paymentIntent.client_secret,
      });
    } catch (error) {
      console.error('Error creating payment:', error);
      res.status(500).json({ error: 'Failed to create payment' });
    }
  },

  async getPaymentById(req, res) {
    try {
      const { id } = req.params;

      const payment = await Payments.findByPk(id);

      if (!payment) {
        return res.status(404).json({ error: 'Payment not found' });
      }

      res.status(200).json(payment);
    } catch (error) {
      console.error('Error retrieving payment:', error);
      res.status(500).json({ error: 'Failed to retrieve payment' });
    }
  },

  // List all payments
  async listPayments(req, res) {
    try {
      const payments = await Payments.findAll();
      res.status(200).json(payments);
    } catch (error) {
      console.error('Error listing payments:', error);
      res.status(500).json({ error: 'Failed to list payments' });
    }
  },

  // Momo Payment
  async createMoMoPayment(req, res) {
    try {
      const { client_id, trainer_id, amount, description } = req.body;

      // Tạo orderId và requestId
      const orderId = config.partnerCode + new Date().getTime();
      const requestId = orderId;

      // Chuẩn bị rawSignature
      const rawSignature = `accessKey=${config.accessKey}&amount=${amount}&extraData=${config.extraData}&ipnUrl=${config.ipnUrl}&orderId=${orderId}&orderInfo=${config.orderInfo}&partnerCode=${config.partnerCode}&redirectUrl=${config.redirectUrl}&requestId=${requestId}&requestType=${config.requestType}`;
      const signature = crypto
        .createHmac('sha256', config.secretKey)
        .update(rawSignature)
        .digest('hex');

      // Tạo requestBody
      const requestBody = {
        partnerCode: config.partnerCode,
        partnerName: 'MoMoTest',
        storeId: 'MomoStore',
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: config.orderInfo,
        redirectUrl: config.redirectUrl,
        ipnUrl: config.ipnUrl,
        lang: config.lang,
        requestType: config.requestType,
        autoCapture: config.autoCapture,
        extraData: config.extraData,
        orderGroupId: config.orderGroupId,
        signature: signature,
      };

      // Gửi request đến MoMo
      const momoResponse = await axios.post(
        'https://test-payment.momo.vn/v2/gateway/api/create',
        requestBody,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (momoResponse.data.resultCode === 0) {
        // Lưu giao dịch vào cơ sở dữ liệu
        const payment = await Payments.create({
          client_id,
          trainer_id,
          amount,
          total_amount: amount,
          payment_method: 'MoMo',
          transaction_id: momoResponse.data.transId,
          payment_date: new Date(),
          description,
        });

        res.status(201).json({
          message: 'MoMo payment created successfully',
          payment,
          payUrl: momoResponse.data.payUrl, // URL để người dùng thanh toán
        });
      } else {
        res.status(400).json({
          message: 'Failed to create MoMo payment',
          details: momoResponse.data,
        });
      }
    } catch (error) {
      console.error('Error creating MoMo payment:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = PaymentsController;
