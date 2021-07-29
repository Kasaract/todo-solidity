// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract TodoList {
    enum Status {
        INCOMPLETE,
        COMPLETED,
        DELETED
    }

    struct Task {
        uint256 id;
        string desc;
        Status status;
    }

    Task[] private tasks;
    uint256 private allTasksCount;
    uint256 private completedTasksCount;

    function helloWorld() external pure returns (string memory) {
        return "Hello World from smart contract!";
    }

    function getAllTasks() external view returns (Task[] memory) {
        Task[] memory allTasks = new Task[](allTasksCount);
        uint256 index = 0;
        for (uint256 i = 0; i < tasks.length; i++) {
            if (
                tasks[i].status == Status.INCOMPLETE ||
                tasks[i].status == Status.COMPLETED
            ) {
                allTasks[index] = tasks[i];
            }
            index++;
        }
        return allTasks;
    }

    function getCompletedTasks() external view returns (Task[] memory) {
        Task[] memory allCompletedTasks = new Task[](completedTasksCount);
        uint256 index = 0;
        for (uint256 i = 0; i < tasks.length; i++) {
            if (tasks[i].status == Status.COMPLETED) {
                allCompletedTasks[index] = tasks[i];
            }
            index++;
        }
        return allCompletedTasks;
    }

    function addTask(string calldata _taskDescription) external {
        Task memory newTask = Task(
            allTasksCount,
            _taskDescription,
            Status.INCOMPLETE
        );
        tasks.push(newTask);
        allTasksCount++;
    }

    function completeTask(uint256 _taskId) external {
        Task storage t = tasks[_taskId];
        t.status = Status.COMPLETED;
        completedTasksCount++;
    }

    function deleteTask(uint256 _taskId) external {
        Task storage t = tasks[_taskId];
        if (t.status == Status.COMPLETED) {
            allTasksCount--;
            completedTasksCount--;
        } else if (t.status == Status.INCOMPLETE) {
            allTasksCount--;
        }
        t.status = Status.DELETED;
    }
}
