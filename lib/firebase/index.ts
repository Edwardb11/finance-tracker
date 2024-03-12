// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmHueq__Wt_74N1VJRxzsj5xmDzbKAbhg",
  authDomain: "finance-trancker.firebaseapp.com",
  projectId: "finance-trancker",
  storageBucket: "finance-trancker.appspot.com",
  messagingSenderId: "376752538568",
  appId: "1:376752538568:web:228c2e379ca482e2e9b6fd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
