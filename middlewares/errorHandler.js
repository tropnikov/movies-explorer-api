const { INTERNAL_SERVER_ERROR_MSG } = require('../constants/messages');

const errorHandler = (err, req, res, next) => {
  const code = err.statusCode || 500;
  res.status(code).send({ message: code === 500 ? INTERNAL_SERVER_ERROR_MSG : err.message, err });

  next();
};

module.exports = errorHandler;
