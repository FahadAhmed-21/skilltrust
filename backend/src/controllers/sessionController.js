const sessionService = require('../services/sessionService');
const userService = require('../services/userService');

// POST /api/sessions
const createSession = async (req, res) => {
  try {
    const { userId, mentorId, skill, date, time } = req.body;

    // Validate all fields
    if (!userId || !mentorId || !skill || !date || !time) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: userId, mentorId, skill, date, time'
      });
    }

    // Fetch user document
    let user;
    try {
      user = await userService.getUserById(userId);
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if user has enough tokens
    if (user.tokens < 10) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient tokens'
      });
    }

    // Deduct 10 tokens from user
    await userService.incrementTokens(userId, -10);

    // Create session document
    const sessionData = {
      userId,
      mentorId,
      skill,
      date,
      time,
      status: 'Booked',
      createdAt: new Date()
    };

    const session = await sessionService.createSession(sessionData);

    res.status(201).json({
      success: true,
      data: session
    });
  } catch (error) {
    console.error('Create session error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create session',
      error: error.message
    });
  }
};

// GET /api/sessions/user/:userId
const getUserSessions = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'userId is required'
      });
    }

    const sessions = await sessionService.getUserSessions(userId);

    res.status(200).json({
      success: true,
      data: sessions
    });
  } catch (error) {
    console.error('Get user sessions error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user sessions',
      error: error.message
    });
  }
};

// PATCH /api/sessions/:id
const updateSession = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Session ID is required'
      });
    }

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }

    // Validate session exists
    let session;
    try {
      session = await sessionService.getSessionById(id);
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: 'Session not found'
      });
    }

    // If status is Cancelled, refund 10 tokens
    if (status === 'Cancelled' && session.status !== 'Cancelled') {
      await userService.incrementTokens(session.userId, 10);
    }

    // Update session status
    const updatedSession = await sessionService.updateSession(id, { status });

    res.status(200).json({
      success: true,
      data: updatedSession
    });
  } catch (error) {
    console.error('Update session error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update session',
      error: error.message
    });
  }
};

module.exports = {
  createSession,
  getUserSessions,
  updateSession
};
