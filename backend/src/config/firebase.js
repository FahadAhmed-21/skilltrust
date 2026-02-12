const admin = require('firebase-admin');

let db;

const initializeFirebase = () => {
  try {
    const serviceAccount = {
      type: "service_account",
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
    };

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: process.env.FIREBASE_PROJECT_ID,
    });

    db = admin.firestore();
    console.log('✅ Firebase initialized successfully');
  } catch (error) {
    console.error('❌ Firebase initialization failed:', error.message);
    process.exit(1);
  }
};

const getFirestore = () => {
  if (!db) {
    throw new Error('Firestore not initialized. Call initializeFirebase() first.');
  }
  return db;
};

const getAuth = () => admin.auth();

module.exports = {
  initializeFirebase,
  getFirestore,
  getAuth,
  admin
};