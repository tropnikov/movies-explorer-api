const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const UnauthorizedError = require('../errors/UnauthorizedError');
const {
  UNAUTHORIZED_INCORRECT_CREDENTIALS_MSG,
  VALIDATION_INVALID_EMAIL,
} = require('../constants/messages');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(mail) {
        return validator.isEmail(mail);
      },
      message: VALIDATION_INVALID_EMAIL,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new UnauthorizedError(UNAUTHORIZED_INCORRECT_CREDENTIALS_MSG),
        );
      }

      return bcryptjs.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new UnauthorizedError(UNAUTHORIZED_INCORRECT_CREDENTIALS_MSG),
          );
        }

        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
