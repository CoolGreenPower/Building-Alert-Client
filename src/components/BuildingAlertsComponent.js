// /**
//  * This acts as the landing page for Alerts. This page gives the choice to select
//  * buildings. Selection of buildings displays businesses within those buildings as card components.
//  */

// import { Component, useEffect } from 'react'
// import CardComponent from './CardComponent'
// import './Tiles.css'
// import axios from 'axios'
// import { LOCAL_HOST, PORT, PROD_API } from '../constants/constants'
// import { Link } from 'react-router-dom'
// import { connect } from 'react-redux'
// import { Typography } from '@material-ui/core';
// import { Container, Dropdown } from 'react-bootstrap'
// import { Card } from 'react-bootstrap'
// import { MdNotificationsActive } from 'react-icons/md'
// import Alert from '@material-ui/lab/Alert';
// import ParentBuildingDropDownComponent from './ParentBuildingDropDownComponent'
// import BuildingDropDownComponent from './BuildingDropDownComponent'
// import CardListComponent from './CardListComponent'
// import ColorCardComponent from './ColorCardComponent'
// import SpecAlerts from './SpecAlerts'
// import './BuildingAlertsComponent.css'
// import ReactPlaceholder from 'react-placeholder';
// import BuildingListComponent from './BuildingListComponent'
// import { BuildingOfficeIcon, BuildingStorefrontIcon } from '@heroicons/react/20/solid'

// /**
//  * Function to render businesses as cards
//  * Cards display In Progress and New Alerts
//  */

//  var CustomSkeleton = (
//     <div role="status" class="tw-max-w-sm tw-animate-pulse tw-ml-4 ">
//         <div class="tw-divide-y tw-divide-gray-200 tw-mb-[10px]">
//             <div class="tw-h-2.5 tw-animate-pulse tw-bg-gray-200 tw-rounded-full tw-w-36 tw-mb-4"></div>
//             <div class="tw-h-2 tw-animate-pulse tw-bg-gray-200 tw-rounded-full tw-max-w-[250px] tw-mb-2.5"></div>
//         </div>
//         <div class="tw-divide-y tw-divide-gray-200 tw-mb-[10px]">
//             <div class="tw-h-2.5 tw-animate-pulse tw-bg-gray-200 tw-rounded-full tw-w-36 tw-mb-4"></div>
//             <div class="tw-h-2 tw-animate-pulse tw-bg-gray-200 tw-rounded-full tw-max-w-[250px] tw-mb-2.5"></div>
//         </div>
//         <div class="tw-divide-y tw-divide-gray-200 tw-mb-[10px]">
//             <div class="tw-h-2.5 tw-animate-pulse tw-bg-gray-200 tw-rounded-full tw-w-36 tw-mb-4"></div>
//             <div class="tw-h-2 tw-animate-pulse tw-bg-gray-200 tw-rounded-full tw-max-w-[250px] tw-mb-2.5"></div>
//         </div>
//         <div class="tw-divide-y tw-divide-gray-200 tw-mb-[10px]">
//             <div class="tw-h-2.5 tw-animate-pulse tw-bg-gray-200 tw-rounded-full tw-w-36 tw-mb-4"></div>
//             <div class="tw-h-2 tw-animate-pulse tw-bg-gray-200 tw-rounded-full tw-max-w-[250px] tw-mb-2.5"></div>
//         </div>
//         <div class="tw-divide-y tw-divide-gray-200 tw-mb-[10px]">
//             <div class="tw-h-2.5 tw-animate-pulse tw-bg-gray-200 tw-rounded-full tw-w-36 tw-mb-4"></div>
//             <div class="tw-h-2 tw-animate-pulse tw-bg-gray-200 tw-rounded-full tw-max-w-[250px] tw-mb-2.5"></div>
//         </div>
//         <div class="tw-divide-y tw-divide-gray-200 tw-mb-[10px]">
//             <div class="tw-h-2.5 tw-animate-pulse tw-bg-gray-200 tw-rounded-full tw-w-36 tw-mb-4"></div>
//             <div class="tw-h-2 tw-animate-pulse tw-bg-gray-200 tw-rounded-full tw-max-w-[250px] tw-mb-2.5"></div>
//         </div>
//         <div class="tw-divide-y tw-divide-gray-200 tw-mb-[10px]">
//             <div class="tw-h-2.5 tw-animate-pulse tw-bg-gray-200 tw-rounded-full tw-w-36 tw-mb-4"></div>
//             <div class="tw-h-2 tw-animate-pulse tw-bg-gray-200 tw-rounded-full tw-max-w-[250px] tw-mb-2.5"></div>
//         </div>
//     </div>
// );

// // Not being used

// // const renderCardComponent = (variant) => {
// //     return (
// //         <>
// //             <CardListComponent
// //                 name = {variant.name}
// //                 address = {variant.address}
// //                 alertNumber = {variant.alertNumber}
// //                 alerts = {variant.alerts}
// //             />
// //         </>
// //     )
// // }

// class BuildingAlertsComponent extends Component {

//     state = {
//         parentBuilding: '',
//         parentToBuildingMap: new Map(),
//         currentBuilding: '',
//         ready: false,
//         data: []
//     }

//     // runs when page loads
//     componentDidMount() {
//         this.init();
//     }

//     componentDidUpdate(prevProps) {
//         if (this.props.id !== prevProps.id) {
//             this.init()
//         }
//       }

//     //runs when building is selected from dropdown
//     onSelectPb = (pb) => {
//         this.setState({
//             parentBuilding: pb
//         })
//         this.setState({currentBuilding: pb['buildings'][0]})
//     }

//     onSelectBuilding = (building) => {
//         this.setState({
//             currentBuilding: building
//         })
//     }

//     // init = () => {
//     //     const tempParentToBuildingMap = new Map()
//     //     let tempPbTotalAlerts = 0;
//     //     let tempPbNewAlerts = 0;
//     //     let tempPbInProgAlerts = 0;

//     //     // fetch all alerts belonging to all buildings which this particular userid is tied to
//     //     const apiURL = process.env.NODE_ENV === 'development' ? `${LOCAL_HOST}:${PORT}/alerts/buildings` : `${PROD_API}/alerts/buildings`;

//     //     axios.post(apiURL,
//     //         {
//     //             // this.props.userId
//     //             "userId": "631b3bd8b6c86ccbde46f8d9"
//     //         },
//     //         {
//     //             headers: {
//     //                 'x-auth-token': localStorage.getItem('token'),
//     //                 'content-type': 'application/json'
//     //             }
//     //         })
//     //         .then(res => {
//     //             //iterate thru buildings
//     //             var arr = [];
//     //             arr.push(res);
//     //             arr = arr[0]['data'];

//     //             arr.forEach(pb => {
//     //                 //iterate thru businesses
//     //                 pb.buildings.forEach(building => {
//     //                     //should building element be reference to other building element instead of oID of building? look @ ref in schema
//     //                     //use .populate(), get mongoose call working then use populate code
//     //                     console.log('current building = ');
//     //                     console.log(building)
//     //                     let severity = 'success'
//     //                     let newCounter = 0;
//     //                     let inProgCounter = 0;
//     //                     //iterating thru each individual alert
//     //                     building.alerts.forEach(ele => {
//     //                         if (ele.status === "new") newCounter++
//     //                         else if (ele.status !== "resolved") inProgCounter++
//     //                     })

//     //                     building["new"] = newCounter
//     //                     building["inProgress"] = inProgCounter
//     //                     building["alertType"] = severity
//     //                     building["alertNumber"] = newCounter + inProgCounter

//     //                     tempPbNewAlerts += newCounter
//     //                     tempPbInProgAlerts += inProgCounter
//     //                 })

//     //                 tempPbTotalAlerts = tempPbNewAlerts + tempPbInProgAlerts
//     //                 tempParentToBuildingMap.set(pb, pb.buildings)

//     //                 pb["alertNumber"] = tempPbTotalAlerts
//     //                 pb["new"] = tempPbNewAlerts
//     //                 pb["inProgress"] = tempPbInProgAlerts
//     //             })

//     //             this.setState({
//     //                 parentToBuildingMap: tempParentToBuildingMap,
//     //                 parentBuilding: res.data[0],
//     //                 data: res.data
//     //             })

//     //         })

//     //         this.state.ready = true;
//     // }

// // currently the data is being fetched from the API and stored in local storage, but the problem here is that the data is not being updated when the user creates a new alert plus the data is being stored into this specifi ccompoent, or for this specfic component, and
// // if we want to use this data in other components, we would have to pass it down as props, which is not ideal

//     init = () => {
//         const tempParentToBuildingMap = new Map();
//         let tempPbTotalAlerts = 0;
//         let tempPbNewAlerts = 0;
//         let tempPbInProgAlerts = 0;

//         const apiURL =
//           process.env.NODE_ENV === 'development'
//             ? `${LOCAL_HOST}:${PORT}/alerts/buildings`
//             : `${PROD_API}/alerts/buildings`;

//         if (navigator.onLine) {
//           // If app is online, fetch data from the API
//           axios
//             .post(
//               apiURL,
//               {
//                 userId: "631b3bd8b6c86ccbde46f8d9",
//               },
//               {
//                 headers: {
//                   'x-auth-token': localStorage.getItem('token'),
//                   'content-type': 'application/json',
//                 },
//               }
//             )
//             .then((res) => {
//               // Process the response and save data to local storage
//               const data = res.data;
//               localStorage.setItem('buildingData', JSON.stringify(data));
//               this.processBuildingData(data);
//             })
//             .catch((error) => {
//               console.error('Error fetching data:', error);
//             });
//         } else {
//           // If app is offline, retrieve data from local storage
//           const savedData = localStorage.getItem('buildingData');
//           if (savedData) {
//             const data = JSON.parse(savedData);
//             this.processBuildingData(data);
//           }
//         }
//       };

//       processBuildingData = (data) => {
//         const tempParentToBuildingMap = new Map();
//         let tempPbTotalAlerts = 0;
//         let tempPbNewAlerts = 0;
//         let tempPbInProgAlerts = 0;

//         data.forEach((pb) => {
//           pb.buildings.forEach((building) => {
//             let severity = 'success';
//             let newCounter = 0;
//             let inProgCounter = 0;

//             building.alerts.forEach((ele) => {
//               if (ele.status === 'new') newCounter++;
//               else if (ele.status !== 'resolved') inProgCounter++;
//             });

//             building['new'] = newCounter;
//             building['inProgress'] = inProgCounter;
//             building['alertType'] = severity;
//             building['alertNumber'] = newCounter + inProgCounter;

//             tempPbNewAlerts += newCounter;
//             tempPbInProgAlerts += inProgCounter;
//           });

//           tempPbTotalAlerts = tempPbNewAlerts + tempPbInProgAlerts;
//           tempParentToBuildingMap.set(pb, pb.buildings);

//           pb['alertNumber'] = tempPbTotalAlerts;
//           pb['new'] = tempPbNewAlerts;
//           pb['inProgress'] = tempPbInProgAlerts;
//         });

//         this.setState({
//           parentToBuildingMap: tempParentToBuildingMap,
//           parentBuilding: data[0],
//           data: data,
//           ready: true,
//         });
//       };

//     componentDidMount() {
//         this.init();
//     }

//     render() {
//         var buildings = this.state.parentToBuildingMap.get(this.state.parentBuilding);

//         if(buildings != undefined && this.state.currentBuilding == ''){
//             this.setState({currentBuilding: buildings[0]})
//             console.log("parentBuilding state changed")
//         }
//         else{
//             console.log("needs to refresh")
//         }

//         console.log("BUILDINGS")
//         console.log(buildings)

//         console.log("States")
//         console.log(this.state)

//         // ADD TOTAL NEW ALERTS FOR ALL BUILDINGS IN THE BELL IN THE TOP RIGHT
//         return (
//             <>
//                 <div class="md:tw-flex tw-justify-center xs:tw-pt-3 md:tw-pt-12 ">
//                     <div id="buildingList" class=" tw-z-10 tw-p-4 tw-w-full xs:tw-w-[90%] xs:tw-ml-[5%] lg:tw-ml-0 md:tw-max-w-md tw-bg-white tw-rounded-lg tw-border tw-shadow-md sm:tw-p-8 tw-mr-5">
//                         <div class="tw-flex tw-justify-between tw-items-center tw-mb-4">
//                             <h5 class="tw-text-xl tw-font-bold tw-leading-none tw-text-gray-900 ">Businesses</h5>
//                         </div>
//                         <div class="tw-flex tw-items-center tw-mx-4 tw-mb-3">
//                             <BuildingOfficeIcon class="tw-h-8 tw-w-8 tw-mr-3" title="Parent Building"/>
//                             <ParentBuildingDropDownComponent parentBuildingName = {this.state.parentBuilding.name} map = {this.state.parentToBuildingMap} onSelectPb = {this.onSelectPb}/>
//                             {/* <div class="tw-m-3"></div> */}
//                         </div>
//                         <div class="tw-flex tw-items-center tw-mx-4 tw-mb-3">
//                             <BuildingStorefrontIcon class="tw-h-8 tw-w-8 tw-mr-3" title="Business"/>
//                             <BuildingDropDownComponent parentBuildingName = {this.state.parentBuilding.name} map = {this.state.parentToBuildingMap} onSelect = {this.onSelectBuilding} currentBuilding={this.state.currentBuilding}/>
//                         </div>
//                         <ReactPlaceholder ready={this.state.ready} customPlaceholder={CustomSkeleton}>
//                             <div class="tw-flow-root">
//                                 <BuildingListComponent pb={this.state.parentBuilding.name} name={this.state.currentBuilding['name']} address={this.state.currentBuilding['address']} alertNumber={this.state.currentBuilding['alertNumber']} alerts={this.state.currentBuilding['alerts']}/>
//                             </div>
//                         </ReactPlaceholder>
//                     </div>
//                 </div>
//             </>

//         )
//     }
// }

// //function is not passing userid to props -> breaking entire chain of queries
// //userid not going through if page is reloaded - works first time

// //fetch userId from redux store
// const mapStateToProps = (state) => {
//     const { userId } = state
//     return {
//         userId: userId
//     }
// }

// export default connect(mapStateToProps)(BuildingAlertsComponent)

import { Component, useEffect } from "react";
import CardComponent from "./CardComponent";
import "./Tiles.css";
import axios from "axios";
import { LOCAL_HOST, PORT, PROD_API } from "../constants/constants";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Typography } from "@material-ui/core";
import { Container, Dropdown } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { MdNotificationsActive } from "react-icons/md";
import Alert from "@material-ui/lab/Alert";
import ParentBuildingDropDownComponent from "./ParentBuildingDropDownComponent";
import BuildingDropDownComponent from "./BuildingDropDownComponent";
import CardListComponent from "./CardListComponent";
import ColorCardComponent from "./ColorCardComponent";
import SpecAlerts from "./SpecAlerts";
import "./BuildingAlertsComponent.css";
import ReactPlaceholder from "react-placeholder";
import BuildingListComponent from "./BuildingListComponent";
import {
  BuildingOfficeIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/20/solid";
import { getHeadersWithToken } from "../utils/Utility";
import Network from "../services/Network";
import StorageService from "../services/StorageService";
import DataFetcher from "../services/DataFetcher";

var CustomSkeleton = (
  <div role="status" class="tw-max-w-sm tw-animate-pulse tw-ml-4 ">
    <div class="tw-divide-y tw-divide-gray-200 tw-mb-[10px]">
      <div class="tw-h-2.5 tw-animate-pulse tw-bg-gray-200 tw-rounded-full tw-w-36 tw-mb-4"></div>
      <div class="tw-h-2 tw-animate-pulse tw-bg-gray-200 tw-rounded-full tw-max-w-[250px] tw-mb-2.5"></div>
    </div>
    <div class="tw-divide-y tw-divide-gray-200 tw-mb-[10px]">
      <div class="tw-h-2.5 tw-animate-pulse tw-bg-gray-200 tw-rounded-full tw-w-36 tw-mb-4"></div>
      <div class="tw-h-2 tw-animate-pulse tw-bg-gray-200 tw-rounded-full tw-max-w-[250px] tw-mb-2.5"></div>
    </div>
    <div class="tw-divide-y tw-divide-gray-200 tw-mb-[10px]">
      <div class="tw-h-2.5 tw-animate-pulse tw-bg-gray-200 tw-rounded-full tw-w-36 tw-mb-4"></div>
      <div class="tw-h-2 tw-animate-pulse tw-bg-gray-200 tw-rounded-full tw-max-w-[250px] tw-mb-2.5"></div>
    </div>
    <div class="tw-divide-y tw-divide-gray-200 tw-mb-[10px]">
      <div class="tw-h-2.5 tw-animate-pulse tw-bg-gray-200 tw-rounded-full tw-w-36 tw-mb-4"></div>
      <div class="tw-h-2 tw-animate-pulse tw-bg-gray-200 tw-rounded-full tw-max-w-[250px] tw-mb-2.5"></div>
    </div>
    <div class="tw-divide-y tw-divide-gray-200 tw-mb-[10px]">
      <div class="tw-h-2.5 tw-animate-pulse tw-bg-gray-200 tw-rounded-full tw-w-36 tw-mb-4"></div>
      <div class="tw-h-2 tw-animate-pulse tw-bg-gray-200 tw-rounded-full tw-max-w-[250px] tw-mb-2.5"></div>
    </div>
    <div class="tw-divide-y tw-divide-gray-200 tw-mb-[10px]">
      <div class="tw-h-2.5 tw-animate-pulse tw-bg-gray-200 tw-rounded-full tw-w-36 tw-mb-4"></div>
      <div class="tw-h-2 tw-animate-pulse tw-bg-gray-200 tw-rounded-full tw-max-w-[250px] tw-mb-2.5"></div>
    </div>
    <div class="tw-divide-y tw-divide-gray-200 tw-mb-[10px]">
      <div class="tw-h-2.5 tw-animate-pulse tw-bg-gray-200 tw-rounded-full tw-w-36 tw-mb-4"></div>
      <div class="tw-h-2 tw-animate-pulse tw-bg-gray-200 tw-rounded-full tw-max-w-[250px] tw-mb-2.5"></div>
    </div>
  </div>
);

class BuildingAlertsComponent extends Component {
  state = {
    parentBuilding: "",
    parentToBuildingMap: new Map(),
    currentBuilding: "",
    ready: false,
    data: [],
  };

  componentDidMount() {
    this.init();
  }

  onSelectPb = (pb) => {
    this.setState({
      parentBuilding: pb,
    });
    this.setState({ currentBuilding: pb["buildings"][0] });
  };

  onSelectBuilding = (building) => {
    this.setState({
      currentBuilding: building,
    });
  };

  static endpoint = "/alerts/buildings";
  static buildingKey = "buildingData";

  init = () => {
    const tempParentToBuildingMap = new Map();
    let tempPbTotalAlerts = 0;
    let tempPbNewAlerts = 0;
    let tempPbInProgAlerts = 0;

    // const apiURL = process.env.NODE_ENV === 'development' ? `${LOCAL_HOST}:${PORT}/alerts/buildings` : `${PROD_API}/alerts/buildings`;
    // Main API to fetch data
    // if (navigator.onLine) {
    //   // If app is online, fetch data from the API
    //   axios.post(
    //     apiURL,
    //     {
    //       userId: "631b3bd8b6c86ccbde46f8d9",
    //     },
    //     {
    //       headers: {
    //         'x-auth-token': localStorage.getItem('token'),
    //         'content-type': 'application/json',
    //       },
    //     }
    //   )
    //     .then((res) => {
    //       // Process the response and save data to local storage
    //       const data = res.data;
    //       localStorage.setItem('buildingData', JSON.stringify(data));
    //       this.processBuildingData(data);
    //     })
    //     .catch((error) => {
    //       console.error('Error fetching data:', error);
    //     });
    // } else {
    //   // If app is offline, retrieve data from local storage
    //   const savedData = localStorage.getItem('buildingData');
    //   if (savedData) {
    //     const data = JSON.parse(savedData);
    //     this.processBuildingData(data);
    //   }
    // }
    const storageService = new StorageService();
    const headers = getHeadersWithToken(localStorage.getItem("token"));
    // console.log("headers", headers);
    const network = new Network(headers, {
      userId: "631b3bd8b6c86ccbde46f8d9",
    });
    const fetcher = new DataFetcher(
      network,
      storageService,
      BuildingAlertsComponent.buildingKey
    );

    fetcher
      .postData(BuildingAlertsComponent.endpoint)
      .then((res) => {
        console.log("res", res);
        this.processBuildingData(res);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  processBuildingData = (data) => {
    const tempParentToBuildingMap = new Map();
    let tempPbTotalAlerts = 0;
    let tempPbNewAlerts = 0;
    let tempPbInProgAlerts = 0;

    data.forEach((pb) => {
      pb.buildings.forEach((building) => {
        let severity = "success";
        let newCounter = 0;
        let inProgCounter = 0;

        building.alerts.forEach((ele) => {
          if (ele.status === "new") newCounter++;
          else if (ele.status !== "resolved") inProgCounter++;
        });

        building["new"] = newCounter;
        building["inProgress"] = inProgCounter;
        building["alertType"] = severity;
        building["alertNumber"] = newCounter + inProgCounter;

        tempPbNewAlerts += newCounter;
        tempPbInProgAlerts += inProgCounter;
      });

      tempPbTotalAlerts = tempPbNewAlerts + tempPbInProgAlerts;
      tempParentToBuildingMap.set(pb, pb.buildings);

      pb["alertNumber"] = tempPbTotalAlerts;
      pb["new"] = tempPbNewAlerts;
      pb["inProgress"] = tempPbInProgAlerts;
    });

    this.setState({
      parentToBuildingMap: tempParentToBuildingMap,
      parentBuilding: data[0],
      data: data,
      ready: true,
    });
    console.log(this.state);
  };

  render() {
    const buildings = this.state.parentToBuildingMap.get(
      this.state.parentBuilding
    );

    if (buildings != undefined && this.state.currentBuilding === "") {
      this.setState({ currentBuilding: buildings[0] });
    }

    return (
      <>
        <div class="md:tw-flex tw-justify-center xs:tw-pt-3 md:tw-pt-12 ">
          <div
            id="buildingList"
            class=" tw-z-10 tw-p-4 tw-w-full xs:tw-w-[90%] xs:tw-ml-[5%] lg:tw-ml-0 md:tw-max-w-md tw-bg-white tw-rounded-lg tw-border tw-shadow-md sm:tw-p-8 tw-mr-5"
          >
            <div class="tw-flex tw-justify-between tw-items-center tw-mb-4">
              <h5 class="tw-text-xl tw-font-bold tw-leading-none tw-text-gray-900 ">
                Businesses
              </h5>
            </div>
            <div class="tw-flex tw-items-center tw-mx-4 tw-mb-3">
              <BuildingOfficeIcon
                class="tw-h-8 tw-w-8 tw-mr-3"
                title="Parent Building"
              />
              <ParentBuildingDropDownComponent
                parentBuildingName={this.state.parentBuilding.name}
                map={this.state.parentToBuildingMap}
                onSelectPb={this.onSelectPb}
              />
            </div>
            <div class="tw-flex tw-items-center tw-mx-4 tw-mb-3">
              <BuildingStorefrontIcon
                class="tw-h-8 tw-w-8 tw-mr-3"
                title="Business"
              />
              <BuildingDropDownComponent
                parentBuildingName={this.state.parentBuilding.name}
                map={this.state.parentToBuildingMap}
                onSelect={this.onSelectBuilding}
                currentBuilding={this.state.currentBuilding}
              />
            </div>
            <ReactPlaceholder
              ready={this.state.ready}
              customPlaceholder={CustomSkeleton}
            >
              <div class="tw-flow-root">
                <BuildingListComponent
                  pb={this.state.parentBuilding.name}
                  name={this.state.currentBuilding["name"]}
                  address={this.state.currentBuilding["address"]}
                  alertNumber={this.state.currentBuilding["alertNumber"]}
                  alerts={this.state.currentBuilding["alerts"]}
                />
              </div>
            </ReactPlaceholder>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { userId } = state;
  return {
    userId: userId,
  };
};

export default connect(mapStateToProps)(BuildingAlertsComponent);
