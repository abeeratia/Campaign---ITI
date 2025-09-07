// import { jwtDecode } from "jwt-decode";

function navBar() {
  return `
    <nav class="nav">
      <div class="nav__logo">
        <a href="/index.html">logo</a>
      </div>
      <ul class="nav__list">
        <li><a href="/index.html" class="nav-link">Home</a></li>
        <li><a href="/pages/about.html" class="nav-link">About</a></li>
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
}

function logIn() {
  window.location.href = "/pages/login.html";
}

function setActiveLink() {
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    if (link.href === window.location.href) {
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
  function decodeJWT(token) {
    // اتأكد إن فى توكن
    if (!token) return null;

    // افصلى التوكن لأجزاء
    const parts = token.split(".");
    if (parts.length !== 3) {
      console.error("Invalid JWT");
      return null;
    }

    // الجزء التانى هو الـ payload (Base64Url)
    const payload = parts[1];

    // حوّلى Base64Url → Base64 عادى
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");

    // فكّيه وحوّليه JSON
    const decodedPayload = JSON.parse(atob(base64));

    return decodedPayload;
  }

  // مثال للاستخدام:
  const token = localStorage.getItem("token"); // لو متخزّن عندك
  const payloadData = decodeJWT(token);

  console.log(payloadData); // هتلاقى بيانات المستخدم وصلاحياته ووقت الانتهاء

  if (token) {
    navSign.innerHTML = `
      <div class="log">
      <p>Hi </p>
      <p ><a href="/pages/campaign.html">Campaigns</a></p>
      <p  id="logout">Logout</p>
      
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
