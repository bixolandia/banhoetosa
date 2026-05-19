const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuToggle?.addEventListener("click", () => {
  nav.classList.toggle("is-open");
  menuToggle.setAttribute(
    "aria-expanded",
    nav.classList.contains("is-open")
  );
});

document.querySelectorAll('.nav a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});
