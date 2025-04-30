import "./SignInPage.css";
import { useEffect, useRef, useState } from "react";
import {useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputField from "../FormParts/InputField";
import FormSubmitButton from "../FormParts/FormSubmitButton";
//import { sendAuthNotificationRequest } from "../Services/POContractBackendAPI";
import UserProfile from "../Context/UserProfile";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import { getRequestAllowAll } from "../Services/ContrectBackendAPI";
import FormButton from "../FormParts/FormButton";
import OtherData from "../Context/OtherData";
import ForgotPassword from "./ForgotPassword";
import ValidateOTP from "./ValidateOTP";

const SignInPage = ()=>{
	const usrForm = useRef(null);
	const navigate = useNavigate();
	const [msg, setMsg] = useState("");
	const [displayFrom, setDisplayForm] = useState(1);
	useEffect(() => {
		if (UserProfile.getLoginStatus() === "1") {
			navigate("/Home");
		}
		setDisplayForm(1);
	}, []);

	return (
		<center>
			{displayFrom === 1 ? <>
				<LoginPage setDisplayLogin={setDisplayForm} />
			</> : <></>}
			{displayFrom === 2 ? <>
				<RegisterPage setDisplayLogin={setDisplayForm} />
			</> : <></>}
			{displayFrom === 3 ? <>
				<ForgotPassword setDisplayLogin={setDisplayForm} />
			</> : <></>}
			{displayFrom === 4 ? <>
				<ValidateOTP setDisplayLogin={setDisplayForm} />
			</> : <></>}
			

		</center>
	);
};
export default SignInPage;