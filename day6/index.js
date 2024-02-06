const express = require('express')
const app = express();
const port = 8000;
app.get("/", (req, res) => {
    res.send("Hello World");
})

const greetHandler = async (req, res) => {
    const data = req.query['name'];
    if (data === undefined) {
        return res.send("Hello, Guest")
    }
    res.send(`Hello, ${data}`)

}
app.get("/greet", greetHandler)
app.listen(port, () => {
    console.log("server started at port: ", port);
})