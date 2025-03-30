import "./MessageDisplay.css";
import LineGraph from "./LineGraph";
const ReportDisplay = ({ reportData, setReportData }) => {
    const closeModule = (e) => {
        e.preventDefault();
        setReportData([]);
    }
    return (<>
        {reportData && reportData.length > 0 ? <div className={reportData && reportData.length > 0 ? "modalOverlay" : "modalOverlay hidden"}>

            <button className="closeButton" onClick={(e) => { closeModule(e) }}>X</button>
            <div className="modalContent">
                <LineGraph dataArray={reportData} />
            </div>
        </div> :<></>}
        </>
    
        );
};

export default ReportDisplay;