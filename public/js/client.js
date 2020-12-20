fetch("/users")
  .then((response) => response.json())
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });
