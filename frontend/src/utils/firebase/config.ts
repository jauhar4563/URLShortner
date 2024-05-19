
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyDT1hRcwCRJ8a7WNzWrxIqEgWzWxwG5hsg",
    authDomain: "urlshortner-dfdd1.firebaseapp.com",
    projectId: "urlshortner-dfdd1",
    storageBucket: "urlshortner-dfdd1.appspot.com",
    messagingSenderId: "773511936493",
    appId: "1:773511936493:web:70b295113fd9a62b42cfe4",
    measurementId: "G-RJ47499NBG"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
