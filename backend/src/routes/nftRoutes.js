const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'NFT routes - coming soon' });
});

module.exports = router;