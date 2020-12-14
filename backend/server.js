const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js');
const productRoutes = require('./routes/productRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const orderRoutes = require('./routes/orderRoutes.js');

dotenv.config();

connectDB();
const app = express();
app.use(express.json());
app.get('/', (req, res) => {
  res.send('It live bitches');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.get('/api/config/paypal', (req, res) =>
  res.json(process.env.PAYPAL_CLIENT_ID)
);

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT;
app.listen(
  PORT,
  console.log(`mode = ${process.env.NODE_ENV} and port = ${process.env.PORT}`)
);
