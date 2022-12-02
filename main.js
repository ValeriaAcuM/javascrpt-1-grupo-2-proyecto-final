const formulario = document.getElementById("formulario");

let lista_productos = JSON.parse(localStorage.getItem("producto")) || [];

// Esta funcion ingresa productos
function ingresar_producto(form_data) {
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

// muestra productos html
const imprimir_productos = () => {
  const imprimir = lista_productos.map((item) => {
    return `
      <li class="card__producto">
        <div>
          <h2>Nombre producto: ${item.nombre}</h2>
          <p>Precio: ${item.precio} ₡</p>
          <p>Descripción: ${item.descripcion}</p>
          <p>Categoría: ${item.categoria}</p>
          <p>Cantidad: ${item.cantidad}</p>
        </div>
        <button id=${item.id}>eliminar</button>
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


// llama a las funnciones de ingresar y imprimir
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  ingresar_producto(e.target);
  imprimir_productos();
});

// Elimina todos los productos
document.getElementById("eliminar").addEventListener("click", () => {
  localStorage.removeItem("producto");
  lista_productos = JSON.parse(localStorage.getItem("producto")) || [];
  imprimir_productos();
});

