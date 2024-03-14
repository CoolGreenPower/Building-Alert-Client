import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { UPDATE_ALERT_CATEGORY } from '../constants/constants'
import { useDispatch } from 'react-redux'

import safety from './../images/safety.png'
import service from './../images/gearWithTool.png'
import thermal from './../images/hvac.png'
import energy from './../images/energyEfficiency.png'

export default function ColorCardComponent(props) {
    var logo;

    switch(props.cardColor){
        case 'info':
            logo = <img src={safety} class="tw-rounded-md tw-ml-[20px] tw-mt-[20px] tw-h-8 tw-w-6 tw-mr-1" />;
            break;
        case 'danger':
            logo = <img src={thermal} class="tw-rounded-md tw-ml-3 tw-mt-4 tw-h-9 tw-w-9" />;
            break;
        case 'warning':
            logo = <img src={service} class="tw-rounded-md tw-ml-3 tw-mt-4 tw-h-9 tw-w-9" />;
            break;
        case 'success':
            logo = <img src={energy} class="tw-rounded-md tw-ml-3 tw-mt-4 tw-h-9 tw-w-9" />;
            break;

        default:
            break;
        
    }

    // var cardClass;
    // console.log(props.cardColor);
    // switch(props.cardColor){
    //     case 'info':
    //         cardClass = "tw-text-center tw-p-6 xs:tw-w-[100%] md:tw-w-[13.5rem] xs:tw-h-[25%] md:tw-h-[13.5rem] tw-rounded-lg tw-border tw-border-gray-200 tw-shadow-md tw-bg-blue-300";
    //         break;
    //     case 'danger':
    //         cardClass = "tw-text-center tw-p-6 xs:tw-w-[100%] md:tw-w-[13.5rem] xs:tw-h-[25%] md:tw-h-[13.5rem] tw-rounded-lg tw-border tw-border-gray-200 tw-shadow-md tw-bg-red-300";
    //         break;
    //     case 'warning':
    //         cardClass = "tw-text-center tw-p-6 xs:tw-w-[100%] md:tw-w-[13.5rem] xs:tw-h-[25%] md:tw-h-[13.5rem] tw-rounded-lg tw-border tw-border-gray-200 tw-shadow-md tw-bg-yellow-300";
    //         break;
    //     case 'success':
    //         cardClass = "tw-text-center tw-p-6 xs:tw-w-[100%] md:tw-w-[13.5rem] xs:tw-h-[25%] md:tw-h-[13.5rem] tw-rounded-lg tw-border tw-border-gray-200 tw-shadow-md tw-bg-green-300";
    //         break;

    //     default:
    //         break;
        
    // }

    const dispatch = useDispatch()

    const dispatchAlertCategory = () => {
        dispatch({
            type: UPDATE_ALERT_CATEGORY,
            alertCategory: props.alertCategory
        })
    }

    const to = {
        pathname: "/buildingAlerts/detailedAlerts",
        alertCategory: props.alertCategory
    }

    console.log('ColorCardComponent')
    console.log(props)
    return(
    <>
    {/* https://uxwing.com/ */}
        <div class="">
            {
                props.totalAlerts > 0 &&
                <Link to={to}>
                    {/* <div class={cardClass}>
                        <h5 class="tw-mb-2 tw-text-2xl tw-font-bold tw-tracking-tight tw-text-gray-900">{props.alertCategory}</h5>
                        {
                            props.alertCategory == 'Health & Safety' && <br class="md:tw-block xs:tw-hidden"></br>
                        }
                        {
                            props.alertCategory == 'Service Check' && <br></br>
                        }
                        <p class="tw-mb-3 tw-font-normal tw-text-gray-700">{props.newAlerts} New Alerts</p>
                        <p class="tw-mb-3 tw-font-normal tw-text-gray-700">{props.inProgAlerts} Alert(s) In Progress</p>
                        <a href="#" class="xs:tw-hidden md:tw-inline-flex tw-items-center tw-py-2 tw-px-3 tw-text-sm tw-font-medium tw-text-center tw-text-black tw-bg-white tw-rounded-lg hover:tw-bg-white focus:tw-ring-4 focus:tw-outline-none focus:tw-ring-blue-300">
                            More info
                            <svg aria-hidden="true" class="tw-ml-2 tw-mr-1 tw-w-4 tw-h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </a>
                    </div> */}
                    <div class="tw-border-gray-100 tw-border tw-shadow-md tw-rounded-md tw-bg-gray-100 tw-h-28 tw-w-72 hover: hover:transition-all tw-transition-all">
                        <div class="tw-flex tw-h-[65%] tw-w-full tw-bg-white tw-pt-1">
                            {logo}
                            <div class="tw-pl-3 tw-pt-3">
                                <div class="tw-text-gray-600 tw-text-sm">
                                    {props.alertCategory}
                                </div>
                                <div class="tw-text-black">
                                    {props.totalAlerts} Total Alerts
                                </div>
                            </div>
                            <div class="tw-ml-3 tw-mt-8 tw-text-red-500">
                                ({props.newAlerts} New)
                            </div>
                        </div>
                        <div class="tw-flex tw-mt-3 tw-ml-[18px] tw-text-xs tw-font-semibold">View Alerts</div>
                    </div>
                </Link>
            }

            {
                props.totalAlerts === 0 &&
                <div class="tw-border-gray-100 tw-border tw-shadow-md tw-rounded-md tw-bg-gray-100 tw-h-28 tw-w-72">
                    <div class="tw-flex tw-h-[65%] tw-w-full tw-bg-white hover: hover:transition-all tw-transition-all tw-pt-1">
                        {logo}
                        <div class="tw-pl-3 tw-pt-3">
                            <div class="tw-text-gray-600 tw-text-sm">
                                {props.alertCategory}
                            </div>
                            <div class="tw-text-black">
                                {props.totalAlerts} Total Alerts
                            </div>
                        </div>
                    </div>
                    <div class="tw-flex tw-mt-3 tw-ml-[18px] tw-text-xs tw-font-semibold tw-text-black">No Alerts!</div>
                </div>
                // <div class={cardClass}>
                //     <h5 class="tw-mb-2 tw-text-2xl tw-font-bold tw-tracking-tight tw-text-gray-900">{props.alertCategory}</h5>
                //     <p class="tw-mb-3 tw-font-normal tw-text-gray-700">{props.newAlerts} New Alerts</p>
                //     <p class="tw-mb-3 tw-font-normal tw-text-gray-700">{props.inProgAlerts} Alert(s) In Progress</p>
                    
                // </div>
            }


            {/* <Card className="box"
                onClick={() => alert('This category has 0 alerts')}
                border={props.alertType}
                text="dark"
                style={{ width: '12rem', height: '12rem', textDecoration: 'none' }}
                bg={props.cardColor}
            >

                <Card.Header>
                    <Card.Title>
                        {props.totalAlerts} <br />
                        {props.alertCategory}

                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        {props.newAlerts} New
                    </Card.Text>
                    <Card.Text>
                        {props.inProgAlerts} In Progress
                    </Card.Text>
                </Card.Body>

            </Card> */}
        </div>
    </>
    )
}