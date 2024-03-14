import axios from 'axios'
import { Component } from 'react'
import { Form, Col, Button, Table } from 'react-bootstrap'
import { LOCAL_HOST, PORT } from '../constants/constants'

class AddRecordComponent extends Component {

    state = {
        serviceProvider: "Select Service Provider",
        serviceTechnician: "Select Service Technician",
        siteName: "Area 51",
        serviceCategory: "Select Service Category",
        deviceName: "Select Device",
        serviceName: []
    }

    // Set device when selected in dropdown
    onSelectDevice = (e) => {
        this.setState({
            deviceName: e.target.value
        })
    }

    onSubmit = () => {
        const payload = {
            serviceProvider: this.state.serviceProvider,
            serviceTechnician: this.state.serviceTechnician,
            siteName: this.state.siteName,
            serviceCategory: this.state.serviceCategory,
            deviceName: this.state.deviceName,
            serviceName: this.state.serviceName
        }

        // communicates with the server to create service record
        axios.post(`${LOCAL_HOST}:${PORT}/serviceRecord`, payload)
            .then(response => console.log(`Successfully sent`))
    }

    render() {
        return (
            <div className="container">
                
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Service Provider</Form.Label>
                            <Form.Control as="select"
                                defaultValue={this.state.serviceProvider}
                                onChange={(e) => { this.setState({ serviceProvider: e.target.value }) }}
                            >
                                <option>Select Service Provider</option>
                                <option>Provider 1...</option>
                                <option>Provider 2...</option>
                                <option>Provider 3...</option>
                                <option>...</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Service Technician</Form.Label>
                            <Form.Control as="select"
                                defaultValue={this.state.serviceTechnician}
                                onChange={(e) => { this.setState({ serviceTechnician: e.target.value }) }}
                            >
                                <option>Select Service Technician</option>
                                <option>Technician 1...</option>
                                <option>Technician 2...</option>
                                <option>Technician 3...</option>
                                <option>...</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Site Name</Form.Label>
                        <Form.Control
                            placeholder={this.state.siteName}
                            onChange={(e) => { this.setState({ siteName: e.target.value }) }}
                        />
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>Service Category</Form.Label>
                            <Form.Control as="select"
                                defaultValue={this.state.serviceCategory}
                                onChange={(e) => { this.setState({ serviceCategory: e.target.value }) }}
                            >
                                <option>Select Service Category</option>
                                <option>Category 1...</option>
                                <option>Category 2...</option>
                                <option>Category 3...</option>
                                <option>...</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>Device Name</Form.Label>
                            <Form.Control
                                defaultValue={this.state.deviceName}
                                onChange={e => { this.onSelectDevice(e) }}
                                as="select">
                                <option>Select Device</option>
                                <option>Thermostat</option>
                                <option>Supply Fan</option>
                                <option>Compressor</option>
                                <option>...</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    {
                        this.state.deviceName === 'Thermostat' &&
                        <Table striped bordered hover>
                            <thead>
                                <th>#</th>
                                <th>Service Name</th>
                                <th>Last Service Date</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><Form.Check type="checkbox" /></td>
                                    <td>Thermostat - Replace Batteries</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td><Form.Check type="checkbox" /></td>
                                    <td>Thermostat - Replace Thermistor</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td><Form.Check type="checkbox" /></td>
                                    <td>Thermostat - Changed Settings</td>
                                    <td></td>
                                </tr>

                            </tbody>
                        </Table>
                    }

                    <Button onClick={this.onSubmit}
                        variant="primary">
                        Add Record
                    </Button>
                </Form>

            </div>
        )
    }
}

export default AddRecordComponent