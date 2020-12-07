const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const Product = require('../models/ProductModel');

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({});

    return res.json(products);
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    console.log('req.params.id: ', req.params.id);

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }
    res.status(404);
    throw new Error('Product not found');
  })
);

module.exports = router;
