const asyncHandler = require('express-async-handler');
const Product = require('../models/ProductModel');

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  // res.status(404);
  // throw new Error('Lauda lag gaya');
  return res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  return res.status(200).json(product);
});

exports.getProducts = getProducts;
exports.getProductById = getProductById;
