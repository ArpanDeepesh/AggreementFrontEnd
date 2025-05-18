// ContractPreview.jsx
import React from 'react';

const RFQPreview = ({ formData }) => {
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
    const getUserDetailToDisplay = (d) =>
    {
        var arr = d.split("\n");
        return (<>{arr[0]}<br />{arr[1]}</>);
    }

    return (
        <div className="contract-preview">
            <h2>Contract Preview</h2>
            <div className="contract-content">
                <p><strong>{formData.agreementTitle || 'AGREEMENT'}</strong></p>
                <p>This Agreement is made and executed on this {formatDate(formData.agreementDate)}, between:</p>

                <h3>FIRST PARTY ({getPartyTitle(true)})</h3>
                <p>[Your details will appear here]</p>

                <h3>SECOND PARTY ({getPartyTitle(false)})</h3>
                <p>{formData.counterpartyDetails && formData.counterpartyDetails !== "" ? getUserDetailToDisplay(formData.counterpartyDetails):"[Counterparty details will be filled after sending]"}</p>

                <h3>1. AGREEMENT DETAILS</h3>
                <p>This agreement concerns: {formData.propertyDescription || '[Description]'}</p>

                <h3>2. TERM</h3>
                <p>Effective from {formatDate(formData.startDate)} to {formatDate(formData.endDate)} with {formData.noticePeriod} days notice period.</p>

                <h3>3. FINANCIAL TERMS</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Description</th>
                            <th style={{ textAlign: 'right', padding: '8px', borderBottom: '1px solid #ddd' }}>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formData.lineItems.map(item => (
                            <tr key={item.id}>
                                <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{item.description || 'Item'}</td>
                                <td style={{ textAlign: 'right', padding: '8px', borderBottom: '1px solid #ddd' }}>
                                    {formatCurrency(item.amount)}
                                </td>
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

export default RFQPreview;