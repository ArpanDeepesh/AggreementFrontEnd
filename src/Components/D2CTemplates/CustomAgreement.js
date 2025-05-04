import "./CustomAgreement.css";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputField from "../FormParts/InputField";
import FormSubmitButton from "../FormParts/FormSubmitButton";
import FormButton from "../FormParts/FormButton";
import { sendPostRequest, getRequest } from "../Services/ContrectBackendAPI";
import UserProfile from "../Context/UserProfile";
import PurchaseOrder from "../Context/PurchaseOrder";
import { useState } from "react";
import DraftFlowPresentation from "../FlowPresentation/DraftFlowPresentation";
import MessageDisplay from "../CommonPages/MessageDisplay";
import AddPOAttachments from "../CommonPages/AddPOAttachments";
import DeleteConfirmation from "../CommonPages/DeleteConfirmation";
import DisappearingMessage from "../CommonPages/DisappearingMessage";
import InputNumberField from "../FormParts/InputNumberField";
import AddAttachment from "../CommonPages/AddAttachment";
import InputFieldBlank from "../FormParts/InputFieldBlank";
import OtherData from "../Context/OtherData";

const CustomAgreement = ({ setUserName, setUserType }) => {
	const poForm = useRef(null);

	const [msg, setMsg] = useState("");
	const [msgDis, setMsgDis] = useState("");
	const [msgType, setMsgType] = useState("");
	const [heading, setHeading] = useState("");
	const navigate = useNavigate();


	const [attachmentId, setAttachmentId] = useState(0);
	const [attachmentParentType, setAttachmentParentType] = useState("");
	const [deleteId, setDeleteId] = useState(0);
	const [deleteType, setDeleteType] = useState("");

	

	useEffect(() => {
		//if (UserProfile.getLoginStatus() !== "1") {
		//	navigate("/");
		//}
		var templateName = OtherData.getTemplateName();
		setHeading(templateName);
		setUserName(UserProfile.getName());
		setUserType(UserProfile.getUserType());
		
		//OtherData.resetData();

	}, []);

	const validatePurchaseOrder = () => {

		poForm.current['PoTitle'].style.borderColor = '#ced4da';
		poForm.current['PoRaisedForPhoneNumber'].style.borderColor = '#ced4da';
		poForm.current['PoDescription'].style.borderColor = '#ced4da';
		poForm.current['PoBuyerGSTIN'].style.borderColor = '#ced4da';
		poForm.current['PoSellerGSTIN'].style.borderColor = '#ced4da';
		poForm.current['PoSellerAddress'].style.borderColor = '#ced4da';
		poForm.current['PoBuyerAddress'].style.borderColor = '#ced4da';
		poForm.current['PoSellerCompany'].style.borderColor = '#ced4da';
		poForm.current['PoBuyerCompany'].style.borderColor = '#ced4da';
		poForm.current['PoNotificationPeriod'].style.borderColor = '#ced4da';
		poForm.current['PoCompletionDurationInDays'].style.borderColor = '#ced4da';
		poForm.current['PoDiscount'].style.borderColor = "#ced4da";


		var data = poForm.current['PoRaisedForPhoneNumber'].value;
		var isnum = /^\+91\d+$/.test(data);
		var message = "";

		if (!isnum) {
			poForm.current['PoRaisedForPhoneNumber'].style.borderColor = 'red';
			message += "Phone Number should start with +91 \n";

		}
		if (data.length !== 13) {
			poForm.current['PoRaisedForPhoneNumber'].style.borderColor = 'red';
			message += "Phone Number length is incorrect \n";

		}
		if (data === "")
		{
			poForm.current['PoRaisedForPhoneNumber'].style.borderColor = 'red';
			message += "Phone Number is required \n";

		}
		data = poForm.current['PoTitle'].value;
		if (data==="" || data.length > 99)
		{
			poForm.current['PoTitle'].style.borderColor = 'red';
			message += " Title is required and cannot be more than 100 characters \n";

		}
		data = poForm.current['PoDescription'].value;
		if (data !== "" && data.length > 1000) {
			poForm.current['PoDescription'].style.borderColor = 'red';
			message += " Description cannot be more than 1000 characters \n";

		}
		data = poForm.current['PoBuyerGSTIN'].value;
		if (data!=="" && !/^[A-Za-z0-9]{15}$/.test(data)) {
			poForm.current['PoBuyerGSTIN'].style.borderColor = 'red';
			message += " Buyer GSTIN should be 15 charcters and can contain only alphanumeric values. \n";
	
		}
		data = poForm.current['PoSellerGSTIN'].value;
		if (data !== "" && ! /^[A-Za-z0-9]{15}$/.test(data)) {
			poForm.current['PoSellerGSTIN'].style.borderColor = 'red';
			message += " Seller GSTIN should be 15 charcters and can contain only alphanumeric values. \n";

		}
		if (data!=="" && data === poForm.current['PoBuyerGSTIN'].value) {
			poForm.current['PoBuyerGSTIN'].style.borderColor = 'red';
			poForm.current['PoSellerGSTIN'].style.borderColor = 'red';
			message += "Buyer GSTIN and seller GSTIN cannot be equal. \n";

		}
		data = poForm.current['PoSellerAddress'].value;
		if (data !== "" && data.length>150) {
			poForm.current['PoSellerAddress'].style.borderColor = 'red';
			message += " Seller address should be less than 150 characters \n";

		}
		data = poForm.current['PoBuyerAddress'].value;
		if (data !== "" && data.length > 150) {
			poForm.current['PoBuyerAddress'].style.borderColor = 'red';
			message += " Buyer address should be less than 150 characters \n";

		}
		data = poForm.current['PoSellerCompany'].value;
		if (data !== "" && data.length > 100) {
			poForm.current['PoSellerCompany'].style.borderColor = 'red';
			message += " Seller Company should be less than 100 characters \n";
		}
		data = poForm.current['PoBuyerCompany'].value;
		if (data !== "" && data.length > 100) {
			poForm.current['PoBuyerCompany'].style.borderColor = 'red';
			message += " Buyer Company should be less than 100 characters \n";
		}
		data = poForm.current['PoNotificationPeriod'].value;

		if (data==="" || Number(data) > Number(poForm.current['PoCompletionDurationInDays'].value)) {

			poForm.current['PoNotificationPeriod'].style.borderColor = 'red';
			message += " Notification Period cannot be negative and can not be more than completion days \n";
		}
		data = poForm.current['PoCompletionDurationInDays'].value;
		if (data === "" || Number(data) <= 0) {
			poForm.current['PoCompletionDurationInDays'].style.borderColor = 'red';
			message += " Completion days cannot be less than 1 \n";

		}
		data = poForm.current['PoDiscount'].value;
		if (data === "" || Number(data) < 0) {
			poForm.current['PoDiscount'].style.borderColor = 'red';
			message += "Discount cannot be negative \n";

		}
		if (message !== "") {
			setMsg(message);
			setMsgType("Error");
		}
		return message === "";
	}


	const handleSubmit = (e) => {
		e.preventDefault();
		var formBody = {
			CreatorId: UserProfile.getUserId(),
			CreatorType: poForm.current['CreatorType'].value,
			OtherPartyContactInfo: poForm.current['OtherPartyContactInfo'].value,
			LDDays: poForm.current['LDDays'].value,
			LDPercent: poForm.current['LDPercent'].value,
			Advance: poForm.current['Advance'].value,
			NumberOfDays: poForm.current['NumberOfDays'].value
		};
		sendPostRequest('api/Business/CustomContract', UserProfile.getToken(), formBody).then(r => r.json()).then(res => {
			if (res.status === 1) {
				
				OtherData.setData(JSON.stringify(res.data));
				navigate("/draftD2C");
			}

		}).catch(err => {
			console.log(err);
		});

	};

	return (
		<>
			{UserProfile.getUserId() > 0 ? <></> : <header>
				<div className="header-container">
					<div className="logo">
						<a style={{ textDecoration: "none" }} href="/">
							<span style={{ color: 'white' }}>Contr
								<span style={{ color: "#ff8400" }}>e</span>
								ct</span>
						</a>

					</div>
					<nav><a href="/Signup" className="btn btn-success">Sign In</a>
					</nav>
				</div>
			</header>}
			<div class="template-container">
				<div class="template-header">
					<h1 id="template-title">CONTRACT AGREEMENT</h1>
					<p>Fill in the details below to create your contract</p>
				</div>

				<div class="template-body">
					<div class="user-role-section">
						<div class="user-role-selector">
							<label for="user-role">I am:</label>
							<select id="user-role">
								<option value="">Select your role</option>
								<option value="landlord">Landlord/Owner</option>
								<option value="tenant">Tenant/Licensee</option>
								<option value="buyer">Buyer</option>
								<option value="seller">Seller</option>
								<option value="licensor">Licensor</option>
								<option value="licensee">Licensee</option>
								<option value="service_provider">Service Provider</option>
								<option value="client">Client</option>
							</select>
						</div>

						<div class="counterparty-section">
							<label>Counterparty Details</label>
							<p class="help-text">Enter the email or phone number of the other party. They will fill in their details when they receive the contract.</p>
							<div class="counterparty-input">
								<input type="text" id="counterparty-contact" placeholder="Email or phone number" />
									<button type="button" class="btn btn-outline" id="verify-contact">
										<i class="fas fa-check"></i> Verify
									</button>
							</div>
						</div>
					</div>

					<div class="form-section">
						<h2>Agreement Details</h2>
						<div class="form-row">
							<div class="form-col">
								<label for="agreement-title">Agreement Title</label>
								<input type="text" id="agreement-title" placeholder="e.g., Residential Lease Agreement" />
							</div>
							<div class="form-col">
								<label for="agreement-date">Agreement Date</label>
								<input type="date" id="agreement-date" />
							</div>
						</div>
						<div class="form-row">
							<div class="form-col">
								<label for="property-address">Property/Service Description</label>
								<input type="text" id="property-address" placeholder="Address or detailed description" />
							</div>
						</div>
					</div>

					<div class="form-section">
						<h2>Term & Duration</h2>
						<div class="form-row">
							<div class="form-col">
								<label for="start-date">Start Date</label>
								<input type="date" id="start-date" />
							</div>
							<div class="form-col">
								<label for="end-date">End Date</label>
								<input type="date" id="end-date" />
							</div>
							<div class="form-col">
								<label for="notice-period">Notice Period (days)</label>
								<select id="notice-period">
									<option value="7">7 days</option>
									<option value="15">15 days</option>
									<option value="30" selected>30 days</option>
									<option value="60">60 days</option>
									<option value="90">90 days</option>
								</select>
							</div>
						</div>
					</div>

					<div class="form-section">
						<h2>Financial Terms & Line Items</h2>
						<table class="line-items-table">
							<thead>
								<tr>
									<th>Description</th>
									<th>HSN/SAC</th>
									<th>Qty</th>
									<th>Rate</th>
									<th>Currency</th>
									<th>Tax %</th>
									<th>Amount</th>
									<th></th>
								</tr>
							</thead>
							<tbody id="line-items">
								<tr>
									<td><input type="text" value="Security Deposit" class="item-desc"/></td>
									<td><input type="text" value="997211" placeholder="HSN/SAC"/></td>
									<td><input type="number" value="1" class="item-qty"/></td>
									<td><input type="number" class="item-rate"/></td>
									<td>
										<select class="item-currency">
											<option value="INR" selected>INR</option>
											<option value="USD">USD</option>
											<option value="EUR">EUR</option>
											<option value="GBP">GBP</option>
										</select>
									</td>
									<td><input type="number" value="18" class="item-tax"/></td>
									<td class="item-amount">-</td>
									<td class="remove-item"><i class="fas fa-times"></i></td>
								</tr>
								<tr>
									<td><input type="text" value="Service Fee" class="item-desc"/></td>
									<td><input type="text" value="9985" placeholder="HSN/SAC"/></td>
									<td><input type="number" value="1" class="item-qty"/></td>
									<td><input type="number" class="item-rate"/></td>
									<td>
										<select class="item-currency">
											<option value="INR" selected>INR</option>
											<option value="USD">USD</option>
											<option value="EUR">EUR</option>
											<option value="GBP">GBP</option>
										</select>
									</td>
									<td><input type="number" value="18" class="item-tax"/></td>
									<td class="item-amount">-</td>
									<td class="remove-item"><i class="fas fa-times"></i></td>
								</tr>
							</tbody>
						</table>
						<button type="button" class="add-item-btn" id="add-line-item">
							<i class="fas fa-plus-circle"></i> Add Line Item
						</button>

						<div class="form-row" style="margin-top: 1.5rem;">
							<div class="form-col">
								<label for="payment-terms">Payment Terms</label>
								<textarea id="payment-terms">Payment shall be made within 15 days of invoice. Late payments will attract interest at 1.5% per month.</textarea>
							</div>
						</div>
					</div>

					<div class="form-section">
						<h2>Terms & Conditions</h2>
						<div class="form-group">
							<label>Standard Terms</label>
							<ul class="terms-list" id="standard-terms">
								<li class="term-item">
									<input type="checkbox" id="term1" checked disabled/>
										<label for="term1">The parties shall comply with all applicable laws and regulations</label>
										<span class="term-status status-accepted">Auto-accepted</span>
								</li>
								<li class="term-item">
									<input type="checkbox" id="term2" checked disabled/>
										<label for="term2">Any disputes shall be subject to the jurisdiction of courts in the location specified</label>
										<span class="term-status status-accepted">Auto-accepted</span>
								</li>
								<li class="term-item">
									<input type="checkbox" id="term3" checked disabled/>
										<label for="term3">This agreement represents the entire understanding between the parties</label>
										<span class="term-status status-accepted">Auto-accepted</span>
								</li>
							</ul>
						</div>
						<div class="form-group">
							<label for="new-term">Add Custom Term</label>
							<div class="form-row">
								<div class="form-col">
									<input type="text" id="new-term" placeholder="Enter a new term"/>
								</div>
								<div class="form-col" style="flex: 0 0 auto;">
									<button type="button" class="btn btn-outline" id="add-term">
										<i class="fas fa-plus"></i> Add Term
									</button>
								</div>
							</div>
						</div>
						<div class="form-group">
							<label>Custom Terms</label>
							<ul class="terms-list" id="custom-terms">
							</ul>
						</div>
					</div>

					<div class="contract-preview">
						<h2>Contract Preview</h2>
						<div class="contract-content" id="contract-preview-content">
							
						</div>
					</div>

					<div class="form-actions">
						<button type="button" class="btn btn-primary" id="send-contract">
							<i class="fas fa-paper-plane"></i> Send to Counterparty
						</button>
					</div>
				</div>
			</div>


			<div className="row" style={{ paddingTop: "25px" }}>
				<DisappearingMessage msg={msgDis} setMsg={setMsgDis }  />
				<MessageDisplay msgType={msgType} msg={msg} setMsg={setMsg} />
                <div className="col-md-12 scrollable-section">
                    <div className="">
						<div className="row">
							<div className="col-md-1">
								<FormButton name="< Back" onClick={(e) => {
									e.preventDefault();
									if (UserProfile.getUserId() > 0) {
										navigate("/SelectTemplate");
									} else
									{
										navigate("/");
									}
									
								}} />
							</div>
							<div className="col-md-10">
								<h4 style={{ margin: 0, marginTop: "8px" }}>
									{heading && heading.length > 0 ? heading:"Loading Heading..."}
								</h4>
							</div>
						</div>
						<Form ref={poForm} onSubmit={handleSubmit}>
                            <div className="row">
								<div className="col-md-3">
									<div className="form-group" style={{ padding: '5px', textAlign: "left" }}>
										<label style={{ fontsize: '20px', color: 'black', fontWeight: '700' }} >Select what you are?</label>
										<select name="CreatorType" className="form-control" onChange={(e) => {
											e.preventDefault();
										}} >
											<option value='' selected >=Select=</option>
											<option value='buyer' >Buyer</option>
											<option value='seller'>Seller</option>
										</select>
									</div>
								</div>
								<div className="col-md-3">
									<InputField name="OtherPartyContactInfo" type="text" label="Phone Number of other party" />
								</div>
								<div className="col-md-3">
									<InputField name="LDDays" type="number" label="LD Days" />
								</div>
								<div className="col-md-3">
									<InputField name="LDPercent" type="number" label="LD Percent" />
								</div>
							</div>
							<div className="row">
								<div className="col-md-3">
									<InputField name="Advance" type="number" label="Advance" />
								</div>
								<div className="col-md-3">
									<InputField name="NumberOfDays" type="number" label="Contract completion (in day)" />
								</div>
							</div>
							<div className="row" style={{ paddingBottom: '20px', paddingTop:'20px' }}>
								
								<div className="col-md-4 col-xs-12">
									<FormSubmitButton name={"Create Agreement"} myStyle={{ width: '100%' }} />
								</div>
                            </div>
                        </Form>
                    </div>
				</div>
            </div>
        </>
	);
};
export default CustomAgreement;