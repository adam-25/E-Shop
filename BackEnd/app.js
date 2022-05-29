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
*/ 

// Importing necessary files.
const errorMiddleWare = require("./MiddleWare/errors");
const express = require('express');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require('dotenv');
const app = express();

// Configuration of env file.
dotenv.config({ path: "BackEnd/Config/config.env" });

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());

// Importing all Routes
const productRoute = require('./Routes/productRoute');
const userRoute = require('./Routes/userRoutes');
const orderRoute = require('./Routes/orderRoute');
const paymentRoute = require('./Routes/paymentRoute');

// Using Routes.
app.use("/api/v1/", productRoute);
app.use("/api/v1/", userRoute);
app.use("/api/v1/", orderRoute);
app.use("/api/v1/", paymentRoute);

// Using MiddleWare
app.use(errorMiddleWare);

// Exporting express().
module.exports = app;