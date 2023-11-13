let limiteExtraccion = 15000;
let saldoCuenta = 0;
let dineroExtraido;
let dineroDepositado;
const agregar = document.querySelector("#agregar");
const agregar1 = document.querySelector("#agregar1");
const agregar2 = document.querySelector("#agregar2");
const agregar3 = document.querySelector("#agregar3");
const agregar4 = document.querySelector("#agregar4");

actualizarSaldoEnPantalla();
actualizarLimiteEnPantalla();

function sumarDinero(cantidad) {
  saldoCuenta += cantidad;
}

function restarDinero(cantidad) {
  saldoCuenta -= cantidad;
}
function mostrarOperacion(
  alertaDeOperacion,
  accionDeOperacion,
  transaccionDeDinero
) {
  alerta(
    4500,
    "success",
    "",
    "logrado",
    "Has " +
      alertaDeOperacion +
      ": $" +
      transaccionDeDinero +
      "\n" +
      "Saldo anterior: $" +
      accionDeOperacion +
      "\n" +
      "Saldo actual: $" +
      saldoCuenta
  );
}

agregar1.addEventListener("click", () => {
  let div1 = document.createElement("div");
  div1.innerHTML += `<input type="text" name="nombre[]" placeholder="Dinero a depositar" required id="depositar">
    <button class="btn btn-success" id="din">Depositar</button>`;
  const contenedor1 = document.querySelector("#dinamic1");
  contenedor1.appendChild(div1);
  document.getElementById("din").addEventListener("click", () => {
    let dineroDepositado = parseInt(document.getElementById("depositar").value);
    if (dineroDepositado == null || dineroDepositado == "") {
      alerta(
        4500,
        "error",
        "",
        "error",
        "Algo salio mal",
        "No se ingreso monto para dipositar."
      );
    } else if (isNaN(dineroDepositado)) {
      alerta(
        4500,
        "error",
        "",
        "error",
        "Algo salio mal",
        "No se ingreso monto para dipositar."
      );
    } else if (dineroDepositado != null) {
      sumarDinero(dineroDepositado);
      mostrarOperacion(
        "depositado",
        saldoCuenta - dineroDepositado,
        dineroDepositado
      );
      actualizarSaldoEnPantalla();
      div1.innerHTML = ``;
    }
  });
});

agregar.addEventListener("click", () => {
  let div = document.createElement("div");
  div.innerHTML += `<input type="text" name="nombre[]" placeholder="Dinero a Extraer" required id="extraer">
  <button class="btn btn-success" id="ext">Extraer</button>`;
  const contenedor = document.querySelector("#dinamic");
  contenedor.appendChild(div);
  document.getElementById("ext").addEventListener("click", () => {
    let dineroExtraido = parseInt(document.getElementById("extraer").value);
    if (dineroExtraido == null || dineroExtraido == "") {
      alerta(4500, "error", "", "error", "No se ingreso monto para dipositar.");
    }
    if (dineroExtraido > saldoCuenta) {
      alerta(4500, "error", "", "Algo salio mal", "No hay monto suficiente.");
    } else if (dineroExtraido > limiteExtraccion) {
      alerta(
        4500,
        "error",
        "",
        "Algo salio mal",
        "La cantidad es mas grande que tu limite de extraccion."
      );
    } else if (dineroExtraido != null) {
      restarDinero(dineroExtraido);
      mostrarOperacion(
        "extraer",
        saldoCuenta - dineroDepositado,
        dineroDepositado
      );
      actualizarSaldoEnPantalla();
      div.innerHTML = ``;
    }
  });
});

agregar3.addEventListener("click", () => {
  let div3 = document.createElement("div");
  div3.innerHTML += `<input type="text" name="nombre[]" placeholder="Cheque a depositar" required id="cheque">
  <button class="btn btn-success" id="cheq">Depositar Cheque</button>`;

  const contenedor3 = document.querySelector("#dinamic3");
  contenedor3.appendChild(div3);
  document.getElementById("cheq").addEventListener("click", () => {
    let montoDecheque = parseInt(document.getElementById("cheque").value);
    if (montoDecheque == null || montoDecheque == "") {
      alerta(
        4500,
        "error",
        "",
        "Algo salio mal",
        "No ingreso monto para el deposito."
      );
    } else {
      var montochequeDepositado = parseInt(montoDecheque);
      if (isNaN(montochequeDepositado)) {
        alerta(4500, "error", "", "Algo salio mal", "Ingrese solo el monto.");
      } else if (montochequeDepositado < 1000) {
        alerta(
          4500,
          "error",
          "",
          "Algo salio mal",
          "Solo se aceptan cheques desde $1000."
        );
      } else {
        sumarDinero(montochequeDepositado);
        mostrarOperacion(
          "depositado un cheque con el monto",
          saldoCuenta - montochequeDepositado,
          montochequeDepositado
        );
        actualizarSaldoEnPantalla();
      }
    }
  });
});

agregar4.addEventListener("click", () => {
  let div4 = document.createElement("div");
  div4.innerHTML += `<input type="text" name="nombre[]" placeholder="Dinero a depositar" required id="cambiar">
  <button class="btn btn-success" id="cambiar limite">cambiar limite</button>`;
  const contenedor4 = document.querySelector("#dinamic4");
  contenedor4.appendChild(div4);
  document.getElementById("cambiar limite").addEventListener("click", () => {
    let cambiarLimiteDeExtraccion = parseInt(
      document.getElementById("cambiar").value
    );
    if (cambiarLimiteDeExtraccion == null || cambiarLimiteDeExtraccion == "") {
      alerta(
        4500,
        "error",
        "",
        "Algo salio mal",
        "No se ingreso el nuevo límite de Extracción."
      );
    } else {
      limiteExtraccion = parseInt(cambiarLimiteDeExtraccion);
      alerta(
        4500,
        "success",
        "",
        "logrado",
        "El nuevo límte de extraccón es: $" + limiteExtraccion
      );
      actualizarLimiteEnPantalla();
      div4.innerHTML = ``;
    }
  });
});

const alerta = (timer, icon, position, tittle, text) => {
  Swal.fire({
    position: position || "center",
    icon: icon || "info",
    title: tittle || "",
    showConfirmButton: false,
    confirmButtonText: "Aceptar",
    timer: timer,
    text: text || "",
  });
};

document.getElementById("nombre").innerHTML = localStorage.getItem("usuario");

function actualizarSaldoEnPantalla() {
  document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
  document.getElementById("limite-extraccion").innerHTML =
    "Tu límite de extracción es: $" + limiteExtraccion;
}
