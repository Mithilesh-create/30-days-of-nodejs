const express = require("express");
const app = express();
const mongoose = require("mongoose")
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Category = mongoose.model('Category', categorySchema);

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
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Category,
      required: true,
    },
});
const Product = mongoose.model('ProductWithCategory', productSchema);
const createProductIndex = async () => {
  try {
    await Product.collection.createIndex(
      { name: 1 },
      { unique: true } 
    );
    console.log('Product name index created successfully');
  } catch (error) {
    console.error('Error creating product name index:', error);
  }
};

const createProductRoute=async (req, res) =>{
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully!', product: newProduct });
  } catch (err) {
    res.status(500).json({ message: 'Error creating product!', error: err.message });
  }
}
const getAllProductsRoute=async (req, res)=> {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products!', error: err.message });
  }
}
const updateProductRoute=async (req, res) =>{
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found!' });
    }
    res.status(200).json({ message: 'Product updated successfully!', product: updatedProduct });
  } catch (err) {
    res.status(500).json({ message: 'Error updating product!', error: err.message });
  }
}
const deleteProductRoute=async (req, res)=> {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found!' });
    }
    res.status(200).json({ message: 'Product deleted successfully!', product: deletedProduct });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product!', error: err.message });
  }
}

app.post('/products', createProductRoute);
app.get('/products', getAllProductsRoute);
app.put('/products/:id', updateProductRoute);
app.delete('/products/:id',deleteProductRoute);





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