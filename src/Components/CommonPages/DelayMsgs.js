import "./MessageDisplay.css"
const DelayMsgs = ({ msgList, setMsgList }) => {
    const closeModule = (e) => {
        e.preventDefault();
        setMsgList([]);
    }
    return (
        <div className={msgList && msgList.length > 0 ? "modalOverlay" : "modalOverlay hidden"}>
            <div className="modalContent" style={{ textAlign:'left' }}>
                <button className="closeButton" onClick={(e) => { closeModule (e)} }>X</button>
                <p><ul>{msgList ? msgList.map(x => <li>{x}</li>) :<></>}</ul>
                </p>
            </div>
        </div>);
};

export default DelayMsgs;