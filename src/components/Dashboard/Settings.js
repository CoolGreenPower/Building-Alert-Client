import React, { useState } from "react";
import CustomAccordion from '../Cards/CustomAccordion';
import "./Settings.css"
const Settings = () => {

  const menuItems = [
    { name: "Help and FAQs", description: "This is the description for Help and FAQs" },
    { name: "Privacy", description: "This is the description for Privacy" },
    { name: "About the App", description: "This is the description for About the App" },
    { name: "Contact Us", description: "This is the description for Contact Us" },
  ];

  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className="settings">
        <h1>Settings</h1>
      {menuItems.map((item, index) => (
        <CustomAccordion 
          key={index} 
          item={item} 
          expanded={expanded === index}
          onChange={handleChange(index)}
        />
      ))}
    </div>
  );
};

export default Settings;
