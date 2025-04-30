import "./LandingPage.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputField from "../FormParts/InputField";
import FormSubmitButton from "../FormParts/FormSubmitButton";
import FormButton from "../FormParts/FormButton";
import { getRequestAllowAll, registerRequest } from "../Services/ContrectBackendAPI";
import UserProfile from "../Context/UserProfile";
import MessageDisplay from "../CommonPages/MessageDisplay";
import OtherData from "../Context/OtherData";


const RegisterPage = ({ setDisplayLogin}) => {
	const usrForm = useRef(null);
	const navigate = useNavigate();
	const [msg, setMsg] = useState(""); 
	const [msgType, setMsgType] = useState("");
	const [usrTypeOptions, setUserTypeOptions] = useState([]);
	const [usrType, setUsrType] = useState("");
	useEffect(() => {
		if (UserProfile.getLoginStatus() === "1") {
			navigate("/Home");
		}
		getRequestAllowAll("api/general/UserTypes").then(x => x.json()).then(res => {
			console.log(res);
			setUserTypeOptions(res.data);
			setUsrType(res.data[0].id);
		}).catch(err => console.log(err));
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
			UsrName: usrForm.current['UserName'].value,
			UsrPan: usrForm.current['UsrPan'].value,
			UsrGstin: usrForm.current['UsrGstin'].value,
			UsrAddress: usrForm.current['UsrAddress'].value,
			UsrType: usrType,
			UsrIsMsme: usrForm.current['UsrIsMSME'].checked === true,
			PhoneNumber: usrForm.current['PhoneNumber'].value,
			Email: usrForm.current['Email'].value,
			Password: usrForm.current["Password"].value
		};
		console.log(postBody);
		
		registerRequest(postBody).then(r => r.json()).then(res => {
			console.log(res);
			if (res.status === 1) {
				UserProfile.setUserId(res.contactId);
				OtherData.setData("/ResetPassword");
				setDisplayLogin(4);
				//navigate("/ValidateUser");
			} else {
				setMsg("Not able to save data");
				setMsgType("Error");
			}

		}).catch(err => {
			console.log(err);
		});
	};
	const validateForm = () => {
		var name = usrForm.current['UserName'].value;
		
		var nameRegex = /^[A-Za-z\s]+$/;
		if (name === "")
		{
			setMsg("Name is require");
			setMsgType("Error");
			return false;
		} else if (nameRegex.test(name)===false)
		{
			setMsg("Not a valid name.")
			setMsgType("Error");
			return false;
		}
		var pan=usrForm.current['UsrPan'].value;
		var panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
		if (pan!=="" && !panRegex.test(pan))
		{
			setMsg("Not a valid pan.");
			setMsgType("Error");
			return false;
		}
		var gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
		var UsrGstin = usrForm.current['UsrGstin'].value;
		if (UsrGstin!=="" && !gstinRegex.test(UsrGstin)) {
			setMsg("Not a valid GSTIN.");
			setMsgType("Error");
			return false;
		}
		var usrAddress = usrForm.current['UsrAddress'].value;
		var addressRegex = /^[A-Za-z0-9\s,.-/#()]+$/;
		if (usrAddress !== "" && !addressRegex.test(usrAddress)) {
			setMsg("Not a valid address.");
			setMsgType("Error");
			return false;
		}
		if (usrType === "")
		{
			setMsg("Please select a user type");
			setMsgType("Error");
			return false;
		}
		var PhoneNumber = usrForm.current['PhoneNumber'].value;
		var phoneRegex = /^\+91[6-9]\d{9}$/;
		if (phoneRegex.test(PhoneNumber)===false) {
			setMsg("Phone Number is not correct.");
			setMsgType("Error");
			return false;
		}
		var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		var Email = usrForm.current['Email'].value;
		if (Email !== "" && !emailRegex.test(Email))
		{
			setMsg("Email is not correct.");
			setMsgType("Error");
			return false;
		}
		var Password = usrForm.current["Password"].value;
		var passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;
		if (!passwordRegex.test(Password)) {
			setMsg("Please add a strong password.");
			setMsgType("Error");
			return false;
		}
		return true;
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
					<h1>Welcome to contrect</h1>
					<p>Register to start making your own contract</p>
				</div>
				<div class="login-form">
					<Form ref={usrForm} onSubmit={handleSubmit} >
						<div class="form-content" id="email-form">
							<div class="form-group">
								<label for="UserName">Name</label>
								<input type="text" id="UserName" name="UserName" class="form-control" placeholder="John Doe" />
							</div>
							<div class="form-group">
								<label for="PhoneNumber">Phone Number</label>
								<input type="text" id="PhoneNumber" name="PhoneNumber" class="form-control" placeholder="+91 XXXXX-XXXXX" />
							</div>
							<div class="form-group">
								<label for="Email">Email</label>
								<input type="text" id="Email" name="Email" class="form-control" placeholder="John@example.com" />
							</div>
							<div class="form-group">
								<label for="UsrPan">Pan</label>
								<input type="text" id="UsrPan" name="UsrPan" class="form-control" placeholder="XXXXX XXXXA" />
							</div>
							<div class="form-group">
								<label for="UsrGstin">GSTIN</label>
								<input type="text" id="UsrGstin" name="UsrGstin" class="form-control" placeholder="MPXX-XXXX-XXXX-XXXX-XX5" />
							</div>
							<div class="form-group">
								<label for="UsrAddress">Address</label>
								<input type="text" id="UsrAddress" name="UsrAddress" class="form-control" placeholder="" />
							</div>
							
							<div class="form-group">
								<label for="Password">Password</label>
								<input type="password" id="Password" name="Password" class="form-control" placeholder="••••••••" />
							</div>

							<div class="form-group">
								<label for="ConfirmPassword">Confirm password</label>
								<input type="password" id="ConfirmPassword" name="ConfirmPassword" class="form-control" placeholder="••••••••" />
							</div>
							<div class="form-options">
								<div class="remember-me">
									<input type="checkbox" id="UsrIsMSME" name="UsrIsMSME" />
									<label for="UsrIsMSME">Is MSME?</label>
								</div>
								<a href="/" class="forgot-password" onClick={(e) => {
									e.preventDefault();
									setDisplayLogin(1);
								}}>Already have account?</a>
							</div>

							<button type="submit" class="btn btn-primary">Register</button>
						</div>
					</Form>
				</div>
			</div>
		</>
	);
};
export default RegisterPage;