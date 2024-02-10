const express = require('express')
const app = express();
const port = 8000;
const path = require("path")
const staticFileServer = (req, res) => {
    res.sendFile(path.resolve("Solutions/index.html"))
}
app.get("/", staticFileServer)
const styleStaticFileServer = (req, res) => {
    res.sendFile(path.resolve("Solutions/style.css"))
}

app.get("/styles/style.css", styleStaticFileServer)

app.listen(port, () => {
    console.log("server started at port: ", port);
})