const router = require('express').Router();
const getCards = require('../controllers/cardsController.js');

router.get('/cards', getCards);

module.exports = router;
