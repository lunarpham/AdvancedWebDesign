import React, { useState } from 'react';

function AccordionItem({ title }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`accordion-item ${isOpen ? 'open' : ''}`} onClick={handleToggle}>
      <div className="accordion-title">{title}</div>
      {isOpen && <div className="accordion-content">Accordion Content</div>}
    </div>
  );
}

function AccordionContainer1() {
  const accordion1 = [
    { title: 'Item 1' },
    { title: 'Item 2' },
    { title: 'Item 3' },
  ];

  return (
    <div className="accordion-container">
      {accordion1.map((item, index) => (
        <AccordionItem key={index} title={item.title} />
      ))}
    </div>
  );
}

export default AccordionContainer1;
