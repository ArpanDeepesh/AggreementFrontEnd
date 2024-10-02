import React, { useEffect } from 'react';
import "./MessageDisplay.css";

const DisappearingMessage = ({msg,setMsg}) => {

    useEffect(() => {
        // Set a timer to hide the element after 5 seconds
        const timer = setInterval(() => {
            setMsg("");
        }, 4000);

        // Clean up the timer when the component unmounts or visibility changes
        return () => clearInterval(timer);
    }, []);

    return (
        <>
            {msg !== "" && <div className="notification-box">{msg}</div>}
        </>
    );
};
export default DisappearingMessage;