const GALLERY_THEME_KEY = "paradiso_theme";

function getGalleryTheme() {
  const savedTheme = localStorage.getItem(GALLERY_THEME_KEY);
  if (savedTheme === "day" || savedTheme === "night") return savedTheme;
  const hour = new Date().getHours();
  return hour >= 18 || hour < 6 ? "night" : "day";
}

function setGalleryTheme(theme) {
  document.body.dataset.theme = theme;
  localStorage.setItem(GALLERY_THEME_KEY, theme);
  document
    .querySelector('meta[name="theme-color"]')
    .setAttribute("content", theme === "day" ? "#f5fbff" : "#05070b");

  document.querySelectorAll("[data-set-theme]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.setTheme === theme));
  });
}

document.querySelectorAll("[data-set-theme]").forEach((button) => {
  button.addEventListener("click", () => setGalleryTheme(button.dataset.setTheme));
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
setGalleryTheme(getGalleryTheme());
window.addEventListener("load", () => {
  window.lucide?.createIcons({ attrs: { "aria-hidden": "true" } });
});
