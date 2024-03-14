import { AddBox, EventAvailable, CalendarMonth } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Colors from '../../constants/Colors';
import BAAppBar from '../BAAppBar';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import MapViewComponent from '../Common/MapView';
import TabButton from '../Common/TabButton';
import NewAlertCard from './NewAlertCard';

const alertsData = [
  {
    alertId: "T-34",
    severity: "High",
    title: 'Hot And Dry',
    date_reported: "October 10, 2022 11:10 am EST", description: "Relative Humidity is low and tempera-ture is high increasing the risk of dehydration, dry skin, irritated nasal passages and throat, and itchy eyes", location: "130 Summer St, Malden MA 02148", unit: "101", status: "New (Unassigned)"
  },
  {
    alertId: "T-34",
    severity: "Low",
    title: 'Hot And Dry',
    date_reported: "October 10, 2022 11:10 am EST", description: "Relative Humidity is low and tempera-ture is high increasing the risk of dehydration, dry skin, irritated nasal passages and throat, and itchy eyes", location: "130 Summer St, Malden MA 02148", unit: "101", status: "New (Unassigned)"
  },
  {
    alertId: "T-34",
    severity: "None",
    title: 'Acceeptable IAQ',
    date_reported: "October 10, 2022 11:10 am EST", description: "Relative Humidity is low and tempera-ture is high increasing the risk of dehydration, dry skin, irritated nasal passages and throat, and itchy eyes", location: "130 Summer St, Malden MA 02148", unit: "101", status: "New (Unassigned)"
  },
  {
    alertId: "T-34",
    severity: "Low",
    title: 'High Humidity',
    date_reported: "October 10, 2022 11:10 am EST", description: "Relative Humidity is low and tempera-ture is high increasing the risk of dehydration, dry skin, irritated nasal passages and throat, and itchy eyes", location: "130 Summer St, Malden MA 02148", unit: "101", status: "New (Unassigned)"
  },
  {
    alertId: "T-34",
    severity: "Low",
    title: 'Hot And Dry',
    date_reported: "October 10, 2022 11:10 am EST", description: "Relative Humidity is low and tempera-ture is high increasing the risk of dehydration, dry skin, irritated nasal passages and throat, and itchy eyes", location: "130 Summer St, Malden MA 02148", unit: "101", status: "New (Unassigned)"
  },
  {
    alertId: "T-34",
    severity: "High",
    title: 'Hot And Dry',
    date_reported: "October 10, 2022 11:10 am EST", description: "Relative Humidity is low and tempera-ture is high increasing the risk of dehydration, dry skin, irritated nasal passages and throat, and itchy eyes", location: "130 Summer St, Malden MA 02148", unit: "101", status: "New (Unassigned)"
  }
];


const AlertsManagement = (props) => {
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
        title="Alerts Management"
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
          <h6>{`Home Page > Alerts Management`}</h6>
        </div>
        <Button
          onClick={
            () => { history.push('/alerts/completed') }
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
  const history = useHistory();
  /**
   * Create a list Tile component with the following props:
   * It has three rows from, location, and date
   * With a trailing arrow icon at the end
   */
  return (
    <div onClick={onClick}>
      {(props.inProgress ? [1, 2, 3] : [1, 2, 4, 5]).map((item, index) => (
        <NewAlertCard
          key={index} // Add a key prop for each element in the map function
          description={alertsData[index].title}
          onClick={() => {
            history.push('/alerts/review');
          }}
          severity={alertsData[index].severity}
        />
      ))}
    </div>
  );
}

export default AlertsManagement;
