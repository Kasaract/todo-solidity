import { useState } from "react";
import { ListGroup } from "react-bootstrap";

const statusCode = {
	0: false, // INCOMPLETE
	1: true, // COMPLETED
};

export default function TaskItem({ id, status, desc, completeTask }) {
	const [completed, setCompleted] = useState(statusCode[status]);

	const handleCheck = () => {
		if (completed === false) {
			completeTask(id);
		}
		// else, update to be incomplete;
		setCompleted(!completed);
	};

	return (
		<ListGroup.Item className="d-flex border-0">
			<input
				className="form-check-input me-3"
				type="checkbox"
				onChange={handleCheck}
				checked={completed}
				name={id}
				value={id}
			/>
			{completed ? (
				<label htmlFor={id}>
					<del>{desc}</del>
				</label>
			) : (
				<label htmlFor={id}>{desc}</label>
			)}
		</ListGroup.Item>
	);
}
