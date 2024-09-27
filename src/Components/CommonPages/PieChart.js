import "./PieChart.css";
const PieChart = ({ dataArray }) => {
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

    return (<>{dataArray.length > 1 ? <> <div className="progress">
        <div className="progress-bar bg-success" style={{ width: Math.round(completed * 100 / total).toString() + "%" }} >{Math.round(completed * 100 / total).toString()}%</div>
        <div className="progress-bar bg-info" style={{ width: Math.round(claimed * 100 / total).toString() + "%" }} >{Math.round(claimed * 100 / total).toString()}%</div>
        <div className="progress-bar bg-danger" style={{ width: Math.round(waiting * 100 / total).toString() + "%" }} >{Math.round(waiting * 100 / total).toString()}%</div>
        <div className="progress-bar bg-primary" style={{ width: Math.round(active * 100 / total).toString() + "%" }} >{Math.round(active * 100 / total).toString()}%</div>
    </div></> :<>No Data</>}
        </>
        );
};

export default PieChart;