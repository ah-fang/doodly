const router = require('express').Router();

const playRoutes = require('./play-routes.js');

router.use('/games', playRoutes);

module.exports = router;