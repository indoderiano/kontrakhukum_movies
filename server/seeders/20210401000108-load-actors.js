'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {


    const actors = ['Ben Affleck', 'Mila Jovovic', 'Kate Beckinsale', 'Brad Pitt']

    const data = actors.map((item, index) => {
      return {
        id: index+1,
        name: item,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    await queryInterface.bulkInsert('Actors', data, {})

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Actors', null, {})
    
  }
};
