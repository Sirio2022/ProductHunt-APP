import React, { useEffect, useState, useContext } from 'react';
import Layout from '../components/layout/Layout';
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import DetallesProducto from '../components/layout/DetallesProducto';

const Home = () => {
  const [productos, guardarProductos] = useState([]);

  useEffect(() => {
    // Consultar la base de datos con los productos disponibles oodenados por fecha de creación.

    //Tiempo real
    const obtenerProductos = () => {
      const collection_ref = collection(db, 'productos');
      const q = query(collection_ref, orderBy('creado', 'desc'));

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

  return (
    <div>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <ul className="bg-white">
              {productos.map((producto) => (
                <DetallesProducto key={producto.id} producto={producto} />
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Home;
