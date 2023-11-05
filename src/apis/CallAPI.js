async function fetchAccordionData() {
    const response = await fetch("https://awd-2023.azurewebsites.net/Accordions", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "student-name": "idk"
      },
    });
  
    const accordionList = await response.json();
    return accordionList;
  }
  
  export default fetchAccordionData;
  