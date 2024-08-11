import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import FormSubmitButton from "../FormParts/FormSubmitButton";
import UserProfile from "../Context/UserProfile";


const LogOut = () => {
	const usrForm = useRef(null);
	const navigate = useNavigate();
	useEffect(() => {
		if (UserProfile.getLoginStatus() !== "1") {
			navigate("/");
		}
	}, []);
	const submitBtnClicked = (e) => {
		e.preventDefault();
		UserProfile.resetUser();
		console.log("log out btn is clicked");
		navigate('/');
	}
	const cancelBtnClicked = (e) => {
		e.preventDefault();
		console.log("cancel btn is clicked");
		navigate('/Home');
	}
	return (
		<>
			<div className="LandingPageMain container form-container">
				<div className="row justify-content-center">
					<div className="col-md-12">
						<h3>Are you sure you want to log out?</h3>
					</div>
					<div className="col-md-6">
						<FormSubmitButton name="Log out" onClick={(e) => submitBtnClicked(e)} />
					</div>
					<div className="col-md-6">
						<FormSubmitButton name="Cancel" onClick={(e) => cancelBtnClicked(e)} />
					</div>
					

				</div>


			</div>
		</>
	);
};
export default LogOut;