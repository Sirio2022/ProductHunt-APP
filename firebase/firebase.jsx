import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import firebaseConfig from './config';

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export const db = getFirestore(app);
export const storage = getStorage(app);

/**
 *
 * @param {File} file
 * @returns {Promise<string>}
 */

export const uploadImage = async (file) => {
  const storageRef = ref(storage, `productos/${file.name}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
};

// Registrar un usuario
export const registrar = async (nombre, email, password) => {
  const nuevoUsuario = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  return await updateProfile(nuevoUsuario.user, {
    displayName: nombre,
  });
};

// Iniciar sesión del usuario
export const login = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// Cerrar sesión del usuario
export const cerrarSesion = async () => {
  return await auth.signOut();
};
