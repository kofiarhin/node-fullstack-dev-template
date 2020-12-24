function router() {

      const path = window.location.pathname;
      
      if(path == "/login" || path =="/register") {

            const form = document.querySelector(".main-form")
           
            form.addEventListener("submit", (e) => {
              e.preventDefault();

              if(path === "/login") {
                loginController(form)
              } else if(path === "/register") {

                registerController(form)
              }
            })
      }
}


function loginController(form) {

    const email = form.email;
    console.log(email)
}

function registerController(form) {
  
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    const data = {
      name: "lebron james",
      email: "lebron@gmail.com",
      password: "password123"
    }
    // make post request
    fetch("/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json"
      }
    }).then (response => {

      console.log(response)
    }).catch( error => {

      console.log(error)
    })

}
router()