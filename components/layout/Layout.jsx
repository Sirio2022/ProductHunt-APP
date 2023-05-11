import React from 'react';

export default function Layout(props) {
  return (
    <>
      <h1>Header</h1>
      <main>{props.children}</main>
    </>
  );
}
