// import React, { useState } from 'react'
// import { Form, Button } from 'react-bootstrap'
// import './Login.css'
// import {
//   LOCAL_HOST, PORT,
//   PROD_API,
//   ADD_TOKEN,
//   SAVE_CURR_USERID
// } from '../constants/constants'
// import axios from 'axios';
// import { useDispatch } from "react-redux";
// import { useHistory } from 'react-router-dom';

// import { LockClosedIcon } from '@heroicons/react/20/solid'

// import logo from '../images/CGPLogo.png'

// export default function Login() {
//   const [username, setUsername] = useState("")
//   const [password, setPassword] = useState("")
//   const dispatch = useDispatch()
//   const history = useHistory()

//   function validateForm() {
//     return username.length > 0 && password.length > 0;
//   }

//   //suppressing the browser's default behaviour on form submit
//   function handleSubmit(event) {
//     event.preventDefault();
//   }

//   async function login() {
//     console.log('username')
//     const apiURL = process.env.NODE_ENV === 'development' ? `${LOCAL_HOST}:${PORT}/login/auth` : `${PROD_API}/login/auth`;
//     console.log('apiURL')
//     axios.post(apiURL, {
//       username: username,
//       password: password
//     })
//     .then(r => {
//       console.log(r);
//         if (r.errors !== undefined) {
//           r.errors.map(error => {
//             this.setState({
//               alert: true,
//               alert_msg: error.msg
//             })
//             setTimeout(function () {
//               this.setState({ alert: false, alert_msg: '' });
//             }.bind(this), 3000);
//           }
//           )
//         } else {
//           // console.log("SUCCESS", r.data.user)

//           dispatch({
//             type: ADD_TOKEN,
//             token: r.data.token
//           })
//           dispatch({
//             type: SAVE_CURR_USERID,
//             userId: r.data.user._id,
//             username: r.data.user.username
//           })
//           // history.push(`/alertHistory`)
//           // history.push('/serviceHistory')
//           history.push('/buildingAlerts')
//         }
//       })
//   }

//   return (
//     // <div className="Login">
//     //   <Form onSubmit={handleSubmit}>
//     //     <Form.Group size="lg" controlId="email">
//     //       <Form.Label>Username</Form.Label>
//     //       <Form.Control
//     //         autoFocus
//     //         type="username"
//     //         value={username}
//     //         onChange={(e) => setUsername(e.target.value)}
//     //       />
//     //     </Form.Group>

//     //     <Form.Group size="lg" controlId="password">
//     //       <Form.Label>Password</Form.Label>
//     //       <Form.Control
//     //         type="password"
//     //         value={password}
//     //         onChange={(e) => setPassword(e.target.value)}
//     //       />
//     //     </Form.Group>

//     //     <Button
//     //       onClick={login}
//     //       block size="lg" type="submit" disabled={!validateForm()}>
//     //       Login
//     //     </Button>
//     //   </Form>

//     // </div >  
    
//     <>

// {/*       
//         This example requires updating your template:

//         ```
//         <html class="h-full bg-gray-50">
//         <body class="h-full">
//         ```
//       */}
//       <div className="tw-flex tw-min-h-full tw-items-center tw-justify-center tw-py-12 tw-px-4 tw-sm:px-6 tw-lg:px-8">
//         <div className="tw-w-full tw-max-w-md tw-space-y-8">
//           <div>
//             <img
//               className="tw-mx-auto tw-h-12 tw-w-auto"
//               src={logo}
//               alt="Your Company"
//             />
//             <h2 className="tw-mt-6 tw-text-center tw-text-3xl tw-font-bold tw-tracking-tight tw-text-gray-900">
//               Welcome Back
//             </h2>
//           </div>
//           <form className="tw-mt-8 tw-space-y-6" action="#" method="POST">
//             <input type="hidden" name="remember" defaultValue="true" />
//             <div className="tw-space-y-px tw-rounded-md tw-shadow-sm">
//               <div>
//                 <label htmlFor="email-address" className="tw-sr-only">
//                   Email address
//                 </label>
//                 <input
//                   id="email-address"
//                   name="text"
//                   type="text"
//                   autoComplete="text"
//                   required
//                   className="tw-relative tw-block tw-w-full tw-appearance-none tw-rounded-none tw-rounded-t-md tw-border tw-border-gray-300 tw-px-3 tw-py-2 tw-text-gray-900 tw-placeholder-gray-500 tw-ocus:z-10 tw-focus:border-indigo-500 tw-focus:outline-none tw-focus:ring-indigo-500 tw-sm:text-sm"
//                   placeholder="Username"
//                   onChange={(e) => setUsername(e.target.value)}
//                 />
//               </div>
//               <div>
//                 <label htmlFor="password" className="tw-sr-only">
//                   Password
//                 </label>
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   autoComplete="current-password"
//                   required
//                   className="tw-relative tw-block tw-w-full tw-appearance-none tw-rounded-none tw-rounded-b-md btw-order tw-border-gray-300 tw-px-3 tw-py-2 tw-text-gray-900 tw-placeholder-gray-500 tw-focus:z-10 tw-focus:border-indigo-500 ftw-ocus:outline-none tw-focus:ring-indigo-500 tw-sm:text-sm"
//                   placeholder="Password"
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </div>
//             </div>

//             <div className="tw-flex tw-items-center tw-justify-between">
//               <div className="tw-flex tw-items-center">
//                 <input
//                   id="remember-me"
//                   name="remember-me"
//                   type="checkbox"
//                   className="tw-h-4 tw-w-4 tw-rounded tw-border-gray-300 tw-text-indigo-600 tw-focus:ring-indigo-500"
//                 />
//                 <label htmlFor="remember-me" className="tw-ml-2 tw-block tw-text-sm tw-text-gray-900">
//                   Remember me
//                 </label>
//               </div>

//               <div className="tw-text-sm">
//                 <a href="#" className="tw-font-medium tw-text-indigo-600 tw-hover:text-indigo-500">
//                   Forgot your password?
//                 </a>
//               </div>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 className="tw-group tw-relative tw-flex tw-w-full tw-justify-center tw-rounded-md tw-border tw-border-transparent tw-bg-indigo-600 tw-py-2 tw-px-4 tw-text-sm tw-font-medium tw-text-white tw-hover:bg-indigo-700 tw-focus:outline-none tw-focus:ring-2 tw-focus:ring-indigo-500 tw-focus:ring-offset-2"
//                 onClick={login()}>
//                 <span className="tw-absolute tw-inset-y-0 tw-left-0 tw-flex tw-items-center tw-pl-3">
//                   <LockClosedIcon className="tw-h-5 tw-w-5 tw-text-indigo-500 tw-group-hover:text-indigo-400" aria-hidden="true" />
//                 </span>
//                 Sign in
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }
import { Button, CircularProgress } from "@material-ui/core";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Colors from '../constants/Colors';
import { mapDispatchToProps } from "../reduxFunctions/reduxFunctions";
import DataFetcher from '../services/DataFetcher'; // Add path to datafetcher.js
import Network from '../services/Network'; // Add path to network.js
import StorageService from '../services/StorageService'; // Add path to storageservices.js
import ErrorText from "./Common/ErrorText";
import "./Login.css";

const Login = ({ saveLoginResponse }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [serverMsg, setServerMsg] = useState(null);
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [isFormValid, setFormValid] = useState(false);
  const [error, setError] = useState(null);

  const storageService = new StorageService();
  const network = new Network({}, {
    username: username,
    password: password
  });

  const dataFetcher = new DataFetcher(network, storageService);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // setLoading(true);
    // setUsername(username.trim());
    // setPassword(password.trim());
    // // if (validateForm()) {
    // const response = await dataFetcher.postData("/api/admin/signin");
    // setServerMsg(response);
    // console.log(response)
    // setLoading(false);
    // if (response.status === 200) {
    //   saveLoginResponse(response.data); // save the response data to the Redux store
    //   localStorage.setItem('isLoggedIn', 'true');
    //   localStorage.setItem('loginResponse', JSON.stringify(response.data));
    //   const permission = response.data.permissions;
    //   console.log(response.data);
    //   if (permission === "owner") {
    //     history.push("/Home");
    //   } else {
    //     history.push("/Home");
    //   }
    // } else {
    //   setError('Invalid email address or password.');
    // }
    // // } else {
    // // Form is not valid, do not submit
    // // setLoading(false);
    // // }
    e.preventDefault();
  setLoading(true);
  
  // Trim the username and password
  const trimmedUsername = username.trim();
  const trimmedPassword = password.trim();
  
  // Check if the username and password match the temporary hardcoded credentials
  if (trimmedUsername === "admin" && trimmedPassword === "abcd") {
    // Simulate a response object for successful login
    const response = {
      status: 200,
      data: {
        permissions: "owner",
        // Add any additional response data you need here
      }
    };
    
    console.log(response);
    
    // Save the response data to the Redux store (you would replace this with your actual Redux action)
    saveLoginResponse(response.data);
    
    // Simulate storing the login state and response in localStorage
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('loginResponse', JSON.stringify(response.data));
    
    // Redirect based on permission
    const permission = response.data.permissions;
    if (permission === "owner") {
      history.push("/Home");
    } else {
      history.push("/Home");
    }
  } else {
    // If credentials do not match, set an error message
    setError('Invalid email address or password.');
  }
  
  setLoading(false);
  };
  const usernamePattern = /^[a-zA-Z]+[a-zA-Z0-9.-_]{3,}$/;

  const validateForm = () => {
    let isValid = true;
    // Check if the useername is valid using the usernamePattern regular expression
    if (!usernamePattern.test(username)) {
      // Email is invalid
      isValid = false;
      // You can display an error message or handle it as needed
      setFormValid(isValid);
      setError('Please enter a valid username');
      return isValid;
    }
    // Check if the password is greater than 5 characters in length
    if (password.length < 6) {
      // Password is invalid
      isValid = false;
      // You can display an error message or handle it as needed
      setFormValid(isValid);
      setError('Password must be at least 6 characters long.');
    }
    // Update the state to indicate whether the form is valid
    return isValid;
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Welcome Back</h1>
        <p>Log in to see the latest information regarding your building</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Type your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link to="/reset" className="forgot-password-link">
            Forgot password?
          </Link>
          {isLoading ? <CircularProgress /> : <button onClick={handleSubmit} type="submit" className="login-button">Log in</button>}
        </form>
        <button onClick={() => history.push('/')} className="cancel-button">Cancel</button>
      </div>
    </div>
  );
};
export default connect(null, mapDispatchToProps)(Login);