// Mock data for development and testing purposes

export const useMocks = true;

// ===========================================================
// 1. USER PROFILE
// ===========================================================
export const mockUserProfile = {
  name: "Fahad",
  displayName: "Fahad",
  email: "fahad@skilltrust.io",
  photoURL: "https://i.pravatar.cc/150?img=68",
  tokens: 420,
  nfts: ["Resume NFT #1", "Skill Badge NFT #4"],
  reputation: 4.7,
  completedSessions: 18,
  languages: ["JavaScript", "Python", "React", "Node.js"],
  sessions: [
    {
      sessionId: "skilltrust-1640995200000",
      skill: "JavaScript",
      mentor: "Sarah Williams",
      date: "1/1/2022",
      time: "2:00 PM",
    },
    {
      sessionId: "skilltrust-1641081600000",
      skill: "React",
      mentor: "Carlos Mendes",
      date: "1/2/2022",
      time: "3:30 PM",
    },
  ]
};

// ===========================================================
// 2. COURSES — 25 ENTRIES (Balanced for screenshots)
// ===========================================================
export const mockCourses = [
  { title: "Java Programming", category: "Programming", difficulty: "Intermediate", progress: 70, tags: ["OOP","Backend"] },
  { title: "C Programming", category: "Programming", difficulty: "Beginner", progress: 45, tags: ["Memory","Pointers"] },
  { title: "C++ Fundamentals", category: "Programming", difficulty: "Intermediate", progress: 60, tags: ["OOP","STL"] },
  { title: "Python for Beginners", category: "Programming", difficulty: "Beginner", progress: 30, tags: ["Scripting","Data"] },
  { title: "JavaScript Essentials", category: "Web Development", difficulty: "Beginner", progress: 55, tags: ["Frontend"] },
  { title: "React Development", category: "Web Development", difficulty: "Intermediate", progress: 80, tags: ["Components"] },
  { title: "Node.js Backend", category: "Web Development", difficulty: "Intermediate", progress: 65, tags: ["API","Server"] },
  { title: "SQL Basics", category: "Database", difficulty: "Beginner", progress: 40, tags: ["Queries"] },
  { title: "Machine Learning", category: "AI/ML", difficulty: "Intermediate", progress: 48, tags: ["Models","Python"] },
  { title: "Deep Learning", category: "AI/ML", difficulty: "Advanced", progress: 20, tags: ["Neural Networks"] },
  { title: "TensorFlow Basics", category: "AI/ML", difficulty: "Beginner", progress: 55, tags: ["ML"] },
  { title: "Cybersecurity Essentials", category: "Cybersecurity", difficulty: "Intermediate", progress: 35, tags: ["Security"] },
  { title: "Ethical Hacking", category: "Cybersecurity", difficulty: "Advanced", progress: 15, tags: ["Pentesting"] },
  { title: "Cryptography 101", category: "Cybersecurity", difficulty: "Intermediate", progress: 22, tags: ["Security"] },
  { title: "Solidity Smart Contracts", category: "Web3", difficulty: "Intermediate", progress: 72, tags: ["Blockchain"] },
  { title: "Web3 Development", category: "Web3", difficulty: "Beginner", progress: 55, tags: ["DApps"] },
  { title: "DevOps Basics", category: "Cloud", difficulty: "Beginner", progress: 68, tags: ["CI/CD","Docker"] },
  { title: "AWS Cloud Fundamentals", category: "Cloud", difficulty: "Intermediate", progress: 30, tags: ["S3","EC2"] },
  { title: "Docker Essentials", category: "Cloud", difficulty: "Intermediate", progress: 75, tags: ["Containers"] },
  { title: "Kubernetes 101", category: "Cloud", difficulty: "Advanced", progress: 25, tags: ["Orchestration"] },
  { title: "Public Speaking", category: "Soft Skills", difficulty: "Beginner", progress: 50, tags: ["Communication"] },
  { title: "Leadership Skills", category: "Soft Skills", difficulty: "Intermediate", progress: 40, tags: ["Management"] },
  { title: "German Basics", category: "Languages", difficulty: "Beginner", progress: 15, tags: ["Grammar"] },
  { title: "French A1", category: "Languages", difficulty: "Beginner", progress: 22, tags: ["Vocabulary"] },
  { title: "Japanese N5", category: "Languages", difficulty: "Beginner", progress: 10, tags: ["Hiragana"] }
];

// ===========================================================
// 3. 20 MENTORS — CLEAN DATASET (No heavy descriptions)
// ===========================================================
export const mockMentors = [
  { name: "Aarav Kumar", skill: "Java", rating: 4.8, experienceYears: 6, profileImage: "https://i.pravatar.cc/150?img=12", tagline: "Java Backend Engineer" },
  { name: "Meera Srinivas", skill: "C++", rating: 4.9, experienceYears: 7, profileImage: "https://i.pravatar.cc/150?img=15", tagline: "Systems Programming Expert" },
  { name: "Sarah Williams", skill: "Python", rating: 4.8, experienceYears: 5, profileImage: "https://i.pravatar.cc/150?img=32", tagline: "Machine Learning Developer" },
  { name: "Ling Zhao", skill: "Japanese", rating: 4.9, experienceYears: 10, profileImage: "https://i.pravatar.cc/150?img=45", tagline: "Native Japanese Tutor" },
  { name: "Rohan Singh", skill: "German", rating: 4.7, experienceYears: 4, profileImage: "https://i.pravatar.cc/150?img=18", tagline: "German A1 Instructor" },
  { name: "Nina Patel", skill: "Solidity", rating: 4.7, experienceYears: 5, profileImage: "https://i.pravatar.cc/150?img=28", tagline: "Smart Contract Developer" },
  { name: "David Chen", skill: "Machine Learning", rating: 4.9, experienceYears: 6, profileImage: "https://i.pravatar.cc/150?img=36", tagline: "ML Engineer" },
  { name: "Isabella Rossi", skill: "French", rating: 4.8, experienceYears: 12, profileImage: "https://i.pravatar.cc/150?img=55", tagline: "French Language Coach" },
  { name: "Carlos Mendes", skill: "React", rating: 4.6, experienceYears: 4, profileImage: "https://i.pravatar.cc/150?img=67", tagline: "Frontend Engineer" },
  { name: "Anika Verma", skill: "Cybersecurity", rating: 4.8, experienceYears: 8, profileImage: "https://i.pravatar.cc/150?img=72", tagline: "Ethical Hacker" },
  { name: "Liam Wright", skill: "Leadership", rating: 4.7, experienceYears: 11, profileImage: "https://i.pravatar.cc/150?img=79", tagline: "Soft Skills Trainer" },
  { name: "Emily Carter", skill: "DevOps", rating: 4.8, experienceYears: 9, profileImage: "https://i.pravatar.cc/150?img=82", tagline: "Cloud & DevOps Engineer" },
  { name: "Mohammed Ali", skill: "Arabic", rating: 4.9, experienceYears: 14, profileImage: "https://i.pravatar.cc/150?img=95", tagline: "Arabic Tutor" },
  { name: "Jessica Brown", skill: "Public Speaking", rating: 4.8, experienceYears: 10, profileImage: "https://i.pravatar.cc/150?img=102", tagline: "Communication Coach" },
  { name: "Alex Sturm", skill: "Rust", rating: 4.7, experienceYears: 4, profileImage: "https://i.pravatar.cc/150?img=129", tagline: "Rust Engineer" },
  { name: "Kaito Mori", skill: "Japanese", rating: 4.9, experienceYears: 7, profileImage: "https://i.pravatar.cc/150?img=140", tagline: "JLPT Instructor" },
  { name: "Sofia Garcia", skill: "Spanish", rating: 4.8, experienceYears: 9, profileImage: "https://i.pravatar.cc/150?img=142", tagline: "Spanish Tutor" },
  { name: "Noah Patel", skill: "Web3", rating: 4.7, experienceYears: 5, profileImage: "https://i.pravatar.cc/150?img=144", tagline: "Web3 Developer" },
  { name: "Harish Rao", skill: "Tamil", rating: 4.9, experienceYears: 15, profileImage: "https://i.pravatar.cc/150?img=150", tagline: "Tamil Language Expert" },
  { name: "Ananya Bose", skill: "SQL", rating: 4.8, experienceYears: 6, profileImage: "https://i.pravatar.cc/150?img=160", tagline: "Database Specialist" }
];

// ===========================================================
// 4. BOOKINGS — 8 REAL EXAMPLES
// ===========================================================
export const mockBookings = [
  { id:1, mentor:"Sarah Williams", skill:"Python", date:"2025-01-10", time:"6:00 PM", status:"Completed", notes:"Completed successfully" },
  { id:2, mentor:"Ling Zhao", skill:"Japanese", date:"2025-01-12", time:"4:00 PM", status:"Upcoming", notes:"JLPT N5 prep" },
  { id:3, mentor:"Aarav Kumar", skill:"Java", date:"2025-01-14", time:"2:30 PM", status:"Upcoming", notes:"OOP revision" },
  { id:4, mentor:"Emily Carter", skill:"DevOps", date:"2025-01-16", time:"11:00 AM", status:"Completed", notes:"Docker basics" },
  { id:5, mentor:"Isabella Rossi", skill:"French", date:"2025-01-18", time:"5:30 PM", status:"Upcoming", notes:"French A1 speaking" },
  { id:6, mentor:"Rohan Singh", skill:"German", date:"2025-01-19", time:"7:00 PM", status:"Cancelled", notes:"Student unavailable" },
  { id:7, mentor:"Nina Patel", skill:"Solidity", date:"2025-01-20", time:"3:00 PM", status:"Upcoming", notes:"Smart contract basics" },
  { id:8, mentor:"Anika Verma", skill:"Cybersecurity", date:"2025-01-21", time:"1:00 PM", status:"Upcoming", notes:"Vulnerability scanning" }
];

// ===========================================================
// 5. LEADERBOARD — TOP 10 USERS
// ===========================================================
export const mockLeaderboard = [
  { rank: 1, name: "Alex Chen", tokens: 2850, nfts: 12, avatar: "https://i.pravatar.cc/150?img=1" },
  { rank: 2, name: "Sarah Kim", tokens: 2640, nfts: 10, avatar: "https://i.pravatar.cc/150?img=2" },
  { rank: 3, name: "Marcus Johnson", tokens: 2420, nfts: 9, avatar: "https://i.pravatar.cc/150?img=3" },
  { rank: 4, name: "Elena Rodriguez", tokens: 2180, nfts: 8, avatar: "https://i.pravatar.cc/150?img=4" },
  { rank: 5, name: "David Park", tokens: 1950, nfts: 7, avatar: "https://i.pravatar.cc/150?img=5" },
  { rank: 6, name: "Lisa Wang", tokens: 1720, nfts: 6, avatar: "https://i.pravatar.cc/150?img=6" },
  { rank: 7, name: "James Wilson", tokens: 1580, nfts: 5, avatar: "https://i.pravatar.cc/150?img=7" },
  { rank: 8, name: "Maya Patel", tokens: 1340, nfts: 4, avatar: "https://i.pravatar.cc/150?img=8" },
  { rank: 9, name: "Ryan Thompson", tokens: 1120, nfts: 3, avatar: "https://i.pravatar.cc/150?img=9" },
  { rank: 10, name: "Zoe Martinez", tokens: 890, nfts: 2, avatar: "https://i.pravatar.cc/150?img=10" }
];

// ===========================================================
// API HELPER FUNCTIONS (KEPT UNTOUCHED)
// ===========================================================

export const fetchUserProfile = async () => mockUserProfile;

export const fetchCourses = async () => mockCourses;

export const fetchMentors = async () => mockMentors;

export const fetchBookings = async () => mockBookings;

export const mockMintTokens = async (amount) => {
  return { success: true, newBalance: mockUserProfile.tokens + amount };
};

export const mockMintNFT = async (name) => {
  mockUserProfile.nfts.push(name);
  return { success: true, nft: name };
};
