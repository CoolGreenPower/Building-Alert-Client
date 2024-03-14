
import React, { Component } from 'react';
import { ArrowForwardIos } from '@material-ui/icons';
import { IconButton } from '@mui/material';
import Colors from '../../constants/Colors';


const RequestTile = ({ from, location, date }) => {
    return (
        <div className='flex justify-between bg-white hover:bg-tabSurface items-center border m-2 border-gray-300 p-2 cursor-pointer'>
            <div className='flex flex-col'>
                {/* Add a label and value */}
                <div className='flex'>
                    <span className='flex w-24 text-primaryColor font-bold'>From</span>
                    <span className='flex-grow text-primaryColor'>{from}</span>
                </div>

                <div className='flex py-1'>
                    <span className='flex w-24 text-primaryColor font-bold'>Location</span>
                    <span className='flex-grow text-primaryColor'>{location}</span>
                </div>

                <div className='flex'>
                    <span className='flex w-24 text-primaryColor font-bold'>Date</span>
                    <span className='flex-grow text-primaryColor'>{date}</span>
                </div>
            </div>
            <div className='flex items-center'>
                <IconButton>
                    <ArrowForwardIos
                        style={{ color: Colors.primary }}
                    />
                </IconButton>
            </div>
        </div>
    );
}

export default RequestTile;