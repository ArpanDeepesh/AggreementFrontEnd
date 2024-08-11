import React, { useEffect } from 'react';
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


const DefaultLayout = () => {
    useEffect(() => {
        checkConnection().then(rr => rr.text()).then(res => console.log(res)).catch(err => console.log(err));
    }, []);
    return (
        <div >
            <header className="bg-primary text-white py-2 pl-4 pr-4 pt-2 pb-2">
                {UserProfile.getLoginStatus() === "1" ? <div className="d-flex justify-content-between align-items-center">
                    <div className="logo">
                        <a href="\" className="text-white text-decoration-none"><img src='./logo192.png' alt="Musedaq logo" width={50} height={50} /> Purchase Aggrement</a>
                    </div>
                    <div className="logo">
                        <a href="\New" className="text-white text-decoration-none">New Aggrement</a>
                    </div>
                    <div className="user-info">
                        <span className="me-3">Logged in as <strong>John Doe</strong></span>
                        <a href="\LogOut" className="text-white text-decoration-none"> Logout</a>
                    </div>
                </div> :
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="logo">
                            <a href="\" className="text-white text-decoration-none"> Purchase Aggrement</a>
                        </div>
                        
                    </div>
                }
            </header>
            <main className="appMainBody">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/Home" element={<HomePage />} />
                        <Route path="/ValidateUser" element={<ValidateOTP />} />
                        <Route path="/UpdateUser" element={<UpdateUser />} />
                        <Route path="/LogOut" element={<LogOut />} />
                        <Route path="/New" element={ <NewPO/>}/>
                        
                        
                        <Route path='*' element={<WrongAddress />} />
                    </Routes>
                </BrowserRouter>
            </main>
            <footer>
                <div>
                    Contract Aggrement &copy; Musedaq 2024
                </div>
            </footer>

        </div>
    );
}
export default DefaultLayout;