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
				UserProfile.setWatsAppNumber(res.data.watsappNumber);
				UserProfile.setName(res.data.name);
				UserProfile.setUserGSTIN(res.data.gstin);
			} else {
				UserProfile.setUserId(res.data.id);
				UserProfile.setEmail(res.data.email);
				UserProfile.setWatsAppNumber(res.data.watsappNumber);
				UserProfile.setName(res.data.name);
				UserProfile.setUserGSTIN(res.data.gstin);
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
		console.log("Submit button is clicked.");
		var formBody = {
			Id: UserProfile.getUserId(),
			Name: usrForm.current['UserName'].value,
			GSTIN: usrForm.current['GSTIN'].value,
			PhoneNumber: UserProfile.getContactNumber(),
			Email: usrForm.current['Email'].value,
			WatsappNumber: usrForm.current['WatsappNumber'].value,
			Status: 'New'
		};
		sendPostRequest("api/POManagerAuth/UpdateClient", UserProfile.getToken(), formBody).then(r => r.json()).then(res => {
			if (PurchaseOrder.getPoId() > 0) {
				navigate('/Details');
				return;
			}
			navigate("/Home");
			console.log(res);
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
							<InputField name="WatsappNumber" type="tel" label="Watsapp Number" value={UserProfile.getWatsAppNumber()} />
							<InputField name="Email" type="text" label="Email Address" value={UserProfile.getEmail()} />
							<InputField name="GSTIN" type="text" label="GSTIN (optional)" value={UserProfile.getUserGSTIN()} />
							<FormSubmitButton name="Update User" onClick={(e) => submitBtnClicked(e)} />
						</Form>
					</div>

				</div>


			</div>
		</>
	);
};
export default UpdateUser;