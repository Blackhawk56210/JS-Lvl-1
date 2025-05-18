console.log("I created the perfect system");

const body = document.body;
const loader = document.getElementById("loader");
const mobileToggle = document.getElementById("themeToggleMobile");
const desktopToggle = document.getElementById("themeToggleDesktop");

// theme switcher
function setDarkMode(isDark) {
  document.body.classList.toggle("dark", isDark);
  mobileToggle.checked = isDark;
  desktopToggle.checked = isDark;
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

// Sync both toggles
mobileToggle.addEventListener("change", () => {
  setDarkMode(mobileToggle.checked);
});
desktopToggle.addEventListener("change", () => {
  setDarkMode(desktopToggle.checked);
});

// toggle local storage
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  setDarkMode(true);
}