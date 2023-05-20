
import { initializeApp } from "firebase/app";
import {getFirestore }from 'firebase/firestore/lite'
const firebaseConfig = {
  apiKey: "AIzaSyCux5orY1VLIE-m-4W9vy21ver5yWdcLYI",
  authDomain: "docs-2acc0.firebaseapp.com",
  projectId: "docs-2acc0",
  storageBucket: "docs-2acc0.appspot.com",
  messagingSenderId: "581344984946",
  appId: "1:581344984946:web:b4d72c4e6c9c76088027eb"
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)