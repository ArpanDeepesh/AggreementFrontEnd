import "./MessageDisplay.css";
import { useRef } from "react";
import Form from "react-bootstrap/Form";
import InputField from "../FormParts/InputField";
import FormSubmitButton from "../FormParts/FormSubmitButton";
import { sendPostRequest, getRequest } from "../Services/ContrectBackendAPI";
import UserProfile from "../Context/UserProfile";
import AddAttachment from "../CommonPages/AddAttachment";
import { useState } from "react";
import InputNumberField from "../FormParts/InputNumberField"

const AgreementNegotiation = ({ reloadAction, type,data,setData}) => {

    const remarkForm = useRef(null);
	const [remarkMsg, setRemarkMsg] = useState("");
	const [displayForm, setDisplayForm] = useState(1);
	const [remarkAttachments, setRemarkAttachments] = useState([]);
    const closeModule = (e) => {
		e.preventDefault();
		reloadAction();
		setData();
		setRemarkMsg("");
		setDisplayForm(1);
		setRemarkAttachments([]);
		
	}
	const resetForm = () => {
		remarkForm.current["remarkText"].value = "";
		setRemarkAttachments([]);
	}
    const submitRemark = (e, id, type) => {
		e.preventDefault();
		console.log(data);
		if (type === "AA") {
			var formBody = {
				Id: 0,
				RemarkText: remarkForm.current["remarkText"].value,
				OwnerId: Number(UserProfile.getUserId()),
				ParentId: id,
				Attachments: remarkAttachments
			};
			sendPostRequest("api/Business/AcceptAgreement", UserProfile.getToken(), formBody).then(r => r.json()).then(res => {
				if (res.status == 1) {
					getRequest("api/Business/StartContract?agreementId=" + data.id, UserProfile.getToken()).then(r => r.json()).then(res => {
						if (res.status === 1) {
							setRemarkMsg("Contract started");
						} else
						{
							console.log("Not able to launch the contract");
						}
					}).catch(err => console.log(err));
				} else
				{
					console.log("Not able to save agreement launching remark");
				}
			}).catch(err => console.log(err));
			
			return;
		} else if (type === "AR") {

			sendPostRequest("api/Business/AcceptAgreement", UserProfile.getToken(), formBody).then(r => r.json()).then(res => {
				if (res.status == 1) {
					getRequest("api/Business/RejectAgreement?agreementId=" + data.id, UserProfile.getToken()).then(r => r.json()).then(res => {
						if (res.status === 1) {
							setRemarkMsg("Contract Rejected");
						} else {
							console.log("Not able to launch the contract");
						}
					}).catch(err => console.log(err));
				} else {
					console.log("Not able to save agreement launching remark");
				}
			}).catch(err => console.log(err));
			return;
		} else {

			var formBody = {
				Id: 0,
				RemarkText: remarkForm.current["remarkText"].value,
				OwnerId: Number(UserProfile.getUserId()),
				ParentId: id,
				Attachments: remarkAttachments
			};
			var url = "";
			if (type === "SAN" || type === "BAN") {
				url = "api/Business/NegotiateAgreement";
			} else if (type === "SIN" || type === "BIN") {
				url = "api/Business/NegotiateItem";
			} else if (type === "STSN" || type === "BTSN" || type === "STBN" || type === "BTBN") {
				url = "api/Business/NegotiateTerm";
			} else if (type === "SAA") {
				url = "api/Business/AcceptAgreement";
			} else if (type === "SIA" || type === "BIA") {
				url = "api/Business/AcceptItem";
			} else if (type === "BTSA" || type === "STBA") {
				url = "api/Business/AcceptTerm";
			} else if (type === "TISN" || type === "TIBN") {
				url = "api/Business/NegotiateTxnNoteItem";
			} else if (type === "TSN" || type === "TBN") {
				url = "api/Business/NegotiateTxnNote";
			} else if (type === "TSA" || type === "TBA") {
				url = "api/Business/AcceptTxnNote";
			} else if (type === "TISA" || type === "TIBA") {
				url = "api/Business/AcceptTxnNoteItem";
			} else if (type === "CTN")
			{
				url = "api/Business/CompleteTxnNote";
			}
			if (url !== "") {
				console.log(formBody);
				console.log(url);
				sendPostRequest(url, UserProfile.getToken(), formBody).then(r => r.json()).then(res => {
					if (res.status === 1) {
						var postBody = {};
						if (type === "SAN" || type === "BAN") {
							url = "api/Business/UpdateAgreement";
							postBody = {
								Id: data.id,
								Advance: remarkForm.current["advance"] ? remarkForm.current["advance"].value : data.advance,
								LDDays: remarkForm.current["LDDays"] ? remarkForm.current["LDDays"].value : data.ldDays,
								LDPercent: remarkForm.current["LDPercent"] ? remarkForm.current["LDPercent"].value : data.ldPercent,
								AgreementDuration: remarkForm.current["contractDuration"] ? remarkForm.current["contractDuration"].value : data.contractDuration
							};
							sendPostRequest(url, UserProfile.getToken(), postBody).then(x => x.json()).then(res => {
								if (res.status === 1) {
									setDisplayForm(0);
									setRemarkMsg("Status is changed successfully");
								}
							}).catch(err => { console.log(err) });
						}
						else if (type === "SIN" || type === "BIN") {
							url = "api/Business/UpdateAgreementRate";
							postBody = {
								Id: type === "SIN" ? data.sellerRateId : (type === "BIN" ? data.buyerRateId : 0),
								ItemId: data.itemId,
								ItemTax: 0,
								CompletionDays: remarkForm.current["itemCompletion"] ? remarkForm.current["itemCompletion"].value : data.ldPercent,
								RateType: type === "SIN" ? 2 : 3,
								Amount: remarkForm.current["amount"] ? remarkForm.current["amount"].value : type === "SIN" ? data.sellerRate : data.buyerRate,
								Currency: 0,
								SellingUnit: 0
							};
							console.log(postBody);
							sendPostRequest(url, UserProfile.getToken(), postBody).then(x => x.json()).then(res => {
								if (res.status === 1) {
									setDisplayForm(0);
									setRemarkMsg("Status is changed successfully");
								} else {
									console.log(res.status);
									console.log(res.message);
								}
							}).catch(err => { console.log(err) });
						}
						else if (type === "STSN" || type === "BTSN" || type === "STBN" || type === "BTBN") {
							url = "api/Business/AddAgreementTerm";
							postBody = {
								Id: data.id,
								TermTitle: remarkForm.current["termTitle"] ? remarkForm.current["termTitle"].value : data.termTitle,
								TermTxt: remarkForm.current["termTxt"] ? remarkForm.current["termTxt"].value : data.termTxt,
								TermTypeId: 0,
								TermRfpId: 0,
								Attachments: [],

							};
							sendPostRequest(url, UserProfile.getToken(), postBody).then(x => x.json()).then(res => {
								if (res.status === 1) {
									setDisplayForm(0);
									setRemarkMsg("Status is changed successfully");
								}
							}).catch(err => { console.log(err) });
						} else if (type === "TISN" || type === "TIBN") {
							url = "api/Business/UpdateTxnNoteItem";
							postBody = {
								Id: data.id,
								DefectedCount: remarkForm.current["DefectedCount"] ? remarkForm.current["DefectedCount"].value : data.termTitle,
								Rate: remarkForm.current["Rate"] ? remarkForm.current["Rate"].value : data.termTxt,

							};
							sendPostRequest(url, UserProfile.getToken(), postBody).then(x => x.json()).then(res => {
								if (res.status === 1) {
									setDisplayForm(0);
									setRemarkMsg("Status is changed successfully");
								}
							}).catch(err => { console.log(err) });
						} else if (type === "TSN" || type === "TBN") {
							url = "api/Business/UpdateTxnNote";

							postBody = {
								Id: data.id,
								PanalityPercent: remarkForm.current["PanalityPercent"] ? remarkForm.current["PanalityPercent"].value : data.panalityPercent,
								NoteRemark: remarkForm.current["NoteRemark"] ? remarkForm.current["NoteRemark"].value : data.noteRemark,

							};
							sendPostRequest(url, UserProfile.getToken(), postBody).then(x => x.json()).then(res => {
								if (res.status === 1) {
									setDisplayForm(0);
									setRemarkMsg("Status is changed successfully");
								}
							}).catch(err => { console.log(err) });
						}
						else {
							setRemarkMsg("Status is updated succesfully");
							setDisplayForm(0);
							resetForm();
						}
					}
					else {
						console.log(res.status);
						console.log(res.message);
					}
				}).catch(err => console.log(err));
			} else {
				console.log("Url is not present");
			}
		}
		
    }
	// SAN: seller agreement negotiation BAN: buyer agreement negotiation
	// SAA: seller agreement acceptance
	// SIN: seller Item negotiation BIN: buyer item negotiation
	// SIA: seller Item acceptance BIA: buyer item acceptance
	// STSN: seller term negotiation BTSN: buyer term negotiation
	// BTSA: buyer term acceptance
	// STBN: seller term negotiation BTBN: buyer term negotiation
	// STBA: seller term acceptance
	//TISN
	//TIBN
	//TSN
	//TBN
	//TSA
	//TISA
	return (
		<>
		{
				data && data.id !== 0 ? <div className={data.id === 0 ? "modalOverlay hidden" : "modalOverlay"}>

			<div className="modalContent" >
				<button className="closeButton" onClick={(e) => { closeModule(e) }}>X</button>
				<div className="row">
					<div className="col-md-12">
						{remarkMsg && remarkMsg.includes("Successfully") ?
							<span style={{ color: "green" }}>{remarkMsg}</span> : <span style={{ color: "red" }}>{remarkMsg}</span>}
					</div>
						</div>
						
						{displayForm === 1 ? <div>
							{type !== "TSA" && type !== "TBA" && type !== "CTN" && type !== "TSN" && type !== "TBN" ? <div className="row">
								<AddAttachment fileLinkList={remarkAttachments} setFileLinkList={setRemarkAttachments} />
							</div> :<></> }
							
							<Form ref={remarkForm} onSubmit={(e) => { e.preventDefault() }}>
								{type === "AA" || type === "AR" ? <>
									<div className="row">

										<div className="col-md-12">
											<InputField name="remarkText" label="Provide Remark" />
										</div>
										<div className="col-md-12">
											{type === "AA" ? "Are you sure you want to start the contract?" : ""}
											{type === "RA" ? "Are you sure you want to reject the contract?" : ""}
										</div>
										<div className="col-md-12">
											<FormSubmitButton name="Submit" onClick={(e) => { submitRemark(e, data.id, type) }} />
										</div>
									</div>
								</> : <></>}
								{type === "SAA" || type === "SIA" || type === "BIA" || type === "BTSA" || type === "STBA"
									|| type === "TISA" || type === "TIBA" || type === "TSA" || type === "TBA" || type === "CTN" ? <>
							<div className="row">

								<div className="col-md-12">
									<InputField name="remarkText" label="Provide Remark" />
								</div>
								<div className="col-md-12">
									{type === "SAA" ? "Are you sure you want to accept the agreement general terms? LD and Date of completion will be freeze after this" : ""}
											{type === "SIA" ? "Are you sure you want to accept the item rate? LD and Date of completion will be freeze after this" : ""}
											{type === "BIA" ? "Are you sure you want to accept the item rate? LD and Date of completion will be freeze after this" : ""}
											{type === "BTSA" ? "As seller are you sure that you want to accept the buyer terms?" : ""}
											{type === "STBA" ? "As buyer are you sure that you want to accept the seller terms?" : ""}
											{type === "TISA" || type === "TIBA" ? "Are you sure you want to accept the transaction note item?" : ""}
											{type === "TISA" || type === "TIBA" ? "Are you sure you want to accept the transaction note item?" : ""}
												{type === "TSA" || type === "TBA" ? "Are you sure you want to accept the transaction note?" : ""}
												{type === "CTN" ? "Are you sure you want to close the transaction note discussion?" : ""}
								</div>
								<div className="col-md-12">
											<FormSubmitButton name="Submit" onClick={(e) => { submitRemark(e, data.id, type) }} />
								</div>
							</div>
						</> : <></>}
						{type === "SAN" ? <>
							<div className="row">

								<div className="col-md-12">
									<InputField name="remarkText" label="Provide Remark" />
								</div>
								<div className="col-md-12">
									<InputNumberField name="advance" label="Advance" value={data.advance} />
								</div>
								<div className="col-md-12">
											<FormSubmitButton name="Submit" onClick={(e) => { submitRemark(e, data.id, type) }} />
								</div>
							</div>
								</> : <></>}
								{type === "TIBN" ? <>
									<div className="row">

										<div className="col-md-12">
											<InputField name="remarkText" label="Provide Remark" />
										</div>
										<div className="col-md-12">
											<InputNumberField name="DefectedCount" label="Defect Count" value={data.defectedCount} />
										</div>
										<div className="col-md-12">
											<InputNumberField name="Rate" label="Rate" value={data.buyerProposedRate} />
										</div>
										<div className="col-md-12">
											<FormSubmitButton name="Submit" onClick={(e) => { submitRemark(e, data.id, type) }} />
										</div>
									</div>
								</> : <></>}
								{type === "TISN" ? <>
									<div className="row">

										<div className="col-md-12">
											<InputField name="remarkText" label="Provide Remark" />
										</div>
										<div className="col-md-12">
											<InputNumberField name="DefectedCount" label="Defect Count" value={data.defectedCount} readOnlyValue={true} />
										</div>
										<div className="col-md-12">
											<InputNumberField name="Rate" label="Rate" value={data.sellerProposedRate} />
										</div>
										<div className="col-md-12">
											<FormSubmitButton name="Submit" onClick={(e) => { submitRemark(e, data.id, type) }} />
										</div>
									</div>
								</> : <></>}
								{type === "TBN" ? <>
									<div className="row">

										<div className="col-md-12">
											<InputField name="remarkText" label="Provide Remark" />
										</div>
										<div className="col-md-12">
											<InputNumberField name="NoteRemark" label="Remark" value={data.noteRemark} />
										</div>
										<div className="col-md-12">
											<InputNumberField name="PanalityPercent" label="Panality" value={data.panalityPercent} />
										</div>
										<div className="col-md-12">
											<FormSubmitButton name="Submit" onClick={(e) => { submitRemark(e, data.id, type) }} />
										</div>
									</div>
								</> : <></>}
								{type === "TSN" ? <>
									<div className="row">

										<div className="col-md-12">
											<InputField name="remarkText" label="Provide Remark" />
										</div>
										<div className="col-md-12">
											<InputField name="NoteRemark" label="Remark" value={data.noteRemark} readOnlyValue={true} />
										</div>
										<div className="col-md-12">
											<InputNumberField name="PanalityPercent" label="Panality" value={data.panalityPercent} readOnlyValue={true} />
										</div>
										<div className="col-md-12">
											<FormSubmitButton name="Submit" onClick={(e) => { submitRemark(e, data.id, type) }} />
										</div>
									</div>
								</> : <></>}
						{type === "BAN" ? <>
							<div className={type === "BAN" ? "row" : "d-none"}>

								<div className="col-md-12">
									<InputField name="remarkText" label="Provide Remark" />
								</div>
								<div className="col-md-12">
									<InputNumberField name="LDPercent" label="LD Percent" value={data.ldPercent} />
								</div>
								<div className="col-md-12">
									<InputNumberField name="LDDays" label="LD Days" value={data.ldDays} />
								</div>
								<div className="col-md-12">
									<InputNumberField name="contractDuration" label="Contract duration" value={data.contractDuration} />
								</div>
								<div className="col-md-12">
											<FormSubmitButton name="Submit" onClick={(e) => { submitRemark(e, data.id, type) }} />
								</div>
							</div>
						</> : <></>}

						{type === "SIN" ? <>
							<div className={type === "SIN" ? "row" : "d-none"}>
										<div className="col-md-12">
											<span>Buyer Rate: {data.buyerRate} {data.currency}/{data.unit} and item Completed in {data.buyerItemCompletion} days</span>
									<InputField name="remarkText" label="Provide Remark" />
								</div>
								<div className="col-md-12">
									<InputNumberField name="amount" label="Seller Rate" value={data.sellerRate} />
								</div>
								<div className="col-md-12">
									<InputNumberField name="itemCompletion" label="Seller completion in days" value={data.sellerItemCompletion} />
								</div>
								<div className="col-md-12">
											<FormSubmitButton name="Submit" onClick={(e) => { submitRemark(e, data.id, type) }} />
								</div>
							</div>
						</> : <></>}

						{type === "BIN" ? <>
									<div className={type === "BIN" ? "row" : "d-none"}>
										<div className="col-md-12">
											<span>Seller Rate: {data.sellerRate} {data.currency}/{data.unit} and item Completed in {data.sellerItemCompletion} days</span>
											<InputField name="remarkText" label="Provide Remark" />
									</div>
									<div className="col-md-12">
											
										<InputNumberField name="amount" label="Seller Rate" value={data.buyerRate} />
									</div>
									<div className="col-md-12">
										<InputNumberField name="itemCompletion" label="Buyer completion in days" value={data.buyerItemCompletion} />
									</div>
									<div className="col-md-12">
												<FormSubmitButton name="Submit" onClick={(e) => { submitRemark(e, data.id, type) }} />
									</div>
								</div>
						</> : <></>}

						{type === "STSN" ? <>
						<div className={type === "STSN" ? "row" : "d-none"}>
										<div className="col-md-12">
									<InputField name="remarkText" label="Provide Remark" />
								</div>
								<div className="col-md-12">
									<InputField name="termTitle" label="Title" value={data.termTitle} />
								</div>
								<div className="col-md-12">
									<InputField name="termTxt" label="Seller completion in days" value={data.termTxt} />
								</div>
								<div className="col-md-12">
											<FormSubmitButton name="Submit" onClick={(e) => { submitRemark(e, data.id, type) }} />
								</div>
							</div>
						</> : <></>}

						{type === "BTSN" ? <>
							<div className={type === "BTSN" ? "row" : "d-none"}>
								<div className="col-md-12">
									<InputField name="remarkText" label="Provide Remark" />
								</div>
								<div className="col-md-12">
									Title:{data.termTitle}
									<br />
									Description:{data.termTxt}
								</div>
								<div className="col-md-12">
											<FormSubmitButton name="Submit" onClick={(e) => { submitRemark(e, data.id, type) }} />
								</div>
							</div>
						</> : <></>}

						{type === "BTBN" ? <>
							<div className={type === "BTBN" ? "row" : "d-none"}>
								<div className="col-md-12">
									<InputField name="remarkText" label="Provide Remark" />
								</div>
								<div className="col-md-12">
									<span>{data.buyerRate} {data.currency}/{data.unit}</span>
									<InputField name="termTitle" label="Title" value={data.termTitle} />
								</div>
								<div className="col-md-12">
									<InputField name="termTxt" label="Seller completion in days" value={data.termTxt} />
								</div>
								<div className="col-md-12">
											<FormSubmitButton name="Submit" onClick={(e) => { submitRemark(e, data.id, type) }} />
								</div>
							</div>
						</> : <></>}

						{type === "STBN" ? <>
							<div className={type === "STBN" ? "row" : "d-none"}>
								<div className="col-md-12">
									<InputField name="remarkText" label="Provide Remark" />
								</div>
								<div className="col-md-12">
									Title:{data.termTitle}
									<br />
									Description:{data.termTxt}
								</div>
								<div className="col-md-12">
											<FormSubmitButton name="Submit" onClick={(e) => { submitRemark(e, data.id, type) }} />
								</div>
							</div>
						</> : <></>}

					</Form>
					
				</div> : <></>}
			</div>
				</div> : <></>}
		</>
		
		);
};

export default AgreementNegotiation;