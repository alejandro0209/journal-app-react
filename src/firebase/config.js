// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOp0DiNTGk8XA412f61ZcgwQgCzC25cps",
  authDomain: "react-curso-fe3f1.firebaseapp.com",
  projectId: "react-curso-fe3f1",
  storageBucket: "react-curso-fe3f1.appspot.com",
  messagingSenderId: "794187011975",
  appId: "1:794187011975:web:5acb69f1fd714d25d6e522"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );
