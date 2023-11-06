import {getTask} from '../apis/CallAPI';
import React, { useState, useEffect } from 'react';

export default function TodoList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
      async function grabTasks() {
        let result = await getTask();
        setTasks(result);
        return result
      }
      grabTasks()
    }, []);

    return (
        <ul id="todoList">
            {tasks.map((task) => (
                <li>
                    <div className="left-content flex">
                    <div className="status-label"></div>
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
                    >
                        Delete
                    </button>
                    </div>
                </li>
            ))}
        </ul>
    )
  
}