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

const DetailPO = ({ setUserName }) => {
	const [remarkList, setRemarkList] = useState();
	const [poId, setPoId] = useState();
	const [remarkAction, setRemarkAction] = useState();
	const [po, setPo] = useState();
	const [openRemark, setOpenRemark] = useState();
	const [remarkType, setRemarkType] = useState();
	const navigate = useNavigate();
	useEffect(() => {
		setOpenRemark(0);
		setUserName(UserProfile.getName());
		setRemarkAction("Submit Remark");
		if (PurchaseOrder.getPoId() && PurchaseOrder.getPoId() > 0) {
			getRequest('api/POManagement/GetPurchaseOrderDetails?poId=' + PurchaseOrder.getPoId(), UserProfile.getToken())
				.then(r => r.json()).then(res => {
					if (res.data) {
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
				<RemarkListDisplay remarkLst={remarkList} setRemarkLst={setRemarkList }/>
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
						<br /> {po.poAmount} INR</div>
				</div>
				<div className="row">
					<div className="col-md-3"><strong style={{ color: "#007bff" }}>Description</strong>
						<br /> {po.description} </div>
					<div className="col-md-3"><strong style={{ color: "#007bff" }}>Status Notification Duration</strong>
						<br /> {po.notificationPeriodInDays} days</div>
					<div className="col-md-3">
						{po.status === 'Active' || po.status === 'Complete' ? <strong style={{ color: "#007bff" }}>Completion Date</strong>
							: <strong style={{ color: "#007bff" }}>Expected Completion </strong>}
						
						<br /> {po.expectedCompletionDate}</div>
					<div className="col-md-3"><strong style={{ color: "#007bff" }}>Discount</strong><br /> {po.discount}</div>
				</div>
				<div className="row">
					

					<div className="col-md-12 pt-2 ">
						<div className="row">
							<div className="col-md-12 p-0">
								<h4 style={{ textAlign: "left", color: '#007bff' }}>Line Items</h4>
							</div>
						</div>
						<div className="row tableHeader">
							<div className="col-md-3 ">
								<div className="row">
								<div className="col-md-2 p-0">S. No.</div>
									<div className="col-md-7">Title</div>
									<div className="col-md-2 ">Status</div>
								</div>
							</div>
							<div className="col-md-2 ">Description</div>
							<div className="col-md-1 ">Attachments</div>
							<div className="col-md-1 ">Quanitity</div>
							<div className="col-md-1 ">Rate</div>
							<div className="col-md-1 ">Sub Total</div>
							<div className="col-md-1 ">Remarks</div>
							<div className="col-md-2 ">Actions</div>
						</div>
						{po.poLineItems && po.poLineItems.length > 0 ? po.poLineItems.map((x,ind) => <div className="row p-1 tablebox">
							<div className="col-md-3">
								<div className="row">
									<div className="col-md-2 p-0">{ind+1}</div>
									<div className="col-md-7 ">{x.title}</div>
									<div className="col-md-2">
										<span class="badge bg-secondary text-light">{x.lineItemStatus}</span>
									</div>
								</div>
							</div>
							<div className="col-md-2"> {x.description}</div>
							<div className="col-md-1 ">{x.itemAttachments && x.itemAttachments.length > 0 ? <ul style={{ listStyle: "none", padding: 0 }}>
								{x.itemAttachments.map((f, i) => <li>
									<a href={f.link} target={"new"}> Att-{i + 1}</a>
								</li>)}</ul> : <span style={{ fontSize:"70%" }}>No Attachments</span>}</div>
							<div className="col-md-1"> {x.quantity}</div>
							<div className="col-md-1"> {x.rate}</div>
							<div className="col-md-1"> {x.quantity * x.rate}</div>
							<div className="col-md-1"> {x.remarks && x.remarks.length > 0 ?
								<img src={"/comment2.png"} alt="Comment" className="commentIcon" width={20} height={20}
									onClick={(e) => {
										e.preventDefault();
										setRemarkList(x.remarks);
									}}
								/> : <span style={{ fontSize: "70%" }}>No remarks</span>}</div>
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
										setRemarkAction("Accept Delivery");
										
									}} /></div> : <></>}
								{x.lineItemStatus === "Waiting" && UserProfile.getUserId().toString() === po.buyerId.toString() ?
										<div style={{ display: "inline-block" }}><FormButton name="Not Completed" onClick={(e) => {
										e.preventDefault();
										setOpenRemark(x.lineItemId);
										setRemarkType("I");
										setRemarkAction("Unclaim Delivery");
										
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
						<div className="row tableHeader">
							<div className="col-md-2 ">S. No.</div>
							<div className="col-md-5 ">Tax Title</div>
							<div className="col-md-5 ">Tax Percent</div>
						</div>
						{po.poTaxes && po.poTaxes.length > 0 ? po.poTaxes.map((x, ind) => <div className="row p-1 tablebox">
							<div className="col-md-2 ">{ind+1}</div>
							<div className="col-md-5">{x.name} </div>
							<div className="col-md-5"> {x.percent}</div>
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
							<div className="col-md-1">{ind+1} </div>
							<div className="col-md-11"> {x.description}</div>
						</div>) : <div className="row"> No Items in Purchase Agreement</div>}
					</div>

					<div className="col-md-12 pt-2 ">
						<div className="row">
							<div className="col-md-12 p-0">
								<h4 style={{ textAlign: "left", color: '#007bff' }}>Payments</h4>
							</div>
						</div>
						<div className="row tableHeader">

							<div className="col-md-2 ">
								<div className="row" style={{ textAlign: "left" }}>
									<div className="col-md-3 p-0">S. No.</div>
									<div className="col-md-9 p-0">Amount</div>
							</div> </div>
							<div className="col-md-1 ">Status </div>
							<div className="col-md-2 ">Note</div>
							<div className="col-md-2 ">Due Date</div>
							<div className="col-md-2 ">Related Line Items</div>
							<div className="col-md-1 ">Remarks</div>
							<div className="col-md-2 ">Action</div>

						</div>
						{po.poPayments && po.poPayments.length > 0 ? po.poPayments.map((x, ind) => <div className="row p-1 tablebox">

							<div className="col-md-2">
								<div className="row">
									<div className="col-md-3 p-0">
										{ind+1}
									</div>
									<div className="col-md-9 p-0">
										{x.paymentAmount}
									</div>
								</div>
							</div>
							<div className="col-md-1">
								<span class="badge bg-secondary text-light">{x.paymentStatus} </span>
							</div>
							<div className="col-md-2">{x.paymentNotes} </div>
							<div className="col-md-2"> {x.dueDate}</div>
							<div className="col-md-2"> {x.lineItemsRelation.length > 0 ? x.lineItemsRelation.map(ri => <span>{ri}</span>) : <>Not related with Item</>}</div>
							<div className="col-md-1">
								{x.remarks && x.remarks.length > 0 ?
									<img src={"/comment2.png"} alt="Comment" className="commentIcon" width={20} height={20}
										onClick={(e) => {
											e.preventDefault();
											setRemarkList(x.remarks);
										}}
									/> : <span style={{ fontSize:"70%" }}>No remarks</span>}
							</div>
							<div className="col-md-2">
								
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
						<div className="row tableHeader">
							<div className="col-md-1">S. No.</div>
							<div className="col-md-2 ">Remark By</div>
							<div className="col-md-5 ">Remark</div>
							<div className="col-md-2 ">Attachments</div>
							<div className="col-md-2 ">Remark on</div>
						</div>
						{po.poRemarks && po.poRemarks.length > 0 ? po.poRemarks.map((x,ind) => <div className="row p-1 tablebox">
							<div className="col-md-1">{ind+1}</div>
							<div className="col-md-2">{x.createdBy} </div>
							<div className="col-md-5">{x.description} </div>
							<div className="col-md-2"> {x.attachments && x.attachments.length > 0 ?
								x.attachments.map(a => <div><a href={a.link} target={"new"}>Attachment{a.id}</a></div>) : <>No Attachments</>}</div>
							<div className="col-md-2">{x.remarkDate} </div>
						</div>) : <div className="row"> No remarks in Purchase Agreement</div>}
					</div>
				</div>
			</div> : <div> Not able to display order details</div>}
		</div>
			
			
		</>
	);
};
export default DetailPO;
