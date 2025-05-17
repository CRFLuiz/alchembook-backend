const router = require('express').Router();
const models = require('./models');
const conversation = require('./conversation');

router.use('/models', models);
router.use('/conversation', conversation);

module.exports = router;