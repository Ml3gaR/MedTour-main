// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration details
const firebaseConfig = {
  apiKey: "AIzaSyArTQBOP9wX3wfXaHDwVDYKaV26VwpIXvc",
  authDomain: "medtour-70ff8.firebaseapp.com",
  projectId: "medtour-70ff8",
  storageBucket: "medtour-70ff8.appspot.com",
  messagingSenderId: "111155888938",
  appId: "1:111155888938:android:5b8cf31fabf369c68ad453",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

export { auth, db };
