/**
 * Resuable component to display businesses and buildings as cards
 */

import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { MdNotificationsActive } from 'react-icons/md'
import Alert from '@material-ui/lab/Alert';
import { useDispatch } from 'react-redux';
import { ADD_SITE_NAME } from '../../constants/constants';

export default function CardComponent(props) {

    //hook to send data to redux store
    const dispatch = useDispatch()

    //function that runs when a card is clicked
    const onCardClicked = (name, buildingId) => {

        //adds current business name to the redux store
        dispatch({
            type: ADD_SITE_NAME,
            name: name,
            parentBuilding: props.parentBuilding,
            buildingId: buildingId
        })
    }

    return <div>
        {/* Link to detailed alerts when card is clicked
            Alerts are sent to detailed alerts page
        */}
        <Link to={{
            pathname: "/alertHistory/detailedAlerts",
            state: {
                alerts: props.alerts
            }
        }}
            style={{ textDecoration: 'none' }}>
            <Card className="box"
                style={{ width: '12rem', height: '18rem', textDecoration: 'none' }}
                text="dark"
                onClick={() => { onCardClicked(props.name, props.buildingId) }}
            >
                <div style={{ maxHeight: 30, padding: 10 }}>
                    {props.name}
                </div>

                {
                    props.new > 0 &&
                    <Alert severity="error">{props.alertNumber} Total Alerts</Alert>
                }
                {
                    props.new === 0 &&
                    <Alert severity="success">{props.alertNumber} Total Alerts</Alert>
                }

                <Card.Img variant="top"
                    style={{ height: '6rem' }}
                    src={props.imageLink} />
                <Card.Body>
                    {props.address}
                    {/* No bell icon displayed if there are 0 alerts */}
                    {
                        props.new === 0 &&
                        <div>{props.new} New</div>
                    }

                    {/* Bell icon displayed if there are greater than 0 alerts */}
                    {
                        props.new > 0 &&
                        <div>{props.new} New <MdNotificationsActive /></div>
                    }
                    
                    {
                        props.inProgress > -1 &&
                        <div>{props.inProgress} In Progress</div>
                    }
                    {
                        props.resolved > -1 &&
                        <div>{props.resolved} Resolved</div>
                    }
                </Card.Body>
            </Card>
        </Link>
    </div>
}