import React, { useState } from 'react';

const TermsConditions = ({ customTerms, onAddTerm, onRemoveTerm }) => {
    const [newTermTitle, setNewTermTitle] = useState([]);
    const [newTermDesc, setNewTermDesc] = useState([]);
    const handleAddTerm = () => {
        if (newTermTitle.trim() && newTermDesc.trim()) {
            onAddTerm(0,newTermDesc,newTermTitle);
            setNewTermTitle('');
            setNewTermDesc('');
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
                            placeholder="Enter a new term title"
                            value={newTermTitle}
                            onChange={(e) => setNewTermTitle(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAddTerm()}
                        />
                        <input
                            type="text"
                            id="new-term"
                            placeholder="Enter a new term description"
                            value={newTermDesc}
                            onChange={(e) => setNewTermDesc(e.target.value)}
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
                            <span className="remove-item" onClick={() => onRemoveTerm(term.id)}>
                                <i className="fas fa-times"></i>
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TermsConditions;
