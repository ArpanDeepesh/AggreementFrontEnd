import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormSubmitButton from "../FormParts/FormSubmitButton";
import Form from "react-bootstrap/Form";
import FormButton from "../FormParts/FormButton";
import UserProfile from "../Context/UserProfile";
import "./DetailPO.css";
import OtherData from "../Context/OtherData";

const SelectContractTmplet = ({ setUserName, setUserType }) => {
	const navigate = useNavigate();
	const poForm = useRef(null);
	useEffect(() => {
		if (UserProfile.getLoginStatus() !== "1") {
			navigate("/");
		}
		setUserName(UserProfile.getName());
		setUserType(UserProfile.getUserType());

		
	}, []);
	const handleSubmit = (e) => {
		e.preventDefault();
	}
	//Home Maintenance Contract – Hiring plumbers, electricians, painters


	return (
        <>

            <section id="templates" className="section-title">
                <h2>Professional Contract Templates</h2>
                <p>Choose from our extensive library of legally enforceable templates tailored for various industries</p>
                <FormButton name="< Back" onClick={(e) => {
                    e.preventDefault();
                    navigate("/Home");
                }} />
            </section>

            <div className="contract-grid">
                <a href="\" className="contract-card" onClick={(e) => {
                    e.preventDefault();
                    OtherData.setTemplateName("Rental Agreement");
                    navigate("/CustomAgreement");
                }}>
                    <i className="fas fa-home"></i>
                    <h3>Rental Agreement</h3>
                    <p>Property leases and rentals</p>
                </a>
                <a href="/" className="contract-card" onClick={(e) => {
                    e.preventDefault();
                    OtherData.setTemplateName("Subletting");
                    navigate("/CustomAgreement");
                }}>
                    <i className="fas fa-building"></i>
                    <h3>Subletting</h3>
                    <p>Sublease agreements</p>
                </a>
                <a href="/" className="contract-card" onClick={(e) => {
                    e.preventDefault();
                    OtherData.setTemplateName("Interior Design");
                    navigate("/CustomAgreement");
                }}>
                    <i className="fas fa-paint-roller"></i>
                    <h3>Interior Design</h3>
                    <p>Design service contracts</p>
                </a>
                <a href="/" className="contract-card" onClick={(e) => {
                    e.preventDefault();
                    OtherData.setTemplateName("Maintenance");
                    navigate("/CustomAgreement");
                }}>
                    <i className="fas fa-tools"></i>
                    <h3>Maintenance</h3>
                    <p>Service and maintenance agreements</p>
                </a>
                <a href="/" className="contract-card" onClick={(e) => {
                    e.preventDefault();
                    OtherData.setTemplateName("Home Renovation");
                    navigate("/CustomAgreement");
                }}>
                    <i className="fas fa-hammer"></i>
                    <h3>Home Renovation</h3>
                    <p>Construction and renovation contracts</p>
                </a>
                <a href="/" className="contract-card" onClick={(e) => {
                    e.preventDefault();
                    OtherData.setTemplateName("Consulting");
                    navigate("/CustomAgreement");
                }}>
                    <i className="fas fa-handshake"></i>
                    <h3>Consulting</h3>
                    <p>Professional consulting agreements</p>
                </a>
                <a href="/" className="contract-card" onClick={(e) => {
                    e.preventDefault();
                    OtherData.setTemplateName("NDA");
                    navigate("/CustomAgreement");
                }}>
                    <i className="fas fa-file-signature"></i>
                    <h3>NDA</h3>
                    <p>Non-disclosure agreements</p>
                </a>
                <a href="/" className="contract-card" onClick={(e) => {
                    e.preventDefault();
                    OtherData.setTemplateName("Consent Agreement");
                    navigate("/CustomAgreement");
                }}>
                    <i className="fas fa-heart"></i>
                    <h3>Consent Agreement</h3>
                    <p>Personal relationship contracts</p>
                </a>
                <a href="/" className="contract-card" onClick={(e) => {
                    e.preventDefault();
                    OtherData.setTemplateName("Loan Agreement");
                    navigate("/CustomAgreement");
                }}>
                    <i className="fas fa-money-bill-wave"></i>
                    <h3>Loan Agreement</h3>
                    <p>Personal and business loans</p>
                </a>
                <a href="/" className="contract-card" onClick={(e) => {
                    e.preventDefault();
                    OtherData.setTemplateName("Freelance");
                    navigate("/CustomAgreement");
                }}>
                    <i className="fas fa-laptop-code"></i>
                    <h3>Freelance</h3>
                    <p>Independent contractor agreements</p>
                </a>
                <a href="/" className="contract-card" onClick={(e) => {
                    e.preventDefault();
                    OtherData.setTemplateName("Sales");
                    navigate("/CustomAgreement");
                }}>
                    <i className="fas fa-box-open"></i>
                    <h3>Sales</h3>
                    <p>Goods and services sales</p>
                </a>
                <a href="/" className="contract-card" onClick={(e) => {
                    e.preventDefault();
                    OtherData.setTemplateName("Custom");
                    navigate("/CustomAgreement");
                }}>
                    <i className="fas fa-plus-circle"></i>
                    <h3>Custom</h3>
                    <p>Build your own contract</p>
                </a>
            </div>

			
			
		</>
	);
};
export default SelectContractTmplet;
