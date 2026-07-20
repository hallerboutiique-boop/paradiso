const euro = new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" });
const CART_KEY = "paradiso_cart_v1";
const ORDER_KEY = "paradiso_orders_v1";
const THEME_KEY = "paradiso_theme";

const image = (name) => `assets/images/${name}.jpg`;
const item = (name, price, description, photo) => ({ name, price, description, image: image(photo) });
const cocktail = (name, price, description, photo = "negroni") => item(name, price, description, photo);
const bottle = (name, price, description, photo) => ({
  name,
  price,
  description,
  image: `assets/images/products/${photo}.jpg`,
  imageFit: "contain",
});

const partyServices = [
  item("Festa bimbi", 8, "Servizio feste per bambini come da listino.", "lunch"),
  item("Festa maxi", 18, "Formula feste maxi come da listino.", "hero"),
  item("Tagliere pizza compleanno", 20, "Tagliere pizza per la festa di compleanno.", "lunch"),
  item("Taglio torta", 1.5, "Servizio di taglio torta.", "breakfast"),
];

const menus = {
  day: {
    title: "Menu del giorno",
    intro: "Colazioni curate e proposte semplici per la pausa pranzo.",
    heroCopy: "Il buongiorno ha il profumo del caffè.",
    heroLabel: "Scopri il menu",
    categories: {
      colazione: {
        label: "Colazione",
        items: [
          item("Espresso", 1.3, "La pausa italiana, intensa e fragrante.", "breakfast"),
          item("Caffè macchiato", 1.5, "Espresso con una nuvola di latte.", "breakfast"),
          item("Cappuccino", 2, "Espresso, latte caldo e schiuma vellutata.", "breakfast"),
          item("Cornetto", 1.5, "Sfoglia fragrante, semplice o farcita.", "breakfast"),
          item("Cappuccino e cornetto", 3.5, "La colazione classica del Paradiso.", "breakfast"),
          item("Spremuta d'arancia", 4, "Arance spremute al momento.", "breakfast"),
        ],
      },
      pranzo: {
        label: "Pranzo",
        items: [
          item("Focaccia Paradiso", 6.5, "Prosciutto crudo, mozzarella e rucola.", "lunch"),
          item("Toast classico", 5, "Prosciutto cotto e formaggio filante.", "lunch"),
          item("Insalatona", 8, "Verdure fresche, mozzarella e ingredienti di stagione.", "lunch"),
          item("Piatto del giorno", 10, "La proposta fresca scelta dalla cucina.", "lunch"),
          item("Pausa pranzo completa", 12, "Piatto del giorno, acqua e caffè.", "lunch"),
        ],
      },
      bibite: {
        label: "Bibite",
        items: [
          item("Acqua", 1, "Naturale o frizzante.", "breakfast"),
          item("Bibita in lattina", 3, "Chiedi le disponibilità del giorno.", "breakfast"),
          item("Succo di frutta", 3, "Diversi gusti disponibili.", "breakfast"),
          item("Tè freddo", 3, "Limone o pesca.", "breakfast"),
        ],
      },
      tessere: {
        label: "Tessere",
        items: [
          item("Tessera caffè", 11, "Formula prepagata per i tuoi caffè al Paradiso.", "breakfast"),
          item("Tessera cappuccino", 15, "Formula prepagata dedicata al cappuccino.", "breakfast"),
          item("Tessera cappuccino e brioche", 30, "Colazione completa in formula prepagata.", "breakfast"),
          item("Tessera spremuta", 40, "Formula prepagata per spremute fresche.", "breakfast"),
          item("Tessera Ginseng o Orzo grande", 15, "Formula prepagata, formato grande.", "breakfast"),
          item("Tessera Ginseng o Orzo piccolo", 13, "Formula prepagata, formato piccolo.", "breakfast"),
        ],
      },
      servizi: {
        label: "Servizi feste",
        items: partyServices,
      },
    },
  },
  night: {
    title: "Menu della sera",
    intro: "Cocktail, gin, birre e distillati per vivere il Paradiso dopo il tramonto.",
    heroCopy: "La sera comincia con il bicchiere giusto.",
    heroLabel: "Scopri la sera",
    categories: {
      cocktail: {
        label: "Cocktail",
        items: [
          cocktail("Boulevardier", 8, "Bourbon, bitter rosso e vermouth: caldo e avvolgente."),
          cocktail("Caipiroska", 8, "Vodka, lime fresco e zucchero di canna.", "mojito"),
          cocktail("Caipiroska alla fragola", 7, "Vodka, lime e fragola: fresca e fruttata.", "mojito"),
          cocktail("Cuba Libre chiaro", 6, "Rum chiaro, cola e lime fresco.", "negroni"),
          cocktail("Cuba Libre scuro", 7, "Rum scuro, cola e lime fresco.", "negroni"),
          cocktail("Cuba Zombie", 8, "Mix di rum e frutta tropicale, deciso e aromatico.", "spritz"),
          cocktail("Daiquiri", 8, "Rum bianco, lime e sciroppo di zucchero.", "mojito"),
          cocktail("Disaronno Red Bull o Coca-Cola", 7, "Disaronno con la tua miscela preferita.", "negroni"),
          cocktail("Disaronno Sour", 7, "Disaronno, limone e una schiuma morbida.", "negroni"),
          cocktail("Disaronno Tè", 7, "Disaronno e tè freddo, morbido e rinfrescante.", "spritz"),
          cocktail("Drink premium", 10, "Distillato premium e miscelazione su misura.", "negroni"),
          cocktail("Gin Lemon Base", 6, "Gin e limonata, semplice e agrumato.", "gin"),
          cocktail("Gin Tonic Base", 6, "Gin, tonica e una nota agrumata.", "gin"),
          cocktail("Hugo", 8, "Sambuco, prosecco, soda, lime e menta.", "spritz"),
          cocktail("Jack Red Bull o Coca-Cola", 6, "Whiskey con Red Bull o Coca-Cola.", "negroni"),
          cocktail("Japanese", 8, "Un classico elegante, secco e aromatico.", "espresso-martini"),
          cocktail("Long Island", 8, "Cinque distillati, agrumi e cola.", "negroni"),
          cocktail("Malibu Sambuca", 6, "Cocco e anice in un mix dolce e intenso.", "spritz"),
          cocktail("Margarita", 8, "Tequila, triple sec e lime con bordo salato.", "mojito"),
          cocktail("Martini", 8, "Elegante, essenziale e servito ben freddo.", "espresso-martini"),
          cocktail("Espresso Martini", 8, "Vodka, espresso e liquore al caffè.", "espresso-martini"),
          cocktail("Mojito", 8, "Rum, lime, menta, zucchero e soda.", "mojito"),
          cocktail("Moscow Mule", 8, "Vodka, lime e ginger beer.", "mojito"),
          cocktail("Negroni", 8, "Gin, bitter rosso e vermouth in parti uguali.", "negroni"),
          cocktail("Paloma", 6, "Tequila, pompelmo e lime: fresca e sapida.", "spritz"),
          cocktail("Piña Colada", 8, "Rum, cocco e ananas, cremosa e tropicale.", "spritz"),
          cocktail("Pornstar Martini", 7, "Vodka, vaniglia e frutto della passione.", "espresso-martini"),
          cocktail("Sambuca Vodka", 6, "Vodka e sambuca, diretto e aromatico.", "negroni"),
          cocktail("Sangria", 4, "Vino, frutta fresca e spezie.", "spritz"),
          cocktail("Sbagliato", 8, "Bitter, vermouth e bollicine.", "spritz"),
          cocktail("Sex on the Beach", 7, "Vodka, pesca, arancia e frutti rossi.", "spritz"),
          cocktail("Spritz Aperol", 6, "Aperol, prosecco, soda e arancia.", "spritz"),
          cocktail("Spritz Campari", 6, "Campari, prosecco, soda e arancia.", "spritz"),
          cocktail("Vodka Lemon Base", 6, "Vodka e limonata, fresco e diretto.", "mojito"),
          cocktail("Vodka Premium", 10, "Vodka premium con miscelazione a scelta.", "negroni"),
          cocktail("Vodka Red Bull", 6, "Vodka e Red Bull.", "negroni"),
          cocktail("Vodka Sour", 7, "Vodka, limone e sciroppo di zucchero.", "mojito"),
          cocktail("Vodka Tonic Base", 6, "Vodka, tonica e agrume.", "gin"),
          cocktail("Jäger Red Bull", 6, "Jägermeister e Red Bull.", "negroni"),
        ],
      },
      bottiglie: {
        label: "Bottiglie",
        items: [
          bottle("Clase Azul", 500, "Bottiglia da riservare al tavolo.", "clase-azul"),
          bottle("Shot Clase Azul", 30, "Servizio shot come indicato nel listino.", "clase-azul"),
          bottle("Don Papa Baroko", 180, "Rum premium in bottiglia.", "don-papa"),
          bottle("Jack Daniel's", 150, "Whiskey Tennessee in bottiglia.", "jack-daniels"),
          bottle("Keglevich Fragola", 100, "Vodka aromatizzata in bottiglia.", "keglevich-fragola"),
          bottle("Keglevich Pesca", 100, "Vodka aromatizzata in bottiglia.", "keglevich-pesca"),
          bottle("Alkkemist Gin", 180, "Gin premium in bottiglia.", "alkkemist"),
          bottle("Amuerte Coca Gin", 180, "Gin premium in bottiglia.", "amuerte"),
          bottle("Hendrick's Grand Cabaret", 160, "Gin premium in bottiglia.", "hendricks-cabaret"),
          bottle("Nordés con toniche", 150, "Bottiglia di gin con toniche incluse.", "nordes-bottle"),
          bottle("Bombay Sapphire con toniche", 120, "Bottiglia di gin con toniche incluse.", "bombay-bottle"),
          bottle("Gin Mare con toniche", 140, "Bottiglia di gin con toniche incluse.", "gin-mare-bottle"),
          bottle("Grey Goose", 150, "Vodka premium in bottiglia.", "grey-goose"),
          bottle("Belvedere", 150, "Vodka premium in bottiglia.", "belvedere"),
          bottle("Absolut Vodka", 120, "Vodka in bottiglia.", "absolut"),
          bottle("Veuve Clicquot Brut", 160, "Champagne brut in bottiglia.", "veuve-brut"),
          bottle("Bellavista Alma Gran Cuvée", 100, "Franciacorta brut in bottiglia.", "bellavista"),
          bottle("Berlucchi Cuvée Imperiale", 70, "Franciacorta brut in bottiglia.", "berlucchi"),
          bottle("Valdo Prosecco", 50, "Prosecco extra dry in bottiglia.", "valdo"),
          bottle("Moët N.I.R Rosé", 220, "Champagne rosé in bottiglia.", "moet-nir"),
          bottle("Veuve Clicquot Rosé", 180, "Champagne rosé in bottiglia.", "veuve-rose"),
          bottle("Moët Ice Impérial", 180, "Champagne demi-sec in bottiglia.", "moet-ice"),
          bottle("Moët Impérial Brut", 140, "Champagne brut in bottiglia.", "moet-brut"),
          bottle("Lanson White Label", 120, "Champagne in bottiglia.", "lanson"),
          bottle("Monte Rossa Blanc de Blancs", 100, "Franciacorta in bottiglia.", "monterossa-blanc"),
          bottle("Dom Pérignon 2012", 500, "Prezzo promozionale indicato nel listino.", "dom-perignon-2012"),
          bottle("Cristal Louis Roederer", 450, "Prezzo promozionale indicato nel listino.", "cristal"),
          bottle("Krug Grande Cuvée", 450, "Prezzo promozionale indicato nel listino.", "krug"),
          bottle("Dom Pérignon 2013", 400, "Prezzo promozionale indicato nel listino.", "dom-perignon-2013"),
        ],
      },
      gin: {
        label: "Gin",
        items: [
          ["Amuerte", 13], ["Aviation", 8], ["Ballykeefe", 12], ["Base Gordon's", 6],
          ["Base Mr. Higgins", 6], ["Bombay", 8], ["Brockmans", 10], ["Bulldog", 10],
          ["Dolcevita", 8], ["Engine", 10], ["Fifty Pounds", 10], ["Gin Mare", 10],
          ["Hendrick's", 10], ["Hendrick's Viola", 13], ["Hendrick's Amazonia", 13], ["Lola Vera", 10],
          ["Malfy", 10], ["Monkey", 15], ["Nordés", 10], ["Portofino", 12],
          ["Rena 41", 10], ["Rivo", 10], ["Royal Windsor", 12], ["Santamania", 8],
          ["Santana", 10], ["Tanqueray", 8],
        ].map(([name, price]) => item(name, price, "Servito con tonica e guarnizione selezionata.", "gin")),
      },
      aperitivo: {
        label: "Aperitivo",
        items: [
          item("Bitter pompelmo", 5, "Aperitivo analcolico al pompelmo.", "spritz"),
          item("Buffet drink", 10, "Drink con formula buffet.", "spritz"),
          item("Campari con bianco", 5, "Campari servito con vino bianco.", "spritz"),
          item("Campari Soda", 3.5, "Il classico aperitivo Campari Soda.", "spritz"),
          item("Crodino", 4, "Aperitivo analcolico.", "spritz"),
          item("Offerta Spritz", 3.5, "Spritz in offerta come da listino.", "spritz"),
          item("Tagliere", 4, "Piccolo accompagnamento salato.", "lunch"),
          item("Tagliere base", 10, "Selezione salata da condividere.", "lunch"),
          item("Tagliere premium", 13, "Selezione premium da condividere.", "lunch"),
        ],
      },
      servizi: {
        label: "Servizi feste",
        items: partyServices,
      },
      birre: {
        label: "Birre",
        items: [
          ["Birra in bottiglia", 3.5], ["Birra media e trancio", 8], ["Birra spina media", 5],
          ["Birra spina piccola", 3], ["Ceres", 4], ["Corona", 4], ["Guinness", 8],
          ["Heineken", 3.5], ["Ichnusa", 4], ["Ichnusa 50 cl", 4], ["Moretti grande", 4],
          ["Panaché", 5], ["Paulaner", 4.5], ["Tennent's", 4],
        ].map(([name, price]) => item(name, price, "Servita fredda.", "beer")),
      },
      whisky: {
        label: "Whisky e brandy",
        items: [
          ["Ballantine's", 5], ["Chivas 12", 8], ["Cognac", 6], ["Don Papa", 8],
          ["J&B", 5], ["Jack Daniel's", 5], ["Johnnie Walker Red Label", 5], ["Laphroaig", 7],
          ["Revel Stoke Spiced", 5], ["Stravecchio Branca", 5],
        ].map(([name, price]) => item(name, price, "Servito liscio o con ghiaccio.", "gin")),
      },
      amari: {
        label: "Amari",
        items: [
          ["Amaro Cenote", 12], ["Amaro del Capo", 4], ["Amaro Don Julio", 12], ["Amaro Gin", 5],
          ["Amaro Lucano", 4], ["Assenzio", 4], ["Averna", 4], ["Baileys", 4],
          ["Branca Menta", 4], ["Braulio", 4], ["Chupito", 3], ["Chupito Cenote", 4],
          ["Chupito Premium", 6], ["Disaronno", 4], ["Fernet Branca", 4], ["Herbas", 8],
          ["Jägermeister", 4], ["Jameson", 4], ["Jefferson", 5], ["Limoncello", 4],
          ["Monte doppio", 8], ["Montenegro", 4], ["Sambuca", 4], ["Shot", 2],
          ["Vecchia Romagna", 4], ["Vodka", 4],
        ].map(([name, price]) => item(name, price, "Servito liscio o con ghiaccio.", "gin")),
      },
      snack: {
        label: "Snack",
        items: [
          ["Bueno", 2], ["Caramelle singole", 0.2], ["Chupa Chups", 0.5], ["Cicche pacchetto", 2.5],
          ["Cicche singole", 1.2], ["Ciuccio", 2], ["Frisk", 1], ["Goleador", 0.2],
          ["Golia", 2.5], ["Golia Immuno", 5], ["Mentos", 1.8], ["Patatine grandi", 2.5],
          ["Patatine piccole", 1.8], ["Patatine San Carlo", 1.5], ["Pringles", 3], ["Trinketto", 2],
        ].map(([name, price]) => item(name, price, "Disponibile al banco.", "lunch")),
      },
      grappe: {
        label: "Grappe e rum",
        items: [
          ["Castagner Riserva", 4], ["Grappa Amarone", 5], ["Grappa Barri", 5], ["Grappa Barricata", 4],
          ["Grappa Bianca", 3], ["Grappa Gialla", 3], ["Grappino", 3], ["Rum", 4],
        ].map(([name, price]) => item(name, price, "Servito nel calice da degustazione.", "gin")),
      },
    },
  },
};

let currentTheme = getInitialTheme();
let activeCategory = Object.keys(menus[currentTheme].categories)[0];
let showAll = false;
let cart = readStorage(CART_KEY, []);

const menuGrid = document.querySelector("#menu-grid");
const categoryTabs = document.querySelector("#category-tabs");
const showMoreButton = document.querySelector("#show-more");
const cartDrawer = document.querySelector("#cart-drawer");
const drawerBackdrop = document.querySelector("#drawer-backdrop");
const bookingForm = document.querySelector("#booking-form");
const confirmationDialog = document.querySelector("#confirmation-dialog");

function readStorage(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getInitialTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === "day" || stored === "night") return stored;
  const hour = new Date().getHours();
  return hour >= 18 || hour < 6 ? "night" : "day";
}

function itemId(theme, category, name) {
  return `${theme}:${category}:${name}`.toLowerCase().replace(/[^a-z0-9à-ž]+/gi, "-");
}

function setTheme(theme) {
  currentTheme = theme;
  activeCategory = Object.keys(menus[theme].categories)[0];
  showAll = false;
  document.body.dataset.theme = theme;
  localStorage.setItem(THEME_KEY, theme);
  document.querySelector('meta[name="theme-color"]').setAttribute("content", theme === "day" ? "#f5fbff" : "#05070b");

  document.querySelectorAll("[data-set-theme]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.setTheme === theme));
  });

  const menu = menus[theme];
  document.querySelector("#menu-title").textContent = menu.title;
  document.querySelector("#menu-intro").textContent = menu.intro;
  document.querySelector("#hero-copy").textContent = menu.heroCopy;
  document.querySelector("#hero-menu-label").textContent = menu.heroLabel;
  renderTabs();
  renderMenu();
  refreshIcons();
}

function renderTabs() {
  categoryTabs.innerHTML = Object.entries(menus[currentTheme].categories)
    .map(([key, category]) => `
      <button
        class="category-tab"
        type="button"
        role="tab"
        data-category="${key}"
        aria-selected="${key === activeCategory}"
      >${category.label}</button>
    `)
    .join("");
}

function renderMenu() {
  const category = menus[currentTheme].categories[activeCategory];
  const visibleItems = showAll ? category.items : category.items.slice(0, 12);

  menuGrid.innerHTML = visibleItems
    .map((product) => {
      const id = itemId(currentTheme, activeCategory, product.name);
      return `
        <article class="menu-card">
          <div class="menu-card-media">
            <img class="${product.imageFit === "contain" ? "contain" : ""}" src="${product.image}" alt="${product.name}" loading="lazy" />
          </div>
          <div class="menu-card-content">
            <div class="menu-card-top">
              <h3>${product.name}</h3>
              <span class="menu-price">${euro.format(product.price)}</span>
            </div>
            <p class="menu-description">${product.description}</p>
            <button
              class="add-button"
              type="button"
              data-add-item="${id}"
              aria-label="Aggiungi ${product.name}"
              title="Aggiungi al carrello"
            ><i data-lucide="plus"></i></button>
          </div>
        </article>
      `;
    })
    .join("");

  const hasMore = category.items.length > 12;
  showMoreButton.parentElement.hidden = !hasMore;
  if (hasMore) {
    showMoreButton.querySelector("span").textContent = showAll ? "Mostra meno" : `Mostra tutto (${category.items.length})`;
    showMoreButton.querySelector("i, svg")?.setAttribute("data-lucide", showAll ? "chevrons-up" : "chevrons-down");
  }
  refreshIcons();
}

function findProduct(id) {
  for (const [themeKey, menu] of Object.entries(menus)) {
    for (const [categoryKey, category] of Object.entries(menu.categories)) {
      const product = category.items.find((entry) => itemId(themeKey, categoryKey, entry.name) === id);
      if (product) return { ...product, id, theme: themeKey, category: categoryKey };
    }
  }
  return null;
}

function addToCart(id) {
  const existing = cart.find((entry) => entry.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    const product = findProduct(id);
    if (!product) return;
    cart.push({ ...product, quantity: 1 });
  }
  persistCart();
  showToast("Aggiunto al carrello");
}

function updateQuantity(id, delta) {
  const entry = cart.find((product) => product.id === id);
  if (!entry) return;
  entry.quantity += delta;
  if (entry.quantity <= 0) cart = cart.filter((product) => product.id !== id);
  persistCart();
}

function removeFromCart(id) {
  cart = cart.filter((product) => product.id !== id);
  persistCart();
}

function persistCart() {
  writeStorage(CART_KEY, cart);
  renderCart();
  renderOrderPreview();
}

function cartTotal() {
  return cart.reduce((total, product) => total + product.price * product.quantity, 0);
}

function renderCart() {
  const count = cart.reduce((total, product) => total + product.quantity, 0);
  document.querySelector(".cart-count").textContent = count;
  document.querySelector("#cart-total").textContent = euro.format(cartTotal());
  document.querySelector("#checkout-button").disabled = cart.length === 0;

  const target = document.querySelector("#cart-items");
  if (!cart.length) {
    target.innerHTML = `
      <div class="empty-cart">
        <i data-lucide="shopping-bag"></i>
        <strong>Il carrello è vuoto</strong>
        <span>Aggiungi qualcosa dal menu.</span>
      </div>
    `;
    refreshIcons();
    return;
  }

  target.innerHTML = cart
    .map((product) => `
      <div class="cart-line">
        <img class="${product.imageFit === "contain" ? "contain" : ""}" src="${product.image}" alt="" />
        <div class="cart-line-copy">
          <strong>${product.name}</strong>
          <span>${euro.format(product.price * product.quantity)}</span>
          <div class="quantity-control">
            <button type="button" data-cart-action="decrease" data-id="${product.id}" aria-label="Riduci quantità">
              <i data-lucide="minus"></i>
            </button>
            <b>${product.quantity}</b>
            <button type="button" data-cart-action="increase" data-id="${product.id}" aria-label="Aumenta quantità">
              <i data-lucide="plus"></i>
            </button>
          </div>
        </div>
        <button class="cart-remove" type="button" data-cart-action="remove" data-id="${product.id}" aria-label="Rimuovi ${product.name}" title="Rimuovi">
          <i data-lucide="trash-2"></i>
        </button>
      </div>
    `)
    .join("");
  refreshIcons();
}

function renderOrderPreview() {
  document.querySelector("#preview-total").textContent = euro.format(cartTotal());
  document.querySelector("#preview-empty").hidden = cart.length > 0;
  document.querySelector("#preview-items").innerHTML = cart
    .map((product) => `<li><span>${product.quantity} × ${product.name}</span><strong>${euro.format(product.price * product.quantity)}</strong></li>`)
    .join("");
}

function openCart() {
  cartDrawer.classList.add("is-open");
  drawerBackdrop.classList.add("is-open");
  cartDrawer.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  cartDrawer.querySelector(".cart-close").focus();
}

function closeCart() {
  cartDrawer.classList.remove("is-open");
  drawerBackdrop.classList.remove("is-open");
  cartDrawer.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function showToast(message) {
  document.querySelector(".toast")?.remove();
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.append(toast);
  requestAnimationFrame(() => toast.classList.add("is-visible"));
  window.setTimeout(() => {
    toast.classList.remove("is-visible");
    window.setTimeout(() => toast.remove(), 250);
  }, 1800);
}

function submitBooking(event) {
  event.preventDefault();
  const data = new FormData(bookingForm);
  const code = `P-${Date.now().toString().slice(-6)}`;
  const order = {
    id: code,
    createdAt: new Date().toISOString(),
    customer: {
      name: data.get("name"),
      phone: data.get("phone"),
      email: data.get("email"),
    },
    reservation: {
      date: data.get("date"),
      time: data.get("time"),
      guests: Number(data.get("guests")),
      notes: data.get("notes"),
    },
    items: cart.map(({ id, name, price, quantity }) => ({ id, name, price, quantity })),
    total: cartTotal(),
    payment: "Contanti o carta al locale",
    status: "Nuovo",
  };

  const orders = readStorage(ORDER_KEY, []);
  orders.unshift(order);
  writeStorage(ORDER_KEY, orders);

  document.querySelector("#confirmation-code").textContent = code;
  document.querySelector("#confirmation-copy").textContent = `${order.customer.name}, il tavolo per ${order.reservation.guests} ${order.reservation.guests === 1 ? "persona" : "persone"} è richiesto per il ${formatDate(order.reservation.date)} alle ${order.reservation.time}.`;
  confirmationDialog.showModal();

  cart = [];
  persistCart();
  bookingForm.reset();
  setMinDate();
}

function formatDate(value) {
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}

function setMinDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const today = `${year}-${month}-${day}`;
  const field = document.querySelector("#booking-date");
  field.min = today;
  field.value = today;
}

function refreshIcons() {
  window.lucide?.createIcons({ attrs: { "aria-hidden": "true" } });
}

document.querySelectorAll("[data-set-theme]").forEach((button) => {
  button.addEventListener("click", () => setTheme(button.dataset.setTheme));
});

categoryTabs.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  showAll = false;
  renderTabs();
  renderMenu();
});

menuGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add-item]");
  if (button) addToCart(button.dataset.addItem);
});

showMoreButton.addEventListener("click", () => {
  showAll = !showAll;
  renderMenu();
});

document.querySelector(".cart-trigger").addEventListener("click", openCart);
document.querySelector(".cart-close").addEventListener("click", closeCart);
drawerBackdrop.addEventListener("click", closeCart);

document.querySelector("#cart-items").addEventListener("click", (event) => {
  const button = event.target.closest("[data-cart-action]");
  if (!button) return;
  const actions = {
    increase: () => updateQuantity(button.dataset.id, 1),
    decrease: () => updateQuantity(button.dataset.id, -1),
    remove: () => removeFromCart(button.dataset.id),
  };
  actions[button.dataset.cartAction]?.();
});

document.querySelector("#checkout-button").addEventListener("click", () => {
  closeCart();
  document.querySelector("#prenota").scrollIntoView({ behavior: "smooth" });
  window.setTimeout(() => bookingForm.elements.name.focus(), 500);
});

bookingForm.addEventListener("submit", submitBooking);
document.querySelector(".dialog-close").addEventListener("click", () => confirmationDialog.close());
document.querySelector(".dialog-done").addEventListener("click", () => confirmationDialog.close());
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && cartDrawer.classList.contains("is-open")) closeCart();
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
setMinDate();
renderCart();
renderOrderPreview();
setTheme(currentTheme);
window.addEventListener("load", refreshIcons);
