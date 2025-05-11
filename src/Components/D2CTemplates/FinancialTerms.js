import { useState } from "react";

const FinancialTerms = ({ agreementAdvance,
    agreementDeposite,
    onAdvanceChange,
    onDepositeChange,
    agreementCurrency,
    currencyOptions,
    unitOptions,
    onCurrencyChange,
    lineItems,
    onItemChange,
    onAddItem,
    onRemoveItem,
    paymentTerms,
    onRemovePaymentTerm,
    onAddPaymentTerm,
    handleEditTerm}) => {
    const [newTermTitle, setNewTermTitle] = useState([]);
    const [newTermDesc, setNewTermDesc] = useState([]);
    const [newTermId, setNewTermId] = useState();
    const handleAddTerm = () => {
        if (newTermTitle.trim() && newTermDesc.trim()) {
            onAddPaymentTerm(0,newTermDesc, newTermTitle);
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
            <h2>Financial Terms & Line Items</h2>
            <div className="form-row">
                <div className="form-col">
                    <label htmlFor="agreement-advance">Agreement advance</label>
                    <input
                        type="number"
                        id="agreement-advance"
                        value={agreementAdvance}
                        onChange={(e) => onAdvanceChange(e.target.value)}
                    />
                </div>
                <div className="form-col">
                    <label htmlFor="agreement-deposite">Deposit</label>
                    <input
                        type="number"
                        id="agreement-deposite"
                        value={agreementDeposite}
                        onChange={(e) => onDepositeChange(e.target.value)}
                    />
                </div>
                <div className="form-col">
                    <label htmlFor="agreement-currency">Currency</label>
                    <select
                        id="agreement-currency"
                        value={agreementCurrency}
                        onChange={(e) => onCurrencyChange(e.target.value)}
                        className="item-currency"
                    >
                        {currencyOptions && currencyOptions.length > 0 ? currencyOptions.map(x => <option value={x.id} selected={agreementCurrency===x.id}>{x.typeValue}</option>) :<></>}

                    </select>
                </div>
            </div>
            <table className="line-items-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>HSN/SAC</th>
                        <th>Qty</th>
                        <th>Completion (in days)</th>
                        <th>Rate</th>
                        <th>Unit</th>
                        <th>Tax %</th>
                        <th>Amount</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {lineItems.map(item => (
                        <tr key={item.id}>
                            <td>
                                <input
                                    type="text"
                                    value={item.title}
                                    onChange={(e) => onItemChange(item.id, 'title', e.target.value)}
                                    className="item-title"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={item.description}
                                    onChange={(e) => onItemChange(item.id, 'description', e.target.value)}
                                    className="item-desc"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={item.hsnSac}
                                    onChange={(e) => onItemChange(item.id, 'hsnSac', e.target.value)}
                                    placeholder="HSN/SAC"
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => onItemChange(item.id, 'quantity', e.target.value)}
                                    className="item-qty"
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={item.timeToComplete}
                                    onChange={(e) => onItemChange(item.id, 'timeToComplete', e.target.value)}
                                    className="item-rate"
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={item.rate}
                                    onChange={(e) => onItemChange(item.id, 'rate', e.target.value)}
                                    className="item-rate"
                                />
                            </td>
                            <td>
                                <select
                                    value={item.unit}
                                    onChange={(e) => onItemChange(item.id,'unit',e.target.value)}
                                    className="item-currency"
                                >
                                    {unitOptions && unitOptions.length > 0 ? unitOptions.map(x => <option value={x.id} selected={item.unit === x.id}>{x.typeValue}</option>) : <></>}

                                </select>
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={item.tax}
                                    onChange={(e) => onItemChange(item.id, 'tax', e.target.value)}
                                    className="item-tax"
                                />
                            </td>
                            <td className="item-amount">
                                ₹{(item.amount || 0).toFixed(2)}
                            </td>
                            <td className="remove-item" onClick={() => onRemoveItem(item.id)}>
                                <i className="fas fa-times"></i>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button type="button" className="add-item-btn" onClick={onAddItem}>
                <i className="fas fa-plus-circle"></i> Add Line Item
            </button>

            <div className="form-group">
                <label htmlFor="new-term">Add Payment Term</label>
                <div className="form-row">
                    <div className="form-col">
                        <input
                            type="text"
                            id="new-term-title"
                            placeholder="Enter new payment term title"
                            value={newTermTitle}
                            onChange={(e) => setNewTermTitle(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAddTerm()}
                        />
                        <input
                            type="text"
                            id="new-term"
                            placeholder="Enter new payment term description"
                            value={newTermDesc}
                            onChange={(e) => setNewTermDesc(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAddTerm()}
                        />
                    </div>
                    <div className="form-col" style={{ flex: '0 0 auto' }}>
                        {newTermId && newTermId.toString().length > 0 ? <button
                            type="button"
                            className="btn btn-outline"
                            onClick={() => {
                                handleEditTerm(newTermId, newTermTitle, newTermDesc);
                                setNewTermId();
                                setNewTermTitle('');
                                setNewTermDesc('');
                            }}
                        >
                            <i className="fas fa-edit"></i> Edit Payment Term
                        </button> : <button
                            type="button"
                            className="btn btn-outline"
                            onClick={handleAddTerm}
                        >
                                <i className="fas fa-plus"></i> Add Payment Term
                        </button>}
                    </div>
                </div>
            </div>
            <div className="form-group">
                <label>Payment Terms</label>
                <ul className="terms-list">
                    {paymentTerms.map(term => (
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
                            <span className="remove-item" onClick={() => onRemovePaymentTerm(term.id)}>
                                <i className="fas fa-times"></i>
                            </span>
                            <span className="remove-item" onClick={() => {
                                setNewTermId(term.id);
                                setNewTermTitle(term.title);
                                setNewTermDesc(term.text);
                            }}>
                                <i className="fas fa-edit"></i>
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {/*<div className="form-row" style={{ marginTop: '1.5rem' }}>*/}
            {/*    <div className="form-col">*/}

            {/*        <label htmlFor="payment-terms">Payment Terms</label>*/}
            {/*        <textarea*/}
            {/*            id="payment-terms"*/}
            {/*            value={paymentTerms}*/}
            {/*            onChange={(e) => onPaymentTermsChange(e.target.value)}*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
}

export default FinancialTerms;