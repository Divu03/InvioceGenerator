import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDPE_dUm2RYer04pqpWHqbU_k6858dFl1M",
    authDomain: "invoice-generator-e78ac.firebaseapp.com",
    projectId: "invoice-generator-e78ac",
    storageBucket: "invoice-generator-e78ac.appspot.com",
    messagingSenderId: "734497770069",
    appId: "1:734497770069:web:7d2a7f47e98814a95962dc",
    measurementId: "G-EV17VXN0VY"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };