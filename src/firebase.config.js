// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3CdwvAZcvWXz81txjWotojEFYgEUVbN0",
  authDomain: "house-marketplace-2f5bc.firebaseapp.com",
  projectId: "house-marketplace-2f5bc",
  storageBucket: "house-marketplace-2f5bc.appspot.com",
  messagingSenderId: "69780990659",
  appId: "1:69780990659:web:bcf9fedf6c3dd401aed076"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()