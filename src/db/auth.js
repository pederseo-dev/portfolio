// src/db/auth.js
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'
import { auth } from './firebase'

const provider = new GoogleAuthProvider()

// --- Login ---
export const loginWithGoogle = () => signInWithPopup(auth, provider)

// --- Logout ---
export const logout = () => signOut(auth)

// --- Token (Firebase lo renueva solo, esto es por si necesitás el valor) ---
export const getToken = () => auth.currentUser?.getIdToken()