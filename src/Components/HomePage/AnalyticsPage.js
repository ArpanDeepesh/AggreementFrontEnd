import { useEffect, useState } from "react";
import UserProfile from "../Context/UserProfile";
import Analytics from "./Analytics";


const AnalyticsPage = ({ setUserName, setUserType }) => {
    const [displayName, setDisplayName] = useState();
    useEffect(() => {
        setUserName(UserProfile.getName());
        setUserType(UserProfile.getUserType());
        setDisplayName(UserProfile.getName());
    }, []);

    return (<>
        <div className="main-content">
            <div className="headerHome">
                <div className="page-title">
                    <h1>Contract List</h1>
                    <p>Welcome back, here's what's happening with your contracts today</p>
                </div>
                <div className="user-profile">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User profile" />
                    <div className="user-info">
                        <h4>{displayName}</h4>
                        <p>Premium Plan</p>
                        <a href="/LogOut" style={{ color: "#007bff" }}>Logout</a>
                    </div>
                </div>
            </div>
            <Analytics />
        </div>
    </>);
}
export default AnalyticsPage;