const stripe = require('stripe')(
  'sk_test_51QJDfcFdsn2f4I4G6V89hIwEIk0JmneFswVilWyV1YYOQBY5i7mHirlXjgNcJPgxIpOyjD6Ev4TrhqIzjRBkk1Mi00lbTvsPJQ'
);
const { Payments } = require('../models');

const PaymentController = {
  async createPayment(req, res) {
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
};

module.exports = PaymentController;
