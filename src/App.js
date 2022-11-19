import "./App.css";
import { useState } from "react";

const ToDoItem = ({ item, setIsEdit, onDelete }) => {
	return (
		<div>
			<p>{item}</p>
			<button onClick={() => setIsEdit(true)}>edit</button>
			<button onClick={onDelete}>delete</button>
		</div>
	);
};

const EditBlock = ({ item, onSave }) => {
	const [inputValue, setInputValue] = useState(item);
	return (
		<div>
			<input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
			<button onClick={() => onSave(inputValue)}>save</button>
		</div>
	);
};

function App() {
	const [toDoList, setToDoList] = useState([]);
	const [inputValue, setInputValue] = useState("");
	const [isEdit, setIsEdit] = useState(false);

	// create, read, update, delete
	// POST, GET, PUT, DELETE

	const onSubmit = (e) => {
		e.preventDefault();
		setToDoList([inputValue, ...toDoList]);
		setInputValue("");
	};

	const onEditSave = (newItem, index) => {
		const newList = [...toDoList];
		newList[index] = newItem;
		setToDoList(newList);
		setIsEdit(false);
	};

	const onDelete = (index) => {
		const newList = [...toDoList];
		newList.splice(index, 1);
		setToDoList(newList);
	};
	return (
		<div className="App">
			<header className="App-header">
				<p>My To List </p>
			</header>
			<body>
				<form onSubmit={onSubmit}>
					<input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
					<button type="submit">add</button>
				</form>

				{toDoList.map((item, index) => (
					<div key={index}>{isEdit ? <EditBlock item={item} onSave={(newItem) => onEditSave(newItem, index)} /> : <ToDoItem item={item} setIsEdit={setIsEdit} onDelete={onDelete} />}</div>
				))}
			</body>
		</div>
	);
}

export default App;
