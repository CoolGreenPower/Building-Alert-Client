import React, { useEffect, useState } from "react";
import TabComponent from '../Common/TabComponent';
import UtilityGraph from './UtilityGraph';
import Network from "../../services/Network";
import StorageService from "../../services/StorageService";
import DataFetcher from "../../services/DataFetcher";
import { getHeadersWithToken } from "../../utils/Utility";

export default function UtilityBill() {

    const Tab = ({ children }) => {
        return <div>{children}</div>;
    };

    const [graphData, setGraphData] = useState([]);
    const [utility, setUtility] = useState("Electricity");
    // const [conversions, setConversions] = useState([]);

    function getDates() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // Month is zero-based

        // Ensure the month and day are formatted with leading zeros if needed
        const formattedMonth = month < 10 ? `0${month}` : month;
        const formattedDay = '01'; // Always start from the first day of the month

        // Get the last day of the current month
        const lastDay = new Date(year, month, 0).getDate();

        // Format the last day with leading zeros if needed
        const formattedLastDay = lastDay < 10 ? `0${lastDay}` : lastDay;

        // Build the query string
        const queryString = `start_date=${year}-${formattedMonth}-${formattedDay}&end_date=${year}-${formattedMonth}-${formattedLastDay}`;
        return queryString;
    }

    console.log("formatted date:", getDates());

    useEffect(() => {
        const storageService = new StorageService();
        const headers = getHeadersWithToken(localStorage.getItem("token"));
        const endPoint = '/api/utilities/consumption/6480e9b116e6088380430b97?' + getDates();
        const network = new Network(headers, {});
        const fetcher = new DataFetcher(
            network,
            storageService,
        );

        console.log("endPoint:", endPoint);
        fetcher
            .getData(
                endPoint
            )
            .then((res) => {
                console.log("data:", res.data);
                if (res.status === 200) {
                    setGraphData(res.data);
                } else {
                    console.log("error:", res.data);
                    setGraphData([]);
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);


    const waterUnitConversion = {
        'Cubic Feet': 1,
        'Gallons': 7.48052,
        'Thousand Gallons': 7480.52,
        'HCF': 748.052
    }
    const electricityUnitConversion = {
        'kWh': 1,
        'MWh': 1000,
        'GWh': 1000000
    }
    const gasUnitConversion = {
        'Therms': 1,
        'Cubic Feet': 1,
        'Gallons': 1
    }

    var utilityData = null;
    var conversions = null;
    if (utility === "Electricity") {
        utilityData = graphData.filter((data) => data['logType'] === "energy");
        conversions = electricityUnitConversion;
    }
    else if (utility === "Water") {
        utilityData = graphData.filter((data) => data['logType'] === "water");
        conversions = waterUnitConversion;
    }
    else if (utility === "Gas") {
        utilityData = graphData.filter((data) => data['logType'] === "gas");
        conversions = gasUnitConversion;
    }

    return (
        <div className='bg-white w-full md:mt-0 xs:mt-14'>
            <h6 className='text-primaryColor p-2'>{"Home > Utility Bill"}</h6>
            <div>
                <div className='flex p-2 justify-center'>
                    <h6 className='font-bold text-primaryColor'>Type of Utility Bill</h6>
                </div>
                <TabComponent
                    onTabSelected={(label) => setUtility(label)}>
                    <Tab label="Electricity">
                        <UtilityGraph
                            unit="Kwh"
                            data={utilityData}
                            conversions={conversions}
                            selectedUnit={Object.keys(electricityUnitConversion)[0]}
                            utility={utility} />
                    </Tab>
                    <Tab label="Water">
                        <UtilityGraph
                            unit="Gallons"
                            conversions={conversions}
                            selectedUnit={Object.keys(waterUnitConversion)[0]}
                            data={utilityData}
                            utility={utility} />
                    </Tab>
                    <Tab label="Gas">
                        <UtilityGraph
                            unit="Kwh"
                            conversions={conversions}
                            data={utilityData}
                            selectedUnit={Object.keys(gasUnitConversion)[0]}
                            utility={utility} />
                    </Tab>
                </TabComponent>
            </div>
            {/* <UtilityGraph utility="water" /> */}
        </div>
    );
}