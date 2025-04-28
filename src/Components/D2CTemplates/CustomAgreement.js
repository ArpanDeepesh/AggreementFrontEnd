import "./DetailPO.css";
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
		if (UserProfile.getLoginStatus() !== "1") {
			navigate("/");
		}
		setUserName(UserProfile.getName());
		setUserType(UserProfile.getUserType());
		var templateName = OtherData.getData();
		setHeading(templateName);
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
			<div className="row" style={{ paddingTop: "25px" }}>
				<DisappearingMessage msg={msgDis} setMsg={setMsgDis }  />
				<MessageDisplay msgType={msgType} msg={msg} setMsg={setMsg} />
                <div className="col-md-12 scrollable-section">
                    <div className="">
						<div className="row">
							<div className="col-md-1">
								<FormButton name="< Back" onClick={(e) => {
									e.preventDefault();
									navigate("/SelectTemplate");
								}} />
							</div>
							<div className="col-md-10">
								<h4 style={{ margin: 0, marginTop:"8px" }}>
									{heading}
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