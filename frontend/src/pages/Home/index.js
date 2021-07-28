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

	useEffect(() => {
		getAllTasks();
	}, []);

	const handleAddTask = (taskDesc) => {
		ToDoListContract.methods.addTask(taskDesc).send({ from: address });
		getAllTasks();
	};

	const getAllTasks = () => {
		ToDoListContract.methods
			.getAllTasks()
			.call()
			.then((res) => setItems(res));
	};

	return (
		<Container>
			<h1>To-do List</h1>
			<Row>
				<InputGroup>
					<FormControl
						placeholder="Add new task here"
						value={newTask}
						onChange={(e) => setNewTask(e.target.value)}
					/>
					<Button
						onClick={() => {
							handleAddTask(newTask);
							setNewTask("");
						}}
					>
						+
					</Button>
				</InputGroup>
			</Row>
			<Row className="my-5">
				<ListGroup>
					{items.map(({ id, desc, status }) => (
						<TaskItem status={status} desc={desc} key={id} />
					))}
				</ListGroup>
			</Row>
		</Container>
	);
}
