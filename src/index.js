const { sequelize, MealPlans } = require('./models');
const express = require('express');
const cors = require('cors');
const createError = require('http-errors')
const { corsOptions } = require('./utils/corsOptions');
const PORT = process.env.PORT || 4000;
const TrainerRoutes = require('./routes/TrainerRoutes');
const ClientRoutes = require('./routes/ClientRoutes');
const AuthRoutes = require('./routes/AuthRoutes');
const ExerciseGuidesRoutes = require('./routes/ExerciseGuidesRoutes');
const SessionsRoutes = require('./routes/SessionsRoutes');
const SessionExercisesRoutes = require('./routes/SessionExercisesRoutes');
const WorkoutPlansRoutes = require('./routes/WorkoutPlansRoutes');
const MealPlansRoutes = require('./routes/MealPlansRoutes');
const WeeklySchedulesRoutes = require('./routes/WeeklySchedulesRoutes');
const ReviewRoutes = require('./routes/ReviewsRoutes');
const AdminRoutes = require('./routes/AdminRoutes');
const morgan = require('morgan');
const { limiter } = require('./utils/rateLimiter');

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));
app.use(limiter);
app.use('/api/auth', AuthRoutes);
app.use('/api/clients', ClientRoutes);
app.use('/api/trainers', TrainerRoutes);
app.use('/api/exercises', ExerciseGuidesRoutes);
app.use('/api/sessions', SessionsRoutes);
app.use('/api/sessions-exercises', SessionExercisesRoutes);
app.use('/api/workout-plans', WorkoutPlansRoutes);
app.use('/api/meal-plans', MealPlansRoutes);
app.use('/api/weekly-schedules', WeeklySchedulesRoutes);
app.use('/api/reviews', ReviewRoutes);
app.use('/api/admin', AdminRoutes);


app.use((req, res, next) => {
    next(createError.NotFound('This route does not exist'));
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            status: err.status || 500,
            message: err.message,

        },
    });
});

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
