import "./MessageDisplay.css"
const MessageDisplay = ({ msg, setMsg }) => {
    const closeModule = (e) => {
        e.preventDefault();
        setMsg("");
    }
    return (
        <div className={msg === "" ?"modalOverlay hidden":"modalOverlay"}>
            <div className="modalContent">
                <button className="closeButton" onClick={(e) => { closeModule (e)} }>X</button>
                <p>{ msg}</p>
            </div>
        </div>);
};

export default MessageDisplay;