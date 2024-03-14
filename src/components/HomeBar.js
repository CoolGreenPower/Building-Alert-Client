// import React from 'react';
// import { Nav, Navbar, Button } from 'react-bootstrap'
// import { connect } from 'react-redux';
// import { mapStateToProps } from '../reduxFunctions/reduxFunctions';
// import { mapDispatchToProps } from '../reduxFunctions/reduxFunctions';
// import { Link, Route, Switch } from 'react-router-dom'
// import BuildingAlertsComponent from './BuildingAlertsComponent';
// import ServiceCheckComponent from './ServiceCheckComponents/ServiceCheckComponent';
// import AddRecordComponent from './AddRecordComponent';
// import DetailedAlerts from './DetailedAlerts';
// import Admin from './Admin'
// import SpecAlerts from './SpecAlerts';
// import RespondAlert from './RespondAlert';
// import ServiceCheckSpecAlert from './ServiceCheckComponents/ServiceCheckSpecAlert';
// import ServiceCheckDetailedAlerts from './ServiceCheckComponents/ServiceCheckDetailedAlerts';
// import ServiceCheckRespondAlert from './ServiceCheckComponents/ServiceCheckRespondAlert';
// import AlertHistoryLandingPage from './AlertHistoryComponents/AlertHistoryLandingPage';
// import DetailedAlertHistory from './AlertHistoryComponents/DetailedAlertHistory';
// import ServiceHistoryLandingPage from './ServiceHistory/ServiceHistoryLandingPage';
// import DetailedServiceHistory from './ServiceHistory/DetailedServiceHistory';
// import logo from '../images/CGPLogo.png'
// import noTextLogo from '../images/CGPnoText.png'
// import axios from 'axios'
// import { LOCAL_HOST, PORT } from '../constants/constants'

// //navbar imports
// import { Fragment } from 'react'
// import { Disclosure, Menu, Transition } from '@headlessui/react'
// import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

// const user = {
//   name: 'Jenna Smith',
//   email: 'jennasmith@gmail.com',
//   imageUrl:
//     'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
// }
// const navigation = [
//   { name: 'Building Alerts', href: '/buildingAlerts', current: true },
//   { name: 'Service Check', href: '/serviceCheck', current: false },
//   { name: 'Alert History', href: '#', current: false },
//   { name: 'Service History', href: '#', current: false },
//   { name: 'Admin', href: '#', current: false },
//   { name: 'Settings', href: '#', current: false },
// ]
// const userNavigation = [
//   { name: 'Your Profile', href: '#' },
//   { name: 'Settings', href: '#' },
//   { name: 'Sign out', href: '#' },
// ]




// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }

// class HomeBar extends React.Component {

//   componentDidMount(){
//     axios.post(`${LOCAL_HOST}:${PORT}/users/`,
//             {
//                 // this.props.userId
//                 "userId": "631b3bd8b6c86ccbde46f8d9"
//             },
//             {
//                 headers: {
//                     'x-auth-token': localStorage.getItem('token'),
//                     'content-type': 'application/json'
//                 }
//             })
//             .then(res => {
//               console.log("HOMEBAR RES")
//               console.log(res)
//             })
//   }

//   render() {
//     return(
//       <>
//         <div className="tw-min-h-full">
//         <Disclosure as="nav" className="tw-bg-gray-800">
//           {({ open }) => (
//             <>
//               <div className="tw-mx-auto tw-max-w-7xl tw-px-4 tw-sm:px-6 tw-lg:px-8">
//                 <div className="tw-flex tw-h-16 tw-items-center jtw-ustify-between">
//                   <div className="tw-flex tw-items-center">
//                     <div className="tw-flex-shrink-0">
//                       <img
//                         className="tw-h-8 tw-w-8"
//                         src={noTextLogo}
//                         alt="CoolGreenPower"
//                       />
//                     </div>
//                     <div className="xs:tw-hidden lg:tw-block">
//                       <div className="tw-ml-10 tw-flex tw-items-baseline tw-space-x-4">
//                         {navigation.map((item) => (
//                           <Link to={item.href}
//                             key={item.name}
//                             href={item.href}
//                             className={classNames(
//                               item.current
//                                 ? 'tw-bg-gray-900 tw-text-white tw-no-underline hover:tw-text-white'
//                                 : 'tw-text-gray-300 hover:tw-bg-gray-700 hover:tw-text-white',
//                               'tw-px-3 tw-py-2 tw-rounded-md tw-text-sm tw-font-medium tw-no-underline hover:tw-text-white'
//                             )}
//                             aria-current={item.current ? 'page' : undefined}
//                           >
//                             {item.name}
//                           </Link>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="xs:tw-hidden lg:tw-block tw-ml-auto">
//                     <div className="tw-ml-4 tw-flex tw-items-center md:tw-ml-6">
//                       <button
//                         type="button"
//                         className="tw-rounded-full tw-bg-gray-800 tw-p-1 tw-text-gray-400 hover:tw-text-white tw-focus:outline-none tw-focus:ring-2 tw-focus:ring-white tw-focus:ring-offset-2 tw-focus:ring-offset-gray-800"
//                       >
//                         <span className="tw-sr-only">View notifications</span>
//                         <BellIcon className="tw-h-6 tw-w-6" aria-hidden="true" />
//                         {/* <span class="tw-absolute tw-top-[0px] tw-right-[0px] tw-inline-flex tw-mr-[20%] tw-items-center tw-justify-center tw-px-[6px] tw-py-[2px] tw-text-xs tw-font-bold leading-none tw-text-red-100 tw-transform tw-translate-x-1/2 tw-translate-y-1/2 tw-bg-red-600 tw-rounded-full">1</span> */}
//                       </button>

//                       {/* Profile dropdown */}
//                       <Menu as="div" className="tw-relative tw-ml-3">
//                         <div>
//                           <Menu.Button className="tw-flex tw-max-w-xs tw-items-center tw-rounded-full tw-bg-gray-800 tw-text-sm tw-focus:outline-none tw-focus:ring-2 tw-focus:ring-white tw-focus:ring-offset-2 tw-focus:ring-offset-gray-800">
//                             <span className="tw-sr-only">Open user menu</span>
//                             <img className="tw-h-8 tw-w-8 tw-rounded-full" src={user.imageUrl} alt="" />
//                           </Menu.Button>
//                         </div>
//                         <Transition
//                           as={Fragment}
//                           enter="tw-transition tw-ease-out tw-duration-100"
//                           enterFrom="tw-transform tw-tw-opacity-0 tw-scale-95"
//                           enterTo="tw-transform tw-opacity-100 tw-scale-100"
//                           leave="tw-transition tw-ease-in tw-duration-75"
//                           leaveFrom="tw-transform tw-opacity-100 tw-scale-100"
//                           leaveTo="tw-transform tw-opacity-0 tw-scale-95"
//                         >
//                           <Menu.Items className="tw-absolute tw-right-0 tw-z-10 tw-mt-2 tw-w-48 tw-origin-top-right tw-rounded-md bg-tw-white tw-py-1 tw-shadow-lg tw-ring-1 bg-white tw-ring-[#dfdfdf] tw-ring-tw-opacity-5 tw-focus:outline-none">
//                             {userNavigation.map((item) => (
//                               <Menu.Item key={item.name}>
//                                 {({ active }) => (
//                                   <a
//                                     href={item.href}
//                                     className={classNames(
//                                       active ? 'tw-bg-gray-100 tw-no-underline hover:tw-text-gray-700' : '',
//                                       'tw-block tw-px-4 tw-py-2 tw-text-sm tw-text-gray-700 tw-no-underline hover:tw-text-gray-700'
//                                     )}
//                                   >
//                                     {item.name}
//                                   </a>
//                                 )}
//                               </Menu.Item>
//                             ))}
//                           </Menu.Items>
//                         </Transition>
//                       </Menu>
//                     </div>
//                   </div>
//                   <div className="tw-mr-2 tw-flex lg:tw-hidden tw-justify-between">
//                     {/* Mobile menu button */}
//                     <Disclosure.Button className="tw-absolute tw-right-0 tw-top-[12.8px] tw-mr-[10px] tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-float-right tw-bg-gray-800 tw-p-2 tw-text-gray-400 hover:tw-bg-gray-700 hover:tw-text-white focus:tw-outline-none">
//                       <span className="tw-sr-only">Open main menu</span>
//                       {open ? (
//                         <XMarkIcon className="tw-block tw-h-6 tw-w-6" aria-hidden="true" />
//                       ) : (
//                         <Bars3Icon className="tw-block tw-h-6 tw-w-6" aria-hidden="true" />
//                       )}
//                     </Disclosure.Button>
//                   </div>
//                 </div>
//               </div>

//               <Disclosure.Panel className="lg:tw-hidden">
//                 <div className="tw-space-y-1 tw-px-2 tw-pt-2 tw-pb-3 tw-sm:px-3">
//                   {navigation.map((item) => (
//                     <Link
//                       onClick={!open}
//                       to={item.href}
//                       key={item.name}
//                       as="a"
//                       href={item.href}
//                       className={classNames(
//                         item.current ? 'tw-bg-gray-900 tw-text-white hover:tw-text-white' : 'tw-text-gray-300 hover:tw-bg-gray-700 hover:tw-text-white',
//                         'tw-block tw-px-3 tw-py-2 tw-rounded-md tw-text-base tw-font-medium'
//                       )}
//                       aria-current={item.current ? 'page' : undefined}
//                     >
//                       {item.name}
//                     </Link>
//                   ))}
//                 </div>
//                 <div className="tw-border-t tw-border-gray-700 tw-pt-4 tw-pb-3">
//                   <div className="tw-flex tw-items-center tw-px-5">
//                     <div className="tw-flex-shrink-0">
//                       <img className="tw-h-10 tw-w-10 tw-rounded-full" src={user.imageUrl} alt="" />
//                     </div>
//                     <div className="tw-ml-3">
//                       <div className="tw-text-base tw-font-medium tw-leading-none tw-text-white">{user.name}</div>
//                       <div className="tw-text-sm tw-font-medium tw-leading-none tw-text-gray-400 mt-1">{user.email}</div>
//                     </div>
//                     <button
//                       type="button"
//                       className="tw-ml-auto tw-flex-shrink-0 tw-rounded-full tw-bg-gray-800 tw-p-1 tw-text-gray-400 hover:tw-text-white tw-focus:outline-none tw-focus:ring-2 tw-focus:ring-white tw-focus:ring-offset-2 tw-focus:ring-offset-gray-800"
//                     >
//                       <span className="tw-sr-only">View notifications</span>
//                       <BellIcon className="tw-h-6 tw-w-6" aria-hidden="true" />
//                     </button>
//                   </div>
//                   <div className="tw-mt-3 tw-space-y-1 tw-px-2">
//                     {userNavigation.map((item) => (
//                       <Disclosure.Button
//                         key={item.name}
//                         as="a"
//                         href={item.href}
//                         className="tw-block tw-rounded-md tw-px-3 tw-py-2 tw-text-base tw-font-medium tw-text-gray-400 hover:tw-bg-gray-700 hover:tw-text-white"
//                       >
//                         {item.name}
//                       </Disclosure.Button>
//                     ))}
//                   </div>
//                 </div>
//               </Disclosure.Panel>
//             </>
//           )}
//         </Disclosure>

//         {/* Keep Building Alerts header when there is navbar?*/}
//         {/* maybe keep on mobile only? */}
//         <header id="#header" className="tw-bg-white tw-shadow">
//           <div className="tw-mx-auto tw-max-w-7xl tw-py-6 tw-px-4 tw-sm:px-6 tw-lg:px-8 tw-f tw-flex tw-w-full tw-justify-center">
//             <h1 className="tw-text-3xl tw-font-bold tw-tracking-tight tw-text-gray-900">Building Alerts</h1>
//           </div>
//         </header>
//         <main>
//           <div className="tw-mx-auto tw-max-w-7xl tw-tw-py-6 tw-tw-sm:px-6 tw-lg:px-8">
//             {/* Replace with your content */}
//             <Switch>
//               <Route
//                 exact={true}
//                 path="/buildingAlerts"
//                 component={BuildingAlertsComponent} />

//               <Route
//                 exact={true}
//                 path="/serviceCheck"
//                 component={ServiceCheckComponent} />

//               <Route
//                 exact={true}
//                 path="/addRecord"
//                 component={AddRecordComponent} />

//               <Route
//                 exact={true}
//                 path="/alertHistory"
//                 component={AlertHistoryLandingPage} />

//               <Route
//                 exact={true}
//                 path="/serviceHistory"
//                 component={ServiceHistoryLandingPage} />

//               <Route
//                 exact={true}
//                 path="/buildingAlerts/specAlerts"
//                 component={SpecAlerts} />

//               <Route
//                 exact={true}
//                 path="/buildingAlerts/detailedAlerts"
//                 component={DetailedAlerts} />

//               <Route
//                 exact={true}
//                 path="/admin"
//                 component={Admin} />

//               <Route
//                 exact={true}
//                 path="/buildingAlerts/respondAlert"
//                 component={RespondAlert} />

//               <Route
//                 exact={true}
//                 path="/serviceCheck/serviceCheckSpecAlerts"
//                 component={ServiceCheckSpecAlert} />

//               <Route
//                 exact={true}
//                 path="/serviceCheck/serviceCheckDetailedAlerts"
//                 component={ServiceCheckDetailedAlerts} />

//               <Route
//                 exact={true}
//                 path="/serviceCheck/respondAlert"
//                 component={ServiceCheckRespondAlert} />

//               <Route
//                 exact={true}
//                 path="/alertHistory/detailedAlerts"
//                 component={DetailedAlertHistory} />

//               <Route
//                 path="/serviceHistory/detailedAlerts"
//                 component={DetailedServiceHistory} />

//             </Switch>
//             {/* /End replace */}
//           </div>
//         </main>
//       </div>
//       </>
//       // <>
//       // <div>
//       // <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
//       //   <Navbar.Brand href="#home">CoolGreenPower</Navbar.Brand>
//       //   <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//       //   <Navbar.Collapse id="responsive-navbar-nav">
//       //     <Nav className="tw-mr-auto">
//       //       <Nav.Link eventKey="1">
//       //         <Link to={`/buildingAlerts`}
//       //           style={{ textDecoration: 'none' }}
//       //           text="white"
//       //         >
//       //           Building Alerts
//       //         </Link>
//       //       </Nav.Link>

//       //       <Nav.Link
//       //         eventKey="1">
//       //         <Link to={`/serviceCheck`}
//       //           style={{ textDecoration: 'none' }}>
//       //           Service Check
//       //         </Link>
//       //       </Nav.Link>

//       //       <Nav.Link
//       //         eventKey="1">
//       //         <Link to={`/alertHistory`}
//       //           style={{ textDecoration: 'none' }}>
//       //           Alert History
//       //         </Link>
//       //       </Nav.Link>

//       //       <Nav.Link
//       //         eventKey="1">
//       //         <Link to={`/serviceHistory`}
//       //           style={{ textDecoration: 'none' }}>
//       //           Service History
//       //         </Link>
//       //       </Nav.Link>
            
//       //       <Nav.Link
//       //         eventKey="1"
//       //         style={{ textDecoration: 'none' }}
//       //         onClick={() => this.props.updateCurrPage('serviceHistory')}>
//       //         Service History
//       //       </Nav.Link> THIS WAS COMMENTED OUT IN DEVELOPMENT

//       //       <Nav.Link
//       //         eventKey="1">
//       //         <Link to={`/admin`}
//       //           style={{ textDecoration: 'none' }}>
//       //           Admin
//       //         </Link>
//       //       </Nav.Link>

//       //       <Nav.Link
//       //         eventKey="1">
//       //         Settings
//       //       </Nav.Link>
//       //     </Nav>
//       //   </Navbar.Collapse>
//       // </Navbar> 
      

//       // <Switch>
//       //   <Route
//       //     exact={true}
//       //     path="/buildingAlerts"
//       //     component={BuildingAlertsComponent} />

//       //   <Route
//       //     exact={true}
//       //     path="/serviceCheck"
//       //     component={ServiceCheckComponent} />

//       //   <Route
//       //     exact={true}
//       //     path="/addRecord"
//       //     component={AddRecordComponent} />

//       //   <Route
//       //     exact={true}
//       //     path="/alertHistory"
//       //     component={AlertHistoryLandingPage} />

//       //   <Route
//       //     exact={true}
//       //     path="/serviceHistory"
//       //     component={ServiceHistoryLandingPage} />

//       //   <Route
//       //     exact={true}
//       //     path="/buildingAlerts/specAlerts"
//       //     component={SpecAlerts} />

//       //   <Route
//       //     exact={true}
//       //     path="/buildingAlerts/detailedAlerts"
//       //     component={DetailedAlerts} />

//       //   <Route
//       //     exact={true}
//       //     path="/admin"
//       //     component={Admin} />

//       //   <Route
//       //     exact={true}
//       //     path="/buildingAlerts/respondAlert"
//       //     component={RespondAlert} />

//       //   <Route
//       //     exact={true}
//       //     path="/serviceCheck/serviceCheckSpecAlerts"
//       //     component={ServiceCheckSpecAlert} />

//       //   <Route
//       //     exact={true}
//       //     path="/serviceCheck/serviceCheckDetailedAlerts"
//       //     component={ServiceCheckDetailedAlerts} />

//       //   <Route
//       //     exact={true}
//       //     path="/serviceCheck/respondAlert"
//       //     component={ServiceCheckRespondAlert} />

//       //   <Route
//       //     exact={true}
//       //     path="/alertHistory/detailedAlerts"
//       //     component={DetailedAlertHistory} />

//       //   <Route
//       //     path="/serviceHistory/detailedAlerts"
//       //     component={DetailedServiceHistory} />

//       // </Switch>

//       // <div class="tw-justify-center tw-fixed tw-bottom-0 tw-left-[50%] tw-ml-[-146px]">
//       //   <img src={logo} alt="Logo" />
//       // </div>

//       // <div>
//       //   {this.props.currPage !== 'serviceHistory' &&
//       //     <Button
//       //       variant="primary"
//       //       style={{ marginLeft: 20 }}
//       //       onClick={() => this.props.updateCurrPage('serviceHistory')}
//       //     >
//       //       History
//       //     </Button>
//       //   }  THIS WAS COMMENTED OUT

//       //   {(this.props.currPage === 'serviceHistory') &&
//       //     <Link to={`/addRecord`}>
//       //       <Button
//       //         variant="primary"
//       //         style={{ marginLeft: 20 }}
//       //         onClick={() => this.props.updateCurrPage('addRecord')}
//       //       >
//       //         Add Record
//       //       </Button>
//       //     </Link>
//       //   }
//       //   </div>
//       // </div>
//       // </>
//     )

//   }
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(HomeBar)