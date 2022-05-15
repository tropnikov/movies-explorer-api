const router = require('express').Router();
const authRoutes = require('./auth');
const usersRoutes = require('./users');
const moviesRoutes = require('./movies');
const authUser = require('../middlewares/auth');
const notFoundRoute = require('./notFound');

router.use(authRoutes);
router.use('/users', authUser, usersRoutes);
router.use('/movies', authUser, moviesRoutes);
router.use(authUser, notFoundRoute);

module.exports = router;
