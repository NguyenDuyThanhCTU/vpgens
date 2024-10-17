import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCU-LI5GX5qvN4zVKjz3amKRpMc-poQOfg",

  authDomain: "vpgens-e2128.firebaseapp.com",

  projectId: "vpgens-e2128",

  storageBucket: "vpgens-e2128.appspot.com",

  messagingSenderId: "292249397070",

  appId: "1:292249397070:web:bb8c50c1ee1e65c3f0a01f",

  measurementId: "G-Q8081JV8K5",
};

const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export const auth = getAuth(app);
