// Show sections dynamically
function showSection(id) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => section.classList.remove('active-section'));
  document.getElementById(id).classList.add('active-section');
}

// Logout functionality
const registerbtn = document.querySelector(".register-btn");
const loginbtn = document.querySelector(".login-btn");
const logout = document.querySelector(".logout");

let exists = localStorage.getItem("isLoggedIn");

if (exists) {
  registerbtn.style.display = "none";
  loginbtn.style.display = "none";
  logout.style.display = "block";
}

logout.addEventListener("click", async () => {
  try {
    const res = await fetch("https://vsoft.onrender.com/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();
    alert(data.message);

    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");

    logout.style.display = "none";
    window.location.href = "login.html";
  } catch (err) {
    alert(err.message);
  }
});