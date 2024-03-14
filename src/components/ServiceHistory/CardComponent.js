import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
// import '@fontsource/roboto';
import Alert from '@material-ui/lab/Alert';
import { useDispatch } from 'react-redux';
import { ADD_SITE_NAME } from '../../constants/constants'

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
            pathname: "/serviceHistory/detailedAlerts",
            state: {
                alerts: props.alerts
            }
        }}
            style={{ textDecoration: 'none' }}>
            <Card className="box"
                style={{ width: '13rem', height: '18rem', textDecoration: 'none' }}
                text="dark"
                onClick={() => { onCardClicked(props.name) }}
            >
                <div style={{ alignContent: 'center' }}>
                    <u>{props.name}</u>
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
                    <div>
                        {props.totalAlerts} Service Record(s)
                    </div>

                    {
                        props.oldest !== undefined &&
                        <div>
                            Latest {props.oldest}
                        </div>
                    }
                    {
                        props.latest !== undefined &&
                        <div>
                            First {props.latest}
                        </div>
                    }


                </Card.Body>
            </Card>
        </Link>
    </div>
}