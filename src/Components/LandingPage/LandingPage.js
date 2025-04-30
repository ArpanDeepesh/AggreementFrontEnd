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

const LandingPage= ()=>{
	const usrForm = useRef(null);
	const navigate = useNavigate();
	useEffect(() => {
		if (UserProfile.getLoginStatus() === "1") {
			navigate("/Home");
		}

	}, []);

	return (
        <>
            <header>
                <div className="header-container">
                    <div className="logo">
                        <a style={{ textDecoration: "none" }} href="/">
                            <span style={{ color: 'white' }}>Contr
                                <span style={{ color: "#ff8400" }}>e</span>
                                ct</span>
                        </a>

                    </div>
                    <nav><a href="/Signup" className="btn btn-success">Sign In</a>
                    </nav>
                </div>
            </header>
            <section className="hero">
                <div className="hero-content">
					<h1>End-to-End Contract Management Platform</h1>
					<p>From drafting to execution, manage your contracts seamlessly with our comprehensive solution</p>
				</div>
			</section>
            <div className="container">
                <section id="templates" className="section-title">
                    <h2>Professional Contract Templates</h2>
                    <p>Choose from our extensive library of legally enforceable templates tailored for various industries</p>
                </section>

                <div className="contract-grid">
                    <a href="#" className="contract-card">
                        <i className="fas fa-home"></i>
                        <h3>Rental Agreement</h3>
                        <p>Property leases and rentals</p>
                    </a>
                    <a href="#" className="contract-card">
                        <i className="fas fa-building"></i>
                        <h3>Subletting</h3>
                        <p>Sublease agreements</p>
                    </a>
                    <a href="#" className="contract-card">
                        <i className="fas fa-paint-roller"></i>
                        <h3>Interior Design</h3>
                        <p>Design service contracts</p>
                    </a>
                    <a href="#" className="contract-card">
                        <i className="fas fa-tools"></i>
                        <h3>Maintenance</h3>
                        <p>Service and maintenance agreements</p>
                    </a>
                    <a href="#" className="contract-card">
                        <i className="fas fa-hammer"></i>
                        <h3>Home Renovation</h3>
                        <p>Construction and renovation contracts</p>
                    </a>
                    <a href="#" className="contract-card">
                        <i className="fas fa-handshake"></i>
                        <h3>Consulting</h3>
                        <p>Professional consulting agreements</p>
                    </a>
                    <a href="#" className="contract-card">
                        <i className="fas fa-file-signature"></i>
                        <h3>NDA</h3>
                        <p>Non-disclosure agreements</p>
                    </a>
                    <a href="#" className="contract-card">
                        <i className="fas fa-heart"></i>
                        <h3>Consent Agreement</h3>
                        <p>Personal relationship contracts</p>
                    </a>
                    <a href="#" className="contract-card">
                        <i className="fas fa-money-bill-wave"></i>
                        <h3>Loan Agreement</h3>
                        <p>Personal and business loans</p>
                    </a>
                    <a href="#" className="contract-card">
                        <i className="fas fa-laptop-code"></i>
                        <h3>Freelance</h3>
                        <p>Independent contractor agreements</p>
                    </a>
                    <a href="#" className="contract-card">
                        <i className="fas fa-box-open"></i>
                        <h3>Sales</h3>
                        <p>Goods and services sales</p>
                    </a>
                    <a href="#" className="contract-card">
                        <i className="fas fa-plus-circle"></i>
                        <h3>Custom</h3>
                        <p>Build your own contract</p>
                    </a>
                </div>

                <div className="template-actions">
                    <div className="action-buttons">
                        <a href="#" className="btn btn-custom">Build Custom Contract</a>
                        <a href="#" className="btn btn-rfq">Request for Quotation</a>
                    </div>
                </div>

                <section className="section-title">
                    <h2>Why Choose Contrect?</h2>
                    <p>Our platform revolutionizes the entire contract lifecycle management process</p>
                </section>

                <div className="features">
                    <div className="feature-card">
                        <i className="fas fa-shield-alt"></i>
                        <h3>Secure & Legally Enforceable</h3>
                        <p>All contracts are designed to meet legal standards with bank-grade security for your peace of mind</p>
                    </div>
                    <div className="feature-card">
                        <i className="fas fa-clipboard-check"></i>
                        <h3>Complete Contract Lifecycle</h3>
                        <p>From drafting to execution, manage every stage of your contracts in one seamless platform</p>
                    </div>
                    <div className="feature-card">
                        <i className="fas fa-globe"></i>
                        <h3>Remote Contract Management</h3>
                        <p>Collaborate with stakeholders anywhere with secure digital signing and real-time tracking</p>
                    </div>
                    <div className="feature-card">
                        <i className="fas fa-envelope"></i>
                        <h3>Flexible Invitation Options</h3>
                        <p>Easily share contracts via email or SMS with customizable notification settings</p>
                    </div>
                    <div className="feature-card">
                        <i className="fas fa-sync-alt"></i>
                        <h3>Automated Workflows</h3>
                        <p>Streamline approvals, reminders, and renewals with our intelligent automation features</p>
                    </div>
                    <div className="feature-card">
                        <i className="fas fa-chart-line"></i>
                        <h3>Analytics & Reporting</h3>
                        <p>Gain insights into contract performance with detailed analytics and custom reports</p>
                    </div>
                </div>

                <div className="demo-section">
                    <div className="demo-content">
                        <i className="fas fa-play-circle"></i>
                        <h2>Introduction to Contrect</h2>
                        <p>Discover how our platform transforms contract management in this comprehensive overview</p>
                        <a href="#" className="btn btn-primary">Watch Introduction</a>
                    </div>
                </div>

                <section className="section-title">
                    <h2>Simple, Transparent Pricing</h2>
                    <p>Choose the plan that fits your business needs</p>
                </section>

                <section className="pricing-section">
                    <div className="container">
                        <div className="pricing-grid">
                            
                            <div className="pricing-card">
                                <div className="pricing-header">
                                    <h3>Free Tier</h3>
                                    <div className="price">¥0<span>/month</span></div>
                                    <p>5 contracts/month included</p>
                                </div>
                                <ul className="pricing-features">
                                    <li><i className="fas fa-check"></i> 2 attachments per contract (1MB max)</li>
                                    <li><i className="fas fa-check"></i> 1 signing SMS included</li>
                                    <li><i className="fas fa-check"></i> ¥2/SMS for extras</li>
                                    <li><i className="fas fa-check"></i> 12mo storage + 3mo archive</li>
                                    <li><i className="fas fa-check"></i> 1 free audit report</li>
                                </ul>
                                <a href="#" className="btn btn-primary">Get Started</a>
                            </div>
                            <div className="pricing-card">
                                <div className="pricing-header">
                                    <h3>Pay-Per-Contract</h3>
                                    <div className="price">¥99<span>/contract</span></div>
                                    <p>Beyond 5 free contracts</p>
                                </div>
                                <ul className="pricing-features">
                                    <li><i className="fas fa-check"></i> Same as Free Tier attachments</li>
                                    <li><i className="fas fa-check"></i> 1 signing SMS included</li>
                                    <li><i className="fas fa-check"></i> ¥2/SMS for extras</li>
                                    <li><i className="fas fa-check"></i> 12mo storage + 3mo archive</li>
                                    <li><i className="fas fa-check"></i> Subscription-based reports</li>
                                </ul>
                                <a href="#" className="btn btn-outline">Pay As You Go</a>
                            </div>

                            <div className="pricing-card popular">
                                <div className="popular-badge">Most Popular</div>
                                <div className="pricing-header">
                                    <h3>Starter</h3>
                                    <div className="price">¥499<span>/month</span></div>
                                    <p>5 free + 10 contracts</p>
                                </div>
                                <ul className="pricing-features">
                                    <li><i className="fas fa-check"></i> 5 attachments per contract (5MB max)</li>
                                    <li><i className="fas fa-check"></i> 5 alert SMS included</li>
                                    <li><i className="fas fa-check"></i> ¥1/SMS for extras</li>
                                    <li><i className="fas fa-check"></i> 18mo storage + 6mo archive</li>
                                    <li><i className="fas fa-check"></i> 5 free audit reports</li>
                                </ul>
                                <a href="#" className="btn btn-primary">Start Free Trial</a>
                            </div>

                            
                            <div className="pricing-card">
                                <div className="pricing-header">
                                    <h3>Business</h3>
                                    <div className="price">¥1,499<span>/month</span></div>
                                    <p>5 free + 50 contracts</p>
                                </div>
                                <ul className="pricing-features">
                                    <li><i className="fas fa-check"></i> 10 attachments per contract (5MB max)</li>
                                    <li><i className="fas fa-check"></i> 10 priority SMS included</li>
                                    <li><i className="fas fa-check"></i> ¥0.50/SMS for extras</li>
                                    <li><i className="fas fa-check"></i> 24mo storage + 12mo archive</li>
                                    <li><i className="fas fa-check"></i> 10 free audit reports</li>
                                </ul>
                                <a href="#" className="btn btn-outline">Contact Sales</a>
                            </div>
                        </div>

                        <div className="pricing-footer">
                            <p>All plans include: AI contract drafting, real-time tracking, and basic support.</p>
                            <a href="#">Compare all features →</a>
                        </div>
                    </div>
                </section>
            </div>
		</>
	);
};
export default LandingPage;