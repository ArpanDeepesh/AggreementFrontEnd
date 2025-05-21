import UserProfile from "../Context/UserProfile";
import { useEffect, useState } from "react";
const AboutUs = ({ setUserName, setUserType }) => {
	const [displayName, setDisplayName] = useState();
	useEffect(() => {
		setUserName(UserProfile.getName());
		setUserType(UserProfile.getUserType());
		setDisplayName(UserProfile.getName());
	}, [])
	return (
		<>
			<div className={displayName && displayName.length > 0 ? "main-content" : ""}>
				{displayName && displayName.length > 0 ? <>
					<div class="headerHome">
						<div class="page-title">
							<h1>Privacy Policy</h1>
							<span className="effective-date">Last Updated: 3 December 2024</span>
						</div>
						<div class="user-profile">
							<img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User profile" />
							<div class="user-info">
								<h4>{displayName}</h4>
								<p>Premium Plan</p>
								<a href="/LogOut" style={{ color: "#007bff" }}>Logout</a>
							</div>
						</div>
					</div>
				</> : <>
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
					<div style={{ paddingTop: '20px', paddingLeft: '20px' }}>
							<h1>About Us</h1>
						<span className="effective-date">Last Updated: 3 December 2024</span>
					</div>

				</>}
				<div style={{ marginTop: "5px", textAlign: "left", padding: "40px", maxHeight: "100%", overflowX: "scroll" }}>
					<p>
						At <strong>Contrect</strong>, we believe that managing contracts should be simple, transparent, and hassle-free. Whether you're drafting a purchase agreement,
						sales contract, or any other type of legal arrangement, we provide the tools to make the process seamless and efficient.
						We are passionate about transforming the way businesses manage contracts, ensuring that every agreement is clear, actionable, and trackable.
						Our platform is designed to help businesses of all sizes, from startups to enterprises, streamline their workflows, foster collaboration, and eliminate confusion.
					</p>

					<h4>What We Do</h4>
					<p>
						<ul>
							<li><strong>Simplify Contract Creation: </strong>Easily draft, edit, and manage all types of contracts-from sales and purchase agreements to customized templates tailored to your needs.
							</li>
							<li><strong>Enable Collaboration: </strong>Keep all stakeholders informed and engaged with real-time updates via SMS and email notifications.
							</li>
							<li><strong>Ensure Transparency: </strong>Track every step of the contract lifecycle, from initiation to completion, with audit trails and progress reports.
							</li>
							<li><strong>Streamline Reconciliation: </strong>Avoid disputes with built-in payment tracking, task updates, and a clear record of completed actions.
							</li>
						</ul>
					</p>



					<h4>Our Vision</h4>

					To revolutionize contract management by making it accessible, efficient, and secure for everyone. We aim to empower businesses with tools that reduce complexity and create opportunities for better collaboration and growth.
					<h4>Why Choose Us?</h4>
					<p>
						<ul>
							<li><strong>All-in-One Solution: </strong>Manage all types of contracts in one platform.
							</li>
							<li><strong>User-Friendly Interface: </strong>Navigate your workflows effortlessly with our intuitive design.
							</li>
							<li><strong>Secure and Reliable: </strong>Your data is safe with us, ensuring confidentiality and compliance.
							</li>
							<li><strong>Transparent Communication: </strong>Keep everyone on the same page, always.
							</li>
						</ul>
					</p>
					Join us on our journey to redefine contract management. Let's build smarter agreements together.
					For more information, connect with us at <strong>www.contrect.com</strong> or reach out to us at <strong>contact@contrect.com</strong>.
				</div>
			</div>
			
		</>
	);
};
export default AboutUs;