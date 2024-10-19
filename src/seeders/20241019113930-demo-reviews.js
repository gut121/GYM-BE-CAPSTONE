'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews', [
      {
        client_id: 1,
        trainer_id: 1,
        rating: 5,
        review: 'Excellent trainer, very professional and motivating.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        client_id: 2,
        trainer_id: 1,
        rating: 4,
        review: 'Good experience, but sometimes the schedule was hard to follow.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        client_id: 3,
        trainer_id: 2,
        rating: 5,
        review: 'Great yoga sessions, really helped with my flexibility.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        client_id: 4,
        trainer_id: 3,
        rating: 3,
        review: 'The trainer was okay, but I expected more personalized plans.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        client_id: 5,
        trainer_id: 2,
        rating: 4,
        review: 'Good trainer, helped me get stronger and more confident.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Reviews', null, {});
  }
};
