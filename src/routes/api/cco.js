const router = require('express').Router();
const CCO = require('../../controllers/01.ChiefCreativeOfficer');
const cco = new CCO(55);

router.post('/talk', async (req, res) => {
    console.log('req.body', req.body);
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'Didn\'t receive any messages' });
    try {
        const response = await cco.talk(message);
        return res.status(200).json({ response });
    } catch (error) {
        console.error('Error in CCO talk: ', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;