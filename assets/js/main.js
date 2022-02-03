/*==================== SHOW MENU ====================*/
const showMenu = (headerToggle, navbarId) => {
  const toggle = document.getElementById(headerToggle),
    nav = document.getElementById(navbarId);

  // Validate that variables exist
  if (headerToggle && navbarId) {
      toggle.addEventListener('click', () => {
      // We add the show-menu class to the div tag with the nav__menu class
        nav.classList.toggle('show-menu');
        
      //Change icon
        toggle.classList.toggle('bx-x');
    })
  }
}
showMenu('header-toggle', 'navbar')

/*==================== LINK ACTIVE ====================*/
const linkColor = document.querySelectorAll('.nav__link');

function colorLink() {
  linkColor.forEach(l => l.classList.remove('active'));
  this.classList.add('active');
}

linkColor.forEach(l => l.addEventListener('click', colorLink));