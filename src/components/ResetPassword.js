import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@material-ui/core";
import "./ResetPassword.css";

const ResetPassword = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // TODO: Add logic to send a reset password link to the user.
        console.log(`Reset password link has been sent to ${email}`);
    };

    return (
        <div className="signup">    
            <div className="signup__form">
                <div className="signup__box">
                    <h5 className="app_name">Reset Password</h5>
                    <p className="tag_line">
                        Enter your email below to receive the reset password link.
                    </p>

                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="type your email"
                        value={email}
                    />

                    <Button onClick={handleSubmit}>Send Code</Button>
                </div>
                <div className="signup__box2">
                    <h6>
                         {""}
                        <Link className="signup__link" to="/">
                            cancel
                        </Link>
                    </h6>
                </div>
            </div>
            {/* <Redirect to="/dashboard" /> */}
        </div>
    );
};

export default ResetPassword;
