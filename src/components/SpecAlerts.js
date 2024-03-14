import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ColorCardComponent from "./ColorCardComponent";

export default function SpecAlerts(props) {

    const location = useLocation()
    const { alerts } = location.state
    const [alertsMap, setAlertsMap] = useState(new Map())
    const [valuesFromMap, setValuesFromMap] = useState([])

    //initially set all colored cards to default values

    useEffect(() => {

        let tempMap = new Map()

        tempMap.set("Health & Safety", {
            idx: 1,
            newAlerts: 0,
            inProgAlerts: 0,
            alerts: [],
            totalAlerts: 0,
            alertCategory: "Health & Safety",
            cardColor: "info"
        })

        tempMap.set("Service Check", {
            idx: 1,
            newAlerts: 0,
            inProgAlerts: 0,
            alerts: [],
            totalAlerts: 0,
            alertCategory: "Service Check",
            cardColor: "warning"
        })

        tempMap.set("Thermal Comfort", {
            idx: 1,
            newAlerts: 0,
            inProgAlerts: 0,
            alerts: [],
            totalAlerts: 0,
            alertCategory: "Thermal Comfort",
            cardColor: "danger"
        })

        tempMap.set("Energy Efficiency", {
            idx: 1,
            newAlerts: 0,
            inProgAlerts: 0,
            alerts: [],
            totalAlerts: 0,
            alertCategory: "Energy Efficiency",
            cardColor: "success"
        })

        for (let i = 0; i < alerts.length; i++) {
            //here
            // if alert present in map already
            let currAlert = tempMap.get(alerts[i].alertCategory)
            currAlert.totalAlerts++ 

            if (alerts[i].status === 'new') currAlert.newAlerts++
            else if (alerts[i].status !== 'resolved') currAlert.inProgAlerts++

            if (alerts[i].status === 'resolved') currAlert.totalAlerts--

            //change card color if needed

            currAlert.alerts.push(alerts[i])

            //adding a new element to the map

        }

        // console.log('tempMap', tempMap)
        setAlertsMap(tempMap)
        setValuesFromMap(Array.from(tempMap.values()))
    }, [])

    const renderColorCardComponent = (variant) => {
        return (<div class="">
            <ColorCardComponent
                key={variant.idx}
                alertCategory={variant.alertCategory}
                totalAlerts={variant.totalAlerts}
                newAlerts={variant.newAlerts}
                inProgAlerts={variant.inProgAlerts}
                alerts={variant.alerts}
                cardColor={variant.cardColor}
            />
        </div>
        )
    }

    return (
        <div class="tw-flex tw-justify-center tw-pt-10">
            {/* render businesses as cards */}
            <div class="tw-w-full tw-max-w-md tw-grid tw-grid-cols-2 tw-place-items-center tw-gap-2">
                {
                    valuesFromMap.length > 0 &&
                    valuesFromMap.map(renderColorCardComponent)
                }
            </div>
        </div>

    )
}