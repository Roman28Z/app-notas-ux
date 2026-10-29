const lista = document.getElementById("lista");
const campo = document.getElementById("nota");
const notas = [];

function dibujar() {
  lista.innerHTML = "";
  notas.forEach(function (texto, i) {
    const p = document.createElement("p");
    p.textContent = texto + " ";
    const x = document.createElement("a");
    x.href = "#";
    x.textContent = "x";
    x.addEventListener("click", function () {
      notas.splice(i, 1);
      dibujar();
    });
    p.appendChild(x);
    lista.appendChild(p);
  });
}

document.getElementById("agregar").addEventListener("click", function () {
  notas.push(campo.value);
  campo.value = "";
  dibujar();
});

document.getElementById("borrar").addEventListener("click", function () {
  notas.length = 0;
  dibujar();
});
