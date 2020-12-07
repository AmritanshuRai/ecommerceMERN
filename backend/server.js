const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes.js');

dotenv.config();

connectDB();
const app = express();

app.get('/', (req, res) => {
  res.send('It live bitches');
});

app.use('/api/products', productRoutes);

const PORT = process.env.PORT;
app.listen(
  PORT,
  console.log(`mode = ${process.env.NODE_ENV} and port = ${process.env.PORT}`)
);
