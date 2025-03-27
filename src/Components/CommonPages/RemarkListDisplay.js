import "./MessageDisplay.css"
const RemarkListDisplay = ({ remarkLst, setRemarkLst }) => {
    const closeModule = (e) => {
        e.preventDefault();
        setRemarkLst([]);
    }
    return (
        <div className={remarkLst && remarkLst.length > 0 ? "modalOverlay" : "modalOverlay hidden"}>

                <button className="closeButton" onClick={(e) => { closeModule(e) }}>X</button>
                <div className="modalContent">
                
                    <p><ul>{remarkLst ? remarkLst.map(x => <li>
                        <p style={{ textAlign: "left" }}>
                            <strong>Created By {x.owner}</strong>
                            <br />
                            <span style={{ fontSize: "70%" }}>{x.createdOn}</span>
                            <br />
                            {x.remarkText}
                            <br />
                            {x.attachments && x.attachments.length>0 ? <ul>
                                {x.attachments.map((f, i) => <li>
                                    <a href={f.link} target={"new"}>
                                        <img src={f.link} width={50} height={50} />
                                    </a>
                                </li>)}</ul>:<></> }
                        
                        </p></li>) : <></>}</ul>
                    </p>
                </div>
        </div>);
};

export default RemarkListDisplay;