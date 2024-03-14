import React from "react";
import "./Cards.css";
import { SidebarData2 } from "../Sidebar/DummyData";
import Card from "./Card";
import {Link} from "react-router-dom"

const Cards = ({ data }) => {
  // If no matching data found, return null or a fallback component
  if (!data) return null;

  return (
    <div className="Cards">
      
        {data.map((item) => (
          <div className="parentContainer">
          <Card
            key={item.title}
            title={item.title}
            barValue={item.barValue}
            icon={item.icon}
            param={item}
          />
          </div>
        ))}
        <Link
          to="/Sensors"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#07502d",
            color: "#ffffff",
            borderRadius: "100px",
            border: "1px solid #07502d",
            fontSize: "12px",
            padding: "10px 20px",
            textDecoration: "none",
            width: "100%",
            marginBottom:"10px",
            maxWidth: "300px", // Max width to keep button size reasonable on large screens
            margin: "0 auto", // Center button
            transition: "0.3s", // Transition for hover effect
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#ffffff";
            e.target.style.color = "#07502d";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#07502d";
            e.target.style.color = "#ffffff";
          }}
        >
          Browse All Sensors
        </Link>
      </div>
    
  );
};

export default Cards;

// title={item.title}
//                    barValue={item.barValue}
//                    icon={item.icon}
