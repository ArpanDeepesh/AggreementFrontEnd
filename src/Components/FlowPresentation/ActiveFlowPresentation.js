import "./DraftFlowPresentation.css";

const ActiveFlowPresentation = ({startDate,endDate,days,itemDaysArray, itemList, payDaysArray, payList,cur }) => {
    //const totalNumberOfDays = 20;
    //const itemDaysArray = [8, 8, 5, 18, 18];
    //const itemList = ["Item1", "Item2", "Item3", "Item4", "Item5"];
    //const payDaysArray = [5, 19];
    //const payList = ["Pay1 5000", "Pay2 12000"];
    console.log("Active Flow presentation");
    console.log(itemDaysArray);
    console.log(itemList);
    console.log(payDaysArray);
    console.log(payList);
    console.log(cur);
    const getItemName = (i) =>
    {
        var txt = '';
        for (var idx = 0; idx < itemDaysArray.length; idx++) {
            if (itemDaysArray[idx] === i) {
                txt += "" + itemList[idx].title + " ";
            }
        }
        return txt;
    }
    const getItemNameValue = (i) => {
        return (<ul className="treeEleListDisplay">
            {Array.from({ length: itemDaysArray.length }, (_, idx) => (itemDaysArray[idx] === i ? <li>
                <strong>Item: </strong>{itemList[idx].title}
                <span class="badge text-light" style={itemList[idx].status === "Completed" ? { backgroundColor: "#28A745" } :
                    itemList[idx].status === "Waiting" ? { backgroundColor: "#F15A29" } : { backgroundColor: "#6c757d" }}>{itemList[idx].status}</span>
            </li> : <></>))}
        </ul>);
    }
    const getPayName = (i) => {
        var txt = '';
        for (var idx = 0; idx < payDaysArray.length; idx++) {
            if (payDaysArray[idx] === i) {
                txt += payList[idx].amt + " "
            }
        }
        return txt;
    }
    const getPayNameValue = (i) => {
        return (<ul className="treeEleListDisplay">
            {Array.from({ length: payDaysArray.length }, (_, idx) => (payDaysArray[idx] === i ? <li>
                <strong>Payment: </strong>{cur} {payList[idx].amt}
                <span class="badge text-light" style={payList[idx].status === "Completed" ? { backgroundColor: "#28A745" } :
                    payList[idx].status === "Waiting" ? { backgroundColor: "#F15A29" } : { backgroundColor: "#6c757d" }}>{payList[idx].status}</span>
            </li> : <></>))}
        </ul>);
    }
	return (
        <div className="table">
            <div className="row">
                <div className="col-md-5"></div>
                <div className="col-md-2 start-end">Started on:{new Date(startDate).toLocaleDateString()}</div>
                <div className="col-md-5"></div>
            </div>
            {Array.from({ length: days }, (_, index) => (
                <div className="row">
                    {getItemName(index + 1) != "" || getPayName(index + 1) != "" ? <>
                        <div className="col-md-5 d-flex align-items-center">
                            <div className={getItemName(index + 1) != "" ? "item-content" : ""}>{getItemNameValue(index + 1)}</div>
                        </div>{
                            new Date().toLocaleDateString() !== new Date(new Date(startDate).getTime() + (index + 1) * 24 * 60 * 60 * 1000).toLocaleDateString() ? <>
                                <div className="col-md-2 number d-flex align-items-center justify-content-center p-0">
                                {new Date(new Date(startDate).getTime() + (index + 1) * 24 * 60 * 60 * 1000).toLocaleDateString()}
                                </div></> : <>
                                <div className="col-md-2 number d-flex align-items-center justify-content-center p-0" style={{ backgroundColor: "#28A745" }}>
                                    {new Date(new Date(startDate).getTime() + (index + 1) * 24 * 60 * 60 * 1000).toLocaleDateString()}
                                </div></>
                        }
                        <div className="col-md-5 d-flex align-items-center">
                            <div className={getPayName(index + 1) != "" ? "pay-content" : ""}> {getPayNameValue(index + 1)}</div>
                        </div>
                    </> : <>{new Date().toLocaleDateString() === new Date(new Date(startDate).getTime() + (index + 1) * 24 * 60 * 60 * 1000).toLocaleDateString() ? <>
                            <div className="col-md-5 d-flex align-items-center">
                            </div>
                            <div className="col-md-2 number d-flex align-items-center justify-content-center p-0"
                                style={{ backgroundColor: "#28A745", color:"white" }}>
                                {new Date(new Date(startDate).getTime() + (index + 1) * 24 * 60 * 60 * 1000).toLocaleDateString()}
                            </div>
                            <div className="col-md-5 d-flex align-items-center">
                            </div>
                    </> : <></>}
                    </>}
                    
                </div>
            ))}
            <div className="row">
                <div className="col-md-5"></div>
                <div className="col-md-2 start-end">End on: {new Date(endDate).toLocaleDateString()}</div>
                <div className="col-md-5"></div>
            </div>
		</div>
	);
};
export default ActiveFlowPresentation;