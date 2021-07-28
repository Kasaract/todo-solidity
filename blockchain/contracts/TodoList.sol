// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract TodoList {
    struct Task {
        uint256 id;
        string desc;
        bool status;
    }

    uint256 taskCount = 0;

    mapping(uint256 => Task) tasks;
    Task[] private completedTasks;

    function helloWorld() external pure returns (string memory) {
        return "Hello World from smart contract!";
    }

    function getAllTasks() external view returns (Task[] memory) {
        Task[] memory allTasks = new Task[](taskCount);
        for (uint256 i = 0; i < taskCount; i++) {
            allTasks[i] = tasks[i];
        }
        return allTasks;
    }

    function getCompletedTasks() external view returns (Task[] memory) {
        return completedTasks;
    }

    function addTask(string calldata _taskDescription) external {
        Task memory newTask = Task(taskCount, _taskDescription, false);
        tasks[taskCount] = newTask;
        taskCount++;
    }

    function completeTask(uint256 _taskId) external {
        Task storage t = tasks[_taskId];
        t.status = true;
        completedTasks.push(t);
    }

    // function deleteTask(uint256 _taskId) external {}

    // function updateTask(uint256 _taskId) external {}
}
