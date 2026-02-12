const courseService = require('../services/courseService');

// GET /api/courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await courseService.getAllCourses();
    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/courses/:id
const getCourse = async (req, res) => {
  try {
    const course = await courseService.getCourseById(req.params.id);
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

// POST /api/courses
const createCourse = async (req, res) => {
  try {
    const { title, category, difficulty, tags } = req.body;

    if (!title || !category) {
      return res.status(400).json({
        success: false,
        message: 'Required fields: title, category'
      });
    }

    const courseData = {
      title,
      category,
      difficulty: difficulty || 'Beginner',
      progress: 0,
      tags: tags || [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const course = await courseService.createCourse(courseData);
    res.status(201).json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllCourses,
  getCourse,
  createCourse
};
