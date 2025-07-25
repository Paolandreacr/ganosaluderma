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
  { nombre: "EXFOLIANTE PIE Y BRILLO", precio: 95000, flyer: "images/producto19-flyer.png", nutricional: "images/producto19-nutricional.png" },
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
    <h2 class="text-xl font-bold mb-2 text-white">${p.nombre}</h2>
    <img src="${p.flyer}" alt="Flyer ${p.nombre}" class="w-full rounded mb-2" />
    <img src="${p.nutricional}" alt="Tabla nutricional ${p.nombre}" class="w-full rounded mb-2" />
    <p class="text-yellow-400 font-semibold">$${p.precio.toLocaleString()}</p>
    <button onclick="agregarCarrito(${i})" class="mt-2 bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400">Agregar al carrito</button>
  `;
  contenedor.appendChild(card);
});

function agregarCarrito(index) {
  carrito.push(productos[index]);
  renderCarrito();
}

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

function vaciarCarrito() {
  carrito = [];
  descuento = 0;
  document.getElementById("descuentoInput").value = "";
  renderCarrito();
}

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

  const url = `https://wa.me/573106319319?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}
