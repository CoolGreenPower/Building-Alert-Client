// RequestCard.jsx
import React from "react";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import Colors from "../../constants/Colors";
import { IconButton } from "@mui/material";
import { Button } from "@mui/material";
import { colors, camelCase } from "../../constants/constants";

const NewAlertCard = ({ severity, description }) => {
    let textColor = colors.primaryColor;
    let backgroundColor = colors.primaryColor;
    switch (severity) {
        case 'High':
            textColor = colors.alertText;
            backgroundColor = colors.alertBackground;
            break;
        case 'Low':
            textColor = colors.lowText;
            backgroundColor = colors.lowBackground;
            break;
        default:
            textColor = colors.green;
            backgroundColor = colors.greenBackground;
            break;
    }

    return (
        <div className='flex justify-between bg-white hover:bg-tabSurface items-center border m-2 border-gray-300 px-4 py-2 cursor-pointer'>
            <div className='flex flex-col'>
                {/* Add a red circle */}
                <div className="flex">
                    <Button
                        className='font-bold px-4 py-1 border rounded-full border-gray-300'
                        style={{
                            textTransform: 'none',
                            borderRadius: 20,
                            backgroundColor: backgroundColor,
                            color: textColor
                        }}
                    >
                        {camelCase(severity)}
                    </Button>
                    <div className="w-8" />
                    <div className='grow flex text-xl text-primaryColor'>{description}</div>
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
export default NewAlertCard;
