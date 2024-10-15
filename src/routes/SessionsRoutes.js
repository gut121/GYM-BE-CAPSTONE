const express = require('express');
const SessionsController = require('../controllers/SessionsController');
const router = express.Router();

router.post('/sessions', SessionsController.createSession);
router.get('/sessions', SessionsController.getSessions);
router.put('/sessions/:id', SessionsController.updateSession);
router.delete('/sessions/:id', SessionsController.deleteSession);

module.exports = router;