import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';

const Todo = () => {
  const [filter, setFilter] = useState('showAll');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [todoText, setTodoText] = useState('');
  const [updatedText, setUpdatedText] = useState('');

  return (
    <div className="App">
      <h1>Todos</h1>
      <div className="flex justify-between">
        <div id="filterButtons">
          <span className="text-white">Show</span>
          <button
            className={`rectangle-button text-white filter-button font-bold bg-gray ${
              filter === 'showAll' ? 'active-filter' : ''
            }`}
          >
            All
          </button>
          <button
            className={`rectangle-button text-white filter-button font-bold bg-ongoing ${
              filter === 'showOngoing' ? 'active-filter' : ''
            }`}
          >
            Ongoing
          </button>
          <button
            className={`rectangle-button text-white filter-button font-bold bg-done ${
              filter === 'showCompleted' ? 'active-filter' : ''
            }`}
          >
            Done
          </button>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-indigo text-white font-bold rectangle-button"
        >
          Add Todo
        </button>
      </div>

        <TodoList />

      <div className={`modal ${showAddModal ? 'show' : ''}`}>
        <div className="modal-content">
          <span className="close" onClick={() => setShowAddModal(false)}>
            <img src="icons/close.svg" alt="close" className="svg-icon" />
          </span>
          <input
            type="text"
            id="todoInput"
            placeholder="Todo title..."
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
          />
          <button
            id="addTodo"
            className="bg-indigo text-white font-bold rectangle-button"
          >
            Add
          </button>
        </div>
      </div>

      <div className={`modal ${showEditModal ? 'show' : ''}`}>
        <div className="modal-content">
          <span className="close" onClick={() => setShowEditModal(false)}>
            <img src="../src/icons/close.svg" alt="close" className="svg-icon" />
          </span>
          <input
            type="text"
            id="editTodoInput"
            placeholder="Edit todo"
            value={updatedText}
            onChange={(e) => setUpdatedText(e.target.value)}
          />
          <button
            id="saveTodo"
            className="bg-indigo text-white font-bold rectangle-button"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
