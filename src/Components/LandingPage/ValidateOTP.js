import "./LandingPage.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputField from "../FormParts/InputField";
import FormSubmitButton from "../FormParts/FormSubmitButton";
import { validateOTPRequest } from "../Services/ContrectBackendAPI";
import UserProfile from "../Context/UserProfile";
import MessageDisplay from "../CommonPages/MessageDisplay";
import OtherData from "../Context/OtherData";


const ValidateOTP = ({ setDisplayLogin }) => {
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
		if (!validateOTP()) {
			return;
		}
		var formBody = {
			ContactId: UserProfile.getUserId(),
			OTP: usrForm.current['OTPValidationValue1'].value + usrForm.current['OTPValidationValue2'].value + usrForm.current['OTPValidationValue3'].value
				+ usrForm.current['OTPValidationValue4'].value + usrForm.current['OTPValidationValue5'].value + usrForm.current['OTPValidationValue6'].value,
		};
		validateOTPRequest(formBody).then(r => r.json()).then(res => { 
			if (res.token === null) {
				setMsg("Invalid OTP.");
				setMsgType("Error");
				return;
			}
			if (res.status !== 1)
			{
				setMsg("Invalid OTP.");
				setMsgType("Error");
				return;
			}
			UserProfile.setLoginStatus("1");
			UserProfile.setToken(res.token);
			UserProfile.setName(res.name);
			UserProfile.setUserType(res.userType);
			UserProfile.setUserId(res.userId);
			navigate(OtherData.getData());
		}).catch(err => {
			console.log(err);
		});

	};
	const validateOTP = () => {
		var otp = usrForm.current['OTPValidationValue1'].value + usrForm.current['OTPValidationValue2'].value + usrForm.current['OTPValidationValue3'].value
			+ usrForm.current['OTPValidationValue4'].value + usrForm.current['OTPValidationValue5'].value + usrForm.current['OTPValidationValue6'].value;
		let isnum = /\d{6}/.test(otp);
		if (!isnum) {
			setMsg("Invalid otp structure.");
			setMsgType("Error");
		}
		return isnum;
	}

	return (
		<>
			<MessageDisplay msgType={msgType} msg={msg} setMsg={setMsg} />
			<div class="login-container">

				<div class="login-header">
					<div class="logo">
						<a style={{ textDecoration: "none" }} href="/">
							<span style={{ color: 'white' }}>Contr
								<span style={{ color: "#ff8400" }}>e</span>
								ct</span>
						</a>
					</div>
					<h1>Welcome back</h1>
					<p>Sign in to access your contracts and agreements</p>
				</div>


				<div class="login-form">
					<div class="tab-container">
						<div class="tab active" data-tab="email">Email</div>
						<div class="tab" data-tab="phone">Phone</div>
					</div>

					<Form ref={usrForm} onSubmit={handleSubmit} >

						<div class="form-content" id="phone-form" >
							<div class="otp-section">
								<div class="form-group">
									<label>Enter 6-digit OTP</label>
									<div class="otp-inputs">
										<input type="text" class="otp-input" maxlength="1" name="OTPValidationValue1" pattern="\d" inputmode="numeric" />
										<input type="text" class="otp-input" maxlength="1" name="OTPValidationValue2" pattern="\d" inputmode="numeric" />
										<input type="text" class="otp-input" maxlength="1" name="OTPValidationValue3" pattern="\d" inputmode="numeric" />
										<input type="text" class="otp-input" maxlength="1" name="OTPValidationValue4" pattern="\d" inputmode="numeric" />
										<input type="text" class="otp-input" maxlength="1" name="OTPValidationValue5" pattern="\d" inputmode="numeric" />
										<input type="text" class="otp-input" maxlength="1" name="OTPValidationValue6" pattern="\d" inputmode="numeric" />
									</div>
								</div>

								<div class="resend-otp">
									<a href="/" id="resend-otp" onClick={(e) => {
										e.preventDefault();
									}}>Resend OTP</a>
								</div>
								<div class="form-options">
									<a href="/" class="forgot-password" onClick={(e) => {
										e.preventDefault();
										setDisplayLogin(3);
									}}>Back to provide phone number.</a>
								</div>
								<button type="submit" class="btn btn-primary">Verify & Sign in</button>
							</div>
						</div>
					</Form>
				</div>
			</div>
			
		</>
	);
};

export default ValidateOTP;