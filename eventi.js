const EVENT_THEME_KEY = "paradiso_theme";
const eventDialog = document.querySelector("#event-dialog");
const eventDialogImage = document.querySelector("#event-dialog-image");

function getEventTheme() {
  const savedTheme = localStorage.getItem(EVENT_THEME_KEY);
  if (savedTheme === "day" || savedTheme === "night") return savedTheme;
  const hour = new Date().getHours();
  return hour >= 18 || hour < 6 ? "night" : "day";
}

function setEventTheme(theme) {
  document.body.dataset.theme = theme;
  localStorage.setItem(EVENT_THEME_KEY, theme);
  document
    .querySelector('meta[name="theme-color"]')
    .setAttribute("content", theme === "day" ? "#f5fbff" : "#05070b");

  document.querySelectorAll("[data-set-theme]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.setTheme === theme));
  });
}

document.querySelectorAll("[data-set-theme]").forEach((button) => {
  button.addEventListener("click", () => setEventTheme(button.dataset.setTheme));
});

document.querySelectorAll("[data-event-image]").forEach((button) => {
  button.addEventListener("click", () => {
    const image = button.querySelector("img");
    eventDialogImage.src = button.dataset.eventImage;
    eventDialogImage.alt = image?.alt || "Immagine evento del Paradiso";
    eventDialog.showModal();
    document.body.classList.add("gallery-open");
  });
});

function closeEventDialog() {
  eventDialog.close();
  document.body.classList.remove("gallery-open");
  eventDialogImage.src = "";
}

document.querySelector(".event-dialog-close").addEventListener("click", closeEventDialog);
eventDialog.addEventListener("click", (event) => {
  if (event.target === eventDialog) closeEventDialog();
});
eventDialog.addEventListener("close", () => document.body.classList.remove("gallery-open"));

document.querySelector("#current-year").textContent = new Date().getFullYear();
setEventTheme(getEventTheme());
window.addEventListener("load", () => {
  window.lucide?.createIcons({ attrs: { "aria-hidden": "true" } });
});
