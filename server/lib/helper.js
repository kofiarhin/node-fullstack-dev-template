const { model } = require("mongoose");

// handle errors
function handleErrors(error) {

  let errors = {}

  if(error.code === 11000) {
    return errors = {email: "email already taken!"}
  }
  if(error.message.includes("User validation failed")) {

     Object.values(error.errors).forEach( item => {

        const { path, message} = item.properties;

         errors[path] = message;
     })
  }

  return errors;

}


module.exports = { handleErrors}