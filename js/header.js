let mobileOpen = false;

const navmenu = document.getElementById("navmenu");
const body = document.body;
const menuIcon = document.getElementById("menuIcon");
const header = document.getElementById("header");
const localTime = document.getElementById("localTime");

function toggleMenu() {
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
  if (mobileOpen) {
    toggleMenu();
  }
}

/* SCROLL EFFECT */
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

function formatTime(date) {
  return new Intl.DateTimeFormat("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Berlin",
  }).format(date);
}

function updateLocalTime() {
  if (!localTime) return;
  localTime.textContent = formatTime(new Date());
}

updateLocalTime();
setInterval(updateLocalTime, 1000);
