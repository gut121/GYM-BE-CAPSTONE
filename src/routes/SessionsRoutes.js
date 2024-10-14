const express = require('express');
const SessionController = require('../controllers/SessionController');
const router = express.Router();


router.post('/', SessionController.createSession);
router.get('/', SessionController.getSessions);
router.put('/:id', SessionController.updateSession);
router.delete('/:id', SessionController.deleteSession);

module.exports = router;
