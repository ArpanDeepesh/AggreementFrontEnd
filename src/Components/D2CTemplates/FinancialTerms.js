 const FinancialTerms = ({ lineItems, onItemChange, onAddItem, onRemoveItem, paymentTerms, onPaymentTermsChange }) => (
        <div className="form-section">
            <h2>Financial Terms & Line Items</h2>
            <table className="line-items-table">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>HSN/SAC</th>
                        <th>Qty</th>
                        <th>Rate</th>
                        <th>Currency</th>
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
                                    value={item.rate}
                                    onChange={(e) => onItemChange(item.id, 'rate', e.target.value)}
                                    className="item-rate"
                                />
                            </td>
                            <td>
                                <select
                                    value={item.currency}
                                    onChange={(e) => onItemChange(item.id, 'currency', e.target.value)}
                                    className="item-currency"
                                >
                                    <option value="INR">INR</option>
                                    <option value="USD">USD</option>
                                    <option value="EUR">EUR</option>
                                    <option value="GBP">GBP</option>
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

            <div className="form-row" style={{ marginTop: '1.5rem' }}>
                <div className="form-col">
                    <label htmlFor="payment-terms">Payment Terms</label>
                    <textarea
                        id="payment-terms"
                        value={paymentTerms}
                        onChange={(e) => onPaymentTermsChange(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );

export default FinancialTerms;