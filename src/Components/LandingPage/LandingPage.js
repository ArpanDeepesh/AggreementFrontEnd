import "./LandingPage.css";
import { useEffect, useRef, useState } from "react";
import {useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputField from "../FormParts/InputField";
import FormSubmitButton from "../FormParts/FormSubmitButton";
import { sendAuthNotificationRequest } from "../Services/POContractBackendAPI";
import UserProfile from "../Context/UserProfile";
import MessageDisplay from "../CommonPages/MessageDisplay";


const LandingPage= ()=>{
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
			if (res === true)
			{
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
			<Form ref={usrForm} onSubmit={handleSubmit} className="d-flex h-100">
				<div className="row flex-grow-1">
					<div className="col-md-5 LandingPageMain">
						<div className="d-flex h-100 justify-content-center align-items-center">
							<div style={{ textAlign: 'left', marginTop: '-15em', width:"50%" }}>
								<InputField name="PhoneNumber" type="tel" label="Phone Number" />
								<FormSubmitButton name="Send OTP" />
							</div>
						</div>
					</div>
					<div className="col-md-6">
						<div className="h-100 justify-content-center align-items-center">
							<div className="row m-4">
								<div className="col-md-12 col-sm-12">
									<img src={"./ParagraphText.png"} alt="Landing Page Image showing business" width={"75%"} height={"auto"} />
								</div>
							</div>
							<div className="row m-4">
								<div className="col-md-12 col-sm-12">
									<center style={{ fontSize:"30px" }}>
										Streamlined tracking and reconciliation for your purchase agreements
									</center>
								</div>
							</div>
							<div className="row m-5">
								<div className="col-md-4">
									<div className="col-md-12">
										<img src={"./TrackManageProgress1.png"} alt="Landing Page Image showing business" width={"50%"} height={"auto"} />
									</div>
									<div className="col-md-12 landingMsgSubTitle">
										Track & manage progress
									</div>
								</div>
								<div className="col-md-4">
									<div className="col-md-12">
										<img src={"./TrackManageProgress2.png"} alt="Landing Page Image showing business" width={"50%"} height={"auto"} />
									</div>
									<div className="col-md-12 landingMsgSubTitle">
										Reconcile work & payments
									</div>
								</div>
								<div className="col-md-4">
									<div className="col-md-12">
										<img src={"./TrackManageProgress3.png"} alt="Landing Page Image showing business" width={"50%"} height={"auto"} />
									</div>
									<div className="col-md-12 landingMsgSubTitle">
										Easy communication & audit
									</div>
								</div>
							</div>
						</div>
						
					</div>
					
				</div>
			</Form>
		</>
	);
};
export default LandingPage;