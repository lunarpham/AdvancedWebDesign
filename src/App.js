import React from 'react';
import AccordionContainer1 from './components/Accordion1';
import AccordionContainer2 from './components/Accordion2';
import './App.css';

function App() {
  return (
    <div className="App">
      <h2>Requirement 1</h2>
      <AccordionContainer1 />
      <h2>Requirement 2</h2>
      <AccordionContainer2 />
    </div>
  );
}

export default App;
