const express = require('express');
const router = express.Router();
const tokenController = require('../controllers/tokenController');

router.post('/deduct', tokenController.deductTokens);
router.post('/add', tokenController.addTokens);

module.exports = router;
