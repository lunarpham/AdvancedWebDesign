import React, { useEffect, useState } from 'react';
import AccordionContainer1 from './components/Accordion1';
import AccordionContainer2 from './components/Accordion2';
import './App.css';
import CallAPI from './apis/CallAPI';

function App() {
  const [accordionData, setAccordionData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await CallAPI();
      setAccordionData(data);
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <h2>Requirement 1</h2>
      <AccordionContainer1 data={accordionData} />
      <h2>Requirement 2</h2>
      <AccordionContainer2 data={accordionData} />
    </div>
  );
}

export default App;
