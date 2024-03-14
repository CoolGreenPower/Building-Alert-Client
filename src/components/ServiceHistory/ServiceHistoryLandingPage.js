/**
 * Class that represents the landing page of Service History
 */

import { Component } from 'react'
import axios from 'axios'
import { LOCAL_HOST, PORT } from '../../constants/constants'
import { connect } from 'react-redux'
import { Typography } from '@material-ui/core';
import { Container, Dropdown } from 'react-bootstrap'
import CardComponent from './CardComponent';

/**
 * Function to render businesses as cards
 * Cards display dates of the oldest and the newest alert, 
 * along with an image of the building
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
                latest={variant.latest}
                oldest={variant.oldest}
            />
        </div>
    )
}

class ServiceCheckComponent extends Component {

    state = {
        parentBuilding: '',
        parentToBuildingMap: new Map()
    }

    // run when page loads
    componentDidMount() {

        const tempParentToBuildingMap = new Map()
        let tempPbAlerts = 0;
        let tempPbCheckings = 0;
        let tempPbTotalAlerts = 0;

        //fetch all service check alerts belonging to all buildings which this particular userid is tied to
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

                        let first = new Date()
                        let min = Number.MIN_VALUE
                        let max = Number.MAX_VALUE
                        let latest = new Date()
                        let oldest = new Date()

                        // loop thru alerts to find the latest and oldest alert dates
                        for (let i = 0; i < business.serviceCheckAlerts.length; i++) {
                            let date = new Date(business.serviceCheckAlerts[i].updatedAt)

                            let diff = first - date

                            if (business.serviceCheckAlerts[i].type === "Checking") checkingCounter++
                            if (business.serviceCheckAlerts[i].type === "Alert") alertCounter++

                            if (diff > min) {
                                min = diff
                                latest = date
                            }

                            if (diff < max) {
                                max = diff
                                oldest = date
                            }
                        }

                        business["checking"] = checkingCounter
                        business["alert"] = alertCounter
                        business["totalAlerts"] = checkingCounter + alertCounter
                        business["latest"] = latest.toDateString()
                        business["oldest"] = oldest.toDateString()

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
                &nbsp;&nbsp;&nbsp;Service History
            </Typography>

            <Container>
                <Dropdown>
                    {/* Drop down to select building */}
                    <Dropdown.Toggle
                        style={{ width: 216 }}>
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

            {/* Component for the building which contains businesses */}
            <div className="grid">
                {
                    this.state.parentBuilding !== '' &&
                    <CardComponent
                        key={0}
                        alerts={''}
                        alertType={''}
                        totalAlerts={this.state.parentBuilding["totalAlerts"]}
                        status={''}
                        name={this.state.parentBuilding.name}
                        imageLink={this.state.parentBuilding.imageLink}
                        alert={this.state.parentBuilding["alert"]}
                        checking={this.state.parentBuilding["checking"]}
                        address={this.state.parentBuilding.address}
                    />
                }
            </div>

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

// fetch userId from redux store
const mapStateToProps = (state) => {
    const { userId } = state
    return {
        userId: userId
    }
}

export default connect(mapStateToProps)(ServiceCheckComponent)