// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

    apiKey: "AIzaSyBxqCSj7aZqcspUgQkP7DV-LYZjrveLy5Y",
    authDomain: "grp-4-e8ca2.firebaseapp.com",
    databaseURL: "https://grp-4-e8ca2-default-rtdb.firebaseio.com",
    projectId: "grp-4-e8ca2",
    storageBucket: "grp-4-e8ca2.appspot.com",
    messagingSenderId: "660410509750",
    appId: "1:660410509750:web:03318889d4837a63aaf917",
    measurementId: "G-P46TFD2H37"
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore()