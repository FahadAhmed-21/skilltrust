// src/mocks/index.js - Mock data for local development
export const useMocks = true;

// Mock courses data
export async function fetchCourses() {
  return [
    { id: 'c1', title: 'React Basics', tutor: 'Fahad', description: 'Learn React fundamentals' },
    { id: 'c2', title: 'Solidity Intro', tutor: 'Alice', description: 'Introduction to Solidity' },
    { id: 'c3', title: 'Python Programming', tutor: 'Bob', description: 'Master Python basics' },
    { id: 'c4', title: 'Web3 Development', tutor: 'Charlie', description: 'Build decentralized apps' }
  ];
}

// Mock user profile data
export async function fetchUserProfile() {
  return {
    id: 'u1',
    name: 'Fahad (mock)',
    displayName: 'Fahad (mock)',
    email: 'fahad@mock.com',
    tokens: 500,
    nfts: ['Resume NFT #1', 'Skill Badge NFT #2'],
    sessions: [
      { skill: 'React Basics', mentor: 'Alice', date: '12/10/2025', time: '10:00 AM', sessionId: 'mock-session-1' }
    ],
    languages: ['English', 'Tamil'],
    photoURL: 'https://placehold.co/100x100/7c3aed/FFFFFF?text=F'
  };
}

// Mock messages data
export async function fetchMessages(sessionId) {
  return [
    { id: 'm1', sender: 'Fahad', text: 'Hello! Ready to start the session?', timestamp: Date.now() - 300000 },
    { id: 'm2', sender: 'Alice', text: 'Yes! Let\'s begin with React hooks.', timestamp: Date.now() - 200000 },
    { id: 'm3', sender: 'Fahad', text: 'Great! I\'m excited to learn.', timestamp: Date.now() - 100000 }
  ];
}

// Mock bookings data
export async function fetchBookings() {
  return [
    { id: 'b1', skill: 'React Basics', mentor: 'Alice', date: '12/10/2025', time: '10:00 AM', sessionId: 'mock-session-1' },
    { id: 'b2', skill: 'Solidity Intro', mentor: 'Bob', date: '12/12/2025', time: '2:00 PM', sessionId: 'mock-session-2' }
  ];
}

// Mock function to simulate booking a session
export async function mockBookSession(sessionData) {
  console.log('Mock: Booking session', sessionData);
  return { success: true, sessionId: `mock-session-${Date.now()}` };
}

// Mock function to simulate minting tokens
export async function mockMintTokens(amount) {
  console.log(`Mock: Minting ${amount} tokens`);
  return { success: true, newBalance: 500 + amount };
}

// Mock function to simulate minting NFT
export async function mockMintNFT(nftData) {
  console.log('Mock: Minting NFT', nftData);
  return { success: true, nftId: `mock-nft-${Date.now()}` };
}

// Mock function to send messages
export async function mockSendMessage(sessionId, message) {
  console.log(`Mock: Sending message to ${sessionId}`, message);
  return { success: true, messageId: `mock-msg-${Date.now()}` };
}

export default {
  useMocks,
  fetchCourses,
  fetchUserProfile,
  fetchMessages,
  fetchBookings,
  mockBookSession,
  mockMintTokens,
  mockMintNFT,
  mockSendMessage
};
