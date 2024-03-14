// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// import Routes from './components/Routes';
// import { Provider } from 'react-redux';
// import store from './store/store';
// import swDev from './swDev';
// import Dashboard from './components/Dashboard/Dashboard';
// import Signin from './components/Signin';
// import Signup from './components/Signup';
// import ResetPassword from './components/ResetPassword';
// import Guest from './components/Guest';
// // comment for test commit only

// ReactDOM.render(
//   <Provider store={store}>
//     <Router>
//       <Switch>
//         <Route exact={true} path="/" component={Signin} />
//         <Route exact={true} path="/signup" component={Signup} />
//         <Route exact={true} path="/reset" component={ResetPassword} />
//         <Route exact={true} path="/guest" component={Guest} />
//         <Dashboard/>
//         <Routes/>
//       </Switch>
//     </Router>
//   </Provider>
//   ,
//   document.getElementById('root')
// );

// swDev();

// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from 'react-router-dom'
// import Routes from './components/Routes';
// import { Provider } from 'react-redux';
// import store from './store/store';
// import swDev from './swDev';
// import Dashboard from './components/Dashboard/Dashboard';
// import Signin from './components/Signin';
// import Signup from './components/Signup';
// import ResetPassword from './components/ResetPassword';
// import Guest from './components/Guest';


// const history = useHistory();

// ReactDOM.render(

//   <Provider store={store}>
//     <Router>
//       <Switch>
//         <Route exact={true} path="/" render={() => (
//           localStorage.getItem('isLoggedIn') === 'true' ? (
//             history.push("/Home")
//           ) : (
//             <Signin/>
//           )
//         )} />
//         <Route exact={true} path="/signup" component={Signup} />
//         <Route exact={true} path="/reset" component={ResetPassword} />
//         <Route exact={true} path="/guest" component={Guest} />
//         <Route path="/dashboard" component={Dashboard}/>
//         <Routes/>
//       </Switch>
//     </Router>
//   </Provider>
//   ,
//   document.getElementById('root')
// );

// swDev();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom'
import Routes from './components/Routes';
import { Provider } from 'react-redux';
import store from './store/store';
import swDev from './swDev';
import Dashboard from './components/Dashboard/Dashboard';
import Signin from './components/Signin';
import Signup from './components/Signup';
import ResetPassword from './components/ResetPassword';
import Guest from './components/Guest';
import Login from './components/Login';

// New component
const HomeRedirect = () => {
  const history = useHistory();

  if (localStorage.getItem('isLoggedIn') === 'true') {
    const resp = localStorage.getItem('loginResponse');
    const perm = JSON.parse(resp)?.permissions;
    if (perm === "owner") {
      history.push("/Home");
    } else {
      history.push("/requests/new")
    }
    return null;
  } else {
    console.log("This is signin");
    return <Signin />;
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact={true} path="/" component={HomeRedirect} />
        <Route exact={true} path="/login" component={Login}/>
        <Route exact={true} path="/signup" component={Signup} />
        <Route exact={true} path="/reset" component={ResetPassword} />
        <Route exact={true} path="/guest" component={Guest} />
        <Route path="/dashboard" component={Dashboard}/>
        {<Dashboard /> /*important line */}
        <Routes />
      </Switch>
    </Router>
  </Provider>
  ,
  document.getElementById('root')
);

swDev();
