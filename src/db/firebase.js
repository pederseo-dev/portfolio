// src/db/firebase.js
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDJT3buTePGkGvkU1JmZ_BNLOZ2FqK-_w4",
  authDomain: "pederseo-db.firebaseapp.com",
  projectId: "pederseo-db",
  storageBucket: "pederseo-db.firebasestorage.app",
  messagingSenderId: "847781745864",
  appId: "1:847781745864:web:8eee2a03e259f8808641fd"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)