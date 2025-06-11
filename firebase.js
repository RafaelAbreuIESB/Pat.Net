// firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// 🔐 Substitua por suas credenciais
const firebaseConfig = {
  apiKey: "AIzaSyDBYS91J0tOAVJZfn628fDyMZM6knfgqNw",
  authDomain: "pat-net.firebaseapp.com",
  projectId: "pat-net",
  storageBucket: "pat-net.firebasestorage.app",
  messagingSenderId: "948266560725",
  appId: "1:948266560725:web:a0dabd1e4f9ac34ea6c65c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
