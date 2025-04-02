import "./PieChart.css";
import { Chart } from "react-google-charts";
const ClientPorgress = ({ totalValue, invoiceRaised, invoiceCleared ,cashOutflow }) => {

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
        ["Value", totalValue],
        ["Invoice raised", invoiceRaised],
        ["Invoice cleared", invoiceCleared],
        ["Cash flow", cashOutflow],
    ];
    console.log(data);
    return (<>{totalValue > 0 ? <>
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

export default ClientPorgress;