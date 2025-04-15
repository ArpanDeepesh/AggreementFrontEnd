import "./DraftAgreement.css";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputField from "../FormParts/InputField";
import FormSubmitButton from "../FormParts/FormSubmitButton";
import FormButton from "../FormParts/FormButton";
import { sendPostRequest, getRequest, getRequestAllowAll, deleteRequest } from "../Services/ContrectBackendAPI";
import UserProfile from "../Context/UserProfile";
import { useState } from "react";
import MessageDisplay from "../CommonPages/MessageDisplay";
import InputNumberField from "../FormParts/InputNumberField";
import InputFieldBlank from "../FormParts/InputFieldBlank";
import AddAttachment from "../CommonPages/AddAttachment";
import OtherData from "../Context/OtherData";
import DeleteItemConfirmation from "../CommonPages/DeleteItemConfirmation";

const DraftB2CAgreement = () => {
	const termForm = useRef(null);
	const itemForm = useRef(null);
	const proposalForm = useRef(null);
	const navigate = useNavigate();
	const [msg, setMsg] = useState("");

	const [agreementObj, setAgreementObj] = useState();
	const [propsalTermOptions, setProposalTermOptions] = useState([]);
	const [agreementId, setAgreementId] = useState(0);
	//item section setBuyerTermList
	const [itemList, setItemList] = useState([]);
	const [itemId, setItemId] = useState();
	const [itemCurrencyOption, setItemCurrencyOption] = useState([]);
	const [itemUnitOption, setItemUnitOption] = useState([]);
	const [proposalType, setProposalType] = useState();

	const [termDropDownId, setTermDropDownId] = useState();

	const [buyerTermList, setBuyerTermList] = useState([]);
	const [sellerTermList, setSellerTermList] = useState([]);

	const [termId, setTermId] = useState();
	const [termTitle, setTermTitle] = useState();
	const [termText, setTermText] = useState();
	const [termAttachments, setTermAttachments] = useState([]);

	const [deleteMsg, setDeleteMsg] = useState();
	const [deleteData, setDeleteData] = useState();


	useEffect(() => {
		if (UserProfile.getLoginStatus() === 1) {
			navigate("/Home");
		}
		if (OtherData.getData() !== "" && OtherData.getData().length > 0) {
			var obj = JSON.parse(OtherData.getData());
			console.log(obj);
			setAgreementObj(obj);
			loadItemList(obj.id);
			loadBuyerTermList(obj.id);
			loadSellerTermList(obj.id);
		}

		getRequest("api/General/UserTermDropDown?typeName=Seller", UserProfile.getToken()).then(x => x.json()).then(res => {
			if (res.status === 1) {
				setProposalTermOptions(res.data);
			}
		}).catch(err => console.log(err));
		getRequestAllowAll("api/General/TermsTypes").then(x => x.json()).then(res => {
			if (res.status === 1) {
				var agObj = JSON.parse(OtherData.getData());
				for (var i = 0; i < res.data.length; i++) {
					if (res.data[i].typeValue === "Buyer" && UserProfile.getUserId().toString() === agObj.buyer.usrId.toString()) {
						setProposalType(res.data[i].id);
						break;
					}
					if (res.data[i].typeValue === "Seller" && UserProfile.getUserId().toString() === agObj.seller.usrId.toString()) {
						setProposalType(res.data[i].id);
						break;
					}
				}
			}
		}).catch(err => console.log(err));
		getRequestAllowAll("api/General/UnitList").then(x => x.json()).then(res => {
			if (res.status === 1) {
				setItemUnitOption(res.data);
			}
		}).catch(err => console.log(err));
		getRequestAllowAll("api/General/CurrencyList").then(x => x.json()).then(res => {
			if (res.status === 1) {
				setItemCurrencyOption(res.data);
			}
		}).catch(err => console.log(err));


	}, []);
	const loadItemList = (agreementId) => {
		getRequest("api/Business/GetAgreementItems?agreementid=" + agreementId, UserProfile.getToken()).then(x => x.json()).then(res => {
			console.log(res);
			setItemList(res.data);
		}).catch(err => console.log(err));
	}
	const loadBuyerTermList = (pid) => {
		getRequest("api/Business/AgreementTermList?agreementId=" + pid + "&termType=Buyer", UserProfile.getToken()).then(x => x.json()).then(res => {
			console.log(res);
			setBuyerTermList(res.data);
		}).catch(err => console.log(err));
	}
	const loadSellerTermList = (pid) => {
		getRequest("api/Business/AgreementTermList?agreementId=" + pid + "&termType=Seller", UserProfile.getToken()).then(x => x.json()).then(res => {
			console.log(res);
			setSellerTermList(res.data);
		}).catch(err => console.log(err));
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		var formBody = {
			Id: agreementObj.id,
			LDDays: proposalForm.current['LDDays'].value,
			LDPercent: proposalForm.current['LDPercent'].value,
			Advance: proposalForm.current['Advance'].value,
			AgreementDuration: proposalForm.current['NumberOfDays'].value
		};
		console.log(formBody);
		sendPostRequest("api/Business/UpdateB2CContract", UserProfile.getToken(), formBody).then(r => r.json()).then(res => {
			console.log(res);
			if (res.status === 1) {
				setAgreementId(res.id);
			} else {
				setMsg("Not able to save data");
			}

		}).catch(err => {
			console.log(err);
		});

	};
	const handleSubmitAddItem = (e) => {
		e.preventDefault();
		
		var postBody = {
			AgItemId: itemId > 0 ? itemId : 0,
			AgId: agreementObj.id,
			CreatorId: UserProfile.getUserId(),
			Rate: itemForm.current["Rate"] ? itemForm.current["Rate"].value:0,
			Tax: itemForm.current["Tax"] ? itemForm.current["Tax"].value:0,
			ItemTitle: itemForm.current["ItemTitle"].value,
			ItemDescription: itemForm.current["ItemDescription"].value,
			ItemCode: itemForm.current["ItemCode"].value,
			ItemDeliveredInDays: itemForm.current["ItemDeliveredInDays"] ? itemForm.current["ItemDeliveredInDays"].value:0,
			Qty: itemForm.current["Qty"].value,
			CurrencyId: itemForm.current["CurrencyId"] ? itemForm.current["CurrencyId"].value:1,
			UnitId: itemForm.current["UnitId"] ? itemForm.current["UnitId"].value:1,
		};
		sendPostRequest("api/Business/AddAgreementItem", UserProfile.getToken(), postBody).then(r => r.json()).then(res => {
			console.log(res);
			if (res.status === 1)
			{
				setMsg("Item Added successfully.");
				
			}
		}).catch(err => console.log(err));
	}
	const resetTermForm = () => {
		setTermText("");
		setTermTitle("")
		termForm.current['TermTitle'].value = "";
		termForm.current['TermTxt'].value = "";
		setTermAttachments([]);
	}
	const handleSubmitAddTerm = (e) => {
		e.preventDefault();
		var postBody = {

			Id: termId && termId > 0 ? termId : 0,
			TermTitle: termForm.current['TermTitle'].value,
			TermTxt: termForm.current['TermTxt'].value,
			TermTypeId: proposalType,
			TermRfpId: agreementObj.id,
			Attachments: termAttachments

		};
		console.log(postBody);
		sendPostRequest("api/Business/AddAgreementTerm", UserProfile.getToken(), postBody).then(r => r.json()).then(res => {
			console.log(res);
			if (res.status === 1) {
				resetTermForm();
				loadSellerTermList(agreementObj.id);
				loadBuyerTermList(agreementObj.id);
				setMsg("Term added.");
			} else {
				setMsg("Not able to save data");
			}

		}).catch(err => {
			console.log(err);
		});

	};

	const addUserTermToProposal = () => {
		var groupId = termForm.current['selectedTermId'].value
		var termType = "Buyer";
		if (agreementObj.buyer.usrId.toString() === UserProfile.getUserId().toString())
		{
			termType="Seller"
		}
		getRequest("api/Business/AddUserTermToAgreement?agreementId=" + agreementObj.id + "&grpId=" + groupId + "&termType=" + termType, UserProfile.getToken())
			.then(x => x.json())
			.then(res => {
				if (res.status === 1) {
					setMsg("Data added successfully");
					resetTermForm();
					loadSellerTermList(agreementObj.id);
				}
			}).catch(err => console.log(err));
	}
	const publishProposal = () => {
		getRequest("api/Business/StartAgreement?agreementId=" + agreementObj.id, UserProfile.getToken())
			.then(x => x.json())
			.then(res => {
				console.log(res);
				if (res.status === 1) {
					OtherData.setData(JSON.stringify(agreementObj));
					navigate("/DetailAgreement");
				}
			}).catch(err => console.log(err));
	}
	const editTerms = (e, term) => {
		e.preventDefault();
		document.getElementById("SingleTermBtn").click();
		console.log(term);
		setTermId(term.id);
		setTermTitle(term.termTitle);
		setTermText(term.termTxt);
		termForm.current['TermTitle'].value = term.termTitle;
		termForm.current['TermTxt'].value = term.termTxt;
	}
	const deleteAction = (url) => {
		deleteRequest(url, UserProfile.getToken()).then(x => x.json()).then(res => {
			setMsg("Deleted successfully");
			loadItemList(agreementObj.id);
			loadSellerTermList(agreementObj.id);
		}).catch(err => console.log(err));
	}
	const editOrAddRate = (e, item) => {
		e.preventDefault();
		setItemId(item.id);
		itemForm.current["Rate"].value = UserProfile.getUserId() === agreementObj.seller.usrId.toString() ? item.sellerRate : item.buyerRate;
		itemForm.current["Tax"].value = item.itemTax;
		itemForm.current["Qty"].value = item.itemQuantity;
		itemForm.current["ItemTitle"].value = item.itemTitle;
		itemForm.current["ItemDescription"].value = item.itemDescription;
		itemForm.current["ItemCode"].value = item.itemHsnCsnUin;
		itemForm.current["ItemDeliveredInDays"].value = UserProfile.getUserId() === agreementObj.seller.usrId.toString() ? item.sellerItemCompletion : item.buyerItemCompletion;
		itemForm.current["CurrencyId"].value = item.currency;
		itemForm.current["UnitId"].value = item.unit;

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

	return (<>
		<div className="scrollable-section">
			<MessageDisplay msg={msg} setMsg={setMsg} />
			<DeleteItemConfirmation msg={deleteMsg} setMsg={setDeleteMsg} action={deleteAction} data={deleteData} />

			{agreementObj && agreementObj.id && agreementObj.id > 0 ?
				<div>
					<div className="table">
						<div className="row">
							<div className="col-md-1" style={{ textAlign: "left" }}>
								<FormButton name="Back" onClick={(e) => {
									e.preventDefault();
									navigate("/home");
								}} />
							</div>
							<div className="col-md-4">
								<FormButton name="Publish" onClick={(e) => {
									e.preventDefault();
									publishProposal();
								}} />
							</div>
						</div>
						<div className="row" style={{ border: "solid 1px #007bff" }}>
						</div>
						<Form ref={proposalForm} onSubmit={handleSubmit}>

							<div className="row" style={{ padding:"5px" }}>

								<div className="col-md-3">
									<InputFieldBlank name="LDPercent" type="number" label="LD (%)" value={agreementObj.ldPercent} />
									 %
								</div>
								<div className="col-md-3">
									<InputFieldBlank name="LDDays" type="number" label="LD duration (in days)" value={agreementObj.ldDays} />
									 Days
								</div>
								<div className="col-md-3">
									<InputFieldBlank name="NumberOfDays" type="number" label="Agreement duration" value={agreementObj.contractDuration} />
									 Days
								</div>
								<div className="col-md-3">
									<InputFieldBlank name="Advance" type="number" label="Advance" value={agreementObj.advance} />
								</div>
								<div className="col-md-12" style={{ textAlign: "right" }}>
								<br/>
									<FormSubmitButton name={"Edit Agreement"} />
								</div>
							</div>
							
							<div className="row">
								
							</div>
						</Form>
					</div>
					<div className="table">
						<div className="" style={{ border: "solid 1px #007bff", textAlign:"left" }}>
							<Form ref={itemForm} onSubmit={handleSubmitAddItem}>
								<div className="row">
									<div className="col-md-3">
										<InputFieldBlank name="ItemCode" type="text" label="Code" />
									</div>
									<div className="col-md-3">
										<InputFieldBlank name="ItemTitle" type="text" label="Item Title" />
									</div>
									<div className="col-md-3">
										<InputFieldBlank name="ItemDescription" type="text" label="Description" />
									</div>
									<div className="col-md-3">
										<InputFieldBlank name="Qty" type="number" label="Quantity" />
									</div>
									
								</div>
								<div className="row">
									<div className="col-md-3">
										<InputFieldBlank name="Tax" type="number" label="Tax" />
									</div>
									<div className="col-md-3">
										<InputFieldBlank name="ItemDeliveredInDays" type="number" label="Completion (in days)" />
									</div>
									<div className="col-md-3">
										<InputFieldBlank name="Rate" type="number" label="Rate" />

									</div>
									<div className="col-md-3">
										<span className="" style={{ textAlign: 'left' }}>
											<label style={{ fontsize: '20px', color: 'black', fontWeight: '700' }} >Currency</label>
											<select name="CurrencyId" className="myAginput"
												onChange={(e) => {
													e.preventDefault();
													//setItemRateCurrency(e.target.value);
												}}>
												<option value="-99" selected >-Select-</option>
												{itemCurrencyOption && itemCurrencyOption.length > 0 ?
													itemCurrencyOption.map(x => <option value={x.id} >{x.typeValue}</option>) :
													<></>}
											</select>
										</span>
										<span className="" style={{ textAlign: 'left' }}>
											<label style={{ fontsize: '20px', color: 'black', fontWeight: '700' }} >Unit</label>
											<select name="UnitId" className="myAginput"
												onChange={(e) => {
													e.preventDefault();
													//setItemRateCurrency(e.target.value);
												}}>
												<option value="-99" selected >-Select-</option>
												{itemUnitOption && itemUnitOption.length > 0 ?
													itemUnitOption.map(x => <option value={x.id} >{x.typeValue}</option>) :
													<></>}
											</select>
										</span>
									</div>
								</div>
								
								<div className="row">
									<div className="offset-md-8 col-md-4" style={{ textAlign: "right" }}>
										<FormSubmitButton name={itemId > 0 ? "Edit Item" : "Save New Item"} />
									</div>
								</div>
							</Form>
						</div>
						<div className="table" style={{ textAlign: "left" }}>
							<h4 style={{ color: "#007bff" }}>Item List</h4>
							<div className="d-none d-md-block">
								<div className="row tableHeader">
									<div className="col-md-1 ">
										Code
									</div>
									<div className="col-md-1 ">
										Title
									</div>
									<div className="col-md-3 ">
										Description
									</div>
									<div className="col-md-1 ">
										Quantity
									</div>
									<div className="col-md-2 ">
										Rate
									</div>
									<div className="col-md-1 ">
										Tax
									</div>
									<div className="col-md-1 ">
										Completion B/S
									</div>

									<div className="col-md-2 " style={{ textAlign: "center" }}>
										Actions
									</div>
								</div>
							</div>
							{itemList && itemList.length > 0 ? itemList.map(x => < div className="row tablebox">
								<div className="col-md-1 d-flex align-items-center">
									<span>
										<strong className="d-inline d-md-none">Code: </strong>
										{x.itemHsnCsnUin}</span>
								</div>
								<div className="col-md-1 d-flex align-items-center">
									<span>
										<strong className="d-inline d-md-none">Title: </strong>
										{x.itemTitle}
									</span>
								</div>
								<div className="col-md-3 d-flex align-items-center">
									<span>
										<strong className="d-inline d-md-none">Description: </strong>
										{x.itemDescription}</span>
								</div>
								<div className="col-md-1 d-flex align-items-center">
									<span>
										<strong className="d-inline d-md-none">Quanityt: </strong>
										{x.itemQuantity}</span>
								</div>
								<div className="col-md-2 d-flex align-items-center">
									<span id={"displayRate" + x.id}>
										{x.sellerRate && x.sellerRate > 0 ? <span>{x.sellerRate} {x.currency}/{x.unit}</span> : <>Not present</>}/
										{x.buyerRate && x.buyerRate > 0 ? <span>{x.buyerRate} {x.currency}/{x.unit}</span> : <>Not present</>}
									</span>
								</div>
								<div className="col-md-1 d-flex align-items-center">
									<span id={"displayTax" + x.id}>
										{x.itemTax}
									</span>
								</div>
								<div className="col-md-1 d-flex align-items-center">
									<span id={"displayCompletion" + x.id}>
										{x.buyerItemCompletion}/{x.sellerItemCompletion}
									</span>
								</div>
								<div className="col-md-1" style={{ textAlign: "center" }}>
									<span id={"editBtn" + x.id} style={{ display: "inline" }}>
										<FormButton name="Edit" onClick={(e) => { editOrAddRate(e, x) }} />
									</span>
								</div>
							</div>) : <>No Item Is Present.</>}

						</div>
					</div>

					<div className="table" style={{ display: agreementObj.id > 0 ? "block" : "none" }}>
						<Form ref={termForm} onSubmit={handleSubmitAddTerm}>
							<div className="tabs">
								<div className="tab-buttons">
									<button className="tab-button active" onClick={(e) => { openTab(e, "BulkTerm"); }}>Bulk Terms Upload</button>
									<button id={"SingleTermBtn"} className="tab-button" onClick={(e) => { openTab(e, "SingleTerm"); }}>Add Single Term</button>
								</div>
								<div id="BulkTerm" className="tab-content active">
									<div className="row">
										<div className="col-md-4">
											<div className="form-group" style={{ textAlign: 'left' }}>
												<label style={{ fontsize: '20px', color: 'black', fontWeight: '700' }} >Items</label>
												<select name="selectedTermId" className="form-control"
													value={termDropDownId} onChange={(e) => {
														e.preventDefault();
														//setItemData(e.target.value);
													}}>
													<option value={0}>-Select-</option>
													{propsalTermOptions && propsalTermOptions.length > 0 ?
														propsalTermOptions.map(x => <option value={x.id} >{x.typeValue}
															<br />{x.desc}
														</option>) :
														<></>}
												</select>
											</div>
										</div>
										<div className="col-md-4">
											<br />
											<FormButton name="Add User Term To Proposal"
												onClick={(e) => {
													e.preventDefault();
													addUserTermToProposal();
												}} />
										</div>
									</div>

								</div>

								<div id="SingleTerm" className="tab-content">
									<div className="row">
										<div className="col-md-5">
											<InputField name="TermTitle" type="text" label="Term Title" value={termTitle} />
										</div>
										<div className="col-md-5">
											<label>Term Text</label>
											<textarea name="TermTxt" rows="4" cols="90">
												{termText}
											</textarea>
											{/*<InputField name="" type="text" label="" value={} />*/}
										</div>
									</div>
									<div className="row" style={{ textAlign: "left", paddingTop: '20px' }}>
										<div className="col-md-12">
											<label style={{ fontsize: '20px', color: 'black', fontWeight: '700', paddingLeft: '18px' }} >Attachments</label>
											<AddAttachment fileLinkList={termAttachments} setFileLinkList={setTermAttachments} />
										</div>
									</div>
									<div className="row">
										<div className="offset-md-8 col-md-4" style={{ textAlign: "right" }}>
											<FormSubmitButton name={termId > 0 ? "Edit Term" : "Save New Term"} />
										</div>
									</div>
								</div>

							</div>
						</Form>
						<div className="table" style={{ textAlign: "left" }}>
							
							<div className="d-none d-md-block">
								<div className="row tableHeader">
									<div className="col-md-2 ">
										Title
									</div>
									<div className="col-md-6 ">
										Description
									</div>
									<div className="col-md-2 ">
										Attachments
									</div>

									<div className="col-md-2 " style={{ textAlign: "center" }}>
										Actions
									</div>
								</div>
							</div>
							<h4 style={{ color: "#007bff" }}>Buyers Term List</h4>
							{buyerTermList && buyerTermList.length > 0 ? buyerTermList.map(x => < div className="row tablebox">
								<div className="col-md-2 d-flex align-items-center">
									<span>
										<strong className="d-inline d-md-none">Title: </strong>
										{x.termTitle}
									</span>
								</div>
								<div className="col-md-6 d-flex align-items-center">
									<span>
										<strong className="d-inline d-md-none">Description: </strong>
										{x.termTxt}</span>
								</div>
								<div className="col-md-2 d-flex align-items-center">
									<span>
										<strong className="d-inline d-md-none">Attachments: </strong>
										{x.attachments ? x.attachments.map((i) => < div className="col-md-12" style={{ marginBottom: "2px" }}>
											<a href={i.link} target={"new"}>
												<img src={i.link} width={50} height={50} />
											</a>
										</div>) : <span style={{ fontsize: "70%" }}>No Attachments</span>}
									</span>
								</div>
								<div className="col-md-2" style={{ textAlign: "center" }}>
									<span style={{ display: UserProfile.getUserId() === agreementObj.buyer.usrId.toString()?"inline":"none" }}>
										<FormButton name="Edit" onClick={(e) => { editTerms(e, x); }} />
										<span className="removeLink" onClick={(e) => {
											e.preventDefault();
											setDeleteMsg("Are you sure you want to delete the term ?");
											setDeleteData("api/Business/DeleteAgreementTerm?termId=" + x.id);
										}}> Remove </span>
									</span>
									<span style={{ display: UserProfile.getUserId() === agreementObj.seller.usrId.toString() ? "inline" : "none" }}>
										<FormButton name="Add Remark" onClick={(e) => { editTerms(e, x); }} />
									</span>
									{/*<FormButton name="Remove"  />*/}
								</div>
							</div>) : <>No Item Is Present.</>}
							<h4 style={{ color: "#007bff" }}>Seller Term List</h4>
							{sellerTermList && sellerTermList.length > 0 ? sellerTermList.map(x => < div className="row tablebox">
								<div className="col-md-2 d-flex align-items-center">
									<span>
										<strong className="d-inline d-md-none">Title: </strong>
										{x.termTitle}
									</span>
								</div>
								<div className="col-md-6 d-flex align-items-center">
									<span>
										<strong className="d-inline d-md-none">Description: </strong>
										{x.termTxt}</span>
								</div>
								<div className="col-md-2 d-flex align-items-center">
									<span>
										<strong className="d-inline d-md-none">Attachments: </strong>
										{x.attachments ? x.attachments.map((i) => < div className="col-md-12" style={{ marginBottom: "2px" }}>
											<a href={i.link} target={"new"}>
												<img src={i.link} width={50} height={50} />
											</a><span className="removeLink" onClick={(e) => {
												e.preventDefault();
												setDeleteMsg("Are you sure you want to delete the attachment ?");
												setDeleteData("api/Business/DeleteAgreementTermAttachment?attachId=" + i.id);
											}}> Remove </span>
										</div>) : <span style={{ fontsize: "70%" }}>No Attachments</span>}
									</span>
								</div>
								<div className="col-md-2" style={{ textAlign: "center" }}>
									<span style={{ display: UserProfile.getUserId() === agreementObj.seller.usrId.toString() ? "inline" : "none" }}>
										<FormButton name="Edit" onClick={(e) => { editTerms(e, x); }} />
										<span className="removeLink" onClick={(e) => {
											e.preventDefault();
											setDeleteMsg("Are you sure you want to delete the term ?");
											setDeleteData("api/Business/DeleteAgreementTerm?termId=" + x.id);
										}}> Remove </span>
									</span>
									<span style={{ display: UserProfile.getUserId() === agreementObj.buyer.usrId.toString() ? "inline" : "none" }}>
										<FormButton name="Add Remark" onClick={(e) => { editTerms(e, x); }} />
									</span>
									{/*<FormButton name="Remove"  />*/}
								</div>
							</div>) : <>No Item Is Present.</>}
						</div>
					</div>
				</div>
				: <>Loading Data</>}

		</div>
	</>);
};
export default DraftB2CAgreement;