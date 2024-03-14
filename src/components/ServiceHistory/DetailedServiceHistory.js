import axios from 'axios';
import { LOCAL_HOST, PORT } from '../../constants/constants';
import { Container, Dropdown, Table, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Component } from 'react';

class DetailedServiceHistory extends Component {

    state = {
        dropDownPbName: '',
        dropDownbuildingName: '',
        dropDownCategory: '',
        dropDownDeviceName: '',
        pbBuilding: new Map(),
        buildingToCategory: new Map(),
        alertCategoryToAlert: new Map(),
        devicesToAlertsMap: new Map(),
        showAlerts: false,
        showServiceRecord: false,
        currAlert: {}
    }

    //runs when the page loads
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
                //buildings(pb) to business map
                let pbBuildingMap = new Map()

                //business to categories map
                let buildingToCategoryMap = new Map()

                //categories to alerts map
                let alertCategoryToAlertMap = new Map()

                //loop thru parent buildings (buildings)
                res.data.forEach(pb => {

                    if (this.state.dropDownPbName === '') {
                        this.setState({
                            dropDownPbName: pb.name
                        })
                    }

                    //loop thru businesses
                    for (let i = 0; i < pb.buildings.length; i++) {
                        let currBuilding = pb.buildings[i]

                        // console.log("currBuilding", currBuilding)
                        //construct pbBuildingMap
                        if (pbBuildingMap.has(pb.name)) {
                            pbBuildingMap.get(pb.name).push(currBuilding)
                        } else {
                            let val = []
                            val.push(currBuilding)
                            pbBuildingMap.set(pb.name, val)
                        }

                        //construct buildingToCategoryMap
                        //loop thru serviceCheckAlerts
                        currBuilding.serviceCheckAlerts.forEach(scAlert => {
                            if (buildingToCategoryMap.has(currBuilding.name)) {
                                if (buildingToCategoryMap.get(currBuilding.name).indexOf(scAlert.alertCategory) < 0) {
                                    buildingToCategoryMap.get(currBuilding.name).push(scAlert.alertCategory)
                                }
                            } else {
                                let val = []
                                val.push(scAlert.alertCategory)
                                buildingToCategoryMap.set(currBuilding.name, val)
                            }

                            //construct alertCategoryToAlertMap
                            //also add deviceName to alertCategory
                            scAlert["deviceName"] = scAlert.device.name
                            const clonedMap = new Map(this.state.devicesToAlertsMap)

                            //perfect to create deviceToAlertMap- access to both alerts and device here
                            if (clonedMap.has(scAlert.device.name)) {
                                clonedMap.get(scAlert.device.name).push(scAlert)
                            } else {
                                let val = []
                                val.push(scAlert)
                                clonedMap.set(scAlert.device.name, val)
                            }

                            this.setState({
                                devicesToAlertsMap: clonedMap
                            })

                            if (alertCategoryToAlertMap.has(scAlert.alertCategory)) {
                                alertCategoryToAlertMap.get(scAlert.alertCategory).push(scAlert)
                            } else {
                                let val = []
                                val.push(scAlert)
                                alertCategoryToAlertMap.set(scAlert.alertCategory, val)
                            }

                        })
                    }
                })

                this.setState({
                    dropDownbuildingName: pbBuildingMap.get(this.state.dropDownPbName)[0].name,
                    pbBuilding: pbBuildingMap,
                    buildingToCategory: buildingToCategoryMap,
                    alertCategoryToAlert: alertCategoryToAlertMap
                })

            })
    }

    componentDidUpdate(prevProps, prevState) {

        if (prevState.dropDownPbName !== this.state.dropDownPbName) {
            if (this.state.pbBuildingMap !== undefined) {
                this.setState({
                    dropDownbuildingName: this.state.pbBuilding.get(this.state.dropDownPbName)[0]
                })
            }
        }

        if (prevState.dropDownbuildingName !== this.state.dropDownbuildingName) {
            if (this.state.buildingToCategory.get(this.state.dropDownbuildingName) !== undefined) {
                this.setState({
                    dropDownCategory: this.state.buildingToCategory.get(this.state.dropDownbuildingName)[0]
                })
            } else {
                this.setState({
                    dropDownCategory: 'None'
                })
            }
        }

        if (prevState.dropDownCategory !== this.state.dropDownCategory) {
            if (this.state.alertCategoryToAlert.get(this.state.dropDownCategory) !== undefined) {
                this.setState({
                    dropDownDeviceName: this.state.alertCategoryToAlert.get(this.state.dropDownCategory)[0].deviceName,
                    showAlerts: true,
                    showServiceRecord: false
                })
            } else {
                this.setState({
                    dropDownDeviceName: 'None'
                })
            }
        }


    }

    //function that runs when pb is selected from dropdown
    onSelectPb = (pbName) => {
        this.setState({
            dropDownPbName: pbName,
            dropDownbuildingName: this.state.pbBuilding.get(pbName)[0].name
        })
    }

    //function that runs when building is selected from dropdown
    onSelectBuilding = (building) => {
        this.setState({
            dropDownbuildingName: building.name,
            dropDownbuildingId: building._id,
            // dropDownCategory: '',
            // dropDownDeviceName: ''
        })
    }

    onSelectCategory = (category) => {
        this.setState({
            dropDownCategory: category,
            dropDownDeviceName: this.state.alertCategoryToAlert.get(category)[0].deviceName
        })
    }

    onSelectDeviceName = (deviceName) => {
        this.setState({
            showAlerts: true,
            dropDownDeviceName: deviceName,
            showServiceRecord: false
        })
    }

    onServiceRowClick = (alert) => {
        this.setState({
            showServiceRecord: true,
            currAlert: alert
        })
    }

    render() {
        return <div>

            <Table bordered>
                <tr>
                    <td>
                        <Dropdown>
                            <Dropdown.Toggle
                                style={{ width: 216 }}
                                // variant="success"
                                id="dropdown-basic"
                            >
                                {this.state.dropDownPbName}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {
                                    Array.from(this.state.pbBuilding.keys()).length > 0 &&
                                    Array.from(this.state.pbBuilding.keys()).map(pbName => {
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

                    <td>
                        <Dropdown>
                            <Dropdown.Toggle
                                style={{ width: 216 }}
                                id="dropdown-basic">
                                {this.state.dropDownbuildingName}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {
                                    this.state.pbBuilding.get(this.state.dropDownPbName) !== undefined &&
                                    this.state.pbBuilding.get(this.state.dropDownPbName).map(building => {
                                        return (
                                            <Dropdown.Item
                                                onSelect={() => this.onSelectBuilding(building)}
                                            >
                                                {building.name}
                                            </Dropdown.Item>
                                        )
                                    })
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </td>
                </tr>
            </Table>

            <Table bordered>
                <tr>
                    <td>
                        <Dropdown>
                            <Dropdown.Toggle
                                style={{ width: 500 }}
                                id="dropdown-basic">
                                {this.state.dropDownCategory}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {
                                    this.state.buildingToCategory.get(this.state.dropDownbuildingName) !== undefined &&
                                    this.state.buildingToCategory.get(this.state.dropDownbuildingName).map(category => {
                                        return (
                                            <Dropdown.Item
                                                onSelect={() => this.onSelectCategory(category)}
                                            >
                                                {category}
                                            </Dropdown.Item>
                                        )
                                    })
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </td>
                </tr>

                <tr>
                    <td>
                        <Dropdown>
                            <Dropdown.Toggle
                                style={{ width: 500 }}
                                id="dropdown-basic">
                                {this.state.dropDownDeviceName}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {
                                    this.state.alertCategoryToAlert.get(this.state.dropDownCategory) !== undefined &&
                                    this.state.alertCategoryToAlert.get(this.state.dropDownCategory).map(alert => {
                                        return (
                                            <Dropdown.Item
                                                onSelect={() => this.onSelectDeviceName(alert.deviceName)}
                                            >
                                                {alert.deviceName}
                                            </Dropdown.Item>
                                        )
                                    })
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </td>
                </tr>
            </Table>

            <Container>
                <Table bordered>
                    {
                        this.state.showAlerts &&
                        <tr>
                            <th>Date</th>
                            <th>Responsible Party</th>
                        </tr>
                    }
                    {
                        (this.state.showAlerts && this.state.devicesToAlertsMap.get(this.state.dropDownDeviceName) !== undefined) &&
                        this.state.devicesToAlertsMap.get(this.state.dropDownDeviceName).map(alert => {
                            return (
                                <tr onClick={() => this.onServiceRowClick(alert)}>
                                    <td>{new Date(alert.updatedAt).toUTCString()}</td>
                                    <td>{alert.responsibleParty}</td>
                                </tr>
                            )
                        })
                    }
                </Table>
            </Container>

            <Container>
                <Table bordered>
                    {
                        this.state.showServiceRecord &&
                        <tr>
                            <th>Service Record</th>
                        </tr>
                    }

                    {
                        this.state.showServiceRecord &&
                        this.state.currAlert.servicesNeeded.map(service => {
                            return (
                                <tr>
                                    <td>{service}</td>
                                </tr>
                            )
                        })
                    }
                </Table>



                <Link to={"/addRecord"}
                    style={{ textDecoration: 'none' }}>
                    <div className="d-grid gap-2">
                        <Button>
                            New Service
                        </Button>
                    </div>
                </Link>
            </Container>

        </div>
    }


}

//fetch userId, alertCategory, businessName, building, businessId from redux store
const mapStateToProps = (state) => ({
    alertCategory: state.alertCategory,
    userId: state.userId,
    siteName: state.siteName,
    parentBuilding: state.parentBuilding,
    buildingId: state.buildingId
})

export default connect(mapStateToProps)(DetailedServiceHistory)