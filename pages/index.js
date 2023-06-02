import React, { useEffect, useState, useContext } from 'react';
import Layout from '../components/layout/Layout';
import { collection, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import DetallesProducto from '../components/layout/DetallesProducto';

const Home = () => {
  const [productos, guardarProductos] = useState([]);

  useEffect(() => {
    const obtenerProductos = async () => {
      const querySnapshot = await getDocs(
        collection(db, 'productos'),
        orderBy('creado', 'desc')
      );
      const productos = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      guardarProductos(productos);
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
