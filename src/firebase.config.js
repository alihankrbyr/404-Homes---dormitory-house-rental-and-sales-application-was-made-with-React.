// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDFzQlv9ABL1aPNvXm6axRPxZYryMLpyiE",
    authDomain: "homes-rp4.firebaseapp.com",
    databaseURL: "https://homes-rp4-default-rtdb.firebaseio.com",
    projectId: "homes-rp4",
    storageBucket: "homes-rp4.appspot.com",
    messagingSenderId: "579818334029",
    appId: "1:579818334029:web:c18863267372195c533904",
    measurementId: "G-1JS1Z5FC9P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()