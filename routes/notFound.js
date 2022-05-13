const routes = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');

routes.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена =('));
});

module.exports = routes;
