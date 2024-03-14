import axios from 'axios'
import React from 'react'
import { LOCAL_HOST, PORT } from '../constants/constants'
import { Table, Dropdown, Button } from 'react-bootstrap'
import { connect } from 'react-redux'

import AssignDropdown from './AssignDopdown'
import ConfirmationBanner from './ConfirmationBanner'

class StartServiceComponent extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            serviceDate: new Date(),
            status: '',
            updatedAt: new Date(),
            serviceTime: '',
            servicesNeeded: [],
            responsibleParty: this.props.username,
            defaultStatus: 'Start Service'
        }
    }

    componentDidMount() {
        axios.get(`${LOCAL_HOST}:${PORT}/alerts/${this.props.alertId}`, {
            headers: {
                'x-auth-token': localStorage.getItem('token'),
                'content-type': 'application/json'
            }
        })
            .then(res => {
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

    onUpdateAlertButtonClicked = () => {
        this.props.updateAlertButtonStartServiceHandler(this.state.responsibleParty)
    }

    render() {
        return (
            <>
                {/* <div>
                    <Table bordered>
                        {
                            this.state.servicesNeeded.map(s => {
                                return (
                                    <tr>
                                        <th>Service</th>
                                        <td>{s}</td>
                                    </tr>
                                )
                            })
                        }
                        <tr>
                            <th>Status Updated At</th>
                            <td>{new Date(this.state.updatedAt).toUTCString()}</td></tr>
                        <tr>
                            <th>Scheduled Date</th>
                            <td>{new Date(this.state.serviceDate).toDateString()}</td></tr>
                        <tr>
                            <th>Scheduled Time</th>
                            <td>{this.state.serviceTime}</td></tr>
                        <tr>
                            <th>Responsible Party</th>
                            <td>{this.state.responsibleParty}</td></tr>
                    </Table>

                    {
                        this.props.isStartServiceComponent &&
                        <Table bordered>
                            <tr>
                                <th>
                                    Status
                                </th>
                                <td>
                                    <Dropdown>
                                        <Dropdown.Toggle
                                            style={{ width: 150 }}
                                        >
                                            {this.state.defaultStatus}
                                        </Dropdown.Toggle>
                                    </Dropdown>
                                </td>
                            </tr>
                            <tr>
                                <th>Assign To</th>
                                <td>
                                    <Dropdown>
                                        <Dropdown.Toggle
                                            style={{ width: 150 }}
                                        >
                                            {this.state.responsibleParty}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {
                                                this.props.users.map(user => {
                                                    return (
                                                        <Dropdown.Item
                                                            onSelect={() => this.setState({ responsibleParty: user.username })}
                                                        >
                                                            {user.username}
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

                    {
                        this.props.isStartServiceComponent &&
                        <div
                            variant="primary"
                            style={{ textAlign: "center" }}>
                            <div className="d-grid gap-2">
                                <Button
                                    onClick={() => this.onUpdateAlertButtonClicked()}
                                >
                                    Update Alert
                                </Button>
                            </div>
                        </div>
                    }

                </div> */}
                <div class="xs:tw-w-[90%] md:tw-w-[75%]">
                    <div className="tw-overflow-hidden tw-bg-white tw-shadow sm:tw-rounded-lg">
                        <div className="tw-border-t tw-border-gray-200"></div>
                        <div className="tw-bg-white tw-border-b tw-px-4 tw-py-5 sm:tw-grid sm:tw-grid-cols-3 sm:tw-gap-4 sm:tw-px-6">
                            <dt className="hover:tw-cursor-default tw-text-sm tw-font-medium tw-text-gray-500">Service</dt>
                            <dd className="tw-mb-0 tw-mt-1 tw-text-sm tw-text-gray-900 sm:tw-col-span-2 sm:tw-mt-0">
                                {
                                    this.state.servicesNeeded.map(s => {
                                        return (
                                            <td>{s}</td>
                                        )
                                    })
                                }
                            </dd>
                        </div>

                        <div className="tw-bg-white tw-border-b tw-px-4 tw-py-5 sm:tw-grid sm:tw-grid-cols-3 sm:tw-gap-4 sm:tw-px-6">
                            <dt className="hover:tw-cursor-default tw-text-sm tw-font-medium tw-text-gray-500">Status Updated At</dt>
                            <dd className="tw-mb-0 tw-mt-1 tw-text-sm tw-text-gray-900 sm:tw-col-span-2 sm:tw-mt-0">
                                {
                                    this.state.servicesNeeded.map(s => {
                                        return (
                                            <td>{s}</td>
                                        )
                                    })
                                }
                            </dd>
                        </div>

                        <div className="tw-bg-white tw-border-b tw-px-4 tw-py-5 sm:tw-grid sm:tw-grid-cols-3 sm:tw-gap-4 sm:tw-px-6">
                            <dt className="hover:tw-cursor-default tw-text-sm tw-font-medium tw-text-gray-500">Schedule Date</dt>
                            <dd className="tw-mb-0 tw-mt-1 tw-text-sm tw-text-gray-900 sm:tw-col-span-2 sm:tw-mt-0">
                                {
                                    this.state.servicesNeeded.map(s => {
                                        return (
                                            <td>{s}</td>
                                        )
                                    })
                                }
                            </dd>
                        </div>

                        <div className="tw-bg-white tw-border-b tw-px-4 tw-py-5 sm:tw-grid sm:tw-grid-cols-3 sm:tw-gap-4 sm:tw-px-6">
                            <dt className="hover:tw-cursor-default tw-text-sm tw-font-medium tw-text-gray-500">Schedule Time</dt>
                            <dd className="tw-mb-0 tw-mt-1 tw-text-sm tw-text-gray-900 sm:tw-col-span-2 sm:tw-mt-0">
                                {
                                    this.state.servicesNeeded.map(s => {
                                        return (
                                            <td>{s}</td>
                                        )
                                    })
                                }
                            </dd>
                        </div>

                        <div className="tw-bg-white tw-border-b tw-px-4 tw-py-5 sm:tw-grid sm:tw-grid-cols-3 sm:tw-gap-4 sm:tw-px-6">
                            <dt className="hover:tw-cursor-default tw-text-sm tw-font-medium tw-text-gray-500">Responsible Party</dt>
                            <dd className="tw-mb-0 tw-mt-1 tw-text-sm tw-text-gray-900 sm:tw-col-span-2 sm:tw-mt-0">
                                {
                                    this.state.servicesNeeded.map(s => {
                                        return (
                                            <td>{s}</td>
                                        )
                                    })
                                }
                            </dd>
                        </div>

                        <div className="tw-z-50 tw-bg-white tw-border-b tw-px-4 tw-py-5 sm:tw-grid sm:tw-gap-4 sm:tw-px-6">
                            <dt className="hover:tw-cursor-default tw-text-sm tw-font-medium tw-text-gray-500">Status</dt>
                            <div class="tw-flex xs:tw-mt-2 md:tw-mt-0 tw-items-center">
                                <AssignDropdown updateParent={this.updateName}/>
                            </div>
                        </div>

                        <div className="tw-z-50 tw-bg-white tw-border-b tw-px-4 tw-py-5 sm:tw-grid sm:tw-gap-4 sm:tw-px-6">
                            <dt className="hover:tw-cursor-default tw-text-sm tw-font-medium tw-text-gray-500">Assign To</dt>
                            <div class="tw-flex xs:tw-mt-2 md:tw-mt-0 tw-items-center">
                                <AssignDropdown updateParent={this.updateName}/>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

//fetch username from redux store
const mapStateToProps = (state) => {
    return {
        username: state.username
    }
}

export default connect(mapStateToProps)(StartServiceComponent)