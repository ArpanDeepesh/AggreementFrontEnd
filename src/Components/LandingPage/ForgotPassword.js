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
import { loginRequest } from "../Services/ContrectBackendAPI";


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
			Contact:usrForm.current['userId'].value
		};
		navigate("/ValidateUser");
		//loginRequest(postBody).then(r => r.json()).then(res => {
		//	console.log(res);
		//	if (res.status !== 1)
		//	{
		//		setMsg("Invalid Credentials.");
		//		setMsgType("Error");
		//		return;
		//	}
		//	if (res.usrId===0 && res.token === null && res.message === 'Error') {
		//		setMsg("Invalid Credentials.");
		//		setMsgType("Error");
		//		return;
		//	}
		//	UserProfile.setLoginStatus("1");
		//	UserProfile.setToken(res.token);
		//	UserProfile.setName(res.name);
		//	UserProfile.setUserType(res.userType);
		//	UserProfile.setUserId(res.userId);
		//	navigate("/Home");
		//}).catch(err => {
		//	console.log(err);
		//});
	};
	const validateForm = () =>
	{
		var Contact = usrForm.current['userId'].value;
		var Password = usrForm.current['userPass'].value;
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
			<div style={{ padding: "100px", marginLeft: "400px", marginRight:"400px" }}>
				<Form ref={usrForm} onSubmit={handleSubmit} >
					<div style={{ textAlign: 'left', padding: '5px' }}>
						<div className="row">
							<div className="col-md-12" style={{ marginBottom: "10px" }}>
								<h2>Forgot Password</h2>
							</div>
							<div className="col-md-12" style={{ marginBottom: "10px" }}>

								<InputField name="userId" type="text" label="Phone number / Email" />
							</div>
							<div className='col-md-12'>
								<div className="row">
									<div className="col-md-6" >
										<FormSubmitButton name="Send Request" myStyle={{ margin: '5px', width: '100%' }} />
									</div>
									<div className="col-md-6" >
										<FormButton name="Back to login" myStyle={{ margin: '5px', width: '100%' }} onClick={e => {
											e.preventDefault();
											navigate("/")
										}} />
									</div>
								</div>
							</div>
						</div>
					</div>
				</Form>
			</div>
			
		</>
	);
};
export default ForgotPassword;