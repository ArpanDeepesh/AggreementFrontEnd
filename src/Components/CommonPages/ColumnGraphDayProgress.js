import "./PieChart.css";
import { Chart } from "react-google-charts";
const ColumnGraphDayProgress = ({ totalValue, invoiceRaised, invoiceCleared ,cashOutflow }) => {

    const options = {
        pieHole: 0.4, pieSliceText: "none",
        is3D: false,
        legend: "none",
        colors: ["#6c757d", "#F15A29"],
        tooltip: {
            textStyle: {
                fontSize: 14, // Increase tooltip font size
                bold: false,   // Make text bold
                color: "#000", // Change tooltip text color 
            },
        },
    };
    const data = [
        ["Advance Status", "Amount"],
        ["Total Value", totalValue],
        ["Total invoice raised", invoiceRaised],
        ["Total invoice cleared", invoiceCleared],
        ["Total cashoutflow", cashOutflow],
    ];
    console.log(data);
    return (<>{totalValue > 0 && invoiceRaised >0 ? <>
        <div style={{ display: "inline-block", width: '500px', height:'500px' }} >
            <Chart
                chartType="ColumnChart"
                width="100%"
                height="100%"
                data={data}
                options={options}
            />
            
        </div>
        
    </> : <>No Data</>}
        </>
        );
};

export default ColumnGraphDayProgress;