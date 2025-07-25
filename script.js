const productos = [
  {
    nombre: "Café Gano 3 en 1",
    precio: 35000,
    flyer: "images/cafe-flyer.png",
    nutricional: "images/cafe-nutricional.png"
  },
  {
    nombre: "Chocolate Gano",
    precio: 37000,
    flyer: "images/choco-flyer.png",
    nutricional: "images/choco-nutricional.png"
  }
  // Agrega aquí los demás productos
];

const contenedor = document.getElementById("productos");
const listaCarrito = document.getElementById("lista-carrito");
const totalSpan = document.getElementById("total");

let carrito = [];
let porcentajeDescuento = 0;

productos.forEach((p, i) => {
  const card = document.createElement("div");
  card.className = "bg-gray-800 p-4 rounded-lg shadow-md";
  card.innerHTML = `
    <h2 class="text-xl font-bold mb-2">${p.nombre}</h2>
    <img src="${p.flyer}" alt="Flyer ${p.nombre}" class="w-full rounded mb-2 cursor-pointer" onclick="openModal('${p.flyer}')" />
    <img src="${p.nutricional}" alt="Tabla nutricional ${p.nombre}" class="w-full rounded mb-2 cursor-pointer" onclick="openModal('${p.nutricional}')" />
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
  let subtotal = 0;
  carrito.forEach((item, i) => {
    subtotal += item.precio;
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precio.toLocaleString()}`;
    listaCarrito.appendChild(li);
  });

  let descuento = subtotal * (porcentajeDescuento / 100);
  let totalFinal = subtotal - descuento;

  totalSpan.textContent = totalFinal.toLocaleString();
}

function vaciarCarrito() {
  carrito = [];
  porcentajeDescuento = 0;
  document.getElementById("descuentoInput").value = "";
  renderCarrito();
}

function aplicarDescuento() {
  const input = document.getElementById("descuentoInput").value.trim().toUpperCase();
  const codigos = {
    "DESC5": 5,
    "DESC10": 10,
    "DESC15": 15,
    "DESC20": 20
  };

  if (codigos[input] !== undefined) {
    porcentajeDescuento = codigos[input];
    alert(`Descuento del ${porcentajeDescuento}% aplicado.`);
  } else {
    porcentajeDescuento = 0;
    alert("Código no válido.");
  }

  renderCarrito();
}

// Modal para ampliar imágenes
function openModal(src) {
  const modal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  modalImage.src = src;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeModal() {
  const modal = document.getElementById('imageModal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}
