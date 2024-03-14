import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { UPDATE_ALERT_CATEGORY } from '../../constants/constants'
import { useDispatch } from 'react-redux'

export default function ServiceCheckColorCardComponent(props) {

    const dispatch = useDispatch()

    const dispatchAlertCategory = () => {
        dispatch({
            type: UPDATE_ALERT_CATEGORY,
            alertCategory: props.alertCategory
        })
    }

    return <Link to={"/serviceCheck/serviceCheckDetailedAlerts"}
        style={{ textDecoration: 'none' }}>

        <Card className="box"
            onClick={() => dispatchAlertCategory()}
            // border={props.alertType}
            text="dark"
            style={{ width: '12rem', height: '12rem', textDecoration: 'none' }}
            bg={props.cardColor}
        >
            <Card.Header>
                <Card.Title>
                    {props.totalAlerts} <br />
                    {props.alertCategory}
                </Card.Title>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    {props.alertAlerts} Alert
                </Card.Text>
                <Card.Text>
                {props.checkingAlerts} Checking
                </Card.Text>
            </Card.Body>
        </Card>
    </Link>
}