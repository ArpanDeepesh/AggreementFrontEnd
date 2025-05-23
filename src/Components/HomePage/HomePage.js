import "./HomePage.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserProfile from "../Context/UserProfile";
import FormButton from "../FormParts/FormButton";
import { getRequest, sendPostRequest } from "../Services/ContrectBackendAPI";
import { useState } from "react";
import PurchaseOrder from "../Context/PurchaseOrder";
import DelayMsgs from "../CommonPages/DelayMsgs";
import OtherData from "../Context/OtherData";

import ContractList from "./ContractList";
import RFQList from "./RFQList";
import Analytics from "./Analytics";


const HomePage = ({ setUserName, setUserType}) => {
    const navigate = useNavigate();
    const [displayName, setDisplayName] = useState();
    const [delayMsg, setDelayMsg] = useState([]);
    useEffect(() => {
        if (UserProfile.getLoginStatus() !== "1") {
            navigate("/");
        }
        var d = OtherData.getData();
        if (d.length > 0 && d.startsWith("{"))
        {
            var dObj = JSON.parse(d);
            if (dObj.typeValue && dObj.typeValue.length > 0) {
                navigate("/Pay");
            }
            if (dObj.counterpartyDetails && dObj.counterpartyDetails.length>0)
            {
                navigate("/CustomAgreement");
                
            }
        }
        
        setUserName(UserProfile.getName());
        setDisplayName(UserProfile.getName());
        setUserType(UserProfile.getUserType());
        //getRequest("api/POManagerAuth/getClientInfo", UserProfile.getToken()).then(rr => rr.json()).then(resD => {
        //    if (resD.message && resD.message === "Unauthorized:User is invalid")
        //    {
        //        UserProfile.resetUser();
        //        navigate("/");
        //        return;
        //    }
        //    setUserName(resD.data.name);
        //    UserProfile.setUserId(resD.data.id);
        //    UserProfile.setEmail(resD.data.email);
        //    UserProfile.setName(resD.data.name);
        //    UserProfile.setContactNumber(resD.data.phoneNumber);
        //}).catch(err => console.log(err));

        //getRequest("api/POManagement/GetPOAssociatedWithUser?isRaisedBy=false", UserProfile.getToken()).then(rr => rr.json()).then(res => {
        //    if (res.status === 0 && res.data.length > 0) {
        //        setRaisedForList(res.data);
        //    }
        //}).catch(err => console.log(err));
    }, []);
    



    return (
        <div className="main-content" >
            <div className="headerHome">
                <div className="page-title">
                    <h1>Dashboard</h1>
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
            <DelayMsgs msgList={delayMsg} setMsgList={setDelayMsg} />
            <div className="quick-actions">
                <div className="action-card" onClick={e => {
                    e.preventDefault();
                    navigate("/SelectTemplate");
                }}>
                    <i className="fas fa-file-contract"></i>
                    <h3>Create Contract</h3>
                    <p>Start a new contract from template</p>
                </div>
                <div className="action-card" onClick={e => {
                    e.preventDefault();
                    OtherData.resetData();
                    navigate("/NewRFQ");
                }}>
                    <i className="fas fa-clipboard-list"></i>
                    <h3>Generate RFQ</h3>
                    <p>Request for quotations</p>
                </div>
                <div className="action-card" onClick={e => {
                    e.preventDefault();
                    navigate("/userTerms");
                }} >
                    <i className="fas fa-file-alt"></i>
                    <h3>User Terms</h3>
                    <p>Create default terms</p>
                </div>
                <div className="action-card"  onClick={e => {
                    e.preventDefault();
                    navigate("/userItems");
                }}>
                    <i className="fas fa-boxes"></i>
                    <h3>Create Catalogue</h3>
                    <p>Build product/service catalog</p>
                </div>
            </div>

            <Analytics />
            <RFQList/>

            <ContractList />
            

        </div>
	);
};

export default HomePage;
