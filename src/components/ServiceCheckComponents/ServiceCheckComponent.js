/**
 * Class that represents the landing page of Service Check alerts
 */

import { Component } from 'react'
import axios from 'axios'
import { LOCAL_HOST, PORT } from '../../constants/constants'
import { connect } from 'react-redux'
import { Container, Typography } from '@material-ui/core';
import { Dropdown } from 'react-bootstrap'
import CardComponent from './CardComponent';
import { Card } from 'react-bootstrap'
import { MdNotificationsActive } from 'react-icons/md'
import Alert from '@material-ui/lab/Alert';

/**
 * Function to render businesses as cards
 * Cards display number of Checking and Alerts, along with an image
 */
const renderCardComponent = (variant) => {
    return (
        <div>
            <CardComponent
                key={variant.idx}
                alerts={variant.serviceCheckAlerts}
                alertType={variant.alertType}
                totalAlerts={variant.totalAlerts}
                status={variant.status}
                name={variant.name}
                imageLink={variant.imageLink}
                alert={variant.alert}
                checking={variant.checking}
                address={variant.address}
            />
        </div>
    )
}

class ServiceCheckComponent extends Component {

    state = {
        parentBuilding: '',
        parentToBuildingMap: new Map()
    }

    //runs on mount
    componentDidMount() {

        const tempParentToBuildingMap = new Map()
        let tempPbAlerts = 0;
        let tempPbCheckings = 0;
        let tempPbTotalAlerts = 0;

        // fetch all serviceCheckAlerts belonging to all buildings which this particular userid is tied to
        axios.post(`${LOCAL_HOST}:${PORT}/serviceCheckAlerts/buildings`,
            {
                "userId": this.props.userId
            },
            {
                headers: {
                    'x-auth-token': localStorage.getItem('token'),
                    'content-type': 'application/json'
                }
            })
            .then(res => {
                //loop through the buildings
                res.data.forEach(pb => {
                    //loop thru businesses
                    pb.buildings.forEach(business => {
                        let checkingCounter = 0;
                        let alertCounter = 0;

                        //loop thru alerts
                        business.serviceCheckAlerts.forEach(alert => {

                            if (alert.status !== 'resolved') {
                                if (alert.type === "Checking") checkingCounter++
                                else if (alert.type === "Alert") alertCounter++
                            }
                        })

                        business["checking"] = checkingCounter
                        business["alert"] = alertCounter
                        business["totalAlerts"] = checkingCounter + alertCounter

                        //values to be displayed in the landing page
                        tempPbAlerts += alertCounter
                        tempPbCheckings += checkingCounter

                    })

                    tempPbTotalAlerts = tempPbAlerts + tempPbCheckings
                    tempParentToBuildingMap.set(pb, pb.buildings)

                    pb["totalAlerts"] = tempPbTotalAlerts
                    pb["alert"] = tempPbAlerts
                    pb["checking"] = tempPbCheckings

                })

                this.setState({
                    parentToBuildingMap: tempParentToBuildingMap,
                    parentBuilding: res.data[1]
                })
            })
    }

    // Runs when building is selected
    onSelectPb = (pb) => {
        this.setState({
            parentBuilding: pb
        })
    }

    render() {
        return <div>
            <Typography variant="h5">
                &nbsp;&nbsp;&nbsp;Service Check
            </Typography>
            <hr />

            <Container>
                {/* Drop down building */}
                <Dropdown>
                    <Dropdown.Toggle
                        variant="success"
                        style={{ width: 195 }}>
                        {this.state.parentBuilding.name}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {
                            Array.from(this.state.parentToBuildingMap.keys()).length > 0 &&
                            Array.from(this.state.parentToBuildingMap.keys()).map(pb => {
                                return (
                                    <Dropdown.Item
                                        onSelect={() => this.onSelectPb(pb)}
                                    >
                                        {pb.name}
                                    </Dropdown.Item>
                                )
                            })
                        }
                    </Dropdown.Menu>
                </Dropdown>
            </Container>

            <Card className="box"
                style={{ width: '12rem', height: '18rem', textDecoration: 'none' }}
                text="dark"
                onClick={() => { alert('Please click on businesses below for more details') }}
            >
                <div style={{ maxHeight: 30, padding: 10 }}>
                    {this.state.parentBuilding.name}
                </div>

                {
                    this.state.parentBuilding.new > 0 &&
                    <Alert severity="error">{this.state.parentBuilding.totalAlerts} Total Alerts</Alert>
                }
                {
                    this.state.parentBuilding.new === 0 &&
                    <Alert severity="success">{this.state.parentBuilding.totalAlerts} Total Alerts</Alert>
                }

                <Card.Img variant="top"
                    style={{ height: '9rem' }}
                    src={this.state.parentBuilding.imageLink} />
                <Card.Body>
                    {this.state.parentBuilding.address}
                    {
                        this.state.parentBuilding.alert === 0 &&
                        <div>{this.state.parentBuilding.alert} Alert(s)</div>
                    }
                    {
                        this.state.parentBuilding.alert > 0 &&
                        <div>{this.state.parentBuilding.alert} Alert(s) <MdNotificationsActive /></div>
                    }
                    {
                        this.state.parentBuilding.checking > -1 &&
                        <p>{this.state.parentBuilding.checking} Checking</p>
                    }
                </Card.Body>
            </Card>
            <hr />
            {/* render businesses as cards */}
            <div className="grid">
                {
                    this.state.parentToBuildingMap.get(this.state.parentBuilding) !== undefined &&
                    this.state.parentToBuildingMap.get(this.state.parentBuilding).map(renderCardComponent)
                }
            </div>
        </div>
    }
}

//fetch userId, username from redux store
const mapStateToProps = (state) => {
    return {
        userId: state.userId,
        username: state.username
    }
}

export default connect(mapStateToProps)(ServiceCheckComponent)