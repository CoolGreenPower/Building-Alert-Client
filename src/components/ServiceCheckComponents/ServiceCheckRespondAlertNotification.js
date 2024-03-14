import React from "react"
import { Table, Button } from "react-bootstrap"
import axios from 'axios'
import { LOCAL_HOST, PORT } from '../../constants/constants'

export default class RespondAlertNotification extends React.Component {

    onRespondButtonClicked = () => {
        alert('This alert is being assigned to you')
        this.props.onRespondButtonClickedHandler("Assigned")

        axios.post(`${LOCAL_HOST}:${PORT}/serviceCheckAlerts/updateAlert`, {
            "alertId": this.props.alertId,
            "updatedAt": new Date(),
            "status": "Assigned",
            "responsibleParty": this.props.username
        }, {
            headers: {
                'x-auth-token': localStorage.getItem('token'),
                'content-type': 'application/json'
            }
        })
    }

    onServiceCheckReviewButtonClicked = () => {
        this.props.handler()

        axios.post(`${LOCAL_HOST}:${PORT}/serviceCheckAlerts/updateAlert`, {
            "alertId": this.props.alertId,
            "updatedAt": new Date(),
            "status": "Investigating",
            "responsibleParty": this.props.username
        }, {
            headers: {
                'x-auth-token': localStorage.getItem('token'),
                'content-type': 'application/json'
            }
        })
    }

    render() {
        return (
            <div>
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
                        onClick={this.onServiceCheckReviewButtonClicked}
                    >
                        Service Check Review
                    </Button>
                </div>

            </div>
        )
    }
}