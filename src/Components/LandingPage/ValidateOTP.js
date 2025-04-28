import "./LandingPage.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputField from "../FormParts/InputField";
import FormSubmitButton from "../FormParts/FormSubmitButton";
import { validateOTPRequest } from "../Services/ContrectBackendAPI";
import UserProfile from "../Context/UserProfile";
import MessageDisplay from "../CommonPages/MessageDisplay";


const ValidateOTP = () => {
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
			OTP: usrForm.current['OTPValidationValue'].value,
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
			navigate("/Home");
		}).catch(err => {
			console.log(err);
		});

	};
	const validateOTP = () => {
		var otp = usrForm.current['OTPValidationValue'].value;
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
			<Form ref={usrForm} onSubmit={handleSubmit} className="">
				<div className="row flex-grow-1">
					<div className="col-md-5 LandingPageMain">
						<div className="d-flex h-100 justify-content-center align-items-center">
							<div style={{ textAlign: 'left', width: "100%" }}>
								<InputField name="OTPValidationValue" type="text" label="OTP send on mobile or Email" />
								<FormSubmitButton name="Validate OTP" />
							</div>
						</div>
					</div>
					<div className="col-md-6">
						<div className="h-100 justify-content-center align-items-center">
							<div className="row">
								<div className="col-md-12 col-sm-12">
									<img src={"./ValidateOTPPic.png"} alt="Validate OTP Contract Pic" width={"40%"} height={"auto"} />
								</div>
							</div>
							<div className="row">
								<div className="col-md-12 col-sm-12">
									<center className="validateOTPMessage">
										Vendors claim task completions, and buyers<br/> confirm payments in real-time
										<br />
										<br />
										Automatically match the value of work done with<br /> payments made for full transparency
										<br />
										<br />
										Updates sent via email and WhatsApp, with clear<br /> records for seamless contract management
									</center>
								</div>
							</div>
						</div>

					</div>

				</div>
			</Form>
		</>
	);
};

export default ValidateOTP;