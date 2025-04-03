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


const RegisterPage = ({ displayLogin, setDisplayLogin}) => {
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
		var name = usrForm.current['UserName'].value;
		var nameRegex = /^[A-Za-z\s'-]+$/;
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
			setMsg("Not a valid name.");
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
		if (phoneRegex.test(PhoneNumber)) {
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
			<div className="scrollable-section">
				<MessageDisplay msg={msg} setMsg={setMsg} msgType={msgType} />
			<Form ref={usrForm} onSubmit={handleSubmit} >
					<center>{displayLogin === 2 ? "Forgot Your Password?" : ""}</center>
					<div style={{ textAlign: 'left' }}>
						<div className="row">
							<div className="col-md-12">
								<div className="form-group" style={{ textAlign: 'left' }}>
									<label style={{ fontsize: '20px', color: 'black', fontWeight: '700' }} >User Type</label>
									<select name="PoCurrency" className="form-control"
										value={usrType} onChange={(e) => {
											e.preventDefault();
											setUsrType(e.target.value);
										}}>
										<option value="" >==Select==</option>
										{usrTypeOptions && usrTypeOptions.length > 0 ?
											usrTypeOptions.map(x => <option value={x.id} >{x.typeValue}</option>) :
											<></>}
									</select>
								</div>
								<InputField name="UserName" type="text" label="Name" value="" />
								<InputField name="PhoneNumber" type="tel" label="Phone Number" value="" />
								<InputField name="UsrPan" type="text" label="PAN" value="" />
								<InputField name="UsrGstin" type="text" label="GSTIN" value="" />
								<InputField name="UsrAddress" type="text" label="Address" value="" />
								<InputField name="UsrIsMSME" type="checkbox" label="Is MSME?" />
								<InputField name="Email" type="text" label="Email" value="" />
								<InputField name="Password" type="password" label="Password" value="" />
								<InputField name="ConfirmPassword" type="password" label="Confirm Password" value="" />
							</div>
						</div>
						<div className="row" style={{ textAlign: "center" }}>
							<div className="col-md-6"><FormSubmitButton name="Send OTP" /></div>
							<div className="col-md-6"><FormButton name="Login" onClick={(e) => {
								e.preventDefault();
								setDisplayLogin(1);
							}} myClass="landingPageBtn" /></div>
						</div>
					</div>
				</Form>
			</div>
		</>
	);
};
export default RegisterPage;