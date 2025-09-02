const params = new URLSearchParams(window.location.search);
const degree = params.get('degree');
const branch = params.get('branch');
const type = params.get('type');
const domain = params.get('domain');

document.getElementById('title').textContent = `${degree} ${branch} ${type} - ${domain} Projects`;

async function getProjects() {
  let response = await fetch(`https://vsoft-backend-h5qj.onrender.com/api/projects/${degree}/${branch}/${type}/${domain}`);
  let data = await response.json();

  let table = document.createElement("table");
  let row = document.createElement("tr");

  let th1 = document.createElement("th");
  let th2 = document.createElement("th");
  th1.textContent = "TITLE";
  th2.textContent = "DESCRIPTION";
  th1.style.fontSize = "20px";
  th2.style.fontSize = "20px";
  row.append(th1, th2);
  table.appendChild(row);

  data.forEach(res => {
    let row = document.createElement("tr");

    ["title", "description"].forEach(key => {
      let td = document.createElement("td");
      td.textContent = res[key]; // fixed duplication
      row.appendChild(td);
    });

    table.appendChild(row);
  });

  document.getElementById("result").appendChild(table);
}

getProjects();



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
    const res = await fetch("https://vsoft-backend-h5qj.onrender.com/auth/logout", {
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
