const express = require('express')
const app = express();
const port = 8000;
const positiveIntegerHandler = (req, res) => {
    res.status(200).send("Number is valid");
}
const errorHandlerMiddleware = (req, res, next) => {
    let num = req?.query?.num;
    num = parseInt(num);
    if (Number.isInteger(num) && num > 0) {
        next();
    } else {
        res.status(400).send("Number is Invalid");
    }
}
app.use(errorHandlerMiddleware)
app.get("/positive", positiveIntegerHandler)
app.listen(port, () => {
    console.log("server started at port: ", port);
})