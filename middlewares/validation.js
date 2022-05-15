const { celebrate, Joi } = require('celebrate');

const registerVld = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const loginVld = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const updateProfileVld = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const createMovieVld = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(/https?:\/\/(w{3}\.)?[-\w@:%.+~#=]+\.[\w()]+([-\w()@:%+.~#?&=/]*)/),
    trailerLink: Joi.string().required().pattern(/https?:\/\/(w{3}\.)?[-\w@:%.+~#=]+\.[\w()]+([-\w()@:%+.~#?&=/]*)/),
    thumbnail: Joi.string().required().pattern(/https?:\/\/(w{3}\.)?[-\w@:%.+~#=]+\.[\w()]+([-\w()@:%+.~#?&=/]*)/),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const deleteMovieVld = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().required().length(24),
  }),
});

module.exports = {
  registerVld,
  loginVld,
  updateProfileVld,
  createMovieVld,
  deleteMovieVld,
};
