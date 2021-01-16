const path = require("path")
const publicPath = path.join(__dirname, "../public");

// setup live reload
const liveReload = require("livereload");
const liveReloadServer = liveReload.createServer();
const connectLive = require("connect-livereload");            
liveReloadServer.watch(publicPath, viewsPath);
