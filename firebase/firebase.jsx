import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  
} from 'firebase/auth';

import firebaseConfig from './config';

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

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
