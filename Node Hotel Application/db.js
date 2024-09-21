const mongoose = require('mongoose')
require('dotenv').config();

// (1) Define the MongoDB connection URL
// const mongoURL = 'mongodb://localhost:27017/mydatabase'
// Replace 'mydatabase' with your database name


// This URL is connect to the database locally
const mongoURL = process.env.MONGODB_URL_LOCAL

// Connect the database globally
// const mongoURL = process.env.MONGODB_URL

// (2) Set up MongoDB connection
// mongoose.connect(mongoURL, () => {
//     useNewUrlParser: true
//     useUnifiedTopology: true
// })          => The callback here is give the error in windows, so whenever we set up the mongodb coonection then don't need to give the callback
mongoose.connect(mongoURL);


// (3) Get the default connection
// Mongoose maintains a default connection object representiing the MongoDB connection
const db = mongoose.connection


// (4) Define event listeners for database connection
db.on('connected', () => {
    console.log('Connected to MongoDB server successfully');
});
db.on('disconnected', () => {
    console.log('MongoDB Disonnected');
});
db.on('error', (err) => {
    console.log('MongoDB connection error:', err);
});


// (5) Export the database connection
module.exports = db;