const routes = require('express').Router();
const { registerVld, loginVld } = require('../middlewares/validation');
const { login, createUser, logout } = require('../controllers/users');

routes.post('/signin', loginVld, login);
routes.post('/signup', registerVld, createUser);
routes.post('/signout', logout);

module.exports = routes;
