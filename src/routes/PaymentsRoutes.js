const express = require('express');
const { PaymentsController } = require('../controllers');
const router = express.Router();

router.post('/payments/stripe', PaymentsController.createPaymentStripe);
router.post('/payments/momo', PaymentsController.createMoMoPayment);
router.get('/payments', PaymentsController.listPayments);
router.get('/payments/:id', PaymentsController.getPaymentById);

module.exports = router;
