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
        const li = document.createElement('li');
        li.innerHTML = `
        <div class="left-content flex">
            <div class="status-label"></div>
            <span class="todo-content text-center">${todoText}</span>
        </div>
        
        <div class="button-combo">
            <button class="edit bg-gray text-white square-button font-bold"><img src="icons/edit.svg" alt="edit" class="svg-icon"></button>
            <button class="check bg-done text-white square-button font-bold"><img src="icons/check.svg" alt="check" class="svg-icon"></button>
            <button class="delete bg-danger text-white square-button font-bold"><img src="icons/delete.svg" alt="delete" class="svg-icon"></button>
        </div>
        `;
        todoList.appendChild(li);
        todoInput.value = '';
        addTodoModal.style.display = 'none';
        addEventListeners(li);
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
    }
}


// Delete Todo
function deleteTodo() {
    this.parentNode.remove();
}

let currentEditingTask = null; // Variable to keep track of the task being edited

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
    });

    deleteButton.addEventListener('click', () => {
        li.remove();
    });
}

// Set up the Save button click event within the edit modal
const saveButton = editTodoModal.querySelector('#saveTodo');
saveButton.addEventListener('click', () => {
    if (currentEditingTask) {
        const updatedText = editTodoInput.value.trim();
        if (updatedText !== '') {
            currentEditingTask.querySelector('span').textContent = updatedText;
            editTodoInput.value = ''; // Clear the input field
            editTodoModal.style.display = 'none';
            currentEditingTask = null; // Reset the current editing task
        }
    }
});

// Filter tasks based on the selected filter
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


// Initialize event listeners for existing todos
document.querySelectorAll('li').forEach(addEventListeners);
