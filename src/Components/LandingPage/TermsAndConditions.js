import UserProfile from "../Context/UserProfile";
import { useEffect } from "react";
const TermsAndCondtitions = ({ setUserName }) => {
	useEffect(() => {
		setUserName(UserProfile.getName());
	}, [])
	return (
		<>
			<div style={{ textAlign: "left", padding: "40px", maxHeight: "100%", overflowX: "scroll" }}>
				<h4 style={{ color: "#007bff" }}>Terms and Conditions</h4>
				<span style={{ fontSize: "70%" }}>
					<strong>Last Updated:</strong> 3 December 2024</span>
				<p>
					By signing up and using our application, you agree to the following Terms and Conditions. Please read them carefully.
					<ol>
						<li><strong>Acceptance of Terms</strong><br/>
							By creating an account and accessing our platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree, you may not use the application.
						</li>
						<li><strong>Services Provided</strong> <br />
				Our platform enables live tracking, reconciliation, and management of purchase/sale agreements or any other agreements made through the website. It allows vendors and buyers to claim task completions, track payments, reconcile values, and communicate via supported channels such as email and SMS.

						</li>
						<li><strong>Account Responsibility</strong> <br />
				You are responsible for maintaining the confidentiality of your account credentials and for any actions taken under your account. You must notify us immediately of any unauthorized use of your account or any security breach.

						</li>
						<li><strong>User Data and Privacy</strong><br />
				We respect your privacy and are committed to protecting your personal data. Our Privacy Policy outlines how we collect, use, and store information from users. By using the platform, you consent to our data practices as outlined in the Privacy Policy.

						</li>
						<li><strong>Use of the Platform</strong><br />
							You agree to use the platform only for its intended purpose and in compliance with applicable laws and regulations. You may not:
							<ul>
								<li>Misuse or tamper with the application or its functionalities.</li>
								<li>Upload harmful or malicious content.
								</li>
								<li>Engage in fraudulent activities or misrepresent your identity.
								</li>
							</ul>

						</li>
						<li><strong>Payment and Fees</strong><br />
				Certain services on the platform may be subject to fees, which will be disclosed before any charges are incurred. By using paid services, you agree to pay the associated fees.

						</li>
						<li><strong>Claim Acceptance, Agreement Activation, and Consent</strong><br />
							By using the application, you agree that any acceptance of claims-whether for payment or task completion-provided by clicking
							the corresponding button within the platform constitutes your wilful consent. These actions are legally binding and considered
							as your agreement to the terms of the purchase/sale agreements or any other agreements made through the website in question.
							Furthermore, once both parties accept the draft purchase/sale agreements or any other agreements made through the website
							through the platform, it will be considered live, and both parties
							will be deemed to have entered into a legally binding contract. From that point, all actions related to task completion and
							payments will be governed by the terms of the live agreement, and any subsequent claims or acknowledgments made via the platform
							will hold full legal weight.

						</li>
						<li><strong>Identity Verification</strong><br />
							Sign-up for the platform is completed using phone numbers that have been legally verified by cellular companies. Your phone number acts as
							a unique identifier, confirming your identity for the purposes of entering into and executing purchase/sale agreements or any other agreements
							made through the website within the platform.
							By signing up, you acknowledge that the use of your verified phone number for these purposes is legally binding.

						</li>
						<li><strong>Communication</strong><br />
							The platform provides communication features via email and SMS to notify stakeholders of task completions and payments.
							By signing up, you consent to receiving these communications through both channels and acknowledge that they are integral to the service.

						</li>
						<li><strong>Disclaimer of Warranties</strong><br />
							The platform is provided "as is" and "as available." We do not warrant that the services will be uninterrupted, error-free, or secure. We are not
							responsible for any direct, indirect, or consequential losses resulting from your use of the platform.

						</li>
						<li><strong>Limitation of Liability</strong><br />
							In no event shall the platform or its owners, directors, employees, or affiliates be liable for any damages arising from your use or inability to use
							the services. Your sole remedy is to discontinue the use of the platform.

						</li>
						<li><strong>Termination</strong><br />
							We reserve the right to suspend or terminate your access to the platform at our discretion, without notice, if we believe you are in breach of these
							Terms and Conditions or engage in any unlawful activity.

						</li>
						<li><strong>Amendments to Terms</strong><br />
							We may update these Terms and Conditions from time to time. Any changes will be effective upon posting to the platform, and continued use of the
							platform will be considered acceptance of the updated terms.

						</li>
						<li><strong>Governing Law and Jurisdiction</strong><br />
							These Terms and Conditions shall be governed by and construed in accordance with the laws of Madhya Pradesh, without regard to its conflict of
							law principles. Any disputes arising from or related to these Terms and Conditions or the use of the platform shall be subject to the
							exclusive jurisdiction of the courts located in Seoni, Madhya Pradesh, and you agree to submit to the personal jurisdiction of these courts.
				By clicking "Sign Up" or using the platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.

						</li>
					</ol>
				</p>
				
				This document serves as your legal agreement with the platform. If you have any questions or concerns,
				please contact our support team at <a href="/AboutUs">Contact Information</a>.

			</div>
		</>
	);
};
export default TermsAndCondtitions;