const { SessionExercises, ExerciseGuides, Sessions, sequelize } = require('../models');

class SessionExercisesController {
    
   
    async createSessionExercise(req, res) {
        const transaction = await sequelize.transaction();
        try {
            const { session_id, exercise_id, sets, reps } = req.body;

            
            const sessionExercise = await SessionExercises.create({
                session_id,
                exercise_id,
                sets,
                reps,
            }, { transaction });

           
            await transaction.commit();

            res.status(201).json({ sessionExercise });
        } catch (error) {
           
            await transaction.rollback();
            console.error('Error creating session exercise:', error);
            res.status(500).json({ error: 'Failed to create session exercise' });
        }
    }

   
    async getSessionExercises(req, res) {
        try {
            const { session_id } = req.params;

           
            const sessionExercises = await SessionExercises.findAll({
                where: { session_id },
                include: [
                    {
                        model: ExerciseGuides,
                        attributes: ['name', 'description', 'muscle_group', 'difficulty_level', 'video_url', 'image_url'],
                    },
                ],
            });

            res.status(200).json({ sessionExercises });
        } catch (error) {
            console.error('Error fetching session exercises:', error);
            res.status(500).json({ error: 'Failed to retrieve session exercises' });
        }
    }

   
    async updateSessionExercise(req, res) {
        try {
            const { id } = req.params;
            const { sets, reps } = req.body;

          
            const sessionExercise = await SessionExercises.findByPk(id);
            if (!sessionExercise) {
                return res.status(404).json({ error: 'Session exercise not found' });
            }

          
            sessionExercise.sets = sets || sessionExercise.sets;
            sessionExercise.reps = reps || sessionExercise.reps;
            await sessionExercise.save();

            res.status(200).json({ sessionExercise });
        } catch (error) {
            console.error('Error updating session exercise:', error);
            res.status(500).json({ error: 'Failed to update session exercise' });
        }
    }

 
    async deleteSessionExercise(req, res) {
        try {
            const { id } = req.params;

          
            const sessionExercise = await SessionExercises.findByPk(id);
            if (!sessionExercise) {
                return res.status(404).json({ error: 'Session exercise not found' });
            }

        
            await sessionExercise.destroy();
            res.status(200).json({ message: 'Session exercise deleted successfully' });
        } catch (error) {
            console.error('Error deleting session exercise:', error);
            res.status(500).json({ error: 'Failed to delete session exercise' });
        }
    }
}

module.exports = new SessionExercisesController();
