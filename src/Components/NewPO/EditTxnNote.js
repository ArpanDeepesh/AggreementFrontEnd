import "./DraftAgreement.css";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputField from "../FormParts/InputField";
import FormSubmitButton from "../FormParts/FormSubmitButton";
import { sendPostRequest, getRequest, getRequestAllowAll, deleteRequest } from "../Services/ContrectBackendAPI";
import UserProfile from "../Context/UserProfile";
import { useState } from "react";
import MessageDisplay from "../CommonPages/MessageDisplay";
import InputNumberField from "../FormParts/InputNumberField";
import OtherData from "../Context/OtherData";
import FormButton from "../FormParts/FormButton";
import DisappearingMessage from "../CommonPages/DisappearingMessage";

const EditTxnNote = () => {
	const addInvoiceForm = useRef(null);
	const navigate = useNavigate();
	const [msg, setMsg] = useState("");
	const [txnNoteObj, setTxnNoteObj] = useState();
	const [agreementObj, setAgreementObj] = useState();
	const [itemList, setItemList] = useState([]);
	const [msgDis, setMsgDis] = useState("");
	const [item, setItem] = useState();

	useEffect(() => {
		if (UserProfile.getLoginStatus() === 1) {
			navigate("/Home");
		}
		if (OtherData.getData() !== "" && OtherData.getData().length > 0) {
			var obj = JSON.parse(OtherData.getData());
			console.log(obj);
			setTxnNoteObj(obj.Note);
			setAgreementObj(obj.Agreement);

			/*loadItemList(obj.id);*/
		}

	}, []);
	const loadInvoiceItemList = (agreementId) => {
		getRequest("api/Business/GetAgreementItems?agreementid=" + agreementId, UserProfile.getToken()).then(x => x.json()).then(res => {
			console.log(res);
			setItemList(res.data);
		}).catch(err => console.log(err));
	}
	const saveTransactionNote = () => {
		var postBody = {

			Id: txnNoteObj.id,
			PanalityPercent: addInvoiceForm.current['PanalityPercent'].value,
			NoteRemark: addInvoiceForm.current['Note'].value
		};
		sendPostRequest("api/Business/UpdateTxnNote", UserProfile.getToken(), postBody).then(r => r.json()).then(res => {
			if (res.status === 1) {
				setMsgDis("Data updated successfully.");
				reloadTxnNote(txnNoteObj.id);
			} else
			{
				setMsg("Not able to update data");
			}
		}).catch(er => console.log(er));
	}
	const saveInvoiceItem = () => {
		var postBody = {
			Id: item.id,
			DefectedCount: Number(addInvoiceForm.current['DefectCount'].value),
			Rate: Number(addInvoiceForm.current['BuyerRate'].value),
		};
		console.log(postBody);
		sendPostRequest("api/Business/UpdateTxnNoteItem", UserProfile.getToken(), postBody).then(r => r.json()).then(res => {
			if (res.status === 1) {
				reloadTxnNote(txnNoteObj.id);
				resetItemForm();
				setMsgDis("Tansaction Updated");
			} else {
				setMsg("Not able to update data");
			}
		}).catch(er => console.log(er));

	}
	const resetItemForm = () => {
		setItem();
		addInvoiceForm.current["SellerRate"].value = 0;
		addInvoiceForm.current["BuyerRate"].value = 0;
		addInvoiceForm.current["DefectCount"].value = 0;
	}
	const publishContract = (e) => {
		e.preventDefault();
		getRequest("api/Business/PublishTxnNote?txnNoteId=" + txnNoteObj.id, UserProfile.getToken()).then(r => r.json()).then(res => {
			if (res.status === 1) {
				OtherData.setData(JSON.stringify(agreementObj));
				navigate("/DetailContract");
			}
			else {
				setMsg("Invoice created but not able to publish it");
			}
		}).catch(err => console.log(err));
	}

	const reloadTxnNote = (txnNoteId) => {
		getRequest("api/Business/GetTxnNote?txnNoteId=" + txnNoteId, UserProfile.getToken()).then(r => r.json()).then(res => {
			if (res.status === 1) {
				setTxnNoteObj(res.data);
			} else
			{
				setMsg("Not able to load transaction note");
			}
		}).catch(err => console.log(err));
	}
	const editItem = (i) => {
		setItem(i);
		addInvoiceForm.current["SellerRate"].value = i.sellerProposedRate;
		addInvoiceForm.current["BuyerRate"].value = i.buyerProposedRate;
		addInvoiceForm.current["DefectCount"].value = i.defectedCount;
	}


	return (<>
		<div className="scrollable-section">
			<DisappearingMessage msg={msgDis} setMsg={setMsgDis} />
			<MessageDisplay msg={msg} setMsg={setMsg} />
			{txnNoteObj && txnNoteObj.id && txnNoteObj.id > 0 ?
				<div>
					<div className="table">
						<Form ref={addInvoiceForm} >

							<div className="row">
								<div className="col-md-4">

									<InputNumberField name="PanalityPercent" type="decimal" label="Panality Percent" value={txnNoteObj.panalityPercent}/>

								</div>
								<div className="col-md-4">
									<InputField name="Note" type="text" label="Remark Note" value={txnNoteObj.noteRemark} />
								</div>
								<div className="col-md-4">
								<br/>
									<FormButton name="Save Note" onClick={e => {
										e.preventDefault();
										saveTransactionNote();
									}} />
								</div>

							</div>
							<div className="row">
								<div className="col-md-3">
									{item && item.id > 0 ? <>
										{item.itemHsnCsnUin}
										<br />
										{item.itemTitle}
										<br />
										{item.itemDescription}
										<br />
										{item.deliveredCount}
									</> : <>
											HSN Code
											<br />
											Title
											<br />
											Description
									</>}
									
								</div>
								<div className="col-md-2">

									<InputNumberField name="SellerRate" type="decimal" label="Seller Rate" readOnlyValue={true} />

								</div>
								<div className="col-md-2">

									<InputNumberField name="BuyerRate" type="decimal" label="Buyer Rate"  />

								</div>
								<div className="col-md-2">

									<InputNumberField name="DefectCount" type="decimal" label="Defect Count"  />

								</div>
								<div className="col-md-3">
									<br />
									<FormButton name="Save Item" onClick={e => {
										e.preventDefault();
										saveInvoiceItem();
									}} />
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
											Status
										</div>
										<div className="col-md-1 ">
											Buyer Rate
										</div>
										<div className="col-md-1 ">
											Seller Rate
										</div>
										<div className="col-md-3 ">
											Defect/Delivered
										</div>
										
									</div>
								</div>

								{txnNoteObj.itemList && txnNoteObj.itemList.length > 0 ? txnNoteObj.itemList.map((x,ind) => < div className="row tablebox">
									<div className="col-md-1 d-flex align-items-center">
										<span>
											<strong className="d-inline d-md-none">Code: </strong>
											{x.itemHsnCsnUin}</span>
									</div>
									<div className="col-md-1 d-flex align-items-center">
										<span>
											<strong className="d-inline d-md-none">Title: </strong>
											{x.itemTitle}</span>
									</div>
									<div className="col-md-3 d-flex align-items-center">
										<span>
											<strong className="d-inline d-md-none">Description: </strong>
											{x.itemDescription}</span>
									</div>
									<div className="col-md-1 d-flex align-items-center" >
										<span>
											<strong className="d-inline d-md-none">Quantity: </strong>
											{x.noteStatus}</span>
									</div>
									<div className="col-md-1 d-flex align-items-center" >
										<span>
											<strong className="d-inline d-md-none">Quantity: </strong>
											{x.buyerProposedRate}</span>
									</div>
									<div className="col-md-1 d-flex align-items-center">
										<span>
											<strong className="d-inline d-md-none">Rate: </strong>
											{x.sellerProposedRate}</span>
									</div>
									<div className="col-md-2 d-flex align-items-center">
										<span>
											<strong className="d-inline d-md-none">Quanityt: </strong>
											{x.defectedCount}</span>/{x.deliveredCount}
	
									</div>
									<div className="col-md-2 d-flex align-items-center">
										<FormButton name="Edit" onClick={e => {
											e.preventDefault();
											editItem(x);
										}} />
									</div>
									
								</div>) : <>No Item Is Present.</>}
								<div className="row">
									<div className="offset-md-8 col-md-4" style={{ textAlign: "right" }}>
										<FormButton name="Publish Transaction Note" onClick={e => publishContract(e)} />
									</div>
								</div>

							</div>
						</Form>
					</div>

				</div>
				: <>Loading Data</>}

		</div>
	</>);
};
export default EditTxnNote;