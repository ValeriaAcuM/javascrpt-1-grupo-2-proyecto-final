const formulario = document.getElementById('formulario');

let lista_productos = JSON.parse(localStorage.getItem('producto')) || [];

// Esta funcion ingresa productos
function ingresar_producto(form_data) {
  const datos_campos = [...form_data];
  const datos = {};

  datos_campos.forEach(item => {
    datos['id'] = Math.random();
    datos[item.name] = item.value;
  });

  lista_productos.push(datos);
  localStorage.setItem('producto', JSON.stringify(lista_productos));
  form_data.reset();
}

// muestra productos html
const imprimir_productos = () => {
  const imprimir = lista_productos.map(item => {
    return `
      <div class="card__producto">
        <div class="datos">
          <h2>Nombre producto: ${item.nombre}</h2>
          <p>Precio: ${item.precio}</p>
          <p>Descripción: ${item.descripcion}</p>
          <p>Categoría: ${item.categoria}</p>
          <p>Cantidad: ${item.cantidad}</p>
        </div>
        <button id="eliminar__producto">eliminar</button>
      </div>
    `
  })

  document.querySelector('.container__productos').innerHTML = imprimir.join('');
}
imprimir_productos();

// llama a las funnciones de ingresar y imprimir
formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  ingresar_producto(e.target);
  imprimir_productos();
})

// Elimina todos los productos
document.getElementById('eliminar').addEventListener('click', () => {
  localStorage.removeItem('producto');
  lista_productos = JSON.parse(localStorage.getItem('producto')) || [];
  imprimir_productos();
})