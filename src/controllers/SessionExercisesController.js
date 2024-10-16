const { Sessions, ExerciseGuides, SessionExercises } = require('../models');
class SessionExercisesController {
    async getAllSessionExercises(req, res) {
        try {
            const sessions = await Sessions.findAll({
                include: [
                    {
                        model: ExerciseGuides,
                        through: SessionExercises,
                    }
                ]
            });
            res.status(200).json({success: true, data: sessions });
        } catch (error) {
            console.error('Error fetching session exercises:', error);
            res.status(500).json({ error: 'Error fetching session exercises' });
        }
    }

    async getSessionExercisesBySessionId(req, res) {
        const { sessionId } = req.params;
        try {
            const session = await Sessions.findOne({
                where: { id: sessionId },
                include: [
                    {
                        model: ExerciseGuides,
                        through: SessionExercises,
                    }
                ]
            });

            if (!session) {
                return res.status(404).json({ error: 'Session not found' });
            }

            res.status(200).json({ success: true, data:session });
        } catch (error) {
            console.error('Error fetching session exercises:', error);
            res.status(500).json({ error: 'Error fetching session exercises' });
        }
    }

    async addExerciseToSession(req, res) {
        const { sessionId, exerciseId } = req.body;

        try {
            const session = await Sessions.findByPk(sessionId);
            const exerciseGuide = await ExerciseGuides.findByPk(exerciseId);

            if (!session || !exerciseGuide) {
                return res.status(404).json({ error: 'Session or Exercise not found' });
            }

            await SessionExercises.create({ session_id: sessionId, exercise_id: exerciseId });
            res.status(200).json({ message: 'Exercise added to session successfully' });
        } catch (error) {
            console.error('Error adding exercise to session:', error);
            res.status(500).json({ error: 'Error adding exercise to session' });
        }
    }

    // Remove exercise from session
    async removeExerciseFromSession(req, res) {
        const { sessionId, exerciseId } = req.body;

        try {
            const sessionExercise = await SessionExercises.findOne({
                where: {
                    session_id: sessionId,
                    exercise_id: exerciseId
                }
            });

            if (!sessionExercise) {
                return res.status(404).json({ error: 'Session or Exercise not found' });
            }

            await sessionExercise.destroy();
            res.status(200).json({ message: 'Exercise removed from session successfully' });
        } catch (error) {
            console.error('Error removing exercise from session:', error);
            res.status(500).json({ error: 'Error removing exercise from session' });
        }
    }

    // Update session status
    async updateSessionStatus(req, res) {
        const { sessionId } = req.params;
        const { status } = req.body;

        try {
            const session = await Sessions.findByPk(sessionId);

            if (!session) {
                return res.status(404).json({ error: 'Session not found' });
            }

            session.status = status;
            await session.save();

            res.status(200).json({ message: 'Session status updated successfully' });
        } catch (error) {
            console.error('Error updating session:', error);
            res.status(500).json({ error: 'Error updating session status' });
        }
    }
}

module.exports = new SessionExercisesController();
