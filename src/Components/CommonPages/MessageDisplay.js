import "./MessageDisplay.css";
const MessageDisplay = ({ msgType,msg, setMsg }) => {
    const closeModule = (e) => {
        e.preventDefault();
        setMsg("");
    }
    return (
        <div className={msg === "" ?"modalOverlay hidden":"modalOverlay"}>
            <div className="modalContent">
                <button className="closeButton" onClick={(e) => { closeModule(e) }}>X</button>
                <p style={{ color: ( msgType === "Error" ? "red" : (msgType === "Info" ?"blue":msgType==="Success"?"Green":"black") ) }}>{msg}</p>
            </div>
        </div>);
};

export default MessageDisplay;