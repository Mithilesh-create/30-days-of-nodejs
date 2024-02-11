const express = require('express')
const app = express();
const port = 8000;
const jwt = require("jsonwebtoken")

function authenticationMiddleware(req, res, next) {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(401).send("Authorization denied: No token provided!")
    }
    try {
        const decoded = jwt.verify(token, "Secret_KEY");
        req.username = decoded.username;
        next();
    } catch (error) {
        return res.status(401).send("Authorization denied: Invalid token!")
    }
}
app.get("/", authenticationMiddleware, (req, res) => {
    res.send(`Hello authorized ${req.username} !`)
})
app.post("/token", (req, res) => {
    const { username } = req.body;
    const accesstoken = jwt.sign({ username }, "Secret_KEY")
    res.json({ accesstoken })
})
app.listen(port, () => {
    console.log("server started at port: ", port);
})