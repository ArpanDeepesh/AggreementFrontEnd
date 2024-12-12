import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormSubmitButton from "../FormParts/FormSubmitButton";
import FormButton from "../FormParts/FormButton";
import { getRequest } from "../Services/POContractBackendAPI";
import UserProfile from "../Context/UserProfile";
import PurchaseOrder from "../Context/PurchaseOrder";
import "./DetailPO.css";
import AddRemark from "../CommonPages/AddRemark";
import RemarkListDisplay from "../CommonPages/RemarkListDisplay";
import TreeDisplay from "./TreeDisplay";

const DetailPO = ({ setUserName }) => {
	const [remarkList, setRemarkList] = useState();
	const [poId, setPoId] = useState();
	const [remarkAction, setRemarkAction] = useState();
	const [po, setPo] = useState();
	const [openRemark, setOpenRemark] = useState();
	const [remarkType, setRemarkType] = useState();
	const [treeDisplay, setTreeDisplay] = useState();
	const navigate = useNavigate();

	var days = 0;
	useEffect(() => {
		setOpenRemark(0);
		setTreeDisplay(0);
		setUserName(UserProfile.getName());
		setRemarkAction("Submit Remark");
		if (PurchaseOrder.getPoId() && PurchaseOrder.getPoId() > 0) {
			getRequest('api/POManagement/GetPurchaseOrderDetails?poId=' + PurchaseOrder.getPoId(), UserProfile.getToken())
				.then(r => r.json()).then(res => {
					if (res.data) {
						console.log(res.data);
						setPoId(res.data.poId);
						setPo(res.data);







						PurchaseOrder.resetData();
					}
				}).catch(err => {
					console.log(err);
				});
			
		} else {
			navigate("/Home");
		}
	}, []);
	const reloadAggrement = () => {
		getRequest('api/POManagement/GetPurchaseOrderDetails?poId=' + poId, UserProfile.getToken())
			.then(r => r.json()).then(res => {
				if (res.data) {
					console.log(res.data);
					setPoId(res.data.poId);
					setPo(res.data);
					PurchaseOrder.resetData();
				}
			}).catch(err => {
				console.log(err);
			});
	}
	const downloadClicked = () => {
		if (poId>0) {
			getRequest('api/POManagement/GetPurchaseOrderRportPDF?poId=' + poId, UserProfile.getToken())
				.then(r => r.json()).then(res => {
					if (res.data !== "") {
						window.open(res.data, '_blank', 'noopener,noreferrer');
					}
				}).catch(err => {
					console.log(err);
				});

		} else {
			navigate("/Home");
		}
	}

	return (
		<><div className="d-flex h-100" style={{ overflowY: 'scroll' }}>
			{po && po.poId > 0 ? <div className="table" style={{ textAlign: "left" }}>
				<AddRemark id={openRemark} setId={setOpenRemark} type={remarkType} actionText={remarkAction} reloadAction={reloadAggrement} />
				<RemarkListDisplay remarkLst={remarkList} setRemarkLst={setRemarkList} />
				<TreeDisplay displayTree={treeDisplay} setDisplayTree={setTreeDisplay} startDate={po.startDate} endDate={po.expectedCompletionDate}
					itemList={po.poLineItems} payList={po.poPayments} cur={po.poCurrency} />
				<div className="row">
					<div className="col-md-12">
						<h4 style={{ textAlign: "left", color: '#007bff' }}>Agreement Details </h4>
						{po.status === "Raised"  ? <div className="row p-1" style={{ textAlign: "center" }}>
							<div className="col-md-1">
								<FormButton name="< Back" onClick={(e) => {
									e.preventDefault();
									navigate("/Home");
								}} />
							</div>
							<div className={po.raisedById.toString() !== UserProfile.getUserId().toString() ? "col-md-3" : " d-none"}>
								<FormButton name="Accept" onClick={(e) => {
									e.preventDefault();
									setOpenRemark(poId);
									setRemarkType("O");
									setRemarkAction("Accept Agreement");

								}} />
							</div>
							<div className={po.raisedById.toString() === UserProfile.getUserId().toString()
								&& po.sellerId === po.buyerId ? "col-md-3" : " d-none"}>
								<FormButton name="Accept" onClick={(e) => {
									e.preventDefault();
									setOpenRemark(poId);
									setRemarkType("O");
									setRemarkAction("Accept Agreement");

								}} />
							</div>
							<div className="col-md-3">
								<FormButton name="Reconsider" onClick={(e) => {
									e.preventDefault();
									setOpenRemark(poId);
									setRemarkType("O");
									setRemarkAction("Reconsider Agreement");
	
								}} />
							</div>
						</div> : <></>}
						{po.status === "Active" && po.raisedById !== PurchaseOrder.getRaisedBy() ? <div className="row p-1" style={{ textAlign: "center" }}>
							<div className="col-md-1">
								<FormButton name="< Back" onClick={(e) => {
									e.preventDefault();
									navigate("/Home");
								}} />
							</div>
							<div className="col-md-3">
								<FormButton name="Tree View" onClick={(e) => {
									e.preventDefault();
									setTreeDisplay(1);
								}} />
							</div>
							{po.raisedById.toString() === UserProfile.getUserId().toString() ? <div className="col-md-3">
								<FormButton name="Complete" onClick={(e) => {
									e.preventDefault();
									setOpenRemark(poId);
									setRemarkType("O");
									setRemarkAction("Complete Aggrement");
								}} />
							</div> : <></>}
							<div className="col-md-3">
								<FormButton name="Download" onClick={(e) => {
									e.preventDefault();
									downloadClicked();
								}} />
							</div>
						</div> : <></>}
						{po.status === "Completed" || po.status === "Expired" ? <div className="row p-1">
							<div className="col-md-1">
								<FormButton name="< Back" onClick={(e) => {
									e.preventDefault();
									navigate("/Home");
								}} />
							</div>
							<div className="col-md-3">
								<FormButton name="Download" onClick={(e) => {
									e.preventDefault();
									downloadClicked();
								}} />
							</div>
						</div> : <></>}
						
					</div>
				</div>
				<div className="row" style={{ textAlign: "left", paddingBottom:'10px' }}>
					<div className="col-md-3"><strong style={{ color:"#007bff" }}>Seller</strong>
						<br /><strong>Name: </strong>{po.sellerName}
						<br /><strong>Phone Number: </strong>{po.sellerPhoneNo}
						<br /><strong>Company: </strong>{po.sellerCompany}
						<br /><strong>Address: </strong>{po.sellerAddress}
						<br /><strong>GSTIN: </strong>{po.sellerGSTIN}
					</div>
					<div className="col-md-3"><strong style={{ color: "#007bff" }}>Buyer</strong>
						<br /><strong>Name: </strong> {po.buyerName}
						<br /><strong>Phone Number: </strong>{po.buyerPhoneNo}
						<br /><strong>Company: </strong>{po.buyerCompany}
						<br /><strong>Address: </strong>{po.buyerAddress}
						<br /><strong>GSTIN: </strong>{po.buyerGSTIN}
					</div>
					<div className="col-md-3"><strong style={{ color: "#007bff" }}>Title</strong>
						<br />{po.title}</div>
					<div className="col-md-3"><strong style={{ color: "#007bff" }}>Amount</strong>
						<br /> {po.poAmount.toLocaleString("en-IN")} {po.poCurrency}</div>
				</div>
				<div className="row">
					<div className="col-md-3"><strong style={{ color: "#007bff" }}>Description</strong>
						<br /> {po.description} </div>
					<div className="col-md-3"><strong style={{ color: "#007bff" }}>Status Notification Duration</strong>
						<br /> {po.notificationPeriodInDays} days</div>
					<div className="col-md-3">
						{po.status === 'Active' || po.status === 'Complete' ? <strong style={{ color: "#007bff" }}>Completion Date</strong>
							: <strong style={{ color: "#007bff" }}>Expected Completion </strong>}

						<br /> {new Date(po.expectedCompletionDate).toLocaleString()}</div>
					<div className="col-md-3"><strong style={{ color: "#007bff" }}>Discount</strong><br /> {po.discount}</div>
				</div>
				<div className="row">
					

					<div className="col-md-12 pt-2 ">
						<div className="row">
							<div className="col-md-12 p-0">
								<h4 style={{ textAlign: "left", color: '#007bff' }}>Line Items</h4>
							</div>
						</div>
						<div className="d-none d-md-block">
							<div className="row tableHeader ">
								<div className="col-md-3 ">
									<div className="row">
										<div className="col-md-2 p-0">S. No.</div>
										<div className="col-md-6 pl-0">Title</div>
										<div className="col-md-3 pl-0">Status</div>
									</div>
								</div>
								<div className="col-md-3 ">Description</div>
								<div className="col-md-1 ">Quanitity</div>
								<div className="col-md-1 ">Rate</div>
								<div className="col-md-1 ">Sub Total</div>
								<div className="col-md-1 ">Remarks</div>
								<div className="col-md-2 ">Actions</div>
							</div>
						</div>
						
						{po.poLineItems && po.poLineItems.length > 0 ? po.poLineItems.map((x,ind) => <div className="row p-1 tablebox">
							<div className="col-md-3">
								<div className="row">
									<div className="col-md-2 p-0">
										<strong className="d-inline d-md-none">S.No.: </strong>
										{ind + 1}</div>
									<div className="col-md-6 pl-0">
										<strong className="d-inline d-md-none">Title: </strong>
										{x.title}</div>
									<div className="col-md-3 pl-0">
										<strong className="d-inline d-md-none">Status: </strong>
										<span class="badge text-light" style={x.lineItemStatus === "Completed" ? { backgroundColor: "#28A745" } :
											x.lineItemStatus === "Waiting" ? { backgroundColor: "#F15A29" } : { backgroundColor: "#6c757d" }}>{x.lineItemStatus}</span>
										
									</div>
								</div>
							</div>
							<div className="col-md-3">
								<strong className="d-inline d-md-none">Description: </strong>
								{x.description}<br/>
								<span style={{ fontSize: "70%" }}>Due Date: {new Date(x.itemCompletionDate).toLocaleString('en-US')}</span>
							</div>
							<div className="col-md-1">
								<strong className="d-inline d-md-none">Quanitity: </strong>
								{x.quantity}</div>
							<div className="col-md-1">
								<strong className="d-inline d-md-none">Rate: </strong>
								{x.rate.toLocaleString("en-IN")}</div>
							<div className="col-md-1">
								<strong className="d-inline d-md-none">Sub Total: </strong>
								{(x.quantity * x.rate).toLocaleString("en-IN")}</div>
							<div className="col-md-1">
								<strong className="d-inline d-md-none">Remarks: </strong>
								{x.remarks && x.remarks.length > 0 ?
								<img src={"/comment2.png"} alt="Comment" className="commentIcon" width={20} height={20}
									onClick={(e) => {
										e.preventDefault();
										setRemarkList(x.remarks);
									}}
									/> : <span style={{ fontSize: "70%" }}>No remarks</span>}
								<br />
								<strong className="d-inline d-md-none">Attachments: </strong>
								{x.itemAttachments && x.itemAttachments.length > 0 ? <ul style={{ listStyle: "none", padding: 0 }}>
									{x.itemAttachments.map((f, i) => <li>
										<a href={f.link} target={"new"}> Att-{i + 1}</a>
									</li>)}</ul> : <span style={{ fontSize: "70%" }}>No Attachments</span>}
							</div>
							<div className="col-md-2">
								
								<span>
									{po.status === "Active" && x.lineItemStatus !== "Completed" ? <div style={{ display: "inline-block" }}><FormButton name="Remarks" onClick={(e) => {
									e.preventDefault();
									setOpenRemark(x.lineItemId);
									setRemarkType("I");
									
										}} /></div> : <></>}

										{x.lineItemStatus === "Active" && UserProfile.getUserId().toString() === po.sellerId.toString() ?
											<div style={{ display: "inline-block" }}><FormButton name="Claim" onClick={(e) => {
										e.preventDefault();
										setOpenRemark(x.lineItemId);
										setRemarkType("I");
											setRemarkAction("Claim Delivery");
										
									}} /> </div>: <></>}
								{x.lineItemStatus === "Waiting" && UserProfile.getUserId().toString() === po.buyerId.toString() ?
										<div style={{ display: "inline-block" }}><FormButton name="Complete" onClick={(e) => {
										e.preventDefault();
										setOpenRemark(x.lineItemId);
										setRemarkType("I");
											setRemarkAction("Item Completed");
										
									}} /></div> : <></>}
								{x.lineItemStatus === "Waiting" && UserProfile.getUserId().toString() === po.buyerId.toString() ?
										<div style={{ display: "inline-block" }}><FormButton name="Not Completed" onClick={(e) => {
										e.preventDefault();
										setOpenRemark(x.lineItemId);
										setRemarkType("I");
										setRemarkAction("Item Not Completed");
										
										}} /></div>: <></>}
								</span>
							</div>
						</div>) : <div className="row"> No Items in Purchase Agreement</div>}
					</div>
					<div className="col-md-12 pt-2 ">
						<div className="row">
							<div className="col-md-12 p-0">
								<h4 style={{ textAlign: "left", color: '#007bff' }}>Taxes</h4>
							</div>
						</div>
						<div className="d-none d-md-block">
							<div className="row tableHeader">
								<div className="col-md-2 ">S. No.</div>
								<div className="col-md-5 ">Tax Title</div>
								<div className="col-md-5 ">Tax Percent</div>
							</div>
						</div>
						{po.poTaxes && po.poTaxes.length > 0 ? po.poTaxes.map((x, ind) => <div className="row p-1 tablebox">
							<div className="col-md-2 ">
								<strong className="d-inline d-md-none">S.No.: </strong>
								{ind + 1}</div>
							<div className="col-md-5">
								<strong className="d-inline d-md-none">Tax Title: </strong>
								{x.name} </div>
							<div className="col-md-5">
								<strong className="d-inline d-md-none">Tax Percent: </strong>
								{x.percent}</div>
						</div>) : <div className="row"> No Items in Purchase Agreement</div>}
					</div>
					<div className="col-md-12 pt-2 ">
						<div className="row">
							<div className="col-md-12 p-0">
								<h4 style={{ textAlign: "left", color: '#007bff' }}>Terms And Conditions</h4>
							</div>
						</div>
						<div className="row">
							<div className="col-md-1 tableHeader">S. No.</div>
							<div className="col-md-11 tableHeader">Terms And Conditions</div>
						</div>
						{po.poTermsAndConditions && po.poTermsAndConditions.length > 0 ? po.poTermsAndConditions.map((x,ind) => <div className="row p-1 tablebox">
							<div className="col-md-1">
								<strong className="d-inline d-md-none">S.No.: </strong>
								{ind + 1} </div>
							<div className="col-md-11">
								<strong className="d-inline d-md-none">Terms And Conditions: </strong>
								{x.description}</div>
						</div>) : <div className="row"> No Items in Purchase Agreement</div>}
					</div>

					<div className="col-md-12 pt-2 ">
						<div className="row">
							<div className="col-md-12 p-0">
								<h4 style={{ textAlign: "left", color: '#007bff' }}>Payments</h4>
							</div>
						</div>
						<div className="d-none d-md-block">
						<div className="row tableHeader">

							<div className="col-md-2 ">
								<div className="row" style={{ textAlign: "left" }}>
									<div className="col-md-3 p-0"> S. No.</div>
									<div className="col-md-9 p-0">Amount</div>
							</div> </div>
							<div className="col-md-1 ">Status </div>
							<div className="col-md-3 ">Note</div>
							<div className="col-md-2 ">Related Line Items</div>
							<div className="col-md-1 ">Remarks</div>
							<div className="col-md-3 ">Action</div>

							</div>
						</div>
						{po.poPayments && po.poPayments.length > 0 ? po.poPayments.map((x, ind) => <div className="row p-1 tablebox">

							<div className="col-md-2">
								<div className="row">
									<div className="col-md-3 p-0">
										<strong className="d-inline d-md-none">S.No.: </strong>
										{ind+1}
									</div>
									<div className="col-md-9 p-0">
										<strong className="d-inline d-md-none">Amount: </strong>
										{x.paymentAmount.toLocaleString("en-IN")}
									</div>
								</div>
							</div>
							<div className="col-md-1">
								<strong className="d-inline d-md-none">Status: </strong>
								<span class="badge text-light" style={x.paymentStatus === "Completed" ? { backgroundColor: "#28A745" } :
									x.paymentStatus === "Waiting" ? { backgroundColor: "#F15A29" } : { backgroundColor: "#6c757d" }}>{x.paymentStatus} </span>
							</div>
							<div className="col-md-3">
								<strong className="d-inline d-md-none">Note: </strong>
								{x.paymentNotes}
								<br />
								<span style={{ fontSize: "70%" }}>Due Date: {new Date(x.dueDate).toLocaleString()}</span>
							</div>
							<div className="col-md-2">
								<strong className="d-inline d-md-none">Related Line Items: </strong>
								{x.lineItemsRelation.length > 0 ? x.lineItemsRelation.map(ri => <span>{ri}</span>) : <>Not related with Item</>}</div>
							<div className="col-md-1">
								<strong className="d-inline d-md-none">Remarks: </strong>
								{x.remarks && x.remarks.length > 0 ?
									<img src={"/comment2.png"} alt="Comment" className="commentIcon" width={20} height={20}
										onClick={(e) => {
											e.preventDefault();
											setRemarkList(x.remarks);
										}}
									/> : <span style={{ fontSize:"70%" }}>No remarks</span>}
							</div>
							<div className="col-md-3">
								
								{po.status === "Active" && x.paymentStatus !== "Completed" ? <><div style={{ display: "inline-block" }}> <FormButton name="Remarks" onClick={(e) => {
									e.preventDefault();
									setOpenRemark(x.paymentId);
									setRemarkType("P");
									setRemarkAction("Submit Remark");
									
								}} /> </div></> : <></>}
								{po.status === "Active" && x.paymentStatus !== "Completed" && x.paymentStatus!=="Claimed"
									&& po.buyerId.toString() === UserProfile.getUserId().toString() ? <div style={{ display: "inline-block" }}>
									<FormButton name="Claim" onClick={(e) => {
									e.preventDefault();
									setOpenRemark(x.paymentId);
									setRemarkType("P");
									setRemarkAction("Claim Payment");
									
								}} /></div>:<></>}
								{po.status === "Active"
									&& x.paymentStatus === "Active"
									&& UserProfile.getUserId().toString() === po.sellerId.toString()
									? <div style={{ display: "inline-block" }}><FormButton name="Request" onClick={(e) => {
										e.preventDefault();
										setOpenRemark(x.paymentId);
										setRemarkType("P");
										setRemarkAction("Request Payment");
										
									}} /> </div>: <></>}
								{po.status === "Active"
									&& x.paymentStatus === "Waiting"
									&& UserProfile.getUserId().toString() === po.buyerId.toString()
									? <div style={{ display: "inline-block" }}><FormButton name="Decline" onClick={(e) => {
										e.preventDefault();
										setOpenRemark(x.paymentId);
										setRemarkType("P");
										setRemarkAction("Decline Payment");
										
									}} /></div> : <></>}
								{po.status === "Active"
									&& x.paymentStatus === "Claimed"
									&& UserProfile.getUserId().toString() === po.sellerId.toString()
									? <div style={{ display: "inline-block" }}><FormButton name="Received" onClick={(e) => {
										e.preventDefault();
										setOpenRemark(x.paymentId);
										setRemarkType("P");
										setRemarkAction("Payment Received");
										
									}} /></div> : <></>}
								{po.status === "Active"
									&& x.paymentStatus === "Claimed"
									&& UserProfile.getUserId().toString() === po.sellerId.toString()
									? <div style={{ display: "inline-block" }}><FormButton name="Not Received" onClick={(e) => {
										e.preventDefault();
										setOpenRemark(x.paymentId);
										setRemarkType("P");
										setRemarkAction("Payment Not Received");
										
									}} /> </div>: <></>}
							</div>
						</div>) : <div className="row"> No Payments in Purchase Agreement</div>}
					</div>
					<div className="col-md-12 pt-2 ">
						<div className="row">
							<div className="col-md-6 p-0">
								<h4 style={{ textAlign: "left", color: '#007bff' }}>Agreement Remarks</h4>
							</div>
							<div className="col-md-6" style={{ textAlign: "right" }}>
								<FormButton name="Additional Remarks" onClick={(e) => {
									e.preventDefault();
									setOpenRemark(poId);
									setRemarkType("O");
									setRemarkAction("Submit Remark");
									
								}} />
							</div>
						</div>
						<div className="d-none d-md-block">
						<div className="row tableHeader">
							<div className="col-md-1">S. No.</div>
							<div className="col-md-2 ">Remark By</div>
							<div className="col-md-5 ">Remark</div>
							<div className="col-md-2 ">Attachments</div>
							<div className="col-md-2 ">Remark on</div>
							</div>
						</div>
						{po.poRemarks && po.poRemarks.length > 0 ? po.poRemarks.map((x,ind) => <div className="row p-1 tablebox">
							<div className="col-md-1">
								<strong className="d-inline d-md-none">S. No.: </strong>
								{ind + 1}</div>
							<div className="col-md-2">
								<strong className="d-inline d-md-none">Remark By: </strong>
								{x.createdBy} </div>
							<div className="col-md-5">
								<strong className="d-inline d-md-none">Remark: </strong>
								{x.description} </div>
							<div className="col-md-2">
								<strong className="d-inline d-md-none">Attachments: </strong>
								{x.attachments && x.attachments.length > 0 ?
								x.attachments.map(a => <div><a href={a.link} target={"new"}>Attachment{a.id}</a></div>) : <>No Attachments</>}</div>
							<div className="col-md-2">
								<strong className="d-inline d-md-none">Remark on: </strong>
								{x.remarkDate} </div>
						</div>) : <div className="row"> No remarks in Purchase Agreement</div>}
					</div>
				</div>
			</div> : <div> Not able to display order details</div>}
		</div>
			
			
		</>
	);
};
export default DetailPO;
