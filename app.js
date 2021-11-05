let carritoDeCompras = [];

const contenedorCarrito = document.getElementById("carrito-contenedor");
const btnCompra = document.querySelector(".btn-compra");
const contadorCarrito = document.getElementById("contadorCarrito");
const precioTotal = document.getElementById("precioTotal");
let stockProductos = [];

$.getJSON("stock.json", function (data) {
  localStorage.setItem("stock", JSON.stringify(data));
  recuperarStock();
  mostrarProductos(data);
  recuperarLS();
});
// muestro los productos segun el tipo(remeras,pantalones,zapatillas)
$("#selecTipo").on("change", () => {
  if ($("#selecTipo").val() == "all") {
    mostrarProductos(stockProductos);
  } else {
    mostrarProductos(
      stockProductos.filter(
        (productoAgregar) => productoAgregar.tipo == $("#selecTipo").val()
      )
    );
  }
});

window.addEventListener("load", () => {
  mostrarBtnCompra();
});

// creo la funcion recuperarStock para lectura de json, verifico que se guarde los datos en consola
function recuperarStock() {
  let stock = JSON.parse(localStorage.getItem("stock"));
  if (stock) {
    stock.forEach((el) => stockProductos.push(el));
  }
}

//muestro los productos en mi html

function mostrarProductos(array) {
  $("#contenedor-productos").empty();
  $.each(array, function (i) {
    $("#contenedor-productos").append(` <div class="producto">
        <div class="card">
        <div class="card-image">
        <img src=${array[i].img}>
        <span class="card-title">${array[i].nombre}</span>
        <a id="boton${array[i].id}" class= "btn-floating btn-large waves-effect waves-light blue" ><i class="material-icons">add_shopping_cart</i></a>
        </div>
        <div class="card-content">
        <p>${array[i].desc}</p>
        <p>Talle: ${array[i].talle}</p>
        <p> $${array[i].precio}</p>
        </div>
        </div>
        </div>`);

    //  BOTON DE AGREGAR AL CARRITO

    $(`#boton${array[i].id}`).on("click", () => {
      agregarAlCarrito(array[i].id);
    });
  });
}

// btn de comprar
function mostrarBtnCompra() {
  if (carritoDeCompras.length > 0) {
    btnCompra.classList.contains("is-active")
      ? btnCompra
      : btnCompra.classList.add("is-active");
  } else {
    btnCompra.classList.remove("is-active");
  }
}

//aca agrego al carrito y si está le sumo uno

function agregarAlCarrito(id) {
  let repetido = carritoDeCompras.find((prodR) => prodR.id === id);
  if (repetido) {
    repetido.cantidad = repetido.cantidad + 1;
    document.getElementById(
      `cantidad${repetido.id}`
    ).innerHTML = `<p id="cantidad${repetido.id}">cantidad: ${repetido.cantidad}</p>`;
    actualizarCarrito();
  } else {
    let productoAgregar = stockProductos.find((prod) => prod.id === id);

    carritoDeCompras.push(productoAgregar);

    mostrarCarrito(carritoDeCompras);

    actualizarCarrito();
  }
  mostrarBtnCompra();
}

//muestro los productos del carrito y elimino todo o de a uno

function mostrarCarrito(array) {
  contenedorCarrito.innerHTML = "";
  array.forEach((productoAgregar) => {
    let div = document.createElement("div");
    div.classList.add("productoEnCarrito");
    div.innerHTML = `<p>${productoAgregar.nombre}</p>
          <p>Precio: ${productoAgregar.precio}</p>
          <p id="cantidad${productoAgregar.id}">cantidad: ${productoAgregar.cantidad}</p>
          <p>talle: ${productoAgregar.talle}</p>
          <button id="eliminar${productoAgregar.id}" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>`;
    contenedorCarrito.appendChild(div);

    $(`#eliminar${productoAgregar.id}`).click(function () {
      if (productoAgregar.cantidad == 1) {
        $(this).parent().remove();
        carritoDeCompras = carritoDeCompras.filter(
          (prodE) => prodE.id != productoAgregar.id
        );
        actualizarCarrito();
      } else {
        productoAgregar.cantidad = productoAgregar.cantidad - 1;
        document.getElementById(
          `cantidad${productoAgregar.id}`
        ).innerHTML = `<p id="cantidad${productoAgregar.id}">cantidad:${productoAgregar.cantidad}</p>`;
        actualizarCarrito();
      }
      mostrarBtnCompra();
    });
  });
}

//actualizo precio total y cantidad de item
function actualizarCarrito() {
  contadorCarrito.innerText = carritoDeCompras.reduce(
    (acc, el) => acc + el.cantidad,
    0
  );
  precioTotal.innerText = carritoDeCompras.reduce(
    (acc, el) => acc + el.precio * el.cantidad,
    0
  );
  localStorage.setItem("carritoDeCompras", JSON.stringify(carritoDeCompras));
}

//RECUPERO DE LOCAL STORAGE

function recuperarLS() {
  const obtJSON = localStorage.getItem("carritoDeCompras");
  const obtCarrito = JSON.parse(obtJSON);
  if (obtCarrito) {
    obtCarrito.forEach((elemento) => {
      carritoDeCompras.push(elemento);
      mostrarCarrito(obtCarrito);
      actualizarCarrito();
    });
  }
}
