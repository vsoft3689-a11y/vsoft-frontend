const form = document.getElementById("regForm");
const msg = document.getElementById("msg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formdata = Object.fromEntries(new FormData(form));

  try {
    const res = await fetch("https://vsoft-backend-h5qj.onrender.com/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(formdata),
    });

    const data = await res.json();
    msg.innerHTML = data.message;

    if (res.status === 200 || data.status === 201) {
      msg.style.color = "green";
      setTimeout(() => (location.href = "login.html"), 1000);
    } else {
      msg.style.color = "red";
    }
  } catch (err) {
    msg.style.color = "red";
    msg.textContent = "Error: " + err.message;
  }
});