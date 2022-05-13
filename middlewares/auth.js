const { NODE_ENV, SECRET_KEY } = process.env;
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const authUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? SECRET_KEY : 'super-duper-secret',
    );
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};

module.exports = authUser;
