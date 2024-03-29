import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAK9AVqPCh6eWftjxN9A8GMl79S-Yao1KQ",
    authDomain: "cookbook-34494.firebaseapp.com",
    projectId: "cookbook-34494",
    storageBucket: "cookbook-34494.appspot.com",
    messagingSenderId: "266513405274",
    appId: "1:266513405274:web:46668b8f4d9cc963f48f63"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { app, auth, firestore };
