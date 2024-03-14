import axios from 'axios'
import React from 'react'
import { LOCAL_HOST, PORT } from '../../constants/constants'
import { Table, Dropdown, Button, Container } from 'react-bootstrap'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'

class StartServiceCheckComponent extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            serviceDate: new Date(),
            status: '',
            updatedAt: new Date(),
            serviceTime: '',
            servicesNeeded: [],
            responsibleParty: this.props.username,
            defaultStatus: 'Start Service',
            showButtons: false,
            takeNotes: false,
            notes: ''
        }
    }

    componentDidMount() {
        axios.get(`${LOCAL_HOST}:${PORT}/serviceCheckAlerts/${this.props.alertId}`, {
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

    onUpdateServiceCheckButtonClicked = () => {
        this.props.updateServiceCheckButtonStartServiceHandler(this.state.responsibleParty)
        this.setState({
            showButtons: true
        })

        axios.post(`${LOCAL_HOST}:${PORT}/serviceCheckAlerts/updateAlert`, {
            "alertId": this.props.alertId,
            "updatedAt": new Date(),
            "status": "Service Started",
            "responsibleParty": this.state.responsibleParty
        }, {
            headers: {
                'x-auth-token': localStorage.getItem('token'),
                'content-type': 'application/json'
            }
        })
    }

    handleChange(event) {
        this.setState({
            notes: event.target.value
        })
    }

    resolveButtonHandler = () => {
        this.setState({
            showButtons: false,
            takeNotes: true
        })
    }

    onResolveAlertButtonClicked = () => {
        axios.post(`${LOCAL_HOST}:${PORT}/serviceCheckAlerts/resolve`, {
            alertId: this.props.alertId,
            responsibleParty: this.state.responsibleParty,
            status: "resolved",
            updatedAt: new Date(),
            notes: this.state.notes
        }, {
            headers: {
                'x-auth-token': localStorage.getItem('token'),
                'content-type': 'application/json'
            }
        })
            .then(res => {
                this.setState({
                    notes: ''
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
                    <h5>Services Needed</h5>
                    <Table bordered>
                        {
                            this.state.servicesNeeded.map(s => {
                                return (
                                    <tr>

                                        <td>{s}</td>
                                    </tr>
                                )
                            })
                        }
                    </Table>
                </Container>
                <Table bordered>
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
                    (!this.state.showButtons && !this.state.takeNotes) &&
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
                    (!this.state.showButtons && !this.state.takeNotes) &&
                    <div
                        variant="primary"
                        style={{ textAlign: "center" }}>
                        <div className="d-grid gap-2">
                            <Button
                                onClick={() => this.onUpdateServiceCheckButtonClicked()}
                            >
                                Update Service Check
                            </Button>
                        </div>
                    </div>
                }

                {
                    this.state.showButtons &&
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Button onClick={() => this.onResolveAlertButtonClicked()}
                                style={{ width: 255 }}
                            >
                                Current Data Review
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button onClick={() => this.resolveButtonHandler()}
                                style={{ width: 255 }}
                            >
                                Resolve
                            </Button>
                        </Grid>
                    </Grid>
                }

                {
                    this.state.takeNotes &&
                    <Container>
                        <Table>
                            <tr>
                                <th>Notes</th>
                                <td>
                                    <form onSubmit={this.handleSubmit}>
                                        <textarea
                                            type="submit"
                                            value={this.state.notes}
                                            onChange={(e) => this.handleChange(e)}
                                        />
                                    </form>
                                </td>
                            </tr>
                            <tr>

                            </tr>
                        </Table>

                        <Link to={"/serviceCheck/serviceCheckDetailedAlerts"}>
                            <div className="d-grid gap-2">
                                <Button onClick={this.onResolveAlertButtonClicked}
                                >
                                    Resolve Alert
                                </Button>
                            </div>
                        </Link>

                    </Container>
                }

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

export default connect(mapStateToProps)(StartServiceCheckComponent)