const { sequelize } = require('./models');
const express = require('express');
const PORT = process.env.PORT || 4000;
const TrainerRoutes = require('./routes/TrainerRoutes');
const ClientRoutes = require('./routes/ClientRoutes');
const AuthRoutes = require('./routes/AuthRoutes');
const WorkoutPlansRoutes = require('./routes/WorkoutPlansRoutes');
const WeeklySchedulesRoutes = require('./routes/WeeklySchedulesRoutes');
const MealPlanRoutes = require('./routes/MealPlanRoutes');
const SessionRoutes = require('./routes/SessionsRoutes');
const ExerciseGuidesRoutes = require('./routes/ExerciseGuidesRoutes');
const SessioneExerciseRoutes = require('./routes/SessionExercisesRoutes');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use('/api/auth', AuthRoutes);
app.use('/api/workoutplans', WorkoutPlansRoutes);
app.use('/api/weeklyschedules', WeeklySchedulesRoutes);
app.use('/api/meal-plans', MealPlanRoutes);
app.use('/api/clients', ClientRoutes);
app.use('/api/trainers', TrainerRoutes);
app.use('/api/sessions', SessionRoutes);
app.use('/api/session-exercises', SessioneExerciseRoutes);
app.use('/api/Exercise', ExerciseGuidesRoutes);


sequelize
    .sync()
    .then(() => {
        console.log('Database & tables created!');

        app.listen(PORT, () => {
            console.log(
                `Server is running on port ${PORT}`
            );
        });
    })
    .catch((error) => {
        console.error(
            'Unable to create database tables:',
            error
        );
    });
