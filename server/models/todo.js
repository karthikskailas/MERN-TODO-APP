const { Schema, model } = require("mongoose");

const todoSchema = new Schema({
	task: {
		type: String,
		require: true,
	},
});

module.exports = model("tasks", todoSchema);
