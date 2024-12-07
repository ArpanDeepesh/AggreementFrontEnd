import "./LandingPage.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputField from "../FormParts/InputField";
import FormSubmitButton from "../FormParts/FormSubmitButton";
import FormButton from "../FormParts/FormButton";
import { sendAuthNotificationRequest } from "../Services/POContractBackendAPI";
import UserProfile from "../Context/UserProfile";
import MessageDisplay from "../CommonPages/MessageDisplay";


const RegisterPage = ({ displayLogin, setDisplayLogin}) => {
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

		sendAuthNotificationRequest(usrForm.current['PhoneNumber'].value).then(r => r.json()).then(res => {
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
				<center>{displayLogin === 2 ? "Forgot Your Password?" : ""}</center>
				<div style={{ textAlign: 'left' }}>
					<InputField name="PhoneNumber" type="tel" label="Phone Number" value="+91" />
					<div className="row" style={{ textAlign: "center" }}>
						<div className="col-md-6"><FormSubmitButton name="Send OTP" /></div>
						<div className="col-md-6"><FormButton name="Login" onClick={(e) => {
							e.preventDefault();
							setDisplayLogin(1);
						}} myClass="landingPageBtn" /></div>
					</div>
				</div>
			</Form>
		</>
	);
};
export default RegisterPage;