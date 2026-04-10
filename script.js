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

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      if (!email || !password) {
        status.textContent = "Please enter your email and password.";
        return;
      }

      localStorage.setItem("vp_logged_in_user", email);  
      status.textContent = "Login successful. Redirecting...";
      setTimeout(() => {
        window.location.href = "index.html";
      }, 900);
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
      email: document.getElementById("careerEmail").value.trim(),
      role: document.getElementById("role").value,
      experience: document.getElementById("experience").value.trim()
    };

    const apps = JSON.parse(localStorage.getItem("vp_applications")) || [];
apps.push(formData);
localStorage.setItem("vp_applications", JSON.stringify(apps));
    output.textContent = "Application saved locally in your browser. For a real live system, connect this form to a backend.";
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  setupDemoLogin();
  setupCareersForm();
});
