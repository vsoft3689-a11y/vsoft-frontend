const form = document.getElementById("loginForm");
const msg = document.getElementById("msg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formdata = Object.fromEntries(new FormData(form));

  try {
    const res = await fetch("https://vsoft.onrender.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(formdata),
    });

    const data = await res.json();

    msg.innerHTML = data.message;

    if (data.status === 200) {
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("user", JSON.stringify(data.user));
      msg.style.color = "green";
      setTimeout(() => (location.href = "index.html"), 2000);
    } else {
      msg.style.color = "red";
      msg.textContent = data.message || "Login failed";
    }
  } catch (err) {
    msg.style.color = "red";
    msg.textContent = "Error: " + err.message;
  }
});