import "./PieChart.css";
import { Chart } from "react-google-charts";
const BarGraph = ({ dataArray }) => {

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

    const data = [["Days", "Paid","Due"]];
    for (var i = 0; i < dataArray.length; i++) {
        data.push([dataArray[i].day, dataArray[i].paid, dataArray[i].due]);
        
    }

        //    public string  { get; set; }
        //public decimal  { get; set; }
        //public decimal  { get; set; }
        //public decimal  { get; set; }
        //public decimal  { get; set; }
        //public decimal  { get; set; }
        //public decimal WorkDone { get; set; }
        //public decimal TotalWorkDone { get; set; }
        //public decimal  { get; set; }


    return (<>{dataArray.length > 1 ? <>
        <div style={{ display: "inline-block", width: "700px", height:"700px" }} >
            <Chart
                chartType="BarChart"
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

export default BarGraph;