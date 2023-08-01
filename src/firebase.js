// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBS4vzkvESh3VofZMjN2SEXbxiz7tx4BYI",
  authDomain: "ideaverse-af3f5.firebaseapp.com",
  projectId: "ideaverse-af3f5",
  storageBucket: "ideaverse-af3f5.appspot.com",
  messagingSenderId: "846780531686",
  appId: "1:846780531686:web:b4f61ca01cdf718ec34c27",
  measurementId: "G-4H3EM2KXKE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
const auth = getAuth(app);

export default auth;
