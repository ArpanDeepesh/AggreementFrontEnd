// ContractPreview.jsx
import React from 'react';

const RFQPreviewDisplay = ({ formData, unitOptions }) => {
    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return '[Date]';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };


    const getUserDetailToDisplay = (d) => {
        var arr = d.split("\n");
        return (<>{arr[0]}<br />{arr[1]}<br />{arr[2]}<br />{arr[3]}<br />{arr[4]}</>);
    }
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
            <h2>Quotation Preview</h2>
            <div className="contract-content">
                <p><strong>{"Quotation id "+formData.proposalUID || 'New Quotation'}</strong></p>
                <p>This Quotation is made on {formatDate(formData.createdOn)} by:</p>

                <h3>Requesting Party</h3>
                <p>
                    Name: {formData.owner.usrName}
                    <br />
                    GSTIN: {formData.owner.usrGstin}
                    <br />
                    PAN: {formData.owner.usrPan}
                    <br />
                    Email: {formData.owner.email}
                    <br />
                    Phone: {formData.owner.phoneNumber}
                    <br />
                    Address: {formData.owner.usrAddress}
                    <br />
                </p>
                <h3>1. QUOTATION DETAILS</h3>

                Quotation Duration: {formData.proposalCompletionInDays || '0'}
                <br/>
                Penality Days: {formData.proposalLdAppliedAfterDays || '0'}
                <br />
                Penality Percent: {formData.proposalLdPercent || '0'} %
                <h3>2. TERM</h3>
                <p>Effective from {formatDate(formData.createdOn)} to {formatDate(formData.endDate)} with {formData.noticePeriod} days notice period.</p>

                <h3>3. FINANCIAL TERMS</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Title</th>
                            <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Description</th>
                            <th style={{ textAlign: 'right', padding: '8px', borderBottom: '1px solid #ddd' }}>Quantity Required</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formData.lineItems.map(item => (
                            <tr key={item.id}>
                                <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{item.title || 'Title'}<br/>{item.hsnSac}</td>
                                <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{item.description || 'Description'}</td>
                                <td style={{ textAlign: 'right', padding: '8px', borderBottom: '1px solid #ddd' }}>
                                    {item.quantity} {unitValue(item.unit)}
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
                        <p><strong>Requesting Party</strong></p>
                        <p>Signature: _________</p>
                        <p>Date: _________</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RFQPreviewDisplay;