import "./PieChart.css";
import { Chart } from "react-google-charts";
const PieChartAdvance = ({ initial,left }) => {

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
        ["Advance Initial", initial],
        ["Current Amount Left", left]
    ];
    console.log(data);
    return (<>{initial > 0 && left>0 ? <>
        <div style={{ display: "inline-block", width: '500px', height:'500px' }} >
            <Chart
                chartType="PieChart"
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

export default PieChartAdvance;