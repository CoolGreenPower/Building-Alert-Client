import axios from 'axios';
import React from 'react'
import { LOCAL_HOST, PORT } from '../../constants/constants';
import { Container, Dropdown, Table, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Alert from '@material-ui/lab/Alert';

class ServiceCheckDetailedAlerts extends React.Component {

    state = {
        //alerts contains mapping of the type "Thermostat" : [alert1, alert2, .....]
        alerts: [],
        categoriesForCurrBuilding: [],
        dropdownSiteName: this.props.siteName,
        buildingAlertCategoryAlertsMap: new Map(),
        currCategory: "None",
        isSubTable: false,
        alertDesc: {},
        active: 'white',
        map: new Map()
    }

    onSelectBuilding = (building) => {
        this.setState({
            dropdownSiteName: building,
            categoriesForCurrBuilding: Array.from(this.state.buildingAlertCategoryAlertsMap.get(building).keys()),
            currCategory: Array.from(this.state.buildingAlertCategoryAlertsMap.get(building).keys())[0],
            alerts: this.state.buildingAlertCategoryAlertsMap.get(building).get(Array.from(this.state.buildingAlertCategoryAlertsMap.get(building).keys())[0]),
            isSubTable: false
        })
    }

    //runs when a category is selected from dropDown
    onCategorySelected = (category) => {
        this.setState({
            currCategory: category,
            alerts: this.state.buildingAlertCategoryAlertsMap.get(this.state.dropdownSiteName).get(category),
            isSubTable: false
        })
    }

    alertsBySites = (building) => {
        //loop through the alerts, make a map of site -> alertCategory
        //we're creating a map of a map here

        let key = building.name
        let buildingId = building._id
        let innerMap = new Map()
        let tempMap = new Map(this.state.map)

        //loop thru the alerts to form the inner map of alertCategory: alerts
        for (let j = 0; j < building.serviceCheckAlerts.length; j++) {
            let currAlert = building.serviceCheckAlerts[j]
            let innerKey = currAlert.alertCategory
            currAlert["buildingId"] = buildingId

            if (innerMap.has(innerKey)) {
                innerMap.get(innerKey).push(currAlert)
            } else {
                let innerVal = []
                innerVal.push(currAlert)
                innerMap.set(innerKey, innerVal)
            }
        }

        tempMap.set(key, innerMap)

        this.setState({
            map: tempMap
        })
    }

    onMainTableRowClicked = (alert) => {
        this.setState({
            isSubTable: true,
            alertDesc: alert,
            active: 'lightblue'
        })
        setTimeout(() => {
            this.setState({
                active: 'white'
            })
        }, 1000)
    }

    componentDidMount() {
        //Fetch all serviceCheckAlerts from all the buildings associated with this userid
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
                //loop thru buildings
                res.data.forEach(pb => {
                    //loop thru businesses
                    pb.buildings.forEach(building => {
                        if (building.serviceCheckAlerts.length > 0) {
                            this.alertsBySites(building)
                        }
                    })
                })
            })

            .then(() => {
                this.setState({
                    dropdownSiteName: this.props.siteName,
                    currCategory: this.props.alertCategory,
                    alerts: this.state.map.get(this.props.siteName).get(this.props.alertCategory),
                    buildingAlertCategoryAlertsMap: this.state.map,
                    categoriesForCurrBuilding: Array.from(this.state.map.get(this.props.siteName).keys())
                })
            })
    }

    render() {
        return <div>

            <Container>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Dropdown>
                        <Dropdown.Toggle
                            style={{ width: 260 }}
                            variant="success"
                            id="dropdown-basic">
                            {this.state.dropdownSiteName}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                Array.from(this.state.buildingAlertCategoryAlertsMap.keys()).length > 0 &&
                                Array.from(this.state.buildingAlertCategoryAlertsMap.keys()).map(building => {
                                    return (
                                        <Dropdown.Item
                                            onSelect={() => this.onSelectBuilding(building)}
                                        >
                                            {building}
                                        </Dropdown.Item>
                                    )
                                }
                                )
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                    &nbsp;
                    <Dropdown>
                        <Dropdown.Toggle
                            style={{ width: 260 }}
                            variant="success"
                            id="dropdown-basic">
                            {this.state.currCategory}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {

                                this.state.categoriesForCurrBuilding.map(category => {
                                    return (
                                        <Dropdown.Item
                                            onSelect={() => { this.onCategorySelected(category) }}
                                        >
                                            {category}
                                        </Dropdown.Item>
                                    )
                                })
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </Container>

            <br />
            <Container>
                <Table>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Short Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (this.state.alerts !== undefined && this.state.alerts.length > 0) &&
                            this.state.alerts.map(alert => {
                                if (alert.status !== 'resolved') {
                                    return (
                                        <tr onClick={() => this.onMainTableRowClicked(alert)}>
                                            <td>
                                                {alert.type}
                                            </td>
                                            <td>
                                                {alert.shortDesc}
                                            </td>
                                        </tr>
                                    )
                                }
                            })
                        }
                    </tbody>
                </Table>
            </Container>

            {
                this.state.isSubTable &&
                <Container>
                    <Table>
                        {/* <thead> */}
                        <h5>Alert Details</h5>

                        {/* </thead> */}
                        <tbody>
                            <tr>
                                <td style={{ backgroundColor: 'lightgrey', width: 145 }}>Alert ID</td>
                                <td style={{ backgroundColor: this.state.active }}>
                                    {this.state.alertDesc._id}</td>
                            </tr>
                            <tr>
                                <td style={{ backgroundColor: 'lightgrey' }}>Status</td>

                                {
                                    this.state.alertDesc.status === 'new' &&
                                    <td style={{ backgroundColor: this.state.active }}>
                                        <Alert severity="error">New</Alert>
                                    </td>
                                }

                                {
                                    this.state.alertDesc.status !== 'new' &&
                                    <td style={{ backgroundColor: this.state.active }}>
                                        {this.state.alertDesc.status}
                                    </td>
                                }

                            </tr>
                            <tr>
                                <td style={{ backgroundColor: 'lightgrey' }}>Building</td>
                                <td style={{ backgroundColor: this.state.active }}>
                                    {this.state.dropdownSiteName} </td>
                            </tr>
                            <tr>
                                <td style={{ backgroundColor: 'lightgrey' }}>Date Reported</td>
                                <td style={{ backgroundColor: this.state.active }}>
                                    {this.state.alertDesc.dateReported}</td>
                            </tr>
                            <tr>
                                <td style={{ backgroundColor: 'lightgrey' }}>Description</td>
                                <td style={{ backgroundColor: this.state.active }}>
                                    {this.state.alertDesc.detailedDesc}</td>
                            </tr>
                        </tbody>
                    </Table>

                    <Link to={{
                        pathname: "/serviceCheck/respondAlert",
                        state: {
                            alert: this.state.alertDesc
                        }
                    }}
                        style={{ textDecoration: 'none' }}>
                        <div className="d-grid gap-2">
                            <Button
                                variant="primary">
                                Respond Alert
                            </Button>
                        </div>
                    </Link>


                </Container>
            }
            <br />
            <Container>

                <Link to={{
                    pathname: "/serviceCheck"
                }}
                    style={{ textDecoration: 'none' }}>
                    <div className="d-grid gap-2">
                        <Button
                            variant="primary">
                            Main Menu
                        </Button>
                    </div>
                </Link>

            </Container>


        </div>
    }
}

//fetch userId, business name from redux store
const mapStateToProps = (state) => ({
    alertCategory: state.alertCategory,
    userId: state.userId,
    siteName: state.siteName
})

export default connect(mapStateToProps)(ServiceCheckDetailedAlerts)