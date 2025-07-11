import "./LandingPage.css";
import { useEffect, useRef, useState } from "react";
import {useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputField from "../FormParts/InputField";
import FormSubmitButton from "../FormParts/FormSubmitButton";
//import { sendAuthNotificationRequest } from "../Services/POContractBackendAPI";
import UserProfile from "../Context/UserProfile";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import { getRequestAllowAll } from "../Services/ContrectBackendAPI";
import FormButton from "../FormParts/FormButton";
import OtherData from "../Context/OtherData";

const SubscriptionPage = ({ setUserName, setUserType })=>{
	const navigate = useNavigate();
    const [subcriptionList, setSubcriptionList] = useState();
    const [displayName, setDisplayName] = useState();
    useEffect(() => {
        setDisplayName(UserProfile.getName());
        setUserName(UserProfile.getName());
        setUserType(UserProfile.getUserType());
		//if (UserProfile.getLoginStatus() !== "1") {
		//	navigate("/");
		//}
		getRequestAllowAll("api/General/SubscriptionList").then(r => r.json()).then(res => {
			setSubcriptionList(res.data);

		}).catch(err => console.log(err));
	}, []);

	return (
        <>
            <div className="main-content">
                {displayName && displayName.length > 0 ? <div className="headerHome">
                    <div className="page-title">
                        <h1>Pricing list</h1>
                        <p>Simple, Transparent Pricing <br/>Choose the plan that fits your business needs</p>
                    </div>
                    <div className="user-profile">
                        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User profile" />
                        <div className="user-info">
                            <h4>{displayName}</h4>
                            <p>Premium Plan</p>
                            <a href="/LogOut" style={{ color: "#007bff" }}>Logout</a>
                        </div>
                    </div>
                </div> : <></> }
                <section className="section-title">
                    
                </section>
                <section className="pricing-section">
                    <div className="container">
                        <div className="pricing-grid">
                            {subcriptionList && subcriptionList.length > 0 ? subcriptionList.map(x => <div className={x.id === 2 ? "pricing-card popular" : "pricing-card"}>
                                {x.id === 2 ? <div className="popular-badge">Most Popular</div> : <></>}
                                <div className="pricing-header">
                                    <h3>{x.typeValue}</h3>
                                    <div className="price">&#x20b9;{x.rate}<span>{x.id !== 4 ? "/month" : "/contract"} </span></div>
                                    <p>{x.id !== 1 ? "5 free +" + x.numberOfContracts + " contracts" : "5 free contracts"}</p>
                                </div>
                                <ul className="pricing-features">
                                    <li><i className="fas fa-check"></i> {x.numberOfAttachments} attachments per contract (1MB max)</li>
                                    <li><i className="fas fa-check"></i> 1 signing SMS included</li>
                                    <li><i className="fas fa-check"></i> &#x20b9;2/SMS for extras</li>
                                    <li><i className="fas fa-check"></i> {x.contractDurationLimit * 12 / 356}mo storage + 3mo archive</li>
                                    <li><i className="fas fa-check"></i> {x.genPdfCount} free audit report</li>
                                </ul>{x.id !== 4 && x.id !== 1 ? <a href="\" className={x.id === 2 ? "btn btn-success" : "btn btn-outline-primary"} onClick={(e) => {
                                    e.preventDefault();
                                    if (x.id !== 1) {
                                        OtherData.setData(JSON.stringify(x));
                                    }
                                    if (UserProfile.getUserId() > 0) {
                                        navigate("/pay");
                                    } else {
                                        navigate("/Signup");
                                    }

                                }}>Start</a> : <></>}

                            </div>) : <div className="pricing-card">
                                <div className="pricing-header">
                                    <h3>Free Tier</h3>
                                    <div className="price">&#x20b9;0<span>/month</span></div>
                                    <p>5 free contracts</p>
                                </div>
                                <ul className="pricing-features">
                                    <li><i className="fas fa-check"></i> 2 attachments per contract (1MB max)</li>
                                    <li><i className="fas fa-check"></i> 1 signing SMS included</li>
                                    <li><i className="fas fa-check"></i> &#x20b9;2/SMS for extras</li>
                                    <li><i className="fas fa-check"></i> 12mo storage + 3mo archive</li>
                                    <li><i className="fas fa-check"></i> 1 free audit report</li>
                                </ul>
                                <a href="\" className="btn btn-outline-primary" onClick={(e) => {
                                    e.preventDefault();

                                    navigate("/Signup");
                                }}>Get Started</a>
                            </div>}

                            <div className="pricing-card">
                                <div className="pricing-header">
                                    <h3>Customize subscription</h3>
                                    <div className="price">NA<span>/contract</span></div>
                                    <p>Number of contract can be customised</p>
                                </div>
                                <ul className="pricing-features">
                                    <li><i className="fas fa-check"></i>All access based on the discussion</li>
                                </ul>
                                <a href="\" className="btn btn-outline-primary" onClick={(e) => {
                                    e.preventDefault();
                                    navigate("/ContactUs");
                                }}>Contact us</a>
                            </div>
                        </div>

                        <div className="pricing-footer">
                            <p>All plans include: AI contract drafting, real-time tracking, and basic support.</p>
                        </div>
                    </div>
                </section>
            </div>
            
		</>
	);
};
export default SubscriptionPage;