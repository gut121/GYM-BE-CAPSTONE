const { ExerciseGuides, User } = require('../models');

class ExerciseGuidesController {
 
    async createExercise(req, res) {
        try {
            const { name, description, muscle_group, difficulty_level, video_url, image_url } = req.body;
            const adminId = req.user.id;  
            
            const admin = await User.findByPk(adminId);
            if (!admin || admin.role !== 'admin') {
                return res.status(403).json({ error: 'Unauthorized, only admins can create exercises' });
            }

            const exercise = await ExerciseGuides.create({
                name,
                description,
                muscle_group,
                difficulty_level,
                video_url,
                image_url,
                created_by: adminId, 
            });

            res.status(201).json({ exercise });
        } catch (error) {
            console.error('Error creating exercise:', error);
            res.status(500).json({ error: 'Failed to create exercise' });
        }
    }

    
    async getExercises(req, res) {
        try {
            const exercises = await ExerciseGuides.findAll();
            res.status(200).json(exercises);
        } catch (error) {
            console.error('Error retrieving exercises:', error);
            res.status(500).json({ error: 'Failed to retrieve exercises' });
        }
    }

  
    async updateExercise(req, res) {
        try {
            const { id } = req.params;
            const { name, description, muscle_group, difficulty_level, video_url, image_url } = req.body;
            const adminId = req.user.id;  

         
            const admin = await User.findByPk(adminId);
            if (!admin || admin.role !== 'admin') {
                return res.status(403).json({ error: 'Unauthorized, only admins can update exercises' });
            }

            const exercise = await ExerciseGuides.findByPk(id);
            if (!exercise) {
                return res.status(404).json({ error: 'Exercise not found' });
            }

       
            exercise.name = name || exercise.name;
            exercise.description = description || exercise.description;
            exercise.muscle_group = muscle_group || exercise.muscle_group;
            exercise.difficulty_level = difficulty_level || exercise.difficulty_level;
            exercise.video_url = video_url || exercise.video_url;
            exercise.image_url = image_url || exercise.image_url;

            await exercise.save();
            res.status(200).json({ exercise });
        } catch (error) {
            console.error('Error updating exercise:', error);
            res.status(500).json({ error: 'Failed to update exercise' });
        }
    }

  
    async deleteExercise(req, res) {
        try {
            const { id } = req.params;
            const adminId = req.user.id;  

           
            const admin = await User.findByPk(adminId);
            if (!admin || admin.role !== 'admin') {
                return res.status(403).json({ error: 'Unauthorized, only admins can delete exercises' });
            }

            const exercise = await ExerciseGuides.findByPk(id);
            if (!exercise) {
                return res.status(404).json({ error: 'Exercise not found' });
            }

            await exercise.destroy();
            res.status(200).json({ message: 'Exercise deleted successfully' });
        } catch (error) {
            console.error('Error deleting exercise:', error);
            res.status(500).json({ error: 'Failed to delete exercise' });
        }
    }
}

module.exports = new ExerciseController();
