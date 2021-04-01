const express = require('express')
const {ControllerMovies} = require('../controllers/ControllerMovies')

const RouterMovies = express.Router()

RouterMovies.get('/movies', ControllerMovies.read)

module.exports={
    RouterMovies
}