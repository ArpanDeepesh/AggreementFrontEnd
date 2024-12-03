import "./DraftFlowPresentation.css";

const DraftFlowPresentation = ({ days,itemDaysArray, itemList, payDaysArray, payList,cur }) => {
    //const totalNumberOfDays = 20;
    //const itemDaysArray = [8, 8, 5, 18, 18];
    //const itemList = ["Item1", "Item2", "Item3", "Item4", "Item5"];
    //const payDaysArray = [5, 19];
    //const payList = ["Pay1 5000", "Pay2 12000"];
    const getItemName = (i) =>
    {
        var txt = '';
        for (var idx = 0; idx < itemDaysArray.length; idx++) {
            if (itemDaysArray[idx] === i) {
                txt += "" + itemList[idx] + " ";
            }
        }
        return txt;
    }
    const getItemNameValue = (i) => {
        return (<ul className="treeEleListDisplay">
            {Array.from({ length: itemDaysArray.length }, (_, idx) => (itemDaysArray[idx] === i ? <li>
                <strong>Item: </strong>{itemList[idx]}</li> : <></>))}
        </ul>);
    }
    const getPayName = (i) => {
        var txt = '';
        for (var idx = 0; idx < payDaysArray.length; idx++) {
            if (payDaysArray[idx] === i) {
                txt += payList[idx] + " "
            }
        }
        return txt;
    }
    const getPayNameValue = (i) => {
        return (<ul className="treeEleListDisplay">
            {Array.from({ length: payDaysArray.length }, (_, idx) => (payDaysArray[idx] === i ? <li>
                <strong>Payment: </strong>{cur} {payList[idx]}</li> : <></>))}
        </ul>);
    }
	return (
        <div className="table">
            <div className="row">
                <div className="col-md-5"></div>
                <div className="col-md-2 start-end">Start</div>
                <div className="col-md-5"></div>
            </div>
            {Array.from({ length: days }, (_, index) => (
                <div className="row">
                    {getItemName(index + 1) != "" || getPayName(index + 1) != "" ? <>
                        <div className="col-md-5 d-flex align-items-center">
                            <div className={getItemName(index + 1) != "" ? "item-content" : ""}>{getItemNameValue(index + 1)}</div>
                        </div>
                        <div className="col-md-2 number d-flex align-items-center justify-content-center p-0">Day {index + 1}</div>
                        <div className="col-md-5 d-flex align-items-center">
                            <div className={getPayName(index + 1) != "" ? "pay-content" : ""}> {getPayNameValue(index + 1)}</div>
                        </div>
                    </> : <></>}
                    
                </div>
            ))}
            <div className="row">
                <div className="col-md-5"></div>
                <div className="col-md-2 start-end">End</div>
                <div className="col-md-5"></div>
            </div>
		</div>
	);
};
export default DraftFlowPresentation;