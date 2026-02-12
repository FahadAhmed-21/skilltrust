const { getFirestore } = require('../config/firebase');

class SessionService {
  get db() {
    if (!this._db) {
      this._db = getFirestore();
    }
    return this._db;
  }

  get collection() {
    return this.db.collection('sessions');
  }

  async createSession(sessionData) {
    const session = {
      ...sessionData,
      createdAt: sessionData.createdAt || new Date(),
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
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();

    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
}

module.exports = new SessionService();