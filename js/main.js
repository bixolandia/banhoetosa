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

/* Lightbox — álbuns da galeria */
const lightbox = document.getElementById("gallery-lightbox");
const lightboxImg = lightbox?.querySelector(".lightbox__img");
const lightboxCaption = lightbox?.querySelector(".lightbox__caption");
let lightboxPhotos = [];
let lightboxIndex = 0;

function showLightbox(photos, index) {
  if (!lightbox || !lightboxImg || !photos.length) return;

  lightboxPhotos = photos;
  lightboxIndex = (index + photos.length) % photos.length;
  const photo = photos[lightboxIndex];

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
  lightboxPhotos = [];
}

document.querySelectorAll(".gallery-album__item").forEach((btn) => {
  btn.addEventListener("click", () => {
    const grid = btn.closest(".gallery-album__grid");
    if (!grid) return;

    const photos = Array.from(grid.querySelectorAll("img"));
    const buttons = Array.from(grid.querySelectorAll(".gallery-album__item"));
    showLightbox(photos, buttons.indexOf(btn));
  });
});

lightbox?.querySelector(".lightbox__nav--prev")?.addEventListener("click", () => {
  showLightbox(lightboxPhotos, lightboxIndex - 1);
});

lightbox?.querySelector(".lightbox__nav--next")?.addEventListener("click", () => {
  showLightbox(lightboxPhotos, lightboxIndex + 1);
});

lightbox?.querySelectorAll("[data-lightbox-close]").forEach((el) => {
  el.addEventListener("click", closeLightbox);
});

document.addEventListener("keydown", (e) => {
  if (lightbox?.hidden || !lightboxPhotos.length) return;

  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") showLightbox(lightboxPhotos, lightboxIndex - 1);
  if (e.key === "ArrowRight") showLightbox(lightboxPhotos, lightboxIndex + 1);
});
