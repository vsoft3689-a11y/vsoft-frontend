// Video Carousel
const videos = document.querySelectorAll(".bg-video");
let current = 0;
setInterval(() => {
  videos[current].classList.remove("active");
  current = (current + 1) % videos.length;
  videos[current].classList.add("active");
}, 10000);

// Protect Links
function protectLink(linkId, pageUrl) {
  const link = document.getElementById(linkId);
  if (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      if (isLoggedIn) {
        window.location.href = pageUrl;
      } else {
        localStorage.setItem("redirectAfterLogin", pageUrl);
        window.location.href = "./login.html";
      }
    });
  }
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
    const res = await fetch("https://vsoft-backend-h5qj.onrender.com/auth/logout", {
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
    window.location.href = "index.html";
  } catch (err) {
    alert("Logout failed: " + err.message);
  }
});


