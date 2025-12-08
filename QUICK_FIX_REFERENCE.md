# Quick Fix Reference - SkillTrust Project

## 🚨 Files That Need Immediate Fixes

### Critical Security Issues

1. **`src/firebase.js`**
   - **Issue:** Firebase API keys hardcoded
   - **Fix:** Move to environment variables
   - **Priority:** CRITICAL

2. **`src/components/FloatingChatbot.js`**
   - **Issue:** Gemini API key hardcoded (line 14)
   - **Fix:** Move to environment variable
   - **Priority:** CRITICAL

3. **`src/pages/CodeEditor.js`**
   - **Issue:** `new Function()` code execution vulnerability (line 27)
   - **Fix:** Remove or sandbox execution
   - **Priority:** CRITICAL

### Missing Core Features

4. **`src/pages/Dashboard.js`**
   - **Issue:** Simulated blockchain minting (lines 28-47)
   - **Fix:** Implement real Web3/blockchain integration
   - **Priority:** CRITICAL

5. **`src/pages/Login.js`**
   - **Issue:** Simulated wallet connection (lines 15-16, 66-70)
   - **Fix:** Implement real MetaMask/Web3 wallet connection
   - **Priority:** CRITICAL

### Authentication & Error Handling

6. **`src/App.js`**
   - **Issue:** Auth flow needs improvement (lines 23-32)
   - **Fix:** Add proper cleanup, loading states, error handling
   - **Priority:** HIGH

7. **`src/pages/ChatPage.js`**
   - **Issue:** Firestore subcollection may not exist (line 18)
   - **Fix:** Add error handling and document creation
   - **Priority:** HIGH

8. **`src/pages/LiveSession.js`**
   - **Issue:** Missing error handling for Jitsi script loading
   - **Fix:** Add timeout and error handling
   - **Priority:** MEDIUM

9. **`src/pages/Dashboard.js`**
   - **Issue:** No error handling for Firestore operations
   - **Fix:** Add try-catch blocks and user feedback
   - **Priority:** MEDIUM

10. **`src/pages/BookingPage.js`**
    - **Issue:** Basic error handling, needs improvement
    - **Fix:** Enhanced error messages and retry logic
    - **Priority:** MEDIUM

11. **`src/pages/UserProfile.js`**
    - **Issue:** No error handling
    - **Fix:** Add error handling
    - **Priority:** MEDIUM

### Backend & Data

12. **`src/pages/AdminPanel.js`**
    - **Issue:** Uses hardcoded data (lines 6-15)
    - **Fix:** Connect to real backend API
    - **Priority:** HIGH

### Configuration Files

13. **`.env`** (NEW FILE NEEDED)
    - **Issue:** File doesn't exist
    - **Fix:** Create with environment variables
    - **Priority:** CRITICAL

14. **`.env.example`** (NEW FILE NEEDED)
    - **Issue:** File doesn't exist
    - **Fix:** Create template file
    - **Priority:** HIGH

15. **`package.json`**
    - **Issue:** Dependencies may be outdated
    - **Fix:** Run `npm audit` and update dependencies
    - **Priority:** MEDIUM

---

## 📋 Step-by-Step Quick Fix Plan

### Step 1: Secure API Keys (30 minutes)
1. Create `.env` file in project root
2. Add Firebase and Gemini API keys to `.env`
3. Create `.env.example` template
4. Update `src/firebase.js` to use `process.env`
5. Update `src/components/FloatingChatbot.js` to use `process.env`
6. Verify `.env` is in `.gitignore`

### Step 2: Fix Code Editor Security (30 minutes)
1. Option A: Remove code execution feature
2. Option B: Implement sandboxed execution (iframe/Web Worker)
3. Update `src/pages/CodeEditor.js`

### Step 3: Fix Auth Flow (20 minutes)
1. Add cleanup function to `onAuthStateChanged`
2. Add loading state
3. Improve navigation logic
4. Update `src/App.js`

### Step 4: Add Error Handling (2 hours)
1. Add try-catch to all async operations
2. Add user-friendly error messages
3. Add loading states
4. Update all page components

### Step 5: Implement Blockchain (10-15 hours)
1. Install `ethers` or `web3` package
2. Create wallet service
3. Create blockchain service
4. Deploy smart contracts
5. Update Dashboard and Login pages

### Step 6: Build Backend APIs (15-20 hours)
1. Set up backend server
2. Implement REST endpoints
3. Update frontend to use APIs
4. Replace Firestore calls with API calls

### Step 7: Update Dependencies (1-2 hours)
1. Run `npm audit`
2. Update packages one by one
3. Test after each update
4. Fix breaking changes

---

## 🔑 Environment Variables Needed

Create `.env` file with:

```env
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_GEMINI_API_KEY=your_gemini_api_key
```

---

## 📦 New Dependencies Needed (for blockchain)

Add to `package.json`:
```json
{
  "ethers": "^6.0.0",
  "@metamask/detect-provider": "^2.0.0"
}
```

---

## ✅ Testing Checklist

After fixes:
- [ ] App compiles without errors
- [ ] Login works
- [ ] Dashboard loads
- [ ] Booking works
- [ ] Wallet connects (if implemented)
- [ ] Token minting works (if implemented)
- [ ] NFT minting works (if implemented)
- [ ] Live session loads
- [ ] Chat works
- [ ] Admin panel works
- [ ] No API keys in build files
- [ ] Error messages display properly

---

## 📞 Next Steps

1. Start with Step 1 (Secure API Keys) - Most critical
2. Then Step 2 (Code Editor Security)
3. Then Step 3 (Auth Flow)
4. Continue with remaining steps in order

See `PROJECT_ANALYSIS_REPORT.md` for detailed analysis.

