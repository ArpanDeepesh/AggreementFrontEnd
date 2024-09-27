import "./MessageDisplay.css"
const RemarkListDisplay = ({ remarkLst, setRemarkLst }) => {
    const closeModule = (e) => {
        e.preventDefault();
        setRemarkLst([]);
    }
    return (
        <div className={remarkLst && remarkLst.length>0 ? "modalOverlay" : "modalOverlay hidden"}>
            <div className="modalContent">
                <button className="closeButton" onClick={(e) => { closeModule (e)} }>X</button>
                <p><ul>{remarkLst ? remarkLst.map(x => <li>{JSON.stringify(x)}</li>) :<></>}</ul>
                </p>
            </div>
        </div>);
};

export default RemarkListDisplay;