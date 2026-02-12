const { getFirestore } = require('../config/firebase');

class CourseService {
  get db() {
    if (!this._db) {
      this._db = getFirestore();
    }
    return this._db;
  }

  get collection() {
    return this.db.collection('courses');
  }

  async getAllCourses() {
    const snapshot = await this.collection.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async getCourseById(courseId) {
    const doc = await this.collection.doc(courseId).get();
    if (!doc.exists) {
      throw new Error('Course not found');
    }
    return { id: doc.id, ...doc.data() };
  }

  async createCourse(courseData) {
    const docRef = await this.collection.add(courseData);
    return { id: docRef.id, ...courseData };
  }
}

module.exports = new CourseService();