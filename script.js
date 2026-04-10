function setupDemoLogin() {
  const form = document.getElementById("loginForm");
  const status = document.getElementById("loginStatus");
  const logoutBtn = document.getElementById("logoutBtn");
  const currentUser = document.getElementById("currentUser");

  const savedUser = localStorage.getItem("vp_logged_in_user");
  if (savedUser && currentUser) {
    currentUser.textContent = savedUser;
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const username = document.getElementById("email").value.trim(); // now used as username
      const password = document.getElementById("password").value.trim();

      if (!username || !password) {
        status.textContent = "Please enter username and password.";
        return;
      }

      // simple demo login
      localStorage.setItem("vp_logged_in_user", username);

      status.textContent = "Login successful...";
      setTimeout(() => {
        window.location.href = "staff.html"; // go to staff panel
      }, 800);
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      localStorage.removeItem("vp_logged_in_user");
      window.location.href = "login.html";
    });
  }
}

function setupCareersForm() {
  const form = document.getElementById("careersForm");
  const output = document.getElementById("formMessage");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = {
      fullName: document.getElementById("fullName").value.trim(),
      discord: document.getElementById("careerEmail").value.trim(), // ✅ now discord
      role: document.getElementById("role").value,
      experience: document.getElementById("experience").value.trim(),
      status: "pending" // ✅ for staff panel
    };

    const apps = JSON.parse(localStorage.getItem("vp_applications")) || [];

    apps.push(formData);

    localStorage.setItem("vp_applications", JSON.stringify(apps));

    output.textContent = "Application submitted successfully ✅";

    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  setupDemoLogin();
  setupCareersForm();
});
