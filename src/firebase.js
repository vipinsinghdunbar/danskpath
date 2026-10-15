import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { FIREBASE_CONFIG } from './config';

// Use the centralized Firebase config
const firebaseConfig = FIREBASE_CONFIG;

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
