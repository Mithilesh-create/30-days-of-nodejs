const express=require("express");
const app=express();
const mongoose=require("mongoose")

function connectToMongoDB(params) {
    mongoose.connect("mongodb://127.0.0.1/datalakeDB");
    const db=mongoose.connection
    db.on("error",(error)=>{
        console.log(`Error connecting to DB ${error}`);
    }).once("open",()=>{
        console.log(`Connected to DB`);
    })
}
connectToMongoDB();

app.get("/", (req, res) => {
    res.send("Hello world!")
})
app.listen(port, () => {
    console.log("server started at port: ", port);
})