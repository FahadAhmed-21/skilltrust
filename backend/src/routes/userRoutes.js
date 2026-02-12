const express = require('express');
const userService = require('../services/userService');
const router = express.Router();

// GET /api/users/:id
router.get('/:id', async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
});

// POST /api/users
router.post('/', async (req, res) => {
  try {
    const user = await userService.createUser(req.body.id, req.body);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PUT /api/users/:id
router.put('/:id', async (req, res) => {
  try {
    const { languages, displayName } = req.body;
    const allowedUpdates = {};
    
    if (languages !== undefined) allowedUpdates.languages = languages;
    if (displayName !== undefined) allowedUpdates.name = displayName;
    
    if (Object.keys(allowedUpdates).length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'No valid fields to update. Allowed: languages, displayName' 
      });
    }
    
    const user = await userService.updateUser(req.params.id, allowedUpdates);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;