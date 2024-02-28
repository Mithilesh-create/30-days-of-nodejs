const express = require("express");
const app = express();
const mongoose = require("mongoose")

const jwt = require('jsonwebtoken');

const authenticateAndAuthorize = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send('Unauthorized');
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (roles.length && !roles.includes(decoded.role)) {
      return res.status(403).send('Forbidden (unauthorized role)');
    }
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Error:', error);
    return res.status(401).send('Unauthorized');
  }
};


app.get('/admin', authenticateAndAuthorize(['admin']), (req, res) => {
  res.send('Welcome admin!');
});

app.get('/profile', authenticateAndAuthorize(), (req, res) => {
  res.send(`Hello, ${req.user.name}!`);
});




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




app.get("/", (req, res) => {
  res.send("Hello world!")
})
app.listen(port, () => {
  console.log("server started at port: ", port);
})