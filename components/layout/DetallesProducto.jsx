import React from 'react';
import styled from '@emotion/styled';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';
import Link from 'next/link';

const Producto = styled.li`
  padding: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e1e1e1;
`;

const DescriptionProducto = styled.div`
  flex: 0 1 600px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  column-gap: 2rem;
`;

const Titulo = styled.a`
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
  &:hover {
    cursor: pointer;
  }
`;

const TextoDescripcion = styled.p`
  font-size: 1.6rem;
  margin: 0;
  color: #888;
`;

const Comentarios = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;

  div {
    display: flex;
    align-items: center;
    border: 1px solid #e1e1e1;
    padding: 0.3rem 1rem;
    margin-right: 2rem;
  }
  img {
    width: 2rem;
    margin-right: 2rem;
  }
  p {
    font-size: 1.6rem;
    margin-right: 1rem;
    font-weight: 700;
    &:last-of-type {
      margin: 0;
    }
  }
`;

const Imagen = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
`;

const Votes = styled.div`
  flex: 0 0 auto;
  text-align: center;
  border: 1px solid #e1e1e1;
  padding: 1rem 3rem;
  div {
    font-size: 2rem;
  }
  p {
    margin: 0;
    font-size: 2rem;
    font-weight: 700;
  }
`;

export default function DetallesProducto({ producto }) {
  const {
    id,
    comentarios,
    creado,
    descripcion,
    empresa,
    nombre,
    url,
    urlImagen,
    votos,
  } = producto;

  return (
    <Producto>
      <DescriptionProducto>
        <div>
          <Imagen src={urlImagen} />
        </div>
        <div>
          <Link href="/productos/[id]" as={`/productos/${id}`} passHref>
            <Titulo>{nombre}</Titulo>
          </Link>
          <TextoDescripcion>{descripcion}</TextoDescripcion>
          <div>
            <Comentarios>
              <img src="/static/img/comentario.png" />
              <p>{comentarios.length} Comentarios</p>
            </Comentarios>
            <p>
              Puclicado hace:{' '}
              {formatDistanceToNow(new Date(creado), { locale: es })}
            </p>
          </div>
        </div>
      </DescriptionProducto>
      <Votes>
        <div>&#9650;</div>
        <p>{votos}</p>
      </Votes>
    </Producto>
  );
}
