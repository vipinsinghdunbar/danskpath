import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration - hardcoded for staging
const firebaseConfig = {
  apiKey: 'AIzaSyAJDsnCCB0zExAZaSorg51U9_a2EFn0hyE',
  authDomain: 'danskpath-app.firebaseapp.com',
  projectId: 'danskpath-app',
  storageBucket: 'danskpath-app.firebasestorage.app',
  messagingSenderId: '366743322081',
  appId: '1:366743322081:web:7c913f27bb242c8bf5e6a0'
};

// Log config for debugging (remove in production)
console.log('Firebase Config:', {
  apiKey: firebaseConfig.apiKey ? '✓ set' : '✗ missing',
  authDomain: firebaseConfig.authDomain ? '✓ set' : '✗ missing',
  projectId: firebaseConfig.projectId ? '✓ set' : '✗ missing',
  storageBucket: firebaseConfig.storageBucket ? '✓ set' : '✗ missing',
  messagingSenderId: firebaseConfig.messagingSenderId ? '✓ set' : '✗ missing',
  appId: firebaseConfig.appId ? '✓ set' : '✗ missing'
});

// Validate configuration
const requiredFields = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
const missingFields = requiredFields.filter(field => !firebaseConfig[field]);

if (missingFields.length > 0) {
  console.error('❌ Firebase configuration incomplete. Missing:', missingFields);
  console.error('Current config:', firebaseConfig);
}

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
  console.log('✓ Firebase initialized successfully');
} catch (error) {
  console.error('❌ Firebase initialization error:', error);
  throw error;
}

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
