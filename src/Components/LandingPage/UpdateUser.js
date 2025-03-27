import "./LandingPage.css";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputField from "../FormParts/InputField";
import FormSubmitButton from "../FormParts/FormSubmitButton";
//import { sendPostRequest, getRequest } from "../Services/POContractBackendAPI";
import UserProfile from "../Context/UserProfile";
import PurchaseOrder from "../Context/PurchaseOrder";
import { useState } from "react";
import MessageDisplay from "../CommonPages/MessageDisplay";


const UpdateUser = ({ setUserName, setUserType }) => {
	const usrForm = useRef(null);
	const navigate = useNavigate();
	const [msg, setMsg] = useState("");
	const [msgType, setMsgType] = useState("");
	useEffect(() => {
		if (UserProfile.getLoginStatus() !== "1") {
			navigate("/");
		}
		//getRequest("api/POManagerAuth/getClientInfo", UserProfile.getToken()).then(rr => rr.json()).then(res => {
		//	setUserName(res.data.name);
		//	setUserType()
		//	UserProfile.setUserId(res.data.id);
		//	UserProfile.setEmail(res.data.email);
		//	UserProfile.setName(res.data.name);
		//}).catch(err => console.log(err));
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (usrForm.current['UsrPass'].value !== usrForm.current['UsrReEnterPass'].value || !usrForm.current['UsrAcceptedTerms'].checked) {
			setMsg("Please check if password and re-Enter password is same and you have read and clicked on terms and condition text box");
			setMsgType("Error");
			return;
		}
		if (!validateFeilds()) {
			return;
		}
		var formBody = {
			Id: UserProfile.getUserId(),
			Name: usrForm.current['UserName'].value,
			Password: usrForm.current['UsrPass'].value,
			PhoneNumber: UserProfile.getContactNumber(),
			Email: usrForm.current['Email'].value,
			Status: 'New',
			UserTermAccepted: usrForm.current['UsrAcceptedTerms'].checked === true
		};
		//sendPostRequest("api/POManagerAuth/UpdateClient", UserProfile.getToken(), formBody).then(r => r.json()).then(res => {
		//	if (res)
		//	{
		//		getRequest("api/POManagerAuth/getClientInfo", UserProfile.getToken()).then(rr => rr.json()).then(resD => {
		//			setUserName(resD.data.name);
		//			UserProfile.setUserId(resD.data.id);
		//			UserProfile.setEmail(resD.data.email);
		//			UserProfile.setName(resD.data.name);
		//			if (PurchaseOrder.getPoId() > 0) {
		//				navigate('/Details');
		//				return;
		//			}
		//			navigate('/Home');
		//		}).catch(err => console.log(err));
		//	}
			
		//}).catch(err => {
		//	console.log(err);
		//});

	};
	const validateFeilds = () => {
		var newMsg = "";
		var name = usrForm.current['UserName'].value;
		var password = usrForm.current['UsrPass'].value;
		var email = usrForm.current['Email'].value;
		if (!/^[a-zA-Z ]+$/.test(name))
		{
			newMsg += "Name can only contain alphabets and space.\n";
		}
		if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
			newMsg += "Password must contain only one uppercase, one lowercase, one number, one especial character and minimum length should be 8.\n";
		}
		if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
			newMsg += "Email should have proper format.";
		}
		setMsg(newMsg);
		setMsgType("Error");
		return newMsg === "";
	}
	const submitBtnClicked = (e) => {
	}

	return (
		<>
			<MessageDisplay msgType={msgType} msg={msg} setMsg={setMsg} />
			<div className="LandingPageMain container form-container" style={{ paddingTop: "25px" }}>
				<div className="row justify-content-center">
					<div className="form-content">
						<Form ref={usrForm} onSubmit={handleSubmit}>
							Phone number: {UserProfile.getContactNumber()}
							<InputField name="UserName" type="text" label="Display Name" value={UserProfile.getName()} />
							<InputField name="Email" type="text" label="Email Address" value={UserProfile.getEmail()} />
							<InputField name="UsrPass" type="password" label="Password" />
							<InputField name="UsrReEnterPass" type="password" label="Re-Enter Password" />
							<InputField name="UsrAcceptedTerms" type="checkbox" label="Please accept the terms and conditons." />
							<FormSubmitButton name="Update User" onClick={(e) => submitBtnClicked(e)} />
						</Form>
					</div>

				</div>


			</div>
		</>
	);
};
export default UpdateUser;