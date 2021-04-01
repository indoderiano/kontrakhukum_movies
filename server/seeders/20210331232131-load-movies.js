'use strict';
const axios = require('axios');
const { query } = require('express');

module.exports = {
  up: async (queryInterface, Sequelize) => {

  try{
    const {data} = await axios({
      url: 'https://api.themoviedb.org/3/movie/popular?api_key=62b1b0f81d7c7464682683d57d6241d6&language=en-US&page=1',
      method: 'GET'
    })

    // title: DataTypes.STRING,
    // overview: DataTypes.STRING,
    // poster_path: DataTypes.STRING,
    // release_date: DataTypes.STRING,
    // rate: DataTypes.INTEGER,
    // rate_count: DataTypes.INTEGER

    // console.log(data.results)
    // console.log(data.results.length)

    const loadData = data.results.map((item, index) => {
      return {
        id: index+1,
        title: item.original_title,
        overview: item.overview,
        poster_path: item.poster_path,
        release_date: item.release_date,
        rate: item.vote_average,
        rate_count: item.vote_count,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    await queryInterface.bulkInsert('Movies', loadData, {})

  }catch(err){
    console.log(err)
  }

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

    await queryInterface.bulkDelete('Movies', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
