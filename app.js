const formulario = document.getElementById("formulario");
const campo = document.getElementById("nota");
const categoria = document.getElementById("categoria");
const botonAgregar = document.getElementById("agregar");
const botonBorrarTodas = document.getElementById("borrar-todas");
const lista = document.getElementById("lista");
const contador = document.getElementById("contador");
const mensaje = document.getElementById("mensaje");

const CATEGORIAS = ["Personal", "Estudio", "Trabajo"];
let notas = [];

function mostrarMensaje(texto, tipo, textoAccion, accion) {
  mensaje.className = "mensaje " + tipo;
  mensaje.textContent = texto + " ";
  if (textoAccion) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "boton-enlace";
    b.textContent = textoAccion;
    b.addEventListener("click", accion);
    mensaje.appendChild(b);
  }
}

function dibujar() {
  lista.innerHTML = "";
  contador.textContent = notas.length;
  botonBorrarTodas.disabled = notas.length === 0;

  if (notas.length === 0) {
    const p = document.createElement("p");
    p.className = "vacio";
    p.textContent = "Aún no tienes notas. Escribe la primera arriba.";
    lista.appendChild(p);
    return;
  }

  CATEGORIAS.forEach(function (cat) {
    const delGrupo = notas.filter(function (n) { return n.categoria === cat; });
    if (delGrupo.length === 0) return;

    const titulo = document.createElement("h3");
    titulo.textContent = cat + " (" + delGrupo.length + ")";
    lista.appendChild(titulo);

    const ul = document.createElement("ul");
    delGrupo.forEach(function (nota) {
      const li = document.createElement("li");
      const texto = document.createElement("span");
      texto.textContent = nota.texto;

      const eliminar = document.createElement("button");
      eliminar.type = "button";
      eliminar.className = "boton-secundario";
      eliminar.textContent = "Eliminar";
      eliminar.setAttribute("aria-label", "Eliminar nota: " + nota.texto);
      eliminar.addEventListener("click", function () { eliminarNota(nota); });

      li.appendChild(texto);
      li.appendChild(eliminar);
      ul.appendChild(li);
    });
    lista.appendChild(ul);
  });
}

function eliminarNota(nota) {
  const posicion = notas.indexOf(nota);
  notas.splice(posicion, 1);
  dibujar();
  mostrarMensaje("Nota eliminada.", "info", "Deshacer", function () {
    notas.splice(posicion, 0, nota);
    dibujar();
    mostrarMensaje("Nota recuperada.", "exito");
    campo.focus();
  });
  campo.focus();
}

campo.addEventListener("input", function () {
  botonAgregar.disabled = campo.value.trim() === "";
});

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();
  const texto = campo.value.trim();
  if (texto === "") return;

  notas.push({ texto: texto, categoria: categoria.value });
  campo.value = "";
  botonAgregar.disabled = true;
  dibujar();
  mostrarMensaje("Nota agregada en " + categoria.value + ".", "exito");
  campo.focus();
});

botonBorrarTodas.addEventListener("click", function () {
  if (!confirm("¿Seguro que quieres borrar todas tus notas?")) return;
  notas = [];
  dibujar();
  mostrarMensaje("Se borraron todas las notas.", "info");
  campo.focus();
});

dibujar();
