import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormButton from "../FormParts/FormButton";
//import { getRequest } from "../Services/POContractBackendAPI";
import UserProfile from "../Context/UserProfile";
import OtherData from "../Context/OtherData";
import "./DetailProposal.css";
import { getRequest, sendPostRequest } from "../Services/ContrectBackendAPI";
import InputField from "../FormParts/InputField";
import UploadSingleFile from "../CommonPages/UploadSingleFile";
import DisappearingMessage from "../CommonPages/DisappearingMessage";

const DetailProposal = ({ setUserName, setUserType }) => {
	const [rfq, setRfq] = useState();
	const [msgDis, setMsgDis] = useState();
	const [itemList, setItemList] = useState([]);
	const [termList, setTermList] = useState([]);
	const [inviteList, setInviteList] = useState([]);
	const [phoneNumber, setPhoneNumber] = useState();
	const [bulkUploadFile, setBulkUploadFile] = useState();
	const [responseLst, setResponseLst] = useState([]);

	const navigate = useNavigate();
	useEffect(() => {

		setUserName(UserProfile.getName());
		setUserType(UserProfile.getUserType());
		var data = OtherData.getData();
		if (data.length > 0) {
			setRfq(JSON.parse(data));
			loadItemList(JSON.parse(data).id);
			loadTermList(JSON.parse(data).id);
			loadInviteList(JSON.parse(data).id);
			loadResponseList(JSON.parse(data).id);
			console.log(JSON.parse(data));
		} else {
			navigate("/home")
		}
	}, []);
	const loadItemList = (pid) => {
		getRequest("api/Business/RFQItemListForBuyer?proposalId=" + pid, UserProfile.getToken()).then(x => x.json()).then(res => {
			console.log(res);
			setItemList(res.data);
		}).catch(err => console.log(err));
	}
	const loadTermList = (pid) => {
		getRequest("api/Business/RFQTermList?proposalId=" + pid + "&termType=Buyer", UserProfile.getToken()).then(x => x.json()).then(res => {
			console.log(res);
			setTermList(res.data);
		}).catch(err => console.log(err));
	}
	const loadInviteList = (pid) => {
		getRequest("api/Business/GetAllInvitesOfProposal?proposalId=" + pid + "&termType=Buyer", UserProfile.getToken()).then(x => x.json()).then(res => {
			console.log(res);
			setInviteList(res.data);
		}).catch(err => console.log(err));
	}
	const loadResponseList = (pid) => {
		
		getRequest("api/Business/GetAllResponseOfProposal?proposalId=" + pid, UserProfile.getToken()).then(x => x.json()).then(res => {
			console.log(res);
			setResponseLst(res.data);
		}).catch(err => console.log(err));
	}
	const sendInviteReq = (e) => {
		e.preventDefault();
		var postBody = {
			PhoneNumber: phoneNumber,
			ProposalId: rfq.id
		};
		sendPostRequest("api/Business/SendInvite", UserProfile.getToken(), postBody).then(x => x.json())
			.then(res => {
				setMsgDis("Invites sent successfully");
				loadInviteList(rfq.id);
			}).catch(err => console.log(err));
	}
	const sendBulkInviteReq = (url) => {
		var postBody = {
			UploadedFileLink: url,
			ProposalId: rfq.id
		};
		sendPostRequest("api/Business/SendBulkInvite", UserProfile.getToken(), postBody).then(x => x.json())
			.then(res => {
				if (res.status === 1) {
					setBulkUploadFile("");
					setMsgDis("Invites sent successfully");
					loadInviteList(rfq.id);
					
				}
			}).catch(err => console.log(err));
	}
	const openTab = (e, id) => {
		e.preventDefault();
		var tabContent = document.getElementsByClassName("tab-content");
		for (var i = 0; i < tabContent.length; i++) {
			tabContent[i].style.display = "none";
			tabContent[i].classList.remove("active");
		}
		var tabButtons = document.getElementsByClassName("tab-button");
		for (var i = 0; i < tabButtons.length; i++) {
			tabButtons[i].classList.remove("active");
		}
		document.getElementById(id).style.display = "block";
		document.getElementById(id).classList.add("active");
		e.currentTarget.classList.add("active");
	}

	return (
		<><div className="main-content" >
			<DisappearingMessage msg={msgDis} setMsg={setMsgDis} />
			{rfq && rfq.id > 0 ? <div className="table" style={{ textAlign: "left" }}>
				<div className="row">
					<div className="col-md-12">
						<h4 className="headingStyle">Agreement Details </h4>
						{rfq.proposalStatus === "Active" ? <div className="row p-1" style={{ textAlign: "center" }}>
							<div className="col-md-1" style={{ textAlign: "left" }}>
								<FormButton name="Back" onClick={(e) => {
									e.preventDefault();
									OtherData.resetData();
									navigate("/Home");
								}} />
							</div>
							
							<div className={rfq.owner.usrId.toString() === UserProfile.getUserId().toString() ? "col-md-3" : " d-none"}>
								<FormButton name="Close Proposal" onClick={(e) => {
									e.preventDefault();

								}} />
							</div>
							<div className={rfq.owner.usrId.toString() === UserProfile.getUserId().toString() ? "col-md-3" : " d-none"}>
								<FormButton name="Search Vendor" onClick={(e) => {
									e.preventDefault();
									//setTreeDisplay(1);
								}} />
							</div>
							<div className={rfq.owner.usrId.toString() !== UserProfile.getUserId().toString() ? "col-md-3" : " d-none"}>
								<FormButton name="Apply" onClick={(e) => {
									e.preventDefault();

								}} />
							</div>
						</div> : <></>}
						{rfq.proposalStatus === "Closed"  ? <div className="row p-1" style={{ textAlign: "center" }}>
							<div className="col-md-1">
								<FormButton name="Back" onClick={(e) => {
									e.preventDefault();
									navigate("/Home");
								}} />
							</div>
							
							<div className={rfq.owner.usrId.toString() === UserProfile.getUserId().toString() ? "col-md-3" : " d-none"}>
								<FormButton name="Complete" onClick={(e) => {
									e.preventDefault();

								}} />
							</div>
						</div> : <></>}
						{rfq.proposalStatus === "Completed" ? <div className="row p-1">
							<div className="col-md-1">
								<FormButton name="< Back" onClick={(e) => {
									e.preventDefault();
									navigate("/Home");
								}} />
							</div>
						</div> : <></>}
						
					</div>
				</div>
				<div className="row" style={{ textAlign: "left", paddingBottom:'10px' }}>
					<div className="col-md-4"><strong style={{ color:"#007bff" }}>Owner</strong>
						<br /><strong>Name: </strong>{rfq.owner.usrName}
						<br /><strong>Phone Number: </strong>{rfq.owner.phoneNumber}
						<br /><strong>Is MSME?: </strong>{rfq.owner.usrIsMsme?"Yes":"No"}
					</div>
					<div className="col-md-4">
						<br /><strong>PAN: </strong>{rfq.owner.usrPan}
						<br /><strong>Address: </strong>{rfq.owner.usrAddress}
						<br /><strong>GSTIN: </strong>{rfq.owner.usrGstin}
					</div>
					<div className="col-md-4">
						<br /><strong>Address: </strong>{rfq.owner.usrAddress}
						<br /><strong>Email: </strong>{rfq.owner.email}
					</div>
				</div>
				<div className="row">
					<div className="col-md-4"><strong style={{ color: "#007bff" }}>Contract duration</strong>
						<br /> {rfq.proposalCompletionInDays} </div>
					<div className="col-md-4"><strong style={{ color: "#007bff" }}>LD applied after </strong>
						<br /> {rfq.proposalLdAppliedAfterDays} days</div>
					<div className="col-md-4"><strong style={{ color: "#007bff" }}>LD percent </strong>
						<br /> {rfq.proposalLdPercent} %</div>
				</div>
				<div className={rfq.owner.usrId.toString() === UserProfile.getUserId().toString() ? "row" : " d-none"}>
					<div className="col-md-12">
						<div className="tabs">
							<div className="tab-buttons">
								<button className="tab-button active" onClick={(e) => { openTab(e, "BulkUpload"); }}>Bulk Invites</button>
								<button id={"SingleTermBtn"} className="tab-button" onClick={(e) => { openTab(e, "SingleInivte"); }}>Single Invite</button>
							</div>
							<div id="BulkUpload" className="tab-content active">
								<div className="col-md-12">
									<h4 className="headingStyle">Bulk upload</h4>
									<UploadSingleFile fileLink={bulkUploadFile} setFileLink={setBulkUploadFile} methodToRun={sendBulkInviteReq} />
								</div>

							</div>

							<div id="SingleInivte" className="tab-content">
								<div className="col-md-12">
									<h4 className="headingStyle">Single invite</h4>
									<InputField name="PhoneNumber" label="Phone Number" onChange={(e) => {
										e.preventDefault();
										setPhoneNumber(e.target.value);
									}} />
									<FormButton name="Send Invite" onClick={(e) => sendInviteReq(e)} />
								</div>
							</div>

						</div>
					</div>

				</div>
				<div className="row">
					<div className="col-md-12 pt-2 ">
						<div className="row">
							<div className="col-md-12 p-0">
								<h4 style={{ textAlign: "left", color: '#007bff' }}>Invite List</h4>
							</div>
						</div>
						<div className="d-none d-md-block">
							<div className="row tableHeader ">
								<div className="col-md-1 ">
									S. No.
								</div>
								<div className="col-md-6 ">
									Raised For
								</div>

								<div className="col-md-2 ">Status</div>
								<div className="col-md-3 ">Action</div>
							</div>
						</div>

						{inviteList && inviteList.length > 0 ? inviteList.map((x, ind) => <div className="row p-1 tablebox">
							<div className="col-md-1">
								<strong className="d-inline d-md-none">S.No.: </strong>
								{ind + 1}

							</div>
							<div className="col-md-6">
								<strong className="d-inline d-md-none">Raised For: </strong>
								{x.raisedForUser.usrName}
								<br />
								{x.raisedForUser.email}
								<br/>
								({x.raisedForUser.phoneNumber})
							</div>
							<div className="col-md-2">
								<strong className="d-inline d-md-none">Status: </strong>
								{x.inviteStatusId}<br />
							</div>
							<div className="col-md-2">
								<FormButton name="Remove Invite" onClick={(e) => {
									e.preventDefault();
									alert("Delete invite is under construction");
								}} />
							</div>
						</div>) : <div className="row"> No Items in Proposal</div>}
					</div>
					<div className="col-md-12 pt-2 ">
						<div className="row">
							<div className="col-md-12 p-0">
								<h4 style={{ textAlign: "left", color: '#007bff' }}>Response Received</h4>
							</div>
						</div>
						<div className="d-none d-md-block">
							<div className="row tableHeader ">
								<div className="col-md-1 ">
									S. No.
								</div>
								<div className="col-md-6 ">
									Vendor
								</div>

								<div className="col-md-2 ">Status</div>
								<div className="col-md-3 ">Action</div>
							</div>
						</div>

						{responseLst && responseLst.length > 0 ? responseLst.map((x, ind) => <div className="row p-1 tablebox">
							<div className="col-md-3 d-flex align-items-center">
								<span>
									<strong className="d-inline d-md-none">Buyer: </strong>{x.buyer.usrName}<br />
									<span style={{ fontSize: '10px' }}>{x.buyer.phoneNumber}</span><br />
									<span style={{ fontSize: '10px' }}>{x.buyer.email}</span><br />
									<span style={{ fontSize: '10px' }}>{x.buyer.usrAddress}</span>
								</span>
							</div>
							<div className="col-md-3 d-flex align-items-center">
								<span>
									<strong className="d-inline d-md-none">Buyer: </strong>{x.seller.usrName}<br />
									<span style={{ fontSize: '10px' }}>{x.seller.phoneNumber}</span><br />
									<span style={{ fontSize: '10px' }}>{x.seller.email}</span><br />
									<span style={{ fontSize: '10px' }}>{x.seller.usrAddress}</span>
								</span>

							</div>
							<div className="col-md-1 d-flex align-items-center">

								<span>
									<strong className="d-inline d-md-none">Status: </strong> <span class="badge bg-success text-light">{x.status}</span>
								</span>
							</div>
							<div className="col-md-3 d-flex align-items-center">
								<span>
									<strong className="d-block d-md-none">LD / Advance: </strong>
									{x.ldPercent}% will be deduced after {x.ldDays} days delay
									and advance of {x.advance}%

								</span>
							</div>
							<div className="col-md-2 d-flex align-items-center justify-content-center" style={{ textAlign: "center" }}>
								<div className="d-none d-md-block">
									<div className="row m-0 p-0">
										<div className="col-md-6 m-0 p-0" style={{ textAlign: "right" }}>
											{/*{x.status === "Draft" ?*/}
											{/*	<FormButton name="Edit" onClick={(e) => editAgreement(e, tempPO)} /> : <></>}*/}

										</div>
										<div className="col-md-6 m-0 p-0" style={{ textAlign: "left" }}>
											<FormButton name="Respond" onClick={(e) => {
												e.preventDefault();
												OtherData.setData(JSON.stringify(x));
												navigate("/DetailAgreement")
											}} />
										</div>
									</div>
								</div>
								<div className="d-block d-md-none">
									<div className="row m-0 p-0">
										<div className="col-xs-6 m-0 p-0">
											{/*<FormButton name="Copy" onClick={(e) => copyPurchaseOrder(e, tempPO)} />*/}
										</div>
										<div className="col-xs-6 m-0 p-0">
											<FormButton name="Respond" onClick={(e) => {
												e.preventDefault();
												//PurchaseOrder.setPoId(tempPO.poId);
												navigate("/Details")
											}} />
										</div>
									</div>
								</div>


							</div>
						</div>) : <div className="row"> No Items in Proposal</div>}
					</div>
					<div className="col-md-12 pt-2 ">
						<div className="row">
							<div className="col-md-12 p-0">
								<h4 style={{ textAlign: "left", color: '#007bff' }}>Line Items</h4>
							</div>
						</div>
						<div className="d-none d-md-block">
							<div className="row tableHeader ">
								<div className="col-md-1 ">
									S. No.
								</div>
								<div className="col-md-3 ">
									Title
								</div>

								<div className="col-md-6 ">Description</div>
								<div className="col-md-2 ">Quanitity</div>
							</div>
						</div>
						
						{itemList && itemList.length > 0 ? itemList.map((x,ind) => <div className="row p-1 tablebox">
							<div className="col-md-1">
								<strong className="d-inline d-md-none">S.No.: </strong>
								{ind + 1}
								
							</div>
							<div className="col-md-3">
								<strong className="d-inline d-md-none">Title: </strong>
								{x.itemTitle}
								<br/>
								({x.itemHsnCsnUin})
							</div>
							<div className="col-md-6">
								<strong className="d-inline d-md-none">Description: </strong>
								{x.itemDescription}<br/>
							</div>
							<div className="col-md-2">
								<strong className="d-inline d-md-none">Quanitity: </strong>
								{x.itemQuantity}
							</div>
						</div>) : <div className="row"> No Items in Proposal</div>}
					</div>
					<div className="col-md-12 pt-2 ">
						<div className="row">
							<div className="col-md-12 p-0">
								<h4 style={{ textAlign: "left", color: '#007bff' }}>Terms And Conditions</h4>
							</div>
						</div>
						<div className="row">
							<div className="col-md-1 tableHeader">S. No.</div>
							<div className="col-md-2 tableHeader">Title</div>
							<div className="col-md-6 tableHeader">Terms And Conditions</div>
							<div className="col-md-3 tableHeader">Attachments</div>
						</div>
						{termList && termList.length > 0 ? termList.map((x,ind) => <div className="row p-1 tablebox">
							<div className="col-md-1">
								<strong className="d-inline d-md-none">S.No.: </strong>
								{ind + 1} </div>
							<div className="col-md-2">
								<strong className="d-inline d-md-none">Title: </strong>
								{x.termTitle} </div>
							<div className="col-md-6">
								<strong className="d-inline d-md-none">Terms And Conditions: </strong>
								{x.termTxt}</div>
							<div className="col-md-3">
								<strong className="d-inline d-md-none">Attachments: </strong>
								{x.attachments ? x.attachments.map((i) => < div className="col-md-12" style={{ marginBottom: "2px" }}>
									<a href={i.link} target={"new"}>
										<img src={i.link} width={50} height={50} />
									</a>
								</div>) : <span style={{ fontsize: "70%" }}>No Attachments</span>}</div>
						</div>) : <div className="row"> No Items in Purchase Agreement</div>}
					</div>
				</div>
				
			</div> : <div> Not able to display order details</div>}
		</div>
			
			
		</>
	);
};
export default DetailProposal;
