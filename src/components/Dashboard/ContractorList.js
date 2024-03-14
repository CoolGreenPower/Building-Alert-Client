import React, { useState } from "react";
import { Button } from "@mui/material";
import CustomAccordion from "../Cards/CustomAccordion";
import "./ContractorList.css";

const menuItems = [
  {
    name: "Max Lahor LLC",
    description: "Contractor 1",
  },
  { name: "David Ortega LLC", description: "Contractor  2" },
  {
    name: "Many Ortiz",
    description: "Contractor 3",
  },
  { name: "Peter Smith LLC", description: "Contractor 4" },
  { name: "Peter Smith LLC", description: "Contractor 4" },
  { name: "Peter Smith LLC", description: "Contractor 4" },
  { name: "Peter Smith LLC", description: "Contractor 4" },
  { name: "Peter Smith LLC", description: "Contractor 4" },
  { name: "Peter Smith LLC", description: "Contractor 4" },
  { name: "Peter Smith LLC", description: "Contractor 4" },
  { name: "Peter Smith LLC", description: "Contractor 4" },
  { name: "Peter Smith LLC", description: "Contractor 4" },
  { name: "Peter Smith LLC", description: "Contractor 4" },
  { name: "Peter Smith LLC", description: "Contractor 4" },
  { name: "Peter Smith LLC", description: "Contractor 4" },
  { name: "Peter Smith LLC", description: "Contractor 4" },
  { name: "Peter Smith LLC", description: "Contractor 4" },
  { name: "Peter Smith LLC", description: "Contractor 4" },
  { name: "Peter Smith LLC", description: "Contractor 4" },
  { name: "Peter Smith LLC", description: "Contractor 4" },
  { name: "Peter Smith LLC", description: "Contractor 4" },{ name: "Peter Smith LLC", description: "Contractor 4" },
  
];

const ContractorList = () => {
  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className="ContractorList">
      <h1>Contractors List</h1>
      <div className="contractorContainer">
        {menuItems.map((item, index) => (
          <CustomAccordion 
            key={index} 
            item={item} 
            expanded={expanded === index}
            onChange={handleChange(index)}
          />
        ))}
      </div>
      <Button 
        variant="contained" 
        sx={{ 
          borderRadius: '100px', 
          backgroundColor: '#07502d', 
          color: '#fff', 
          width: '100%', 
          marginTop: '20px',
          '&:hover': {
            backgroundColor: '#fff',
            color: '#07502d',
            border:"1px solid #07502d"
          },
        }}
      >
        Add Contractor
      </Button>
    </div>
  );
};

export default ContractorList;
