// src/db/projects.js
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from './firebase'

const COL = 'portfolio-projects'

// --- Leer ---
export const getProjects = async () => {
  const snapshot = await getDocs(collection(db, COL))
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
}

// --- Crear ---
export const addProject = (data) => addDoc(collection(db, COL), {
  name: data.name,
  description: data.description,
  stack: Array.isArray(data.stack) ? data.stack : data.stack.split(',').map(s => s.trim()).filter(Boolean),
  link: data.link ?? '',
  logo: data.logo ?? '',
  image: data.image ?? '',
  client: data.client ?? '',
  status: data.status,
  active: data.active ?? true,
})

// --- Eliminar ---
export const deleteProject = (id) => deleteDoc(doc(db, COL, id))