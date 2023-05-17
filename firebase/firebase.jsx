import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

import firebaseConfig from './config';

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

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
