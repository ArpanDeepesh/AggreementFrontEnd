import UserProfile from "../Context/UserProfile";
import { useEffect } from "react";
const AboutUs = ({ setUserName, setUserType }) => {
	useEffect(() => {
		setUserName(UserProfile.getName());
		setUserType(UserProfile.getUserType());
	}, [])
	return (
		<>
			<div style={{ marginTop: "5px", textAlign: "left", padding: "40px", maxHeight: "100%", overflowX: "scroll" }}>
				<h4 style={{ color: "#007bff" }}>About Us</h4>
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
		</>
	);
};
export default AboutUs;