const express = require('express');
const { TrainerController } = require('../controllers');
const { TrainerValidation } = require('../validation');
const authenticateJWT = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRole'); 
const { validate } = require('../middlewares/validate'); 
const router = express.Router();

router.post(
  '/register',
  validate(TrainerValidation.register),
  TrainerController.register
);

router.get('/', TrainerController.getAllTrains);

router.get(
  '/:id',
  validate(TrainerValidation.getTrainerById),
  TrainerController.getTrainerById
);

router.put(
  '/update/:id',
  authenticateJWT,
  checkRole('trainer'),
  validate(TrainerValidation.updateTrainerProfile),
  TrainerController.updateTrainerProfile
);

router.delete(
  '/delete/:id',
  authenticateJWT,
  checkRole('admin'),
  validate(TrainerValidation.deleteTrainer),
  TrainerController.deleteTrainer
);
router.get(
  '/by-username',
  validate(TrainerValidation.getTrainerByUsername),
  TrainerController.getTrainerByUsername
);

router.get(
  '/by-specialties',
  validate(TrainerValidation.searchTrainersBySpecialties),
  TrainerController.searchTrainersBySpecialties
);
// Thống kê tiến độ tập luyện của Client
router.get(
  '/statistical-client',
  validate(TrainerValidation.getClientProgress),
  TrainerController.getClientProgress
);
//Thống kê sức khỏe của Client
router.get(
  '/statistical-health',
  validate(TrainerValidation.getClientHealthStats),
  TrainerController.getClientHealthStats
);
//Thống kê kế hoạch tập luyện của Client
router.get(
  '/statistical-plan',
  validate(TrainerValidation.getClientWorkoutPlans),
  TrainerController.getClientWorkoutPlans
)
//Thống kê đánh giá của Client
router.get(
  '/statistical-review',
  validate(TrainerValidation.getClientReviews),
  TrainerController.getClientReviews
)
module.exports = router;
