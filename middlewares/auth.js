const { NODE_ENV, SECRET_KEY } = process.env;
const jwt = require('jsonwebtoken');
const { UNAUTHORIZED_MSG } = require('../constants/messages');
const UnauthorizedError = require('../errors/UnauthorizedError');

const authUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new UnauthorizedError(UNAUTHORIZED_MSG));
  }

  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? SECRET_KEY : 'super-duper-secret',
    );
  } catch (err) {
    return next(new UnauthorizedError(UNAUTHORIZED_MSG));
  }
  req.user = payload;
  return next();
};

module.exports = authUser;
