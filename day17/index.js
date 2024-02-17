

const express = require("express");
const app = express();
const mongoose = require("mongoose")
const UserSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
})
const User = mongoose.model("User", UserSchema,)
function connectToMongoDB(params) {
    mongoose.connect("mongodb://127.0.0.1/datalakeDB");
    const db = mongoose.connection
    db.on("error", (error) => {
        console.log(`Error connecting to DB ${error}`);
    }).once("open", () => {
        console.log(`Connected to DB`);
    })
}
function addUserToDatabase(user) {
    const newUser = new User(user);
    newUser.save().then(() => {
        console.log("User saved successfully;");
    }).catch((err) => {
        console.log(err.message);
    })
}
connectToMongoDB();

app.get("/", (req, res) => {
    res.send("Hello world!")
})
app.listen(port, () => {
    console.log("server started at port: ", port);
})
addUserToDatabase({ username: 'john_doe', email: 'john@example.com' })