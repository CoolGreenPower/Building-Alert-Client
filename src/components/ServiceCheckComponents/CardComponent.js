import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { MdNotificationsActive } from 'react-icons/md'
import Alert from '@material-ui/lab/Alert';
import { useDispatch } from 'react-redux';
import { ADD_SITE_NAME } from '../../constants/constants'

export default function CardComponent(props) {

    const dispatch = useDispatch()

    // send business name to redux store
    const onCardClicked = (name) => {
        dispatch({
            type: ADD_SITE_NAME,
            name: name
        })
    }

    return <div>
        <Link to={{
            pathname: "/serviceCheck/serviceCheckSpecAlerts",
            state: {
                alerts: props.alerts
            }
        }}
            style={{ textDecoration: 'none' }}>
            <Card className="box"
                style={{ width: '12rem', height: '18rem', textDecoration: 'none' }}
                text="dark"
                onClick={() => { onCardClicked(props.name) }}
            >
                <div style={{ maxHeight: 30, padding: 10 }}>
                    {props.name}
                </div>

                {
                    props.new > 0 &&
                    <Alert severity="error">{props.totalAlerts} Total Alerts</Alert>
                }
                {
                    props.new === 0 &&
                    <Alert severity="success">{props.totalAlerts} Total Alerts</Alert>
                }

                <Card.Img variant="top"
                    style={{ height: '9rem' }}
                    src={props.imageLink} />
                <Card.Body>
                    {props.address}
                    {
                        props.alert === 0 &&
                        <div>{props.alert} Alert(s)</div>
                    }
                    {
                        props.alert > 0 &&
                        <div>{props.alert} Alert(s) <MdNotificationsActive /></div>
                    }
                    {
                        props.checking > -1 &&
                        <p>{props.checking} Checking</p>
                    }
                </Card.Body>
            </Card>
        </Link>
    </div>
}