import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormButton from "../FormParts/FormButton";
//import { getRequest } from "../Services/POContractBackendAPI";
import UserProfile from "../Context/UserProfile";
import OtherData from "../Context/OtherData";
import "./DetailProposal.css";
import { getRequest, sendPostRequest, getRequestAllowAll } from "../Services/ContrectBackendAPI";
import InputField from "../FormParts/InputField";
import UploadSingleFile from "../CommonPages/UploadSingleFile";
import DisappearingMessage from "../CommonPages/DisappearingMessage";
import RFQPreviewDisplay from "../NewPO/RFQPreviewDisplay";

const DetailProposal = ({ setUserName, setUserType }) => {
	const [rfq, setRfq] = useState();
	const [msgDis, setMsgDis] = useState();
	const [itemList, setItemList] = useState([]);
	const [termList, setTermList] = useState([]);
	const [inviteList, setInviteList] = useState([]);
	const [phoneNumber, setPhoneNumber] = useState();
	const [bulkUploadFile, setBulkUploadFile] = useState();
	const [responseLst, setResponseLst] = useState([]);
	const [displayData, setDisplayData] = useState();
	const [itemUnitOptions, setItemUnitOptions] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {

		setUserName(UserProfile.getName());
		setUserType(UserProfile.getUserType());
		var data = OtherData.getData();
		if (data.length > 0) {
			setRfq(JSON.parse(data));
			var obj = JSON.parse(data);
			obj["paymentTerms"] = [];
			obj["lineItems"] = [];
			obj["customTerms"] = [];
			setDisplayData(obj);
			getRequestAllowAll("api/General/UnitList").then(x => x.json()).then(res => {
				if (res.status === 1) {
					setItemUnitOptions(res.data);
				}
			}).catch(err => console.log(err));


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
			for (var i = 0; i < res.data.length; i++) {
				addLineItem(res.data[i]);
            }
		}).catch(err => console.log(err));
	}
	const loadTermList = (pid) => {

		getRequest("api/Business/RFQTermList?proposalId=" + pid, UserProfile.getToken()).then(x => x.json()).then(res => {
			console.log(res);
			setTermList(res.data);
			for (var i = 0; i < res.data.length; i++) {
				if (res.data[i].isPaymentTerm) {
					addPaymentTerm(res.data[i].id, res.data[i].termTxt, res.data[i].termTitle);
				} else
				{
					addCustomTerm(res.data[i].id, res.data[i].termTxt, res.data[i].termTitle);
				}
				
			}
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
	const addCustomTerm = (termId, termText, termTitle) => {
		if (!termText.trim()) return;
		removeCustomTerm(termId);
		setDisplayData(prev => ({
			...prev,
			customTerms: [
				...prev.customTerms,
				{
					id: termId === 0 ? Date.now() : termId,
					title: termTitle,
					text: termText,
					status: 'pending'
				}
			]
		}));
	};
	const addPaymentTerm = (termId, termText, termTitle) => {
		if (!termText.trim()) return;
		removePaymentTerm(termId);
		setDisplayData(prev => ({
			...prev,
			paymentTerms: [
				...prev.paymentTerms,
				{
					id: termId === 0 ? Date.now() : termId,
					title: termTitle,
					text: termText,
					status: 'pending'
				}
			]
		}));
	};
	const removePaymentTerm = (id) => {
		setDisplayData(prev => ({
			...prev,
			paymentTerms: prev.paymentTerms.filter(t => t.id !== id)
		}));
	};
	const removeCustomTerm = (id) => {
		setDisplayData(prev => ({
			...prev,
			customTerms: prev.customTerms.filter(t => t.id !== id)
		}));
	};
	const removeLineItem = (id) => {
		setDisplayData(prev => ({
			...prev,
			lineItems: prev.lineItems.filter(item => item.id !== id)
		}));
	};
	const addLineItem = (item) => {
		removeLineItem(item.id);
		setDisplayData(prev => ({
			...prev,
			lineItems: [
				...prev.lineItems,
				{

					id:item.id,
					title: item.itemTitle,
					description: item.itemDescription,
					hsnSac: item.itemHsnCsnUin,
					quantity: item.itemQuantity,
					unit: item.unit
				}
			]
		}));
	};
	const getStatusClass = (status) => {
		switch (status) {
			case 'accepted': return 'status-accepted';
			case 'rejected': return 'status-rejected';
			case 'pending': return 'status-pending';
			case 'Active': return 'status-accepted';
			case 'Proposed': return 'status-pending';
			default: return '';
		}
	};

	const getStatusText = (status) => {
		switch (status) {
			case 'accepted': return 'Auto-accepted';
			case 'rejected': return 'Rejected';
			case 'pending': return 'Pending';
			case 'Active': return 'Active';
			case 'Proposed': return 'Proposed';
			default: return '';
		}
	};
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
				<RFQPreviewDisplay formData={displayData} unitOptions={itemUnitOptions} />
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
					<div className="col-md-12 pt-2">
						<div className="form-group">
							<label>Invite List</label>
							<ul className="terms-list">
								{inviteList.map(term => (
									<li className="term-item" key={term.id}>

										<label htmlFor={`custom-term-${term.id}`}>
											<strong className="d-inline d-md-none">Raised For: </strong>
											<br />
											Invite Id: {term.inviteUID}
										</label>
										<label >
											Name: {term.raisedForUser.usrName}
											<br/>
											Email: {term.raisedForUser.email}
											<br />
											Phone number: {term.raisedForUser.phoneNumber}
										</label>
										<span className={`term-status ${getStatusClass(term.inviteStatusId)}`}>
											{getStatusText(term.inviteStatusId)}
										</span>
										<span className="remove-item" onClick={(e) => {
											e.preventDefault();
											alert("Delete invite is under construction");
										}}>
											<i className="fas fa-times"></i>
										</span>
									</li>
								))}
							</ul>
						</div>
					</div>
					<div className="col-md-12 pt-2">
						<div className="form-group">
							<label>Response List</label>
							<ul className="terms-list">
								{responseLst.map(term => (
									<li className="term-item" key={term.id}>

										<label htmlFor={`custom-term-${term.id}`}>
											<span>
												<strong className="d-inline d-md-none">Buyer: </strong>{term.buyer.usrName}<br />
												<span style={{ fontSize: '10px' }}>{term.buyer.phoneNumber}</span><br />
												<span style={{ fontSize: '10px' }}>{term.buyer.email}</span><br />
												<span style={{ fontSize: '10px' }}>{term.buyer.usrAddress}</span>
											</span>
										</label>
										<label >
											<span>
												<strong className="d-inline d-md-none">Buyer: </strong>{term.seller.usrName}<br />
												<span style={{ fontSize: '10px' }}>{term.seller.phoneNumber}</span><br />
												<span style={{ fontSize: '10px' }}>{term.seller.email}</span><br />
												<span style={{ fontSize: '10px' }}>{term.seller.usrAddress}</span>
											</span>
										</label>
										<span className={`term-status ${getStatusClass(term.status)}`}>
											{getStatusText(term.status)}
										</span>
										<span className="remove-item" onClick={(e) => {
											e.preventDefault();
											OtherData.setData(JSON.stringify(term));
											navigate("/DetailAgreement")
										}}>
											<i className="fas fa-times"></i>
										</span>
									</li>
								))}
							</ul>
						</div>
					</div>

				</div>
				
			</div> : <div> Not able to display order details</div>}
		</div>
			
			
		</>
	);
};
export default DetailProposal;
