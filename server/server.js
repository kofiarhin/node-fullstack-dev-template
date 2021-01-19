
const app = require("./app")
const port = process.env.PORT || 3000;

console.log(process.env.environment)

app.listen(port, () => console.log("listening on port" + port));
