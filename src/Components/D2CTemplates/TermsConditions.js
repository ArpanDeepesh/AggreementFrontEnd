import React, { useState } from 'react';

const TermsConditions = ({ standardTerms, customTerms, onAddTerm }) => {
    const [newTerm, setNewTerm] = useState('');

    const handleAddTerm = () => {
        if (newTerm.trim()) {
            onAddTerm(newTerm);
            setNewTerm('');
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'accepted': return 'status-accepted';
            case 'rejected': return 'status-rejected';
            case 'pending': return 'status-pending';
            default: return '';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'accepted': return 'Auto-accepted';
            case 'rejected': return 'Rejected';
            case 'pending': return 'Pending';
            default: return '';
        }
    };

    return (
        <div className="form-section">
            <h2>Terms & Conditions</h2>
            
            <div className="form-group">
                <label htmlFor="new-term">Add Custom Term</label>
                <div className="form-row">
                    <div className="form-col">
                        <input
                            type="text"
                            id="new-term"
                            placeholder="Enter a new term"
                            value={newTerm}
                            onChange={(e) => setNewTerm(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAddTerm()}
                        />
                    </div>
                    <div className="form-col" style={{ flex: '0 0 auto' }}>
                        <button
                            type="button"
                            className="btn btn-outline"
                            onClick={handleAddTerm}
                        >
                            <i className="fas fa-plus"></i> Add Term
                        </button>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <label>Custom Terms</label>
                <ul className="terms-list">
                    {customTerms.map(term => (
                        <li className="term-item" key={term.id}>
                            {/*<input*/}
                            {/*    type="checkbox"*/}
                            {/*    id={`custom-term-${term.id}`}*/}
                            {/*    checked={term.status === 'accepted'}*/}
                            {/*    disabled={term.status !== 'pending'}*/}
                            {/*    onChange={() => { }}*/}
                            {/*/>*/}

                            <label htmlFor={`custom-term-${term.id}`}>{term.title}</label>
                            <label >{term.text}</label>
                            <span className={`term-status ${getStatusClass(term.status)}`}>
                                {getStatusText(term.status)}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TermsConditions;
