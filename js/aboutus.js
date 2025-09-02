// Hero background image slider
// const slides = document.querySelectorAll('.hero-section .bg-slide');
// let currentSlide = 0;
// const slideInterval = 4000;

// setInterval(() => {
//   slides[currentSlide].classList.remove('active');
//   currentSlide = (currentSlide + 1) % slides.length;
//   slides[currentSlide].classList.add('active');
// }, slideInterval);

// // Scroll reveal animation for service cards
// function revealServiceCards() {
//   document.querySelectorAll('.service-card').forEach(card => {
//     const rect = card.getBoundingClientRect();
//     if (rect.top < window.innerHeight - 24) {
//       card.classList.add('visible');
//     }
//   });
// }

// window.addEventListener('scroll', revealServiceCards);
// window.addEventListener('load', revealServiceCards);



// Modal functionality
const modal = document.getElementById("registerModal");
const btn = document.getElementById("registerBtn");
const span = document.getElementById("closeModal");

if (btn && modal && span) {
  btn.onclick = () => modal.style.display = "flex";
  span.onclick = () => modal.style.display = "none";
  window.onclick = e => { if (e.target === modal) modal.style.display = "none"; };
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

    // redirect to login page
    window.location.href = "login.html";
  } catch (err) {
    alert(err.message);
  }
});


