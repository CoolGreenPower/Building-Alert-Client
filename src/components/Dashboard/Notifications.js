import React from 'react'
import BAAppBar from '../BAAppBar'
import "./Notifications.css"
import { Link } from 'react-router-dom'
import Colors from '../../constants/Colors'
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import { Alert } from 'react-bootstrap'

// create a enum for the different types of notifications

export const NotificationType = {
  REQUEST: 'REQUEST',
  MESSAGE: 'MESSAGE',
  Alert: 'ALERT'
}
const Notifications = () => {
  return (
    <div className='bg-white h-screen md:mt-0 xs:mt-16'>
      <BAAppBar className='baappbar' title="Notifications" leading={<div className='w-8' />} />
      <h6 className='text-primaryColor'>{`Home Page > Notifications `}</h6>
      <div className="mx-2 pt-2">
        {Array.from([0, 1, 2, 3, 43, 4]).map((item, index) =>
          index % 2 === 0 ? (
            <DefaultNotification
              item={{
                title: 'New Alerts',
                subtitle: 'New Alerts',
                route: '/alerts/new'
              }}
              index={index}
            />
          ) : (
            <AlertNotification
              item={{
                title: 'New Alerts',
                subtitle: 'New Alerts',
                route: '/alerts/new'
              }}
              index={index}
            />
          )
        )}
      </div>
    </div>
  );
};
export const DefaultNotification = (props) => {
  return <Link
    to={props.item.route}
    key={props.index}
    className={`w-full px-4 py-3 my-1 border border-gray-500 border-1 flex justify-between items-center ${props.index % 2 === 0 ? 'bg-gray-100' : 'bg-alert'}`}
  >
    <div className='flex flex-col items-start'>
      <span className='text-primaryColor font-bold'>{props.title}</span>
      <span className='text-black font-bold'>{props.item.subtitle}</span>
    </div>
    <ArrowForwardIos style={{ color: Colors.primary }}
    />
  </Link>
}

export const AlertNotification = (props) => {
  return <Link
    to={props.item.route}
    key={props.index}
    className={`w-full px-4 py-3 my-1 border border-gray-500 border-1 flex justify-between items-center bg-alert`}
  >
    <div className='flex flex-col items-start'>
      <span className='text-primaryColor font-bold'>{props.title}</span>
      <span className='text-black font-bold'>{props.item.subtitle}</span>
    </div>
    <ArrowForwardIos style={{ color: Colors.primary }}
    />
  </Link>
}

export default Notifications;