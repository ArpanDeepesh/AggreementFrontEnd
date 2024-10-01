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



const DefaultLayout = () => {
    const [loggedInUserName, setLoggedInUsername] = useState();
    useEffect(() => {
        checkConnection().then(rr => rr.text()).then(res => console.log(res)).catch(err => console.log(err));
    }, []);
    return (
        <div >
            <header className="bg-primary text-white py-2 pl-4 pr-4 pt-2 pb-2">
                {/*<a href="\LogOut" className="text-white text-decoration-none"> Logout</a>*/}
                {UserProfile.getLoginStatus() === "1" ? <div className="d-flex justify-content-between align-items-center">
                    <div className="logo">
                        <a href="\" className="text-white text-decoration-none">
                            <span className="logoText" >Contr<span className="logoSubPart">e</span>ct</span>
                        </a>
                    </div>
                    <div className="">
                        <a href="\New" className="text-white text-decoration-none" onClick={(e) => {
                            PurchaseOrder.resetData();
                            PurchaseOrder.getRaisedBy("Seller");
                        }}>New Seller Agreement</a>
                    </div>
                    <div className="">
                        <a href="\New" className="text-white text-decoration-none" onClick={(e) => {
                            PurchaseOrder.resetData();
                            PurchaseOrder.getRaisedBy("Buyer");
                        }}>New Buyer Agreement</a>
                    </div>
                    {loggedInUserName !== "" ? <div className="user-info">
                        <span className="me-3">Logged in as <strong>{loggedInUserName}</strong></span>
                        <a href="\LogOut" className="text-white text-decoration-none"> Logout</a>
                    </div>:<></>}
                    
                </div> :
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="logo">
                            <a href="\" className="text-white text-decoration-none">
                                <span className="logoText" >Contr<span className="logoSubPart">e</span>ct</span></a>
                        </div>
                        
                    </div>
                }
            </header>
            <main className="appMainBody">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/Home" element={<HomePage setUserName={setLoggedInUsername} />} />
                        <Route path="/ValidateUser" element={<ValidateOTP />} />
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