import React from "react";
import { Container, Row, ListGroup } from "react-bootstrap";

import TaskItem from "../../components/TaskItem";

export default function Home() {
	return (
		<Container>
			<Row className="my-5">
				<h1>To-do List</h1>
				<ListGroup>
					{[1, 2, 3].map((v) => (
						<TaskItem status={false} desc={v} key={v} />
					))}
				</ListGroup>
			</Row>
		</Container>
	);
}
