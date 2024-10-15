const { Op } = require('sequelize');
const { ExerciseGuides, User } = require('../models');

class ExerciseGuidesController {

    async createExercise(req, res) {
        try {
            const { name, description, muscle_group, difficulty_level, video_url, image_url} = req.body;
            const adminId = req.user.id;
            const admin = await User.findByPk(adminId);
            if (!admin) {
                res.status(404).json({ message: 'Admin not found' });
            }
            const exercise = await ExerciseGuides.create({
                name,
                description,
                muscle_group,
                difficulty_level,
                video_url,
                image_url,
                admin_id: adminId,
            });
            res.status(201).json(exercise);

        } catch (error) {
            res.status(500).json({ message: 'Failed to create exercise', error });
        }

    }

    async getExercises(req, res) {
        try {
            const exercises = await ExerciseGuides.findAll(
                {
                    attributes: ['id', 'name', 'description', 'muscle_group', 'difficulty_level', 'video_url', 'image_url'],
                }
            );
            res.status(200).json(exercises);
        } catch (error) {
            console.error('Error retrieving exercises:', error);
            res.status(500).json({ error: 'Failed to retrieve exercises' });
        }
    }
    async getExercisesByNames(req, res) {
        try {
            const { names } = req.query;

            if (!names) {
                return res.status(400).json({ error: 'Tên bài tập không được bỏ trống' });
            }

            // Tách các tên bài tập dựa trên dấu phẩy hoặc khoảng trắng
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
                return res.status(404).json({ error: 'Không tìm thấy bài tập nào phù hợp' });
            }

            res.status(200).json(exercises);
        } catch (error) {
            console.error('Error retrieving exercises by names:', error);
            res.status(500).json({ error: 'Failed to retrieve exercises' });
        }
    }

}

module.exports = new ExerciseGuidesController();
