const routes = require('express').Router();
const { NOT_FOUND_PAGE_MSG } = require('../constants/messages');
const NotFoundError = require('../errors/NotFoundError');

routes.use((req, res, next) => {
  next(new NotFoundError(NOT_FOUND_PAGE_MSG));
});

module.exports = routes;
