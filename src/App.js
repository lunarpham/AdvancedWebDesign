import React from 'react';
import './App.css'; // Import your CSS file here
import Todo from './components/Todo'; // Import the Todo component

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Todo />
      </header>
    </div>
  );
}

export default App;
