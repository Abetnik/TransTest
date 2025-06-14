import { logoData } from "./logo";

import gsap from "gsap";

document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.querySelector(".overlay");
  overlay.style.width = "100vw";
  overlay.style.height = "100vh";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.transform = "none";

  const hero = document.querySelector(".hero");
  const outro = document.querySelector(".outro");

  const heroImgContainer = document.querySelector(".hero-img-container");
  const heroImgLogo = document.querySelector(".hero-img-logo");
  const heroImgCopy = document.querySelector(".hero-img-copy");
  const fadeOverlay = document.querySelector(".fade-overlay");
  const svgOverlay = document.querySelector(".overlay");
  const overlayCopy = document.querySelector(".overlay-copy h1");
  const startButton = document.querySelector(".enter-button");

  const initialOverlayScale = 500;
  const logoContainer = document.querySelector(".logo-container");
  const logoMask = document.getElementById("logoMask");

  logoMask.setAttribute("d", logoData);

  function updateLogoMask() {
    const logoDimensions = logoContainer.getBoundingClientRect();
    const logoBoundingBox = logoMask.getBBox();

    const horizontalScaleRatio = logoDimensions.width / logoBoundingBox.width;
    const verticalScaleRatio = logoDimensions.height / logoBoundingBox.height;
    const logoScaleFactor = Math.min(horizontalScaleRatio, verticalScaleRatio);

    const logoHorizontalPosition =
      logoDimensions.left +
      (logoDimensions.width - logoBoundingBox.width * logoScaleFactor) / 2 -
      logoBoundingBox.x * logoScaleFactor;
    const logoVerticalPosition =
      logoDimensions.top +
      (logoDimensions.height - logoBoundingBox.height * logoScaleFactor) / 2 -
      logoBoundingBox.y * logoScaleFactor;

    logoMask.setAttribute(
      "transform",
      `translate(${logoHorizontalPosition}, ${logoVerticalPosition}) scale(${logoScaleFactor})`
    );
  }

  updateLogoMask();

  gsap.set(svgOverlay, {
    transformOrigin: "50% 25%",
    scale: initialOverlayScale,
  });
  gsap.set(heroImgContainer, { scale: 1.5 });

  function transitionToOutro() {
    const tl = gsap.timeline({
      onComplete: () => {
        hero.classList.add("hidden");
        outro.classList.remove("hidden");
      },
    });

    tl.to([heroImgLogo, heroImgCopy], { opacity: 0, duration: 0.3 });
    tl.to(heroImgContainer, { scale: 1, duration: 1.5 }, "<");
    tl.to(svgOverlay, { scale: 1, duration: 1.5 }, "<");
    tl.to(fadeOverlay, { opacity: 1, duration: 0.6 }, "-=0.6");
    tl.to(overlayCopy, { opacity: 1, duration: 0.6, scale: 1 }, "-=0.6");
  }

  function transitionToHero() {
    hero.classList.remove("hidden");
    const tl = gsap.timeline({
      onComplete: () => {
        outro.classList.add("hidden");
      },
    });

    tl.to([overlayCopy], { opacity: 0, duration: 0.3 });
    tl.to(fadeOverlay, { opacity: 0, duration: 0.3 }, "<");
    tl.to(svgOverlay, { scale: initialOverlayScale, duration: 1.5 }, "<");
    tl.to(heroImgContainer, { scale: 1.5, duration: 1.5 }, "<");
    tl.to([heroImgLogo, heroImgCopy], { opacity: 1, duration: 0.3 }, "-=1.2");
  }

  startButton.addEventListener("click", transitionToOutro);

  const backButton = document.querySelector(".back-button");
  if (backButton) {
    backButton.addEventListener("click", transitionToHero);
  }

  window.addEventListener("resize", updateLogoMask);
});
