import React from 'react';

const RFQTermDuration = ({
    agreementPenalityPercent,
    agreementPenalityDays,
    onPenalityPercentChange,
    onPenalityDaysChange,
    startDate,
    contractDuration,
    onStartDateChange,
    onDurationChange,
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
            </div>
            <div className="form-row">
                <div className="form-col">
                    <label htmlFor="start-date">Start Date</label>
                    <input
                        type="date"
                        id="start-date"
                        value={startDate}
                        onChange={(e) => onStartDateChange(e.target.value)}
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
            </div>
        </div>
    );
};

export default RFQTermDuration;
