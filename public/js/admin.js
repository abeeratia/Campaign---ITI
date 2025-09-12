// //import { protectRoute } from "./protectrout.js";

const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

function sidebarLayout() {
  return `
    <div class="sidebar">
      <div>
        <div class="logo">Admin Panel</div>
        <ul class="menu" id="sidebarMenu">
          <a href="/pages/admin.html"><li data-tab="users" class="active">Users</li></a>
          <a href="/pages/campaignsMange.html"><li data-tab="campaigns">Campaigns</li></a>
          <li data-tab="pledges">Pledges</li>
        </ul>
      </div>

      <div class="sidebar-footer" id="sidebarFooter"></div>
    </div>
  `;
}

function logOut() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  window.location.href = "/index.html";
}

export function AdminSidebar() {
  const sidebar = document.querySelector("#admin");
  if (!sidebar) return;

  sidebar.innerHTML = sidebarLayout();

  const sidebarFooter = document.querySelector("#sidebarFooter");
  sidebarFooter.innerHTML = `<button class="btn btn--full" id="logout">Logout</button>`;
  document.querySelector("#logout").addEventListener("click", logOut);
// 
  // tab switching
  const menuItems = document.querySelectorAll("#sidebarMenu li");
  const tabContents = document.querySelectorAll(".tab-content");

  menuItems.forEach((item) => {
    item.addEventListener("click", function () {
      menuItems.forEach((i) => i.classList.remove("active"));
      tabContents.forEach((tab) => tab.classList.remove("active"));

      this.classList.add("active");
      const tabId = this.getAttribute("data-tab");
      document.getElementById(tabId).classList.add("active");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  AdminSidebar();
  // protectRoute();
});
