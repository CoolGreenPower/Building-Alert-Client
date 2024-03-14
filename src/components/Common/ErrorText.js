// Create a error component

import React from "react";
import { useEffect } from "react";

function ErrorText(props) {
    useEffect(() => {
        // Set a timeout to hide the error after 5 seconds
        const timeoutId = setTimeout(() => {
            props.setError(null);
        }, 5000);

        // Clean up the timeout when the component unmounts
        return () => clearTimeout(timeoutId);
    }, [props, props.error, props.setError]);

    return (
        <div className="error-text py-2">
            <p style={{ color: "red" }}>{props.error}</p>
        </div>
    );
}

export default ErrorText;