// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6cn-B8WfK35BRr_qN17uAzMFWCKtQsRI",
  authDomain: "nanocounting.firebaseapp.com",
  projectId: "nanocounting",
  storageBucket: "nanocounting.appspot.com",
  messagingSenderId: "435559367442",
  appId: "1:435559367442:web:bb46db95c002cf195de9cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;