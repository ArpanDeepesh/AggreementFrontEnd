import React from 'react';

const AgreementDetails = ({
    agreementTitle,
    agreementDate,
    propertyDescription,
    onTitleChange,
    onDateChange,
    onDescriptionChange
}) => {
    return (
        <div className="form-section">
            <h2>Agreement Details</h2>
            <div className="form-row">
                <div className="form-col">
                    <label htmlFor="agreement-title">Agreement Title</label>
                    <input
                        type="text"
                        id="agreement-title"
                        placeholder="e.g., Residential Lease Agreement"
                        value={agreementTitle}
                        onChange={(e) => onTitleChange(e.target.value)}
                    />
                </div>
                <div className="form-col">
                    <label htmlFor="agreement-date">Agreement Date</label>
                    <input
                        type="date"
                        id="agreement-date"
                        value={agreementDate}
                        onChange={(e) => onDateChange(e.target.value)}
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="form-col">
                    <label htmlFor="property-address">Property/Service Description</label>
                    <input
                        type="text"
                        id="property-address"
                        placeholder="Address or detailed description"
                        value={propertyDescription}
                        onChange={(e) => onDescriptionChange(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default AgreementDetails;
