const express = require('express')
const app = express();
const port = 8000;
const rateLimit = require("express-rate-limit")
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 5,
    delayMs: 0,
    Message: "Too many requests,please try again later."
})
function rateLimitMiddleware(req, res, next) {
    limiter(req, res, next)
}
app.use(rateLimitMiddleware)
app.get("/", (req, res) => {
    res.send("Hello world!")
})
app.listen(port, () => {
    console.log("server started at port: ", port);
})