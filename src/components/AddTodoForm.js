import React, { useState } from 'react';
import { addTask } from "../apis/CallAPI"; // Import the API function to add tasks

export function AddTodoForm({ onTaskAdded }) {
    const [taskText, setTaskText] = useState('');

    const handleTaskTextChange = (e) => {
        setTaskText(e.target.value);
    };

    const handleAddTask = async () => {
        if (taskText.trim() === '') {
            return; // Don't add an empty task
        }

        try {
            const newTask = await addTask(taskText); // Call the API to add a new task
            onTaskAdded(newTask); // Update the parent component with the new task
            setTaskText(''); // Clear the input field
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    return (
        <div className="add-todo-form">
            <input
                type="text"
                placeholder="Add a new task..."
                value={taskText}
                onChange={handleTaskTextChange}
            />
            <button onClick={handleAddTask}>Add</button>
        </div>
    );
}
