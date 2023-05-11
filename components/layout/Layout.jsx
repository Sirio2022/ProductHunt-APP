import React from 'react';
import Link from 'next/link';
import Header from './Header';

export default function Layout(props) {
  return (
    <>
      <Header />

      <main>{props.children}</main>
    </>
  );
}
