import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// Replace these with your actual Firebase config
// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY || "AIzaSyAYx7g1xuVmAlYuI89nxrlz2SKTCNr7ORo",
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN || "trackedge-journal-f199a.firebaseapp.com",
//   projectId: process.env.FIREBASE_PROJECT_ID || "trackedge-journal-f199a",
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "trackedge-journal-f199a.firebasestorage.app",
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "1003030605204",
//   appId: process.env.FIREBASE_APP_ID || "1:1003030605204:web:6e6f8697163bb6aef27381"
// };
const firebaseConfig = {
    apiKey: "AIzaSyAYx7g1xuVmAlYuI89nxrlz2SKTCNr7ORo",
    authDomain: "trackedge-journal-f199a.firebaseapp.com",
    projectId: "trackedge-journal-f199a",
    storageBucket: "trackedge-journal-f199a.firebasestorage.app",
    messagingSenderId: "1003030605204",
    appId: "1:1003030605204:web:6e6f8697163bb6aef27381"
};  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Configure Google provider
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export { auth, googleProvider };
