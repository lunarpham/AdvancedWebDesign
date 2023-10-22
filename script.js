const addTodoButton = document.getElementById('addTodoButton');
const todoList = document.getElementById('todoList');
const addTodoModal = document.getElementById('addTodoModal');
const editTodoModal = document.getElementById('editTodoModal');
const todoInput = document.getElementById('todoInput');
const editTodoInput = document.getElementById('editTodoInput');
const addTodo = document.getElementById('addTodo');
const saveTodo = document.getElementById('saveTodo');
const showAllButton = document.getElementById('showAll');
const showOngoingButton = document.getElementById('showOngoing');
const showCompletedButton = document.getElementById('showCompleted');

const API_BASE_URL = 'https://b5241578-0511-44d5-84f1-2b6038167b57.mock.pstmn.io';

// Load tasks from the API when the page loads
document.addEventListener('DOMContentLoaded', () => {
    fetch(`${API_BASE_URL}/tasks`)
        .then(response => response.json())
        .then(tasks => {
            tasks.forEach(taskData => {
                addTaskToList(taskData);
            });
        });
});

// Add Todo button click event
addTodoButton.addEventListener('click', () => {
    addTodoModal.style.display = 'block';
});

// Add Todo
addTodo.addEventListener('click', () => {
    const todoText = todoInput.value.trim();
    if (todoText !== '') {
        createTask({ text: todoText, completed: false })
            .then(taskData => {
                addTaskToList(taskData);
                todoInput.value = '';
                addTodoModal.style.display = 'none'; // Close modal when clicked
            })
            .catch(error => console.error('Error adding task:', error));
    }
});

// Close modal buttons
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        addTodoModal.style.display = 'none';
        editTodoModal.style.display = 'none';
    });
});

window.addEventListener('click', (event) => {
    if (event.target === addTodoModal || event.target === editTodoModal) {
        addTodoModal.style.display = 'none';
        editTodoModal.style.display = 'none';
    };
});

// Function to add a task to the list
function addTaskToList(taskData) {
    const li = document.createElement('li');
    li.innerHTML = `
        <div class="left-content flex">
            <div class="status-label"></div>
            <span class="todo-content text-center">${taskData.text}</span>
        </div>
        
        <div class="button-combo">
            <button class="edit bg-gray text-white square-button font-bold"><img src="icons/edit.svg" alt="edit" class="svg-icon"></button>
            <button class="check bg-done text-white square-button font-bold"><img src="icons/check.svg" alt="check" class="svg-icon"></button>
            <button class="delete bg-danger text-white square-button font-bold"><img src="icons/delete.svg" alt="delete" class="svg-icon"></button>
        </div>
    `;
    if (taskData.completed) {
        li.classList.add('completed');
    }
    todoList.appendChild(li);
    addEventListeners(li, taskData);
}

// Function to create a task
function createTask(taskData) {
    return fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
    }).then(response => response.json());
}

// Edit button click event
function editTask(taskData, updatedText) {
    return fetch(`${API_BASE_URL}/tasks/${taskData.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...taskData, text: updatedText }),
    }).then(response => response.json());
}

// Delete button click event
function deleteTask(taskData) {
    return fetch(`${API_BASE_URL}/tasks/${taskData.id}`, {
        method: 'DELETE',
    });
}

// Add event listeners to edit, check, and delete buttons
function addEventListeners(li, taskData) {
    const editButton = li.querySelector('.edit');
    const checkButton = li.querySelector('.check');
    const deleteButton = li.querySelector('.delete');

    editButton.addEventListener('click', () => {
        editTodoInput.value = taskData.text;
        editTodoModal.style.display = 'block';

        saveTodo.addEventListener('click', () => {
            const updatedText = editTodoInput.value.trim();
            if (updatedText !== '') {
                editTask(taskData, updatedText)
                    .then(updatedTask => {
                        taskData.text = updatedTask.text;
                        li.querySelector('span').textContent = updatedTask.text;
                        editTodoInput.value = ''; // Clear the input field
                        editTodoModal.style.display = 'none';
                    })
                    .catch(error => console.error('Error updating task:', error));
            }
        });
    });

    checkButton.addEventListener('click', () => {
        if (!taskData.completed) {
            taskData.completed = true;
            li.classList.add('completed');
        } else {
            taskData.completed = false;
            li.classList.remove('completed');
        }

        fetch(`${API_BASE_URL}/tasks/${taskData.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData),
        }).catch(error => console.error('Error updating task:', error));
    });

    deleteButton.addEventListener('click', () => {
        deleteTask(taskData)
            .then(() => {
                li.remove();
            })
            .catch(error => console.error('Error deleting task:', error));
    });
}

// Filter todos
function filterTasks(filter) {
    const tasks = document.querySelectorAll('li');
    tasks.forEach(task => {
        if (filter === 'showAll') {
            task.style.display = 'flex';
        } else if (filter === 'showOngoing' && !task.classList.contains('completed')) {
            task.style.display = 'flex';
        } else if (filter === 'showCompleted' && task.classList.contains('completed')) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });
}



// Event listeners for filter buttons
showAllButton.addEventListener('click', () => {
    filterTasks('showAll');
});

showOngoingButton.addEventListener('click', () => {
    filterTasks('showOngoing');
});

showCompletedButton.addEventListener('click', () => {
    filterTasks('showCompleted');
});
