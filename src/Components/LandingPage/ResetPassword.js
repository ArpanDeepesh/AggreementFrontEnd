import "./LandingPage.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputField from "../FormParts/InputField";
import FormSubmitButton from "../FormParts/FormSubmitButton";
import FormButton from "../FormParts/FormButton";
import { getRequestAllowAll, sendPostRequest } from "../Services/ContrectBackendAPI";
import UserProfile from "../Context/UserProfile";
import MessageDisplay from "../CommonPages/MessageDisplay";


const ResetPassword = ({ displayLogin, setDisplayLogin}) => {
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
		if (usrForm.current['Password'].value !== usrForm.current['ConfirmPassword'].value)
		{
			alert("Confirm password and password should be equal");
			return;
		}
		var postBody = {
			UsrId: UserProfile.getUserId(),
			Password: usrForm.current["Password"].value
		};
		console.log(postBody);

		sendPostRequest(postBody).then(r => r.json()).then(res => {
			console.log(res);
			if (res.status === 1) {
				UserProfile.setUserId(res.contactId);
				navigate("/ValidateUser");
			} else {
				setMsg("Not able to save data");
				setMsgType("Error");
			}

		}).catch(err => {
			console.log(err);
		});
	};
	const validateForm = () => {
		var ConfirmPassword = usrForm.current["ConfirmPassword"].value;
		var Password = usrForm.current["Password"].value;
		var passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;
		if (!passwordRegex.test(Password)) {
			setMsg("Please add a strong password.");
			setMsgType("Error");
			return false;
		}
		if (ConfirmPassword !== Password)
		{
			setMsg("Password and confirm password has to be same.");
			setMsgType("Error");
			return false;
		}
		return true;
	}

	return (
		<>
			<div className="scrollable-section">
				<MessageDisplay msg={msg} setMsg={setMsg} msgType={msgType} />
			<Form ref={usrForm} onSubmit={handleSubmit} >
					<center>{displayLogin === 2 ? "Forgot Your Password?" : ""}</center>
					<div style={{ textAlign: 'left' }}>
						<div className="row">
							<div className="col-md-12">

							</div>
							<div className="col-md-12">
								<InputField name="Password" type="password" label="Password" value="" />
								<InputField name="ConfirmPassword" type="password" label="Confirm Password" value="" />
							</div>
						</div>
						<div className="row" style={{ textAlign: "center" }}>
							<div className="col-md-6"><FormSubmitButton name="Change Password" /></div>
						</div>
					</div>
				</Form>
			</div>
		</>
	);
};
export default ResetPassword;