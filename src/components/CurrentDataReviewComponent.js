import axios from 'axios'
import { Component } from 'react'
import { Container, Table, Button } from 'react-bootstrap'
import { LOCAL_HOST, PORT } from '../constants/constants'
import DummyData from './DummyData'
import { Link } from 'react-router-dom'

class CurrentDataReviewComponent extends Component {

    state = {
        updatedAt: new Date(),
        serviceDate: new Date(),
        servicesNeeded: this.props.servicesNeeded,
        responsibleParty: this.props.responsibleParty,
        showData: false,
        takeNotes: false,
        notes: ''
    }

    componentDidMount() {
        //runs when this page is reached from Start Service Component
        axios.post(`${LOCAL_HOST}:${PORT}/alerts/startService`, {
            "alertId": this.props.alertId,
            "updatedAt": new Date(),
            "status": "Service Started",
            "responsibleParty": this.props.responsibleParty,
        }, {
            headers: {
                'x-auth-token': localStorage.getItem('token'),
                'content-type': 'application/json'
            }
        })
    }

    onCurrentDataReviewButtonClicked = () => {
        this.setState({
            showData: true,
            takeNotes: false
        })
    }

    onResolveAlertButtonClicked = () => {

        this.setState({
            showData: false,
            takeNotes: true
        })

        axios.post(`${LOCAL_HOST}:${PORT}/alerts/resolve`, {
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

    onFirstResolveAlertButtonClicked = () => {
        this.setState({
            showData: false,
            takeNotes: true
        })
    }

    render() {
        return (
            <div>
                <Container>
                    <Table>
                        <thead>
                            <th>
                                You've started the following service(s):
                            </th>
                        </thead>
                        <tbody>
                            {this.state.servicesNeeded !== undefined &&
                                this.state.servicesNeeded.map(service => {
                                    return <tr>
                                        <td>
                                            {service}
                                        </td>
                                    </tr>
                                })}
                        </tbody>
                    </Table>
                    <Table bordered>
                        <tr>
                            <th>Service Date</th>
                            <td>{new Date(this.state.serviceDate).toUTCString()}</td></tr>
                        <tr>
                            <th>Responsible Party</th>
                            <td>{
                                this.state.responsibleParty !== '' &&
                                this.state.responsibleParty}</td></tr>
                    </Table>
                </Container>

                <Container
                    className="row"
                >
                    {
                        (!this.state.showData && !this.state.takeNotes) &&
                        <Button
                            onClick={() => { this.onCurrentDataReviewButtonClicked() }}>
                            Current Data Review
                        </Button>
                    }

                    {
                        this.state.showData &&
                        <DummyData />
                    }

                    {
                        this.state.takeNotes &&
                        <Table>
                            <tr>
                                <th>Notes</th>
                                <td><textarea onChange={e => this.setState({ notes: e.target.value })}></textarea></td>
                            </tr>
                            <tr>

                            </tr>
                        </Table>

                    }

                    &nbsp;

                    {
                        !this.state.takeNotes &&
                        <Button onClick={this.onFirstResolveAlertButtonClicked}>
                            Resolve Alert
                        </Button>
                    }


                    {
                        this.state.takeNotes &&
                        <Link to={"/buildingAlerts/detailedAlerts"}>
                            <div className="d-grid gap-2">
                                <Button onClick={this.onResolveAlertButtonClicked}>
                                    Resolve Alert
                                </Button>
                            </div>
                        </Link>
                    }


                </Container>
            </div>
        )
    }
}

export default CurrentDataReviewComponent