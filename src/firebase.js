
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyA7i8MkZMEzqGsGlsK1GoG8eVxjO9S0RFA",
  authDomain: "chatto-f2182.firebaseapp.com",
  projectId: "chatto-f2182",
  storageBucket: "chatto-f2182.appspot.com",
  messagingSenderId: "745069493790",
  appId: "1:745069493790:web:5b01a315c07a4e76b5780f",
  measurementId: "G-0VEB5D12S6"
};

// Initialize firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();

