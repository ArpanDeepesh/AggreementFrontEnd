import "./PieChart.css";
import { Chart } from "react-google-charts";
const PieChart = ({ dataArray }) => {

    const options = {
        pieHole: 0.4, pieSliceText: "none",
        is3D: false,
        legend: "none",
        colors: ["#28A745", "#F15A29", "#007BFF", "#ff0000"],
        tooltip: {
            textStyle: {
                fontSize: 14, // Increase tooltip font size
                bold: false,   // Make text bold
                color: "#000", // Change tooltip text color
            },
        },
    };

    var total = 0;
    var waiting = 0;
    var completed = 0;
    var active = 0;
    var claimed = 0;
    for (var i = 0; i < dataArray.length; i++) {
        total += dataArray[i].pay;
        if (dataArray[i].status === 1) {
            active += dataArray[i].pay;
        } else if (dataArray[i].status === 2)
        {
            waiting += dataArray[i].pay;
        } else if (dataArray[i].status === 3) {
            completed += dataArray[i].pay;
        } else if (dataArray[i].status === 7) {
            claimed += dataArray[i].pay;
        }
    }
    const data = [
        ["Status", "Amount"],
        ["Active", active],
        ["Waiting", waiting],
        ["Completed", completed],
        ["Claimed", claimed], // CSS-style declaration
    ];
    return (<>{dataArray.length > 1 ? <>
        <div style={{ display: "inline-block", width: '120px', height:'120px' }} >
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

export default PieChart;