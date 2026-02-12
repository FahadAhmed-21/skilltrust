const { getFirestore } = require('../config/firebase');

class BookingService {
  constructor() {
    this.db = getFirestore();
    this.collection = this.db.collection('bookings');
  }

  async createBooking(bookingData) {
    const bookingDoc = {
      userId: bookingData.userId,
      mentorId: bookingData.mentorId,
      sessionType: bookingData.sessionType || 'video',
      scheduledTime: new Date(bookingData.scheduledTime),
      duration: bookingData.duration || 60,
      topic: bookingData.topic || '',
      status: 'pending',
      amount: bookingData.amount || 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const docRef = await this.collection.add(bookingDoc);
    return { id: docRef.id, ...bookingDoc };
  }

  async getBookingById(bookingId) {
    const doc = await this.collection.doc(bookingId).get();
    if (!doc.exists) {
      throw new Error('Booking not found');
    }
    return { id: doc.id, ...doc.data() };
  }

  async getUserBookings(userId) {
    const snapshot = await this.collection.where('userId', '==', userId).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async getMentorBookings(mentorId) {
    const snapshot = await this.collection.where('mentorId', '==', mentorId).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async updateBookingStatus(bookingId, status) {
    const updateDoc = { status, updatedAt: new Date() };
    await this.collection.doc(bookingId).update(updateDoc);
    return this.getBookingById(bookingId);
  }

  async completeBooking(bookingId, feedback = {}) {
    const updateDoc = { 
      status: 'completed',
      feedback,
      completedAt: new Date(),
      updatedAt: new Date()
    };
    await this.collection.doc(bookingId).update(updateDoc);
    return this.getBookingById(bookingId);
  }
}

module.exports = new BookingService();