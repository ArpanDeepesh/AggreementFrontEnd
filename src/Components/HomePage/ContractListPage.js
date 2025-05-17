import { useEffect, useState } from "react";
import UserProfile from "../Context/UserProfile";
import ContractList from "./ContractList";


const ContractListPage = ({ setUserName, setUserType }) => {
    const [displayName, setDisplayName] = useState();
    useEffect(() => {
        setUserName(UserProfile.getName());
        setUserType(UserProfile.getUserType());
        setDisplayName(UserProfile.getName());
    }, []);

    return (<>
        <div className="main-content">
            <div class="headerHome">
                <div class="page-title">
                    <h1>Contract List</h1>
                    <p>Welcome back, here's what's happening with your contracts today</p>
                </div>
                <div class="user-profile">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User profile" />
                    <div class="user-info">
                        <h4>{displayName}</h4>
                        <p>Premium Plan</p>
                        <a href="/LogOut" style={{ color: "#007bff" }}>Logout</a>
                    </div>
                </div>
            </div>
            <ContractList/>
        </div>
    </>);
}
export default ContractListPage;