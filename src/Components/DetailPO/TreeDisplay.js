import "./TreeDisplay.css"
import ActiveFlowPresentation from "../FlowPresentation/ActiveFlowPresentation";
import { useEffect, useState } from "react";
const TreeDisplay = ({ displayTree, setDisplayTree, startDate, endDate, itemList, payList, cur }) => {
	const [days, setDays] = useState(0);
	const [itemDaysList, setItemDaysList] = useState([]);
	const [payDaysList, setPayDaysList] = useState([]);
	const [itemFinalNameList, setItemFinalNameList] = useState([]);
	const [payAmtList, setPayAmtList] = useState([])
	useEffect(() => {
		calculateDisplayVariables();
	}, []);
    const closeModule = (e) => {
        e.preventDefault();
        setDisplayTree(0);
    }
	const calculateDisplayVariables = () => {

		let date2 = new Date(endDate);
		let date1 = new Date(startDate);

		// Calculating the time difference
		// of two dates
		let Difference_In_Time =
			date2.getTime() - date1.getTime();

		// Calculating the no. of days between
		// two dates
		setDays(
			Math.round
				(Difference_In_Time / (1000 * 3600 * 24))
		);

		var itemNameList = [];
		var itemCompletionDayList = [];
		var tempPayList = [];
		var payCompletionDayList = [];
		for (var i = 0; i < itemList.length; i++) {
			var itemCompDay = 0;
			itemNameList.push({ title: itemList[i].title, status: itemList[i].lineItemStatus });
			let date3 = new Date(itemList[i].itemCompletionDate);
			let date1 = new Date(startDate);

			// Calculating the time difference
			// of two dates
			let item_difference_In_Time =
				date3.getTime() - date1.getTime();

			// Calculating the no. of days between
			// two dates
			itemCompDay =
				Math.round
				(item_difference_In_Time / (1000 * 3600 * 24));

			itemCompletionDayList.push(itemCompDay);
		}
		for (var ind = 0; ind < payList.length; ind++) {
			var payCompDay = 0;
			tempPayList.push({ amt: payList[ind].paymentAmount, status: payList[ind].paymentStatus });
			let date4 = new Date(payList[ind].dueDate);
			let date1 = new Date(startDate);

			// Calculating the time difference
			// of two dates
			let pay_difference_In_Time =
				date4.getTime() - date1.getTime();

			// Calculating the no. of days between
			// two dates
			payCompDay =
				Math.round
				(pay_difference_In_Time / (1000 * 3600 * 24));
			payCompletionDayList.push(payCompDay);
		}

		setItemDaysList(itemCompletionDayList);
		setItemFinalNameList( itemNameList);
		setPayDaysList (payCompletionDayList);
		setPayAmtList(tempPayList);
	}
    return (
        <div className={displayTree===1 ? "modalOverlay" : "modalOverlay hidden"}>

                <button className="closeButton" onClick={(e) => { closeModule(e) }}>X</button>
                <div className="modalContent">

				<ActiveFlowPresentation startDate={startDate} endDate={endDate} days={days} itemDaysArray={itemDaysList}
					itemList={itemFinalNameList} payDaysArray={payDaysList} payList={payAmtList} cur={cur} />
                </div>
        </div>);
};

export default TreeDisplay;