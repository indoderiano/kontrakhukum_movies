'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [
      {
        MovieId: 6,
        ActorId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        MovieId: 2,
        ActorId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        MovieId: 2,
        ActorId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        MovieId: 8,
        ActorId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        MovieId: 15,
        ActorId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        MovieId: 15,
        ActorId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        MovieId: 16,
        ActorId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    await queryInterface.bulkInsert('ActorMovies', data, {})
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ActorMovies', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
