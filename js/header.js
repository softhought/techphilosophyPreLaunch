let mobileOpen = false;

const navmenu = document.getElementById("navmenu");
const body = document.body;
const menuIcon = document.getElementById("menuIcon");
const header = document.getElementById("header");

function toggleMenu() {
  if (!navmenu || !menuIcon) return;
  mobileOpen = !mobileOpen;

  if (mobileOpen) {
    navmenu.classList.add("open");
    body.classList.add("mobile-nav-active");
    menuIcon.src = "/assets/img/close.png";
  } else {
    navmenu.classList.remove("open");
    body.classList.remove("mobile-nav-active");
    menuIcon.src = "/assets/img/menu_icon.png";
  }
}

function handleNavClick() {
  if (!navmenu || !menuIcon) return;
  if (mobileOpen) {
    toggleMenu();
  }
}

/* SCROLL EFFECT */
window.addEventListener("scroll", () => {
  if (!header) return;
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});