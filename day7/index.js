const express = require('express')
const app = express();
const port = 8000;
const requestLoggerMiddleware = (req, res, next) => {
    const timestamp = new Date().toLocaleDateString();
    const method = req.method;
    console.log(`${timestamp} - ${method} request received`)
    next();
}
app.use(requestLoggerMiddleware)
app.get("/", (req, res) => {
    res.send("Hello World");
})


app.listen(port, () => {
    console.log("server started at port: ", port);
})