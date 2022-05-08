const mongoose = require('mongoose');

const connectMongo = () => {
	mongoose.connect(process.env.MONGO_CONNECT_URL)
	.then(() => console.log('Connected to MongoDB Database Successfully'))
	.catch((err) => console.log("There is an error connecting to MongoDB Database: " + err.message));
};

module.exports = connectMongo;