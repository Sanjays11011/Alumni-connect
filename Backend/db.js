const mongoose = require('mongoose');

const connectDB = async () => {
    const connectParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };
    try {
        await mongoose.connect(process.env.MONGODB_URI, connectParams);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log(error);
        console.log("MongoDB connection failed");
    }
};

module.exports = connectDB;
