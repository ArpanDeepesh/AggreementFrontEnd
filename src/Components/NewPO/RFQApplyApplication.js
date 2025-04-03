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

const RFQApplyApplication = () => {
	const termForm = useRef(null);
	const proposalForm = useRef(null);
	const navigate = useNavigate();
	const [msg, setMsg] = useState("");
	const [msgType, setMsgType] = useState("");
	const [proposalObj, setProposalObj] = useState();
	const [propsalTermOptions, setProposalTermOptions] = useState([]);
	const [agreementId, setAgreementId] = useState(0);
	//item section setBuyerTermList
	const [itemList, setItemList] = useState([]);


	const [itemCurrencyOption, setItemCurrencyOptions] = useState([]);
	const [itemUnitOption, setItemUnitOptions] = useState([]);

	useEffect(() => {
		if (UserProfile.getLoginStatus() === 1) {
			navigate("/Home");
		}

		if (OtherData.getData()!=="" && OtherData.getData().length > 0)
		{
			var obj = JSON.parse(OtherData.getData());
			console.log(obj);
			setProposalObj(obj);
			getRequest("api/Business/CheckAgreementExist?proposalId=" + obj.id, UserProfile.getToken()).then(r => r.json())
			.then(res => {
				if (res.status === 1) {
					OtherData.setData(JSON.stringify(res.data));
					navigate("/draftAgreement");
				} else {
					getRequest("api/General/UserTermDropDown?typeName=Seller", UserProfile.getToken()).then(x => x.json()).then(res => {
						if (res.status === 1) {
							setProposalTermOptions(res.data);
						}
					}).catch(err => console.log(err));

					getRequestAllowAll("api/General/UnitList").then(x => x.json()).then(res => {
						if (res.status === 1) {
							setItemUnitOptions(res.data);
						}
					}).catch(err => console.log(err));
					getRequestAllowAll("api/General/CurrencyList").then(x => x.json()).then(res => {
						if (res.status === 1) {
							setItemCurrencyOptions(res.data);
						}
					}).catch(err => console.log(err));
					loadItemList(obj.id);
				}
			}).catch(err => console.log(err));
		}
		
		
	}, []);
	const loadItemList = (pid) => {
		getRequest("api/Business/RFQItemListForBuyer?proposalId="+pid, UserProfile.getToken()).then(x => x.json()).then(res => {
			console.log(res);
			setItemList(res.data);
		}).catch(err => console.log(err));
	}
	const validateRFQApplicationForm = () => {
		var advance = proposalForm.current['Advance'].value;
		if (advance === "")
		{
			setMsg("Advance is required. It can be 0.")
			setMsgType("Error");
			return false;
		}
		if (itemList.length === 0)
		{
			setMsg("You need to provide rate for atleast 1 item");
			setMsgType("Error");
			return false;
		}
		return true;

	}
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!validateRFQApplicationForm())
		{
			return;
		}
		var postBody = {
			ProposalId: proposalObj.id && proposalObj.id > 0 ? proposalObj.id :0,
			Advance:Number( proposalForm.current['Advance'].value),
			SellerRates: []
		};
		for (var i = 0; i < itemList.length; i++) {
			if (itemList[i].sellerRate > 0)
			{
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
				getRequest("api/Business/GetUserAgreementDetail?agreementId=" + res.id, UserProfile.getToken())
					.then(r => r.json()).then(res => {
						OtherData.setData(JSON.stringify(res.data));
						navigate("/draftAgreement");
					}).catch(err => console.log(err));
			} else {
				setMsg("Not able to save data");
				setMsgType("Error");
			}

		}).catch(err => {
			console.log(err);
		});
		
	};

	const editOrAddRate = (e, item) => {
		e.preventDefault();
		if (item.sellerRate && item.sellerRate > 0)
		{
			proposalForm.current["sellerRate" + item.id].value = item.sellerRate;
			proposalForm.current["sellerCurrency" + item.id].value = item.sellerCurrency;
			proposalForm.current["sellerUnit" + item.id].value = item.sellerUnit;
			proposalForm.current["sellerTax" + item.id].value = item.sellerTax;
			proposalForm.current["sellerDaysToComplete" + item.id].value = item.sellerDaysToComplete;
		}
		document.getElementById("editRate" + item.id).style.display = "inline";
		document.getElementById("displayRate" + item.id).style.display = "none";
		document.getElementById("editBtn" + item.id).style.display = "none";
		document.getElementById("saveBtn" + item.id).style.display = "inline";
	}
	const saveItemRate = (e, item) => {
		e.preventDefault();
		document.getElementById("editRate" + item.id).style.display = "none";
		document.getElementById("displayRate" + item.id).style.display = "inline";
		document.getElementById("editBtn" +item.id).style.display = "inline";
		document.getElementById("saveBtn" + item.id).style.display = "none";
		var oldItemList = [...itemList];
		for (var i = 0; i < oldItemList.length; i++) {
			if (oldItemList[i].id === item.id)
			{
				oldItemList[i].sellerRate = proposalForm.current["sellerRate" + item.id].value;
				oldItemList[i].sellerCurrency = proposalForm.current["sellerCurrency" + item.id].value;
				oldItemList[i].sellerUnit = proposalForm.current["sellerUnit" + item.id].value;
				oldItemList[i].sellerTax = proposalForm.current["sellerTax" + item.id].value;
				oldItemList[i].sellerDaysToComplete = proposalForm.current["sellerDaysToComplete" + item.id].value;
			}
		}
		setItemList(oldItemList)
		
	}
	const getUnitName = (unitId) => {
		for (var i = 0; i < itemUnitOption.length; i++) {
			if (itemUnitOption[i].id.toString() === unitId)
			{
				return itemUnitOption[i].typeValue;
			}
		}
		return ""
	}
	const getCurrencyName = (currencyId) => {
		for (var i = 0; i < itemCurrencyOption.length; i++) {
			if (itemCurrencyOption[i].id.toString() === currencyId) {
				return itemCurrencyOption[i].typeValue;
			}
		}
		return "";
	}

	return (<>
		<div className="scrollable-section">
			<MessageDisplay msg={msg} setMsg={setMsg} msgType={msgType} />
			
			{proposalObj && proposalObj.id && proposalObj.id > 0 ?
				<div>
					<div className="table">
						<div className="row">
							<div className="col-md-1" style={{ textAlign:"left" }}>
								<FormButton name="Back" onClick={(e) => {
									e.preventDefault();
									navigate("/home");
								}} />
							</div>
							<div className="col-md-11" >
								<h5 style={{ color: "#007bff", paddingTop:"5px"  }}>Apply for proposal</h5>
							</div>
						</div>
						<div className="row" style={{ border: "solid 1px #007bff" }}>
						</div>
						<Form ref={proposalForm} onSubmit={handleSubmit}>

							<div className="row" style={{ padding:"5px" }}>

								<div className="col-md-1">
									<strong>LD: </strong><br />{proposalObj.proposalLdPercent} %

								</div>
								<div className="col-md-1">
									<strong>LD duration: </strong><br />{proposalObj.proposalCompletionInDays} days
								</div>
								<div className="col-md-2">
									<strong>Agreement duration: </strong><br />{proposalObj.proposalCompletionInDays} days
								</div>
								<div className="col-md-4">
									<InputNumberField name="Advance" type="text" label="Advance (%)" />
								</div>
								<div className="col-md-4" style={{ textAlign: "right" }}>
								<br/>
									<FormSubmitButton name={agreementId > 0 ? "Edit Agreement" : "Save New Agreement"} />
								</div>
							</div>
							<div className="row" style={{ border: "solid 1px #007bff" }}>
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
										<div className="col-md-5 " style={{ textAlign: "center" }}>
											Seller Rate
										</div>
										<div className="col-md-1 " style={{ textAlign: "center" }}>
											Actions
										</div>
									</div>
								</div>
								{itemList && itemList.length > 0 ? itemList.map(x => < div className="row tablebox">
									<div className="col-md-1 d-flex align-items-center">
										<span>
											<strong className="d-inline d-md-none">Type: </strong>
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
											<strong className="d-inline d-md-none">Quantity: </strong>
											{x.itemQuantity}</span>
									</div>
									<div className="col-md-5 align-items-center" style={{ textAlign: "center" }}>
										<span id={"displayRate" + x.id}>
											<strong className="d-inline d-md-none">Rate: </strong>
											{x.sellerRate && x.sellerRate > 0 ? <span>
												Tax:{x.sellerTax} %
												<br />
												Time to complete:{x.sellerDaysToComplete} days
												<br/>
												Rate:{x.sellerRate} {getCurrencyName(x.sellerCurrency)}/{getUnitName(x.sellerUnit)}
											</span> : <span>Not present</span>}
										</span>

										<span id={"editRate" + x.id} style={{ display: "none" }}>
											<div className="row">
												<div className="col-md-6">
													<InputNumberField name={"sellerRate" + x.id} type="decimal" label="Proposed Rate" />
													<div className="form-group" style={{ textAlign: 'left' }}>
														<label style={{ fontsize: '20px', color: 'black', fontWeight: '700' }} >Currency</label>
														<select name={"sellerCurrency" + x.id} className="form-control"
															onChange={(e) => {
																e.preventDefault();
																//setItemRateCurrency(e.target.value);
															}}>
															<option value="-99" selected >-Select-</option>
															{itemCurrencyOption && itemCurrencyOption.length > 0 ?
																itemCurrencyOption.map(x => <option value={x.id} >{x.typeValue}</option>) :
																<></>}
														</select>
													</div>
													<div className="form-group" style={{ textAlign: 'left' }}>
														<label style={{ fontsize: '20px', color: 'black', fontWeight: '700' }} >Unit</label>
														<select name={"sellerUnit" + x.id} className="form-control"
															onChange={(e) => {
																e.preventDefault();
																//setItemRateCurrency(e.target.value);
															}}>
															<option value="-99" selected >-Select-</option>
															{itemUnitOption && itemUnitOption.length > 0 ?
																itemUnitOption.map(x => <option value={x.id} >{x.typeValue}</option>) :
																<></>}
														</select>
													</div>
												</div>
												<div className="col-md-6">
													<InputNumberField name={"sellerDaysToComplete" + x.id} type="number" label="Days to complete" />
													<InputNumberField name={"sellerTax" + x.id} type="decimal" label="Tax (%)" />
												</div>
												
											</div>
											
											
											
										</span>
										<span id={"saveBtn" + x.id} style={{ display: "none" }}>
											<FormButton name="Save" onClick={(e) => {
												saveItemRate(e, x);

											}} />
										</span>

									</div>
									<div className="col-md-1" style={{ textAlign: "center" }}>
										<span id={"editBtn" + x.id} style={{ display: "inline" }}>
											<FormButton name="Add Rate" onClick={(e) => { editOrAddRate(e, x) }} />
										</span>
									</div>
								</div>) : <>No Item Is Present.</>}

							</div>
							
						</Form>
					</div>
				</div>
				: <>Loading Data</>}
			
		</div>
	</>);
};
export default RFQApplyApplication;