import "./LandingPage.css";
import { useEffect, useRef } from "react";
import {useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputField from "../FormParts/InputField";
import FormSubmitButton from "../FormParts/FormSubmitButton";
import { sendAuthNotificationRequest } from "../Services/POContractBackendAPI";
import UserProfile from "../Context/UserProfile";


const LandingPage= ()=>{
	const usrForm = useRef(null);
	const navigate = useNavigate();
	useEffect(() => {
		if (UserProfile.getLoginStatus() === "1") {
			navigate("/Home");
		}
	}, []);
	const handleSubmit = (e) => {
		e.preventDefault();
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
	const submitBtnClicked = (e) => {
		console.log("btn is clicked");
	}

	return (
		<>
			<div className="LandingPageMain container form-container">
				<div className="row justify-content-center">
					<div className="form-content">
						<Form ref={usrForm} onSubmit={handleSubmit}>
							<InputField name="PhoneNumber" type="tel" label="Phone Number" />
							<FormSubmitButton name="Send OTP" onClick={(e)=>submitBtnClicked(e)}  />
						</Form>
					</div>

				</div>
				
				
			</div>
		</>
	);
};
export default LandingPage;