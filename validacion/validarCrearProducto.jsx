export default function validarCrearCuenta(valores) {
  let errores = {};

  // Validar el nombre del usuario
  if (!valores.nombre) {
    errores.nombre = 'El nombre es obligatorio';
  }

  // Validar empresa
  if (!valores.empresa) {
    errores.empresa = 'El nombre de la empresa es obligatorio';
  }

  // validar la url
  if (!valores.url) {
    errores.url = 'La URL del producto es obligatoria';
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)) {
    errores.url = 'URL mal formateada o no válida';
  }

  // validar la descripcion
  if (!valores.descripcion) {
    errores.descripcion = 'Agrega una descripción de tu producto';
  }

  return errores;
}
