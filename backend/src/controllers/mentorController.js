const mentorService = require('../services/mentorService');
const { validationResult } = require('express-validator');

class MentorController {
  async getMentorProfile(req, res, next) {
    try {
      const mentor = await mentorService.getMentorById(req.params.id);
      res.json({ success: true, data: mentor });
    } catch (error) {
      next(error);
    }
  }

  async createMentorProfile(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const mentor = await mentorService.createMentor(req.user.uid, req.body);
      res.status(201).json({ success: true, data: mentor });
    } catch (error) {
      next(error);
    }
  }

  async updateMentorProfile(req, res, next) {
    try {
      const mentor = await mentorService.updateMentor(req.user.uid, req.body);
      res.json({ success: true, data: mentor });
    } catch (error) {
      next(error);
    }
  }

  async getMentorsBySkill(req, res, next) {
    try {
      const { skill } = req.params;
      const mentors = await mentorService.getMentorsBySkill(skill);
      res.json({ success: true, data: mentors });
    } catch (error) {
      next(error);
    }
  }

  async rateMentor(req, res, next) {
    try {
      const { mentorId } = req.params;
      const { rating } = req.body;
      await mentorService.updateRating(mentorId, rating);
      res.json({ success: true, message: 'Rating updated successfully' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MentorController();