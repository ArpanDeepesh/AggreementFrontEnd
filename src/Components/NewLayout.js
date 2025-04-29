import React, { useEffect, useState } from 'react';
import "./NewLayout.css";
import WrongAddress from './CommonPages/WrongAddress';
import UserProfile from "./Context/UserProfile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage  from "./HomePage/HomePage";
import LandingPage  from "./LandingPage/LandingPage";
import ValidateOTP from './LandingPage/ValidateOTP';
import UpdateUser from './LandingPage/UpdateUser';
import LogOut from './LandingPage/LogOut';
import NewPO from './NewPO/NewPO';
import RFQApplication from './NewPO/RFQApplication';
import DetailContract from './DetailPO/DetailContract';
import PurchaseOrder from './Context/PurchaseOrder';
import CheckPODetails from './DetailPO/CheckPODetails';
import TermsAndCondtitions from './LandingPage/TermsAndConditions';
import PrivacyPolicy from './LandingPage/PrivacyPolicy';
import AboutUs from './LandingPage/AboutUs';
import Test from './LandingPage/Test';
import { checkConnection } from './Services/ContrectBackendAPI';
import UserTerms from './UserObjects/UserTerms';
import UserItems from './UserObjects/UserItems';
import UnderMaintenance from './CommonPages/UnderMaintenance';
import UserTermConditions from './UserObjects/UserTermConditions';
import DraftAgreement from './NewPO/DraftAgreement';
import DetailProposal from './DetailPO/DetailProposal';
import RFQApplyApplication from './NewPO/RFQApplyApplication';
import DetailAgreement from "./DetailPO/DetailAgreement";
import DraftInvoice from "./NewPO/DraftInvoice";
import EditInvoice from './NewPO/EditInvoice';
import EditTxnNote from "./NewPO/EditTxnNote";

import SelectContractTmplet from "./D2CTemplates/SelectContractTmplet";
import HomeMaintenance from "./D2CTemplates/HomeMaintenance";
import PersonalLoan from "./D2CTemplates/PersonalLoan";
import ResidentialAgreement from "./D2CTemplates/ResidentialAgreement";
import SublettingAgreement from "./D2CTemplates/SublettingAgreement";
import BuySellBtw2Parties from "./D2CTemplates/BuySellBtw2Parties";
import CustomAgreement from "./D2CTemplates/CustomAgreement";
import ForgotPassword from "./LandingPage/ForgotPassword";
import DraftB2CAgreement from './NewPO/DraftB2CAgreement';
import PaymentComponent from './SubscriptionsAndPayments/PaymentComponent';
import SubscriptionPage from './LandingPage/SubscriptionPage';
import SignInPage from './LandingPage/SignInPage';

const NewLayout = () => {
    const [loggedInUserName, setLoggedInUsername] = useState();
    const [loggedInUserType, setLoggedInUserType] = useState();
    useEffect(() => {
        checkConnection().then(rr => rr.text()).then(res => console.log(res)).catch(err => console.log(err));
    }, []);
    //const unlockPurchaseOrder = () => {
    //    if (PurchaseOrder.getPoId() > 0) {
    //        getRequest('api/POManagement/UnlockPO?poId=' + PurchaseOrder.getPoId(), UserProfile.getToken()).then(r => r.json()).then(res => {
    //            if (res) {
    //                console.log("Unlock done successfully.");
    //            }

    //        }).catch(err => {
    //            console.log(err);
    //        });
    //    }
    //};
    return (
        <div >
            <header>
                <div className="header-container">
                    <div className="logo">
                        <span>Contr<span style={{ color:"#ff8400" }}>e</span>ct</span>
                    </div>
                    <nav>
                        <a href="/Signup" className="btn btn-primary">Sign In</a>
                    </nav>
                </div>
            </header>

            {/*<header className="bg-primary text-white py-2 pl-4 pr-4 pt-2 pb-2">*/}
            {/*    */}{/*<a href="\LogOut" className="text-white text-decoration-none"> Logout</a>*/}
            {/*    {UserProfile.getLoginStatus() === "1" ? <div className="d-flex justify-content-between align-items-center">*/}
            {/*        <div className="hamburger" id="hamburger" onClick={e => {*/}
            {/*            e.preventDefault();*/}
            {/*            document.getElementById("menu").classList.toggle('active');*/}
            {/*        }}>*/}
            {/*            <div className="bar"></div>*/}
            {/*            <div className="bar"></div>*/}
            {/*            <div className="bar"></div>*/}
            {/*        </div>*/}
            {/*        <div className="logo">*/}
            {/*            <a href="\" className="text-white text-decoration-none" onClick={(e) => {*/}
            {/*                //unlockPurchaseOrder();*/}
            {/*                PurchaseOrder.resetData();*/}
            {/*            }}>*/}
            {/*                <span className="logoText" >Contr<span className="logoSubPart">e</span>ct</span>*/}
            {/*            </a>*/}
            {/*        </div>*/}
            {/*        <div style={{ width:"100%" }}>*/}
                    
            {/*        <nav>*/}
                        
            {/*                <ul className="menu" id="menu" style={{ marginBottom: "0" }}>*/}
            {/*                    <li>*/}
            {/*                        <a href="/">Home</a>*/}
            {/*                    </li>*/}
            {/*                    <li>*/}
            {/*                        <a href="/AboutUs">About us</a>*/}
            {/*                    </li>*/}
            {/*                    <li>*/}
            {/*                        <a href="/Policy">Privacy policy</a>*/}
            {/*                    </li>*/}
            {/*                    <li>*/}
            {/*                        <a href="/Terms">Terms and condition</a>*/}
            {/*                    </li>*/}
            {/*                    <li>*/}
            {/*                        <a href="/subscriptionList">Subscription list</a>*/}
            {/*                    </li>*/}
            {/*                    <li>*/}
            {/*                        <span className="d-inline d-md-none">*/}
            {/*                            <a href="\LogOut" className="text-white text-decoration-none" onClick={(e) => {*/}
            {/*                                //unlockPurchaseOrder();*/}
            {/*                                PurchaseOrder.resetData();*/}
            {/*                            }}> Logout</a></span>*/}
            {/*                    </li>*/}
            {/*            </ul>*/}
                        
            {/*        </nav>*/}
            {/*        </div>*/}
            {/*        {loggedInUserName !== "" ? <div className="user-info">*/}
            {/*            <span className="me-4"><strong>{loggedInUserName} {loggedInUserType}</strong></span>*/}
            {/*            <span className="d-none d-md-block">*/}
            {/*            <a href="\LogOut" className="text-white text-decoration-none" onClick={(e) => {*/}
            {/*                //unlockPurchaseOrder();*/}
            {/*                PurchaseOrder.resetData();*/}
            {/*            }}> Logout</a></span>*/}
            {/*        </div>:<></>}*/}
                    
            {/*    </div> :*/}
            {/*        <div className="d-flex justify-content-between align-items-center">*/}
            {/*            <div className="hamburger" id="hamburger" onClick={e => {*/}
            {/*                e.preventDefault();*/}
            {/*                document.getElementById("menu").classList.toggle('active');*/}
            {/*            }}>*/}
            {/*                <div className="bar"></div>*/}
            {/*                <div className="bar"></div>*/}
            {/*                <div className="bar"></div>*/}
            {/*            </div>*/}
            {/*            <div className="logo">*/}
            {/*                <a href="\" className="text-white text-decoration-none">*/}
            {/*                    <span className="logoText" >Contr<span className="logoSubPart">e</span>ct</span></a>*/}
            {/*            </div>*/}
            {/*            <div style={{ width: "100%" }}>*/}
            {/*            <nav>*/}

            {/*                    <ul className="menu" id="menu" style={{ marginBottom: "0" }}>*/}
            {/*                    <li>*/}
            {/*                        <a href="/">Home</a>*/}
            {/*                    </li>*/}
            {/*                    <li>*/}
            {/*                        <a href="/AboutUs">About us</a>*/}
            {/*                    </li>*/}
            {/*                    <li>*/}
            {/*                        <a href="/Policy">Privacy policy</a>*/}
            {/*                    </li>*/}
            {/*                    <li>*/}
            {/*                        <a href="/Terms">Terms and condition</a>*/}
            {/*                    </li>*/}
            {/*                </ul>*/}
            {/*            </nav></div>*/}
                        
            {/*        </div>*/}
            {/*    }*/}
            {/*</header>*/}
            {/*<main className="appMainBody scrollable-mobile">*/}
                
            {/*</main>*/}
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/Signup" element={<SignInPage />} />
                    <Route path="/Home" element={<HomePage setUserName={setLoggedInUsername} setUserType={setLoggedInUserType} />} />
                    <Route path="/ValidateUser" element={<ValidateOTP />} />
                    <Route path="/Terms" element={<TermsAndCondtitions setUserName={setLoggedInUsername} setUserType={setLoggedInUserType} />} />
                    <Route path="/Policy" element={<PrivacyPolicy setUserName={setLoggedInUsername} setUserType={setLoggedInUserType} />} />
                    <Route path="/AboutUs" element={<AboutUs setUserName={setLoggedInUsername} setUserType={setLoggedInUserType} />} />
                    <Route path="/test" element={<Test />} />
                    <Route path="/userItems" element={<UserItems setUserName={setLoggedInUsername} setUserType={setLoggedInUserType} />} />
                    <Route path="/userTerms" element={<UserTerms setUserName={setLoggedInUsername} setUserType={setLoggedInUserType} />} />
                    <Route path="/TermConditions" element={<UserTermConditions setUserName={setLoggedInUsername} setUserType={setLoggedInUserType} />} />
                    <Route path="/draftAgreement" element={<DraftAgreement setUserName={setLoggedInUsername} setUserType={setLoggedInUserType} />} />
                    <Route path="/draftD2C" element={<DraftB2CAgreement setUserName={setLoggedInUsername} setUserType={setLoggedInUserType} />} />

                    <Route path="/DetailAgreement" element={<DetailAgreement setUserName={setLoggedInUsername} setUserType={setLoggedInUserType} />} />

                    <Route path="/forgotPassword" element={<ForgotPassword />} />

                    <Route path="/UpdateUser" element={<UpdateUser setUserName={setLoggedInUsername} setUserType={setLoggedInUserType} />} />
                    <Route path="/LogOut" element={<LogOut setUserName={setLoggedInUsername} setUserType={setLoggedInUserType} />} />
                    <Route path="/NewRFQ" element={<RFQApplication />} />
                    <Route path="/ApplyRFQ" element={<RFQApplyApplication />} />
                    <Route path="/DraftInvoice" element={<DraftInvoice />} />
                    <Route path="/EditInvoice" element={<EditInvoice />} />
                    <Route path="/EditTxnNote" element={<EditTxnNote />} />
                    <Route path="/DetailProposal" element={<DetailProposal setUserName={setLoggedInUsername} setUserType={setLoggedInUserType} />} />
                    <Route path="/New" element={<NewPO setUserName={setLoggedInUsername} setUserType={setLoggedInUserType} />} />
                    <Route path="/DetailContract" element={<DetailContract setUserName={setLoggedInUsername} setUserType={setLoggedInUserType} />} />
                    <Route path="/CheckPODetails" element={<CheckPODetails setUserName={setLoggedInUsername} setUserType={setLoggedInUserType} />} />
                    <Route path="/pay" element={<PaymentComponent />} />
                    <Route path="/subscriptionList" element={<SubscriptionPage />} />
                    <Route path="/SelectTemplate" element={<SelectContractTmplet setUserName={setLoggedInUsername} setUserType={setLoggedInUserType} />} />
                    <Route path="/HomeMaintenanceT1" element={<HomeMaintenance setUserName={setLoggedInUsername} setUserType={setLoggedInUserType} />} />
                    <Route path="/PersonalLoanT1" element={<PersonalLoan setUserName={setLoggedInUsername} setUserType={setLoggedInUserType} />} />
                    <Route path="/ResidentialAgreementT1" element={<ResidentialAgreement setUserName={setLoggedInUsername} setUserType={setLoggedInUserType} />} />
                    <Route path="/SublettingAgreementT1" element={<SublettingAgreement setUserName={setLoggedInUsername} setUserType={setLoggedInUserType} />} />
                    <Route path="/BuySellT1" element={<BuySellBtw2Parties setUserName={setLoggedInUsername} setUserType={setLoggedInUserType} />} />
                    <Route path="/CustomAgreement" element={<CustomAgreement setUserName={setLoggedInUsername} setUserType={setLoggedInUserType} />} />
                    <Route path='*' element={<WrongAddress />} />
                </Routes>
            </BrowserRouter>
            <footer>
                <div className="container">
                    <div className="footerContent">
                        <div className="footerColumn">
                            <h3>Contrect</h3>
                            <p>Smart contract management for modern businesses and professionals.</p>
                            <div className="social-links">
                                <a href="/" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                                <a href="/" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
                                <a href="/" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
                                <a href="/" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                            </div>
                        </div>
                        <div className="footerColumn">
                            <h3>Products</h3>
                            <ul>
                                <li><a href="/">Contract Templates</a></li>
                                <li><a href="/">E-Signature</a></li>
                                <li><a href="/">Document Management</a></li>
                                <li><a href="/">API Integration</a></li>
                            </ul>
                        </div>
                        <div className="footerColumn">
                            <h3>Resources</h3>
                            <ul>
                                <li>
                                    <a href="/">Help Center</a>
                                </li>
                                <li><a href="/">Blog</a></li>
                                <li><a href="/">Webinars</a></li>
                                <li><a href="/">Legal Guides</a></li>
                            </ul>
                        </div>
                        <div className="footerColumn">
                            <h3>Company</h3>
                            <ul>
                                <li><a href="/">About Us</a></li>
                                <li><a href="/">Careers</a></li>
                                <li><a href="/">Contact</a></li>
                                <li><a href="/">Press</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="copyright">
                        <p>&copy; 2025 Contrect Technologies. All rights reserved.29 April 2025 9:51 PM  | <a href="/">Privacy Policy</a> | <a href="/">Terms of Service</a></p>
                    </div>
                </div>
            </footer>

        </div>
    );
}
export default NewLayout;