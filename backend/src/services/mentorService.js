const { getFirestore } = require('../config/firebase');

class MentorService {
  get db() {
    if (!this._db) {
      this._db = getFirestore();
    }
    return this._db;
  }

  get collection() {
    return this.db.collection('mentors');
  }

  async getAllMentors() {
    const snapshot = await this.collection.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async getMentorById(mentorId) {
    const doc = await this.collection.doc(mentorId).get();
    if (!doc.exists) {
      throw new Error('Mentor not found');
    }
    return { id: doc.id, ...doc.data() };
  }

  async createMentor(mentorData) {
    const docRef = await this.collection.add(mentorData);
    return { id: docRef.id, ...mentorData };
  }
}

module.exports = new MentorService();