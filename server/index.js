const express = require("express");
const dotenv = require("dotenv").config;
require("./db/connection");
const cors = require('cors')

const app = express();
// to get data in json format
app.use(express.json());

//port
const PORT = process.env.PORT || 8000;

//cors
app.use(cors())
//importing routes
const todoTaskRoute = require("./routes/todoTask");

//routes
app.use("/", todoTaskRoute);

app.listen(PORT, () => {
	console.log("Server listening...");
});
