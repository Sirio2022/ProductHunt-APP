import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';

const useProductos = (orden) => {
  const [productos, guardarProductos] = useState([]);

  useEffect(() => {
    // Consultar la base de datos con los productos disponibles oodenados por fecha de creación.

    //Tiempo real
    const obtenerProductos = () => {
      const collection_ref = collection(db, 'productos');
      const q = query(collection_ref, orderBy(orden, 'desc'));

      onSnapshot(q, (querySnapshot) => {
        const productos = [];

        querySnapshot.forEach((doc) => {
          productos.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        guardarProductos(productos);
      });
    };

    obtenerProductos();
  }, []);
  return { productos };
};

export default useProductos;
