/*
	Date: May 8, 2022
		* .
*/ 

// Importing necessary files.
const express = require('express');
const app = express();

app.use(express.json());

// Importing all Routes
const productRoute = require('./Routes/productRoute');

// Using Routes.
app.use("/api/v1/", productRoute);

// Exporting express().
module.exports = app;