const productos = [
  {
    nombre: "Café Gano 3 en 1",
    precio: 35000,
    flyer: "images/cafe-flyer.png",
    nutricional: "images/cafe-nutricional.png"
  },
  // Agrega aquí los 18 productos restantes
];

const contenedor = document.getElementById("productos");
const listaCarrito = document.getElementById("lista-carrito");
const totalSpan = document.getElementById("total");

let carrito = [];
let descuento = 0;

productos.forEach((p, i) => {
  const card = document.createElement("div");
  card.className = "bg-gray-800 p-4 rounded-lg shadow-md";
  card.innerHTML = `
    <h2 class="text-xl font-bold mb-2">${p.nombre}</h2>
    <img src="${p.flyer}" alt="Flyer ${p.nombre}" class="w-full rounded mb-2" />
    <img src="${p.nutricional}" alt="Tabla nutricional ${p.nombre}" class="w-full rounded mb-2" />
    <p class="text-yellow-400 font-semibold">$${p.precio.toLocaleString()}</p>
    <button onclick="agregarCarrito(${i})" class="mt-2 bg-yellow-500 text-black px-4 py-2 rounded">Agregar al carrito</button>
  `;
  contenedor.appendChild(card);
});

function toggleCarrito() {
  document.getElementById("carrito").classList.toggle("hidden");
}

function agregarCarrito(index) {
  carrito.push(productos[index]);
  renderCarrito();
}

function renderCarrito() {
  listaCarrito.innerHTML = "";
  let total = 0;
  carrito.forEach((item, i) => {
    total += item.precio;
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precio.toLocaleString()}`;
    listaCarrito.appendChild(li);
  });
  total = total - descuento;
  totalSpan.textContent = total.toLocaleString();
}

function vaciarCarrito() {
  carrito = [];
  descuento = 0;
  document.getElementById("descuentoInput").value = "";
  renderCarrito();
}

function aplicarDescuento() {
  const input = document.getElementById("descuentoInput").value.trim();
  if (input === "GANOSALUD10") {
    descuento = 10000;
    renderCarrito();
    alert("Descuento de $10.000 aplicado.");
  } else {
    alert("Código no válido.");
  }
}
