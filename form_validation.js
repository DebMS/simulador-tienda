const d = document;

function payFormValidations() {
  const $form = d.querySelector(".form-pago"),
    $inputs = d.querySelectorAll(".form-pago [required]");

  $inputs.forEach((input) => {
    const $paragraph = d.createElement("p");
    $paragraph.id = input.name;
    $paragraph.textContent = input.title;
    $paragraph.classList.add("error-pago");
    input.insertAdjacentElement("afterend", $paragraph);
  });

  d.addEventListener("keyup", (e) => {
    if (e.target.matches(".form-pago [required]")) {
      let $input = e.target,
        pattern = $input.pattern || $input.dataset.pattern;

      if (pattern && $input.value !== "") {
        let regex = new RegExp(pattern);
        return !regex.exec($input.value)
          ? d.getElementById($input.name).classList.add("is-active")
          : d.getElementById($input.name).classList.remove("is-active");
      }

      if (!pattern) {
        return $input.value === ""
          ? d.getElementById($input.name).classList.add("is-active")
          : d.getElementById($input.name).classList.remove("is-active");
      }
    }
  });

  d.addEventListener("submit", (e) => {
    e.preventDefault();
    localStorage.removeItem("carritoDeCompras");

    const $loader = d.querySelector(".form-loader"),
      $response = d.querySelector(".response-pago");

    $loader.classList.remove("none");

    setTimeout(() => {
      $loader.classList.add("none");
      $response.classList.remove("none");
      $form.reset();
      setTimeout(() => {
        $response.classList.add("none");
        d.querySelector(".btn-volver").click();
      }, 3000);
    }, 3000);
  });
}

payFormValidations();
