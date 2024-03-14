import React from "react"
import axios from 'axios'
import { LOCAL_HOST, PORT } from '../constants/constants'

import AssignDropdown from './AssignDopdown'
import ConfirmationBanner from './ConfirmationBanner'

import './RespondAlertNotification.css'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


var isBannerHidden = "tw-hidden"
export default class RespondAlertNotification extends React.Component {
    state = {
        assigned: this.props.username,
        isHidden: "tw-hidden"
    }

    
    onRespondButtonClicked = () => {
        // alert('This alert is being assigned to you, ' + assigned)
        this.props.onRespondButtonClickedHandler("Assigned")

        axios.post(`${LOCAL_HOST}:${PORT}/alerts/startService`, {
            "alertId": this.props.alertId,
            "updatedAt": new Date(),
            "status": "Assigned",
            "priority": 2.1,
            "responsibleParty": this.state.assigned
        }, {
            headers: {
                'x-auth-token': localStorage.getItem('token'),
                'content-type': 'application/json'
            }
        })
        .then((res) => {
        });
        this.state.isHidden = "show"
    }

    updateName = (person) => {
        this.setState({assigned: person.name})
    }
    
    render() {
        return (
            <>
            {/* <div>
                <Table>
                    <tr>
                        <th>Assign to</th>
                        <td>{this.props.username}</td>
                        <td>
                            <Button
                                onClick={this.onRespondButtonClicked}
                                variant="success"
                                size="lg">
                                Respond
                            </Button>
                        </td>
                    </tr>
                </Table>
                <Table>
                    <th>
                        Notification
                    </th>
                    <tbody>
                        {
                            this.props.users !== null &&
                            this.props.users.map(user => {
                                return (
                                    <tr>
                                        {user.userCategory === "owner" &&
                                            <td>Owner</td>
                                        }
                                        {user.userCategory === "technician" &&
                                            <td>Technician</td>
                                        }
                                        <td>{user.username}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
                <div className="d-grid gap-2">
                    <Button
                        onClick={this.props.handler}
                    >
                        Alert Data Review
                    </Button>
                </div>

            </div> */}
                {/* <div class="tw-flex tw-col-span-2 tw-items-center tw-pb-32">
                    <AssignDropdown />
                    <button onClick={this.RespondAlertNotification} class="tw-col-span-2 tw-bg-blue-100 hover:tw-bg-blue-200 tw-transition-all tw-px-4 tw-py-2 tw-rounded-md tw-w-fit">
                        <p class="tw-text-blue-500 tw-text-sm tw-font-semibold tw-m-0 tw-p-0">Assign</p>
                    </button>
                </div> */}
                <div className="tw-z-50 tw-bg-white tw-border-b tw-px-4 tw-py-5 sm:tw-grid sm:tw-gap-4 sm:tw-px-6">
                    <dt className="hover:tw-cursor-default tw-text-sm tw-font-medium tw-text-gray-500">Assign Alert</dt>
                    <div class="tw-flex xs:tw-mt-2 md:tw-mt-0 tw-items-center">
                        <AssignDropdown updateParent={this.updateName}/>
                        <div class="tw-flex xs:tw-justify-center lg:tw-justify-start tw-ml-6">
                            <button onClick={this.onRespondButtonClicked} class=" tw-bg-blue-100 hover:tw-bg-blue-200 tw-transition-all tw-px-10 tw-py-3 tw-rounded-md lg:tw-w-fit tw-h-fit">
                                <p class="tw-text-blue-500 tw-text-sm tw-font-semibold tw-m-0 tw-p-0">Assign</p>
                            </button>
                        </div>
                    </div>
                    <div class={this.state.isHidden + " "}>
                        <ConfirmationBanner name={this.state.assigned}/>
                    </div>
                </div>
            </>
        )
    }
}