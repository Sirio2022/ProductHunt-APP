import React, { useState, useEffect } from 'react';
import firebase from '../firebase/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const useAutenticacion = () => {
  const [usuarioAutenticado, guardarUsuarioAutenticado] = useState(null);

  const auth = getAuth(firebase);

  useEffect(() => {
    onAuthStateChanged(auth, (usuario) => {
      if (usuario) {
        guardarUsuarioAutenticado(usuario);
      } else {
        guardarUsuarioAutenticado(null);
      }
    });
  }, [ auth]);

  return usuarioAutenticado;
};

export default useAutenticacion;
