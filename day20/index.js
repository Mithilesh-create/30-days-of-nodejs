

const express = require("express");
const app = express();
const mongoose = require("mongoose")
const UserSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
        required: [true, "Email required"]
    }
})
const User = mongoose.model("User", UserSchema,)
function connectToMongoDB() {
    mongoose.connect("mongodb://127.0.0.1/datalakeDB");
    const db = mongoose.connection()
    db.on("error", (error) => {
        console.log(`Error connecting to DB ${error}`);
    }).once("open", () => {
        console.log(`Connected to DB`);
    })
}

connectToMongoDB();
app.get("/average-age", async (req, res) => {
    try {
        const results = await User.aggregate([{
            "$group": {
                "_id": null,
                "averageAge": { "$avg": "$age" }
            }
        }]);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: "Internal Server error" })

    }
})
app.get("/", (req, res) => {
    res.send("Hello world!")
})
app.listen(port, () => {
    console.log("server started at port: ", port);
})