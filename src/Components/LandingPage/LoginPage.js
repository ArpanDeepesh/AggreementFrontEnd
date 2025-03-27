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
		if (!validatePhoneNumber()) {
			return;
		}

		var postBody = {
			Contact:usrForm.current['userId'].value,
			Password:usrForm.current['userPass'].value
		};
		loginRequest(postBody).then(r => r.json()).then(res => {
			console.log(res);

			if (res.token === null && res.message === 'Error') {
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
	const validatePhoneNumber = () => {
		var data = usrForm.current['userId'].value;
		let isnum = /^\+91\d+$/.test(data);
		if (!isnum) {
			setMsg("Phone Number is not in correct format.");
			setMsgType("Error");
		}
		return isnum;
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