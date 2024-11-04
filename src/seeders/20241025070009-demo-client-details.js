'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ClientDetails', [
      {
        height: 175.0,
        weight: 70.5,
        media_url: 'image',
        physical_condition: 'Good physical health',
        client_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        height: 160.0,
        weight: 55.0,
        media_url: 'video',
        physical_condition: 'Recovering from surgery',
        client_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ClientDetails', null, {});
  },
};
