// usermanage.js
import { AdminSidebar } from "./admin.js";

AdminSidebar();

const usersTableBody = document.querySelector("#usersTable tbody");

async function renderUsers() {
  // جلب بيانات المستخدمين من السيرفر
  const response = await fetch("http://localhost:3001/users");
  const users = await response.json();
  console.log(users);

  // مسح أي بيانات قديمة في الجدول
  usersTableBody.innerHTML = "";

  // عرض كل مستخدم
  users.map((user) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.role}</td>
      <td>${user.isActive ? "❌" : "✅"}</td>
      <td>${user.isBlock ? "❌" : "✅"}</td>

      <td>
        <button class="roleBtn btn-role" id="roleBtn${
          user.id
        }">Change Role</button>
        <button class="activeBtn btn-active" id="activeBtn${user.id}">${
      user.isActive ? "Pending" : "Active"
    }</button>
        <button class="blockBtn btn-active" id="blockBtn${user.id}">${
      user.isBlock ? "🚫" : "Block"
    }</button>
      </td>
    `;

    usersTableBody.appendChild(tr);

    // تغيير الدور
    document
      .getElementById(`roleBtn${user.id}`)
      .addEventListener("click", async function () {
        let newRole = user.role === "user" ? "admin" : "user";
        const res = await fetch(`http://localhost:3001/users/${user.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: newRole }),
        });

        const updatedUser = await res.json();
        console.log(updatedUser);
        user.role = updatedUser.role;
        tr.children[3].textContent = updatedUser.role;
      });

    // تغيير حالة المستخدم
    document
      .getElementById(`activeBtn${user.id}`)
      .addEventListener("click", async function () {
        let newActive = !user.isActive;
        const res = await fetch(`http://localhost:3001/users/${user.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isActive: newActive }),
        });

        const updatedUser = await res.json();
        console.log(updatedUser);

        user.isActive = updatedUser.isActive;
        tr.children[4].textContent = updatedUser.isActive ? "❌" : "✅";
        this.textContent = updatedUser.isActive ? "Pending" : "Active";
      });

    // تغيير حالة البلوك
    document
      .getElementById(`blockBtn${user.id}`)
      .addEventListener("click", async function () {
        let newBlock = !user.isBlock;
        const res = await fetch(`http://localhost:3001/users/${user.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isBlock: newBlock }),
        });

        const updatedUser = await res.json();
        console.log(updatedUser);

        user.isBlock = updatedUser.isBlock;
        tr.children[5].textContent = updatedUser.isBlock ? "❌" : "✅";
        this.textContent = updatedUser.isBlock ? "🚫" : "Block";
      });
  });
}

// تفعيل العرض عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", renderUsers);
