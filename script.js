'use strict';

// Keep the responsive navigation accessible on mobile.
const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('.primary-nav');
if (menuToggle && primaryNav) {
  menuToggle.addEventListener('click', () => {
    const open = primaryNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
  primaryNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    primaryNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      primaryNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.focus();
    }
  });
}

// Allow visitors to explore work by focus area.
const filters = Array.from(document.querySelectorAll('.filter'));
const projects = Array.from(document.querySelectorAll('.project-card'));
filters.forEach(button => button.addEventListener('click', () => {
  const selected = button.dataset.filter;
  filters.forEach(item => {
    const active = item === button;
    item.classList.toggle('is-active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  projects.forEach(project => {
    const categories = (project.dataset.category || '').split(' ');
    project.hidden = selected !== 'all' && !categories.includes(selected);
  });
}));

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
