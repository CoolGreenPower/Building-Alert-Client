import axios from 'axios';
import React from 'react'
import { Container, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { LOCAL_HOST, PORT } from '../constants/constants';
import RespondAlertNotification from './RespondAlertNotification';
import AlertDataReviewComponent from './AlertDataReviewComponent';
import ServiceScheduleComponent from './ServiceScheduleComponent';
import StartServiceComponent from './StartServiceComponent';
import CurrentDataReviewComponent from './CurrentDataReviewComponent';

import AssignDropdown from './AssignDopdown'

class RespondAlert extends React.Component {

    constructor(props) {
        console.log("HERE HERE HERE")
        console.log(props.location.state);

        super(props)

        if (props.location.state.alert.status === 'Service Needed') {
            this.state = {
                alert: props.location.state.alert,
                alertStatus: props.location.state.alert.status,
                users: [],
                isRespondAlert: false,
                isAlertDataComponent: false,
                isServicesComponent: true,
                isStartServiceComponent: false,
                servicesNeeded: [],
                isCurrentDataComponent: false,
                responsibleParty: ''
            }
        }

        else if (props.location.state.alert.status === 'Service Started') {

            this.state = {
                alert: props.location.state.alert,
                alertStatus: props.location.state.alert.status,
                users: [],
                isRespondAlert: false,
                isAlertDataComponent: false,
                isServicesComponent: false,
                isStartServiceComponent: false,
                servicesNeeded: props.location.state.alert.servicesNeeded,
                isCurrentDataComponent: true,
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
                isCurrentDataComponent: false,
                responsibleParty: ''
            }
        }

        else {
            this.state = {
                alert: props.location.state.alert,
                alertStatus: props.location.state.alert.status,
                users: [],
                isRespondAlert: true,
                isAlertDataComponent: false,
                isServicesComponent: false,
                isStartServiceComponent: false,
                servicesNeeded: [],
                isCurrentDataComponent: false,
                responsibleParty: ''
            }
        }

        this.handler = this.handler.bind(this)
        this.updateAlertButtonHandler = this.updateAlertButtonHandler.bind(this)
        this.updateAlertButtonScheduleServiceHandler = this.updateAlertButtonScheduleServiceHandler.bind(this)
        this.updateAlertButtonStartServiceHandler = this.updateAlertButtonStartServiceHandler.bind(this)
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
            alertStatus: alertStatus
        })

    }

    //runs when "Update Alert" button is clicked in the child component - 
    updateAlertButtonHandler(servicesNeeded) {
        this.setState({
            alertStatus: "Service Needed",
            isRespondAlert: false,
            isAlertDataComponent: false,
            isServicesComponent: true,
            servicesNeeded: servicesNeeded,
            isStartServiceComponent: false,
            isCurrentDataComponent: false
        })
    }

    //runs when "Update Alert" button is clicked in ScheduleService component
    updateAlertButtonScheduleServiceHandler() {
        this.setState({
            alertStatus: "Service Scheduled",
            isRespondAlert: false,
            isAlertDataComponent: false,
            isServicesComponent: false,
            isStartServiceComponent: true,
            isCurrentDataComponent: false
        })
    }

    updateAlertButtonStartServiceHandler(responsibleParty) {
        this.setState({
            isRespondAlert: false,
            isAlertDataComponent: false,
            isServicesComponent: false,
            isStartServiceComponent: false,
            isCurrentDataComponent: true,
            responsibleParty: responsibleParty
        })
    }

    componentDidMount() {
        window.scrollTo({top:0, left:0, behavior: "instant"});

        let usersList = []
        axios.get(`${LOCAL_HOST}:${PORT}/buildings/users/${this.props.location.state.alert.buildingId}`)
            .then(res => res.data.authorizedusers.forEach(e => {
                usersList.push(e)
            }))
            .then(x => {
                this.setState({
                    users: usersList
                })
            })

        axios.get(`${LOCAL_HOST}:${PORT}/alerts/${this.props.alertId}`, {
            headers: {
                'x-auth-token': localStorage.getItem('token'),
                'content-type': 'application/json'
            }
        })
        
        .then(res => {
            console.log(res);
            this.setState({
                status: res.data.status,
                updatedAt: res.data.updatedAt,
                serviceDate: res.data.serviceDate,
                serviceTime: res.data.serviceTime,
                servicesNeeded: res.data.servicesNeeded,
                responsibleParty: res.data.responsibleParty
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render() {
        return (
            <div>
                <Container>
                    {/* <Table>
                        <th>
                            Alert Response
                        </th>
                        <tbody>
                            <tr>
                                <th>Alert ID</th>
                                <td>{this.state.alert._id}</td>
                            </tr>
                            <tr>
                                <th>Date Reported</th>
                                <td>{new Date(this.state.alert.dateReported).toUTCString()}</td>
                            </tr>
                            <tr>
                                <th>Description</th>
                                <td>{this.state.alert.detailedDesc}</td>
                            </tr>

                            {
                                (!this.state.isCurrentDataComponent) &&
                                <tr>
                                    <th>Status</th>

                                    {this.state.alertStatus === 'new' &&
                                        <td>New</td>}

                                    {this.state.alertStatus !== 'new' &&
                                        <td>{this.state.alertStatus}</td>}

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
                    </Table> */}
                    <div>
                    <div class="tw-flex tw-mt-10 tw-justify-center tw-pb-16">
                        <div class="xs:tw-w-[90%] md:tw-w-[75%]">
                            <div className="tw-overflow-hidden tw-bg-white tw-shadow sm:tw-rounded-lg">
                                <div className="tw-px-4 tw-py-5 sm:tw-px-6 hover:tw-cursor-default">
                                    <h3 className="tw-text-lg tw-font-medium tw-leading-6 tw-text-gray-900">Alert Response</h3>
                                    <p className="tw-mt-1 tw-max-w-2xl tw-text-sm tw-text-gray-500">Respond to the selected alert.</p>
                                </div>
                                <div className="tw-border-t tw-border-gray-200">
                                    {
                                        this.state.isRespondAlert &&
                                        <RespondAlertNotification
                                            alertId={this.state.alert._id}
                                            userId={this.props.userId}
                                            username={this.props.username}
                                            users={this.state.users}
                                            handler={this.handler}
                                            onRespondButtonClickedHandler={this.onRespondButtonClickedHandler}
                                        />
                                    }
                                    {/* {
                                        this.state.isStartServiceComponent &&
                                        <StartServiceComponent
                                            alertId={this.state.alert._id}
                                            users={this.state.users}
                                            updateAlertButtonStartServiceHandler={this.updateAlertButtonStartServiceHandler}
                                            isStartServiceComponent={this.state.isStartServiceComponent}
                                        />
                                    } */}
                                    <dl class="tw-mb-0">
                                    <div className="tw-bg-white tw-border-b tw-px-4 tw-py-5 sm:tw-grid sm:tw-grid-cols-3 sm:tw-gap-4 sm:tw-px-6">
                                        <dt className="hover:tw-cursor-default tw-text-sm tw-font-medium tw-text-gray-500">Alert ID</dt>
                                        <dd className="tw-mb-0 tw-mt-1 tw-text-sm tw-text-gray-900 sm:tw-col-span-2 sm:tw-mt-0">{this.state.alert._id}</dd>
                                    </div>
                                    <div className="tw-bg-white tw-border-b tw-px-4 tw-py-5 sm:tw-grid sm:tw-grid-cols-3 sm:tw-gap-4 sm:tw-px-6">
                                        <dt className="hover:tw-cursor-default tw-text-sm tw-font-medium tw-text-gray-500">Date Reported</dt>
                                        <dd className="tw-mb-0 tw-mt-1 tw-text-sm tw-text-gray-900 sm:tw-col-span-2 sm:tw-mt-0">{new Date(this.state.alert.dateReported).toUTCString()}</dd>
                                    </div>
                                    <div className="tw-bg-white tw-border-b tw-px-4 tw-py-5 sm:tw-grid sm:tw-grid-cols-3 sm:tw-gap-4 sm:tw-px-6">
                                        <dt className="hover:tw-cursor-default tw-text-sm tw-font-medium tw-text-gray-500">Description</dt>
                                        <dd className="tw-mb-0 tw-mt-1 tw-text-sm tw-text-gray-900 sm:tw-col-span-2 sm:tw-mt-0">{this.state.alert.detailedDesc}</dd>
                                    </div>
                                    <div className="tw-bg-white tw-border-b tw-px-4 tw-py-5 sm:tw-grid sm:tw-grid-cols-3 sm:tw-gap-4 sm:tw-px-6">
                                    <dt className="hover:tw-cursor-default tw-text-sm tw-font-medium tw-text-gray-500">Status</dt>
                                        <dd className="tw-mb-0 tw-mt-1 tw-text-sm tw-text-gray-900 sm:tw-col-span-2 sm:tw-mt-0">
                                            {this.state.alertStatus === 'new' && <p>New</p>}
                                            {this.state.alertStatus !== 'new' && this.state.alertStatus}
                                        </dd>
                                    </div>
                                    <div className="tw-bg-white tw-border-b tw-px-4 tw-py-5 sm:tw-grid sm:tw-grid-cols-3 sm:tw-gap-4 sm:tw-px-6">
                                        <dt className="hover:tw-cursor-default tw-text-sm tw-font-medium tw-text-gray-500">Services Needed</dt>
                                        <dd className="tw-mb-0 tw-mt-1 tw-text-sm tw-text-gray-900 sm:tw-col-span-2 sm:tw-mt-0">{
                                                this.state.servicesNeeded && this.state.servicesNeeded.map(s => {
                                                    return (
                                                        {s}
                                                    )
                                                })
                                        }</dd>
                                    </div>
                                    </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="tw-flex tw-justify-center tw-pb-10">
                    {/* {
                        this.state.isRespondAlert &&
                        <RespondAlertNotification
                            alertId={this.state.alert._id}
                            userId={this.props.userId}
                            username={this.props.username}
                            users={this.state.users}
                            handler={this.handler}
                            onRespondButtonClickedHandler={this.onRespondButtonClickedHandler}
                        />
                    } */}

                    {
                        this.state.isAlertDataComponent &&
                        <AlertDataReviewComponent
                            alertId={this.state.alert._id}
                            updateAlertButtonHandler={this.updateAlertButtonHandler}
                        />
                    }

                    {
                        this.state.isServicesComponent &&
                        <ServiceScheduleComponent
                            alertId={this.state.alert._id}
                            users={this.state.users}
                            servicesNeeded={this.state.servicesNeeded}
                            updateAlertButtonScheduleServiceHandler={this.updateAlertButtonScheduleServiceHandler}
                        />
                    }

                    {
                        this.state.isStartServiceComponent &&
                        <StartServiceComponent
                            alertId={this.state.alert._id}
                            users={this.state.users}
                            updateAlertButtonStartServiceHandler={this.updateAlertButtonStartServiceHandler}
                            isStartServiceComponent={this.state.isStartServiceComponent}
                        />
                        
                    }

                    {
                        this.state.isCurrentDataComponent &&
                        <CurrentDataReviewComponent
                            alertId={this.state.alert._id}
                            responsibleParty={this.state.responsibleParty}
                            servicesNeeded={this.state.servicesNeeded}
                        />
                    }
                    </div>

                </Container>
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

export default connect(mapStateToProps)(RespondAlert)