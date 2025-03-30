import "./MessageDisplay.css";
import LineGraph from "./LineGraph";
import BarGraph from "./BarGraph";
import PieChartAdvance from "./PieChartAdvance";
import ColumnGraphDayProgress from "./ColumnGraphDayProgress";
const ReportDisplay = ({ reportData, setReportData }) => {
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
                {/*<LineGraph dataArray={reportData} />*/}
                {/*<BarGraph dataArray={tempData} />*/}
                public string Day
                public decimal AdvancePaid 
                public decimal AdvanceTotalRaised 
                public decimal CashOutFlow 
                public decimal InvoiceRaisedTotal 
                public decimal InvoiceCleared 
                <PieChartAdvance initial={reportData.advanceTotalRaised} left={reportData.advancePaid} />
                <ColumnGraphDayProgress totalValue={reportData.totalValue} invoiceRaised={reportData.invoiceRaisedTotal} invoiceCleared={reportData.invoiceCleared} cashOutflow={reportData.cashOutFlow}/>
            </div>
        </div> :<></>}
        </>
    
        );
};

export default ReportDisplay;