const Movie = require('../models/movies');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const {
  NOT_FOUND_MOVIE_MSG,
  FORBIDDEN_MSG,
  VALIDATION_INVALID_MOVIE_DATA,
  VALIDATION_INVALID_MOVIE_ID,
  SUCCESS_MOVIE_DELETED,
} = require('../constants/messages');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.status(200).send(movies))
    .catch((err) => {
      next(err);
    });
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(VALIDATION_INVALID_MOVIE_DATA));
      }
      return next(err);
    });
};

module.exports.deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new NotFoundError(NOT_FOUND_MOVIE_MSG);
    })
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(FORBIDDEN_MSG);
      }
      return movie
        .remove()
        .then(() => res.status(200).send({ message: SUCCESS_MOVIE_DELETED }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError(VALIDATION_INVALID_MOVIE_ID));
      }
      return next(err);
    });
};
