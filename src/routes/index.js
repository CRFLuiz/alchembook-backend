const router = require('express').Router();
const healthy = require('./healthy');
const auth = require('./middlewares/auth');
const api = require('./api');

router.use('/healthy', healthy);
router.use('/api', auth);
router.use('/api', api);

module.exports = router;