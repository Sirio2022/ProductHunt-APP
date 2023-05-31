import React, { useState, useContext } from 'react';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';

import Layout from '../components/layout/Layout';
import { Formulario, Campo, InputSubmit } from '../components/ui/Formulario';

// Firebase
import { FirebaseContext } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { uploadImage } from '../firebase/firebase';

// Validaciones
import useValidacion from '../hooks/useValidacion';
import validarCrearProducto from '../validacion/validarCrearProducto';

const STATE_INICIAL = {
  nombre: '',
  empresa: '',
  //imagen: '',
  url: '',
  descripcion: '',
};

const NuevoProducto = () => {
  const router = useRouter();
  const [error, guardarError] = useState(false);

  const [file, setFile] = useState(null);
  const [urlImagen, setUrlImagen] = useState('');

  const { valores, errores, handleSubmit, handleChange, handleBlur } =
    useValidacion(STATE_INICIAL, validarCrearProducto, crearProducto);

  const { nombre, empresa, imagen, url, descripcion } = valores;

  // Hook de context de firebase
  const { usuario } = useContext(FirebaseContext);

  async function crearProducto() {
    // Si el usuario no esta autenticado llevar al login
    if (!usuario) {
      return router.push('/login');
    }

    // Crear el objeto de nuevo producto
    const producto = {
      nombre,
      empresa,
      url,
      urlImagen,
      descripcion,
      votos: 0,
      comentarios: [],
      creado: Date.now(),
    };

    // Insertarlo en la base de datos
    try {
      await addDoc(collection(db, 'productos'), producto);
      const ImgUrl = await uploadImage(file);
      setUrlImagen(ImgUrl);
      console.log(ImgUrl);
    } catch (error) {
      console.log(error);
      guardarError(error.message);
    }

  }
  

  return (
    <div>
      <Layout>
        <>
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >
            Nuevo Producto
          </h1>

          <Formulario onSubmit={handleSubmit} noValidate>
            <fieldset>
              <legend>Información General</legend>

              <Campo>
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  placeholder="Tu Nombre"
                  name="nombre"
                  value={nombre}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Campo>

              {errores.nombre && <Error>{errores.nombre}</Error>}

              <Campo>
                <label htmlFor="empresa">Empresa</label>
                <input
                  type="text"
                  id="empresa"
                  placeholder="Nombre de la empresa"
                  name="empresa"
                  value={empresa}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Campo>

              {errores.empresa && <Error>{errores.empresa}</Error>}

              <Campo>
                <label htmlFor="imagen">Imagen</label>
                <input
                  type="file"
                  id="imagen"
                  name="imagen"
                  value={imagen}
                  onChange={(e) => setFile(e.target.files[0])}
                  onBlur={handleBlur}
                />
              </Campo>

              {errores.imagen && <Error>{errores.imagen}</Error>}

              <Campo>
                <label htmlFor="url">Url</label>
                <input
                  type="url"
                  id="url"
                  placeholder="URL de tu producto"
                  name="url"
                  value={url}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Campo>

              {errores.url && <Error>{errores.url}</Error>}
            </fieldset>

            <fieldset>
              <legend>Sobre tu producto</legend>

              <Campo>
                <label htmlFor="descripcion">Descripción</label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={descripcion}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Campo>

              {errores.descripcion && <Error>{errores.descripcion}</Error>}
            </fieldset>

            {error && <Error>{error}</Error>}

            <InputSubmit type="submit" value="Crear Producto" />
          </Formulario>
        </>
      </Layout>
    </div>
  );
};

export default NuevoProducto;
