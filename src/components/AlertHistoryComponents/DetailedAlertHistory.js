/**
 * Class to display more details about a specific alert
 */

import axios from 'axios';
import React from 'react'
import { LOCAL_HOST, PORT } from '../../constants/constants';
import { Container, Dropdown, Table, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import DatePicker from "react-datepicker";

class DetailedAlertHistory extends React.Component {

    // make a map of pb -> building-> category

    constructor(props) {
        super(props)

        this.state = {
            pbBuildingMap: new Map(),
            dropDownPb: this.props.parentBuilding,
            dropDownbuilding: this.props.siteName,
            dropDownbuildingId: this.props.buildingId,
            category: 'Thermal Comfort',
            severity: 'High',
            startDate: new Date().setDate(-30),
            toDate: new Date(),
            alertId: '',
            shortDesc: '',
            createdAt: '',
            resolvedAt: '',
            showAlert: false,
            showDesc: false,
            alerts: [],
            currAlert: {},
            showMainTable: true,
            isExpand: false,
            showFetch: false
        }
    }

    onClickBackButton = () => {
        this.setState({
            showMainTable: true,
            showDesc: false,
            isExpand: false,
            showAlert: false
        })
    }

    //fetch all alerts on component mount
    componentDidMount() {
        //fetch all alerts belonging to all buildings which this particular userid is tied to
        axios.post(`${LOCAL_HOST}:${PORT}/alerts/buildings`,
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
                //a map with key={pb.name} value = {building.name}
                let map = new Map()

                //loop thru parent buildings
                res.data.forEach(pb => {
                    //loop thru buildings
                    for (let i = 0; i < pb.buildings.length; i++) {
                        let currBuilding = pb.buildings[i]

                        //creating a map of buildings -> businesses
                        if (map.has(pb.name)) {
                            map.get(pb.name).push(currBuilding)
                        } else {
                            let val = []
                            val.push(currBuilding)
                            map.set(pb.name, val)
                        }
                    }
                })

                //set state with newly created map
                this.setState({
                    pbBuildingMap: map
                })

            })
    }

    //function to fetch alerts from server
    //runs when 'Fetch Alerts' button is pressed
    fetchAlerts = () => {
        this.setState({
            showAlert: true
        })

        //find all alerts satisfying the following conditions
        axios.post(`${LOCAL_HOST}:${PORT}/alerts/conditionalAlerts`,
            {
                buildingId: this.state.dropDownbuildingId,
                alertCategory: this.state.category,
                severity: this.state.severity,
                fromDate: this.state.startDate,
                toDate: this.state.toDate
            },
            //authentication
            {
                headers: {
                    'x-auth-token': localStorage.getItem('token'),
                    'content-type': 'application/json'
                }
            })
            .then(res => this.setState({
                alerts: res.data
            }))
    }

    //function that runs when pb is selected from dropdown
    onSelectPb = (pbName) => {
        this.setState({
            dropDownPb: pbName,
            dropDownbuilding: this.state.pbBuildingMap.get(pbName)[0].name,
            showFetch: true
        })
    }

    //function that runs when building is selected from dropdown
    onSelectBuilding = (building) => {
        this.setState({
            dropDownbuilding: building.name,
            dropDownbuildingId: building._id,
            showFetch: true
        })
    }

    //runs when category is selected from dropdown
    onSelectCategory = (category) => {
        this.setState({
            category: category,
            showFetch: true
        })
    }

    //runs when severity is clicked
    onSelectSeverity = (severity) => {
        this.setState({
            severity: severity,
            showFetch: true
        })
    }

    //runs when a row is clicked
    onAlertTableRowClicked = (alert) => {
        this.setState({
            showDesc: true,
            currAlert: alert,
        })
    }

    //runs when 'expand' button is clicked
    onExpandButtonClicked = () => {
        this.setState({
            showMainTable: false,
            isExpand: true
        })
    }

    render() {
        return (
            <div>
                {/* Table of dropdowns */}
                {
                    this.state.showMainTable &&
                    <Table bordered>
                        <tr>
                            <td>
                                {/* Dropdown to select building */}
                                <Dropdown>
                                    <Dropdown.Toggle
                                        style={{ width: 216 }}
                                        id="dropdown-basic"
                                    >
                                        {this.state.dropDownPb}
                                    </Dropdown.Toggle>
                                    {/* Fill the dropdown with all the  buildings*/}
                                    <Dropdown.Menu>
                                        {
                                            Array.from(this.state.pbBuildingMap.keys()).length > 0 &&
                                            Array.from(this.state.pbBuildingMap.keys()).map(pbName => {
                                                return (
                                                    <Dropdown.Item
                                                        onSelect={() => this.onSelectPb(pbName)}
                                                    >
                                                        {pbName}
                                                    </Dropdown.Item>
                                                )
                                            })
                                        }
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>

                            {/* Dropdown to select business within the building */}
                            <td>
                                <Dropdown>
                                    <Dropdown.Toggle
                                        style={{ width: 216 }}
                                        id="dropdown-basic">
                                        {this.state.dropDownbuilding}
                                    </Dropdown.Toggle>
                                    {/* Fill the dropdown with all businesses tied to the selected buildings */}
                                    <Dropdown.Menu>
                                        {
                                            this.state.pbBuildingMap.get(this.state.dropDownPb) !== undefined &&
                                            this.state.pbBuildingMap.get(this.state.dropDownPb).map(building => {
                                                return (
                                                    <Dropdown.Item
                                                        onSelect={() => this.onSelectBuilding(building)}
                                                    >
                                                        {building.name}
                                                        {/* {console.log("building", building)} */}
                                                    </Dropdown.Item>
                                                )
                                            })
                                        }
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>
                        </tr>
                    </Table>
                }

                {/* Table of filters */}
                {
                    // main table is the table that contains all the filters in the dropdown
                    // This table is hidden when the "Expand" button is clicked
                    this.state.showMainTable &&
                    <Container>
                        <Table bordered>
                            <tr>
                                <td>
                                    Alert Category
                                </td>
                                <td>
                                    <Dropdown>
                                        <Dropdown.Toggle
                                            style={{ width: 216 }}
                                            id="dropdown-basic"
                                        >
                                            {this.state.category}
                                        </Dropdown.Toggle>
                                        {/* The 4 categories to choose from */}
                                        <Dropdown.Menu>
                                            <Dropdown.Item onSelect={() => this.onSelectCategory("Thermal Comfort")}>Thermal Comfort</Dropdown.Item>
                                            <Dropdown.Item onSelect={() => this.onSelectCategory("Health & Safety")}>Health & Safety</Dropdown.Item>
                                            <Dropdown.Item onSelect={() => this.onSelectCategory("Service Check")}>Service Check</Dropdown.Item>
                                            <Dropdown.Item onSelect={() => this.onSelectCategory("Energy Efficiency")}>Energy Efficiency</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                            </tr>
                            <tr>
                                <td>Severity</td>
                                <td>
                                    <Dropdown>
                                        <Dropdown.Toggle
                                            style={{ width: 216 }}
                                            id="dropdown-basic"
                                        >
                                            {this.state.severity}
                                        </Dropdown.Toggle>
                                        {/* Severities to choose from */}
                                        <Dropdown.Menu>
                                            <Dropdown.Item onSelect={() => this.onSelectSeverity("High")}>High</Dropdown.Item>
                                            <Dropdown.Item onSelect={() => this.onSelectSeverity("Medium")}>Medium</Dropdown.Item>
                                            <Dropdown.Item onSelect={() => this.onSelectSeverity("Low")}>Low</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                            </tr>

                            {/* Alert from date */}
                            <tr>
                                <td>From</td>
                                <td>
                                    <DatePicker
                                        selected={this.state.startDate}
                                        onChange={(date) => { this.setState({ startDate: date }) }} />
                                </td>
                            </tr>

                            {/* Alert to date */}
                            <tr>
                                <td>To</td>
                                <td>
                                    <DatePicker
                                        selected={this.state.toDate}
                                        onChange={(date) => { this.setState({ toDate: date }) }} />
                                </td>
                            </tr>


                        </Table>
                        {/* Button that triggers the query to fetch alerts */}

                        <div className="d-grid gap-2">
                            <Button
                                onClick={() => this.fetchAlerts()}
                            >
                                Fetch Alerts
                            </Button>
                        </div>

                    </Container>
                }

                {
                    this.state.showAlert &&
                    <Container>
                        <Table bordered>
                            <thead>
                                <th>Date</th>
                                <th>Alert Id</th>
                            </thead>
                            <tbody>
                                {
                                    this.state.alerts.length > 0 &&
                                    this.state.alerts.map(alert => {
                                        return (
                                            <tr onClick={() => this.onAlertTableRowClicked(alert)}>
                                                <td>{new Date(alert.createdAt).toUTCString()}</td>
                                                <td>{alert._id}</td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </Table>
                    </Container>
                }

                {
                    this.state.showDesc &&
                    <Container>
                        {/* This table displays Date and Alert Id details of alerts which were queried */}
                        <Table>
                            <tr><td>Alert Id</td><td>{this.state.currAlert._id}</td></tr>
                            <tr><td>Short Description</td><td>{this.state.currAlert.shortDesc}</td></tr>
                            <tr><td>Created On</td><td>{new Date(this.state.currAlert.createdAt).toUTCString()}</td></tr>
                            {/* If the alert is resolved */}
                            {
                                this.state.currAlert.status === "resolved" &&
                                <tr><td>Resolved On</td><td>{new Date(this.state.currAlert.updatedAt).toUTCString()}</td></tr>
                            }
                            {/* If the alert is not resolved */}
                            {
                                this.state.currAlert.status !== "resolved" &&
                                <tr><td>Updated On</td><td>{new Date(this.state.currAlert.updatedAt).toUTCString()}</td></tr>
                            }


                        </Table>

                        {
                            this.state.showMainTable &&
                            <div className="d-grid gap-2">
                                <Button onClick={() => this.onExpandButtonClicked()}>
                                    Expand
                                </Button>
                            </div>
                        }
                    </Container>

                }

                {/* True (displayed) when expand button is pressed */}
                {
                    this.state.isExpand &&
                    <Container>
                        <Table bordered>
                            <tr>
                                <td>
                                    Responsible Party
                                </td>
                                <td>
                                    {
                                        this.state.currAlert.responsibleParty
                                    }
                                </td>
                            </tr>

                        </Table>
                        <Table bordered>
                            <thead>
                                <th>
                                    Services Performed
                                </th>
                            </thead>
                            <tbody>
                                {
                                    this.state.currAlert.servicesNeeded.map(s => {
                                        return (
                                            <tr>
                                                <td>
                                                    {s}
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                        <Table>
                            <tbody>
                                <tr>
                                    <td>
                                        Notes
                                    </td>
                                    <td>
                                        {this.state.currAlert.notes}
                                    </td>
                                </tr>

                                {
                                    this.state.currAlert.status === "resolved" &&
                                    <tr>
                                        <th>
                                            Resolved
                                        </th>
                                        <td>
                                            {this.state.currAlert.updatedAt}
                                        </td>
                                    </tr>
                                }

                            </tbody>
                        </Table>

                        {
                            this.state.currAlert.status !== "resolved" &&
                            <tr>This alert still in progress</tr>
                        }

                        <div className="d-grid gap-2">
                            <Button onClick={this.onClickBackButton}>
                                Back
                            </Button>
                        </div>

                    </Container>
                }

            </div>
        )
    }
}

//fetch alertCategory, userId, businessName, building, buildingId from redux store
const mapStateToProps = (state) => ({
    alertCategory: state.alertCategory,
    userId: state.userId,
    siteName: state.siteName,
    parentBuilding: state.parentBuilding,
    buildingId: state.buildingId
})

export default connect(mapStateToProps)(DetailedAlertHistory)