import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDPcLN9KmW_e3AHZ5ZYtLS_R6eN10L2yrs",
  authDomain: "auth-next-648f4.firebaseapp.com",
  databaseURL: "https://auth-next-648f4-default-rtdb.firebaseio.com",
  projectId: "auth-next-648f4",
  storageBucket: "auth-next-648f4.appspot.com",
  messagingSenderId: "875449856727",
  appId: "1:875449856727:web:083b461c943b4f29c47692"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
