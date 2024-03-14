import React from 'react'
import { Container, Table, Button } from 'react-bootstrap'
import { Checkbox } from '@material-ui/core';
import axios from 'axios';
import { LOCAL_HOST, PORT } from '../../constants/constants';

export default class SelectServicesComponent extends React.Component {

    state = {
        servicesSelected: new Set()
    }

    onUpdateServiceCheckButtonClicked = () => {

        this.props.updateServiceCheckButtonHandler(this.state.servicesSelected)

        axios.post(`${LOCAL_HOST}:${PORT}/serviceCheckAlerts/updateServices`, {
            "alertId": this.props.alertId,
            "servicesNeeded": Array.from(this.state.servicesSelected),
            "status": "Service Needed"
        }, {
            headers: {
                'x-auth-token': localStorage.getItem('token'),
                'content-type': 'application/json'
            }
        })
    }

    onCheckBoxClicked = (e) => {

        const checkedValue = e.target.value
        let clonedSet = new Set(this.state.servicesSelected)

        if (clonedSet.has(checkedValue)) {
            clonedSet.delete(checkedValue)
        } else {
            clonedSet.add(checkedValue)
        }

        this.setState({
            servicesSelected: clonedSet
        })
    }

    render() {
        return (
            <div>

                <Container>
                    <Table>
                        <thead>
                            <th>Select Services Needed</th>
                        </thead>
                        <tbody>
                            <tr>
                                <Checkbox
                                    value="Thermostat - Replace Batteries"
                                    onChange={(e) => this.onCheckBoxClicked(e)}
                                />
                                Thermostat - Replace Batteries
                            </tr>
                            <tr>
                                <Checkbox
                                    value="Thermostat - Replace Thermistor"
                                    onChange={(e) => this.onCheckBoxClicked(e)}
                                />
                                Thermostat - Replace Thermistor
                            </tr>
                            <tr>
                                <Checkbox
                                    value="Thermostat - Change Settings"
                                    onChange={(e) => this.onCheckBoxClicked(e)}
                                />
                                Thermostat - Change Settings
                            </tr>
                        </tbody>
                    </Table>

                    <div className="d-grid gap-2">
                        <Button onClick={() => this.onUpdateServiceCheckButtonClicked()}>
                            Update Service Check
                        </Button>
                    </div>



                </Container>
            </div>
        )
    }
}