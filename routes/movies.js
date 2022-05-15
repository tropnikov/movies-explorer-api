const routes = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');
const { createMovieVld, deleteMovieVld } = require('../middlewares/validation');

routes.get('/', getMovies);
routes.post('/', createMovieVld, createMovie);
routes.delete('/:movieId', deleteMovieVld, deleteMovieById);

module.exports = routes;
