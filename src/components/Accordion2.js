import React, { useState, useEffect } from 'react';
import fetchAccordionData from '../apis/CallAPI';

function AccordionItem({ title, content, isOpen, onClick }) {
  return (
    <div className={`accordion-item ${isOpen ? 'open' : ''}`} onClick={onClick}>
      <div className="accordion-title">{title}</div>
      {isOpen && <div className="accordion-content">{content}</div>}
    </div>
  );
}

function AccordionContainer2() {
  const [accordionData, setAccordionData] = useState([]);

  useEffect(() => {
    fetchAccordionData().then((data) => {
      setAccordionData(data);
    });
  }, []);

  const handleItemToggle = (index) => {
    const updatedAccordion = accordionData.map((item, i) => ({
      ...item,
      isOpen: i === index ? !item.isOpen : false,
    }));
    setAccordionData(updatedAccordion);
  };

  return (
    <div className="accordion-container">
      {accordionData.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={item.isOpen}
          onClick={() => handleItemToggle(index)}
        />
      ))}
    </div>
  );
}

export default AccordionContainer2;
