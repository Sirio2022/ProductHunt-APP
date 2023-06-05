import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/layout/Layout';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import Error404 from '../../components/layout/404';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';
import { Campo, InputSubmit } from '../../components/ui/Formulario';
import Boton from '../../components/ui/Boton';
import { FirebaseContext } from '../../firebase';

const ContenedorProducto = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 2rem;
  }
`;

export default function Producto() {
  // State del componente
  const [producto, setProducto] = useState({});
  const [error, setError] = useState(false);
  const [comentario, setComentario] = useState({});

  // Routing para obtener el id actual
  const router = useRouter();
  const {
    query: { id },
  } = router;

  //Context de firebase
  const { usuario } = useContext(FirebaseContext);

  useEffect(() => {
    if (id) {
      const obtenerProducto = async () => {
        const docRef = doc(db, 'productos', id);
        await getDoc(docRef).then((doc) => {
          if (doc.exists()) {
            setProducto(doc.data());
            //console.log('Document data:', doc.data());
          } else {
            // doc.data() will be undefined in this case
            setError(true);
          }
        });
      };

      obtenerProducto();
    }
  }, [id, producto]);

  if (Object.keys(producto).length === 0) return 'Cargando...';

  const {
    comentarios,
    creado,
    descripcion,
    empresa,
    nombre,
    url,
    urlImagen,
    votos,
    creador,
    haVotado,
  } = producto;

  // Administrar y validar los votos
  const votarProducto = () => {
    if (!usuario) {
      return router.push('/login');
    }

    // Obtener y sumar un nuevo voto
    const nuevoTotal = votos + 1;

    // Verificar si el usuario actual ha votado
    if (haVotado.includes(usuario.uid)) return;

    // Guardar el ID del usuario que ha votado
    const nuevoHaVotado = [...haVotado, usuario.uid];

    // Actualizar en la BD
    const docRef = doc(db, 'productos', id);
    setDoc(
      docRef,
      { votos: nuevoTotal, haVotado: nuevoHaVotado },
      { merge: true }
    );

    // Actualizar el state
    setProducto({
      ...producto,
      votos: nuevoTotal,
    });
  };

  // Funciones para crear comentarios
  const comentarioChange = (e) => {
    setComentario({
      ...comentario,
      [e.target.name]: e.target.value,
    });
  };

  // Identifica si el comentario es del creador del producto
  const agregarComentario = (e) => {
    e.preventDefault();

    if (!usuario) {
      return router.push('/login');
    }

    // Informacion extra al comentario
    comentario.usuarioId = usuario.uid;
    comentario.usuarioNombre = usuario.displayName;

    // Tomar copia de comentarios y agregarlos al arreglo
    const nuevosComentarios = [...comentarios, comentario];

    // Actualizar la BD
    const docRef = doc(db, 'productos', id);
    setDoc(docRef, { comentarios: nuevosComentarios }, { merge: true });

    // Actualizar el state
    setProducto({
      ...producto,
      comentarios: nuevosComentarios,
    });
  };

  return (
    <Layout>
      <>
        {error && <Error404 />}
        <div className="contenedor">
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >
            {nombre}
          </h1>
          <ContenedorProducto>
            <div>
              <p>
                Puclicado hace:{' '}
                {formatDistanceToNow(new Date(creado), { locale: es })}
              </p>
              <p>
                Por {creador.nombre}, de la empresa: {empresa}
              </p>

              <img src={urlImagen} />
              <p>{descripcion}</p>

              {usuario && (
                <>
                  <h2>Agrega tu comentario</h2>
                  <form onSubmit={agregarComentario}>
                    <Campo>
                      <input
                        type="text"
                        name="mensaje"
                        onChange={comentarioChange}
                      />
                    </Campo>
                    <InputSubmit type="submit" value="Agregar comentario" />
                  </form>
                </>
              )}

              <h2
                css={css`
                  margin: 2rem 0;
                `}
              >
                Comentarios
              </h2>

              {comentarios.map((comentario) => (
                <li>
                  <p>{comentario.nombre}</p>
                  <p>Escrito por: {comentario.usuarioNombre}</p>
                </li>
              ))}
            </div>
            <aside>
              <Link href={url} passHref target="_blank">
                <Boton bgColor="true">Visitar URL</Boton>
              </Link>

              <div
                css={css`
                  margin-top: 5rem;
                `}
              >
                <p
                  css={css`
                    text-align: center;
                  `}
                >
                  {votos} Votos
                </p>

                {usuario && <Boton onClick={votarProducto}>Votar</Boton>}
              </div>
            </aside>
          </ContenedorProducto>
        </div>
      </>
    </Layout>
  );
}
