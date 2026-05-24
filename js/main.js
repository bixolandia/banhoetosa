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

/* Lightbox — álbum Arraiá */
const lightbox = document.getElementById("arraia-lightbox");
const lightboxImg = lightbox?.querySelector(".lightbox__img");
const lightboxCaption = lightbox?.querySelector(".lightbox__caption");
const arraiaPhotos = Array.from(
  document.querySelectorAll(".arraia-album__item img")
);
let lightboxIndex = 0;

function showLightbox(index) {
  if (!lightbox || !lightboxImg || !arraiaPhotos.length) return;

  lightboxIndex = (index + arraiaPhotos.length) % arraiaPhotos.length;
  const photo = arraiaPhotos[lightboxIndex];

  lightboxImg.src = photo.src;
  lightboxImg.alt = photo.alt;
  if (lightboxCaption) lightboxCaption.textContent = photo.alt;

  lightbox.hidden = false;
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  lightbox.querySelector(".lightbox__close")?.focus();
}

function closeLightbox() {
  if (!lightbox) return;

  lightbox.hidden = true;
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  lightboxImg?.removeAttribute("src");
}

document.querySelectorAll(".arraia-album__item").forEach((btn, index) => {
  btn.addEventListener("click", () => showLightbox(index));
});

lightbox?.querySelector(".lightbox__nav--prev")?.addEventListener("click", () => {
  showLightbox(lightboxIndex - 1);
});

lightbox?.querySelector(".lightbox__nav--next")?.addEventListener("click", () => {
  showLightbox(lightboxIndex + 1);
});

lightbox?.querySelectorAll("[data-lightbox-close]").forEach((el) => {
  el.addEventListener("click", closeLightbox);
});

document.addEventListener("keydown", (e) => {
  if (lightbox?.hidden) return;

  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") showLightbox(lightboxIndex - 1);
  if (e.key === "ArrowRight") showLightbox(lightboxIndex + 1);
});
