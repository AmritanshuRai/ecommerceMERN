const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const Product = require('../models/ProductModel');
const {
  getProducts,
  getProductById,
} = require('../controllers/productController');

router.route('/').get(getProducts);

router.route('/:id').get(getProductById);

module.exports = router;
