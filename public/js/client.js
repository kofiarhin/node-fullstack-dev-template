const path = location.pathname;


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
             password: 'password123'
}


        fetch("/users/login", {
          method: "POST",
          body: JSON.stringify({ email: data.email ,password: data.password}),
          headers: {
            "Content-type": "application/json"
          }
        }).then( response => {

          console.log(response.status)

        })
        
      })

}

// register controller
function RegisterController() {

  const form  = document.querySelector("form");

  form.addEventListener("submit", async function(e) {
    e.preventDefault();

    //  const firstname = form.firstname.value;
    //  const lastname = form.lastname.value;
    //  const password = form.password.value;
    //  const email = form.email.value;

     const userData = {
       firstname: "kofi",
       lastname: "arhin",
       email: "kofiarhin@gmail.com",
       password: 'password123'
     }

     clearErrors()

     fetch( "/users", {
       method: "POST",
       body: JSON.stringify(userData),
       headers: {
         "Content-type": "application/json"
       }
     }).then ( response => response.json()).then(  result => {

      if(result.error) {

            Object.keys(result.error).forEach ( error => {

              const field = document.querySelector(".error-"+error);

              field.innerText = result.error[error]
            })
      } else {

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