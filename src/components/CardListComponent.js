import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ADD_SITE_NAME } from '../constants/constants';

export default function CardListComponent(props) {

// if numAlerts = 0 make color green
  let alertButton;

  if(props.alertNumber == 0){
    alertButton = 
    <button type="button" class="tw-inline-flex tw-items-center tw-px-3 tw-py-3 tw-text-sm tw-font-medium tw-text-center tw-text-white tw-bg-green-700 tw-rounded-lg focus:tw-ring-4 focus:tw-outline-none focus:tw-ring-green-300">
        <span class="tw-inline-flex tw-justify-center tw-items-center tw-pl-[px] tw-w-4 tw-h-4 tw-text-xs tw-font-semibold tw-text-green-800 tw-bg-green-200 tw-rounded-full">
            {props.alertNumber}
        </span>
    </button>
  }else{
    alertButton =
    <button type="button" class="tw-inline-flex tw-items-center tw-px-3 tw-py-3 tw-text-sm tw-font-medium tw-text-center tw-text-white tw-bg-red-700 tw-rounded-lg focus:tw-ring-4 focus:tw-outline-none focus:tw-ring-blue-300">
        <span class="tw-inline-flex tw-justify-center tw-items-center tw-pl-[px] tw-w-4 tw-h-4 tw-text-xs tw-font-semibold tw-text-red-800 tw-bg-red-200 tw-rounded-full">
            {props.alertNumber}
        </span>
    </button>
  }

    const dispatch = useDispatch()

    const onCardClicked = (name) => {
        dispatch({
            type: ADD_SITE_NAME,
            name: name
        })
    }

  return (
    // <>
    //     <div class="tw-p-4 tw-w-full tw-max-w-md tw-bg-white tw-rounded-lg tw-border tw-shadow-md sm:tw-p-8  ">
    //         <div class="tw-flex tw-justify-between tw-items-center tw-mb-4">
    //             <h5 class="tw-text-xl tw-font-bold tw-leading-none tw-text-gray-900 ">Businesses</h5>
    //             {/* <a href="#" class="tw-text-sm tw-font-medium tw-text-blue-600 hover:tw-underline ">
    //                 View all
    //             </a> */}
    //         </div>
    //         <div class="tw-flow-root">
    //             <ul role="list" class="tw-divide-y tw-divide-gray-200 tw-ml-[-30px]  tw-mb-[-10px]">
    //                 {/* this is what you populate with generateCardComponent functions - these divs in the ul add to a different component & have the rest of this in the main component*/}
    //                 <li class="tw-py-3 tw-mb-[-10px] sm:tw-py-4">
    //                     <div class="tw-flex tw-items-center tw-space-x-4">
    //                         <div class="tw-flex-1 tw-min-w-0">
    //                             <p class="tw-text-sm tw-font-medium tw-text-gray-900 tw-truncate">
    //                                 Business Name
    //                             </p>
    //                             <p class="tw-text-sm tw-text-gray-500 tw-truncate ">
    //                                 Address
    //                             </p>
    //                         </div>
    //                         <div class="tw-inline-flex tw-items-center tw-text-base tw-font-semibold tw-text-gray-900 ">
    //                             {/* alert badge */}
    //                         </div>
    //                     </div>
    //                 </li>
    //                 <li class="tw-py-3 tw-mb-[-10px] sm:tw-py-4">
    //                     <div class="tw-flex tw-items-center tw-space-x-4">
    //                         <div class="tw-flex-1 tw-min-w-0">
    //                             <p class="tw-text-sm tw-font-medium tw-text-gray-900 tw-truncate">
    //                                 Business Name
    //                             </p>
    //                             <p class="tw-text-sm tw-text-gray-500 tw-truncate ">
    //                                 Address
    //                             </p>
    //                         </div>
    //                         <div class="tw-inline-flex tw-items-center tw-text-base tw-font-semibold tw-text-gray-900 ">
    //                             {/* alert badge */}
    //                         </div>
    //                     </div>
    //                 </li>
    //                 <li class="tw-py-3 tw-mb-[-30px] sm:tw-py-4">
    //                     <div class="tw-flex tw-items-center tw-space-x-4">
    //                         <div class="tw-flex-1 tw-min-w-0">
    //                             <p class="tw-text-sm tw-font-medium tw-text-gray-900 tw-truncate">
    //                                 Business Name
    //                             </p>
    //                             <p class="tw-text-sm tw-text-gray-500 tw-truncate ">
    //                                 Address
    //                             </p>
    //                         </div>
    //                         <div class="tw-inline-flex tw-items-center tw-text-base tw-font-semibold tw-text-gray-900 ">
    //                             {/* alert badge */}
    //                         </div>
    //                     </div>
    //                 </li>
    //             </ul>
    //         </div>
    //     </div>
    // </>
    <>
    <Link to={{
            pathname: "/buildingAlerts/specAlerts",
            state: {
                alerts: props.alerts
            }
        }}>
        <li tabIndex={1} class="focus:tw-bg-gray-200 tw-py-3 tw-mb-[0px] sm:tw-py-4 tw-rounded-md tw-px-4 tw- hover:tw-transition-all tw-transition-all hover:tw-bg-gray-100" onClick={() => { onCardClicked(props.name) }}>
            <a class="hover:tw-cursor-pointer">
                <div class="tw-flex tw-items-center tw-space-x-4 ">
                    <div class="tw-flex-1 tw-min-w-0">
                        <p class="tw-text-sm tw-font-medium tw-text-gray-900 tw-truncate">
                            {props.name}
                        </p>
                        <p class="tw-text-sm tw-text-gray-500 tw-truncate ">
                            {props.address}
                        </p>
                    </div>
                    <div class="tw-inline-flex tw-items-center tw-text-base tw-font-semibold tw-text-gray-900 ">                    
                        {alertButton}
                    </div>
                </div>
            </a>
        </li>
    </Link>
    </>
  )
}
