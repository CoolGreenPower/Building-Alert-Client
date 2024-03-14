import { Button } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import DataFetcher from "../services/DataFetcher";
import Network from "../services/Network";
import StorageService from "../services/StorageService";
import "./Signup.css";


function Signup() {
  const [email, setemail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setname] = useState("");
  const [mobilenumber, setmobilenumber] = useState("");
  const [password, setpassword] = useState("");
  const [permissions, setPermissions] = useState("");
  const [serverMsg, setServerMsg] = useState(null);
  const [submitted, setSubmitted] = useState(null);
  const history = useHistory();

  const storageService = new StorageService();
  const network = new Network({}, {
    username: username,
    name: name,
    email: email,
    mobilenumber : mobilenumber,
    password: password,
    permissions: permissions
  });

  const dataFetcher = new DataFetcher(network, storageService);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const response = await dataFetcher.postData("/api/auth/signup");
    setServerMsg(response);
    console.log(response)
    setSubmitted(false);
    if (response.status === 200) {
      // Set a success message
      setServerMsg({ success: true, message: "User created successfully!", message_user:response.data.message });
      // Wait 2 seconds before redirecting to the sign in page
      setTimeout(() => {
        history.push("/");
      }, 3000);
    }
  };


  return (
    <div className="signup">
    {/* {serverMsg && serverMsg.success && <Alert severity="success">{serverMsg.message}</Alert>} */}
    {serverMsg && serverMsg.success && 
        <Alert severity="success">
          <AlertTitle>Account created successfully!</AlertTitle>
          {serverMsg.message_user}
        </Alert>
      }

      <div className="signup__form">
        <div className="signup__box">
          <h5 className="app_name">Join</h5>
          <h5 className="app_name1">myBuilding Alerts</h5>
          <p className="tag_line">
          Be alerted to conditions affecting Health & Safety, items affecting utility bills, areas requring service, and general notifications affecting your building, and more.
          </p>

          <input
            onChange={(e) => setname(e.target.value)}
            type="text"
            placeholder="full name"
            value={name}
          />

          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="username"
            value={username}
          />

          <input
            onChange={(e) => setmobilenumber(e.target.value)}
            type="text"
            placeholder="Mobile Number"
            value={mobilenumber}
          />


          <input
            onChange={(e) => setemail(e.target.value)}
            type="email"
            placeholder="email address"
            value={email}
          />

          <input
            type="password"
            placeholder="password"
            onChange={(e) => setpassword(e.target.value)}
            value={password}
          />

          {/* <input
            type="text"
            placeholder="type your permissions"
            onChange={(e) => setPermissions(e.target.value)}
            value={permissions}
          /> */}

          {/* <select
            value={permissions}
            onChange={(e) => setPermissions(e.target.value)}
          >
            <option value="">--Select your role--</option>
            <option value="owner">Owner</option>
            <option value="tenant">Tenant</option>
            <option value="contractor">Contractor</option>
            <option value="property manager">Property Manager</option>
          </select> */}

          <Button onClick={handleSubmit}>Create Account</Button>
        </div>
        <button onClick={() => history.push('/')} className="cancel-button">Cancel</button>
      </div>
      {/* <Redirect to="/dashboard" /> */}
    </div>
  );
}

export default Signup;
