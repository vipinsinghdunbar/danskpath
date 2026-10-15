import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
// NOTE: In production, these should be environment variables (VITE_FIREBASE_*)
// For now, using a public config (OK because Firebase security rules restrict data access)
const firebaseConfig = {
  apiKey: "AIzaSyDqB7x8vK9mZ3nR2pL5qW4sT6uV7wX8yZ9",
  authDomain: "danskpath-app.firebaseapp.com",
  projectId: "danskpath-app",
  storageBucket: "danskpath-app.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456789"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
