import React, { useEffect, useState } from 'react';
import "./DefaultLayout.css";
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
            <header className="bg-primary text-white py-2 pl-4 pr-4 pt-2 pb-2">
                {/*<a href="\LogOut" className="text-white text-decoration-none"> Logout</a>*/}
                {UserProfile.getLoginStatus() === "1" ? <div className="d-flex justify-content-between align-items-center">
                    <div class="hamburger" id="hamburger" onClick={e => {
                        e.preventDefault();
                        document.getElementById("menu").classList.toggle('active');
                    }}>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                    </div>
                    <div className="logo">
                        <a href="\" className="text-white text-decoration-none" onClick={(e) => {
                            //unlockPurchaseOrder();
                            PurchaseOrder.resetData();
                        }}>
                            <span className="logoText" >Contr<span className="logoSubPart">e</span>ct</span>
                        </a>
                    </div>
                    <div style={{ width:"100%" }}>
                    
                    <nav>
                        
                            <ul class="menu" id="menu" style={{ marginBottom: "0" }}>
                                <li>
                                    <a href="/">Home</a>
                                </li>
                                <li>
                                    <a href="/AboutUs">About us</a>
                                </li>
                                <li>
                                    <a href="/Policy">Privacy policy</a>
                                </li>
                                <li>
                                    <a href="/Terms">Terms and condition</a>
                                </li>
                                <li>
                                    <span className="d-inline d-md-none">
                                        <a href="\LogOut" className="text-white text-decoration-none" onClick={(e) => {
                                            //unlockPurchaseOrder();
                                            PurchaseOrder.resetData();
                                        }}> Logout</a></span>
                                </li>
                        </ul>
                        
                    </nav>
                    </div>
                    {loggedInUserName !== "" ? <div className="user-info">
                        <span className="me-4"><strong>{loggedInUserName} {loggedInUserType}</strong></span>
                        <span className="d-none d-md-block">
                        <a href="\LogOut" className="text-white text-decoration-none" onClick={(e) => {
                            //unlockPurchaseOrder();
                            PurchaseOrder.resetData();
                        }}> Logout</a></span>
                    </div>:<></>}
                    
                </div> :
                    <div className="d-flex justify-content-between align-items-center">
                        <div class="hamburger" id="hamburger" onClick={e => {
                            e.preventDefault();
                            document.getElementById("menu").classList.toggle('active');
                        }}>
                            <div class="bar"></div>
                            <div class="bar"></div>
                            <div class="bar"></div>
                        </div>
                        <div className="logo">
                            <a href="\" className="text-white text-decoration-none">
                                <span className="logoText" >Contr<span className="logoSubPart">e</span>ct</span></a>
                        </div>
                        <div style={{ width: "100%" }}>
                        <nav>

                                <ul class="menu" id="menu" style={{ marginBottom: "0" }}>
                                <li>
                                    <a href="/">Home</a>
                                </li>
                                <li>
                                    <a href="/AboutUs">About us</a>
                                </li>
                                <li>
                                    <a href="/Policy">Privacy policy</a>
                                </li>
                                <li>
                                    <a href="/Terms">Terms and condition</a>
                                </li>
                            </ul>
                        </nav></div>
                        
                    </div>
                }
            </header>
            <main className="appMainBody scrollable-mobile">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
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
                        <Route path="/DetailAgreement" element={<DetailAgreement setUserName={setLoggedInUsername} setUserType={setLoggedInUserType} />} />
                        
                        <Route path="/forgotPassword" element={<UnderMaintenance />} />
                        
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
                        
                        <Route path='*' element={<WrongAddress />} />
                    </Routes>
                </BrowserRouter>
            </main>
            <footer>
                <div>
                    Contract Agreement &copy; Musedaq Fintech Pvt. Ltd. 2024 (Last Updated:31 March 2025 1:29 AM (IST))
                </div>
            </footer>

        </div>
    );
}
export default NewLayout;