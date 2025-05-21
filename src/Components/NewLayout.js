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
import FormButton from './FormParts/FormButton';
import ContractListPage from "./HomePage/ContractListPage";
import RFQListPage from "./HomePage/RFQListPage";
import AnalyticsPage from "./HomePage/AnalyticsPage";
import ResetPassword from './LandingPage/ResetPassword';
import ContactUs from './LandingPage/ContactUs';
import CookiePolicy from "./LandingPage/CookiePolicy";
const NewLayout = () => {
    const [loggedInUserName, setLoggedInUsername] = useState();
    const [loggedInUserType, setLoggedInUserType] = useState();
    useEffect(() => {
        checkConnection().then(rr => rr.text()).then(res => console.log(res)).catch(err => console.log(err));
        //setHideSignUp(0);
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
            {loggedInUserName && loggedInUserName.length > 0 ? <>
                <aside class="sidebar">
                    <div class="sidebar-header">
                        <div class="logo">
                            <i class="fas fa-file-contract" style={{ color: '#007bff' }}></i>
                            <a style={{ textDecoration: "none" }} href="/">
                                <span style={{ color: '#007bff' }}>Contr
                                    <span style={{ color: "#ff8400" }}>e</span>
                                    ct</span>
                            </a>
                        </div>
                    </div>

                    <nav class="nav-menu scrollable-section">
                        <div class="nav-title">Dashboard</div>
                        <a href="/home" class="nav-item active">
                            <i class="fas fa-home"></i>
                            <span>Overview</span>
                        </a>
                        <a href="/AnalyticsPage" class="nav-item">
                            <i class="fas fa-chart-line"></i>
                            <span>Analytics</span>
                        </a>

                        <div class="nav-title">Contracts</div>
                        <a href="/AllContracts" class="nav-item">
                            <i class="fas fa-file-signature"></i>
                            <span>All Contracts</span>
                        </a>
                        <a href="/SelectTemplate" class="nav-item">
                            <i class="fas fa-plus-circle"></i>
                            <span>Create New</span>
                        </a>
                        <a href="/SelectTemplate" class="nav-item">
                            <i class="fas fa-tasks"></i>
                            <span>Templates</span>
                        </a>
                        <a href="#" class="nav-item">
                            <i class="fas fa-archive"></i>
                            <span>Archive</span>
                        </a>

                        <div class="nav-title">RFQs</div>
                        <a href="/AllRFQ" class="nav-item">
                            <i class="fas fa-clipboard-list"></i>
                            <span>All RFQs</span>
                        </a>
                        <a href="/NewRFQ" class="nav-item">
                            <i class="fas fa-plus-circle"></i>
                            <span>Create RFQ</span>
                        </a>
                        <a href="/AllRFQ" class="nav-item">
                            <i class="fas fa-bullhorn"></i>
                            <span>Invitations</span>
                        </a>

                        <div class="nav-title">Settings</div>
                        <a href="/" class="nav-item">
                            <i class="fas fa-cog"></i>
                            <span>Account Settings</span>
                        </a>
                        <a href="/" class="nav-item">
                            <i class="fas fa-users"></i>
                            <span>Team Members</span>
                        </a>
                        <a href="/userTerms" class="nav-item">
                            <i class="fas fa-file-alt"></i>
                            <span>User Terms</span>
                        </a>
                        <a href="/userItems" class="nav-item">
                            <i class="fas fa-boxes"></i>
                            <span>Catalogues</span>
                        </a>
                    </nav>
                </aside>
                </>:<></>}
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/Signup" element={<SignInPage />} />
                    <Route path="/Home" element={<HomePage setUserName={setLoggedInUsername} setUserType={setLoggedInUserType} />} />
                    <Route path="/ValidateUser" element={<ValidateOTP />} />
                    <Route path="/Terms" element={<TermsAndCondtitions setUserName={setLoggedInUsername} setUserType={setLoggedInUserType} />} />
                    <Route path="/Policy" element={<PrivacyPolicy setUserName={setLoggedInUsername} setUserType={setLoggedInUserType} />} />
                    <Route path="/AboutUs" element={<AboutUs setUserName={setLoggedInUsername} setUserType={setLoggedInUserType} />} />
                    <Route path="/CookiePolicy" element={<CookiePolicy setUserName={setLoggedInUsername} setUserType={setLoggedInUserType} />} />
                    <Route path="/test" element={<Test />} />
                    <Route path="/ContactUs" element={<ContactUs />} />

                    <Route path="/userItems" element={<UserItems setUserName={setLoggedInUsername} setUserType={setLoggedInUserType} />} />
                    <Route path="/userTerms" element={<UserTerms setUserName={setLoggedInUsername} setUserType={setLoggedInUserType} />} />
                    <Route path="/TermConditions" element={<UserTermConditions setUserName={setLoggedInUsername} setUserType={setLoggedInUserType} />} />
                    <Route path="/draftAgreement" element={<DraftAgreement setUserName={setLoggedInUsername} setUserType={setLoggedInUserType} />} />
                    <Route path="/draftD2C" element={<DraftB2CAgreement setUserName={setLoggedInUsername} setUserType={setLoggedInUserType} />} />

                    <Route path="/DetailAgreement" element={<DetailAgreement setUserName={setLoggedInUsername} setUserType={setLoggedInUserType} />} />

                    <Route path="/forgotPassword" element={<ForgotPassword />} />
                    <Route path="/ResetPassword" element={<ResetPassword/> }/>

                    <Route path="/AllContracts" element={<ContractListPage setUserName={setLoggedInUsername} setUserType={setLoggedInUserType} />} />
                    <Route path="/AnalyticsPage" element={<AnalyticsPage setUserName={setLoggedInUsername} setUserType={setLoggedInUserType} /> }/>
                    <Route path="/AllRFQ" element={<RFQListPage setUserName={setLoggedInUsername} setUserType={setLoggedInUserType} />}/>
                    <Route path="/UpdateUser" element={<UpdateUser setUserName={setLoggedInUsername} setUserType={setLoggedInUserType} />} />
                    <Route path="/LogOut" element={<LogOut setUserName={setLoggedInUsername} setUserType={setLoggedInUserType} />} />
                    <Route path="/NewRFQ" element={<RFQApplication setUserName={setLoggedInUsername} setUserType={setLoggedInUserType} />} />
                    <Route path="/ApplyRFQ" element={<RFQApplyApplication />} />
                    <Route path="/DraftInvoice" element={<DraftInvoice />} />
                    <Route path="/EditInvoice" element={<EditInvoice />} />
                    <Route path="/EditTxnNote" element={<EditTxnNote />} />
                    <Route path="/DetailProposal" element={<DetailProposal setUserName={setLoggedInUsername} setUserType={setLoggedInUserType} />} />
                    <Route path="/New" element={<NewPO setUserName={setLoggedInUsername} setUserType={setLoggedInUserType} />} />
                    <Route path="/DetailContract" element={<DetailContract setUserName={setLoggedInUsername} setUserType={setLoggedInUserType} />} />
                    <Route path="/CheckPODetails" element={<CheckPODetails setUserName={setLoggedInUsername} setUserType={setLoggedInUserType} />} />
                    <Route path="/pay" element={<PaymentComponent setUserName={setLoggedInUsername} setUserType={setLoggedInUserType} />} />
                    <Route path="/subscriptionList" element={<SubscriptionPage setUserName={setLoggedInUsername} setUserType={setLoggedInUserType} />} />
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
                            <h3>Resources</h3>
                            <ul>
                                <li>
                                    <a href="/">Help Center</a>
                                </li>
                                <li><a href="/">Blog</a></li>
                                <li><a href="/subscriptionList">Subscription List</a></li>
                                <li><a href="/">Legal Guides</a></li>
                            </ul>
                        </div>
                        <div className="footerColumn">
                            <h3>Company</h3>
                            <ul>
                                <li><a href="/AboutUs">About Us</a></li>
                                <li><a href="/">Careers</a></li>
                                <li><a href="/ContactUs">Contact</a></li>
                                <li><a href="/">Press</a></li>
                            </ul>
                            
                        </div>
                        <div className="footerColumn">
                            <h3>Legal</h3>
                            <ul>
                                <li><a href="/Policy">Privacy Policy</a></li>
                                <li><a href="/Terms">Terms of Service</a></li>
                                <li><a href="/CookiePolicy">Cookie Policy</a></li>
                                <li><a href="/">GDPR Compliance</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="copyright">
                        <p>&copy; 2025 Musedaq Fintech Private Limited. All rights reserved. 4 May 2025 11:21 PM</p>
                    </div>
                </div>
            </footer>

        </div>
    );
}
export default NewLayout;