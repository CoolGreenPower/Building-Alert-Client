import axios from 'axios';
import React from 'react'
import { PROD_API, LOCAL_HOST, PORT } from '../constants/constants';
import { Container, Dropdown, Table, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Alert from '@material-ui/lab/Alert';
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { PaperClipIcon } from '@heroicons/react/20/solid'
import ReactPlaceholder from 'react-placeholder';
import { useLocation } from 'react-router-dom'
import StorageService from '../services/StorageService';
import { getHeadersWithToken } from '../utils/Utility';
import Network from '../services/Network';
import DataFetcher from '../services/DataFetcher';

import './DetailedAlerts.css'


var CustomSkeleton = (
    <tbody>
        <tr class="tw-bg-white tw-border-b hover:tw-bg-gray-100 hover:tw-transition-all tw-transition-all">
            <th><div class=" tw-px-6 tw-h-2 tw-animate-pulse tw-bg-gray-200 tw-rounded-full tw-max-w-full tw-m-2.5"></div></th>
            <th><div class=" tw-px-6 tw-h-2 tw-animate-pulse tw-bg-gray-200 tw-rounded-full tw-max-w-full tw-m-2.5"></div></th>
        </tr>
        <tr class="tw-bg-white tw-border-b hover:tw-bg-gray-100 hover:tw-transition-all tw-transition-all">
            <th><div class=" tw-px-6 tw-h-2 tw-animate-pulse tw-bg-gray-200 tw-rounded-full tw-max-w-full tw-m-2.5"></div></th>
            <th><div class=" tw-px-6 tw-h-2 tw-animate-pulse tw-bg-gray-200 tw-rounded-full tw-max-w-full tw-m-2.5"></div></th>
        </tr>
        <tr class="tw-bg-white tw-border-b hover:tw-bg-gray-100 hover:tw-transition-all tw-transition-all">
            <th><div class=" tw-px-6 tw-h-2 tw-animate-pulse tw-bg-gray-200 tw-rounded-full tw-max-w-full tw-m-2.5"></div></th>
            <th><div class=" tw-px-6 tw-h-2 tw-animate-pulse tw-bg-gray-200 tw-rounded-full tw-max-w-full tw-m-2.5"></div></th>
        </tr>
    </tbody>
);

var transition = ""



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

class DetailedAlerts extends React.Component {
    startCategory = this.props.alertCategory
    startBuilding = this.props.siteName
    numBuildings = 1


    static endpoint = "/alerts/buildings";
    static buildingKey = "detailedAlerts";




    state = {
        //alerts contains mapping of the type "Thermal Comfort" : [alert1, alert2, .....]
        alerts: [],
        categoriesForCurrBuilding: [],
        dropdownSiteName: "",
        buildingAlertCategoryAlertsMap: new Map(),
        currCategory: "None",
        isSubTable: false,
        alertDesc: {},
        alertStatus: '',
        active: 'white',
        map: new Map(),
        path: "/buildingAlerts/respondAlert",
        dataReady: false
    }


    componentDidMount() {
        this.init();
    }

    onSelectBuilding = (building) => {
        this.startBuilding = building;

        //check if building we are switching to has any alerts in current category, otherwise switching to 1st element in alerts category array    
        if (!(Array.from(this.state.buildingAlertCategoryAlertsMap.get(building).keys()).includes(this.startCategory))) {
            const category = Array.from(this.state.buildingAlertCategoryAlertsMap.get(building).keys())[0];
            this.startCategory = category;
            console.log(category)

            this.setState({
                currCategory: category,
                alerts: this.state.buildingAlertCategoryAlertsMap.get(this.state.dropdownSiteName).get(category),
                isSubTable: false,
                dropdownSiteName: building,
                categoriesForCurrBuilding: Array.from(this.state.buildingAlertCategoryAlertsMap.get(building).keys()),
                currCategory: Array.from(this.state.buildingAlertCategoryAlertsMap.get(building).keys())[0],
                alerts: this.state.buildingAlertCategoryAlertsMap.get(building).get(Array.from(this.state.buildingAlertCategoryAlertsMap.get(building).keys())[0]),
                isSubTable: false
            })
        }
        //fetches the alerts from the category the user is currently on but for new building
        else {
            var buildingCats = Array.from(this.state.buildingAlertCategoryAlertsMap.get(building).keys());
            var i = 0
            for (i; i < buildingCats.length; i++) {
                if (buildingCats[i] == this.startCategory)
                    break;
            }

            this.setState({
                dropdownSiteName: building,
                categoriesForCurrBuilding: Array.from(this.state.buildingAlertCategoryAlertsMap.get(building).keys()),
                currCategory: Array.from(this.state.buildingAlertCategoryAlertsMap.get(building).keys())[0],
                alerts: this.state.buildingAlertCategoryAlertsMap.get(building).get(Array.from(this.state.buildingAlertCategoryAlertsMap.get(building).keys())[i]),
                isSubTable: false
            })
        }
    }

    //runs when a category is selected from dropDown
    onCategorySelected = (category) => {
        this.startCategory = category;

        this.setState({
            currCategory: category,
            alerts: this.state.buildingAlertCategoryAlertsMap.get(this.state.dropdownSiteName).get(category),
            isSubTable: false,
        })
    }

    alertsBySites = (data) => {
        //loop through the alerts, make a map of site -> alertCategory
        //we're creating a map of a map here

        let key = data.name
        let buildingId = data._id
        let innerMap = new Map()

        //loop thru the alerts to form the inner map of alertCategory: alerts
        for (let j = 0; j < data.alerts.length; j++) {
            let currAlert = data.alerts[j]
            let innerKey = currAlert.alertCategory
            currAlert["buildingId"] = buildingId

            if (currAlert.status !== 'resolved') {
                if (innerMap.has(innerKey)) {
                    innerMap.get(innerKey).push(currAlert)
                } else {
                    let innerVal = []
                    innerVal.push(currAlert)
                    innerMap.set(innerKey, innerVal)
                }
            }

        }

        let tempMap = new Map()
        tempMap.set(key, innerMap)

        if (innerMap.size != 0) {
            this.state.map.set(key, innerMap)
        }

        let tempMap2 = this.state.map;
        this.setState({
            map: tempMap2
        })


        ////console.log("PROPS & STATE")
        //console.log(this.props)
        //console.log(this.state.map)
        this.state.map.forEach(function (alertCat) {
            alertCat.forEach(function (alerts) {
                var res = alerts.sort(({ priority: a }, { priority: b }) => a - b)
                // //console.log(res);
            });
        });

        if (data.name == this.props.siteName && data.alerts.length > 0) {
            this.setState({
                dropdownSiteName: this.props.siteName,
                currCategory: this.props.alertCategory,
                alerts: this.state.map.get(this.props.siteName).get(this.props.alertCategory),
                buildingAlertCategoryAlertsMap: this.state.map,
                categoriesForCurrBuilding: Array.from(this.state.map.get(this.props.siteName).keys()),
                dataReady: true
            })
            this.startCategory = this.props.alertCategory;
        }

    }

    onMainTableRowClicked = (alert) => {
        this.setState({
            isSubTable: true,
            alertDesc: alert,
            alertStatus: alert.status,
            active: 'lightblue'
        })
        setTimeout(() => {
            this.setState({
                active: 'white'
            })
        }, 0)

    }

    backgroundClicked() {
        this.setState({
            isSubTable: false
        })
    }

    init = () => {

        // const storageService = new StorageService();
        // const headers = getHeadersWithToken(localStorage.getItem("token"));

        // const network = new Network(headers, {
        //     userId: "631b3bd8b6c86ccbde46f8d9",
        //   });
        //   const fetcher = new DataFetcher(
        //     network,
        //     storageService,
        //     DetailedAlerts.buildingKey
        //   );

        //   fetcher
        //   .postData(DetailedAlerts.endpoint)
        //   .then((res) => {
        //     console.log("res", res.length);
        //     // this.processBuildingData(res);
        //     var i = 0;
        //             for(i; i < res.length; i++){
        //                 console.log("reaced")
        //                 if(res[i].name === props.location.parentBuilding)
        //                     break;
        //             }

        //             res = res.data[i]
        //             this.numBuildings = res.buildings.length;

        //             res.buildings.forEach(building => {
        //                 this.alertsBySites(building);
        //             });
        //   })
        //   .catch((error) => {
        //     console.error("Error fetching data:", error);
        //   });

        if (this.state.buildingAlertCategoryAlertsMap.size > 0) {
            // Data is already available, no need to fetch again
            return;
        }

        // fetch all alerts belonging to all buildings which this particular userid 
        const apiURL = process.env.NODE_ENV === 'development' ? `${LOCAL_HOST}:${PORT}/alerts/buildings` : `${PROD_API}/alerts/buildings`;

        axios.post(apiURL,
            {
                "userId": "631b3bd8b6c86ccbde46f8d9"
                // "alertCategory": this.props.alertCategory
            },
            {
                headers: {
                    'x-auth-token': localStorage.getItem('token'),
                    'content-type': 'application/json'
                }
            })
            .then(res => {
                console.log("RES")
                console.log(res.data)

                console.log(this.props.location.state.parentBuilding)

                var i = 0;
                for (i; i < res.data.length; i++) {
                    if (res.data[i].name === this.props.location.state.parentBuilding)
                        break;
                }

                res = res.data[i]
                this.numBuildings = res.buildings.length;

                res.buildings.forEach(building => {
                    this.alertsBySites(building);
                })
            })
    }

    render() {
        //console.log("RENDER")
        //console.log(Array.from(this.state.map.keys()));
        if (this.state.isSubTable)
            window.scrollTo(0, document.body.scrollHeight);
        return <div>
            {/* <Container>
                <div style={{ display: 'flex', alignItems: 'center' }}>

                    <Dropdown>
                        <Dropdown.Toggle
                            style={{ width: 255 }}
                            variant="success"
                            id="dropdown-basic">
                            {this.state.dropdownSiteName}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                Array.from(this.state.buildingAlertCategoryAlertsMap.keys()).length > 0 &&
                                Array.from(this.state.buildingAlertCategoryAlertsMap.keys()).map(building => {
                                    return (
                                        <Dropdown.Item
                                            onSelect={() => this.onSelectBuilding(building)}
                                        >
                                            {building}
                                        </Dropdown.Item>
                                    )
                                }
                                )
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                    &nbsp;
                    <Dropdown>
                        <Dropdown.Toggle
                            style={{ width: 255 }}
                            variant="success"
                            id="dropdown-basic">
                            {this.state.currCategory}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {

                                this.state.categoriesForCurrBuilding.map(category => {
                                    return (
                                        <Dropdown.Item
                                            onSelect={() => { this.onCategorySelected(category) }}
                                        >
                                            {category}
                                        </Dropdown.Item>
                                    )
                                })
                            }
                        </Dropdown.Menu>
                    </Dropdown>

                </div>
            </Container> */}
            <div class="tw-flex tw-justify-center tw-pt-5 tw-relative tw-z-40">
                <Menu as="div" className="tw-relative tw-inline-block tw-text-left tw-mr-2 tw-select-none">
                    <div>
                        {this.numBuildings == 1 && <div class="tw-inline-flex tw-w-full tw-justify-center tw-rounded-md tw-border tw-border-gray-300 tw-bg-white tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-gray-700 tw-shadow-sm hover:tw-bg-gray-50 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-indigo-500 focus:tw-ring-offset-2 focus:tw-ring-offset-gray-100">{this.startBuilding}</div>}
                        {this.numBuildings > 1 && <Menu.Button className="tw-inline-flex tw-w-full tw-justify-center tw-rounded-md tw-border tw-border-gray-300 tw-bg-white tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-gray-700 tw-shadow-sm hover:tw-bg-gray-50 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-indigo-500 focus:tw-ring-offset-2 focus:tw-ring-offset-gray-100">
                            {this.startBuilding}
                            <ChevronDownIcon className="tw-mr-1 tw-ml-2 tw-h-5 tw-w-5" aria-hidden="true" />
                        </Menu.Button>}
                    </div>

                    <Transition
                        enter="tw-transition tw-ease-out tw-duration-100"
                        enterFrom="tw-transform tw-opacity-0 tw-scale-95"
                        enterTo="tw-transform tw-opacity-100 tw-scale-100"
                        leave="tw-transition tw-ease-in tw-duration-75"
                        leaveFrom="tw-transform tw-opacity-100 tw-scale-100"
                        leaveTo="tw-transform tw-opacity-0 tw-scale-95"
                    >
                        <Menu.Items className="tw-absolute tw-right-0 tw-z-10 tw-mt-2 tw-w-56 tw-origin-top-right tw-rounded-md tw-bg-white tw-shadow-lg tw-ring-1 tw-ring-black tw-ring-opacity-5 focus:tw-outline-none">
                            {
                                Array.from(this.state.map.keys()).length > 0 &&
                                Array.from(this.state.map.keys()).map(building => {
                                    return (
                                        <Menu.Item onClick={() => this.onSelectBuilding(building)}>
                                            {({ active }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(
                                                        active ? 'tw-bg-gray-100 tw-text-gray-900' : 'tw-text-gray-700',
                                                        'tw-block tw-text-sm'
                                                    )}
                                                >
                                                    {building != this.startBuilding && <p class="tw-px-4 tw-py-2 tw-m-0">{building}</p>}
                                                </a>
                                            )}
                                        </Menu.Item>
                                    )
                                }
                                )
                            }
                        </Menu.Items>
                    </Transition>
                </Menu>
                <Menu as="div" className="tw-relative tw-inline-block tw-text-left tw-ml-2 tw-select-none">
                    <div>
                        {this.state.categoriesForCurrBuilding.length == 1 && <div class="tw-inline-flex tw-w-full tw-justify-center tw-rounded-md tw-border tw-border-gray-300 tw-bg-white tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-gray-700 tw-shadow-sm hover:tw-bg-gray-50 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-indigo-500 focus:tw-ring-offset-2 focus:tw-ring-offset-gray-100">{this.startCategory}</div>}
                        {this.state.categoriesForCurrBuilding.length > 1 && <Menu.Button className="tw-inline-flex tw-w-full tw-justify-center tw-rounded-md tw-border tw-border-gray-300 tw-bg-white tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-gray-700 tw-shadow-sm hover:tw-bg-gray-50 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-indigo-500 focus:tw-ring-offset-2 focus:tw-ring-offset-gray-100">
                            {this.startCategory}
                            <ChevronDownIcon className="tw-mr-1 tw-ml-2 tw-h-5 tw-w-5" aria-hidden="true" />
                        </Menu.Button>}
                    </div>

                    <Transition
                        enter="tw-transition tw-ease-out tw-duration-100"
                        enterFrom="tw-transform tw-opacity-0 tw-scale-95"
                        enterTo="tw-transform tw-opacity-100 tw-scale-100"
                        leave="tw-transition tw-ease-in tw-duration-75"
                        leaveFrom="tw-transform tw-opacity-100 tw-scale-100"
                        leaveTo="tw-transform tw-opacity-0 tw-scale-95"
                    >
                        <Menu.Items className="tw-absolute tw-right-0 tw-z-10 tw-mt-2 tw-w-56 tw-origin-top-right tw-rounded-md tw-bg-white tw-shadow-lg tw-ring-1 tw-ring-black tw-ring-opacity-5 focus:tw-outline-none">
                            {
                                this.state.categoriesForCurrBuilding.map(category => {
                                    return (
                                        <Menu.Item onClick={() => this.onCategorySelected(category)}>
                                            {({ active }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(
                                                        active ? 'tw-bg-gray-100 tw-text-gray-900' : 'tw-text-gray-700',
                                                        'tw-block tw-text-sm'
                                                    )}
                                                >
                                                    {category != this.startCategory && <p class="tw-px-4 tw-py-2 tw-m-0">{category}</p>}
                                                </a>
                                            )}
                                        </Menu.Item>
                                    )
                                })
                            }
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
            {/* <Container>
                <Table>
                    <thead>
                        <tr>
                            <th>Severity</th>
                            <th>Short Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (this.state.alerts !== undefined && this.state.alerts.length > 0) &&
                            this.state.alerts.map(alert => {
                                if (alert.status !== 'resolved') {
                                    return (
                                        <tr onClick={() => this.onMainTableRowClicked(alert)}>
                                            {
                                                alert.severity === 'high' &&
                                                <td>
                                                    <Alert severity="error">High</Alert>
                                                </td>
                                            }
                                            {
                                                alert.severity === 'low' &&
                                                <td>
                                                    <Alert severity="success">Low</Alert>
                                                </td>
                                            }
                                            {
                                                alert.severity === 'medium' &&
                                                <td>
                                                    <Alert severity="warning">Medium</Alert>
                                                </td>}
                                            <td>
                                                {alert.shortDesc}
                                            </td>
                                        </tr>
                                    )
                                }
                            })
                        }
                    </tbody>
                </Table>
            </Container> */}
            <div class="tw-pt-5 tw-mb-10">
                <div class="tw-overflow-x-auto tw-flex tw-justify-center tw-relative">
                    <table class="xs:tw-w-[90%] md:tw-w-[75%] tw-table-auto tw-text-sm tw-text-left tw-text-gray-500 tw-border-2 tw-border-gray-200">
                        <col width='30' />
                        <col width='170' />
                        <thead class="tw-text-xs tw-text-gray-700 tw-uppercase tw-bg-gray-50 tw-border-b-2">
                            <tr>
                                <th scope="col" class="tw-py-3 tw-px-6">
                                    Severity
                                </th>
                                <th scope="col" class="tw-py-3 tw-px-6 tw-border-r tw-border-gray-200">
                                    Status
                                </th>
                                <th scope="col" class="tw-py-3 tw-px-6">
                                    Short Description
                                </th>
                            </tr>
                        </thead>
                        <ReactPlaceholder ready={this.state.dataReady} customPlaceholder={CustomSkeleton}>
                            <tbody id="tbody" class="tw-overflow-auto">
                                {
                                    (this.state.alerts !== undefined && this.state.alerts.length > 0) &&
                                    this.state.alerts.map(alert => {
                                        if (alert.status !== 'resolved') {
                                            return (
                                                <tr id={alert.shortDesc} class={"tw-bg-white tw-border-b hover:tw-bg-gray-100 hover:tw-transition-all tw-transition-all"} tabIndex="0" onClick={() => this.onMainTableRowClicked(alert)}>
                                                    {
                                                        alert.severity === 'high' &&
                                                        <th scope="row" class="tw-py-4 tw-px-6 tw-font-medium tw-text-gray-900 tw-whitespace-nowrap hover:tw-cursor-pointer">
                                                            <button type="" class=" tw-text-white tw-bg-red-400 tw-font-medium tw-rounded-lg tw-text-sm tw-px-8 tw-py-1 tw-mr-2">Critical</button>
                                                        </th>
                                                    }
                                                    {
                                                        alert.severity === 'low' &&
                                                        <th scope="row" class="tw-py-4 tw-px-6 tw-font-medium tw-text-gray-900 tw-whitespace-nowrap hover:tw-cursor-pointer">
                                                            <button type="" class=" tw-text-white tw-bg-green-500 tw-font-medium tw-rounded-lg tw-text-sm tw-px-[20.75px] tw-py-1 tw-mr-2">Get Ahead</button>
                                                        </th>
                                                    }
                                                    {
                                                        alert.severity === 'medium' &&
                                                        <th scope="row" class="tw-py-4 tw-px-6 tw-font-medium tw-text-gray-900 tw-whitespace-nowrap hover:tw-cursor-pointer">
                                                            <button type="" class=" tw-text-white tw-bg-yellow-400 tw-font-medium tw-rounded-lg tw-text-sm tw-px-7 tw-py-1 tw-mr-2">Warning</button>
                                                        </th>
                                                    }
                                                    <td class="tw-py-4 tw-px-6 hover:tw-cursor-pointer tw-border-r tw-border-gray-200">
                                                        {
                                                            alert.status == 'New' && <p class="tw-font-bold tw-m-0 tw-p-0">{alert.status}</p>
                                                        }
                                                        {
                                                            alert.status != 'New' && <p class="tw-m-0 tw-p-0">{alert.status}</p>
                                                        }
                                                    </td>
                                                    <td class="tw-py-4 tw-px-6 hover:tw-cursor-pointer">
                                                        {alert.shortDesc}
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    })
                                }
                                {/* <tr class="tw-bg-white tw-border-b ">
                                    <th scope="row" class="tw-py-4 tw-px-6 tw-font-medium tw-text-gray-900 tw-whitespace-nowrap hover:tw-cursor-pointer">
                                        <button type="" class=" tw-text-white tw-bg-yellow-400 tw-font-medium tw-rounded-lg tw-text-sm tw-px-5 tw-py-1 tw-mr-2">Warning</button>
                                    </th>
                                    <td class="tw-py-4 tw-px-6">
                                        Degraded Comfort     
                                    </td>
                                </tr>
                                <tr class="tw-bg-white tw-border-b ">
                                    <th scope="row" class="tw-py-4 tw-px-6 tw-font-medium tw-text-gray-900 tw-whitespace-nowrap hover:tw-cursor-pointer">
                                        <button type="" class=" tw-text-white tw-bg-green-500 tw-font-medium tw-rounded-lg tw-text-sm tw-px-5 tw-py-1 tw-mr-2">Opprotuinity</button>
                                    </th>
                                    <td class="tw-py-4 tw-px-6">
                                        Reduce Energy Waste
                                    </td>
                                </tr> */}
                            </tbody>
                        </ReactPlaceholder>
                    </table>
                </div>
            </div>

            {
                this.state.isSubTable &&
                // <Container>
                //     <Table>
                //         <thead>
                //             <th>
                //                 Alert Details
                //             </th>

                //         </thead>
                //         <tbody>
                //             <tr>
                //                 <td style={{ backgroundColor: 'lightgrey' }}>Alert ID</td>
                //                 <td style={{ backgroundColor: this.state.active }}>
                //                     {this.state.alertDesc._id}</td>
                //             </tr>
                //             <tr>
                //                 <td style={{ backgroundColor: 'lightgrey' }}>Status</td>

                //                 {this.state.alertDesc.status === 'new' &&
                //                     <td style={{ backgroundColor: this.state.active }}>New</td>}

                //                 {this.state.alertDesc.status !== 'new' &&
                //                     <td style={{ backgroundColor: this.state.active }}>{this.state.alertDesc.status}</td>}

                //             </tr>
                //             <tr>
                //                 <td style={{ backgroundColor: 'lightgrey' }}>Building</td>
                //                 <td style={{ backgroundColor: this.state.active }}>
                //                     {this.state.dropdownSiteName} </td>
                //             </tr>
                //             <tr>
                //                 <td style={{ backgroundColor: 'lightgrey' }}>Date Reported</td>
                //                 <td style={{ backgroundColor: this.state.active }}>
                //                     {new Date(this.state.alertDesc.dateReported).toUTCString()}</td>
                //             </tr>
                //             <tr>
                //                 <td style={{ backgroundColor: 'lightgrey' }}>Description</td>
                //                 <td style={{ backgroundColor: this.state.active }}>
                //                     {this.state.alertDesc.detailedDesc}</td>
                //             </tr>
                //         </tbody>
                //     </Table>

                //     <Link to={{
                //         pathname: "/buildingAlerts/respondAlert",
                //         state: {
                //             alert: this.state.alertDesc
                //         }
                //     }}
                //         style={{ textDecoration: 'none' }}
                //     >
                //         <div className="d-grid gap-2">
                //             <Button
                //                 variant="primary">
                //                 Respond Alert
                //             </Button>
                //         </div>
                //         <br />

                //     </Link>

                //     <Link to={`/buildingAlerts`}
                //         style={{ textDecoration: 'none' }}
                //         text="white"
                //     >
                //         <div className="d-grid gap-2">
                //             <Button
                //                 variant="primary">
                //                 Main Menu
                //             </Button>
                //         </div>
                //     </Link>

                // </Container>
                <div id="detailed" class={transition}>
                    <div class="tw-flex tw-mt-10 tw-justify-center">
                        <div class="xs:tw-w-[90%] md:tw-w-[75%]">
                            <div className="tw-overflow-hidden tw-bg-white tw-shadow sm:tw-rounded-lg">
                                <div className="tw-px-4 tw-py-5 sm:tw-px-6">
                                    <h3 className="tw-text-lg tw-font-medium tw-leading-6 tw-text-gray-900">Alert Details</h3>
                                    <p className="tw-mt-1 tw-max-w-2xl tw-text-sm tw-text-gray-500">Details about the alert and the building it belongs to.</p>
                                </div>
                                <div className="tw-border-t tw-border-gray-200">
                                    <dl>
                                        <div className="tw-bg-white tw-border-b tw-px-4 tw-py-5 sm:tw-grid sm:tw-grid-cols-3 sm:tw-gap-4 sm:tw-px-6">
                                            <dt className="tw-text-sm tw-font-medium tw-text-gray-500">Alert ID</dt>
                                            <dd className="tw-mb-0 tw-mt-1 tw-text-sm tw-text-gray-900 sm:tw-col-span-2 sm:tw-mt-0">{this.state.alertDesc._id}</dd>
                                        </div>
                                        <div className="tw-bg-white tw-border-b tw-px-4 tw-py-5 sm:tw-grid sm:tw-grid-cols-3 sm:tw-gap-4 sm:tw-px-6">
                                            <dt className="tw-text-sm tw-font-medium tw-text-gray-500">Status</dt>
                                            <dd className="tw-mb-0 tw-mt-1 tw-text-sm tw-text-gray-900 sm:tw-col-span-2 sm:tw-mt-0">
                                                {this.state.alertDesc.status === 'new' && <p>New</p>}
                                                {this.state.alertDesc.status !== 'new' && this.state.alertDesc.status}
                                            </dd>
                                        </div>
                                        <div className="tw-bg-white tw-border-b tw-px-4 tw-py-5 sm:tw-grid sm:tw-grid-cols-3 sm:tw-gap-4 sm:tw-px-6">
                                            <dt className="tw-text-sm tw-font-medium tw-text-gray-500">Building</dt>
                                            <dd className="tw-mb-0 tw-mt-1 tw-text-sm tw-text-gray-900 sm:tw-col-span-2 sm:tw-mt-0">{this.state.dropdownSiteName}</dd>
                                        </div>
                                        <div className="tw-bg-white tw-border-b tw-px-4 tw-py-5 sm:tw-grid sm:tw-grid-cols-3 sm:tw-gap-4 sm:tw-px-6">
                                            <dt className="tw-text-sm tw-font-medium tw-text-gray-500">Date Reported</dt>
                                            <dd className="tw-mb-0 tw-mt-1 tw-text-sm tw-text-gray-900 sm:tw-col-span-2 sm:tw-mt-0">{new Date(this.state.alertDesc.dateReported).toUTCString()}</dd>
                                        </div>
                                        <div className="tw-bg-white tw-px-4 tw-py-5 tw-pb-2 sm:tw-grid sm:tw-grid-cols-3 sm:tw-gap-4 sm:tw-px-6">
                                            <dt className="tw-text-sm tw-font-medium tw-text-gray-500">Description</dt>
                                            <dd className="tw-mb-0 tw-mt-1 tw-text-sm tw-text-gray-900 sm:tw-col-span-2 sm:tw-mt-0">{this.state.alertDesc.detailedDesc}</dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tw-flex tw-w-full tw-justify-center tw-mt-4">
                        <Link to={{
                            pathname: "/buildingAlerts/respondAlert",
                            state: {
                                alert: this.state.alertDesc
                            }
                        }}>
                            <button type="button" class="tw-text-white tw-bg-blue-700 hover:tw-bg-blue-800 focus:tw-ring-4 focus:tw-ring-blue-300 tw-font-medium tw-rounded-lg tw-text-sm tw-px-5 tw-py-2.5 tw-mr-2 tw-mb-2 focus:tw-outline-none">Respond Alert</button>
                        </Link>
                        <Link to={`/buildingAlerts`}>
                            <button type="button" class="tw-text-white tw-bg-blue-700 hover:tw-bg-blue-800 focus:tw-ring-4 focus:tw-ring-blue-300 tw-font-medium tw-rounded-lg tw-text-sm tw-px-5 tw-py-2.5 tw-mr-2 tw-mb-2 focus:tw-outline-none">Main Menu</button>
                        </Link>
                    </div>
                </div>
            }
        </div>
    }
}

//fetch userId, alertCategory, business name from redux store
const mapStateToProps = (state) => ({
    alertCategory: state.alertCategory,
    userId: state.userId,
    siteName: state.siteName
})

export default connect(mapStateToProps)(DetailedAlerts)
