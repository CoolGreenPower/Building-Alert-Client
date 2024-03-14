import { React, useState } from "react";
import "./Dashboard.css";
import Sidebar from "../Sidebar/Sidebar";
import MainDash from "../MainDash/MainDash";
import { Route, Switch, Link } from "react-router-dom";
import NewAlert from "./NewAlert";
import Contractors from "./Contractors";
import Profile from "./Profile";
import PersonalInfo from "./PersonalInfo";
import Settings from "./Settings";
import Tenants from "./Tenants";
import RequestHistory from "./RequestHistory";
import AlertHistory from "./AlertHistory";
import AppBarMobile from "../../components/Common/AppBar"
import TenantList from "./TenantList";
import ContractorList from "./ContractorList";
import NewHome from "../MainDash/NewHome";
import HomeDash from "../MainDash/HomeDash";
import AlertsManagement from "../AlertManagement/AlertsManagement";
import Sensors from "../MainDash/Sensors";
import UtilityBill from "../MainDash/UtilityBill";
import Notifications from "./Notifications";
import CreateRequest from "../RequestManagement/CreateRequest";
import AlertManagement from "../AlertManagement/AlertManagement";
import RequestManagement from "../RequestManagement/RequestManagement";
import Requests from "../RequestManagement/Requests";
import CompletedAlerts from "../AlertManagement/CompletedAlerts";
import CompletedRequests from "../RequestManagement/CompletedRequests";
import AlertReview from "../MainDash/AlertReview";
import { Home } from "@material-ui/icons";
function Dashboard() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [title, setTitle] = useState("Home");

  return (
    <div>
      <Route path="/Home" component={NewHome} />
      {/* <div className="min-h-screen">
        <div className="parent-container flex">
          <div className="md:hidden">
            <AppBarMobile
              className='appbar'
              setter={setShowSidebar} title={title} />
          </div>
          <Sidebar className='sidebar' show={showSidebar} setter={setShowSidebar} setTitle={setTitle} />
          <div className="sidebar-content">
            <Switch>
              <Route path="/NewAlert" component={NewAlert} />
              <Route path="/Home" component={NewHome} />
              <Route path="/Sensors" component={Sensors} />
              <Route path="/MainDash" component={MainDash} />
              <Route path="/contractors" component={Contractors} />
              <Route path="/requesthistory" component={RequestHistory} />
              <Route path="/alerthistory" component={AlertHistory} />
              <Route path="/tenants" component={Tenants} />
              <Route path="/profile" component={Profile} />
              <Route path="/notifications" component={Notifications} />
              <Route path="/personal" component={PersonalInfo} />
              <Route path="/tenantlist" component={TenantList} />
              <Route path="/contractorlist" component={ContractorList} />
              <Route path="/settings" component={Settings} />
              <Route path="/utility" component={UtilityBill} />

              {/* Contractor }
              <Route path="/alerts/manage" component={AlertManagement} />
              <Route path="/alerts/review/:alertId" component={AlertReview} />
              <Route path="/alerts/new" component={AlertsManagement}
                render={(props) => <AlertsManagement {...props} inProgress={true} />}
              />
              <Route path="/alerts/in-progress" component={AlertsManagement}
                render={(props) => <AlertsManagement {...props} inProgress={true} />}
              />
              <Route path="/alerts/completed" component={CompletedAlerts} />
              <Route path="/requests/manage" component={RequestManagement} />
              <Route path="/requests/completed" component={CompletedRequests} />
              <Route path="/requests/new" component={CreateRequest} />
              <Route path="/requests/in-progress" component={Requests}
                render={(props) => <Requests {...props} inProgress={true} />}
              />
              <Route path="/requests/requests" component={Requests}
                render={(props) => <Requests {...props} inProgress={false} />}
              />
            </Switch>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Dashboard;
