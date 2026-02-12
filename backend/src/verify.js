// Quick verification script to check all imports
console.log('🔍 Verifying Backend Integration...\n');

try {
  console.log('✓ Loading express...');
  require('express');
  
  console.log('✓ Loading firebase config...');
  const firebase = require('./config/firebase');
  
  console.log('✓ Loading user routes...');
  require('./routes/userRoutes');
  
  console.log('✓ Loading course routes...');
  require('./routes/courseRoutes');
  
  console.log('✓ Loading session routes...');
  require('./routes/sessionRoutes');
  
  console.log('✓ Loading mentor routes...');
  require('./routes/mentorRoutes');
  
  console.log('✓ Loading token routes...');
  require('./routes/tokenRoutes');
  
  console.log('✓ Loading nft routes...');
  require('./routes/nftRoutes');
  
  console.log('✓ Loading user service...');
  require('./services/userService');
  
  console.log('✓ Loading mentor service...');
  require('./services/mentorService');
  
  console.log('✓ Loading course service...');
  require('./services/courseService');
  
  console.log('✓ Loading session controller...');
  require('./controllers/sessionController');
  
  console.log('✓ Loading mentor controller...');
  require('./controllers/mentorController');
  
  console.log('✓ Loading course controller...');
  require('./controllers/courseController');
  
  console.log('✓ Loading token controller...');
  require('./controllers/tokenController');
  
  console.log('\n✅ All modules loaded successfully!');
  console.log('✅ No import errors detected!');
  console.log('\n📋 Ready to start server with: npm start');
  
} catch (error) {
  console.error('\n❌ Error detected:', error.message);
  console.error(error.stack);
  process.exit(1);
}
