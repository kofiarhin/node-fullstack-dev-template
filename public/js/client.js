const path = location.pathname;

SidenavController();

// sidenav controller
function SidenavController() {
  const menu = document.querySelector(".menu");
  const sidenav = document.querySelector(".sidenav");
  const close = document.querySelector(".close");

  menu.addEventListener("click", () => {
    sidenav.classList.toggle("active");
  });

  close.addEventListener("click", function () {
    sidenav.classList.remove("active");
  });
}

// main controller
switch (path) {
  case "/register":
    RegisterController();
    break;
  case "/login":
    LoginController();
    break;
}

// login controller
function LoginController() {
  const form = document.querySelector("form");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = form.email.value;
    const password = form.password.value;

    fetch("/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-type": "application/json",
      },
    }).then(async (response) => {
      if (response.status === 200) {
        location.assign("/home");
      }

      if (response.status === 404) {
        const result = await response.json();

        const domError = document.querySelector(".error");

        domError.innerText = result.error;
      }
    });
  });
}

// register controller
function RegisterController() {
  const form = document.querySelector("form");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    clearErrors();

    const firstname = document.querySelector(".firstname").value;
    const lastname = document.querySelector(".lastname").value;
    const email = document.querySelector(".email").value;
    const password = document.querySelector(".password").value;
    const request = await fetch("/users", {
      method: "POST",
      body: JSON.stringify({ firstname, lastname, email, password }),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (request.status === 400) {
      const errors = await request.json();

      const { error } = errors;
      const fields = Object.keys(error);

      fields.forEach((field) => {
        const domField = document.querySelector(`.error-${field}`);

        domField.innerText = error[field];
      });
    }

    if (request.status === 201) {
      location.assign("/login");
    }
  });
}

function clearErrors() {
  const errors = document.querySelectorAll(".error");

  errors.forEach((error) => {
    error.innerText = "";
  });
}
