const path = location.pathname;

const userOne = {
  firstname: "kofi",
  lastname: "arhin",
  email: "kofiarhin@gmail.com",
  password: "password"
}

console.log(userOne)

switch(path) {

  case "/register":
      RegisterController()
    break;
    case "/login":
      LoginController()
      break;
      
}


// login controller
function LoginController() {

     const form = document.querySelector("form")

      form.addEventListener("submit", async function(e){
        e.preventDefault();

        // const email = form.email.value;
        // const password = form.password.value;
        const data = {
             email: 'kofiarhin@gmail.com',
             password: "password"
            }


        fetch("/users/login", {
          method: "POST",
          body: JSON.stringify({ email: data.email ,password: data.password}),
          headers: {
            "Content-type": "application/json"
          }
        }).then( response => {

          if(response.status === 200) {
            location.assign("/home")
          }

        })
        
      })

}

// register controller
function RegisterController() {

  const form = document.querySelector("form")

  form.addEventListener("submit", async(e) => {
      e.preventDefault();


       fetch("/users", {
         method: "POST",
         body: JSON.stringify(userOne),
         headers: {
           "Content-type": "application/json"
         }
       }).then ( response => {

        console.log(response.status)
        if(response.status === 201) {
          location.assign("/login")
        }
       })
  })
}


function clearErrors() {

  const errors = document.querySelectorAll(".error");

  errors.forEach( error => {
    error.innerText = "";
  })
}