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
					console.log(res.data);
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
	const downloadClicked = () => {
		if (PurchaseOrder.getPoId() && PurchaseOrder.getPoId() > 0) {
			getRequest('api/POManagement/GetPurchaseOrderRportPDF?poId=' + PurchaseOrder.getPoId(), UserProfile.getToken())
				.then(r => r.json()).then(res => {
					console.log(res.data);
					if (res.data !== "") {
						console.log("We got it....");
						console.log(res.data);
					}
				}).catch(err => {
					console.log(err);
				});

		} else {
			console.log("Navigating to Home");
			console.log(PurchaseOrder.getPoId());
			navigate("/Home");
		}
	}

	return (
		<><div className="d-flex h-100" style={{ overflowY: 'scroll' }}>
			{po && po.poId > 0 ? <div className="table" style={{ textAlign: "center" }}>
				<AddRemark id={openRemark} setId={setOpenRemark} type={remarkType} actionText={remarkAction} />
				<RemarkListDisplay remarkLst={remarkList} setRemarkLst={setRemarkList }/>
				<div className="row">
					<div className="col-md-12">
						Agreement Details <br />
						{po.status === "Raised" ? <div className="row p-1">
							<div className="col-md-3">
								<FormButton name="Accept" onClick={(e) => {
									e.preventDefault();
									setOpenRemark(poId);
									setRemarkType("O");
									setRemarkAction("Accept Agreement");
									console.log("Add remark clicked");
								}} />
							</div>
							<div className="col-md-3">
								<FormButton name="Reconsider" onClick={(e) => {
									e.preventDefault();
									setOpenRemark(poId);
									setRemarkType("O");
									setRemarkAction("Reconsider Agreement");
									console.log("Add remark clicked");
								}} />
							</div>

							<div className="col-md-3">
								<FormButton name="Remark" onClick={(e) => {
									e.preventDefault();
									setOpenRemark(poId);
									setRemarkType("O");
									setRemarkAction("Submit Remark");
									console.log("Add remark clicked");
								}} />
							</div>
						</div> : <></>}
						{po.status === "Active" && po.raisedById !== PurchaseOrder.getRaisedBy() ? <div className="row p-1">
							<div className="col-md-3">
								<FormButton name="Remark" onClick={(e) => {
									e.preventDefault();
									setOpenRemark(poId);
									setRemarkType("O");
									setRemarkAction("Submit Remark");
									console.log("Add remark clicked");
								}} />
							</div>
						</div> : <></>}
						{po.status !== "Raised" && po.status !== "Draft" ? <div className="col-md-3">
							<FormButton name="Download" onClick={(e) => {
								e.preventDefault();
								downloadClicked();
							}} />
						</div>:<></>}
					</div>
				</div>
				<div className="row">
					<div className="col-md-3"><strong>Seller:</strong>
						<br /> Name:{po.sellerName}
						<br />Phone Number:{po.sellerPhoneNo}
						<br />Company:{po.sellerCompany}
						<br />Address:{po.sellerAddress}
						<br />GSTIN:{po.sellerGSTIN}
					</div>
					<div className="col-md-3"><strong>Buyer:</strong>
						<br /> Name: {po.buyerName}
						<br />Phone Number:{po.buyerPhoneNo}
						<br />Company:{po.buyerCompany}
						<br />Address:{po.buyerAddress}
						<br />GSTIN:{po.buyerGSTIN}
					</div>
					<div className="col-md-3"><strong>Title:</strong><br />{po.title}</div>
					<div className="col-md-3"><strong>Amount:</strong><br /> {po.poAmount} INR</div>
				</div>
				<div className="row">
					<div className="col-md-3"><strong>Description:</strong><br /> {po.description} </div>
					<div className="col-md-3"><strong>Status Notification Duration:</strong><br /> {po.notificationPeriodInDays} days</div>
					<div className="col-md-3">
						{po.status === 'Active' || po.status === 'Complete' ? <strong>Completion Date:</strong>
						: <strong>If PO is accepted today. It is expected to be completed by:</strong>}
						
						<br /> {po.expectedCompletionDate}</div>
					<div className="col-md-3"><strong>Discount:</strong><br /> {po.discount}</div>
				</div>
				<div className="row">
					<div className="col-md-12">
						<div className="row"><div className="col-md-12">Agreement Remarks</div></div>
						<div className="row tableHeader">
							<div className="col-md-2 ">Remark By</div>
							<div className="col-md-6 ">Remark</div>
							<div className="col-md-2 ">Attachments</div>
							<div className="col-md-2 ">Remark on</div>
						</div>
						{po.poRemarks && po.poRemarks.length > 0 ? po.poRemarks.map(x => <div className="row p-1 tablebox">
							<div className="col-md-2">{x.createdBy} </div>
							<div className="col-md-6">{x.description} </div>
							<div className="col-md-2"> {x.attachments && x.attachments.length > 0 ?
								x.attachments.map(a => <div><a href={a.link} target={"new"}>Attachment{a.id}</a></div>) : <>No Attachments</>}</div>
							<div className="col-md-2">{x.remarkDate} </div>
						</div>) : <div className="row"> No remarks in Purchase Agreement</div>}
					</div>

					<div className="col-md-12">
						<div className="row"><div className="col-md-12">Line Items</div></div>
						<div className="row tableHeader">
							<div className="col-md-3 ">Item Title</div>
							<div className="col-md-1 ">Status</div>
							<div className="col-md-3 ">Item Description</div>
							<div className="col-md-1 ">Item Quanitity</div>
							<div className="col-md-1 ">Item Rate</div>
							<div className="col-md-1 ">Sub Total</div>
							<div className="col-md-2 ">Actions</div>
						</div>
						{po.poLineItems && po.poLineItems.length > 0 ? po.poLineItems.map(x => <div className="row p-1 tablebox">
							<div className="col-md-3">{x.remarks && x.remarks.length > 0 ?
								<img src={"/comment2.png"} alt="Comment" className="commentIcon" width={20} height={20}
									onClick={(e) => {
										e.preventDefault();
										setRemarkList(x.remarks);
									}}
								/> : <></>}{x.title}</div>
							<div className="col-md-1"> {x.lineItemStatus}</div>
							<div className="col-md-3"> {x.description}</div>
							<div className="col-md-1"> {x.quantity}</div>
							<div className="col-md-1"> {x.rate}</div>
							<div className="col-md-1"> {x.quantity * x.rate}</div>
							<div className="col-md-2">
								{po.status === "Active" && x.lineItemStatus !== "Completed" ? <FormSubmitButton name="Add Remark" onClick={(e) => {
									e.preventDefault();
									setOpenRemark(x.lineItemId);
									setRemarkType("I");
									console.log("Add remark clicked");
								}} /> : <></>}
								{x.lineItemStatus === "Active" && UserProfile.getUserId().toString() === po.sellerId.toString() ?
									<FormButton name="Claim" onClick={(e) => {
										e.preventDefault();
										setOpenRemark(x.lineItemId);
										setRemarkType("I");
										setRemarkAction("Claim Item Delivery");
										console.log("Add remark clicked");
									}} /> : <></>}
								{x.lineItemStatus === "Waiting" && UserProfile.getUserId().toString() === po.buyerId.toString() ?
									<FormButton name="Complete" onClick={(e) => {
										e.preventDefault();
										setOpenRemark(x.lineItemId);
										setRemarkType("I");
										setRemarkAction("Accept Item Delivery");
										console.log("Add remark clicked");
									}} /> : <></>}
								{x.lineItemStatus === "Waiting" && UserProfile.getUserId().toString() === po.buyerId.toString() ?
									<FormButton name="Not Completed" onClick={(e) => {
										e.preventDefault();
										setOpenRemark(x.lineItemId);
										setRemarkType("I");
										setRemarkAction("Unclaim Item Delivery");
										console.log("Add remark clicked");
									}} /> : <></>}
							</div>
						</div>) : <div className="row"> No Items in Purchase Agreement</div>}
					</div>

					<div className="col-md-12">
						<div className="row"><div className="col-md-12">Terms And Conditions</div></div>
						<div className="row">
							<div className="col-md-1 tableHeader">Sequence</div>
							<div className="col-md-8 tableHeader">Terms And Conditions</div>
							<div className="col-md-3 tableHeader">Remark</div>
						</div>
						{po.poTermsAndConditions && po.poTermsAndConditions.length > 0 ? po.poTermsAndConditions.map(x => <div className="row p-1 tablebox">
							<div className="col-md-1">{x.sequence} </div>
							<div className="col-md-8"> {x.description}</div>
							<div className="col-md-3"> No Action </div>
						</div>) : <div className="row"> No Items in Purchase Agreement</div>}
					</div>
					<div className="col-md-12">
						<div className="row"><div className="col-md-12">Taxes</div></div>
						<div className="row tableHeader">
							<div className="col-md-5 ">Tax Title</div>
							<div className="col-md-5 ">Tax Percent</div>
							<div className="col-md-2">Action</div>
						</div>
						{po.poTaxes && po.poTaxes.length > 0 ? po.poTaxes.map(x => <div className="row p-1 tablebox">
							<div className="col-md-5">{x.name} </div>
							<div className="col-md-5"> {x.percent}</div>
							<div className="col-md-2">No Actions </div>
						</div>) : <div className="row"> No Items in Purchase Agreement</div>}
					</div>
					<div className="col-md-12">
						<div className="row"><div className="col-md-12">Payments</div></div>
						<div className="row tableHeader">

							<div className="col-md-2 ">Amount</div>
							<div className="col-md-1 ">Status </div>
							<div className="col-md-3 ">Note</div>
							<div className="col-md-2 ">Due Date</div>
							<div className="col-md-2 ">Related Line Items</div>
							<div className="col-md-2 ">Action</div>

						</div>
						{po.poPayments && po.poPayments.length > 0 ? po.poPayments.map(x => <div className="row p-1 tablebox">

							<div className="col-md-2">{x.remarks && x.remarks.length > 0 ?
								<img src={"/comment2.png"} alt="Comment" className="commentIcon" width={20} height={20}
									onClick={(e) => {
										e.preventDefault();
										setRemarkList(x.remarks);
									}}
								/> : <></>}{x.paymentAmount}</div>
							<div className="col-md-1">{x.paymentStatus} </div>
							<div className="col-md-3">{x.paymentNotes} </div>
							<div className="col-md-2"> {x.dueDate}</div>
							<div className="col-md-2"> {x.lineItemsRelation.length > 0 ? x.lineItemsRelation.map(ri => <span>{ri}</span>) : <>Not related with Item</>}</div>
							<div className="col-md-2">
								{po.status === "Active" && x.paymentStatus !== "Completed" ? <> <FormButton name="Add Remark" onClick={(e) => {
									e.preventDefault();
									setOpenRemark(x.paymentId);
									setRemarkType("P");
									setRemarkAction("Submit Remark");
									console.log("Add remark clicked");
								}} /> </> : <></>}
								{po.status === "Active" && x.paymentStatus !== "Completed" && x.paymentStatus!=="Claimed"
									&& po.buyerId.toString() === UserProfile.getUserId().toString() ? <FormButton name="Pay" onClick={(e) => {
									e.preventDefault();
									setOpenRemark(x.paymentId);
									setRemarkType("P");
									setRemarkAction("Accept Payment Sent");
									console.log("Add remark clicked");
								}} />:<></>}
								{po.status === "Active"
									&& x.paymentStatus === "Active"
									&& UserProfile.getUserId().toString() === po.sellerId.toString()
									? <FormButton name="Ask For" onClick={(e) => {
										e.preventDefault();
										setOpenRemark(x.paymentId);
										setRemarkType("P");
										setRemarkAction("Ask For Payment");
										console.log("Add remark clicked");
									}} /> : <></>}
								{po.status === "Active"
									&& x.paymentStatus === "Waiting"
									&& UserProfile.getUserId().toString() === po.buyerId.toString()
									? <FormButton name="Decline" onClick={(e) => {
										e.preventDefault();
										setOpenRemark(x.paymentId);
										setRemarkType("P");
										setRemarkAction("Invalid Payment Ask");
										console.log("Add remark clicked");
									}} /> : <></>}
								{po.status === "Active"
									&& x.paymentStatus === "Claimed"
									&& UserProfile.getUserId().toString() === po.sellerId.toString()
									? <FormButton name="Received" onClick={(e) => {
										e.preventDefault();
										setOpenRemark(x.paymentId);
										setRemarkType("P");
										setRemarkAction("Accept Payment Received");
										console.log("Add remark clicked");
									}} /> : <></>}
								{po.status === "Active"
									&& x.paymentStatus === "Claimed"
									&& UserProfile.getUserId().toString() === po.sellerId.toString()
									? <FormButton name="Not Received" onClick={(e) => {
										e.preventDefault();
										setOpenRemark(x.paymentId);
										setRemarkType("P");
										setRemarkAction("Payment Not Received");
										console.log("Add remark clicked");
									}} /> : <></>}
							</div>
						</div>) : <div className="row"> No Payments in Purchase Agreement</div>}
					</div>
				</div>
			</div> : <div> Not able to display order details</div>}
		</div>
			
			
		</>
	);
};
export default DetailPO;
