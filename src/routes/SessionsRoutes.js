const express = require('express');
const {SessionsController} = require('../controllers');
const {SessionsValidation} = require('../validation');
const router = express.Router();

router.post('/create',SessionsValidation.createSession, SessionsController.createSession);
router.get('/',SessionsController.getSessions);
router.get('/:id',SessionsValidation.getSessionById ,SessionsController.getSessionById);
router.put('/sessions/:id', SessionsController.updateSession);
router.delete('/sessions/:id', SessionsController.deleteSession);

module.exports = router;