"use strict";

const navToggle = document.querySelector(".nav-toggle");
const navigation = document.querySelector(".site-nav");
if (navToggle && navigation) {
  navToggle.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
  navigation.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      navigation.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project-card");
filters.forEach(button => {
  button.addEventListener("click", () => {
    const selected = button.dataset.filter;
    filters.forEach(item => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    projects.forEach(card => {
      const categories = (card.dataset.category || "").split(" ");
      card.hidden = selected !== "all" && !categories.includes(selected);
    });
  });
});

const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());