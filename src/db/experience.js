// src/db/experience.js
import { collection, getDocs, addDoc, deleteDoc, doc, orderBy, query } from 'firebase/firestore'
import { db } from './firebase'

const COL = 'portfolio-experience'

// --- Leer ---
export const getExperience = async () => {
  const q = query(collection(db, COL), orderBy('start'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
}

// --- Crear ---
export const addExperience = (data) => addDoc(collection(db, COL), {
  company: data.company,
  role: data.role,
  type: data.type,
  start: data.start,
  end: data.end ?? null,
  current: data.current,
  description: data.description,
  logo: data.logo ?? '',
})

// --- Eliminar ---
export const deleteExperience = (id) => deleteDoc(doc(db, COL, id))