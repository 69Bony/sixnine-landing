const productGrid = document.querySelector("[data-products]");
const categorySelect = document.querySelector("[data-category]");
const searchInput = document.querySelector("[data-search]");
const sortSelect = document.querySelector("[data-sort]");
const maxPriceInput = document.querySelector("[data-max-price]");
const priceLabel = document.querySelector("[data-price-label]");
const stockOnly = document.querySelector("[data-stock-only]");
const resultCount = document.querySelector("[data-result-count]");
const emptyState = document.querySelector("[data-empty]");
const cartDrawer = document.querySelector("[data-cart-drawer]");
const cartBackdrop = document.querySelector("[data-cart-backdrop]");
const cartItems = document.querySelector("[data-cart-items]");
const cartSummary = document.querySelector("[data-cart-summary]");
const productDialog = document.querySelector("[data-product-dialog]");
const productDetail = document.querySelector("[data-product-detail]");
const promoCarousel = document.querySelector("[data-promo-carousel]");
const storeThemeToggle = document.querySelector("[data-store-theme-toggle]");
const categoryStrip = document.querySelector("[data-category-strip]");

let products = SixNineStore.getProducts();
let categories = SixNineStore.getCategories();
let cart = SixNineStore.getCart();
let promos = SixNineStore.getPromos();
let activePromo = 0;

const setStoreTheme = (theme) => {
  document.body.dataset.theme = theme;
  localStorage.setItem("sixnine-store-theme", theme);
  storeThemeToggle?.setAttribute("aria-label", theme === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro");
};

setStoreTheme(localStorage.getItem("sixnine-store-theme") || "light");

storeThemeToggle?.addEventListener("click", () => {
  setStoreTheme(document.body.dataset.theme === "dark" ? "light" : "dark");
});

const activeProducts = () => products.filter((product) => product.active);

const categoryImages = {
  equipos: "./assets/category-equipos.jpg",
  notebooks: "./assets/category-notebooks.jpg",
  monitores: "./assets/category-monitores.jpg",
  componentes: "./assets/category-componentes.jpg",
  perifericos: "./assets/category-perifericos.jpg",
  accesorios: "./assets/category-accesorios.jpg",
};

const categoryIcons = {
  equipos: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5.5h16v10H4z" />
      <path d="M9 19h6" />
      <path d="M12 15.5V19" />
    </svg>
  `,
  notebooks: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 6h14v9H5z" />
      <path d="M3 18h18" />
    </svg>
  `,
  monitores: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5h16v11H4z" />
      <path d="M8 20h8" />
      <path d="M12 16v4" />
    </svg>
  `,
  componentes: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 8h8v8H8z" />
      <path d="M4 10h4M4 14h4M16 10h4M16 14h4M10 4v4M14 4v4M10 16v4M14 16v4" />
    </svg>
  `,
  perifericos: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 4h8a4 4 0 0 1 4 4v6a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6V8a4 4 0 0 1 4-4Z" />
      <path d="M12 4v6" />
    </svg>
  `,
  accesorios: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 8h8v10H8z" />
      <path d="M10 8V6a2 2 0 0 1 4 0v2" />
      <path d="M9.5 12h5" />
    </svg>
  `,
};

const saveCart = () => {
  SixNineStore.saveCart(cart);
  renderCart();
};

const updateCounters = () => {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelector("[data-cart-count]").textContent = count;
  document.querySelector("[data-cart-title]").textContent = `${count} producto${count === 1 ? "" : "s"}`;
};

const categoryName = (id) => categories.find((category) => category.id === id)?.name || "General";

const renderPromos = () => {
  const activePromos = promos.filter((promo) => promo.active);
  if (!promoCarousel || activePromos.length === 0) {
    if (promoCarousel) promoCarousel.hidden = true;
    return;
  }

  activePromo = activePromo % activePromos.length;
  promoCarousel.hidden = false;
  promoCarousel.innerHTML = `
    <div class="promo-slide">
      <img src="${activePromos[activePromo].image}" alt="" aria-hidden="true" />
      <div>
        <span>${activePromos[activePromo].badge}</span>
        <h2>${activePromos[activePromo].title}</h2>
        <p>${activePromos[activePromo].text}</p>
        <a class="button primary" href="${activePromos[activePromo].link}">${activePromos[activePromo].button}</a>
      </div>
    </div>
    ${activePromos.length > 1 ? `
      <div class="promo-dots">
        ${activePromos.map((_, index) => `<button type="button" class="${index === activePromo ? "is-active" : ""}" data-promo-dot="${index}" aria-label="Ver promo ${index + 1}"></button>`).join("")}
      </div>
    ` : ""}
  `;
};

const renderCategories = () => {
  categorySelect.innerHTML = [
    '<option value="all">Todas</option>',
    ...categories.map((category) => `<option value="${category.id}">${category.name}</option>`),
  ].join("");

  if (categoryStrip) {
    categoryStrip.innerHTML = categories.map((category) => `
      <button type="button" data-category-shortcut="${category.id}">
        <img class="category-photo" src="${categoryImages[category.id] || categoryImages.accesorios}" alt="" aria-hidden="true" />
        <span class="category-symbol">${categoryIcons[category.id] || categoryIcons.accesorios}</span>
        <span class="category-copy">
          <strong>${category.name}</strong>
          <small>${activeProducts().filter((product) => product.category === category.id).length} productos</small>
        </span>
      </button>
    `).join("");
  }
};

const getFilteredProducts = () => {
  const term = searchInput.value.trim().toLowerCase();
  const category = categorySelect.value;
  const maxPrice = Number(maxPriceInput.value);
  const onlyStock = stockOnly.checked;

  const filtered = activeProducts().filter((product) => {
    const matchesTerm = `${product.name} ${product.short} ${product.description} ${product.brand || ""} ${product.sku || ""}`.toLowerCase().includes(term);
    const matchesCategory = category === "all" || product.category === category;
    const matchesPrice = product.price <= maxPrice;
    const matchesStock = !onlyStock || product.stock > 0;
    return matchesTerm && matchesCategory && matchesPrice && matchesStock;
  });

  return filtered.sort((a, b) => {
    if (sortSelect.value === "price-asc") return a.price - b.price;
    if (sortSelect.value === "price-desc") return b.price - a.price;
    if (sortSelect.value === "name") return a.name.localeCompare(b.name);
    return Number(b.featured) - Number(a.featured);
  });
};

const renderProducts = () => {
  const list = getFilteredProducts();
  priceLabel.textContent = `Hasta ${SixNineStore.money(maxPriceInput.value)}`;
  resultCount.textContent = `${list.length} resultado${list.length === 1 ? "" : "s"}`;
  emptyState.hidden = list.length > 0;
  document.querySelectorAll("[data-category-shortcut]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.categoryShortcut === categorySelect.value);
  });

  productGrid.innerHTML = list.map((product) => `
    <article class="product-card">
      <button type="button" class="product-image" data-view-product="${product.id}">
        <img src="${product.image}" alt="${product.name}" />
        ${product.featured ? "<span>Destacado</span>" : ""}
      </button>
      <div class="product-body">
        <div>
          <small>${categoryName(product.category)}</small>
          <h3>${product.name}</h3>
          <span class="product-brand">${product.brand || "SixNine Store"}${product.sku ? ` · ${product.sku}` : ""}</span>
          <p>${product.short}</p>
        </div>
        <div class="product-meta">
          <div>
            <strong>${SixNineStore.money(product.price)}</strong>
            ${product.compareAt ? `<del>${SixNineStore.money(product.compareAt)}</del>` : ""}
          </div>
          <span>${product.stock} disp.</span>
        </div>
        <div class="product-actions">
          <button type="button" class="button secondary" data-view-product="${product.id}">Detalle</button>
          <button type="button" class="button primary" data-add-product="${product.id}">Agregar</button>
        </div>
      </div>
    </article>
  `).join("");
};

const addToCart = (productId, variant = "") => {
  const product = products.find((item) => item.id === productId);
  if (!product || product.stock < 1) return;
  const key = `${product.id}:${variant}`;
  const current = cart.find((item) => item.key === key);
  if (current) {
    current.quantity += 1;
  } else {
    const variants = product.variants || [];
    cart.push({ key, id: product.id, name: product.name, price: product.price, image: product.image, variant: variant || variants[0] || "", quantity: 1 });
  }
  saveCart();
  openCart();
};

const renderProductDetail = (product) => {
  productDetail.innerHTML = `
    <div class="product-detail">
      <img src="${product.image}" alt="${product.name}" />
      <div>
        <small>${categoryName(product.category)}</small>
        <h2>${product.name}</h2>
        <span class="product-brand">${product.brand || "SixNine Store"}${product.sku ? ` · ${product.sku}` : ""}${product.warranty ? ` · Garantía ${product.warranty}` : ""}</span>
        <p>${product.description}</p>
        ${product.specs?.length ? `<ul class="spec-list">${product.specs.map((spec) => `<li>${spec}</li>`).join("")}</ul>` : ""}
        <div class="product-meta wide">
          <strong>${SixNineStore.money(product.price)}</strong>
          ${product.compareAt ? `<del>${SixNineStore.money(product.compareAt)}</del>` : ""}
          <span>${product.stock} disponibles</span>
        </div>
        <label>Variante
          <select data-detail-variant>
            ${(product.variants || ["Producto estándar"]).map((variant) => `<option>${variant}</option>`).join("")}
          </select>
        </label>
        <button class="button primary" type="button" data-detail-add="${product.id}">Agregar al carrito</button>
      </div>
    </div>
  `;
  productDialog.showModal();
};

const renderCart = () => {
  updateCounters();
  if (cart.length === 0) {
    cartItems.innerHTML = '<div class="empty-state compact"><strong>Tu carrito está vacío</strong><p>Agregá productos y coordinamos la compra por WhatsApp.</p></div>';
  } else {
    cartItems.innerHTML = cart.map((item) => `
      <article class="cart-item">
        <img src="${item.image}" alt="${item.name}" />
        <div>
          <strong>${item.name}</strong>
          <span>${item.variant}</span>
          <small>${SixNineStore.money(item.price)}</small>
        </div>
        <div class="quantity">
          <button type="button" data-dec="${item.key}">-</button>
          <span>${item.quantity}</span>
          <button type="button" data-inc="${item.key}">+</button>
        </div>
        <button type="button" class="remove-item" data-remove="${item.key}" aria-label="Eliminar">x</button>
      </article>
    `).join("");
  }

  const settings = SixNineStore.getSettings();
  const lines = cart.map((item) => `${item.quantity}x ${item.name}${item.variant ? ` (${item.variant})` : ""}`).join("%0A");
  const message = `Hola SixNine Store, quiero comprar o consultar por:%0A${lines || "-"}%0A%0A¿Me confirman disponibilidad y forma de entrega?`;
  cartSummary.innerHTML = `
    <span>Productos <strong>${cart.length}</strong></span>
    <span>Contacto <strong>WhatsApp</strong></span>
    <a class="button primary cart-whatsapp ${cart.length ? "" : "is-disabled"}" href="https://wa.me/${settings.whatsapp}?text=${message}" target="_blank" rel="noopener noreferrer">Coordinar compra</a>
    <p class="form-note">Confirmamos stock, entrega y método de pago antes de cerrar la compra.</p>
  `;
};

const openCart = () => {
  cartDrawer.classList.add("is-open");
  cartBackdrop.classList.add("is-open");
};

const closeCart = () => {
  cartDrawer.classList.remove("is-open");
  cartBackdrop.classList.remove("is-open");
};

document.addEventListener("click", (event) => {
  const addButton = event.target.closest("[data-add-product]");
  const viewButton = event.target.closest("[data-view-product]");
  const incButton = event.target.closest("[data-inc]");
  const decButton = event.target.closest("[data-dec]");
  const removeButton = event.target.closest("[data-remove]");
  const detailAdd = event.target.closest("[data-detail-add]");
  const categoryShortcut = event.target.closest("[data-category-shortcut]");

  if (addButton) addToCart(addButton.dataset.addProduct);
  if (viewButton) renderProductDetail(products.find((product) => product.id === viewButton.dataset.viewProduct));
  if (incButton) {
    cart.find((item) => item.key === incButton.dataset.inc).quantity += 1;
    saveCart();
  }
  if (decButton) {
    const item = cart.find((entry) => entry.key === decButton.dataset.dec);
    item.quantity -= 1;
    cart = cart.filter((entry) => entry.quantity > 0);
    saveCart();
  }
  if (removeButton) {
    cart = cart.filter((item) => item.key !== removeButton.dataset.remove);
    saveCart();
  }
  if (detailAdd) {
    addToCart(detailAdd.dataset.detailAdd, document.querySelector("[data-detail-variant]")?.value);
    productDialog.close();
  }
  if (categoryShortcut) {
    categorySelect.value = categoryShortcut.dataset.categoryShortcut;
    renderProducts();
    document.querySelector("#catalogo")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  const promoDot = event.target.closest("[data-promo-dot]");
  if (promoDot) {
    activePromo = Number(promoDot.dataset.promoDot);
    renderPromos();
  }
});

document.querySelector("[data-cart-open]").addEventListener("click", openCart);
document.querySelector("[data-cart-close]").addEventListener("click", closeCart);
document.querySelector("[data-cart-backdrop]").addEventListener("click", closeCart);
document.querySelector("[data-product-close]").addEventListener("click", () => productDialog.close());

[searchInput, categorySelect, sortSelect, maxPriceInput, stockOnly].forEach((control) => {
  control.addEventListener("input", renderProducts);
});

renderCategories();
renderPromos();
renderProducts();
renderCart();

if (location.hash === "#consulta") {
  openCart();
}

window.setInterval(() => {
  const activePromos = promos.filter((promo) => promo.active);
  if (activePromos.length < 2) return;
  activePromo = (activePromo + 1) % activePromos.length;
  renderPromos();
}, 6500);
