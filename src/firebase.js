import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration with fallback for staging
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyAJDsnCCB0zExAZaSorg51U9_a2EFn0hyE',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'danskpath-app.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'danskpath-app',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'danskpath-app.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '366743322081',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:366743322081:web:7c913f27bb242c8bf5e6a0'
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
