import "./Payment.css";
import FormButton from "../FormParts/FormButton";
import { useState } from "react";
import RemarkListDisplay from "../CommonPages/RemarkListDisplay";
import PaymentNegotiation from "./PaymentNegotiation";
const PaymentList = ({ displayList, setDisplayList, payLst, setPayLst }) => {
	const [remarkList, setRemarkList] = useState();
	const [paymentId, setPaymentId] = useState(0);
	const [reqType, setReqType] = useState();

    const closeModule = () => {
		setPayLst();
		setDisplayList("");
	}

	return (
		<div className={displayList === "Buyer" || displayList==="Seller" ? "modalOverlay" : "modalOverlay hidden"}>
			<RemarkListDisplay remarkLst={remarkList} setRemarkLst={setRemarkList} />
			<PaymentNegotiation reloadAction={closeModule} type={reqType} payId={paymentId} setPayId={setPaymentId}/>
			<button className="closeButton" onClick={(e) => {
				e.preventDefault();
				closeModule();
			}}>X</button>
			{payLst && payLst.length > 0 ? <div className="modalContent">
				<div className="col-md-12 pt-2 ">
					<div className="row">
						<div className="col-md-12 p-0">
							<h4 className="headingStyle">Payment List</h4>
						</div>
					</div>
					<div className="row">
						<div className="col-md-1 tableHeader">S.No.</div>
						<div className="col-md-1 tableHeader">PaymentStatus</div>
						<div className="col-md-2 tableHeader">PaidAmount</div>
						<div className="col-md-3 tableHeader">PaymentNote</div>
						<div className="col-md-1 tableHeader">Remarks</div>
						<div className="col-md-2 tableHeader">CreatedOn</div>
						<div className="col-md-2 tableHeader">Action</div>
					</div>

					{payLst && payLst.length > 0 ? payLst.map((x, ind) => <div className="row p-1 tablebox">
						<div className="col-md-1">
							<strong className="d-inline d-md-none">S.No: </strong>
							{ind + 1} </div>
						<div className="col-md-1">
							<strong className="d-inline d-md-none">PaymentStatus: </strong>
							{x.paymentStatus} </div>
						<div className="col-md-2">
							<strong className="d-inline d-md-none">Amount: </strong>
							{x.paidAmount}
						</div>
						<div className="col-md-3">
							<strong className="d-inline d-md-none">Note: </strong>
							{x.paymentNote}
						</div>
						<div className="col-md-1">
							<strong className="d-inline d-md-none">Remarks: </strong>
							<span>
								{x.remarks && x.remarks.length > 0 ?
									<img src={"/comment2.png"} alt="Comment" className="commentIcon" width={20} height={20}
										onClick={(e) => {
											e.preventDefault();
											setRemarkList(x.remarks);
										}}
									/> : <span style={{ fontSize: "70%" }}>No remarks</span>}
								<br />
								<span class="badge bg-success text-light">{x.itemStatus}</span>
							</span>
						</div>
						<div className="col-md-2">
							<strong className="d-inline d-md-none">CreatedOn: </strong>
							{x.createdOn}
						</div>
						<div className="col-md-2">
							<strong className="d-inline d-md-none">Action: </strong>
							{x.paymentStatus === "Done" && displayList === "Seller" ? <>
								<FormButton name="Received"
									onClick={(e) => {
										e.preventDefault();
										setReqType("PR");
										setPaymentId(x.id);
									}}
								/>
								<FormButton name="Not Received"
									onClick={(e) => {
										e.preventDefault();
										setReqType("PNR");
										setPaymentId(x.id);
								}} /></> : <></>}
							{x.paymentStatus === "Not Received" && displayList === "Buyer" ? <>
								<FormButton name="Respond"
									onClick={(e) => {
										e.preventDefault();
										setReqType("PD");
										setPaymentId(x.id);
								}} /></> : <></>}
							
						</div>
					</div>) : <div className="row"> No Items in Purchase Agreement</div>}
				</div>

            </div> : <>
            <h3>No payments are present</h3>
            </>}
                
        </div>);
};

export default PaymentList;