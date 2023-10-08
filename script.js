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

// Load tasks from local storage when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(taskData => {
        addTaskToList(taskData.text, taskData.completed);
    });
});

// Add Todo button click event
addTodoButton.addEventListener('click', () => {
    addTodoModal.style.display = 'block';
});

// Close modal buttons
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        addTodoModal.style.display = 'none';
        editTodoModal.style.display = 'none';
    });
});

// Add Todo
addTodo.addEventListener('click', () => {
    const todoText = todoInput.value.trim();
    if (todoText !== '') {
        addTaskToList(todoText, false); // New tasks are marked as not completed
        todoInput.value = '';
        addTodoModal.style.display = 'none';
    }
});

// Edit Todo
function editTodo() {
    const todoText = editTodoInput.value.trim();
    if (todoText !== '') {
        const listItem = this.parentNode;
        listItem.querySelector('span').textContent = todoText;
        listItem.classList.remove('editing');
        editTodoModal.style.display = 'none';
        saveTasksToLocalStorage();
    }
}

// Delete Todo
function deleteTodo() {
    this.parentNode.remove();
    saveTasksToLocalStorage();
}

let currentEditingTask = null; // Keep track of the task being edited

// Add event listeners to edit, check, and delete buttons
function addEventListeners(li) {
    const editButton = li.querySelector('.edit');
    const checkButton = li.querySelector('.check');
    const deleteButton = li.querySelector('.delete');

    editButton.addEventListener('click', () => {
        currentEditingTask = li; // Set the current editing task
        editTodoInput.value = li.querySelector('.left-content span').textContent;
        editTodoModal.style.display = 'block';
    });

    checkButton.addEventListener('click', function () {
        const listItem = this.closest('li');
        listItem.classList.toggle('completed');
        saveTasksToLocalStorage();
    });

    deleteButton.addEventListener('click', () => {
        li.remove();
        saveTasksToLocalStorage();
    });
}

// Save button click event in the edit popup modal
const saveButton = editTodoModal.querySelector('#saveTodo');
saveButton.addEventListener('click', () => {
    if (currentEditingTask) {
        const updatedText = editTodoInput.value.trim();
        if (updatedText !== '') {
            currentEditingTask.querySelector('span').textContent = updatedText;
            editTodoInput.value = ''; // Clear the input field
            editTodoModal.style.display = 'none';
            currentEditingTask = null; // Reset the current editing task
            saveTasksToLocalStorage();
        }
    }
});

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

// Function to add a task to the list
function addTaskToList(taskText, completed) {
    const li = document.createElement('li');
    li.innerHTML = `
        <div class="left-content flex">
            <div class="status-label"></div>
            <span class="todo-content text-center">${taskText}</span>
        </div>
        
        <div class="button-combo">
            <button class="edit bg-gray text-white square-button font-bold"><img src="icons/edit.svg" alt="edit" class="svg-icon"></button>
            <button class="check bg-done text-white square-button font-bold"><img src="icons/check.svg" alt="check" class="svg-icon"></button>
            <button class="delete bg-danger text-white square-button font-bold"><img src="icons/delete.svg" alt="delete" class="svg-icon"></button>
        </div>
    `;
    if (completed) {
        li.classList.add('completed');
    }
    todoList.appendChild(li);
    addEventListeners(li);
    saveTasksToLocalStorage();
}

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
    const tasks = Array.from(document.querySelectorAll('li')).map(li => ({
        text: li.querySelector('.todo-content').textContent,
        completed: li.classList.contains('completed')
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
