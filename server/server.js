const express = require("express");
const app = express();
const path = require("path");
const liveReload = require("livereload");
const connectLive = require("connect-livereload");
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../views");
const partialsPath = path.join(__dirname, "../views/partials")
const hbs = require("hbs")
const cookieParser = require("cookie-parser")

const liveReloadServer = liveReload.createServer();
liveReloadServer.watch(publicPath, viewsPath);

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 50);
});

// setup middlewares
app.use(express.static(publicPath));
app.use(express.json());
app.use(cookieParser())
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath)
app.use(connectLive());
// routes


// default data
const createdBy = {
  name: "kofi arhin",
  email: "kofiarhin@gmail.com"
}
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/users", (req, res) => {
  res.send([{ name: "lebron" }, { name: "kofi arhin" }]);
});

app.post("/users", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.get("/products", (req, res) => {
  res.send([{ name: "iphne 12" }, { name: "books" }]);
});

app.get("/login", (req,res) => {
  res.render("login", {name: "kofi arhin"})
})


app.get("/register", (req, res) => {

  res.render("register", { name: "kofi arhin"})
})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log("listening on port" + port));
