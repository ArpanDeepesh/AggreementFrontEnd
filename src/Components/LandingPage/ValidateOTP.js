import "./LandingPage.css";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputField from "../FormParts/InputField";
import FormSubmitButton from "../FormParts/FormSubmitButton";
import { validateOTPRequest } from "../Services/POContractBackendAPI";
import UserProfile from "../Context/UserProfile";


const ValidateOTP = () => {
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
		var formBody = {
			PhoneNumber: UserProfile.getContactNumber(),
			OTP: usrForm.current['OTPValidationValue'].value,
		};
		validateOTPRequest(formBody).then(r => r.json()).then(res => {
			console.log(res);
			UserProfile.setLoginStatus("1");
			UserProfile.setToken(res.token);
			navigate("/UpdateUser");
		}).catch(err => {
			console.log(err);
		});

	};

	return (
		<>
			<div>
				<Form ref={usrForm} onSubmit={handleSubmit}>
					<InputField name="OTPValidationValue" type="text" label="OTP send on mobile or Email" />
					<FormSubmitButton name="Validate OTP" />
				</Form>

			</div>
		</>
	);
};

export default ValidateOTP;