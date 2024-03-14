
import { AddBox, EventAvailable, CalendarMonth } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Colors from '../../constants/Colors';
import BAAppBar from '../BAAppBar';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import RequestTile from './RequestTile';
import MapViewComponent from '../Common/MapView';
import TabButton from '../Common/TabButton';

const RequestManagement = (props) => {
    const [selectedTab, setSelectedTab] = useState('New');
    const [mapView, setMapView] = useState(false);
    const history = useHistory();
    const resp = localStorage.getItem('loginResponse');
    const perm = JSON.parse(resp)?.permissions;

    useEffect(() => {
        if (props.inProgress) {
            setSelectedTab('In Progress');
        }
    }, []);

    return (
        <div className='bg-tabSurface h-screen md:mt-0 xs:mt-14'>
            <BAAppBar
                className='baappbar'
                title="Requests Management"
                leading={<div className='w-8' />}
                trailing={
                    // Create a add icon button
                    <Link
                        to="/requests/new">
                        <AddIcon
                            className='mr-4 cursor-pointer'
                            onClick={() => {

                            }}
                            style={{ color: Colors.primary }}
                        />
                    </Link>
                }
            />
            <div className='flex p-2 py-4 bg-white text-primaryColor'>
                <div className='grow'>
                    <h6>{`Home Page > Requests Management`}</h6>
                </div>
                <Button
                    onClick={
                        () => { history.push('/requests/completed') }
                    }
                    className='guest_btn font-bold px-4 py-1'>
                    Completed
                </Button>
            </div>

            <div className='flex justify-center bg-tabSurface'>
                <TabButton
                    label='New'
                    icon={<AddBox />}
                    selected={selectedTab === 'New'}
                    onClick={() => setSelectedTab('New')}
                />
                {perm === "owner" ?
                    <TabButton
                        label='Submitted'
                        icon={<CalendarMonth />}
                        selected={selectedTab === 'Submitted'}
                        onClick={() => setSelectedTab('Submitted')}
                    /> : null}

                <TabButton
                    label='In Progress'
                    icon={<EventAvailable />}
                    selected={selectedTab === 'In Progress'}
                    onClick={() => setSelectedTab('In Progress')}
                />
            </div>
            <div className='flex justify-end items-center text-primaryColor'>
                <p
                    onClick={() => setMapView(!mapView)}
                    className={`p-2 cursor-pointer ${!mapView ? 'underline' : ''}`}> ListView</p>
                <p className='mx-1'> |</p>
                <p
                    onClick={() => setMapView(!mapView)}
                    className={`p-2 cursor-pointer ${mapView ? 'underline' : ''}`}> MapView</p>
            </div>
            {
                !mapView ? (<ListViewComponent
                    props={props}
                    onClick={() => console.log('clicked')}
                />) : (<MapViewComponent />
                )
            }
        </div >
    );
}
const ListViewComponent = (props, { onClick }) => {

    /**
     * Create a list Tile component with the following props:
     * It has three rows from, location, and date
     * With a trailing arrow icon at the end
     */
    return (
        <div onClick={onClick}>
            {(props.inProgress ? [1, 2, 3] : [1, 2, 4, 5]).map((item, index) => (
                <RequestTile
                    key={index} // Add a key prop for each element in the map function
                    from={'Bank of America'}
                    location={'San Francisco, CA'}
                    date={'10/10/2021'}
                />
            ))}
        </div>
    );
}

export default RequestManagement;
