const mongoose = require("mongoose");
const dotenv =require('dotenv').config()

mongoose
	.connect(
		`mongodb+srv://ncryptninja:${process.env.DB_pass}@cluster0.jd6vsbx.mongodb.net/TodoApp`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.then(() => console.log("connected "))
	.catch((err) => console.log(err));
