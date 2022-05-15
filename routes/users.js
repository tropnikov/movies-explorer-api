const routes = require('express').Router();

const {
  getProfile,
  updateProfile,
} = require('../controllers/users');
const { updateProfileVld } = require('../middlewares/validation');

routes.get('/me', getProfile);
routes.patch('/me', updateProfileVld, updateProfile);

module.exports = routes;
