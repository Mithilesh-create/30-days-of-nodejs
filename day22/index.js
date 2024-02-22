const express = require("express");
const app = express();
const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});

const Product = mongoose.model('Product', productSchema);
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

//create
const createProduct = async (name, price, quantity) => {
    const newProduct = new Product({ name, price, quantity });
    try {
      const savedProduct = await newProduct.save();
      return savedProduct;
    } catch (error) {
      throw error;
    }
  };
//fetch
const getAllProducts = async () => {
    try {
      const products = await Product.find();
      return products;
    } catch (error) {
      throw error;
    }
  };
//update
const updateProduct = async (productId, updatedData) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        updatedData,
        { new: true }
      );
      return updatedProduct;
    } catch (error) {
      throw error;
    }
  };
//delete
const deleteProduct = async (productId) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(productId);
      return deletedProduct;
    } catch (error) {
      throw error;
    }
  };
  

app.get("/", (req, res) => {
    res.send("Hello world!")
})
app.listen(port, () => {
    console.log("server started at port: ", port);
})