const express = require("express");
const app = express();
const path = require("path");
const liveReload = require("livereload");
const connectLive = require("connect-livereload");
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../views");

const liveReloadServer = liveReload.createServer();
liveReloadServer.watch(publicPath, viewsPath);

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

// setup view
app.use(express.static(publicPath));
app.use(express.json());
app.set("view engine", "hbs");
app.use(connectLive());

// routes

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

const port = process.env.PORT || 3000;

app.listen(port, () => console.log("listening on port" + port));
