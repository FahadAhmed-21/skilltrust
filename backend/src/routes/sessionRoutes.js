const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');

router.post('/', sessionController.createSession);
router.get('/user/:userId', sessionController.getUserSessions);
router.patch('/:id', sessionController.updateSession);

module.exports = router;