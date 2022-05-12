/*
	Date: May 8, 2022
		* Use Product Routes and MiddleWares.
	
	Date: May 10, 2022
		* Use user Routes.
	
	Date: May 12, 2022
		* Use order Routes.
*/ 

// Importing necessary files.
const errorMiddleWare = require("./MiddleWare/errors");
const express = require('express');
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());

// Importing all Routes
const productRoute = require('./Routes/productRoute');
const userRoute = require('./Routes/userRoutes');
const orderRoute = require('./Routes/orderRoute');

// Using Routes.
app.use("/api/v1/", productRoute);
app.use("/api/v1/", userRoute);
app.use("/api/v1/", orderRoute);

// Using MiddleWare
app.use(errorMiddleWare);

// Exporting express().
module.exports = app;