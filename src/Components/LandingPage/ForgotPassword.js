import "./LandingPage.css";
import { useEffect, useRef, useState } from "react";
import {useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputField from "../FormParts/InputField";
import FormSubmitButton from "../FormParts/FormSubmitButton";
import FormButton from "../FormParts/FormButton";
//import { loginRequest } from "../Services/POContractBackendAPI";
import UserProfile from "../Context/UserProfile";
import MessageDisplay from "../CommonPages/MessageDisplay";
import { validateContactInfoRequest } from "../Services/ContrectBackendAPI";
import OtherData from "../Context/OtherData";


const ForgotPassword = ({ setDisplayLogin })=>{
	const usrForm = useRef(null);
	const navigate = useNavigate();
	const [msg, setMsg] = useState("");
	const [msgType, setMsgType] = useState("");
	useEffect(() => {
		if (UserProfile.getLoginStatus() === "1") {
			navigate("/Home");
		}
	}, []);
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!validateForm()) {
			return;
		}

		var postBody = {
			ContactInfo: usrForm.current['phonePrefix'].value + usrForm.current['userPhone'].value
		};
		
		validateContactInfoRequest(postBody).then(r => r.json()).then(res => {
			if (res.status === 1 && res.contactId>0) {
				UserProfile.setUserId(res.contactId);
				OtherData.setData("/ResetPassword");
				setDisplayLogin(4);
				//navigate("/ValidateUser");
			} else
			{
				setMsg("User doesnt exist");
				setMsgType("Error");
			}
		}).catch(err => console.log(err));
	};
	const validateForm = () =>
	{
		var Contact = usrForm.current['phonePrefix'].value + usrForm.current['userPhone'].value;
		var phoneRegex = /^\+91[6-9]\d{9}$/;
		var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		if (!phoneRegex.test(Contact)) {
			if (!emailRegex.test(Contact))
			{
				setMsg("Contact info is not valid. It has to be a phone number or email address.");
				setMsgType("Error");
				return false;
			}
		}
		return true;
	}

	return (
		<>
			<MessageDisplay msgType={msgType} msg={msg} setMsg={setMsg} />
			<div className="login-container">

				<div className="login-header">
					<div className="logo">
						<a style={{ textDecoration: "none" }} href="/">
							<span style={{ color: 'white' }}>Contr
								<span style={{ color: "#ff8400" }}>e</span>
								ct</span>
						</a>
					</div>
					<h1>Forgot your password?</h1>
					<p>Please share your contact number.</p>
				</div>

				<div className="login-form">

					<Form ref={usrForm} onSubmit={handleSubmit} >
						<div className="form-content" id="phone-form" >
							<div className="form-group">
								<label for="phone">Phone number</label>
								<div className="phone-input">
									<select className="phone-prefix form-control" name="phonePrefix" style={{ width: "20%" }}>
										<option value="+1">+1</option>
										<option value="+44">+44</option>
										<option value="+91">+91</option>
										<option value="+61">+61</option>
									</select>
									<input type="tel" id="phone" name="userPhone" className="form-control phone-number" placeholder="123-456-7890" />
								</div>
							</div>
							<div className="form-options">
								<a href="/" className="forgot-password" onClick={(e) => {
									e.preventDefault();
									setDisplayLogin(1);
								}}>Already have account?</a>
							</div>
							<button type="submit" className="btn btn-primary">Send OTP</button>
							
						</div>
					</Form>
				</div>
			</div>

			
		</>
	);
};
export default ForgotPassword;