import "./MessageDisplay.css";
import LineGraph from "./LineGraph";
import BarGraph from "./BarGraph";
import PieChartAdvance from "./PieChartAdvance";
import ColumnGraphDayProgress from "./ColumnGraphDayProgress";
const ReportDisplay = ({ reportData, setReportData,totalInvoice }) => {
    const closeModule = (e) => {
        e.preventDefault();
        setReportData([]);
    }
    var tempData = [];
    for (var i = 1; i <= 90; i++)
    {
        tempData.push({
            day:i,
            paid:i*100,
            due:i*120
        })
    }
    return (<>
        {reportData && reportData.length > 0 ? <div className={reportData && reportData.length > 0 ? "modalOverlay" : "modalOverlay hidden"}>

            <button className="closeButton" onClick={(e) => { closeModule(e) }}>X</button>
            <div className="modalReportContent">
                <LineGraph dataArray={reportData} />
                <BarGraph dataArray={tempData} />
                <PieChartAdvance initial={reportData[0].advance} left={reportData[reportData.length - 1].advance} />
                <ColumnGraphDayProgress totalValue={reportData[0].totalWorkDue} invoiceRaised={totalInvoice} invoiceCleared={reportData[reportData.length - 1].totalRaised} cashOutflow={reportData[reportData.length - 1].totalPaid }/>
            </div>
        </div> :<></>}
        </>
    
        );
};

export default ReportDisplay;