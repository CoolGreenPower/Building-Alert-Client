import React from 'react'
import { Container, Table, Button, Dropdown } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import "react-datepicker/dist/react-datepicker.css";
import { connect } from 'react-redux';
import axios from 'axios';
import { LOCAL_HOST, PORT } from '../../constants/constants';

class ServiceCheckScheduleComponent extends React.Component {

    state = {
        startDate: new Date(),
        startTime: "22:15:00",
        defaultUser: this.props.username
    }

    onUpdateServiceCheckButtonClicked = () => {
        this.props.updateServiceCheckButtonScheduleServiceHandler()

        axios.post(`${LOCAL_HOST}:${PORT}/serviceCheckAlerts/scheduleService`, {
            "alertId": this.props.alertId,
            "serviceDate": this.state.startDate,
            "serviceTime": this.state.startTime,
            "responsibleParty": this.state.defaultUser,
            "status": "Service Scheduled",
            "updatedAt": new Date()
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
                <Container>
                    <Table>
                        <thead>
                            <th>
                                You've selected the following services:
                            </th>
                        </thead>
                        <tbody>
                            {Array.from(this.props.servicesNeeded).map(service => {
                                return <tr>
                                    <td>
                                        {service}
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </Table>

                    <Table>
                        <thead>
                            <th>
                                Schedule Service
                            </th>
                        </thead>
                        <tbody>
                            <tr>
                                <th>Date</th>
                                <td><DatePicker
                                    selected={this.state.startDate}
                                    onChange={(date) => { this.setState({ startDate: date }) }} /></td>
                            </tr>
                            <tr>
                                <th>Time</th>
                                <td>
                                    <TimePicker
                                        disableClock={true}
                                        value={this.state.startTime}
                                        onChange={(value) => this.setState({ startTime: value })}
                                    />

                                </td>
                            </tr>
                            <tr>
                                <th>Responsible Party</th>
                                {/* <td>{this.props.username}</td> */}
                                <td>
                                    <Dropdown>
                                        <Dropdown.Toggle
                                            style={{ width: 150 }}
                                        >
                                            {this.state.defaultUser}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {
                                                // this.props.
                                                this.props.users.map(user => {
                                                    return (
                                                        <Dropdown.Item
                                                            onSelect={() => this.setState({ defaultUser: user.username })}
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
                        </tbody>
                    </Table>

                    <div className="d-grid gap-2">
                        <Button
                            onClick={() => this.onUpdateServiceCheckButtonClicked()}
                        >
                            Update Service Check
                        </Button>
                    </div>
                </Container>
            </div>
        )
    }
}

//fetch username from redux store
const mapStateToProps = (state) => {
    return {
        username: state.username
    }
}

export default connect(mapStateToProps)(ServiceCheckScheduleComponent)
