import React from 'react';

const RFQTermDuration = ({
    agreementPenalityPercent,
    agreementPenalityDays,
    onPenalityPercentChange,
    onPenalityDaysChange,
    contractDuration,
    onDurationChange,
    inviteOnly,
    onInviteOnlyChange
}) => {
    return (
        <div className="form-section">
            <h2>Term & Duration</h2>
            <div className="form-row">
                <div className="form-col">
                    <label htmlFor="agreement-penality-percent">Penality percent</label>
                    <input
                        type="number"
                        id="agreement-penality-percent"
                        value={agreementPenalityPercent}
                        onChange={(e) => onPenalityPercentChange(e.target.value)}
                    />
                </div>
                <div className="form-col">
                    <label htmlFor="agreement-penality-days">Penality (after days)</label>
                    <input
                        type="number"
                        id="agreement-penality-days"
                        value={agreementPenalityDays}
                        onChange={(e) => onPenalityDaysChange(e.target.value)}
                    />
                </div>
                <div className="form-col">
                    <label htmlFor="duration">Duration(in days)</label>
                    <input
                        type="number"
                        id="duration"
                        value={contractDuration}
                        onChange={(e) => onDurationChange(e.target.value)}
                    />
                </div>
                <div className="form-col">
                    <label htmlFor="duration">Is invite only request?</label>
                    <input
                        type="checkbox"
                        id="inviteOnly"
                        checked={inviteOnly}
                        onChange={(e) => onInviteOnlyChange(e.target.checked)}
                    />
                </div>
            </div>

        </div>
    );
};

export default RFQTermDuration;
