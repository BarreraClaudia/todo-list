const navbarToggle = document.querySelector('.navbar-toggle');
const nav = document.querySelector('nav');

navbarToggle.addEventListener('click', () => {
  navbarToggle.classList.toggle('active-nav');
  nav.classList.toggle('active-nav');
});

export { navbarToggle };
