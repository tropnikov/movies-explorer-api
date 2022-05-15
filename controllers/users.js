const {
  NODE_ENV,
  SECRET_KEY,
} = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  NOT_FOUND_USER_MSG,
  CONFLICT_ALREADY_EXIST,
  UNAUTHORIZED_INCORRECT_CREDENTIALS_MSG,
  VALIDATION_INVALID_USER_DATA,
  SUCCESS_USER_AUTHORIZED,
  SUCCESS_USER_LOGOUT,
} = require('../constants/messages');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ValidationError = require('../errors/ValidationError');
const User = require('../models/users');

module.exports.getProfile = (req, res, next) => {
  const id = req.user._id;
  User.findById(id)
    .orFail(() => {
      throw new NotFoundError(
        NOT_FOUND_USER_MSG,
      );
    })
    .then((user) => res.status(200)
      .send(user))
    .catch((err) => next(err));
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError(
          CONFLICT_ALREADY_EXIST,
        );
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      const userWithoutPass = user.toObject();
      delete userWithoutPass.password;
      res.status(201)
        .send(userWithoutPass);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(VALIDATION_INVALID_USER_DATA));
      }
      return next(err);
    });
};

module.exports.updateProfile = (req, res, next) => {
  const {
    name,
    email,
  } = req.body;
  const id = req.user._id;
  User.findOne({ email })
    .then((user) => {
      if (user && (user._id).toString() !== id) {
        throw new ConflictError(CONFLICT_ALREADY_EXIST);
      }
    });
  User.findByIdAndUpdate(
    id,
    {
      name,
      email,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      throw new NotFoundError(
        NOT_FOUND_USER_MSG,
      );
    })
    .then((user) => res.status(200)
      .send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(VALIDATION_INVALID_USER_DATA));
      }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const {
    email,
    password,
  } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? SECRET_KEY : 'super-duper-secret',
        {
          expiresIn: '7d',
        },
      );
      return res
        .cookie('token', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .json({ message: SUCCESS_USER_AUTHORIZED });
    })
    .catch(() => {
      next(new UnauthorizedError(UNAUTHORIZED_INCORRECT_CREDENTIALS_MSG));
    });
};

module.exports.logout = (req, res) => {
  res
    .status(200)
    .clearCookie('token', {
      httpOnly: true,
      sameSite: true,
    })
    .json({ message: SUCCESS_USER_LOGOUT });
};
