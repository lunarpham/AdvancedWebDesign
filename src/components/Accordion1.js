import React, { useState, useEffect } from 'react';
import fetchAccordionData from '../apis/CallAPI';

function AccordionItem({ title, content }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`accordion-item ${isOpen ? 'open' : ''}`} onClick={handleToggle}>
      <div className="accordion-title">{title}</div>
      {isOpen && <div className="accordion-content">{content}</div>}
    </div>
  );
}

function AccordionContainer1() {
  const [accordionData, setAccordionData] = useState([]);

  useEffect(() => {
    fetchAccordionData().then((data) => {
      setAccordionData(data);
    });
  }, []);

  return (
    <div className="accordion-container">
      {accordionData.map((item, index) => (
        <AccordionItem key={index} title={item.title} content={item.content} />
      ))}
    </div>
  );
}

export default AccordionContainer1;
