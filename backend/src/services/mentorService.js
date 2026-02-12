const { getFirestore } = require('../config/firebase');

class MentorService {
  constructor() {
    this.db = getFirestore();
    this.collection = this.db.collection('mentors');
  }

  async getMentorById(mentorId) {
    const doc = await this.collection.doc(mentorId).get();
    if (!doc.exists) {
      throw new Error('Mentor not found');
    }
    return { id: doc.id, ...doc.data() };
  }

  async createMentor(mentorId, mentorData) {
    const mentorDoc = {
      name: mentorData.name || '',
      email: mentorData.email || '',
      bio: mentorData.bio || '',
      skills: mentorData.skills || [],
      languages: mentorData.languages || [],
      hourlyRate: mentorData.hourlyRate || 0,
      rating: 0,
      totalSessions: 0,
      availability: mentorData.availability || {},
      profileImage: mentorData.profileImage || '',
      verified: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await this.collection.doc(mentorId).set(mentorDoc);
    return { id: mentorId, ...mentorDoc };
  }

  async updateMentor(mentorId, updateData) {
    const updateDoc = { ...updateData, updatedAt: new Date() };
    await this.collection.doc(mentorId).update(updateDoc);
    return this.getMentorById(mentorId);
  }

  async getMentorsBySkill(skill) {
    const snapshot = await this.collection.where('skills', 'array-contains', skill).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async updateRating(mentorId, newRating) {
    const mentorRef = this.collection.doc(mentorId);
    await this.db.runTransaction(async (transaction) => {
      const doc = await transaction.get(mentorRef);
      if (!doc.exists) throw new Error('Mentor not found');
      
      const data = doc.data();
      const totalRatings = data.totalSessions || 0;
      const currentRating = data.rating || 0;
      const updatedRating = totalRatings === 0 ? newRating : 
        ((currentRating * totalRatings) + newRating) / (totalRatings + 1);
      
      transaction.update(mentorRef, { 
        rating: updatedRating,
        totalSessions: totalRatings + 1,
        updatedAt: new Date()
      });
    });
  }
}

module.exports = new MentorService();