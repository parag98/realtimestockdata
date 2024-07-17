const express = require('express');
const Data = require('../models/stockdata');
const router = express.Router();

router.get('/:symbol', async (req, res) => {
  const { symbol } = req.params;
  try {
    const data = await Data.find({ symbol }).sort({ timestamp: -1 }).limit(20);
    res.json(data);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
