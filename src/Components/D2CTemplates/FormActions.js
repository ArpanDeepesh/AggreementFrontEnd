import React from 'react';

const FormActions = ({ onSendContract, disabled, sent }) => {
    return (
        <div className="form-actions">
            <button
                type="button"
                className="btn btn-primary"
                onClick={onSendContract}
                disabled={disabled}
            >
                <i className="fas fa-paper-plane"></i>
                {sent ? 'Contract Sent' : 'Send to Counterparty'}
            </button>
        </div>
    );
};

export default FormActions;
