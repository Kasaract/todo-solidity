import { useContext, useEffect, useState } from "react";
import {
	Container,
	Row,
	ListGroup,
	InputGroup,
	FormControl,
	Button,
} from "react-bootstrap";

import { Web3Context } from "../../context/Web3Context";
import TaskItem from "../../components/TaskItem";

import TODO_LIST_ABI from "../../blockchain/TODO_LIST_ABI.json";
import { TODO_LIST_CONTRACT_ADDRESS } from "../../blockchain/constants";

export default function Home() {
	const web3 = useContext(Web3Context);
	const address = web3.defaultAccount;

	const ToDoListContract = new web3.eth.Contract(
		TODO_LIST_ABI,
		TODO_LIST_CONTRACT_ADDRESS
	);

	const [items, setItems] = useState([]);
	const [newTask, setNewTask] = useState("");
	const [showCompleted, setShowCompleted] = useState(false);

	useEffect(() => {
		getAllTasks();
	}, []);

	const handleAddTask = async (taskDesc) => {
		setItems([...items, { id: items.length + 1, desc: taskDesc }]);
		await ToDoListContract.methods.addTask(taskDesc).send({ from: address });
		getAllTasks();
	};

	const getAllTasks = () => {
		ToDoListContract.methods
			.getAllTasks()
			.call()
			.then((res) => setItems(res));
	};

	const completeTask = async (taskId) => {
		setItems(items.filter((item) => item.id !== taskId));
		await ToDoListContract.methods.completeTask(taskId).send({ from: address });
		getAllTasks();
	};

	return (
		<Container className="p-0">
			<Row>
				<h1 className="p-0">To-do List</h1>
			</Row>
			<Row className="my-3">
				<Button
					variant="primary"
					size="sm"
					style={{ maxWidth: "10em" }}
					onClick={() => setShowCompleted(!showCompleted)}
				>
					Show Completed
				</Button>
			</Row>
			<Row>
				<InputGroup className="p-0">
					<FormControl
						placeholder="Add new task here"
						value={newTask}
						onChange={(e) => setNewTask(e.target.value)}
					/>
					<Button
						onClick={() => {
							if (newTask.length > 0) {
								handleAddTask(newTask);
								setNewTask("");
							}
						}}
					>
						+
					</Button>
				</InputGroup>
			</Row>
			<Row className="my-5">
				<ListGroup>
					{items
						.filter((item) => (showCompleted ? true : item.status !== "1"))
						.map(({ id, desc, status }) => (
							<TaskItem
								id={id}
								status={status}
								desc={desc}
								completeTask={completeTask}
								key={id}
							/>
						))}
				</ListGroup>
			</Row>
		</Container>
	);
}
