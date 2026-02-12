const userService = require('../services/userService');

// POST /api/tokens/deduct
const deductTokens = async (req, res) => {
  try {
    const { userId, amount } = req.body;

    if (!userId || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Required fields: userId, amount'
      });
    }

    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be greater than 0'
      });
    }

    await userService.deductTokens(userId, amount);
    const user = await userService.getUserById(userId);

    res.status(200).json({
      success: true,
      data: { balance: user.tokens }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// POST /api/tokens/add
const addTokens = async (req, res) => {
  try {
    const { userId, amount } = req.body;

    if (!userId || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Required fields: userId, amount'
      });
    }

    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be greater than 0'
      });
    }

    await userService.addTokens(userId, amount);
    const user = await userService.getUserById(userId);

    res.status(200).json({
      success: true,
      data: { balance: user.tokens }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  deductTokens,
  addTokens
};
