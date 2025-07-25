const productos = [
  { nombre: "CAFÉ CLÁSICO", precio: 135000, flyer: "images/producto1-flyer.png", nutricional: "images/producto1-nutricional.png" },
  { nombre: "CAFÉ CAPUCHINO 3EN1", precio: 135000, flyer: "images/producto2-flyer.png", nutricional: "images/producto2-nutricional.png" },
  { nombre: "CAFÉ LATERICO", precio: 145000, flyer: "images/producto3-flyer.png", nutricional: "images/producto3-nutricional.png" },
  { nombre: "CAFÉ MOCHARICO", precio: 145000, flyer: "images/producto4-flyer.png", nutricional: "images/producto4-nutricional.png" },
  { nombre: "CAFÉ PREMIUM LUVOCO", precio: 145000, flyer: "images/producto5-flyer.png", nutricional: "images/producto5-nutricional.png" },
  { nombre: "RESKINE COLLAGEN", precio: 250000, flyer: "images/producto6-flyer.png", nutricional: "images/producto6-nutricional.png" },
  { nombre: "SCHOKOLADE", precio: 150000, flyer: "images/producto7-flyer.png", nutricional: "images/producto7-nutricional.png" },
  { nombre: "SHOKORICO", precio: 150000, flyer: "images/producto8-flyer.png", nutricional: "images/producto8-nutricional.png" },
  { nombre: "CEREAL CON SPIRULINA", precio: 145000, flyer: "images/producto9-flyer.png", nutricional: "images/producto9-nutricional.png" },
  { nombre: "TEA CON ROOIBOS", precio: 145000, flyer: "images/producto10-flyer.png", nutricional: "images/producto10-nutricional.png" },
  { nombre: "CÁPSULAS EXCELLIUM", precio: 295000, flyer: "images/producto11-flyer.png", nutricional: "images/producto11-nutricional.png" },
  { nombre: "CÁPSULAS GANODERMA", precio: 295000, flyer: "images/producto12-flyer.png", nutricional: "images/producto12-nutricional.png" },
  { nombre: "CÁPSULAS CORDYGOLD", precio: 350000, flyer: "images/producto13-flyer.png", nutricional: "images/producto13-nutricional.png" },
  { nombre: "JABÓN TRANSPARENTE", precio: 90000, flyer: "images/producto14-flyer.png", nutricional: "images/producto14-nutricional.png" },
  { nombre: "JABÓN CON LECHE DE CABRA", precio: 90000, flyer: "images/producto15-flyer.png", nutricional: "images/producto15-nutricional.png" },
  { nombre: "DENTRÍFICO GANOFRESH", precio: 90000, flyer: "images/producto16-flyer.png", nutricional: "images/producto16-nutricional.png" },
  { nombre: "ACONDICIONADOR PIEL Y BRILLO", precio: 95000, flyer: "images/producto17-flyer.png", nutricional: "images/producto17-nutricional.png" },
  { nombre: "SHAMPOO PIEL Y BRILLO", precio: 95000, flyer: "images/producto18-flyer.png", nutricional: "images/producto18-nutricional.png" },
  { nombre: "EXFOLIANTE PIE Y BRILLO", precio: 95000, flyer: "images/producto19-flyer.png", nutricional: "images/producto19-nutricional.png" }
];

const contenedor = document.getElementById('productos');
let carrito = [];
let descuento = 0;
const listaCarrito = document.getElementById('lista-carrito');
const totalSpan = document.getElementById('total');

// Renderiza cada producto con botón correcto
productos.forEach((p, i) => {
  const card = document.createElement('div');
  card.className = "bg-gray-900 rounded-lg p-4 shadow-lg text-center";
  card.innerHTML = `
    <img src="${p.flyer}" alt="${p.nombre}" class="w-[150px] h-[150px] mx-auto cursor-pointer rounded" onclick="openModal('${p.flyer}')">
    <h3 class="text-lg font-bold text-yellow-400 mt-2">${p.nombre}</h3>
    <p class="text-green-400 font-semibold">$${p.precio.toLocaleString()}</p>
    <img src="${p.nutricional}" alt="Tabla nutricional" class="w-[100px] h-[100px] mx-auto mt-2 cursor-pointer" onclick="openModal('${p.nutricional}')">
    <button onclick="agregarCarrito(${i})" class="mt-3 bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300 font-bold">Agregar al carrito</button>
  `;
  contenedor.appendChild(card);
});

// Modal imagen
function openModal(src) {
  const modal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  modalImage.src = src;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeModal() {
  document.getElementById('imageModal').classList.add('hidden');
  document.getElementById('imageModal').classList.remove('flex');
}

// Agregar producto al carrito
function agregarCarrito(index) {
  carrito.push(productos[index]);
  renderCarrito();
}

// Renderizar contenido del carrito
function renderCarrito() {
  listaCarrito.innerHTML = "";
  let total = carrito.reduce((sum, p) => sum + p.precio, 0);
  total = total - descuento;
  total = total < 0 ? 0 : total;

  carrito.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precio.toLocaleString()}`;
    listaCarrito.appendChild(li);
  });

  totalSpan.textContent = total.toLocaleString();
}

// Vaciar carrito
function vaciarCarrito() {
  carrito = [];
  descuento = 0;
  document.getElementById("descuentoInput").value = "";
  renderCarrito();
}

// Aplicar descuento
function aplicarDescuento() {
  const input = document.getElementById("descuentoInput").value.trim().toUpperCase();
  const totalBruto = carrito.reduce((sum, p) => sum + p.precio, 0);

  const codigos = {
    "DESC5": 0.05,
    "DESC10": 0.10,
    "DESC15": 0.15,
    "DESC20": 0.20,
  };

  if (codigos[input]) {
    descuento = totalBruto * codigos[input];
    alert(`Descuento de ${codigos[input] * 100}% aplicado`);
  } else {
    descuento = 0;
    alert("Código de descuento no válido");
  }

  renderCarrito();
}

// Enviar pedido por WhatsApp
function enviarWhatsApp() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  let mensaje = "¡Hola! Quiero confirmar mi pedido de GANOSALUDERMA:\n";
  carrito.forEach((item) => {
    mensaje += `- ${item.nombre} - $${item.precio.toLocaleString()}\n`;
  });
  const total = carrito.reduce((sum, p) => sum + p.precio, 0) - descuento;
  mensaje += `\nTotal: $${total.toLocaleString()}\nYa hice el pago.`;

  const url = `https://wa.me/573187488252?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}
