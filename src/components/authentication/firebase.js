// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDskllUa3HR9rVv9SRJohPsiA7z6keBaSM",
  authDomain: "coherence-test-6bfe6.firebaseapp.com",
  projectId: "coherence-test-6bfe6",
  storageBucket: "coherence-test-6bfe6.appspot.com",
  messagingSenderId: "695303343859",
  appId: "1:695303343859:web:2407cf0bb395fb720e7186",
  measurementId: "G-C5ZZR7PQB1"
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const firestore = getFirestore(app)
export default app;