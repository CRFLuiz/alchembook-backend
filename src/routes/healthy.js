const router = require('express').Router();

router.get('/server', (req, res) => res.status(200).json({ ok: true, status: 'Healthy' }));

router.get('/app', (req, res) => {
    console.log('DB CHECK');
    console.log('REDIS CHECK');
    res.status(200).json({ ok: true, status: 'Healthy' });
});

module.exports = router;