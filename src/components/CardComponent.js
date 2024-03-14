import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { MdNotificationsActive } from 'react-icons/md'
import Alert from '@material-ui/lab/Alert';
import { useDispatch } from 'react-redux';
import { ADD_SITE_NAME } from '../constants/constants';

export default function CardComponent(props) {

    const dispatch = useDispatch()

    const onCardClicked = (name) => {
        dispatch({
            type: ADD_SITE_NAME,
            name: name
        })
    }

    return <div>
        <Link to={{
            pathname: "/buildingAlerts/specAlerts",
            state: {
                alerts: props.alerts
            }
        }}

            style={{ textDecoration: 'none' }}>
            <Card className="box"
                style={{ width: '12rem', height: '21rem', textDecoration: 'none' }}
                text="dark"
                onClick={() => { onCardClicked(props.name) }}
            >
                <div style={{maxHeight: 30, padding: 10}}>
                    {props.name}
                    {/* <hr/> */}
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
                    style={{ height: '9rem' }}
                    src={props.imageLink} />
                <Card.Body>
                    {props.address}
                    {
                        props.new === 0 &&
                        <div>{props.new} New</div>
                    }

                    {
                        props.new > 0 &&
                        <div>{props.new} New <MdNotificationsActive /></div>
                    }
                    
                    {
                        props.inProgress > -1 &&
                        <p>{props.inProgress} In Progress</p>
                    }
                </Card.Body>
            </Card>
        </Link>
    </div>
}