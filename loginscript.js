// Wait for the DOM to load
window.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector(".login-form");

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find((u) => u.email === email);

      if (!user) {
        alert("No account found with this email.");
        return;
      }

      if (user.password !== password) {
        alert("Incorrect password.");
        return;
      }

      localStorage.setItem("sessionEmail", user.email);
      alert("Login successful! Redirecting to dashboard...");
      window.location.href = "dashboard.html";
    });
  }

  // Password toggle functionality
  const passwordInput = document.getElementById("password");
  const togglePassword = document.getElementById("togglePassword");

  if (passwordInput && togglePassword) {
    let show = false;

    togglePassword.addEventListener("click", function () {
      show = !show;
      passwordInput.type = show ? "text" : "password";
      this.classList.toggle("bx-show", !show);
      this.classList.toggle("bx-hide", show);
    });
  }
});
