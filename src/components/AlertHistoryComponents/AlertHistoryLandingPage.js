/**
 * This acts as the landing page for Alert History. This page gives the choice to select 
 * buildings. Selection of buildings auto selects the businesses within the buildings.
 */

import { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import CardComponent from './CardComponent'
import { Typography } from '@material-ui/core';
import { LOCAL_HOST, PORT } from '../../constants/constants';
import { Container, Dropdown } from 'react-bootstrap'
import { Card } from 'react-bootstrap'
import { MdNotificationsActive } from 'react-icons/md'
import Alert from '@material-ui/lab/Alert';

/**
 * Function to render businesses as cards
 * Cards display Pending and New Alerts
 * 
 */
const renderCardComponent = (variant) => {
    return (<div>
        <CardComponent
            key={variant.idx}
            alerts={variant.alerts}
            alertType={variant.alertType}
            alertNumber={variant.alertNumber}
            status={variant.status}
            name={variant.name}
            imageLink={variant.imageLink}
            new={variant.new}
            inProgress={variant.inProgress}
            resolved={variant.resolved}
            address={variant.address}
            parentBuilding={variant.parentBuilding}
            buildingId={variant.buildingId}
        />
    </div>)
}

//The class
class AlertHistoryLandingPage extends Component {

    state = {
        parentBuilding: '',
        parentToBuildingMap: new Map()
    }

    //runs when the page loads
    componentDidMount() {

        const tempParentToBuildingMap = new Map()
        let tempPbTotalAlerts = 0;
        let tempPbNewAlerts = 0;
        let tempPbInProgAlerts = 0;
        let tempPbResolvedAlerts = 0;

        //fetch all resolved alerts from buildings
        axios.post(`${LOCAL_HOST}:${PORT}/alerts/resolvedAlerts`,
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
                //loop through buildings - represented as pb here
                res.data.forEach(pb => {
                    //loop thru businesses within these buildings
                    pb.buildings.forEach(building => {
                        let severity = 'success'
                        let newCounter = 0;
                        let inProgCounter = 0;
                        let resolvedCounter = 0;

                        //loop thru alerts associated within businesses
                        building.alerts.forEach(ele => {
                            if (ele.status === "new") newCounter++
                            else if (ele.status !== "resolved") inProgCounter++
                            else if (ele.status === "resolved") resolvedCounter++

                            if (ele.severity === 'low') severity = 'info'
                            else if (ele.severity === 'medium') severity = 'warning'
                            else if (ele.severity === 'high') severity = 'danger'
                        })

                        building["new"] = newCounter
                        building["inProgress"] = inProgCounter
                        building["resolved"] = resolvedCounter
                        building["alertType"] = severity
                        building["alertNumber"] = newCounter + inProgCounter + resolvedCounter
                        building["parentBuilding"] = pb.name
                        building["buildingId"] = building._id

                        tempPbNewAlerts += newCounter
                        tempPbInProgAlerts += inProgCounter
                        tempPbResolvedAlerts += resolvedCounter
                    })

                    tempPbTotalAlerts = tempPbNewAlerts + tempPbInProgAlerts + tempPbResolvedAlerts
                    tempParentToBuildingMap.set(pb, pb.buildings)

                    pb["alertNumber"] = tempPbTotalAlerts
                    pb["new"] = tempPbNewAlerts
                    pb["inProgress"] = tempPbInProgAlerts
                    pb["resolved"] = tempPbResolvedAlerts
                })

                this.setState({
                    parentToBuildingMap: tempParentToBuildingMap,
                    parentBuilding: res.data[1]
                })
            })
            .catch(err => {
                console.log(err)
            })

    }

    onSelectPb = (pb) => {
        this.setState({
            parentBuilding: pb
        })
    }

    render() {
        return (
            <div>
                <Typography variant="h5">
                    &nbsp;&nbsp;&nbsp;Alert History
                </Typography>
                <hr />

                <Container>
                    <Dropdown>
                        <Dropdown.Toggle
                            style={{ width: 195 }}
                            variant="success"
                            id="dropdown-basic"
                        >
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

                {/* This Card is for the building */}
                <Card className="box"
                    style={{ width: '12rem', height: '18rem', textDecoration: 'none' }}
                    text="dark"
                    onClick={() => { alert("Please click on the below displayed businesses for more details") }}
                >
                    <div style={{ maxHeight: 30, padding: 10 }}>
                        {this.state.parentBuilding.name}
                    </div>

                    {
                        this.state.parentBuilding.new > 0 &&
                        <Alert severity="error">{this.state.parentBuilding.alertNumber} Total Alerts</Alert>
                    }
                    {
                        this.state.parentBuilding.new === 0 &&
                        <Alert severity="success">{this.state.parentBuilding.alertNumber} Total Alerts</Alert>
                    }

                    <Card.Img variant="top"
                        style={{ height: '6rem' }}
                        src={this.state.parentBuilding.imageLink} />
                    <Card.Body>
                        {this.state.parentBuilding.address}
                        {
                            this.state.parentBuilding.new === 0 &&
                            <div>{this.state.parentBuilding.new} New</div>
                        }
                        {
                            this.state.parentBuilding.new > 0 &&
                            <div>{this.state.parentBuilding.new} New <MdNotificationsActive /></div>
                        }
                        {
                            this.state.parentBuilding.inProgress > -1 &&
                            <div>{this.state.parentBuilding.inProgress} In Progress</div>
                        }
                        {
                            this.state.parentBuilding.resolved > -1 &&
                            <div>{this.state.parentBuilding.resolved} Resolved</div>
                        }
                    </Card.Body>
                </Card>
                <hr />

                {/* This Card is for the businesses within the building */}
                <div className="grid">
                    {
                        this.state.parentToBuildingMap.get(this.state.parentBuilding) !== undefined &&
                        this.state.parentToBuildingMap.get(this.state.parentBuilding).map(renderCardComponent)
                    }
                </div>
            </div>
        )
    }

}

//fetch userId from redux store
const mapStateToProps = (state) => {
    const { userId } = state
    return {
        userId: userId
    }
}


export default connect(mapStateToProps)(AlertHistoryLandingPage)