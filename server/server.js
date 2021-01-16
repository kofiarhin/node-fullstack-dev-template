const app = require('./app')
const path = require("path")
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../views");
// setup live reload
const liveReload = require("livereload");
const liveReloadServer = liveReload.createServer();
const connectLive = require("connect-livereload");            
liveReloadServer.watch(publicPath, viewsPath);



liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 50);
});

app.use(connectLive());

const port = process.env.PORT || 3000;

app.listen(port, () => console.log("listening on port" + port));
