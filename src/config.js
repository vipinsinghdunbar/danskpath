// Firebase configuration
// Using import.meta.env for environment variables with hardcoded fallbacks
export const FIREBASE_CONFIG = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? 'AIzaSyAJDsnCCB0zExAZaSorg51U9_a2EFn0hyE',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? 'danskpath-app.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? 'danskpath-app',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? 'danskpath-app.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? '366743432081',
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? '1:366743432081:web:7c913f27bb242c8bf5e6a0'
};

// Validate that all required fields are present
const requiredFields = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
const missingFields = requiredFields.filter(field => !FIREBASE_CONFIG[field]);

if (missingFields.length > 0) {
  console.error('❌ Firebase config missing fields:', missingFields);
  console.error('Current config:', FIREBASE_CONFIG);
} else {
  console.log('✅ Firebase config loaded successfully');
}
