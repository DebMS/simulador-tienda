function modal(abrir, cerrar, contenedor, contenido) {
  const modalAbrir = document.getElementById(abrir);
  const modalCerrar = document.getElementById(cerrar);

  const contenedorModal = document.getElementsByClassName(contenedor)[0];
  const modalContent = document.getElementsByClassName(contenido)[0];

  modalAbrir.addEventListener("click", () => {
    contenedorModal.classList.toggle("modal-active");
  });
  modalCerrar.addEventListener("click", () => {
    contenedorModal.classList.toggle("modal-active");
  });
  modalContent.addEventListener("click", (e) => {
    e.stopPropagation();
  });
  contenedorModal.addEventListener("click", () => {
    modalCerrar.click();
  });
}

modal("boton-carrito", "carritoCerrar", "modal-contenedor", "modal-carrito");
