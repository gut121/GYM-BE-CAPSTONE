const express = require('express');
const SessionsController = require('../controllers/SessionsController');
const SessionsValidation = require('../validation/SessionsValidation');
const router = express.Router();

router.post('/sessions',SessionsValidation.createSession, SessionsController.createSession);
router.get('/sessions', SessionsController.getSessions);
router.get('/:id',SessionsValidation.getSessionById ,SessionsController.getSessionById);
router.put('/sessions/:id', SessionsController.updateSession);
router.delete('/sessions/:id', SessionsController.deleteSession);

module.exports = router;