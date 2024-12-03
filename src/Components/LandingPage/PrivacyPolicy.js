import UserProfile from "../Context/UserProfile";
import { useEffect } from "react";
const PrivacyPolicy = ({ setUserName }) => {
    useEffect(() => {
        setUserName(UserProfile.getName());
    }, [])
	return (
        <>
            <div style={{ marginTop: "5px", textAlign: "left", padding: "40px", maxHeight: "100%", overflowX: "scroll" }}>
                <div>
                    <h4 style={{ color: "#007bff" }}>Privacy Policy</h4>
                    <p style={{ fontSize:"70%" }}>
                        <strong>Last Updated:</strong> 3 December 2024
                    </p>
                    <p>This Privacy Policy explains how Musedaq Fintech Private Limited ("we," "us," or "our") collects, uses,
                        discloses, and protects your information when you visit our website, <strong>Contrect.com</strong> (the "Site"),
                        and use our application (the "Service"). By accessing or using our Site and Service, you agree to the terms of this Privacy Policy.</p>

                    <h4>1. Information We Collect</h4>
                    <ul>
                        <li><strong>Personal Information:</strong> When you create an account, you may provide us with personal information such as your name, phone number, email address, and any other information you choose to provide.</li>
                        <li><strong>Usage Data:</strong> We may automatically collect information about your device and how you interact with our Site and Service, including your IP address, browser type, access times, pages viewed, and the referring URL.</li>
                        <li><strong>Cookies:</strong> Our Site may use cookies and similar tracking technologies to enhance your experience. You can manage your cookie preferences through your browser settings.</li>
                    </ul>

                    <h4>2. How We Use Your Information</h4>
                    <p>We use the information we collect for various purposes, including:</p>
                    <ul>
                        <li>To provide, maintain, and improve our Service.</li>
                        <li>To process transactions and send you related information.</li>
                        <li>To communicate with you, including sending updates, security alerts, and support messages.</li>
                        <li>To analyze usage and trends to improve the functionality and user experience of our Site and Service.</li>
                        <li>To prevent fraudulent activities and ensure compliance with our Terms and Conditions.</li>
                    </ul>

                    <h4>3. Disclosure of Your Information</h4>
                    <ul>
                        <li><strong>With Service Providers:</strong> We may share your information with third-party service providers to help us operate our Service, process payments, and provide customer support.</li>
                        <li><strong>Legal Compliance:</strong> We may disclose your information to comply with applicable laws, regulations, legal processes, or government requests.</li>
                        <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.</li>
                    </ul>

                    <h4>4. Data Security</h4>
                    <p>We take reasonable measures to protect your information from unauthorized access, use, or disclosure. However, no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee its absolute security.</p>

                    <h4>5. Your Rights</h4>
                    <p>Depending on your location, you may have the following rights regarding your personal information:</p>
                    <ul>
                        <li>The right to access, update, or delete your personal information.</li>
                        <li>The right to object to or restrict the processing of your personal information.</li>
                        <li>The right to data portability.</li>
                    </ul>
                    <p>To exercise any of these rights, please contact us at <strong>[Contact Information]</strong>.</p>

                    <h4>6. Third-Party Links</h4>
                    <p>Our Site may contain links to third-party websites. We do not control and are not responsible for the content, privacy policies, or practices of these sites. We encourage you to review the privacy policies of any third-party sites you visit.</p>

                    <h4>7. Children's Privacy</h4>
                    <p>Our Service is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.</p>

                    <h4>8. Changes to This Privacy Policy</h4>
                    <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top. You are advised to review this Privacy Policy periodically for any changes.</p>

                    <h4>9. Contact Us</h4>
                    <p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:</p>
                    <div>
                        <p>
                            <strong>Musedaq Fintech Private Limited</strong>
                            <br />
                            748/1 Shastri Ward, Babariya,Seoni (MP) -480661
                            <br />
                            Email: <a href="mailto:contact@contrect.com">contact@contrect.com</a>
                            <br />
                            Phone: +91 8989430555
                        </p>
                    </div>
                </div>
			</div>
		</>
	);
};
export default PrivacyPolicy;