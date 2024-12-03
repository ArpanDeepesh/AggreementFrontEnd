import React, { useEffect, useState } from 'react';
import "./DefaultLayout.css";
import WrongAddress from './CommonPages/WrongAddress';
import { checkConnection } from './Services/POContractBackendAPI';
import UserProfile from "./Context/UserProfile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage  from "./HomePage/HomePage";
import LandingPage  from "./LandingPage/LandingPage";
import ValidateOTP from './LandingPage/ValidateOTP';
import UpdateUser from './LandingPage/UpdateUser';
import LogOut from './LandingPage/LogOut';
import NewPO from './NewPO/NewPO';
import DetailPO from './DetailPO/DetailPO';
import PurchaseOrder from './Context/PurchaseOrder';
import CheckPODetails from './DetailPO/CheckPODetails';
import { getRequest } from '../Components/Services/POContractBackendAPI';
import TermsAndCondtitions from './LandingPage/TermsAndConditions';
import PrivacyPolicy from './LandingPage/PrivacyPolicy';
import AboutUs from './LandingPage/AboutUs';
import Test from './LandingPage/Test';


const DefaultLayout = () => {
    const [loggedInUserName, setLoggedInUsername] = useState();
    useEffect(() => {
        checkConnection().then(rr => rr.text()).then(res => console.log(res)).catch(err => console.log(err));
    }, []);
    const unlockPurchaseOrder = () => {
        console.log("Unlock button is clicked." + UserProfile.getUserId());
        if (PurchaseOrder.getPoId() > 0) {
            getRequest('api/POManagement/UnlockPO?poId=' + PurchaseOrder.getPoId(), UserProfile.getToken()).then(r => r.json()).then(res => {
                console.log(res);
                if (res) {
                    console.log("Unlock done successfully.");
                }

            }).catch(err => {
                console.log(err);
            });
        }
    };
    return (
        <div >
            <header className="bg-primary text-white py-2 pl-4 pr-4 pt-2 pb-2">
                {/*<a href="\LogOut" className="text-white text-decoration-none"> Logout</a>*/}
                {UserProfile.getLoginStatus() === "1" ? <div className="d-flex justify-content-between align-items-center">
                    <div className="logo">
                        <a href="\" className="text-white text-decoration-none" onClick={(e) => {
                            unlockPurchaseOrder();
                            PurchaseOrder.resetData();
                        }}>
                            <span className="logoText" >Contr<span className="logoSubPart">e</span>ct</span>
                        </a>
                    </div>
                    <div className="headLinks">
                        <a href="/">Home</a>&nbsp;&nbsp;
                        <a href="/AboutUs">About us</a>&nbsp;&nbsp;
                        <a href="/Policy">Privacy policy</a>&nbsp;&nbsp;
                        <a href="/Terms">Terms and condition</a>
                    </div>
                    {loggedInUserName !== "" ? <div className="user-info">
                        <span className="me-3">Logged in as <strong>{loggedInUserName}</strong></span>
                        <a href="\LogOut" className="text-white text-decoration-none" onClick={(e) => {
                            unlockPurchaseOrder();
                            PurchaseOrder.resetData();
                        }}> Logout</a>
                    </div>:<></>}
                    
                </div> :
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="logo">
                            <a href="\" className="text-white text-decoration-none">
                                <span className="logoText" >Contr<span className="logoSubPart">e</span>ct</span></a>
                        </div>
                        <div className="headLinks">
                            <a href="/">Home</a>&nbsp;&nbsp;
                            <a href="/AboutUs">About us</a>&nbsp;&nbsp;
                            <a href="/Policy">Privacy policy</a>&nbsp;&nbsp;
                            <a href="/Terms">Terms and condition</a>
                        </div>
                        
                    </div>
                }
            </header>
            <main className="appMainBody scrollable-mobile">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/Home" element={<HomePage setUserName={setLoggedInUsername} />} />
                        <Route path="/ValidateUser" element={<ValidateOTP />} />
                        <Route path="/Terms" element={<TermsAndCondtitions setUserName={setLoggedInUsername} />} />
                        <Route path="/Policy" element={<PrivacyPolicy setUserName={setLoggedInUsername} />} />
                        <Route path="/AboutUs" element={<AboutUs setUserName={setLoggedInUsername} />} />
                        <Route path="/test" element={<Test />} />
                        <Route path="/UpdateUser" element={<UpdateUser setUserName={setLoggedInUsername } />} />
                        <Route path="/LogOut" element={<LogOut setUserName={setLoggedInUsername } />} />
                        <Route path="/New" element={<NewPO setUserName={setLoggedInUsername } />} />
                        <Route path="/Details" element={<DetailPO setUserName={setLoggedInUsername} />} />
                        <Route path="/CheckPODetails" element={<CheckPODetails setUserName={setLoggedInUsername} />} />
                        
                        <Route path='*' element={<WrongAddress />} />
                    </Routes>
                </BrowserRouter>
            </main>
            <footer>
                <div>
                    Contract Agreement &copy; Musedaq 2024
                </div>
            </footer>

        </div>
    );
}
export default DefaultLayout;