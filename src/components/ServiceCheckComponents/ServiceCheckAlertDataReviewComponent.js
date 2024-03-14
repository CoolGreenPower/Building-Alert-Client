import React from 'react'
import { Table, Button } from 'react-bootstrap'
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { LOCAL_HOST, PORT } from '../../constants/constants';
// import DummyData from '../DummyData';

export default class ServiceCheckAlertDataReviewComponent extends React.Component {

    state = {
        servicesSelected: new Set()
    }

    onUpdateAlertButtonClicked = () => {

        this.props.updateAlertButtonHandler(this.state.servicesSelected)

        axios.post(`${LOCAL_HOST}:${PORT}/alerts/updateServices`, {
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
                <Table>
                    <tbody>
                        <tr>
                            <td>
                                Target Performance
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Actual Performance
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Performance Before Service
                            </td>
                        </tr>
                    </tbody>
                </Table>

                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Button
                        style={{width:255}}
                        >
                            Service History
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={() => this.props.resolveAlertButtonHandler()}
                        style={{width:255}}
                        >
                            Resolve Alert
                        </Button>
                    </Grid>
                </Grid>


            </div>
        )
    }
}