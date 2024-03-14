import React from 'react';
import BAAppBar from '../BAAppBar';
import Button from '@mui/material/Button';
import { FilterAlt } from '@mui/icons-material';
import Colors from '../../constants/Colors';
import { IconButton } from '@mui/material';
import { ArrowForwardIos } from '@mui/icons-material';

function CompletedRequests() {
    return (
        <div className='bg-white h-screen md:mt-0 xs:mt-16'>
            <BAAppBar
                className='baappbar'
                title="Completed Requests"
                leading={<div className='w-8' />}
            />
            <div className='p-2'>
                <h6 className='text-primaryColor'>{`Home Page > Completed Requests`}</h6>
                <div className='flex justify-end'>
                    <Button className='guest_btn font-bold px-4 py-1'>
                        <FilterAlt className='mr-2' />
                        Filter
                    </Button>
                </div>
                <div>
                    <div className='flex mx-4 text-primaryColor font-bold'>
                        <div className='flex-1'>
                            Timestamp
                        </div>
                        <div className='flex-1'>Device</div>
                    </div>
                    <ListViewComponent />
                </div>
            </div>
        </div>
    );
}

const ListViewComponent = (props, { onClick }) => {

    /**
     * Create a list Tile component with the following props:
     * It has three rows from, location, and date
     * With a trailing arrow icon at the end
     */
    const AlertTile = ({ timeStamp, device }) => {
        return (
            <div className='flex justify-between bg-tabSurface hover:bg-white items-center border m-2 border-gray-300 p-2 cursor-pointer'>
                <div className='flex grow mx-2'>
                    <div className='flex-1'>
                        {timeStamp}
                    </div>
                    <div className='flex-1'>{device}</div>
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

    return (
        <div onClick={onClick}>
            {([1, 2, 4, 5]).map((item, index) => (
                <AlertTile
                    key={index} // Add a key prop for each element in the map function
                    timeStamp={'2022-10-10 10:10:10'}
                    device={'HVAC-CMP1'}
                />
            ))}
        </div>
    );
}



export default CompletedRequests;
