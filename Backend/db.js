const mongoose = require("mongoose")
const dotenv = require('dotenv')

dotenv.config();

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(`mongodb://localhost:27017/RedeemSphereDB`);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
}

module.exports = connectDB;