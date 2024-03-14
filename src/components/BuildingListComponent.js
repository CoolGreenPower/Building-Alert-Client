// import React from 'react'
// import { Link } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
// import { ADD_SITE_NAME, UPDATE_ALERT_CATEGORY } from '../constants/constants';

// import safety from './../images/safety.svg'
// import energy from './../images/energy.svg'
// import service from './../images/service.svg'
// import thermal from './../images/thermal.svg'
// import alertBell from './../images/bell.svg'

// export default function BuildingListComponent(props) {    
//     var healthCount = 0;
//     var serviceCount = 0;
//     var thermalCount = 0;
//     var energyCount = 0;

//     var healthNew = 0;
//     var serviceNew = 0;
//     var thermalNew = 0;
//     var energyNew = 0;

//     for(let i = 0; i < props.alerts.length; i++){
//         if (props.alerts[i]['alertCategory'] == 'Health & Safety'){
//             healthCount++;
//             if(props.alerts[i]['status'] == 'New')
//                 healthNew++;
//         }
//         else if (props.alerts[i]['alertCategory'] == 'Service Check'){
//             serviceCount++;
//             if(props.alerts[i]['status'] == 'New')
//                 serviceNew++;
//         }
//         else if (props.alerts[i]['alertCategory'] == 'Thermal Comfort'){
//             thermalCount++;
//             if(props.alerts[i]['status'] == 'New')
//                 thermalNew++;
//         }
//         else{
//             energyCount++;
//             if(props.alerts[i]['status'] == 'New')
//                 energyNew++;
//         }
//     }

//     var healthHoverLink = ""
//     var healthHover = "hover:tw-cursor-default";
//     if(healthCount >= 1){
//         healthHover = "hover:tw-cursor-pointer hover:tw-bg-gray-100";
//     }
//     else{
//         healthHoverLink = "tw-pointer-events-none"
//     }   

//     var serviceHoverLink = ""
//     var serviceHover = "hover:tw-cursor-default";
//     if(serviceCount >= 1){
//         serviceHover = "hover:tw-cursor-pointer hover:tw-bg-gray-100";
//     }
//     else{
//         serviceHoverLink = "tw-pointer-events-none"
//     }   

//     var thermalHoverLink = ""
//     var thermalHover = "hover:tw-cursor-default";
//     if(thermalCount >= 1){
//         thermalHover = "hover:tw-cursor-pointer hover:tw-bg-gray-100";
//     }
//     else{
//         thermalHoverLink = "tw-pointer-events-none"
//     }   

//     var energyHoverLink = ""
//     var energyHover = "hover:tw-cursor-default";
//     if(energyCount >= 1){
//         energyHover = "hover:tw-cursor-pointer hover:tw-bg-gray-100";
//     }
//     else{
//         energyHoverLink = "tw-pointer-events-none"
//     }   


//     const to = {
//         pathname: "/buildingAlerts/detailedAlerts",
//         alertCategory: props.alertCategory,
//         parentBuilding: props.pb
//     }

//     const dispatch = useDispatch()

//     const onCardClicked = (name, category) => {
//         dispatch({
//             type: ADD_SITE_NAME,
//             name: name
//         })

//         dispatch({
//             type: UPDATE_ALERT_CATEGORY,
//             alertCategory: category
//         })
//         // console.log("Robin")
//         console.log(props.alertCategory)

//     }


//     console.log(props.alerts)
//     return (
//         <>
//             <ul role="list" class="tw-divide-y tw-divide-gray-200 tw-ml-[-30px] tw-mb-[-10px] tw-select-none">
//                 <Link class={healthHoverLink} to={to}>
//                 <li tabIndex={1} class={healthHover + " tw-border-b tw-border-gray-200 tw-py-3 tw-mb-[0px] sm:tw-py-4 tw-rounded-md tw-px-4 tw-transition-all"} onClick={() => { onCardClicked(props.name, 'Health & Safety') }}>
//                     <a class="">
//                         <div class="tw-flex tw-items-center tw-space-x-4 ">
//                             <img src={safety} class="tw-rounded-md tw-ml-[0px] tw-mt-[0px] tw-h-9 tw-w-9 tw-mr-1" />
//                             <div class="tw-flex-1 tw-min-w-0">
//                                 <p class="tw-mb-0 tw-text-md tw-font-semibold tw-text-gray-800 tw-truncate">
//                                     Health and Safety
//                                 </p>
//                                 <div class="tw-flex">
//                                     {healthCount >= 1 && <p class="tw-mb-0 tw-text-md tw-truncate tw-text-blue-500 tw-font-semibold">
//                                         {healthCount} Active Alerts
//                                     </p>}
//                                     {healthCount == 0 && <p class="tw-mb-0 tw-text-md tw-truncate tw-text-black">
//                                         {healthCount} Active Alerts
//                                     </p>}
//                                 </div>
//                             </div>
//                             <div>
//                                 <span title={healthNew + " New Alerts"} class="tw-relative tw-inline-block tw-mt-1 tw-mr-2">
//                                     <img src={alertBell} class="tw-h-6 tw-w-6"/>
//                                     {healthNew != 0 && <span class="tw-absolute tw-top-[-15px] tw-right-[0px] tw-inline-flex tw-items-center tw-justify-center tw-px-[6px] tw-py-[2px] tw-text-xs tw-font-bold leading-none tw-text-red-100 tw-transform tw-translate-x-1/2 tw-translate-y-1/2 tw-bg-red-600 tw-rounded-full">{healthNew}</span>}
//                                 </span>
//                             </div>
//                         </div>
//                     </a>
//                 </li></Link>
//                 <Link class={serviceHoverLink} to={to}>
//                 <li tabIndex={1} class={serviceHover + " tw-border-b tw-py-3 tw-mb-[0px] sm:tw-py-4 tw-rounded-md tw-px-4 tw- hover:tw-transition-all tw-transition-all"} onClick={() => { onCardClicked(props.name, 'Service Check') }}>
//                     <a class="">
//                         <div class="tw-flex tw-items-center tw-space-x-4 ">
//                             <img src={service} class="tw-rounded-md tw-ml-[0px] tw-mt-[0px] tw-h-9 tw-w-9 tw-mr-1" />
//                             <div class="tw-flex-1 tw-min-w-0">
//                             <p class="tw-mb-0 tw-text-md tw-font-semibold tw-text-gray-800 tw-truncate">
//                                     Service Check
//                                 </p>
//                                 <div class="tw-flex">
//                                     {serviceCount >= 1 && <p class="tw-mb-0 tw-text-md tw-truncate tw-text-blue-500 tw-font-semibold">
//                                         {serviceCount} Active Alerts
//                                     </p>}
//                                     {serviceCount == 0 && <p class="tw-mb-0 tw-text-md tw-truncate tw-text-black">
//                                         {serviceCount} Active Alerts
//                                     </p>}
//                                 </div>
//                             </div>
//                             <div>
//                             <span title={serviceNew + " New Alerts"} class="tw-relative tw-inline-block tw-mt-1 tw-mr-2">
//                                     <img src={alertBell} class="tw-h-6 tw-w-6"/>
//                                     {serviceNew != 0 && <span class="tw-absolute tw-top-[-15px] tw-right-[0px] tw-inline-flex tw-items-center tw-justify-center tw-px-[6px] tw-py-[2px] tw-text-xs tw-font-bold leading-none tw-text-red-100 tw-transform tw-translate-x-1/2 tw-translate-y-1/2 tw-bg-red-600 tw-rounded-full">{serviceNew}</span>}
//                                 </span>
//                             </div>
//                         </div>
//                     </a>
//                 </li></Link>
//                 <Link class={thermalHoverLink} to={to}>
//                 <li tabIndex={1} class={thermalHover + " tw-border-b tw-py-3 tw-mb-[0px] sm:tw-py-4 tw-rounded-md tw-px-4 tw- hover:tw-transition-all tw-transition-all"} onClick={() => { onCardClicked(props.name, 'Thermal Comfort') }}>
//                     <a class="">
//                         <div class="tw-flex tw-items-center tw-space-x-4 ">
//                             <img src={thermal} class="tw-rounded-md tw-ml-[0px] tw-mt-[0px] tw-h-9 tw-w-9 tw-mr-1" />
//                             <div class="tw-flex-1 tw-min-w-0">
//                                 <p class="tw-mb-0 tw-text-md tw-font-semibold tw-text-gray-800 tw-truncate">
//                                     Thermal Comfort
//                                 </p>
//                                 <div class="tw-flex">
//                                     {thermalCount >= 1 && <p class="tw-mb-0 tw-text-md tw-truncate tw-text-blue-500 tw-font-semibold">
//                                         {thermalCount} Active Alerts
//                                     </p>}
//                                     {thermalCount == 0 && <p class="tw-mb-0 tw-text-md tw-truncate tw-text-black">
//                                         {thermalCount} Active Alerts
//                                     </p>}
//                                 </div>
//                             </div>
//                             <div>
//                             <span title={thermalNew + " New Alerts"} class="tw-relative tw-inline-block tw-mt-1 tw-mr-2">
//                                     <img src={alertBell} class="tw-h-6 tw-w-6"/>
//                                     {thermalNew != 0 && <span class="tw-absolute tw-top-[-15px] tw-right-[0px] tw-inline-flex tw-items-center tw-justify-center tw-px-[6px] tw-py-[2px] tw-text-xs tw-font-bold leading-none tw-text-red-100 tw-transform tw-translate-x-1/2 tw-translate-y-1/2 tw-bg-red-600 tw-rounded-full">{thermalNew}</span>}
//                                 </span>
//                             </div>
//                         </div>
//                     </a>
//                 </li></Link>
//                 <Link class={energyHoverLink} to={to}>
//                 <li tabIndex={1} class={energyHover + " tw-py-3 tw-mb-[0px] sm:tw-py-4 tw-rounded-md tw-px-4 tw- hover:tw-transition-all tw-transition-all"} onClick={() => { onCardClicked(props.name, 'Energy Efficiency') }}>
//                     <a class="">
//                         <div class="tw-flex tw-items-center tw-space-x-4 ">
//                             <img src={energy} class="tw-rounded-md tw-ml-[0px] tw-mt-[0px] tw-h-9 tw-w-9 tw-mr-1" />
//                             <div class="tw-flex-1 tw-min-w-0">
//                                 <p class="tw-mb-0 tw-text-md tw-font-semibold tw-text-gray-800 tw-truncate">
//                                     Energy Efficiency
//                                 </p>
//                                 <div class="tw-flex">
//                                     {energyCount >= 1 && <p class="tw-mb-0 tw-text-md tw-truncate tw-text-blue-500 tw-font-semibold">
//                                         {energyCount} Active Alerts
//                                     </p>}
//                                     {energyCount == 0 && <p class="tw-mb-0 tw-text-md tw-truncate tw-text-black">
//                                         {energyCount} Active Alerts
//                                     </p>}
//                                 </div>
//                             </div>
//                             <div>
//                             <span title={energyNew + " New Alerts"} class="tw-relative tw-inline-block tw-mt-1 tw-mr-2">
//                                     <img src={alertBell} class="tw-h-6 tw-w-6"/>
//                                     {energyNew != 0 && <span class="tw-absolute tw-top-[-15px] tw-right-[0px] tw-inline-flex tw-items-center tw-justify-center tw-px-[6px] tw-py-[2px] tw-text-xs tw-font-bold leading-none tw-text-red-100 tw-transform tw-translate-x-1/2 tw-translate-y-1/2 tw-bg-red-600 tw-rounded-full">{energyNew}</span>}
//                                 </span>
//                             </div>
//                         </div>
//                     </a>
//                 </li></Link>
//             </ul>
//         </>
//     )
// }



import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ADD_SITE_NAME, UPDATE_ALERT_CATEGORY } from '../constants/constants';

import safety from './../images/safety.svg';
import energy from './../images/energy.svg';
import service from './../images/service.svg';
import thermal from './../images/thermal.svg';
import alertBell from './../images/bell.svg';

export default function BuildingListComponent(props) {
  const dispatch = useDispatch();

  // Count variables for different alert categories
  let healthCount = 0;
  let serviceCount = 0;
  let thermalCount = 0;
  let energyCount = 0;

  // New alert count variables for each category
  let healthNew = 0;
  let serviceNew = 0;
  let thermalNew = 0;
  let energyNew = 0;

  // Loop through the alerts and update the counts
  for (let i = 0; i < props.alerts.length; i++) {
    const alert = props.alerts[i];
    const { alertCategory, status } = alert;

    if (alertCategory === 'Health & Safety') {
      healthCount++;
      if (status === 'New') healthNew++;
    } else if (alertCategory === 'Service Check') {
      serviceCount++;
      if (status === 'New') serviceNew++;
    } else if (alertCategory === 'Thermal Comfort') {
      thermalCount++;
      if (status === 'New') thermalNew++;
    } else {
      energyCount++;
      if (status === 'New') energyNew++;
    }
  }

  // Variables for managing styles and behavior of links and hover effects
  const healthHoverLink = (healthCount >= 1) ? '' : 'tw-pointer-events-none';
  const healthHover = (healthCount >= 1) ? 'hover:tw-cursor-pointer hover:tw-bg-gray-100' : 'hover:tw-cursor-default';

  const serviceHoverLink = (serviceCount >= 1) ? '' : 'tw-pointer-events-none';
  const serviceHover = (serviceCount >= 1) ? 'hover:tw-cursor-pointer hover:tw-bg-gray-100' : 'hover:tw-cursor-default';

  const thermalHoverLink = (thermalCount >= 1) ? '' : 'tw-pointer-events-none';
  const thermalHover = (thermalCount >= 1) ? 'hover:tw-cursor-pointer hover:tw-bg-gray-100' : 'hover:tw-cursor-default';

  const energyHoverLink = (energyCount >= 1) ? '' : 'tw-pointer-events-none';
  const energyHover = (energyCount >= 1) ? 'hover:tw-cursor-pointer hover:tw-bg-gray-100' : 'hover:tw-cursor-default';

  // Object for the link destination
  const to = {
    pathname: '/buildingAlerts/detailedAlerts',
    state: {
      alertCategory: props.alertCategory,
      parentBuilding: props.pb
    }
  };

  // Event handler for card click
  const onCardClicked = (name, category) => {
    dispatch({ type: ADD_SITE_NAME, name });
    dispatch({ type: UPDATE_ALERT_CATEGORY, alertCategory: category });
    console.log(props.alertCategory);
  };

  console.log(props.alerts);

  return (
    <>
      <ul role="list" className="tw-divide-y tw-divide-gray-200 tw-ml-[-30px] tw-mb-[-10px] tw-select-none">
        <Link className={healthHoverLink} to={to}>
          <li tabIndex={1} className={`${healthHover} tw-border-b tw-border-gray-200 tw-py-3 tw-mb-[0px] sm:tw-py-4 tw-rounded-md tw-px-4 tw-transition-all`} onClick={() => { onCardClicked(props.name, 'Health & Safety'); }}>
            <a>
              <div className="tw-flex tw-items-center tw-space-x-4">
                <img src={safety} className="tw-rounded-md tw-ml-[0px] tw-mt-[0px] tw-h-9 tw-w-9 tw-mr-1" />
                <div className="tw-flex-1 tw-min-w-0">
                  <p className="tw-mb-0 tw-text-md tw-font-semibold tw-text-gray-800 tw-truncate">
                    Health and Safety
                  </p>
                  <div className="tw-flex">
                    {healthCount >= 1 ? (
                      <p className="tw-mb-0 tw-text-md tw-truncate tw-text-blue-500 tw-font-semibold">
                        {healthCount} Active Alerts
                      </p>
                    ) : (
                      <p className="tw-mb-0 tw-text-md tw-truncate tw-text-black">
                        {healthCount} Active Alerts
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <span title={`${healthNew} New Alerts`} className="tw-relative tw-inline-block tw-mt-1 tw-mr-2">
                    <img src={alertBell} className="tw-h-6 tw-w-6" />
                    {healthNew !== 0 && (
                      <span className="tw-absolute tw-top-[-15px] tw-right-[0px] tw-inline-flex tw-items-center tw-justify-center tw-px-[6px] tw-py-[2px] tw-text-xs tw-font-bold leading-none tw-text-red-100 tw-transform tw-translate-x-1/2 tw-translate-y-1/2 tw-bg-red-600 tw-rounded-full">
                        {healthNew}
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </a>
          </li>
        </Link>
        <Link className={serviceHoverLink} to={to}>
          <li tabIndex={1} className={`${serviceHover} tw-border-b tw-py-3 tw-mb-[0px] sm:tw-py-4 tw-rounded-md tw-px-4 tw- hover:tw-transition-all tw-transition-all`} onClick={() => { onCardClicked(props.name, 'Service Check'); }}>
            <a>
              <div className="tw-flex tw-items-center tw-space-x-4">
                <img src={service} className="tw-rounded-md tw-ml-[0px] tw-mt-[0px] tw-h-9 tw-w-9 tw-mr-1" />
                <div className="tw-flex-1 tw-min-w-0">
                  <p className="tw-mb-0 tw-text-md tw-font-semibold tw-text-gray-800 tw-truncate">
                    Service Check
                  </p>
                  <div className="tw-flex">
                    {serviceCount >= 1 ? (
                      <p className="tw-mb-0 tw-text-md tw-truncate tw-text-blue-500 tw-font-semibold">
                        {serviceCount} Active Alerts
                      </p>
                    ) : (
                      <p className="tw-mb-0 tw-text-md tw-truncate tw-text-black">
                        {serviceCount} Active Alerts
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <span title={`${serviceNew} New Alerts`} className="tw-relative tw-inline-block tw-mt-1 tw-mr-2">
                    <img src={alertBell} className="tw-h-6 tw-w-6" />
                    {serviceNew !== 0 && (
                      <span className="tw-absolute tw-top-[-15px] tw-right-[0px] tw-inline-flex tw-items-center tw-justify-center tw-px-[6px] tw-py-[2px] tw-text-xs tw-font-bold leading-none tw-text-red-100 tw-transform tw-translate-x-1/2 tw-translate-y-1/2 tw-bg-red-600 tw-rounded-full">
                        {serviceNew}
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </a>
          </li>
        </Link>
        <Link className={thermalHoverLink} to={to}>
          <li tabIndex={1} className={`${thermalHover} tw-border-b tw-py-3 tw-mb-[0px] sm:tw-py-4 tw-rounded-md tw-px-4 tw- hover:tw-transition-all tw-transition-all`} onClick={() => { onCardClicked(props.name, 'Thermal Comfort'); }}>
            <a>
              <div className="tw-flex tw-items-center tw-space-x-4">
                <img src={thermal} className="tw-rounded-md tw-ml-[0px] tw-mt-[0px] tw-h-9 tw-w-9 tw-mr-1" />
                <div className="tw-flex-1 tw-min-w-0">
                  <p className="tw-mb-0 tw-text-md tw-font-semibold tw-text-gray-800 tw-truncate">
                    Thermal Comfort
                  </p>
                  <div className="tw-flex">
                    {thermalCount >= 1 ? (
                      <p className="tw-mb-0 tw-text-md tw-truncate tw-text-blue-500 tw-font-semibold">
                        {thermalCount} Active Alerts
                      </p>
                    ) : (
                      <p className="tw-mb-0 tw-text-md tw-truncate tw-text-black">
                        {thermalCount} Active Alerts
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <span title={`${thermalNew} New Alerts`} className="tw-relative tw-inline-block tw-mt-1 tw-mr-2">
                    <img src={alertBell} className="tw-h-6 tw-w-6" />
                    {thermalNew !== 0 && (
                      <span className="tw-absolute tw-top-[-15px] tw-right-[0px] tw-inline-flex tw-items-center tw-justify-center tw-px-[6px] tw-py-[2px] tw-text-xs tw-font-bold leading-none tw-text-red-100 tw-transform tw-translate-x-1/2 tw-translate-y-1/2 tw-bg-red-600 tw-rounded-full">
                        {thermalNew}
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </a>
          </li>
        </Link>
        <Link className={energyHoverLink} to={to}>
          <li tabIndex={1} className={`${energyHover} tw-py-3 tw-mb-[0px] sm:tw-py-4 tw-rounded-md tw-px-4 tw- hover:tw-transition-all tw-transition-all`} onClick={() => { onCardClicked(props.name, 'Energy Efficiency'); }}>
            <a>
              <div className="tw-flex tw-items-center tw-space-x-4">
                <img src={energy} className="tw-rounded-md tw-ml-[0px] tw-mt-[0px] tw-h-9 tw-w-9 tw-mr-1" />
                <div className="tw-flex-1 tw-min-w-0">
                  <p className="tw-mb-0 tw-text-md tw-font-semibold tw-text-gray-800 tw-truncate">
                    Energy Efficiency
                  </p>
                  <div className="tw-flex">
                    {energyCount >= 1 ? (
                      <p className="tw-mb-0 tw-text-md tw-truncate tw-text-blue-500 tw-font-semibold">
                        {energyCount} Active Alerts
                      </p>
                    ) : (
                      <p className="tw-mb-0 tw-text-md tw-truncate tw-text-black">
                        {energyCount} Active Alerts
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <span title={`${energyNew} New Alerts`} className="tw-relative tw-inline-block tw-mt-1 tw-mr-2">
                    <img src={alertBell} className="tw-h-6 tw-w-6" />
                    {energyNew !== 0 && (
                      <span className="tw-absolute tw-top-[-15px] tw-right-[0px] tw-inline-flex tw-items-center tw-justify-center tw-px-[6px] tw-py-[2px] tw-text-xs tw-font-bold leading-none tw-text-red-100 tw-transform tw-translate-x-1/2 tw-translate-y-1/2 tw-bg-red-600 tw-rounded-full">
                        {energyNew}
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </a>
          </li>
        </Link>
      </ul>
    </>
  );
}
