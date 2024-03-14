import React, { useState } from "react";
import "./Card.css";
import { AnimateSharedLayout, motion } from "framer-motion";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { green, red } from "@mui/material/colors";
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import CustomizedAccordions from "./CustomizedAccordions";

const Card = (props) => {
  const [expand, setExpand] = useState(false);

  return (
    <AnimateSharedLayout>
      {expand ? (
        // <ExpandCard/>
        <ExpandCard param={props} setExpand={() => setExpand(false)} />
      ) : (
        <CompactCard param={props} setExpand={() => setExpand(true)} />
      )}
    </AnimateSharedLayout>
  );
};

function CompactCard({ param, setExpand }) {
  const Icon = param.icon;
  return (
    <motion.div className="CompactCard" onClick={setExpand}>
      <div className="radialBar">
        <CircularProgressbar
          value={param.barValue}
          text={`${param.barValue}`}
        />
      </div>
      <div className="details">
        <Icon />
        <span>{param.title}</span>
        <div className="statusLines">
          <span>0 New</span>
          <span>0 In Progress</span>
        </div>
      </div>
    </motion.div>
  );
}

//Expanded Card
function ExpandCard({ param, setExpand }) {
  return (
    <motion.div
      className="ExpandedCard"
      style={{ background: green, boxShadow: red }}
     
    >
      <div className="cross-sign">
        <CloseSharpIcon  onClick={setExpand}/>
      </div>
      <span>{param.title}</span>
      <div className="chartContainer" >
          <CustomizedAccordions/>
      </div>
      
    </motion.div>
  );
}

export default Card;
