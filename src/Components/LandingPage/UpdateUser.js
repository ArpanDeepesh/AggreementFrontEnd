import "./LandingPage.css";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputField from "../FormParts/InputField";
import FormSubmitButton from "../FormParts/FormSubmitButton";
import { sendPostRequest, getRequest } from "../Services/POContractBackendAPI";
import UserProfile from "../Context/UserProfile";
import PurchaseOrder from "../Context/PurchaseOrder";


const UpdateUser = ({ setUserName }) => {
	const usrForm = useRef(null);
	const navigate = useNavigate();
	useEffect(() => {
		if (UserProfile.getLoginStatus() !== "1") {
			navigate("/");
		}
		getRequest("api/POManagerAuth/getClientInfo", UserProfile.getToken()).then(rr => rr.json()).then(res => {
			setUserName(res.data.name);
			if (res.data.status === 'New') {
				UserProfile.setUserId(res.data.id);
				UserProfile.setEmail(res.data.email);
				UserProfile.setName(res.data.name);
			} else {
				UserProfile.setUserId(res.data.id);
				UserProfile.setEmail(res.data.email);
				UserProfile.setName(res.data.name);
				if (PurchaseOrder.getPoId() > 0)
				{
					navigate('/Details');
					return;
				}
				navigate('/Home');
			}
			
			console.log(res)
		}).catch(err => console.log(err));
	}, []);
	const handleSubmit = (e) => {
		e.preventDefault();
		if (usrForm.current['UsrPass'].value !== usrForm.current['UsrReEnterPass'].value && usrForm.current['UsrAcceptedTerms'].checked !== true) {
			console.log("Not equal");
			console.log(usrForm.current['UsrPass'].value + " -- " + usrForm.current['UsrReEnterPass'].value);
			console.log(usrForm.current['UsrAcceptedTerms'].checked);
			return;
		}
		console.log("Submit button is clicked.");
		var formBody = {
			Id: UserProfile.getUserId(),
			Name: usrForm.current['UserName'].value,
			Password: usrForm.current['UsrPass'].value,
			PhoneNumber: UserProfile.getContactNumber(),
			Email: usrForm.current['Email'].value,
			Status: 'New',
			UserTermAccepted: usrForm.current['UsrAcceptedTerms'].checked === true
		};
		sendPostRequest("api/POManagerAuth/UpdateClient", UserProfile.getToken(), formBody).then(r => r.json()).then(res => {
			if (res)
			{
				getRequest("api/POManagerAuth/getClientInfo", UserProfile.getToken()).then(rr => rr.json()).then(resD => {
					setUserName(resD.data.name);
					UserProfile.setUserId(resD.data.id);
					UserProfile.setEmail(resD.data.email);
					UserProfile.setName(resD.data.name);
					if (PurchaseOrder.getPoId() > 0) {
						navigate('/Details');
						return;
					}
					navigate('/Home');
					console.log(resD)
				}).catch(err => console.log(err));
				console.log(res);
			}
			
		}).catch(err => {
			console.log(err);
		});

	};
	const submitBtnClicked = (e) => {
		console.log("btn is clicked");
	}

	return (
		<>
			<div className="LandingPageMain container form-container" style={{ paddingTop: "25px" }}>
				<div className="row justify-content-center">
					<div className="form-content">
						<Form ref={usrForm} onSubmit={handleSubmit}>
							Phone number: {UserProfile.getContactNumber()}
							<InputField name="UserName" type="text" label="Display Name" value={UserProfile.getName()} />
							<InputField name="Email" type="text" label="Email Address" value={UserProfile.getEmail()} />
							<InputField name="UsrPass" type="password" label="Password" value={""} />
							<InputField name="UsrReEnterPass" type="password" label="Re-Enter Password" value={""} />
							<InputField name="UsrAcceptedTerms" type="checkbox" label="Please accept the terms and conditons." value={""} />
							<FormSubmitButton name="Update User" onClick={(e) => submitBtnClicked(e)} />
						</Form>
					</div>

				</div>


			</div>
		</>
	);
};
export default UpdateUser;