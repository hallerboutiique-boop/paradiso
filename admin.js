const ORDER_KEY = "paradiso_orders_v1";
const euro = new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" });
let orders = readOrders();

const ordersBody = document.querySelector("#orders-body");
const emptyState = document.querySelector("#admin-empty");
const searchInput = document.querySelector("#order-search");
const statusFilter = document.querySelector("#status-filter");
const orderDialog = document.querySelector("#order-dialog");

function readOrders() {
  try {
    return JSON.parse(localStorage.getItem(ORDER_KEY)) ?? [];
  } catch {
    return [];
  }
}

function saveOrders() {
  localStorage.setItem(ORDER_KEY, JSON.stringify(orders));
}

function formatDate(value) {
  if (!value) return "—";
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}

function filteredOrders() {
  const query = searchInput.value.trim().toLowerCase();
  const status = statusFilter.value;
  return orders.filter((order) => {
    const haystack = `${order.id} ${order.customer.name} ${order.customer.phone} ${order.customer.email ?? ""}`.toLowerCase();
    return (!query || haystack.includes(query)) && (status === "all" || order.status === status);
  });
}

function render() {
  const visible = filteredOrders();
  ordersBody.innerHTML = visible.map(orderRow).join("");
  ordersBody.closest("table").hidden = visible.length === 0;
  emptyState.classList.toggle("is-visible", visible.length === 0);
  renderStats();
  refreshIcons();
}

function orderRow(order) {
  const itemCount = order.items.reduce((sum, entry) => sum + entry.quantity, 0);
  return `
    <tr>
      <td><strong>${escapeHtml(order.id)}</strong><span>${formatCreatedAt(order.createdAt)}</span></td>
      <td><strong>${escapeHtml(order.customer.name)}</strong><span>${escapeHtml(order.customer.phone)}</span></td>
      <td><strong>${formatDate(order.reservation.date)} · ${escapeHtml(order.reservation.time)}</strong><span>${order.reservation.guests} ${order.reservation.guests === 1 ? "persona" : "persone"}</span></td>
      <td><strong>${itemCount ? `${itemCount} ${itemCount === 1 ? "prodotto" : "prodotti"}` : "Solo tavolo"}</strong><span>${escapeHtml(order.payment)}</span></td>
      <td><strong>${euro.format(order.total)}</strong></td>
      <td>
        <select class="table-status" data-status-id="${escapeHtml(order.id)}" aria-label="Stato ${escapeHtml(order.id)}">
          ${["Nuovo", "Confermato", "Completato", "Annullato"].map(status => `<option ${order.status === status ? "selected" : ""}>${status}</option>`).join("")}
        </select>
      </td>
      <td>
        <button class="icon-button row-view" type="button" data-view-id="${escapeHtml(order.id)}" aria-label="Vedi dettagli ${escapeHtml(order.id)}" title="Dettagli">
          <i data-lucide="eye"></i>
        </button>
      </td>
    </tr>
  `;
}

function renderStats() {
  document.querySelector("#stat-total").textContent = orders.length;
  document.querySelector("#stat-new").textContent = orders.filter(order => order.status === "Nuovo").length;
  document.querySelector("#stat-guests").textContent = orders
    .filter(order => order.status !== "Annullato")
    .reduce((sum, order) => sum + order.reservation.guests, 0);
  document.querySelector("#stat-revenue").textContent = euro.format(
    orders.filter(order => order.status !== "Annullato").reduce((sum, order) => sum + order.total, 0),
  );
}

function showOrder(id) {
  const order = orders.find(entry => entry.id === id);
  if (!order) return;

  document.querySelector("#order-detail").innerHTML = `
    <div class="detail-title">
      <p>${escapeHtml(order.id)} · ${escapeHtml(order.status)}</p>
      <h2>${escapeHtml(order.customer.name)}</h2>
    </div>
    <div class="detail-grid">
      <section class="detail-block">
        <h3>Contatti</h3>
        <p>${escapeHtml(order.customer.phone)}</p>
        <p>${escapeHtml(order.customer.email || "Email non indicata")}</p>
      </section>
      <section class="detail-block">
        <h3>Prenotazione</h3>
        <p>${formatDate(order.reservation.date)} alle ${escapeHtml(order.reservation.time)}</p>
        <p>${order.reservation.guests} ${order.reservation.guests === 1 ? "persona" : "persone"}</p>
      </section>
      <section class="detail-block full">
        <h3>Ordine</h3>
        ${order.items.length ? `
          <ul class="detail-items">
            ${order.items.map(entry => `<li><span>${entry.quantity} × ${escapeHtml(entry.name)}</span><strong>${euro.format(entry.price * entry.quantity)}</strong></li>`).join("")}
          </ul>
        ` : "<p>Nessun prodotto preordinato.</p>"}
        <div class="detail-total"><span>Totale</span><strong>${euro.format(order.total)}</strong></div>
      </section>
      <section class="detail-block full">
        <h3>Note</h3>
        <p>${escapeHtml(order.reservation.notes || "Nessuna nota.")}</p>
      </section>
    </div>
  `;
  orderDialog.showModal();
  refreshIcons();
}

function exportCsv() {
  if (!orders.length) return;
  const header = ["Codice", "Creato il", "Nome", "Telefono", "Email", "Data", "Ora", "Persone", "Prodotti", "Totale", "Pagamento", "Stato", "Note"];
  const rows = orders.map(order => [
    order.id,
    formatCreatedAt(order.createdAt),
    order.customer.name,
    order.customer.phone,
    order.customer.email,
    formatDate(order.reservation.date),
    order.reservation.time,
    order.reservation.guests,
    order.items.map(entry => `${entry.quantity}x ${entry.name}`).join(" | "),
    order.total.toFixed(2).replace(".", ","),
    order.payment,
    order.status,
    order.reservation.notes,
  ]);
  const csv = [header, ...rows].map(row => row.map(csvCell).join(";")).join("\n");
  const blob = new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `paradiso-ordini-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
}

function csvCell(value) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

function formatCreatedAt(value) {
  return new Intl.DateTimeFormat("it-IT", { dateStyle: "short", timeStyle: "short" }).format(new Date(value));
}

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = String(value ?? "");
  return div.innerHTML;
}

function refreshIcons() {
  window.lucide?.createIcons({ attrs: { "aria-hidden": "true" } });
}

ordersBody.addEventListener("change", event => {
  const select = event.target.closest("[data-status-id]");
  if (!select) return;
  const order = orders.find(entry => entry.id === select.dataset.statusId);
  if (!order) return;
  order.status = select.value;
  saveOrders();
  render();
});

ordersBody.addEventListener("click", event => {
  const button = event.target.closest("[data-view-id]");
  if (button) showOrder(button.dataset.viewId);
});

searchInput.addEventListener("input", render);
statusFilter.addEventListener("change", render);
document.querySelector("#export-orders").addEventListener("click", exportCsv);
document.querySelector("#clear-orders").addEventListener("click", () => {
  if (!orders.length || !window.confirm("Eliminare tutte le prenotazioni salvate su questo dispositivo?")) return;
  orders = [];
  saveOrders();
  render();
});
document.querySelector(".order-dialog-close").addEventListener("click", () => orderDialog.close());

render();
window.addEventListener("load", refreshIcons);
