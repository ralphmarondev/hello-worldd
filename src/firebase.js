import { initializeApp } from 'firebase/app';
import {getFirestore, collection, addDoc} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDqVWdBYj-uBKpYHqSaQ6WVFvjcLG5ml5U',
  authDomain: 'blog-web-app-aea9d.firebaseapp.com',
  projectId: 'blog-web-app-aea9d',
  storageBucket: 'blog-web-app-aea9d.appspot.com',
  messagingSenderId: '709814163951',
  appId: '1:709814163951:web:92a507790b541ba2ea7e1a'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc};

