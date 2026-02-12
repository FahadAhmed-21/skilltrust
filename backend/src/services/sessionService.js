const { getFirestore } = require('../config/firebase');

class SessionService {
  constructor() {
    this.db = getFirestore();
    this.collection = this.db.collection('sessions');
  }

  async createSession(sessionData) {
    const session = {
      ...sessionData,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const docRef = await this.collection.add(session);
    return { id: docRef.id, ...session };
  }

  async getSessionById(sessionId) {
    const doc = await this.collection.doc(sessionId).get();
    if (!doc.exists) {
      throw new Error('Session not found');
    }
    return { id: doc.id, ...doc.data() };
  }

  async updateSession(sessionId, updateData) {
    const updateDoc = {
      ...updateData,
      updatedAt: new Date()
    };

    await this.collection.doc(sessionId).update(updateDoc);
    return this.getSessionById(sessionId);
  }

  async getUserSessions(userId) {
    const snapshot = await this.collection
      .where('participants', 'array-contains', userId)
      .orderBy('createdAt', 'desc')
      .get();

    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
}

module.exports = new SessionService();