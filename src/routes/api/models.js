const router = require('express').Router();

router.get('/', (req, res) => {
    res.status(200).json({ ok: true, models: ['model1', 'model2', 'model3'] });
});

module.exports = router;