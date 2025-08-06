const mongoose = require('mongoose');

const connectDb = async () => {
    try {
       const conn = await mongoose.connect('mongodb://localhost:27017/userAuth', {
            // useNewUrlParser: true,  
            // useUnifiedTopology: true,
        });
        console.log(`MongoDB connected successfully: ${conn.connection.host}`);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDb;