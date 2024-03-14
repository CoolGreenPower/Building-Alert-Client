import { Avatar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import "./Profile.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import SecurityIcon from '@mui/icons-material/Security';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
const Profile = () => {

  const menuItems = [
    { name: "Personal Information", link: "/personal", icon:AccountCircleIcon},
    { name: "Account Security", link: "/account-security",icon:SecurityIcon },
    { name: "Tenant List", link: "/tenantlist",icon:PeopleAltIcon },
    { name: "Contractor List", link: "/contractorlist",icon:ManageHistoryIcon },
    { name: "Manage Property", link: "/manage-property",icon:ManageAccountsIcon },
    { name: "Authorized User", link: "/authorized-user",icon:VerifiedUserIcon },
    { name: "Settings", link: "/settings",icon:SettingsIcon },
  ];

  return (
    <div className="user_profile">
        <h1>Profile</h1>
      <div className="profile_head" >
        <Avatar sx={{ width: 56, height: 56 }}>DG</Avatar>
        <h4>David Gordon</h4>
      </div>
      <div className="profile_body" >
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>  
              <Link to={item.link}>
              
              <ArrowForwardIosIcon />
              {<item.icon/>}
                {item.name}
                
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
