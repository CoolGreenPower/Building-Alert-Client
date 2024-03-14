// RequestCard.jsx
import React from "react";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import Colors from "../../constants/Colors";
import { IconButton } from "@mui/material";

const AlertCard = ({ data, onClick }) => {
  return (
    <div
      onClick={onClick}
      className='flex justify-between bg-white hover:bg-tabSurface items-center border m-2 border-gray-300 px-4 py-2 cursor-pointer'>
      <div className='flex flex-col'>
        {/* Add a red circle */}
        <div className="flex">
          <div className={`${data.priority === 'High' ? 'bg-red-600' : 'bg-green-600'} w-6 h-6 rounded-full`} />
          <div className="w-4" />
          <div className='grow flex text-xl text-primaryColor'>Hot and Dry</div>
        </div>
        <div className='flex py-1'>
          <span className='flex text-primaryColor font-bold'>Location:</span>
          <span className='flex-grow px-4 text-primaryColor'>{data.location}</span>
        </div>
      </div>
      <div className='flex items-center'>
        <IconButton>
          <ArrowForwardIos
            className="z-0"
            style={{ color: Colors.primary }}
          />
        </IconButton>
      </div>
    </div>
  );
}
export default AlertCard;
