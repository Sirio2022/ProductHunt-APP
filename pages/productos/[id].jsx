import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import Error404 from '../../components/layout/404';

export default function Producto() {
  // State del componente
  const [producto, setProducto] = useState({});
  const [error, setError] = useState(false);

  // Routing para obtener el id actual
  const router = useRouter();
  const {
    query: { id },
  } = router;

  useEffect(() => {
    if (id) {
      const obtenerProducto = async () => {
        const docRef = doc(db, 'productos', id);
        const docSnap = await getDoc(docRef).then((doc) => {
          if (doc.exists()) {
            setProducto(docSnap);
            //console.log('Document data:', doc.data());
          } else {
            // doc.data() will be undefined in this case
            setError(true);
          }
        });
      };

      obtenerProducto();
    }
  }, [id]);

  return (
    <Layout>
      <>{error && <Error404 />}</>
    </Layout>
  );
}
