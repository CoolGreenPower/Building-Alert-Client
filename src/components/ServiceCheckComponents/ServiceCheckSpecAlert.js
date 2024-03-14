import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ServiceCheckColorCardComponent from "./ServiceCheckColorCardComponent";

export default function SpecAlerts(props) {

    const location = useLocation()
    const { alerts } = location.state
    const [alertsMap, setAlertsMap] = useState(new Map())
    const [valuesFromMap, setValuesFromMap] = useState([])

    useEffect(() => {

        let tempMap = new Map()
        tempMap.set("HVAC", {
            idx: 1,
            alertAlerts: 0,
            checkingAlerts: 0,
            alerts: [],
            totalAlerts: 0,
            alertCategory: "HVAC",
            cardColor: "info"
        })
        tempMap.set("Thermostat", {
            idx: 2,
            alertAlerts: 0,
            checkingAlerts: 0,
            alerts: [],
            totalAlerts: 0,
            alertCategory: "Thermostat",
            cardColor: "danger"
        })
        tempMap.set("Air Quality", {
            idx: 3,
            alertAlerts: 0,
            checkingAlerts: 0,
            alerts: [],
            totalAlerts: 0,
            alertCategory: "Air Quality",
            cardColor: "warning"
        })
        tempMap.set("Data Loggers", {
            idx: 4,
            alertAlerts: 0,
            checkingAlerts: 0,
            alerts: [],
            totalAlerts: 0,
            alertCategory: "Data Loggers",
            cardColor: "success"
        })

        for (let i = 0; i < alerts.length; i++) {

            let currAlert = tempMap.get(alerts[i].alertCategory)
            if (alerts[i].status !== 'resolved') {
                // console.log('currAlert', currAlert)
                currAlert.totalAlerts++


                if (alerts[i].type === 'Alert') currAlert.alertAlerts++
                else if (alerts[i].type === 'Checking') currAlert.checkingAlerts++
            }

            currAlert.alerts.push(alerts[i])

        }

        // console.log('tempMap', tempMap)
        setAlertsMap(tempMap)
        setValuesFromMap(Array.from(tempMap.values()))
    }, [])

    const renderColorCardComponent = (variant) => {

        return (<div>
            <ServiceCheckColorCardComponent
                key={variant.idx}
                alertCategory={variant.alertCategory}
                totalAlerts={variant.totalAlerts}
                alertAlerts={variant.alertAlerts}
                checkingAlerts={variant.checkingAlerts}
                alerts={variant.alerts}
                cardColor={variant.cardColor}
            />
        </div>
        )
    }

    return (
        // {/* render businesses as cards */}
        <div className="grid">
            {
                valuesFromMap.length > 0 &&
                valuesFromMap.map(renderColorCardComponent)
            }
        </div>
    )
}