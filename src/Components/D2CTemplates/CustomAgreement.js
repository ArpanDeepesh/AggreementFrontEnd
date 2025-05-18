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
import ContractTemplate from "./ContractTemplate";

const CustomAgreement = ({ setUserName, setUserType }) => {
	const [heading, setHeading] = useState("");
	const [frmData, setFrmData] = useState();
	const [displayName, setDisplayName] = useState();
	useEffect(() => {
		//if (UserProfile.getLoginStatus() !== "1") {
		//	navigate("/");
		//}
		var templateName = OtherData.getTemplateName();
		setHeading(templateName);
		setUserName(UserProfile.getName());
		setUserType(UserProfile.getUserType());
		setDisplayName(UserProfile.getName());
		var data = OtherData.getData();
		console.log(data);
		if (data.startsWith('{'))
		{
			var dataObj = JSON.parse(data);
			if (dataObj.counterpartyDetails && dataObj.counterpartyDetails.length > 0) {
				setFrmData(dataObj);
				OtherData.setData();
			}
		}
		
		//OtherData.resetData();

	}, []);


	return (
		<>
			<div className={displayName && displayName.length > 0 ? "main-content" : ""}>
				<ContractTemplate oldFormData={frmData} title={heading} />
			</div>
			
        </>
	);
};
export default CustomAgreement;