const mongoose = require('mongoose');
const validator = require('validator');
const { VALIDATION_INVALID_LINK } = require('../constants/messages');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return validator.isURL(link, {
          protocols: ['http', 'https'],
          require_protocol: true,
        });
      },
      message: VALIDATION_INVALID_LINK,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return validator.isURL(link, {
          protocols: ['http', 'https'],
          require_protocol: true,
        });
      },
      message: VALIDATION_INVALID_LINK,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return validator.isURL(link, {
          protocols: ['http', 'https'],
          require_protocol: true,
        });
      },
      message: VALIDATION_INVALID_LINK,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
