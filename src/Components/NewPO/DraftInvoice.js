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

const DraftInvoice = () => {
	const addInvoiceForm = useRef(null);
	const navigate = useNavigate();
	const [msg, setMsg] = useState("");
	const [agreementObj, setAgreementObj] = useState();
	const [itemList, setItemList] = useState([]);
	const [activeFormList, setActiveFormList] = useState();

	useEffect(() => {
		if (UserProfile.getLoginStatus() === 1) {
			navigate("/Home");
		}
		if (OtherData.getData() !== "" && OtherData.getData().length > 0) {
			var obj = JSON.parse(OtherData.getData());
			console.log(obj);
			setAgreementObj(obj);
			loadItemList(obj.id);
		}

	}, []);
	const loadItemList = (agreementId) => {
		getRequest("api/Business/GetAgreementItems?agreementid=" + agreementId, UserProfile.getToken()).then(x => x.json()).then(res => {
			console.log(res);
			setItemList(res.data);
			var activeLst = [];
			for (var i = 0; i < res.data.length; i++) {
				activeLst.push(true);
			}
			setActiveFormList(activeLst);
		}).catch(err => console.log(err));
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		var postBody = {

			Id: 0,
			ContractId: agreementObj.id,
			InvoiceNote: addInvoiceForm.current['InvoiceNote'].value,
			ItemList: []

		};
		for (var i = 0; i < itemList.length; i++) {
			console.log(addInvoiceForm.current['itemChkBox' + itemList[i].id].checked);
			if (addInvoiceForm.current['itemChkBox' + itemList[i].id].checked === true)
			{
				postBody.ItemList.push({
					Id: 0,
					AgItemId: itemList[i].id,
					InvoiceId: 0,
					QuantityDelivered: Number(addInvoiceForm.current['QuantityDelivered' + itemList[i].id].value),
					Rate: Number(addInvoiceForm.current['Rate' + itemList[i].id].value),
					Note: addInvoiceForm.current['Note' + itemList[i].id].value,
				});
			}
			
		}
		
		console.log(postBody);
		sendPostRequest("api/Business/MakeInvoice", UserProfile.getToken(), postBody).then(r => r.json()).then(res => {
			console.log(res);
			if (res.status === 1) {
				navigate("/DetailContract");
			} else {
				setMsg("Not able to save data");
			}

		}).catch(err => {
			console.log(err);
		});

	};
	const publishContract = (e) =>
	{
		e.preventDefault();
		var postBody = {

			Id: 0,
			ContractId: agreementObj.id,
			InvoiceNote: addInvoiceForm.current['InvoiceNote'].value,
			ItemList: []

		};
		for (var i = 0; i < itemList.length; i++) {
			console.log(addInvoiceForm.current['itemChkBox' + itemList[i].id].checked);
			if (addInvoiceForm.current['itemChkBox' + itemList[i].id].checked === true) {
				postBody.ItemList.push({
					Id: 0,
					AgItemId: itemList[i].id,
					InvoiceId: 0,
					QuantityDelivered: Number(addInvoiceForm.current['QuantityDelivered' + itemList[i].id].value),
					Rate: Number(addInvoiceForm.current['Rate' + itemList[i].id].value),
					Note: addInvoiceForm.current['Note' + itemList[i].id].value,
				});
			}

		}

		console.log(postBody);
		sendPostRequest("api/Business/MakeInvoice", UserProfile.getToken(), postBody).then(r => r.json()).then(res => {
			console.log(res);
			if (res.status === 1) {
				getRequest("api/Business/PublishInvoice?invId=" + res.id, UserProfile.getToken()).then(r => r.json()).then(res => {
					if (res.status === 1) {
						navigate("/DetailContract");
					}
					else {
						setMsg("Invoice created but not able to publish it");
					}
				}).catch(err => console.log(err));
				
				
			} else {
				setMsg("Not able to save data");
			}

		}).catch(err => {
			console.log(err);
		});
	}


	return (<>
		<div className="scrollable-section">
			<MessageDisplay msg={msg} setMsg={setMsg} />

			{agreementObj && agreementObj.id && agreementObj.id > 0 ?
				<div>
					<div className="table">
						<div className="row">
							<div className="col-md-1">
								<FormButton name="Back" onClick={(e) => {
									e.preventDefault();
									navigate("/DetailContract");
								}} />
							</div>
							<div className="col-md-11">
								<h4 style={{ color:"#007bff" }}>
								Raise invoice
								</h4>
							</div>
						</div>
						<Form ref={addInvoiceForm} onSubmit={handleSubmit}>

							<div className="row">

								<div className="col-md-12">
									<InputField name="InvoiceNote" type="text" label="Note" />

								</div>
							</div>

							<div className="table" style={{ textAlign: "left" }}>
								<h4 style={{ color: "#007bff" }}>Item List</h4>
								<div className="d-none d-md-block">
									<div className="row tableHeader">
										<div className="col-md-1 ">
											Select
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
								{itemList && itemList.length > 0 ? itemList.map((x,ind) => < div className="row tablebox">
									<div className="col-md-1 d-flex align-items-center">
										<InputField type="checkbox" name={"itemChkBox" + x.id} onChange={() => {
											if (addInvoiceForm.current['itemChkBox' + x.id].checked === true) {
												var activLst = [...activeFormList];
												activLst[ind] = false;
												setActiveFormList(activLst);
											} else
											{
												var activLst = [...activeFormList];
												activLst[ind] = true;
												setActiveFormList(activLst);
											}
										}} />
									</div>
									<div className="col-md-1 d-flex align-items-center">
										<span>
											<strong className="d-inline d-md-none">Description: </strong>
											{x.itemTitle}</span>
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
									<div className="col-md-1 d-flex align-items-center" >
										<InputNumberField name={"QuantityDelivered" + x.id} type="decimal" label="Delivered Qty" readOnlyValue={activeFormList[ind]} />
									</div>
									<div className="col-md-2 d-flex align-items-center">
										<InputNumberField name={"Rate" + x.id} type="decimal" label="Proposed Rate" value={x.sellerRate} readOnlyValue={activeFormList[ind]} />
										{x.currency}/{x.unit}
									</div>
									<div className="col-md-3 d-flex align-items-center">
										<InputField name={"Note" + x.id} type="decimal" label="Note" readOnlyValue={activeFormList[ind]} />
									</div>
									
								</div>) : <>No Item Is Present.</>}

							</div>
							<div className="row">
								<div className="offset-md-8 col-md-4" style={{ textAlign: "right" }}>
									<FormSubmitButton name="Save Invoice" />
									<FormButton name="Publish Invoice" onClick={e=>publishContract(e)} />
								</div>
							</div>
						</Form>
					</div>

				</div>
				: <>Loading Data</>}

		</div>
	</>);
};
export default DraftInvoice;