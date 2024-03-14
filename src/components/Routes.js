import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import HomeBar from "./HomeBar";
import MainDash from "./MainDash/MainDash";
import Login from "./Login";
import NewHome from "./MainDash/NewHome";

export default class Routes extends React.Component {
  render() {
    return (
      <Switch>
        {/* <Route exact={true} path="/" component={Signin} /> */}

        {/* <Route exact={true} path="/reset" component={ResetPassword} /> */}

        {/* <Route exact={true} path="/guest" component={Guest} /> */}

        <Route exact={true} path="/dashboard" component={Dashboard} />

        {/* <Route exact={true} path="/signup" component={Signup} /> */}

        <Route exact={true} path="/MainDash" component={MainDash} />

        <Route exact={true} path="/buildingAlerts" component={HomeBar} />
        
        <Route exact={true} path="/Home" component={NewHome}/>

        <Route path="/login" component={Login}/>

        <Route path="/serviceCheck" component={HomeBar} />

        <Route path="/addRecord" component={HomeBar} />

        <Route path="/alertHistory" component={HomeBar} />

        <Route path="/serviceHistory" component={HomeBar} />

        <Route path="/admin" component={HomeBar} />

        <Route
          exact={true}
          path="/buildingAlerts/specAlerts"
          component={HomeBar}
        />

        <Route
          exact={true}
          path="/buildingAlerts/detailedAlerts"
          component={HomeBar}
        />

        <Route
          exact={true}
          path="/buildingAlerts/respondAlert"
          component={HomeBar}
        />

        <Route
          exact={true}
          path="/alertHistory/detailedAlerts"
          component={HomeBar}
        />

        <Route path="/serviceHistory/detailedAlerts" component={HomeBar} />

        <Route
          exact={true}
          path="/serviceCheck/serviceCheckSpecAlerts"
          component={HomeBar}
        />

        <Route
          exact={true}
          path="/serviceCheck/serviceCheckDetailedAlerts"
          component={HomeBar}
        />

        <Route
          exact={true}
          path="/serviceCheck/respondAlert"
          component={HomeBar}
        />
      </Switch>
    );
  }
}
