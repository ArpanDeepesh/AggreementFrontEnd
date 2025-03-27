import "./NewPO.css";
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

const RFQApplication = () => {
	const itemForm = useRef(null);
	const termForm = useRef(null);
	const proposalForm = useRef(null);
	const navigate = useNavigate();
	const [msg, setMsg] = useState("");
	
	const [proposalId, setProposalId] = useState();
	const [proposalCompletion, setProposalCompletion] = useState();
	const [termLDPercent, setTermLDPercent] = useState();
	const [termLDDays, setTermLDDays] = useState();
	const [propsalType, setProposalType] = useState([]);
	const [propsalTermOptions, setProposalTermOptions] = useState([]);
	const [propsalItemOptions, setProposalItemOptions] = useState([]);
	//item section
	const [itemList, setItemList] = useState([]);
	const [itemId, setItemId] = useState();
	const [itemUin, setItemUin] = useState();
	const [itemTitle, setItemTitle] = useState();
	const [itemDescription, setItemDescription] = useState();
	const [itemQty, setItemQty] = useState();

	const [termDropDownId, setTermDropDownId] = useState();
	const [itemDropDownId, setItemDropDownId] = useState();

	const [termList, setTermList] = useState([]);
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
		getRequestAllowAll("api/General/TermsTypes").then(x => x.json()).then(res => {
			if (res.status === 1) {
				for (var i = 0; i < res.data.length; i++) {
					if (res.data[i].typeValue === "Buyer") {
						setProposalType(res.data[i].id);
					}
				}
			}
		}).catch(err => console.log(err));
		getRequest("api/General/UserTermDropDown?typeName=Buyer", UserProfile.getToken()).then(x => x.json()).then(res => {
			if (res.status === 1) {
				setProposalTermOptions(res.data);
			}
		}).catch(err => console.log(err));
		getRequest("api/General/UserItemDropDown?typeName=Buyer", UserProfile.getToken()).then(x => x.json()).then(res => {
			if (res.status === 1) {
				setProposalItemOptions(res.data);
			}
		}).catch(err => console.log(err)); 
		if (OtherData.getData()!=="" && OtherData.getData().length > 0)
		{
			var proposalObj = JSON.parse(OtherData.getData());
			setProposalCompletion(proposalObj.proposalCompletionInDays);
			setTermLDPercent(proposalObj.proposalLdPercent);
			setTermLDDays(proposalObj.proposalLdAppliedAfterDays);
			setProposalId(proposalObj.id);
			loadItemList(proposalObj.id);
			loadTermList(proposalObj.id);
			//OtherData.resetData();
		}
		
		
	}, []);
	const loadItemList = (pid) => {
		getRequest("api/Business/RFQItemListForBuyer?proposalId="+pid, UserProfile.getToken()).then(x => x.json()).then(res => {
			console.log(res);
			setItemList(res.data);
		}).catch(err => console.log(err));
	}
	const loadTermList = (pid) => {
		getRequest("api/Business/RFQTermList?proposalId=" + pid+"&termType=Buyer", UserProfile.getToken()).then(x => x.json()).then(res => {
			console.log(res);
			setTermList(res.data);
		}).catch(err => console.log(err));
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		var postBody = {
			Id: proposalId && proposalId > 0 ? proposalId :0,
			ProposalCompletionInDays: proposalForm.current['ProposalCompletionInDays'].value,
			ProposalLdPercent: proposalForm.current['ProposalLdPercent'].value,
			OwnerId: UserProfile.getUserId(),
			ProposalLdAppliedAfterDays: proposalForm.current['ProposalLdAppliedAfterDays'].value,
			ProposalTypeId: propsalType

		};
		sendPostRequest("api/Business/SaveRFQ", UserProfile.getToken(), postBody).then(r => r.json()).then(res => {
			console.log(res);
			if (res.status === 1) {
				setProposalId(res.id);
				setMsg("Proposal saved.");
			} else {
				setMsg("Not able to save data");
			}

		}).catch(err => {
			console.log(err);
		});
		
	};
	const resetItemForm = () => {
		setItemUin("");
		setItemTitle("");
		setItemDescription("");
		setItemQty(0);
		setItemId(0);
		itemForm.current['ItemHsnCsnUin'].value = "";
		itemForm.current['ItemTitle'].value = "";
		itemForm.current['ItemDescription'].value = "";
		itemForm.current['ItemQuantity'].value = 0;
	}
const handleSubmitAddItem = (e) => {
	e.preventDefault();
	var postBody = {
		Id: itemId && itemId > 0 ? itemId : 0,
		ItemHsnCsnUin: itemForm.current['ItemHsnCsnUin'].value,
		ItemTitle: itemForm.current['ItemTitle'].value,
		ItemDescription: itemForm.current['ItemDescription'].value,
		ItemQuantity: itemForm.current['ItemQuantity'].value,
		ItemRfpId: proposalId,

	};
	sendPostRequest("api/Business/AddRFQItem", UserProfile.getToken(), postBody).then(r => r.json()).then(res => {
		console.log(res);
		if (res.status === 1) {
			resetItemForm();
			loadItemList(proposalId);
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
		setTermId(0);
		setTermAttachments([]);
		termForm.current['TermTitle'].value = "";
		termForm.current['TermTxt'].value = "";
	}
	const handleSubmitAddTerm = (e) => {
		e.preventDefault();
		var postBody = {

			Id:termId && termId > 0 ? termId : 0,
			TermTitle: termForm.current['TermTitle'].value,
			TermTxt: termForm.current['TermTxt'].value,
			TermTypeId: propsalType,
			TermRfpId: proposalId,
			Attachments: termAttachments

		};
		sendPostRequest("api/Business/AddRFQTerm", UserProfile.getToken(), postBody).then(r => r.json()).then(res => {
			console.log(res);
			if (res.status === 1) {
				resetTermForm();
				loadTermList(proposalId);
			} else {
				setMsg("Not able to save data");
			}

		}).catch(err => {
			console.log(err);
		});

	};
	const setItemData = (itemId) =>
	{
		getRequest("api/general/UserCatalogItemData?itemId=" + itemId, UserProfile.getToken())
			.then(x => x.json())
			.then(res => {
				if (res.status === 1) {
					setItemUin(res.data.itemHsnCsnUin);
					setItemDescription(res.data.itemDescription);
					setItemTitle(res.data.itemTitle);
					itemForm.current['ItemHsnCsnUin'].value = res.data.itemHsnCsnUin;
					itemForm.current['ItemTitle'].value = res.data.itemTitle;
					itemForm.current['ItemDescription'].value = res.data.itemDescription;

				}
			}).catch(err => console.log(err));
	}
	const setLDData = (termId) =>
	{
		getRequest("api/general/UserTermLDData?groupId=" + termId, UserProfile.getToken())
			.then(x => x.json())
			.then(res => {
				console.log(res);
				if (res.status === 1)
				{
					setTermLDDays(res.data.key);
					setTermLDPercent(res.data.value);
					proposalForm.current["ProposalLdPercent"].value = res.data.value ;
					proposalForm.current["ProposalLdAppliedAfterDays"].value = res.data.key ;
				}
			}).catch(err => console.log(err));
	}
	const addUserTermToProposal = () => {
		var groupId = termForm.current['selectedTermId'].value
		getRequest("api/Business/AddUserTermToProposal?proposalId=" + proposalId + "&grpId=" + groupId +"&termType=Buyer", UserProfile.getToken())
			.then(x => x.json())
			.then(res => {
				if (res.status === 1) {
					setMsg("Data added successfully");
					resetTermForm();
					loadTermList(proposalId);
				}
			}).catch(err => console.log(err));
	}
	const publishProposal = () => {
		getRequest("api/Business/StartRFQ?proposalId=" + proposalId , UserProfile.getToken())
			.then(x => x.json())
			.then(res => {
				if (res.status === 1) {
					navigate("/DetailProposal");
				}
			}).catch(err => console.log(err));
	}
	const editItem = (e, item) => {
		e.preventDefault();
		console.log(item);
		setItemId(item.id);
		setItemTitle(item.itemTitle);
		setItemUin(item.itemHsnCsnUin);
		setItemDescription(item.itemDescription);
		setItemQty(item.itemQuantity);
		itemForm.current['ItemHsnCsnUin'].value = item.itemHsnCsnUin;
		itemForm.current['ItemTitle'].value = item.itemTitle;
		itemForm.current['ItemDescription'].value = item.itemDescription;
		itemForm.current['ItemQuantity'].value = item.itemQuantity;

	}
	const editTerms = (e, term) =>
	{
		e.preventDefault();
		document.getElementById("SingleTermBtn").click();
		console.log(term);
		setTermId(term.id);
		setTermTitle(term.termTitle);
		setTermText(term.termTxt);
		termForm.current['TermTitle'].value = term.termTitle;
		termForm.current['TermTxt'].value = term.termTxt;
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
	const deleteAction = (url) => {
		deleteRequest(url, UserProfile.getToken()).then(x => x.json()).then(res => {
			setMsg("Deleted successfully");
			loadItemList(proposalId);
			loadTermList(proposalId);
		}).catch(err => console.log(err));
	}

	return (<>
		<div className="scrollable-section">
			<MessageDisplay msg={msg} setMsg={setMsg} />
			<DeleteItemConfirmation msg={deleteMsg} setMsg={setDeleteMsg} action={deleteAction} data={deleteData} />
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
							<div className="form-group" style={{ textAlign: 'left' }}>
								<label style={{ fontsize: '20px', color: 'black', fontWeight: '700' }} >Terms</label>
								<select name="termsDD" className="form-control"
									value={termDropDownId} onChange={(e) => {
										e.preventDefault();
										setLDData(e.target.value);
									}}>
									<option value={0}>-Select-</option>
									{propsalTermOptions && propsalTermOptions.length > 0 ?
										propsalTermOptions.map(x => <option value={x.id} >{x.typeValue}
										</option>) :
										<></>}
								</select>
							</div>
						</div>
						<div className="col-md-2">
							<InputNumberField name="ProposalLdPercent" type="text" label="LD Percent" value={termLDPercent} />
						</div>
						<div className="col-md-2">
							<InputNumberField name="ProposalLdAppliedAfterDays" type="text" label="LD duration" value={termLDDays} />
						</div>
						<div className="col-md-3">
							<InputNumberField name="ProposalCompletionInDays" type="text" label="Completion (in days)" value={proposalCompletion} />
						</div>
						<div className="col-md-3">
						<br/>
							<FormSubmitButton name={proposalId > 0 ? "Edit Proposal" : "Save New Proposal"} />
						</div>
					</div>
				</Form>
			</div>
			{proposalId>0?
			<div className="table">
				<Form ref={itemForm} onSubmit={handleSubmitAddItem}>
					<div className="row">
						<div className="col-md-2">
							<div className="form-group" style={{ textAlign: 'left' }}>
								<label style={{ fontsize: '20px', color: 'black', fontWeight: '700' }} >Items</label>
								<select name="TypeName" className="form-control"
										value={itemDropDownId} onChange={(e) => {
										e.preventDefault();
										setItemData(e.target.value);
									}}>
										<option value={0}>-Select-</option>
										{propsalItemOptions && propsalItemOptions.length > 0 ?
											propsalItemOptions.map(x => <option value={x.id} >{x.typeValue}
										</option>) :
										<></>}
								</select>
							</div>
							</div>
							<div className="col-md-2">
								<InputField name="ItemHsnCsnUin" type="text" label="Code" value={itemUin} />
						</div>
							<div className="col-md-2">
								<InputField name="ItemTitle" type="text" label="Item Title" value={itemTitle} />
						</div>
							<div className="col-md-2">
								<InputField name="ItemDescription" type="text" label="Description" value={ itemDescription} />
							</div>
							<div className="col-md-2">
								<InputNumberField name="ItemQuantity" type="text" label="Quantity" value={itemQty} />
							</div>
					</div>
					<div className="row">
							<div className="offset-md-8 col-md-4" style={{ textAlign: "right" }}>
								<FormSubmitButton name={itemId > 0 ? "Edit Item" : "Save New Item"} />
						</div>
					</div>
					</Form>
					<div className="table" style={{ textAlign: "left" }}>
					<h3>Item List</h3>
						<div className="d-none d-md-block">
							<div className="row tableHeader">
								<div className="col-md-2 ">
									Code
								</div>
								<div className="col-md-2 ">
									Title
								</div>
								<div className="col-md-3 ">
									Description
								</div>
								<div className="col-md-3 ">
									Quantity
								</div>

								<div className="col-md-2 " style={{ textAlign: "center" }}>
									Actions
								</div>
							</div>
						</div>
						{itemList && itemList.length > 0 ? itemList.map(x => < div className="row tablebox">
							<div className="col-md-2 d-flex align-items-center">
								<span>
									<strong className="d-inline d-md-none">Type: </strong>
									{x.itemHsnCsnUin}</span>
							</div>
							<div className="col-md-2 d-flex align-items-center">
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
							<div className="col-md-3 d-flex align-items-center">
								<span>
									<strong className="d-inline d-md-none">LD Percent: </strong>
									{x.itemQuantity}</span>
							</div>
							<div className="col-md-2" style={{ textAlign: "center" }}>
								<span>
									<FormButton name="Edit" onClick={(e) => { editItem(e, x) }} />
									<span className="removeLink" onClick={(e) => {
										e.preventDefault();
										setDeleteMsg("Are you sure you want to delete the item ?");
										setDeleteData("api/Business/DeleteRFQItem?itemId=" + x.id);
									}}> Remove </span>
								</span>

								{/*<FormButton name="Remove"  />*/}
							</div>
						</div>) : <>No Item Is Present.</>}

					</div>
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
						<h3>Term List</h3>
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
						{termList && termList.length > 0 ? termList.map(x => < div className="row tablebox">
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
										</a> <span className="removeLink" onClick={(e) => {
											e.preventDefault();
											setDeleteMsg("Are you sure you want to delete the attachment ?");
											setDeleteData("api/Business/DeleteRFQTermAttachment?attachId=" + i.id);
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
										setDeleteData("api/Business/DeleteRFQTerm?termId="+x.id);
									}}> Remove </span>
								</span>
							</div>
						</div>) : <>No Item Is Present.</>}

					</div>
			</div>
				: <></>}
			
		</div>
	</>);
};
export default RFQApplication;