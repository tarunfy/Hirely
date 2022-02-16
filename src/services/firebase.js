// Import the functions you need from the SDKs you need
import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAIWVrefkO1b1J_a9ni-DIby7tdYAhq_s",
  authDomain: "hirely-29309.firebaseapp.com",
  projectId: "hirely-29309",
  storageBucket: "hirely-29309.appspot.com",
  messagingSenderId: "807640873025",
  appId: "1:807640873025:web:9332d5fb93453e1d2c2ec0"
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();
