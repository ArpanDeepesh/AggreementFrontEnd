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

const EditInvoice = () => {
	const addInvoiceForm = useRef(null);
	const navigate = useNavigate();
	const [msg, setMsg] = useState("");
	const [invoiceObj, setInvoiceObj] = useState();
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
			setInvoiceObj(obj.Invoice);
			setAgreementObj(obj.Agreement);
			/*loadItemList(obj.id);*/
		}

	}, []);
	const loadItemList = (agreementId) => {
		getRequest("api/Business/GetAgreementItems?agreementid=" + agreementId, UserProfile.getToken()).then(x => x.json()).then(res => {
			console.log(res);
			setItemList(res.data);
		}).catch(err => console.log(err));
	}
	const loadInvoiceItemList = (agreementId) => {
		getRequest("api/Business/GetAgreementItems?agreementid=" + agreementId, UserProfile.getToken()).then(x => x.json()).then(res => {
			console.log(res);
			setItemList(res.data);
		}).catch(err => console.log(err));
	}
	const saveInvoiceNote = () => {
		var postBody = {

			Id: invoiceObj.id,
			ContractId: agreementObj.id,
			InvoiceNote: addInvoiceForm.current['InvoiceNote'].value,
			ItemList: []
		};
		sendPostRequest("api/Business/UpdateInvoice", UserProfile.getToken(), postBody).then(r => r.json()).then(res => {
			if (res.status === 1) {
				setMsgDis("Data updated successfully.");
			} else
			{
				setMsg("Not able to update data");
			}
		}).catch(er => console.log(er));
	}
	const saveInvoiceItem = () => {
		var postBody = {
			Id: item.id,
			AgItemId: item.agItemId,
			InvoiceId: invoiceObj.id,
			QuantityDelivered: Number(addInvoiceForm.current['QuantityDelivered'].value),
			Rate: Number(addInvoiceForm.current['Rate'].value),
			Note: addInvoiceForm.current['Note' ].value,
		};
		console.log(postBody);
		sendPostRequest("api/Business/UpdateInvoiceItem", UserProfile.getToken(), postBody).then(r => r.json()).then(res => {
			if (res.status === 1) {
				setItem();
				resetItemForm();
				OtherData.setData(JSON.stringify(agreementObj));
				navigate("/DetailContract");
			} else {
				setMsg("Not able to update data");
			}
		}).catch(er => console.log(er));

	}
	const resetItemForm = () => {
		addInvoiceForm.current["QuantityDelivered"].value = 0;
		addInvoiceForm.current["Rate"].value = 0;
		addInvoiceForm.current["Note"].value = "";
	}
	const publishContract = (e) => {
		e.preventDefault();
		getRequest("api/Business/PublishInvoice?invId=" + invoiceObj.id, UserProfile.getToken()).then(r => r.json()).then(res => {
			if (res.status === 1) {
				OtherData.setData(JSON.stringify(agreementObj));
				navigate("/DetailContract");
			}
			else {
				setMsg("Invoice created but not able to publish it");
			}
		}).catch(err => console.log(err));
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		var postBody = {

			Id: 0,
			ContractId: invoiceObj.id,
			InvoiceNote: addInvoiceForm.current['InvoiceNote'].value,
			ItemList: []

		};
		for (var i = 0; i < itemList.length; i++) {
			console.log(addInvoiceForm.current['itemChkBox' + itemList[i].id].checked);
			if (addInvoiceForm.current['itemChkBox' + itemList[i].id].checked === true)
			{
				postBody.ItemList.push();
			}
			
		}
		
		console.log(postBody);
		sendPostRequest("api/Business/MakeInvoice", UserProfile.getToken(), postBody).then(r => r.json()).then(res => {
			console.log(res);
			if (res.status === 1) {
				OtherData.setData(JSON.stringify(agreementObj));
				navigate("/DetailContract");
			} else {
				setMsg("Not able to save data");
			}

		}).catch(err => {
			console.log(err);
		});

	};
	const editItem = (i) => {
		setItem(i);
		addInvoiceForm.current["QuantityDelivered"].value =  i.itemQuantityDelivered;
		addInvoiceForm.current["Rate"].value = i.itemProposedRate;
		addInvoiceForm.current["Note"].value = i.inoviceItemNote;
	}


	return (<>
		<div className="main-content">
			<DisappearingMessage msg={msgDis} setMsg={setMsgDis} />
			<MessageDisplay msg={msg} setMsg={setMsg} />
			{invoiceObj && invoiceObj.id && invoiceObj.id > 0 ?
				<div>
					<div className="table">
						<div className="row">
							<div className="col-md-1">
								<FormButton name="Back" onClick={(e) => {
									e.preventDefault();
									OtherData.setData(JSON.stringify(agreementObj));
									navigate("/DetailContract");
								}} />
							</div>
							<div className="col-md-11">
								<h4 style={{ color: "#007bff" }}>
									Edit invoice
								</h4>
							</div>
						</div>
						<Form ref={addInvoiceForm} onSubmit={handleSubmit}>

							<div className="row">
								<div className="col-md-8">
									<InputField name="InvoiceNote" type="text" label="Note" value={invoiceObj.invoiceNote} />

								</div>
								<div className="col-md-4">
									<br />
									<FormButton name="Save Invoice Note" onClick={e => {
										e.preventDefault();
										saveInvoiceNote();
									}} />

								</div>
							</div>
							<div className="row">
								<div className="col-md-3" >

									<InputNumberField name="QuantityDelivered" type="decimal" label="Delivered Qty" />
								</div>
								<div className="col-md-3">

									<InputNumberField name="Rate" type="decimal" label="Proposed Rate" />

								</div>
								<div className="col-md-3">
									<InputField name="Note" type="decimal" label="Note" />
								</div>
								<div className="col-md-3">
								<br/>
									<FormButton name="Save Invoice Item" onClick={e => {
										e.preventDefault();
										saveInvoiceItem();
									}} />
								</div>

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
											Delivered
										</div>
										<div className="col-md-2 ">
											Rate
										</div>
										<div className="col-md-3 ">
											Note
										</div>
										
									</div>
								</div>
								{invoiceObj.itemList && invoiceObj.itemList.length > 0 ? invoiceObj.itemList.map((x,ind) => < div className="row tablebox">
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
											{x.itemQuantityDelivered}</span>
									</div>
									<div className="col-md-1 d-flex align-items-center">
										<span>
											<strong className="d-inline d-md-none">Rate: </strong>
											{x.itemProposedRate}</span>
									</div>
									<div className="col-md-2 d-flex align-items-center">
										<span>
											<strong className="d-inline d-md-none">Quanityt: </strong>
											{x.inoviceItemNote}</span>
	
									</div>
									<div className="col-md-2 d-flex align-items-center">
										<FormButton name="Edit" onClick={e => {
											e.preventDefault();
											editItem(x);
										}} />
										<span className="removeLink" onClick={(e) => {
											e.preventDefault();
											
										}}> Remove </span>
									</div>
									
								</div>) : <>No Item Is Present.</>}
								<div className="row">
									<div className="offset-md-8 col-md-4" style={{ textAlign: "right" }}>
										<FormButton name="Publish Invoice" onClick={e => publishContract(e)} />
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
export default EditInvoice;