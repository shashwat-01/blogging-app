// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCllHpVhsNJr9uCdCD6mdQ0IHZQUTICCsE",
  authDomain: "blog-app-8f76b.firebaseapp.com",
  projectId: "blog-app-8f76b",
  storageBucket: "blog-app-8f76b.appspot.com",
  messagingSenderId: "116688055271",
  appId: "1:116688055271:web:b90dc75577b0e147186b42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db= getFirestore(app);
export const auth= getAuth(app);
export const provider= new GoogleAuthProvider();