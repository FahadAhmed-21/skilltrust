const userService = require('../services/userService');
const { validationResult } = require('express-validator');

class UserController {
  async getProfile(req, res, next) {
    try {
      const user = await userService.getUserById(req.user.uid);
      res.json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  }

  async createProfile(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const user = await userService.createUser(req.user.uid, req.body);
      res.status(201).json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const user = await userService.updateUser(req.user.uid, req.body);
      res.json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  }

  async addTokens(req, res, next) {
    try {
      const { amount } = req.body;
      await userService.incrementTokens(req.user.uid, amount);
      res.json({ success: true, message: 'Tokens added successfully' });
    } catch (error) {
      next(error);
    }
  }

  async getUserNFTs(req, res, next) {
    try {
      const user = await userService.getUserById(req.user.uid);
      res.json({ success: true, data: user.nfts || [] });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();