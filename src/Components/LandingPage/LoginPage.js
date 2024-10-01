import "./LandingPage.css";
import { useEffect, useRef, useState } from "react";
import {useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputField from "../FormParts/InputField";
import FormSubmitButton from "../FormParts/FormSubmitButton";
import { loginRequest } from "../Services/POContractBackendAPI";
import UserProfile from "../Context/UserProfile";
import MessageDisplay from "../CommonPages/MessageDisplay";


const LoginPage = ({ setDisplayLogin })=>{
	const usrForm = useRef(null);
	const navigate = useNavigate();
	const [msg, setMsg] = useState("");
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
		console.log("Submit button is clicked.");
		var postBody = {
			UserId:usrForm.current['userId'].value,
			Password:usrForm.current['userPass'].value
		};
		loginRequest(postBody).then(r => r.json()).then(res => {
			console.log(res);
			if (res.token === null && res.message === 'Invalid Info') {
				setMsg("Invalid Credentials.");
				return;
			}
			UserProfile.setLoginStatus("1");
			UserProfile.setToken(res.token);
			navigate("/Home");
		}).catch(err => {
			console.log(err);
		});
	};
	const validatePhoneNumber = () => {
		var data = usrForm.current['userId'].value;
		let isnum = /^\+91\d+$/.test(data);
		if (!isnum) {
			isnum = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data);
			if (isnum) {
				setMsg("Phone Number or Email is not in correct format.");
			}
			
		}
		return isnum;
	}

	return (
		<>
			<MessageDisplay msg={msg} setMsg={setMsg} />
			<Form ref={usrForm} onSubmit={handleSubmit} >
				<div style={{ textAlign: 'left', padding:'5px' }}>
					<InputField name="userId" type="text" label="Phone Number Or Email" />
					<InputField name="userPass" type="password" label="Password" />
					<FormSubmitButton name="Login" />
					<span className="landingPageLink" onClick={(e) => {
						e.preventDefault();
						setDisplayLogin(0);
					}}>Register</span>
				</div>
			</Form>
		</>
	);
};
export default LoginPage;