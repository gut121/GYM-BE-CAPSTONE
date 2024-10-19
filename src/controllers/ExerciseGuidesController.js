const { Op } = require('sequelize');
const { ExerciseGuides, User } = require('../models');

class ExerciseGuidesController {

    async getExercises(req, res) {
        try {
            const exercises = await ExerciseGuides.findAll(
                {
                    attributes: ['id', 'name', 'description', 'muscle_group', 'difficulty_level', 'video_url', 'image_url'],
                }
            );
            res.status(200).json({ success: true, data: exercises });
        } catch (error) {
            console.error('Error retrieving exercises:', error);
            res.status(500).json({ error: 'Failed to retrieve exercises' });
        }
    }
    async getExercisesByNames(req, res) {
        try {
            const { names } = req.query;

            if (!names) {
                return res.status(400).json({ error: 'Names parameter is required' });
            }

            const nameArray = names.split(',').map(name => name.trim());

            const exercises = await ExerciseGuides.findAll(
                {
                    where: {
                        name: {
                            [Op.or]: nameArray.map(name => ({
                                [Op.like]: `%${name}%`
                            }))
                        }
                    },
                    attributes: ['id', 'name', 'description', 'muscle_group', 'difficulty_level', 'video_url', 'image_url'],
                }
            );

            if (exercises.length === 0) {
                return res.status(404).json({ error: 'No exercises found with the given names' });
            }

            res.status(200).json({ success: true, data: exercises });
        } catch (error) {
            console.error('Error retrieving exercises by names:', error);
            res.status(500).json({ error: 'Failed to retrieve exercises' });
        }
    }
    async createExercise(req, res) {
        try {
            const { name, description, muscle_group, difficulty_level, video_url, image_url } = req.body;
            const { userId } = req.user;
            console.log('req', req.user);
            const admin = await User.findByPk(userId);
            if (!admin) {
                res.status(404).json({ success: false, message: 'Admin not found' });
            }
            const exercise = await ExerciseGuides.create({
                name,
                description,
                muscle_group,
                difficulty_level,
                video_url,
                image_url,
                admin_id: userId,
            });
            res.status(200).json({ success: true, data: exercise });

        } catch (error) {
            console.error('Error creating exercise:', error);
            res.status(500).json({ message: 'Failed to create exercise', error });
        }

    }

}

module.exports = new ExerciseGuidesController();
