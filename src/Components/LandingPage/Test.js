import "./Test.css";
const Test = () => {
    return (<>
        <div className="container">
        <div className="left">
            <img src="https://img.icons8.com/color/452/contract.png" alt="Contract Icon"/>
                <h1>Streamlined Tracking and Reconciliation</h1>
                <p>For your purchase agreements</p>

                <div className="features">
                    <div className="feature">
                        <img src="https://img.icons8.com/ios-filled/50/check-file.png" alt="Track Icon"/>
                            <p>Track & Manage</p>
                    </div>
                    <div className="feature">
                        <img src="https://img.icons8.com/ios-filled/50/money-transfer.png" alt="Reconcile Icon"/>
                            <p>Reconcile Work & Payments</p>
                    </div>
                    <div className="feature">
                        <img src="https://img.icons8.com/ios-filled/50/document.png" alt="Communication Icon"/>
                            <p>Easy Communication & Audit</p>
                    </div>
                </div>
        </div>
        <div className="right">
            <h2>Login to Your Account</h2>

            <div className="input-field">
                <input type="text" placeholder="Phone Number" required/>
            </div>

            <div className="input-field">
                <input type="password" placeholder="Password" required/>
            </div>

            <div className="actions">
                <button>Login</button>
                <button>Register</button>
            </div>

            <a href="#" className="forgot-password">Forgot your password?</a>

            <div className="footer">
                <p>Contract Agreement © Musedaq 2024</p>
            </div>
        </div>
    </div></>);
}
export default Test;