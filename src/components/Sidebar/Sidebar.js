import React, { useState, useEffect } from "react";
import buildingAssureLogo from "../../images/buildingassure.png";
import "./Sidebar.css";
import '../../index.css';
import { APP_TITLE } from "../../constants/constants";
import { SidebarData, ContractorData } from "./DummyData";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Sidebar({ show, setter, setTitle }) {
  const location = useLocation();
  const [sideBarList, setSideBarList] = useState(SidebarData);

  // Define our base class
  const compClassName = "bg-primaryColor w-[300px] transition-[margin-left] ease-in-out duration-500 fixed md:static top-0 bottom-0 left-0 z-40 shadow-lg ";
  // Append class based on state of sidebar visiblity
  const appendClass = show ? " ml-0" : " ml-[-300px] md:ml-0";
  const primaryColor = "#07502d";
  const history = useHistory();
  const activemenuClassName = 'font-bold'
  const inactivemenuClassName = ''
  const activeBarClassName = 'w-2 h-8 mr-2 bg-white rounded-48';
  // const loginResponse = useSelector(state => state.login.loginResponse)
  // const permissions = loginResponse?.permissions;

  // TODO: This can be optimized to be fetched from localstorage only once after login and then kept in redux store
  useEffect(() => {
    const resp = localStorage.getItem('loginResponse');
    // console.log("login response", resp);
    // console.log("permissions", perm);
    const perm = JSON.parse(resp)?.permissions;
    if (perm === "serviceContractor") {
      setSideBarList(ContractorData);
    } else {
      setSideBarList(SidebarData);
    }
  },); //

  // console.log("login response fetched", loginResponse);
  // Clickable menu items
  const MenuItem = ({ item, name, route }) => {
    return (
      <Link to={route} style={{ color: primaryColor }} >
        <div
          key={name}
          className={`flex items-start  px-2 ml-2 cursor-pointer 
          ${location.pathname === route ? activemenuClassName : inactivemenuClassName}
          `}
          onClick={() => {
            if (name === 'Logout') {
              // TODO : call api on server
              localStorage.setItem('isLoggedIn', 'false');
              history.push("/");
            } else {
              setTitle(name);
              setter(oldVal => !oldVal);
            }
          }}
        >
          <div className={`${location.pathname === route ? activeBarClassName : 'w-3'}`}
          ></div>
          <div>
            <item.icon style={{ color: "white" }} />
          </div>
          <div className="pl-3">
            <p className="text-white">{name}</p>
          </div>
        </div>
      </Link>
    )
  }

  // Overlay to prevent clicks in background, also serves as our close button
  const ModalOverlay = () => (
    <div
      className={`flex md:hidden fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30`}
      onClick={() => {
        setter(oldVal => !oldVal);
      }}
    />
  )

  return (
    <>
      <div className={`sidebar scrollbar ${compClassName}${appendClass}`}>
        <div className="p-2 flex">
          {/*eslint-disable-next-line*/}
          <BALogo title={APP_TITLE} />
        </div>
        <div className="flex flex-col menu">
          {sideBarList.map((item, index) => {
            if (item.heading === 'Logout') {
              return <> </>
            }
            return (
              <MenuItem
                key={index}
                name={item.heading}
                route={index !== SidebarData.length - 1 ? item.route : '/login'}
                item={item}
              />)
          })}
        </div>
        <div className="mt-16">
          <MenuItem
            name='Logout'
            route='/'
            item={SidebarData[SidebarData.length - 1]}
          />
        </div>

      </div>
      {show ? <ModalOverlay /> : <></>}
    </>
  )
}


// Create a logo component which shows a image and text side by side
// and if the screen size is less than 768px then the text should be hidden
// and only the image should be shown
// and if the screen size is greater than 768px then the text should be shown
// and the image should be shown

export function BALogo(props) {
  return <>
    <div className="mx-auto flex-col justify-center items-center">
      <img src={buildingAssureLogo} alt="logo" />
      <p className="text-white ml-6">
        {props.title}
      </p>
    </div>
  </>
}