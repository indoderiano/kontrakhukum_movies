'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {


    const actors = ['Ben Affleck', 'Mila Jovovic', 'Gal Gadot', 'Denzel Washington', 'Jared Leto', 'Bruce Willis']

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
