// Fetch the logged-in user from localStorage (set on login)
window.addEventListener("DOMContentLoaded", function () {
  // You can use a session key or similar to track the logged-in user
  const sessionEmail = localStorage.getItem("sessionEmail");
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find((u) => u.email === sessionEmail);

  if (!user) {
    // Not logged in, redirect to login
    window.location.href = "login.html";
    return;
  }

  document.getElementById("user-name").textContent = user.name || "";
  document.getElementById("user-email").textContent = user.email || "";
  document.getElementById("user-phone").textContent = user.phone || "";
  document.getElementById("user-address").textContent = user.address || "";
  document.getElementById("user-gender").textContent = user.gender || "";
  document.getElementById("user-city").textContent = user.city || "";
  document.getElementById("user-skills").textContent =
    user.skills && user.skills.length ? user.skills.join(", ") : "";

  document.getElementById("logout-btn").addEventListener("click", function () {
    localStorage.removeItem("sessionEmail");
    window.location.href = "login.html";
  });
});
