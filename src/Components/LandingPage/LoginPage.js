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
import { loginRequest, getInfoFromGoogle, gloginRequest } from "../Services/ContrectBackendAPI";
import { useGoogleLogin } from '@react-oauth/google';


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
			Contact: "",
			Password: ""
		};

		if (document.getElementById("email-form").style.display === "none") {
			postBody.Contact = usrForm.current['phonePrefix'].value +usrForm.current['userPhone'].value;
			postBody.Password = usrForm.current['userPhonePass'].value;
		} else
		{
			postBody.Contact = usrForm.current['userEmail'].value;
			postBody.Password = usrForm.current['userEmailPass'].value;
		}
		console.log(postBody);
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
			UserProfile.setEmail(res.email);
			UserProfile.setPhoneNumber(res.phoneNumber);
			UserProfile.setUserId(res.userId);
			navigate("/Home");
		}).catch(err => {
			console.log(err);
		});
	};
	const validateForm = () =>
	{
		var Contact = "";
		var Password = "";
		if (document.getElementById("email-form").style.display === "none") {
			Contact = usrForm.current['phonePrefix'].value + usrForm.current['userPhone'].value;
			Password = usrForm.current['userPhonePass'].value;
		} else {
			Contact = usrForm.current['userEmail'].value;
			Password = usrForm.current['userEmailPass'].value;
		}
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
	const loginClick = useGoogleLogin({
		onSuccess: (codeResponse) => {
			console.log("codeResponse" + JSON.stringify(codeResponse));
			getInfoFromGoogle(codeResponse.access_token).then(r => r.json()).then((res) => {
				console.log(res);
				var postBody = {
					GoogleId: res.id,
					Email: res.email,
					Name: res.name
				};
				gloginRequest(postBody).then(r => r.json()).then(loginRes => {
					console.log(loginRes);
					if (loginRes.status !== 1) {
						setMsg("Invalid Credentials.");
						setMsgType("Error");
						return;
					}
					if (loginRes.usrId === 0 && loginRes.token === null && loginRes.message === 'Error') {
						setMsg("Invalid Credentials.");
						setMsgType("Error");
						return;
					}
					UserProfile.setLoginStatus("1");
					UserProfile.setToken(loginRes.token);
					UserProfile.setName(loginRes.name);
					UserProfile.setEmail(res.email);
					UserProfile.setPhoneNumber(res.phoneNumber);
					UserProfile.setUserType(loginRes.userType);
					UserProfile.setUserId(loginRes.userId);
					navigate("/Home");
				}).catch(err => console.log(err));
				
			}).catch(err => console.log(err));
		},
		onError: (error) => console.log(error)
	});
	const openTab = (e, id) => {
		e.preventDefault();
		var tabContent = document.getElementsByClassName("login-tab-content");
		for (var i = 0; i < tabContent.length; i++) {
			tabContent[i].style.display = "none";
			//tabContent[i].classList.remove("active");
		}
		var tabButtons = document.getElementsByClassName("login-tab-button");
		for (var i = 0; i < tabButtons.length; i++) {
			tabButtons[i].classList.remove("active");
		}
		document.getElementById(id).style.display = "block";
		//document.getElementById(id).classList.add("active");
		e.currentTarget.classList.add("active");
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
					<h1>Welcome back</h1>
					<p>Sign in to access your contracts and agreements</p>
				</div>

				<button type="button" className="btn btn-google" onClick={() => loginClick()} >
					<i className="fab fa-google"></i>
					<span>Continue with Google</span>
				</button>
				<div className="divider">or</div>
				<div className="login-form">
					<div className="tab-container">
						<div className="tab login-tab-button active " onClick={(e) => {
							e.preventDefault();
							openTab(e, "email-form");
						}}>Email</div>
						<div className="tab login-tab-button" onClick={(e) => {
							e.preventDefault();
							openTab(e, "phone-form");
						}}>Phone</div>
					</div>

					<Form ref={usrForm} onSubmit={handleSubmit} >
						

						
						<div className="form-content login-tab-content" id="email-form">
							<div className="form-group">
								<label for="userEmail">Email address</label>
								<input type="email" name="userEmail" id="userEmail" className="form-control" placeholder="you@example.com" />
							</div>

							<div className="form-group">
								<label for="emailPass">Password</label>
								<input type="password" name="userEmailPass" id="emailPass" className="form-control" placeholder="••••••••" />
							</div>

							<div className="form-options">
								{/*<div className="remember-me">*/}
								{/*	<input type="checkbox" id="remember" />*/}
								{/*	<label for="remember">Remember me</label>*/}
								{/*</div>*/}
								<a href="/" className="forgot-password" onClick={(e) => {
									e.preventDefault();
									setDisplayLogin(3);
								}}>Forgot password?</a>
							</div>

							<button type="submit" className="btn btn-primary">Login</button>
						</div>


						<div className="form-content login-tab-content" id="phone-form" style={{ display: "none" }} >
							<div className="form-group">
								<label for="phone">Phone number</label>
								<div className="phone-input">
									<select className="phone-prefix form-control" style={{ width:"20%" }} name="phonePrefix">
										<option value="+1" >+1</option>
										<option value="+44">+44</option>
										<option value="+91">+91</option>
										<option value="+61">+61</option>
									</select>
									<input type="tel" name="userPhone" className="form-control phone-number" placeholder="123-456-7890" />
								</div>
							</div>
							<div className="form-group">
								<label for="phonePass">Password</label>
								<input type="password" id="phonePass" name="userPhonePass" className="form-control" placeholder="••••••••" />
							</div>
							<div className="form-options">
								{/*<div className="remember-me">*/}
								{/*	<input type="checkbox" id="remember" />*/}
								{/*	<label for="remember">Remember me</label>*/}
								{/*</div>*/}
								<a href="/" className="forgot-password" onClick={(e) => {
									e.preventDefault();
									setDisplayLogin(3);
								}}>Forgot password?</a>
							</div>
							<button type="submit" className="btn btn-primary">Login</button>
						</div>

						

						<div className="login-footer">
							Don't have an account? <a href="/" id="register-btn" onClick={(e) => {
								e.preventDefault();
								setDisplayLogin(2);
							}}>Register now</a>
						</div>
					</Form>
				</div>
			</div>
			
		</>
	);
};
export default LoginPage;