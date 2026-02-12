# SkillTrust Backend API - Complete Route Documentation

## Server Status: ✅ READY

### Base URL
`http://localhost:3000`

---

## 📋 All Mounted Routes

### 1️⃣ Users Module - `/api/users`
**Status:** ✅ Complete

- **GET** `/api/users/:id`
  - Get user profile by ID
  - Response: `{ success: true, data: { id, name, email, tokens, reputation, completedSessions, languages, nfts } }`

- **POST** `/api/users`
  - Create new user
  - Body: `{ id, name, email, languages, profileImage }`
  - Response: `{ success: true, data: user }`

- **PUT** `/api/users/:id`
  - Update user profile (allowed fields: languages, displayName)
  - Body: `{ languages: [], displayName: "string" }`
  - Response: `{ success: true, data: user }`

---

### 2️⃣ Sessions Module - `/api/sessions`
**Status:** ✅ Complete (Working - DO NOT MODIFY)

- **POST** `/api/sessions`
  - Create new session (deducts 10 tokens)
  - Body: `{ userId, mentorId, skill, date, time }`
  - Response: `{ success: true, data: session }`

- **GET** `/api/sessions/user/:userId`
  - Get all sessions for a user
  - Response: `{ success: true, data: [sessions] }`

- **PATCH** `/api/sessions/:id`
  - Update session status (refunds 10 tokens if cancelled)
  - Body: `{ status: "Booked" | "Cancelled" | "Completed" }`
  - Response: `{ success: true, data: session }`

---

### 3️⃣ Mentors Module - `/api/mentors`
**Status:** ✅ Complete

- **GET** `/api/mentors`
  - Get all mentors
  - Response: `{ success: true, data: [mentors] }`

- **GET** `/api/mentors/:id`
  - Get single mentor by ID
  - Response: `{ success: true, data: mentor }`

- **POST** `/api/mentors`
  - Create new mentor (admin testing)
  - Body: `{ name, skill, rating, experienceYears, profileImage, tagline }`
  - Required: `name, skill`
  - Response: `{ success: true, data: mentor }`

---

### 4️⃣ Courses Module - `/api/courses`
**Status:** ✅ Complete

- **GET** `/api/courses`
  - Get all courses
  - Response: `{ success: true, data: [courses] }`

- **GET** `/api/courses/:id`
  - Get single course by ID
  - Response: `{ success: true, data: course }`

- **POST** `/api/courses`
  - Create new course
  - Body: `{ title, category, difficulty, tags }`
  - Required: `title, category`
  - Response: `{ success: true, data: course }`

---

### 5️⃣ Tokens Module - `/api/tokens`
**Status:** ✅ Complete

- **POST** `/api/tokens/deduct`
  - Deduct tokens from user
  - Body: `{ userId, amount }`
  - Response: `{ success: true, data: { balance: number } }`
  - Error: `{ success: false, message: "Insufficient tokens" }`

- **POST** `/api/tokens/add`
  - Add tokens to user
  - Body: `{ userId, amount }`
  - Response: `{ success: true, data: { balance: number } }`

---

### 6️⃣ NFTs Module - `/api/nfts`
**Status:** ⏳ Placeholder (Coming Soon)

- **GET** `/api/nfts`
  - Response: `{ message: 'NFT routes - coming soon' }`

---

## 🗄️ Firestore Collections

1. **users** - User profiles and token balances
2. **sessions** - Booking sessions
3. **mentors** - Mentor profiles
4. **courses** - Course catalog

---

## 🔧 UserService Functions

All token operations go through these service functions:

- `getUserById(userId)` - Get user data
- `createUser(userId, userData)` - Create new user
- `updateUser(userId, updateData)` - Update user profile
- `incrementTokens(userId, amount)` - Add/subtract tokens (used by sessions)
- `deductTokens(userId, amount)` - Deduct tokens with validation
- `addTokens(userId, amount)` - Add tokens
- `incrementCompletedSessions(userId)` - Increment session count
- `updateReputation(userId, value)` - Update reputation score
- `addNFT(userId, nftData)` - Add NFT to user

---

## ✅ Integration Checklist

- [x] mentorRoutes properly imported in app.js
- [x] tokenRoutes properly imported in app.js
- [x] All routes export Express routers
- [x] All controllers exist and export functions
- [x] All services use consistent Firestore patterns
- [x] Session logic untouched and working
- [x] Clean HTTP response format: `{ success: true/false, data/message }`
- [x] Proper async/await with try/catch
- [x] No blockchain implementation (as requested)

---

## 🚀 Start Server

```bash
cd backend
npm start
```

Server will run on: `http://localhost:3000`

---

## 📝 Notes

- Session module is working correctly - DO NOT MODIFY
- Token deduction/addition goes through userService functions
- All responses follow clean format: `{ success, data/message }`
- No overengineering - simple, readable, production-ready code
- Blockchain integration NOT implemented (as requested)
