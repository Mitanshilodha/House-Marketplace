// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDObkso7770UlG7SV9R0IaqSla3KxyzcVM",
  authDomain: "housemarketplace-app-4fe3f.firebaseapp.com",
  projectId: "housemarketplace-app-4fe3f",
  storageBucket: "housemarketplace-app-4fe3f.appspot.com",
  messagingSenderId: "376877190827",
  appId: "1:376877190827:web:dcdeab60ee56d1e0b2f1ee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db= getFirestore();