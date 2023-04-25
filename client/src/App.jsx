import "./assets/css/style.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
	const [itemText, setItemText] = useState("");
	const [listItems, setListItems] = useState([]);
	const [isUpdating, setIsUpdating] = useState("");
	const [updateItemText, setUpdateItemText] = useState("");

	//add new todo item to database
	const addItem = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post("http://localhost:8000/task", {
				task: itemText,
			});
			setListItems((prev) => [...prev, res.data]);
			setItemText("");
		} catch (error) {
			console.log(error);
		}
	};

	//to fetch all the task from the database
	useEffect(() => {
		const getItemsList = async () => {
			try {
				const res = await axios.get("http://localhost:8000/alltask");
				setListItems(res.data);
			} catch (error) {
				console.log(error);
			}
		};
		getItemsList();
	}, []);

	// Delete item when click on delete
	const deleteItem = async (id) => {
		try {
			const res = await axios.delete(`http://localhost:8000/task/${id}`);
			const newListItems = listItems.filter((item) => item._id !== id);
			setListItems(newListItems);
		} catch (err) {
			console.log(err);
		}
	};

	//Update item
	const updateItem = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.put(
				`http://localhost:8000/task/${isUpdating}`,
				{ task: updateItemText }
			);
			console.log(res.data);
			const updatedItemIndex = listItems.findIndex(
				(item) => item._id === isUpdating
			);
			const updatedItem = (listItems[updatedItemIndex].task =
				updateItemText);
			setUpdateItemText("");
			setIsUpdating("");
		} catch (err) {
			console.log(err);
		}
	};
	//before updating item we need to show input field where we will create our updated item
	const renderUpdateForm = () => (
		<form
			className="update-form"
			onSubmit={(e) => {
				updateItem(e);
			}}>
			<input 
				className="update-new-input"
				type="text"
				placeholder="New Item"
				onChange={(e) => {
					setUpdateItemText(e.target.value);
				}}
				value={updateItemText}
			 />
			<button className="update-new-btn" type="submit">
				Update
			</button>
		</form>
	);

	return (
		<>
			<div className="App">
				<h1>Todo List</h1>
				<form className="form" onSubmit={(e) => addItem(e)}>
					<input
						type="text"
						placeholder="Add Todo Item"
						onChange={(e) => {
							setItemText(e.target.value);
						}}
						value={itemText}
						required
					 />
					<button type="submit">Add</button>
				</form>
			</div>

			<div className="todo-listItems">
				<div className="scroller">
					{listItems.map((item) => (
						<div className="todo-item">
							{isUpdating === item._id ? (
								renderUpdateForm()
							) : (
								<>
									<p className="item-content">{item.task}</p>
									<button
										className="update-item"
										onClick={() => {
											setIsUpdating(item._id);
										}}>
					
									<i class="fa-solid fa-pen"></i>
									</button>
									<button
										className="delete-item"
										onClick={() => {
											deleteItem(item._id);
										}}>
										<i class="fa-solid fa-trash"></i>
									</button>
								</>
							)}
						</div>
					))}
				</div>
			</div>
		</>
	);
}

export default App;
