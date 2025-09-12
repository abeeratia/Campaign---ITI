const token = localStorage.getItem("token");
function navBar() {
  return `
    <nav class="nav">
      <div class="nav__logo">
        <a href="/index.html">logo</a>
      </div>
      <ul class="nav__list">
        <li><a href="/index.html" class="nav-link">Home</a></li>
        <li><a href="/pages/about.html" class="nav-link">About</a></li>
       ${
         token
           ? `<li><a href="/pages/groupcampaign.html" class="nav-link">Show Campaigns</a></li>
        <li><a href="/pages/campaign.html" class="nav-link">Add Campaigns</a></li>`
           : ""
       } 
      </ul>
      <div class="menu">
        <i class="fa-solid fa-align-justify"></i>
      </div>
      <ul class="nav__sign"></ul>
    </nav>
  `;
}

function menuToggle() {
  const menuBtn = document.querySelector(".menu");
  const navList = document.querySelector(".nav__list");
  if (menuBtn && navList) {
    menuBtn.addEventListener("click", () => {
      navList.classList.toggle("active");
    });
  }
}

function logOut() {
  localStorage.removeItem("token");
  location.reload();
  window.location.href = "/index.html";
}

function logIn() {
  window.location.href = "/pages/login.html";
}

function setActiveLink() {
  const links = document.querySelectorAll(".nav-link");
  const currentPath = window.location.pathname;

  links.forEach((link) => {
    const linkPath = new URL(link.href).pathname;

    if (
      linkPath === currentPath ||
      (linkPath.endsWith("index.html") && currentPath === "/")
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

export let NavBar = () => {
  const navContent = document.querySelector("#nav");
  if (!navContent) return;

  navContent.innerHTML = navBar();
  const navSign = document.querySelector(".nav__sign");

  const userName = localStorage.getItem("userName");
  console.log(userName);

  if (token) {
    navSign.innerHTML = `
      <div class="log">
        <p><a href = "../pages/mycampaign.html"> My Campaign </a></p>
        <p> <a href="../pages/pledges.html">  My Pledges </a> </p>
        <p>Hi ${userName}</p>
        <p id="logout">Logout</p>
      </div>
    `;
    document.querySelector("#logout").addEventListener("click", logOut);
  } else {
    navSign.innerHTML = `
      <p class="log"><a href="/pages/regester.html">Register</a></p>
      <p class="log" id="login">Login</p>
    `;
    document.querySelector("#login").addEventListener("click", logIn);
  }

  menuToggle();
  setActiveLink();
};

document.addEventListener("DOMContentLoaded", () => {
  NavBar();
});
