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
import AddAttachment from "../CommonPages/AddAttachment";
import OtherData from "../Context/OtherData";
import DeleteItemConfirmation from "../CommonPages/DeleteItemConfirmation";

const DraftAgreement = () => {
	const termForm = useRef(null);
	const proposalForm = useRef(null);
	const navigate = useNavigate();
	const [msg, setMsg] = useState("");

	const [agreementObj, setAgreementObj] = useState();
	const [propsalTermOptions, setProposalTermOptions] = useState([]);
	const [agreementId, setAgreementId] = useState(0);
	//item section setBuyerTermList
	const [itemList, setItemList] = useState([]);


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
		var postBody = {
			ProposalId: agreementObj.id && agreementObj.id > 0 ? agreementObj.id : 0,
			Advance: Number(proposalForm.current['Advance'].value),
			SellerRates: []
		};
		for (var i = 0; i < itemList.length; i++) {
			if (itemList[i].sellerRate > 0) {
				postBody.SellerRates.push({
					Id: 0,
					ItemId: itemList[i].id,
					ItemTax: Number(itemList[i].sellerTax),
					CompletionDays: Number(itemList[i].sellerDaysToComplete),
					RateType: 2,
					Amount: Number(itemList[i].sellerRate),
					Currency: Number(itemList[i].sellerCurrency),
					SellingUnit: Number(itemList[i].sellerUnit)
				});
			}
		}
		console.log(postBody);
		sendPostRequest("api/Business/SaveAgreement", UserProfile.getToken(), postBody).then(r => r.json()).then(res => {
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
			TermTypeId: 1,
			TermRfpId: agreementObj.id,
			Attachments: termAttachments

		};
		sendPostRequest("api/Business/AddAgreementTerm", UserProfile.getToken(), postBody).then(r => r.json()).then(res => {
			console.log(res);
			if (res.status === 1) {
				resetTermForm();
				loadSellerTermList(agreementObj.id);
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
		getRequest("api/Business/AddUserTermToAgreement?agreementId=" + agreementObj.id + "&grpId=" + groupId + "&termType=Seller", UserProfile.getToken())
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
		if (item.sellerRate && item.sellerRate > 0) {
			proposalForm.current["sellerRate" + item.id].value = item.sellerRate;
			proposalForm.current["sellerTax" + item.id].value = item.itemTax;
			proposalForm.current["sellerDaysToComplete" + item.id].value = item.sellerItemCompletion;
		}
		document.getElementById("editRate" + item.id).style.display = "inline";
		document.getElementById("displayRate" + item.id).style.display = "none";
		document.getElementById("editTax" + item.id).style.display = "inline";
		document.getElementById("displayTax" + item.id).style.display = "none";
		document.getElementById("editCompletion" + item.id).style.display = "inline";
		document.getElementById("displayCompletion" + item.id).style.display = "none";
		document.getElementById("editBtn" + item.id).style.display = "none";
		document.getElementById("saveBtn" + item.id).style.display = "inline";
	}
	const saveItemRate = (e, item) => {
		e.preventDefault();
		document.getElementById("editRate" + item.id).style.display = "none";
		document.getElementById("displayRate" + item.id).style.display = "inline";
		document.getElementById("editTax" + item.id).style.display = "none";
		document.getElementById("displayTax" + item.id).style.display = "inline";
		document.getElementById("editCompletion" + item.id).style.display = "none";
		document.getElementById("displayCompletion" + item.id).style.display = "inline";
		document.getElementById("editBtn" + item.id).style.display = "inline";
		document.getElementById("saveBtn" + item.id).style.display = "none";
		var oldItemList = [...itemList];
		for (var i = 0; i < oldItemList.length; i++) {
			if (oldItemList[i].id === item.id) {
				oldItemList[i].sellerRate = proposalForm.current["sellerRate" + item.id].value;
				oldItemList[i].sellerTax = proposalForm.current["sellerTax" + item.id].value;
				oldItemList[i].sellerDaysToComplete = proposalForm.current["sellerDaysToComplete" + item.id].value;
			}
		}
		setItemList(oldItemList)

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
							<div className="col-md-4">
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
						<Form ref={proposalForm} onSubmit={handleSubmit}>

							<div className="row">

								<div className="col-md-2">
									<strong>LD Percent: </strong>{agreementObj.ldPercent}

								</div>
								<div className="col-md-2">
									<strong>LD Days: </strong>{agreementObj.ldDays}
								</div>
								<div className="col-md-2">
									<strong>Agreement Duration: </strong>{agreementObj.contractDuration}
								</div>
								<div className="col-md-2">
									<strong>Advance: </strong>{agreementObj.advance}
								</div>
							</div>

							<div className="table" style={{ textAlign: "left" }}>
								<h3>Item List</h3>
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
											Completion
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
											{x.sellerRate && x.sellerRate > 0 ? <span>{x.sellerRate} {x.currency}/{x.unit}</span> : <>Not present</>}
										</span>
										<span id={"editRate" + x.id} style={{ display: "none" }}>
											<InputNumberField name={"sellerRate" + x.id} type="decimal" label="Proposed Rate" />
											{x.currency}/{x.unit}
										</span>
									</div>
									<div className="col-md-1 d-flex align-items-center">
										<span id={"displayTax" + x.id}>
											{x.itemTax} 
										</span>
										<span id={"editTax" + x.id} style={{ display: "none" }}>
											<InputNumberField name={"sellerTax" + x.id} type="decimal" label="Tax" />
										</span>
									</div>
									<div className="col-md-1 d-flex align-items-center">
										<span id={"displayCompletion" + x.id}>
											 {x.sellerItemCompletion}
										</span>
										<span id={"editCompletion" + x.id} style={{ display: "none" }}>
											<InputNumberField name={"sellerDaysToComplete" + x.id} type="number" label="Days to complete" />
										</span>
									</div>
									<div className="col-md-1" style={{ textAlign: "center" }}>
										<span id={"editBtn" + x.id} style={{ display: "inline" }}>
											<FormButton name="Edit" onClick={(e) => { editOrAddRate(e, x) }} />
										</span>
										<span id={"saveBtn" + x.id} style={{ display: "none" }}>
											<FormButton name="Save" onClick={(e) => { saveItemRate(e, x) }} />
										</span>
									</div>
								</div>) : <>No Item Is Present.</>}

							</div>
							<div className="row">
								<div className="offset-md-8 col-md-4" style={{ textAlign: "right" }}>
									<FormSubmitButton name={agreementId > 0 ? "Edit Agreement" : "Save New Agreement"} />
								</div>
							</div>
						</Form>
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
											<InputField name="TermTxt" type="text" label="Term Text" value={termText} />
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
							<h3>Buyers Term List</h3>
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
								</div>
							</div>) : <>No Item Is Present.</>}
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
									<span>
										<FormButton name="Edit" onClick={(e) => { editTerms(e, x); }} />
										<span className="removeLink" onClick={(e) => {
											e.preventDefault();
											setDeleteMsg("Are you sure you want to delete the term ?");
											setDeleteData("api/Business/DeleteAgreementTerm?termId=" + x.id);
										}}> Remove </span>
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
export default DraftAgreement;