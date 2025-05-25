// ContractPreview.jsx
import React from 'react';

const ContractPreviewDisplay = ({ formData, unitOptions }) => {
    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return '[Date]';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    // Format currency
    const formatCurrency = (amount) => {
        return '₹' + (amount || 0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    };

    // Get party title based on role
    const getPartyTitle = (isFirstParty) => {
        if (!formData.userRole) return 'Party';
        const partyTitles = {
            tenant: ['Tenant', 'Landlord'],
            landlord: ['Landlord', 'Tenant'],
            sublessee: ['Sublessee', 'Sublesser'],
            sublesser: ['Sublesser', 'Sublessee'],
            design_client: ['Client', 'Designer'],
            designer: ['Designer', 'Client'],
            building_owner: ['Building owner', 'Contractor'],
            maintenance_contractor: ['Contractor', 'Building owner'],
            home_owner: ['Home owner', 'Contractor'],
            renovation_contractor: ['Contractor', 'Home owner'],
            consulting_client: ['Client', 'Consultant'],
            consultant: ['Consultant', 'Client'],
            receiving_party: ['Receiving party', 'Disclosing party'],
            disclosing_party: ['Disclosing party', 'Receiving party'],
            acceptor: ['Acceptor', 'Creator'],
            creator: ['Creator', 'Acceptor'],
            borrower: ['Borrower', 'Lender'],
            lender: ['Lender', 'Borrower'],
            service_receiver: ['Service receiver', 'Service provider'],
            service_provider: ['Service provider', 'Service receiver'],
            buyer: ['Buyer', 'Seller'],
            seller: ['Seller', 'Buyer'],
            spending_party: ['Spending party', 'Receiving party'],
            receiving_party: ['Receiving party', 'Spending party']
        };


        return partyTitles[formData.userRole]
            ? (isFirstParty ? partyTitles[formData.userRole][0] : partyTitles[formData.userRole][1])
            : 'Party';
    };
    const unitValue = (u) => {
        if (unitOptions.length > 0) {
            for (var i = 0; i < unitOptions.length; i++) {
                if (unitOptions[i].id === u) {
                    return unitOptions[i].typeValue;
                }
            }
        }
        return "Count";

    };

    return (
        <div className="contract-preview">
            <h2>Contract Preview</h2>
            <div className="contract-content">
                <p><strong>{"Agreement id " + formData.agreementUID || 'New Agreement'}</strong></p>
                <p>This Agreement is made and executed on this {formatDate(formData.createdOn)}, between:</p>

                <h3>FIRST PARTY ({getPartyTitle(true)})</h3>
                <p>
                    Name: {formData.buyer.usrName}
                    <br />
                    GSTIN: {formData.buyer.usrGstin}
                    <br />
                    PAN: {formData.buyer.usrPan}
                    <br />
                    Email: {formData.buyer.email}
                    <br />
                    Phone: {formData.buyer.phoneNumber}
                    <br />
                    Address: {formData.buyer.usrAddress}
                    <br />
                 </p>

                <h3>SECOND PARTY ({getPartyTitle(false)})</h3>
                <p>
                    Name: {formData.seller.usrName}
                    <br />
                    GSTIN: {formData.seller.usrGstin}
                    <br />
                    PAN: {formData.seller.usrPan}
                    <br />
                    Email: {formData.seller.email}
                    <br />
                    Phone: {formData.seller.phoneNumber}
                    <br />
                    Address: {formData.seller.usrAddress}
                    <br />
                </p>

                <h3>1. AGREEMENT DETAILS</h3>
                <p>Quotation Duration: {formData.contractDuration || '0'}
                    <br />
                    Penality Days: {formData.ldDays || '0'}
                    <br />
                    Penality Percent: {formData.ldPercent || '0'} %
                    <br />
                    Advance : {formData.advance || '0'}
                    <br />
                    Deposite : {formData.deposite || '0'}
                </p>

                <h3>2. TERM</h3>
                <p>Effective from {formatDate(formData.startDate)} to {formatDate(formData.endDate)} with {formData.noticePeriod} days notice period.</p>

                <h3>3. FINANCIAL TERMS</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Title</th>
                            <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Description</th>
                            <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Quanitity</th>
                            <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formData.lineItems.map(item => (
                            <tr key={item.id}>
                                <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{item.title || 'Title'}<br />{item.hsnSac}</td>
                                <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{item.description || 'Description'}</td>
                                <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                                    {item.quantity} {/^\d+$/.test(item.unit.toString())?unitValue(item.unit):item.unit}
                                </td>
                                <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                                    {item.buyerRate || "Buyer Rate"} / { item.sellerRate || 'Seller Rate'}{ item.currency}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h3>4. PAYMENT TERMS</h3>
                <ul style={{ marginLeft: '1.5rem' }}>
                    {formData.paymentTerms.map(term => (
                        <li key={term.id}><strong>{term.title}:</strong> {term.text}</li>
                    ))}
                </ul>

                <h3>5. TERMS & CONDITIONS</h3>
                <ul style={{ marginLeft: '1.5rem' }}>
                    {formData.customTerms.map(term => (
                        <li key={term.id}><strong>{term.title}:</strong> {term.text}</li>
                    ))}
                </ul>

                <h3>6. EXECUTION</h3>
                <p>IN WITNESS WHEREOF, the parties have executed this agreement on the date first written above.</p>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                    <div style={{ width: '45%', borderTop: '1px solid #000', paddingTop: '0.5rem' }}>
                        <p><strong>{getPartyTitle(true)}</strong></p>
                        <p>Signature: _________</p>
                        <p>Date: _________</p>
                    </div>
                    <div style={{ width: '45%', borderTop: '1px solid #000', paddingTop: '0.5rem' }}>
                        <p><strong>{getPartyTitle(false)}</strong></p>
                        <p>Signature: _________</p>
                        <p>Date: _________</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContractPreviewDisplay;