import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from "@mui/icons-material/Notifications"; // Import notification icon
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import Colors from "../../constants/Colors";

export default function AppBarMobile(props) {
    return (
        <div className={`${props.className}`} >
            <MenuIcon className="bar_icon cursor-pointer" onClick={() => props.setter(oldVal => !oldVal)} />
            <h4 className="mx-auto font-bold text-primaryColor">{props.title}</h4>
            <div className="notification-icon flex">
                <div className="icon-container mx-2">
                    <Link to="/notifications" >
                        <NotificationsIcon
                            style={{ color: Colors.primary }}
                        />
                    </Link>
                </div>
                <div className="icon-container mx-2">
                    <Link to="/profile"  >
                        <AccountCircleIcon
                            style={{ color: Colors.primary }} />
                    </Link>
                </div>
            </div>
        </div >
    )
}
