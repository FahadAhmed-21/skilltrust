import { db } from '../firebase';
import { collection, getDocs, doc, getDoc, query, orderBy, limit } from 'firebase/firestore';
import { useMocks, mockUserProfile, mockCourses, mockMentors, mockBookings, mockLeaderboard } from '../mocks';

class DataService {
  // User Profile
  async getUserProfile(userId) {
    if (useMocks) {
      return mockUserProfile;
    }
    
    try {
      const userRef = doc(db, 'users', userId);
      const docSnap = await getDoc(userRef);
      return docSnap.exists() ? docSnap.data() : null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }

  // Courses
  async getCourses() {
    if (useMocks) {
      return mockCourses;
    }
    
    try {
      const coursesRef = collection(db, 'courses');
      const snapshot = await getDocs(coursesRef);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching courses:', error);
      return [];
    }
  }

  // Mentors
  async getMentors() {
    if (useMocks) {
      return mockMentors;
    }
    
    try {
      const mentorsRef = collection(db, 'mentors');
      const snapshot = await getDocs(mentorsRef);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching mentors:', error);
      return [];
    }
  }

  // Bookings
  async getBookings(userId) {
    if (useMocks) {
      return mockBookings;
    }
    
    try {
      const bookingsRef = collection(db, 'bookings');
      const snapshot = await getDocs(bookingsRef);
      return snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(booking => booking.userId === userId);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      return [];
    }
  }

  // Leaderboard
  async getLeaderboard() {
    if (useMocks) {
      return mockLeaderboard;
    }
    
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, orderBy('tokens', 'desc'), limit(10));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc, index) => ({
        rank: index + 1,
        name: doc.data().displayName || 'Anonymous',
        tokens: doc.data().tokens || 0,
        nfts: doc.data().nfts?.length || 0,
        avatar: doc.data().photoURL || `https://i.pravatar.cc/150?img=${index + 1}`
      }));
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      return [];
    }
  }

  // Stats
  async getStats(userId) {
    if (useMocks) {
      return {
        totalUsers: 1247,
        totalSessions: 3892,
        totalTokensMinted: 156789,
        totalNFTs: 892,
        userRank: 23,
        userTokens: mockUserProfile.tokens,
        userNFTs: mockUserProfile.nfts?.length || 0,
        userSessions: mockUserProfile.sessions?.length || 0
      };
    }
    
    try {
      // Get global stats
      const statsRef = doc(db, 'stats', 'global');
      const statsSnap = await getDoc(statsRef);
      const globalStats = statsSnap.exists() ? statsSnap.data() : {};
      
      // Get user stats
      const userStats = await this.getUserProfile(userId);
      
      return {
        totalUsers: globalStats.totalUsers || 0,
        totalSessions: globalStats.totalSessions || 0,
        totalTokensMinted: globalStats.totalTokensMinted || 0,
        totalNFTs: globalStats.totalNFTs || 0,
        userRank: userStats?.rank || 0,
        userTokens: userStats?.tokens || 0,
        userNFTs: userStats?.nfts?.length || 0,
        userSessions: userStats?.sessions?.length || 0
      };
    } catch (error) {
      console.error('Error fetching stats:', error);
      return {};
    }
  }
}

export default new DataService();