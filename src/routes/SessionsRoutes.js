const express = require('express');
const { SessionsController } = require('../controllers');
const { SessionsValidation } = require('../validation');
const authenticateJWT = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRole');
const { validate } = require('../middlewares/validate');
const router = express.Router();

router.post(
  '/create',
  validate(SessionsValidation.createSession),
  SessionsController.createSession
);
router.get('/', SessionsController.getSessions);
router.get(
  '/:id',
  validate(SessionsValidation.getSessionById),
  SessionsController.getSessionById
);
router.put(
  '/:id',
  authenticateJWT,
  checkRole(['trainer', 'client']),
  validate(SessionsValidation.updateSession),
  SessionsController.updateSession
);
router.delete(
  '/:id',
  validate(SessionsValidation.deleteSession),
  SessionsController.deleteSession
);

module.exports = router;
