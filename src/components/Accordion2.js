import React, { useState } from 'react';

function AccordionItem({ title, isOpen, onClick }) {
  return (
    <div className={`accordion-item ${isOpen ? 'open' : ''}`} onClick={onClick}>
      <div className="accordion-title">{title}</div>
      {isOpen && <div className="accordion-content">Accordion Content</div>}
    </div>
  );
}

function AccordionContainer2() {
  const [accordion2, setAccordion2] = useState([
    { title: 'Item A', isOpen: false },
    { title: 'Item B', isOpen: false },
    { title: 'Item C', isOpen: false },
  ]);

  const handleItemToggle = (index) => {
    const updatedAccordion = accordion2.map((item, i) => ({
      ...item,
      isOpen: i === index ? !item.isOpen : false,
    }));
    setAccordion2(updatedAccordion);
  };

  return (
    <div className="accordion-container">
      {accordion2.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          isOpen={item.isOpen}
          onClick={() => handleItemToggle(index)}
        />
      ))}
    </div>
  );
}

export default AccordionContainer2;
