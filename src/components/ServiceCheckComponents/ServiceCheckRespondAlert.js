import axios from 'axios';
import React from 'react'
import { Container, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { LOCAL_HOST, PORT } from '../../constants/constants';
import ServiceCheckRespondAlertNotification from './ServiceCheckRespondAlertNotification';
import ServiceCheckAlertDataReviewComponent from './ServiceCheckAlertDataReviewComponent';
import SelectServicesComponent from './SelectServicesComponent';
import ServiceCheckScheduleComponent from './ServiceCheckScheduleComponent';
import StartServiceCheckComponent from './StartServiceCheckComponent';
// import CurrentDataReviewComponent from './CurrentDataReviewComponent';

class ServiceCheckRespondAlert extends React.Component {

    constructor(props) {
        super(props)

        // if (props.location.state.alert.status === 'New' || props.location.state.alert.status === 'Assigned') {
            this.state = {
                alert: props.location.state.alert,
                alertStatus: props.location.state.alert.status,
                users: [],
                isRespondAlert: true,
                isAlertDataComponent: false,
                isServicesComponent: false,
                isStartServiceComponent: false,
                isScheduleServiceComponent: false,
                isSelectServicesComponent: false,
                servicesNeeded: [],
                isCurrentDataComponent: false,
                responsibleParty: ''
            }
        // }

        if (props.location.state.alert.status === 'Investigating') {
            this.state = {
                alert: props.location.state.alert,
                alertStatus: props.location.state.alert.status,
                users: [],
                isRespondAlert: false,
                isAlertDataComponent: true,
                isServicesComponent: false,
                isStartServiceComponent: false,
                isScheduleServiceComponent: false,
                isSelectServicesComponent: false,
                servicesNeeded: [],
                isCurrentDataComponent: false,
                responsibleParty: ''
            }
        }

        else if (props.location.state.alert.status === 'Service Needed') {
            this.state = {
                alert: props.location.state.alert,
                alertStatus: props.location.state.alert.status,
                users: [],
                isRespondAlert: false,
                isAlertDataComponent: false,
                isServicesComponent: false,
                isStartServiceComponent: false,
                isScheduleServiceComponent: true,
                isSelectServicesComponent: false,
                servicesNeeded: props.location.state.alert.servicesNeeded,
                isCurrentDataComponent: false,
                responsibleParty: props.location.state.alert.responsibleParty
            }
        }

        else if (props.location.state.alert.status === 'Service Scheduled') {
            this.state = {
                alert: props.location.state.alert,
                alertStatus: props.location.state.alert.status,
                users: [],
                isRespondAlert: false,
                isAlertDataComponent: false,
                isServicesComponent: false,
                isStartServiceComponent: true,
                isScheduleServiceComponent: false,
                isSelectServicesComponent: false,
                servicesNeeded: props.location.state.alert.servicesNeeded,
                isCurrentDataComponent: false,
                responsibleParty: props.location.state.alert.responsibleParty
            }
        }

        this.handler = this.handler.bind(this)
        this.resolveAlertButtonHandler = this.resolveAlertButtonHandler.bind(this)
        this.updateAlertButtonScheduleServiceHandler = this.updateAlertButtonScheduleServiceHandler.bind(this)
        this.updateServiceCheckButtonHandler = this.updateServiceCheckButtonHandler.bind(this)
        this.updateServiceCheckButtonScheduleServiceHandler = this.updateServiceCheckButtonScheduleServiceHandler.bind(this)
        this.updateServiceCheckButtonStartServiceHandler = this.updateServiceCheckButtonStartServiceHandler.bind(this)
        this.onRespondButtonClickedHandler = this.onRespondButtonClickedHandler.bind(this)
    }

    //runs when "Alert Data Review" button is clicked in the child component - RespondAlertNotification
    handler() {
        this.setState({
            alertStatus: "Investigating",
            isRespondAlert: false,
            isAlertDataComponent: true,
            isServicesComponent: false,
            isStartServiceComponent: false,
            isCurrentDataComponent: false
        })
    }

    //runs when 'Respond' button is clicked when alert status is 'New'
    onRespondButtonClickedHandler(alertStatus) {
        this.setState({
            alertStatus: alertStatus,
        })
    }

    //runs when "Update Alert" button is clicked in the child component -
    resolveAlertButtonHandler() {
        this.setState({
            isRespondAlert: false,
            isAlertDataComponent: true,
            isSelectServicesComponent: true,
            // servicesNeeded: servicesNeeded,
            isStartServiceComponent: false,
            isCurrentDataComponent: false
        })
    }

    //runs when update service check button is clicked in Schedule Service component
    updateServiceCheckButtonScheduleServiceHandler() {
        this.setState({
            alertStatus: "Service Scheduled",
            isRespondAlert: false,
            isAlertDataComponent: false,
            isServicesComponent: false,
            isStartServiceComponent: true,
            isCurrentDataComponent: false,
            isScheduleServiceComponent: false
        })
    }

    //runs when "Update Alert" button is clicked in ScheduleService component
    updateAlertButtonScheduleServiceHandler() {
        this.setState({
            isRespondAlert: false,
            isAlertDataComponent: false,
            isServicesComponent: false,
            isStartServiceComponent: true,
            isCurrentDataComponent: false
        })
    }

    //runs when update service check button after selecting services
    updateServiceCheckButtonHandler(servicesNeeded) {
        this.setState({
            alertStatus: "Service Needed",
            isRespondAlert: false,
            isAlertDataComponent: false,
            isSelectServicesComponent: false,
            servicesNeeded: servicesNeeded,
            isStartServiceComponent: false,
            isCurrentDataComponent: false,
            isScheduleServiceComponent: true
        })
    }

    updateServiceCheckButtonStartServiceHandler(responsibleParty) {
        this.setState({
            alertStatus: "Service Started",
            responsibleParty: responsibleParty
        })
    }

    componentDidMount() {
        let usersList = []
        axios.get(`${LOCAL_HOST}:${PORT}/buildings/users/${this.state.alert.buildingId}`)
            .then(res => res.data.authorizedusers.forEach(e => {
                usersList.push(e)
            }))
            .then(x => {
                this.setState({
                    users: usersList
                })
            })
    }

    render() {
        return (
            <div>
                {/* {this.state !== null && */}
                    <Container>
                        <h3>
                            Service Check Alert
                        </h3>
                        <br />
                        <Table>
                            {
                                this.state.alert !== null &&
                                <tbody>
                                    <tr>
                                        <th>Alert ID</th>
                                        <td>{this.state.alert._id}</td>
                                    </tr>
                                    <tr>
                                        <th>Date Reported</th>
                                        <td>{this.state.alert.dateReported}</td>
                                    </tr>
                                    <tr>
                                        <th>Description</th>
                                        <td>{this.state.alert.detailedDesc}</td>
                                    </tr>

                                    {
                                        !this.state.isCurrentDataComponent &&
                                        <tr>
                                            <th>Status</th>
                                            <td>{this.state.alertStatus}</td>
                                        </tr>
                                    }
                                    {
                                        this.state.isCurrentDataComponent &&
                                        <tr>
                                            <th>Status</th>
                                            <td>Service Started</td>
                                        </tr>
                                    }
                                </tbody>
                            }

                        </Table>

                        {
                            this.state.isRespondAlert &&
                            <ServiceCheckRespondAlertNotification
                                alertId={this.state.alert._id}
                                userId={this.props.userId}
                                username={this.props.username}
                                users={this.state.users}
                                handler={this.handler}
                                onRespondButtonClickedHandler={this.onRespondButtonClickedHandler}
                            />
                        }

                        {
                            this.state.isAlertDataComponent &&
                            <ServiceCheckAlertDataReviewComponent
                                alertId={this.state.alert._id}
                                resolveAlertButtonHandler={this.resolveAlertButtonHandler}
                            />
                        }

                        {
                            this.state.isSelectServicesComponent &&
                            <SelectServicesComponent
                                alertId={this.state.alert._id}
                                resolveAlertButtonHandler={this.resolveAlertButtonHandler}
                                updateServiceCheckButtonHandler={this.updateServiceCheckButtonHandler}
                            />
                        }

                        {/* Component to help schedule service */}
                        {
                            this.state.isScheduleServiceComponent &&
                            <ServiceCheckScheduleComponent
                                alertId={this.state.alert._id}
                                users={this.state.users}
                                servicesNeeded={this.state.servicesNeeded}
                                updateServiceCheckButtonScheduleServiceHandler={this.updateServiceCheckButtonScheduleServiceHandler}
                            />
                        }

                        {
                            this.state.isStartServiceComponent &&
                            <StartServiceCheckComponent
                                alertId={this.state.alert._id}
                                users={this.state.users}
                                updateServiceCheckButtonStartServiceHandler={this.updateServiceCheckButtonStartServiceHandler}
                                isStartServiceComponent={this.state.isStartServiceComponent}
                            />
                        }

                    </Container>
                {/* } */}
            </div>
        )

    }
}

//fetch userId, username from redux store
const mapStateToProps = (state) => {
    return {
        userId: state.userId,
        username: state.username
    }
}

export default connect(mapStateToProps)(ServiceCheckRespondAlert)