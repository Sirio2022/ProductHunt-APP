import React from 'react';
import Buscar from '../ui/Buscar';
import Navegacion from './Navegacion';
import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <div>
        <div>
          <p>P</p>
          <Buscar />
          <Navegacion />
        </div>

        <div>
          {' '}
          <p>Hola: Juan Manuel Alvarez</p>
          <button type="button">Cerrar Sesión</button>
            <Link href="/">Login</Link>
            <Link href="/">Crear Cuenta</Link>
        </div>
      </div>
    </header>
  );
}
