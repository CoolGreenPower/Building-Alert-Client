// import { Button, CircularProgress } from "@material-ui/core";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import React, { useState } from "react";
// import { connect } from "react-redux";
// import { Link, useHistory } from "react-router-dom";
// import Colors from '../constants/Colors';
// import buildingAssureLogo from "../images/buildingassure.png";
// import { mapDispatchToProps } from "../reduxFunctions/reduxFunctions";
// import DataFetcher from '../services/DataFetcher'; // Add path to datafetcher.js
// import Network from '../services/Network'; // Add path to network.js
// import StorageService from '../services/StorageService'; // Add path to storageservices.js
// import ErrorText from "./Common/ErrorText";
// import "./Signin.css";

// const Signin = ({ saveLoginResponse }) => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [serverMsg, setServerMsg] = useState(null);
//   const history = useHistory();
//   const [isLoading, setLoading] = useState(false);
//   const [isFormValid, setFormValid] = useState(false);
//   const [error, setError] = useState(null);

//   const storageService = new StorageService();
//   const network = new Network({}, {
//     username: username,
//     password: password
//   });

//   const dataFetcher = new DataFetcher(network, storageService);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setUsername(username.trim());
//     setPassword(password.trim());
//     // if (validateForm()) {
//     const response = await dataFetcher.postData("/api/admin/signin");
//     setServerMsg(response);
//     console.log(response)
//     setLoading(false);
//     if (response.status === 200) {
//       saveLoginResponse(response.data); // save the response data to the Redux store
//       localStorage.setItem('isLoggedIn', 'true');
//       localStorage.setItem('loginResponse', JSON.stringify(response.data));
//       const permission = response.data.permissions;
//       if (permission === "owner") {
//         history.push("/Home");
//       } else {
//         history.push("/requests/new");
//       }
//     } else {
//       setError('Invalid email address or password.');
//     }
//     // } else {
//     // Form is not valid, do not submit
//     // setLoading(false);
//     // }
//   };
//   const usernamePattern = /^[a-zA-Z]+[a-zA-Z0-9.-_]{3,}$/;

//   const validateForm = () => {
//     let isValid = true;
//     // Check if the useername is valid using the usernamePattern regular expression
//     if (!usernamePattern.test(username)) {
//       // Email is invalid
//       isValid = false;
//       // You can display an error message or handle it as needed
//       setFormValid(isValid);
//       setError('Please enter a valid username');
//       return isValid;
//     }
//     // Check if the password is greater than 5 characters in length
//     if (password.length < 6) {
//       // Password is invalid
//       isValid = false;
//       // You can display an error message or handle it as needed
//       setFormValid(isValid);
//       setError('Password must be at least 6 characters long.');
//     }
//     // Update the state to indicate whether the form is valid
//     return isValid;
//   }

//   return (
//     <div className="signin container-fluid d-flex justify-center text-center">
//       <div className="container-fluid row align-items-start signin__form">
//         <div className="signin__box">
//           <img
//             className="signin__img"
//             src={buildingAssureLogo}
//             alt="building assure logo"
//           />
//           <h5 className="app_name" >myBuilding Alerts</h5>
//           <input
//             onChange={(e) => setUsername(e.target.value)}
//             type="text"
//             placeholder="Username"
//             value={username}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//           />
//           <div className="flex justify-end w-full">
//             <Link className="bold" to="/reset"
//               style={{ color: Colors.primary, fontWeight: 'bold' }}>
//               Forgot Password?
//             </Link>
//           </div>
//           {isLoading ? <CircularProgress /> : <Button onClick={handleSubmit}
//             style={{ height: '50px', width: "200px", backgroundColor: Colors.primary, color: Colors.white }}
//           >Log in</Button>}
//           {!isFormValid ? <ErrorText error={error} setError={setError} /> : null}
//         </div>
//         <div className="signin__box2">
//           <h6>
//             Don't Have an Account? {""}
//             <Link className="signin__link" to="/signup"
//               style={{ color: Colors.primary, fontWeight: 'bold' }}
//             >
//               Sign Up
//             </Link>
//           </h6>
//           <p>or</p>
//           <h6><Link className="guest__report" to="/guest"
//             style={{ color: Colors.primary, fontWeight: 'bold', textDecoration: 'underline' }}
//           >Submit an issue as a guest</Link></h6>
//         </div>
//       </div>
//     </div >
//   );
// }

// export default connect(null, mapDispatchToProps)(Signin);
import React from 'react';
import { Link } from 'react-router-dom';
import './Signin.css'; // Make sure your CSS matches the design you want
import logo from '../images/New Logo.png';
const SigninScreen = () => {
  return (
    <div className="signin-screen" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div className="signin-logo">
        {/* Logo can be an image or text, adjust accordingly */}
        <img className="NewLogo" src={logo} alt="Logo" style={{ maxWidth: '100%', height: 'auto' }} />
      </div>
      <div className="signin-buttons" style={{ width: '80%', maxWidth: '600px' }}>
        {/* The buttons might need additional styling */}
        <Link className="btn btn-primary" to="/login" style={{ width: '100%', marginBottom: '1rem' }}>Log in</Link>
        <Link className="btn btn-outline-primary" to="/signup"style={{ width: '100%', marginBottom: '1rem' }}>Create an Account</Link>
        <h6><Link className="guest-issue" to="/guest"style={{ fontWeight: 'bold'}}>Submit an issue as a guest</Link></h6>
      </div>
    </div>
  );
};

export default SigninScreen;
