const UserRoleSection = ({ displayList, userRole, counterpartyContact, onRoleChange, onContactChange,counterPartyDetail,onVerifyContact }) => (
    <div className="user-role-section">
        <div className="user-role-selector">
            <label htmlFor="user-role">I am:</label>
            <select
                id="user-role"
                value={userRole}
                onChange={(e) => onRoleChange(e.target.value)}
            >
                <option value="">Select your role</option>
                {displayList && displayList.length > 0 ? displayList.map(d => <option value={d.valueData}>{d.displayData}</option>):<></> }
            </select>
        </div>

        <div className="counterparty-section">
            <label>Counterparty Details</label>
            <p className="help-text">Enter the email or phone number of the other party.</p>
            <div className="counterparty-input">
                <input
                    type="text"
                    id="counterparty-contact"
                    placeholder="Email or phone number"
                    value={counterpartyContact}
                    onChange={(e) => onContactChange(e.target.value)}
                />
                <button type="button" className={counterPartyDetail !== "" && counterPartyDetail.length > 0 ? "btn btn-outline-success" : "btn btn-outline-primary"} style={{ width: "20%" }} onClick={onVerifyContact}>
                    <i className="fas fa-check"></i> 
                    {counterPartyDetail !== "" && counterPartyDetail.length > 0 ? " Verified" : " Verify"}
                </button>
                
                
            </div>
        </div>
    </div>
);
export default UserRoleSection;