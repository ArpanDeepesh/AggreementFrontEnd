import UserProfile from "../Context/UserProfile";
import "./CookiePolicy.css";
import { useEffect, useState } from "react";
const CookiePolicy = ({ setUserName, setUserType }) =>
{
    const [displayName, setDisplayName] = useState();
    useEffect(() => {
        setUserName(UserProfile.getName());
        setUserType(UserProfile.getUserType());
        setDisplayName(UserProfile.getName());
    }, []);
    return (
        <>
            <div className={displayName && displayName.length>0?"main-content":""}>
                {displayName && displayName.length > 0 ? <>
                    <div class="headerHome">
                        <div class="page-title">
                            <h1>Cookie Policy</h1>
                            <span className="effective-date">Last Updated: December 3, 2024</span>
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
                            <h1>Cookie Policy</h1>
                            <span className="effective-date">Last Updated: December 3, 2024</span>
                        </div>
                </>}
                <div className="cookie-container">
                    
                    <div className="highlight-box">
                        <p><strong>Important:</strong> This Cookie Policy explains how Musedaq Fintech Private Limited ("Contrect," "we," "us," or "our") uses cookies and similar tracking technologies when you visit our website (www.contrect.com) or use our contract management platform (the "Service").</p>
                    </div>

                    <h2>1. What Are Cookies?</h2>
                    <p>Cookies are small text files that are placed on your computer, smartphone, or other device when you visit a website. They are widely used to make websites work more efficiently, as well as to provide information to the website owners.</p>

                    <h2>2. How We Use Cookies</h2>
                    <p>We use cookies for the following purposes:</p>
                    <ul>
                        <li><strong>Essential Operation:</strong> To enable basic functions like page navigation and access to secure areas</li>
                        <li><strong>Performance:</strong> To analyze how visitors use our platform and improve its performance</li>
                        <li><strong>Functionality:</strong> To remember your preferences and provide enhanced features</li>
                        <li><strong>Security:</strong> To identify and prevent security risks</li>
                        <li><strong>Analytics:</strong> To understand how our services are used and improve user experience</li>
                        <li><strong>Payment Processing:</strong> To facilitate secure transactions through our payment gateway</li>
                    </ul>

                    <h2>3. Types of Cookies We Use</h2>

                    <h3>3.1 First-Party Cookies</h3>
                    <p>These are cookies set by our website directly:</p>
                    <table className="cookie-table">
                        <thead>
                            <tr>
                                <th>Cookie Name</th>
                                <th>Purpose</th>
                                <th>Duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>session_id</td>
                                <td>Maintains your logged-in state and session security</td>
                                <td>Session</td>
                            </tr>
                            <tr>
                                <td>consent_preferences</td>
                                <td>Stores your cookie consent preferences</td>
                                <td>1 year</td>
                            </tr>
                            <tr>
                                <td>language</td>
                                <td>Remembers your selected language preference</td>
                                <td>1 year</td>
                            </tr>
                            <tr>
                                <td>payment_session</td>
                                <td>Maintains your payment transaction state</td>
                                <td>24 hours</td>
                            </tr>
                        </tbody>
                    </table>

                    <h3>3.2 Third-Party Cookies</h3>
                    <p>These are cookies set by third-party services we use:</p>
                    <table className="cookie-table">
                        <thead>
                            <tr>
                                <th>Service</th>
                                <th>Purpose</th>
                                <th>More Information</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Google Analytics</td>
                                <td>Website usage statistics and analytics</td>
                                <td><a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer">Google's Policy</a></td>
                            </tr>
                            <tr>
                                <td>Hotjar</td>
                                <td>User behavior and feedback analysis</td>
                                <td><a href="https://help.hotjar.com/hc/en-us/articles/6952777582999-Cookies-Set-by-the-Hotjar-Tracking-Code" target="_blank" rel="noopener noreferrer">Hotjar's Policy</a></td>
                            </tr>
                            <tr>
                                <td>Razorpay</td>
                                <td>Payment processing for premium services</td>
                                <td><a href="https://razorpay.com/privacy-policy/" target="_blank" rel="noopener noreferrer">Razorpay's Policy</a></td>
                            </tr>
                        </tbody>
                    </table>

                    <h3>3.3 Other Tracking Technologies</h3>
                    <p>We may also use other similar technologies:</p>
                    <ul>
                        <li><strong>Web beacons:</strong> Small graphic images that may be included in our emails</li>
                        <li><strong>Local Storage:</strong> Stores data in your browser for functionality purposes</li>
                        <li><strong>Session Storage:</strong> Temporarily stores data during your browsing session</li>
                    </ul>

                    <h2>4. Cookie Duration</h2>
                    <p>Cookies may be either "session" or "persistent" cookies:</p>
                    <ul>
                        <li><strong>Session Cookies:</strong> Temporary cookies that remain on your device until you close your browser</li>
                        <li><strong>Persistent Cookies:</strong> Remain on your device for a set period or until you delete them</li>
                    </ul>

                    <h2>5. Your Cookie Choices</h2>
                    <p>You have several options to control or limit how we and our partners use cookies:</p>

                    <h3>5.1 Browser Controls</h3>
                    <p>Most web browsers allow you to:</p>
                    <ul>
                        <li>See what cookies are stored and delete them individually</li>
                        <li>Block third-party cookies</li>
                        <li>Block cookies from particular sites</li>
                        <li>Block all cookies</li>
                        <li>Delete all cookies when you close your browser</li>
                    </ul>
                    <p>For more information about how to modify your browser settings, visit:</p>
                    <ul>
                        <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
                        <li><a href="https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
                        <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a></li>
                        <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
                    </ul>

                    <h3>5.2 Our Cookie Consent Tool</h3>
                    <p>When you first visit our website, you'll see our cookie consent banner where you can:</p>
                    <ul>
                        <li>Accept all cookies</li>
                        <li>Reject non-essential cookies</li>
                        <li>Customize your cookie preferences</li>
                    </ul>
                    <p>You can change your preferences at any time by clicking the "Cookie Settings" link in the footer of our website.</p>

                    <h3>5.3 Opt-Out Links for Third-Party Services</h3>
                    <p>For third-party services we use:</p>
                    <ul>
                        <li><a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-Out</a></li>
                        <li><a href="https://www.hotjar.com/legal/compliance/opt-out" target="_blank" rel="noopener noreferrer">Hotjar Opt-Out</a></li>
                        <li>For Razorpay cookies, please manage through your browser settings as they are essential for payment processing</li>
                    </ul>

                    <div className="highlight-box">
                        <p><strong>Note:</strong> If you disable cookies, some features of our platform may not function properly, including payment processing capabilities. Essential cookies cannot be disabled as they are necessary for basic functionality and security.</p>
                    </div>

                    <h2>6. Payment Processing Cookies (Razorpay)</h2>
                    <p>When you make payments through our platform using Razorpay, the following applies:</p>
                    <ul>
                        <li>Razorpay may set necessary cookies to process your payment securely</li>
                        <li>These cookies are essential for fraud prevention and transaction security</li>
                        <li>We do not have access to or control over Razorpay's cookies</li>
                        <li>Razorpay's use of cookies is governed by their own <a href="https://razorpay.com/privacy-policy/" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
                    </ul>

                    <h2>7. Changes to This Cookie Policy</h2>
                    <p>We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. The updated version will be indicated by a revised "Last Updated" date at the top of this page.</p>

                    <div className="contact-info">
                        <h2>8. Contact Us</h2>
                        <p>If you have any questions about our use of cookies or this Cookie Policy, please contact us:</p>
                        <p>
                            <strong>Musedaq Fintech Private Limited</strong>
                            <br />
                            748/1 Shastri Ward, Babariya
                            <br />
                            Seoni (MP) - 480661, India<br />
                            <span style={{ fontSize: "1.1rem;" }} >📧</span> Email: <a href="mailto:contact@contrect.com">contact@contrect.com</a><br />
                            <span style={{ fontSize: "1.1rem;" }}>📞</span> Phone: <a href="tel:+918989430555">+91 8989430555</a>
                        </p>
                    </div>
                </div>
            </div>
            
            
        </>
    );
};
export default CookiePolicy;