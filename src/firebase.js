// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXytHMZ7uCkDuW8-XG8xS4isq9T0sshLM",
  authDomain: "pokemons-52580.firebaseapp.com",
  projectId: "pokemons-52580",
  storageBucket: "pokemons-52580.firebasestorage.app",
  messagingSenderId: "811696851617",
  appId: "1:811696851617:web:3ab310a18b5629c34c7ee0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);