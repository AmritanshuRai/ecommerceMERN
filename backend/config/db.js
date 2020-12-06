const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(`MongoDB connected : ${conn.connection.host}`);
  } catch (err) {
    console.error('err: ', err.message);
  }
};

module.exports = connectDB;
