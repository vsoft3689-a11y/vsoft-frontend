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

//  ["btechLink","footerBtechLink","mtechLink","footerMtechLink","mbaLink","footerMbaLink","mcaLink","footerMcaLink","internshipLink","footerInternshipLink"]
// .forEach(id => protectLink(id, document.getElementById(id)?.href));

// Logout functionality
const registerbtn = document.querySelector(".register-btn");
const loginbtn = document.querySelector(".login-btn");
const logout = document.querySelector(".logout");

if (localStorage.getItem("isLoggedIn")) {
  registerbtn.style.display = "none";
  loginbtn.style.display = "none";
  logout.style.display = "block";
}

logout.addEventListener("click", async () => {
  try {
    const res = await fetch("https://vsoft.onrender.com/auth/logout", { method: "POST", credentials: "include" });
    const data = await res.json();
    alert(data.message);

    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");

    logout.style.display = "none";
    window.location.href = "index.html";
  } catch (err) {
    alert(err.message);
  }
});