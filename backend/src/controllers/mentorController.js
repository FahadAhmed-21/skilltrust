const mentorService = require('../services/mentorService');

// GET /api/mentors
const getAllMentors = async (req, res) => {
  try {
    const mentors = await mentorService.getAllMentors();
    res.status(200).json({ success: true, data: mentors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/mentors/:id
const getMentor = async (req, res) => {
  try {
    const mentor = await mentorService.getMentorById(req.params.id);
    res.status(200).json({ success: true, data: mentor });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

// POST /api/mentors
const createMentor = async (req, res) => {
  try {
    const { name, skill, rating, experienceYears, profileImage, tagline } = req.body;

    if (!name || !skill) {
      return res.status(400).json({
        success: false,
        message: 'Required fields: name, skill'
      });
    }

    const mentorData = {
      name,
      skill,
      rating: rating || 0,
      experienceYears: experienceYears || 0,
      profileImage: profileImage || '',
      tagline: tagline || '',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const mentor = await mentorService.createMentor(mentorData);
    res.status(201).json({ success: true, data: mentor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllMentors,
  getMentor,
  createMentor
};