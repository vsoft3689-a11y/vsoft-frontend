// Modal Functionality (optional, if you have a modal)
const modal = document.getElementById("registerModal");
const btn = document.getElementById("registerBtn");
const span = document.getElementById("closeModal");
const form = document.getElementById("registerForm");
const success = document.getElementById("registerSuccess");

if (btn && modal && span && form && success) {
    btn.onclick = () => modal.style.display = "flex";
    span.onclick = () => modal.style.display = "none";
    window.onclick = e => { if (e.target === modal) modal.style.display = "none"; }

    form.onsubmit = (e) => {
        e.preventDefault();
        success.style.display = "block";
        setTimeout(() => {
            modal.style.display = "none";
            form.reset();
            success.style.display = "none";
        }, 2000);
    };
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

if (logout) {
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
}