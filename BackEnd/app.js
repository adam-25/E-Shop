/*
	Date: May 8, 2022
		* Use Product Routes and MiddleWares.
	
	Date: May 10, 2022
		* Use user Routes.
	
	Date: May 12, 2022
		* Use order Routes.

	Date: May 19, 2022
		* FileUpload require to setUp cloudinary.

	Date: May 29, 2022
		* Add Payment Routes.

	Date: June 1, 2022
		* Add Limit to overcome payload too large limit.
*/

// Importing necessary files.
const errorMiddleWare = require("./MiddleWare/errors");
const express = require('express');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const app = express();

// Configuration of env file.
if (process.env.NODE_ENV !== 'PRODUCTION') {
	require('dotenv').config({ path: "backEnd/Config/config.env" });
}
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));
app.use(fileUpload());

// Importing all Routes
const productRoute = require('./Routes/productRoute');
const userRoute = require('./Routes/userRoutes');
const orderRoute = require('./Routes/orderRoute');
const paymentRoute = require('./Routes/paymentRoute');
const path = require('path');

// Using Routes.
app.use("/api/v1/", productRoute);
app.use("/api/v1/", userRoute);
app.use("/api/v1/", orderRoute);
app.use("/api/v1/", paymentRoute);

app.use(express.static(path.join(__dirname + "/../frontend/build")));
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname + "/../frontend/build/index.html"));
});

// Using MiddleWare
app.use(errorMiddleWare);

// Exporting express().
module.exports = app;