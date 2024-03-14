import { Component } from 'react'
import CardComponent from './CardComponent'
import './Tiles.css'

let serviceCheckArr = [{
    idx: "1",
    mainAlert: "serviceCheck",
    alertType: "success",
    alertNumber: "2",
    alertTitle: "Thermostat",
    subAlertsNew: "1",
    subAlertsInProgress: "0"
}, {
    idx: "2",
    mainAlert: "serviceCheck",
    alertType: "info",
    alertNumber: "1",
    alertTitle: "HVAC",
    subAlertsNew: "1",
    subAlertsInProgress: "0"
}, {
    idx: "3",
    mainAlert: "serviceCheck",
    alertType: "warning",
    alertNumber: "4",
    alertTitle: "Air Quality",
    subAlertsNew: "1",
    subAlertsInProgress: "0"
}, {
    idx: "4",
    mainAlert: "serviceCheck",
    alertType: "danger",
    alertNumber: "3",
    alertTitle: "Sensors",
    subAlertsNew: "1",
    subAlertsInProgress: "0"
},
]

/**
 * Function to render businesses as cards
 * Cards display In Progress and New Alerts
 */
const renderCardComponent = (variant) => {
    return (
        <div>
            <CardComponent
                key={variant.idx}
                mainAlert={variant.mainAlert}
                alertType={variant.alertType}
                alertNumber={variant.alertNumber}
                alertTitle={variant.alertTitle}
                subAlertsNew={variant.subAlertsNew}
                subAlertsInProgress={variant.subAlertsInProgress}
            />
        </div>
    )
}

class ServiceCheckComponent extends Component {
    render() {
        return (
            <div>
                <h1>
                    Service Check
                </h1>
                <div className="grid">
                    {serviceCheckArr.map(renderCardComponent)}
                </div>
            </div>

        )
    }
}

export default ServiceCheckComponent