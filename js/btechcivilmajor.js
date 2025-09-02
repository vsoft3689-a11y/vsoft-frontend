// const modal = document.getElementById("registerModal");
// const btn = document.getElementById("registerBtn");
// const span = document.getElementById("closeModal");

if (btn && modal && span) {
  btn.onclick = () => modal.style.display = "flex";
  span.onclick = () => modal.style.display = "none";
  window.onclick = e => { if (e.target === modal) modal.style.display = "none"; };
}
// Select elements
const loginBtn = document.querySelector(".login-btn");
const logoutBtn = document.querySelector(".logout");

// Check login status on page load
function checkLoginStatus() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn) {
    // User logged in
    loginBtn.style.display = "none";
    logoutBtn.style.display = "block";
  } else {
    // User logged out
    loginBtn.style.display = "block";
    logoutBtn.style.display = "none";
  }
}
checkLoginStatus();

// Call this after successful login API response
function handleLogin(userData) {
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("user", JSON.stringify(userData));

  // Redirect to home page after login
  window.location.href = "index.html";
}

// Logout functionality
logoutBtn.addEventListener("click", async () => {
  try {
    const res = await fetch("https://vsoft.onrender.com/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();
    alert(data.message);

    // Clear session
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");

    checkLoginStatus();

    // Redirect to login page
    window.location.href = "login.html";
  } catch (err) {
    alert("Logout failed: " + err.message);
  }
});


