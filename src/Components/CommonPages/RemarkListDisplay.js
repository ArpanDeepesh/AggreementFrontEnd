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
                <p><ul>{remarkLst ? remarkLst.map(x => <li>
                    <p style={{ textAlign: "left" }}>
                        <strong>Created By {x.createdBy}</strong>
                        <br />
                        <span style={{ fontSize: "70%" }}>{x.remarkDate}</span>
                        <br />
                        {x.description}
                        <br />
                        {x.attachments && x.attachments.length>0 ? <ul>
                            {x.attachments.map((f, i) => <li>
                                <a href={f.link} target={"new"}> Att-{i + 1}</a>
                            </li>)}</ul>:<></> }
                        
                    </p></li>) : <></>}</ul>
                </p>
            </div>
        </div>);
};

export default RemarkListDisplay;