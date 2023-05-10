
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClBKz-RGqKsViLPy8sSjyIQiYur44zkPI",
  authDomain: "csapat-12-webshop-projekt.firebaseapp.com",
  databaseURL: "https://csapat-12-webshop-projekt-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "csapat-12-webshop-projekt",
  storageBucket: "csapat-12-webshop-projekt.appspot.com",
  messagingSenderId: "375709736118",
  appId: "1:375709736118:web:03d5a1c61396260d7f9a17"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);