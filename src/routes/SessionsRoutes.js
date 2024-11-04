const express = require('express');
const { SessionsController } = require('../controllers');
const { SessionsValidation } = require('../validation');
const authenticateJWT = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRole');
const router = express.Router();

router.post(
  '/create',
  SessionsValidation.createSession,
  SessionsController.createSession
);
router.get('/', SessionsController.getSessions);
router.get(
  '/:id',
  SessionsValidation.getSessionById,
  SessionsController.getSessionById
);
router.put(
  '/:id',
  authenticateJWT,
  checkRole(['trainer', 'client']),
  SessionsValidation.updateSession,
  SessionsController.updateSession
);
router.delete(
  '/:id',
  SessionsValidation.deleteSession,
  SessionsController.deleteSession
);

module.exports = router;
