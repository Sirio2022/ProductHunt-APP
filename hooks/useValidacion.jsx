import React, { useState, useEffect } from 'react';

export default function useValidacion(stateInicial, validar, fn) {
  const [valores, guardarValores] = useState(stateInicial);
  const [errores, guardarErrores] = useState({});
  const [submitForm, guardarSubmitForm] = useState(false);

  useEffect(() => {
    if (submitForm) {
      const noErrores = Object.keys(errores);

      if (noErrores) {
        fn(); // Fn = Funcion que se ejecuta en el componente
      }

      guardarSubmitForm(false);
    }
  }, [errores]);

  // Funcion que se ejecuta conforme el usuario escribe algo
  const handleChange = (e) => {
    guardarValores({
      ...valores,
      [e.target.name]: e.target.value,
    });
  };

  // Función que se ejecuta cuando el usuario hace submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const erroresValidacion = validar(valores);
    guardarErrores(erroresValidacion);
    guardarSubmitForm(true);
  };

  return {
    valores,
    errores,
    submitForm,
    handleSubmit,
    handleChange,
  };
}
