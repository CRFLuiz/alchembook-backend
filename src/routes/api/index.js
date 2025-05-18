const router = require('express').Router();
const models = require('./models');
const conversation = require('./conversation');
const cco = require('./cco');

router.use('/models', models);
router.use('/conversation', conversation);
router.use('/cco', cco);

module.exports = router;