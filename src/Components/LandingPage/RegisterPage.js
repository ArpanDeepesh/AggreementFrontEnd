import "./LandingPage.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputField from "../FormParts/InputField";
import FormSubmitButton from "../FormParts/FormSubmitButton";
import { sendAuthNotificationRequest } from "../Services/POContractBackendAPI";
import UserProfile from "../Context/UserProfile";
import MessageDisplay from "../CommonPages/MessageDisplay";


const RegisterPage = ({setDisplayLogin}) => {
	const usrForm = useRef(null);
	const navigate = useNavigate();
	const [msg, setMsg] = useState("");
	useEffect(() => {
		if (UserProfile.getLoginStatus() === "1") {
			navigate("/Home");
		}
	}, []);
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!validatePhoneNumber()) {
			return;
		}
		console.log("Submit button is clicked.");
		sendAuthNotificationRequest(usrForm.current['PhoneNumber'].value).then(r => r.json()).then(res => {
			console.log(res);
			if (res === true) {
				UserProfile.setContactNumber(usrForm.current['PhoneNumber'].value);
				navigate("/ValidateUser");
			}

		}).catch(err => {
			console.log(err);
		});
	};
	const validatePhoneNumber = () => {
		var phNo = usrForm.current['PhoneNumber'].value;
		let isnum = /^\+\d+$/.test(phNo);
		if (!isnum) {
			setMsg("Phone Number is not correct.");
		}
		return isnum;
	}

	return (
		<>
			<MessageDisplay msg={msg} setMsg={setMsg} />
			<Form ref={usrForm} onSubmit={handleSubmit} >
				<div style={{ textAlign: 'left' }}>
					<InputField name="PhoneNumber" type="tel" label="Phone Number" />
					<FormSubmitButton name="Send OTP" />
					<span className="landingPageLink" onClick={(e) => {
						e.preventDefault();
						setDisplayLogin(1);
					}}>Login</span>
				</div>
			</Form>
		</>
	);
};
export default RegisterPage;