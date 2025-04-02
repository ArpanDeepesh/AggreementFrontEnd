import "./PieChart.css";
import { Chart } from "react-google-charts";
const CashFlowProgress = ({ cashIn, cashOut }) => {

    const options = {
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
        ["Cash In", cashIn],
        ["Cash Out", cashOut]
    ];
    console.log(data);
    return (<>{cashIn > 0 || cashOut>0 ? <>
        <div style={{ display: "inline-block", width: '500px', height:'300px' }} >
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

export default CashFlowProgress;