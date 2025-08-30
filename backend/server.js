const dotenv = require('dotenv');
dotenv.config({ path: "config.env" });

const app = require('./app');
const mongoose = require("mongoose");
const cors = require('cors');

// Handle uncaught exceptions (like syntax errors)
process.on("uncaughtException", (err) => {
    console.log(`Uncaught Exception: ${err.message}`);
    console.log("Server shutting down due to uncaught exception");
    process.exit(1);
});

// Enable CORS
app.use(cors({
    origin: process.env.CLIENT_URL || '*' // allow frontend URL or all for testing
}));

// Connect to MongoDB
async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database connected successfully");
    } catch (err) {
        console.log(`MongoDB connection error: ${err.message}`);
        process.exit(1);
    }
}
main();

// Start server on dynamic Render port
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Handle unhandled promise rejections (like DB connection errors)
process.on("unhandledRejection", (err) => {
    console.log(`Unhandled Rejection: ${err.message}`);
    console.log("Server shutting down due to unhandled promise rejection");
    server.close(() => {
        process.exit(1);
    });
});
