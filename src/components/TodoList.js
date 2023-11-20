import { getTask, addTask } from "../apis/CallAPI";
import React, { useState, useEffect } from 'react';
import { AddTodoForm } from "./AddTodoForm";

export default function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [nextTaskId, setNextTaskId] = useState(1);

    useEffect(() => {
        async function grabTask() {
            let result = await getTask();
            setTasks(result);
        }
        grabTask();
    }, []);

    const handleTaskAdded = async (taskText) => {
        try {
            const newTask = {
                id: nextTaskId,
                text: taskText,
            };

            setTasks([...tasks, newTask]);
            setNextTaskId(nextTaskId + 1);

            await addTask(taskText);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const handleDeleteTask = (taskId) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
    };

    return (
        <div>
            <AddTodoForm onTaskAdded={handleTaskAdded} />

            <ul id="todo-list">
                {tasks.map((task) => (
                    <li key={task.id}>
                        <div className="left-content flex">
                            <span className="todo-content text-center">{task.text}</span>
                        </div>
                        <div className="button-combo">
                            <button
                                className="edit bg-gray text-white square-button font-bold"
                            >
                                Edit
                            </button>
                            <button
                                className={`text-white bg-ongoing square-button font-bold`}
                            >
                                Check
                            </button>
                            <button
                                className="delete bg-danger text-white square-button font-bold"
                                onClick={() => handleDeleteTask(task.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
