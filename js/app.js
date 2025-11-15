// Array global de productos
let productos = [];

// ============================
//    CARGAR DE LOCALSTORAGE
// ============================
document.addEventListener("DOMContentLoaded", () => {
    const data = localStorage.getItem("productos");

    if (data) {
        productos = JSON.parse(data);
    }

    actualizarTabla();
    actualizarTotal();
});

// ============================
//       ELEMENTOS DOM
// ============================
const form = document.getElementById("form-producto");
const tabla = document.getElementById("tabla-productos");
const totalHTML = document.getElementById("total");

// ============================
//        AGREGAR PRODUCTO
// ============================
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const categoria = document.getElementById("categoria").value.trim();
    const precio = document.getElementById("precio").value.trim();

    if (!nombre || !categoria || !precio) {
        alert("Todos los campos son obligatorios");
        return;
    }

    const nuevoProducto = {
        nombre,
        categoria,
        precio: parseFloat(precio)
    };

    productos.push(nuevoProducto);
    guardarLocal();

    actualizarTabla();
    actualizarTotal();
    form.reset();
});

// ============================
//       GUARDAR LOCALSTORAGE
// ============================
function guardarLocal() {
    localStorage.setItem("productos", JSON.stringify(productos));
}

// ============================
//         ACTUALIZAR TABLA
// ============================
function actualizarTabla() {
    tabla.innerHTML = "";

    productos.forEach((p, index) => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${index + 1}</td>
            <td>${p.nombre}</td>
            <td>${p.categoria}</td>
            <td>$${p.precio}</td>
            <td>
                <button class="eliminar" onclick="eliminarProducto(${index})">X</button>
            </td>
        `;

        tabla.appendChild(fila);
    });
}

// ============================
//        ELIMINAR PRODUCTO
// ============================
function eliminarProducto(index) {
    productos.splice(index, 1);
    guardarLocal();
    actualizarTabla();
    actualizarTotal();
}

// ============================
//    TOTAL ACUMULADO PRECIO
// ============================
function actualizarTotal() {
    const total = productos.reduce((acc, p) => acc + p.precio, 0);
    totalHTML.textContent = total.toFixed(2);
}
