import "./PieChart.css";
import { Chart } from "react-google-charts";
const LineGraph = ({ dataArray }) => {

    //const options = {
    //    pieHole: 0.4, pieSliceText: "none",
    //    is3D: false,
    //    legend: "none",
    //    colors: ["#6c757d", "#F15A29", "#28A745", "#ff0000"],
    //    tooltip: {
    //        textStyle: {
    //            fontSize: 14, // Increase tooltip font size
    //            bold: false,   // Make text bold
    //            color: "#000", // Change tooltip text color
    //        },
    //    },
    //};
    const options = {
        title: "Company Performance",
        curveType: "function",
        legend: { position: "bottom" },
    };

    const data = [["Name","Advance","Raised", "Total Raised", "Paid", "Total Paid"]];
    for (var i = 0; i < dataArray.length; i++) {
        data.push([dataArray[i].txnNoteTitle, dataArray[i].advance, dataArray[i].raised, dataArray[i].totalRaised, dataArray[i].paid, dataArray[i].totalPaid]);
        
    }

        //    public string  { get; set; }
        //public decimal  { get; set; }
        //public decimal  { get; set; }
        //public decimal  { get; set; }
        //public decimal  { get; set; }
        //public decimal  { get; set; }
        //public decimal WorkDone { get; set; }
        //public decimal TotalWorkDone { get; set; }
        //public decimal TotalWorkDue { get; set; }


    return (<>{dataArray.length > 1 ? <>
        <div style={{ display: "inline-block", width: '500px', height:'500px' }} >
            <Chart
                chartType="LineChart"
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

export default LineGraph;