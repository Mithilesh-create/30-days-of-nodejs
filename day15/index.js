const express = require('express')
const app = express();
const port = 8000;
function loggingMiddleware(req, res, next) {
    const timestamp=new Date().toISOString();
    console.log(`${timestamp}: ${req.method} ${req.url}`);
    console.log(`Request Header: ${req.headers}`);
    console.log(`Request Body: ${req.body}`);
    next();
}
app.use(loggingMiddleware)
app.get("/", (req, res) => {
    res.send("Hello world!")
})
app.listen(port, () => {
    console.log("server started at port: ", port);
})