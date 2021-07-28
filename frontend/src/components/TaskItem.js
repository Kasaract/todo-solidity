import { useState } from "react";
import { ListGroup } from "react-bootstrap";

export default function TaskItem({ status, desc }) {
	const [completed, setCompleted] = useState(status);

	const handleCheck = () => {
		setCompleted(!completed);
	};

	return (
		<ListGroup.Item className="d-flex">
			<input
				className="form-check-input me-3"
				type="checkbox"
				onChange={handleCheck}
				checked={completed}
			/>
			{completed ? (
				<p>
					<del>{desc}</del>
				</p>
			) : (
				<p>{desc}</p>
			)}
		</ListGroup.Item>
	);
}
