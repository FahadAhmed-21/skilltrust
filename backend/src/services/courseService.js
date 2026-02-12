const { getFirestore } = require('../config/firebase');

class CourseService {
  constructor() {
    this.db = getFirestore();
    this.collection = this.db.collection('courses');
  }

  async getCourseById(courseId) {
    const doc = await this.collection.doc(courseId).get();
    if (!doc.exists) {
      throw new Error('Course not found');
    }
    return { id: doc.id, ...doc.data() };
  }

  async createCourse(courseData) {
    const courseDoc = {
      title: courseData.title,
      description: courseData.description,
      mentorId: courseData.mentorId,
      skills: courseData.skills || [],
      difficulty: courseData.difficulty || 'beginner',
      duration: courseData.duration || 0,
      price: courseData.price || 0,
      thumbnail: courseData.thumbnail || '',
      modules: courseData.modules || [],
      enrolled: 0,
      rating: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const docRef = await this.collection.add(courseDoc);
    return { id: docRef.id, ...courseDoc };
  }

  async updateCourse(courseId, updateData) {
    const updateDoc = { ...updateData, updatedAt: new Date() };
    await this.collection.doc(courseId).update(updateDoc);
    return this.getCourseById(courseId);
  }

  async getCoursesByMentor(mentorId) {
    const snapshot = await this.collection.where('mentorId', '==', mentorId).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async getCoursesBySkill(skill) {
    const snapshot = await this.collection.where('skills', 'array-contains', skill).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async enrollUser(courseId, userId) {
    const courseRef = this.collection.doc(courseId);
    await this.db.runTransaction(async (transaction) => {
      const doc = await transaction.get(courseRef);
      if (!doc.exists) throw new Error('Course not found');
      
      const enrolled = doc.data().enrolled || 0;
      transaction.update(courseRef, { 
        enrolled: enrolled + 1,
        updatedAt: new Date()
      });
    });
  }
}

module.exports = new CourseService();