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


const LoginPage = ({ setDisplayLogin })=>{
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
			Contact:usrForm.current['userId'].value,
			Password:usrForm.current['userPass'].value
		};
		loginRequest(postBody).then(r => r.json()).then(res => {
			console.log(res);
			if (res.status !== 1)
			{
				setMsg("Invalid Credentials.");
				setMsgType("Error");
				return;
			}
			if (res.usrId===0 && res.token === null && res.message === 'Error') {
				setMsg("Invalid Credentials.");
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
		
		var passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;
		if (!passwordRegex.test(Password)) {
			setMsg("Incorrect password.");
			setMsgType("Error");
			return false;
		}
		return true;
	}

	return (
		<>
			<MessageDisplay msgType={msgType} msg={msg} setMsg={setMsg} />
			<Form ref={usrForm} onSubmit={handleSubmit} >
				<div style={{ textAlign: 'left', padding: '5px' }}>
					<div className="row">
						<div className="col-md-12" style={{ marginBottom:"10px" }}>
							<h2>Login to Your Account</h2>
						</div>
						<div className="col-md-12" style={{ marginBottom: "10px" }}>

							<InputField name="userId" type="text" label="Phone Number" value="+91" />
						</div>
						<div className="col-md-12" style={{ marginBottom: "10px" }}>
							<InputField name="userPass" type="password" label="Password" />
						</div>
						<div className='col-md-12'>
							<div className="row">
								<div className="col-md-6" >
									<FormSubmitButton name="Login" myStyle={{ margin: '5px', width: '100%' }} />
								</div>
								<div className="col-md-6">
									<FormButton name="Register" onClick={(e) => {
										e.preventDefault();
										setDisplayLogin(0);
									}} myClass="landingPageBtn" myStyle={{ margin: '5px', width: '100%' }} />
								</div>
							</div>
						</div>
						
						
					</div>
					<div className="row" style={{ textAlign: "center" }}>
						<div className="col-md-12">
							<span className="landingPageLink"
								onClick={(e) => {
									e.preventDefault();
									navigate("/forgotPassword")
							}} >
							Forgot your password?
						</span>
						</div>
					</div>
					

				</div>
			</Form>
		</>
	);
};
export default LoginPage;