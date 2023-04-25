const router = require("express").Router();
const { model } = require("mongoose");

//importing todo model
const todoTaskModel = require("../models/todo");
const todo = require("../models/todo");

// route to save todo task to database
router.post("/task", async (req, res) => {
	try {
		const newTask = new todoTaskModel({
			task: req.body.task,
		});
		const save = await newTask.save();
		res.status(200).json("item successfully added");
	} catch (err) {
		res.json(err);
	}
});

// to get all the tasks from the database

router.get("/alltask", async (req, res) => {
	try {
		const allTodoTask = await todoTaskModel.find({});
		res.status(200).json(allTodoTask);
	} catch (err) {
		res.json(err);
	}
});

//to update a task
router.put("/task/:id", async (req, res) => {
	try {
		const updateItem = await todoTaskModel.findByIdAndUpdate(
			req.params.id,
			{ $set: req.body }
		);
		res.status(200).json("Updated one");
	} catch (error) {
		res.json(error);
	}
});

//to delete a task
router.delete("/task/:id", async (req, res) => {
	try {
		const deleteItem = await todo.findByIdAndDelete(req.params.id);
		res.status(200).json("deleted successfully");
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
