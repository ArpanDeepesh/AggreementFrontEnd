import React from 'react';

const TermDuration = ({
    startDate,
    endDate,
    noticePeriod,
    onStartDateChange,
    onEndDateChange,
    onNoticePeriodChange
}) => {
    return (
        <div className="form-section">
            <h2>Term & Duration</h2>
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
                    <label htmlFor="end-date">End Date</label>
                    <input
                        type="date"
                        id="end-date"
                        value={endDate}
                        onChange={(e) => onEndDateChange(e.target.value)}
                    />
                </div>
                <div className="form-col">
                    <label htmlFor="notice-period">Notice Period (days)</label>
                    <select
                        id="notice-period"
                        value={noticePeriod}
                        onChange={(e) => onNoticePeriodChange(e.target.value)}
                    >
                        <option value="7">7 days</option>
                        <option value="15">15 days</option>
                        <option value="30">30 days</option>
                        <option value="60">60 days</option>
                        <option value="90">90 days</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default TermDuration;
