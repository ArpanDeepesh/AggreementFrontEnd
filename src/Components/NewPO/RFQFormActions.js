import React from 'react';

const RFQFormActions = ({ onSendContract, onSaveContract, disabled, sent }) => {
    return (
        <div className="form-actions">
            <button
                type="button"
                className="btn btn-primary"
                onClick={onSendContract}
                disabled={disabled}
            >
                <i className="fas fa-paper-plane"></i>
                {sent ? ' Quotation Published' : ' Publish Quotation'}
            </button>
            <button
                type="button"
                className="btn btn-primary"
                onClick={onSaveContract}
                disabled={disabled}
            >
                <i className="fas fa-cloud-upload"></i>
                {sent ? ' Quotation Saved' : ' Save Quotation'}
            </button>
        </div>
    );
};

export default RFQFormActions;
