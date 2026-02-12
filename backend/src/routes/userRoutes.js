const express = require('express');
const userService = require('../services/userService');
const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const user = await userService.createUser(req.body.id, req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/:id/tokens', async (req, res) => {
  try {
    await userService.incrementTokens(req.params.id, req.body.amount);
    res.json({ message: 'Tokens updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/:id/nfts', async (req, res) => {
  try {
    await userService.addNFT(req.params.id, req.body);
    res.json({ message: 'NFT added successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;