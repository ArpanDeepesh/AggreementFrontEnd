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
		if (!validatePhoneNumber()) {
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
			<div className="scrollable-section">
			<MessageDisplay msg={msg} setMsg={setMsg} />
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