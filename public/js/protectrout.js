let role = localStorage.getItem("role");
let token = localStorage.getItem("token");

export function protectRoute() {
  let path = window.location.pathname;

  if (!token) {
    window.location.href = "/index.html";
    return;
  }

  if (role === "admin") {
    if (path.includes("admin") || path.includes("usermange")) {
      console.log("Admin allowed ");
    } else {
      window.location.href = "/pages/admin.html";
    }
  }

  if (role === "user") {
    if (
      path.includes("campaign") ||
      path.includes("checkout") ||
      path.includes("mycampaign") ||
      path.includes("pledges")
    ) {
      console.log("User allowed ");
    } else {
      window.location.href = "/index.html";
    }
  }
}
