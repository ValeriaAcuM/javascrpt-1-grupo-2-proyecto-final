const formulario = document.getElementById("formulario");

let lista_productos = JSON.parse(localStorage.getItem("producto")) || [];

// ingresa productos
const ingresar_producto = (form_data) => {
  const datos_campos = [...form_data];
  const datos = {};

  datos_campos.forEach((item) => {
    datos["id"] = Math.floor(Math.random() * 999);
    datos[item.name] = item.value;
  });

  lista_productos.push(datos);
  localStorage.setItem("producto", JSON.stringify(lista_productos));
  form_data.reset();
}

// validar los productos que se repiten
const validar_repetido = (target) => {
  const nombre_producto = document.getElementById('nombre').value;

  const resultado_busqueda = lista_productos.find(producto =>
    producto.nombre.toLowerCase() === nombre_producto.toLowerCase()
  )

  console.log(resultado_busqueda);
  if (!resultado_busqueda) {
    return ingresar_producto(target);
  }
  return alert('Se encuentra un producto repetido, debe ingresar uno diferente!');
}


// muestra productos html
const imprimir_productos = () => {
  const imprimir = lista_productos.map((item) => {
    return `
      <li class="card__producto">
      <div >
          <h2>${item.nombre}</h2>
          <p>Precio: ${item.precio} ₡</p>
          <p>Descripción: ${item.descripcion}</p>
          <p>Categoría: ${item.categoria}</p>
          <p>Cantidad: ${item.cantidad}</p>
        </div>
        <button id=${item.id}>Eliminar</button>
      </li>
    `;
  });

  document.querySelector(".container__productos").innerHTML = imprimir.join("");
  verificar();
}
imprimir_productos();

// creo una funcion que me permita verificar la entrada del boton
function verificar() {
  lista_productos.forEach((i) =>

    document.getElementById(i.id).addEventListener("click", () => {
      lista_productos.forEach(function (id, index, object) {

        if (id.id === i.id) {
          object.splice(index, 1);
          localStorage.setItem("producto", JSON.stringify(lista_productos));
          lista_productos = JSON.parse(localStorage.getItem("producto")) || [];
          imprimir_productos();
        }

      });
    })

  );
}


// buscar productos
document.addEventListener('keyup', e => {
  if (e.target.matches('#buscador')) {

    document.querySelectorAll('.card__producto').forEach(producto => {

      if (producto.textContent.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())) {
        producto.classList.remove('filtrar')
      } else {
        producto.classList.add('filtrar')
      }

    })

  }
})


// llama a las funnciones de ingresar y imprimir

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  validar_repetido(e.target);
  imprimir_productos();
});

// Elimina todos los productos
document.getElementById("eliminar").addEventListener("click", () => {
  localStorage.removeItem("producto");
  lista_productos = JSON.parse(localStorage.getItem("producto")) || [];
  imprimir_productos();
});

