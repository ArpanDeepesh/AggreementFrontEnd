import "./LandingPage.css";
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

const SignInPage = ()=>{
	const usrForm = useRef(null);
	const navigate = useNavigate();
	const [msg, setMsg] = useState("");
	const [displayLogin, setDisplayLogin] = useState(1);
	const [subcriptionList, setSubcriptionList] = useState();
	useEffect(() => {
		if (UserProfile.getLoginStatus() === "1") {
			navigate("/Home");
		}
		getRequestAllowAll("api/General/SubscriptionList").then(r => r.json()).then(res => {
			setSubcriptionList(res.data);

		}).catch(err => console.log(err));
	}, []);

	return (
		<>

				<div className="">
					<div className="row overflow-auto">
						<div className="col-md-5 LandingPageMain col-sm-12">
							<div className="">
							{displayLogin === 1 ? <LoginPage setDisplayLogin={setDisplayLogin} /> : <RegisterPage displayLogin={displayLogin} setDisplayLogin={setDisplayLogin} />}
							</div>
					</div>
					<div className="col-md-6 col-sm-12" >
						<div className="row">
							{subcriptionList && subcriptionList.length > 0 ? subcriptionList.map(x => <div className="col-md-3">
								{JSON.stringify(x)}
								<FormButton name="Select" onClick={(e) => {
									OtherData.setData(JSON.stringify(x));
									navigate("/pay");
								}} />
							</div>) : <>loading subscription list</>}
						</div>
						<div>
							<div className="d-sm-none d-md-block" >
								<div className="row m-4">
									<div className="col-md-12 col-sm-12">
										<img src={"./ParagraphText.png"} alt="Landing Page Image showing business" width={"72%"} />
									</div>
								</div>
								<div className="row m-4">
									<div className="col-md-12">
										<center style={{ fontSize: "30px" }}>
											Streamlined tracking and reconciliation for your purchase agreements (POs and PIs)
										</center>
									</div>
								</div>
								<div className="row m-5">
									<div className="col-md-4">
										<div className="col-md-12">
											<img src={"./TrackManageProgress1.png"} alt="Landing Page Image showing business" width={"50%"} height={"auto"} />
										</div>
										<div className="col-md-12 landingMsgSubTitle">
											Track & manage progress
										</div>
									</div>
									<div className="col-md-4">
										<div className="col-md-12">
											<img src={"./TrackManageProgress2.png"} alt="Landing Page Image showing business" width={"50%"} height={"auto"} />
										</div>
										<div className="col-md-12 landingMsgSubTitle">
											Reconcile work & payments
										</div>
									</div>
									<div className="col-md-4">
										<div className="col-md-12">
											<img src={"./TrackManageProgress3.png"} alt="Landing Page Image showing business" width={"50%"} height={"auto"} />
										</div>
										<div className="col-md-12 landingMsgSubTitle">
											Easy communication & audit
										</div>
									</div>
								</div>
							</div>
							<div className="d-md-none d-sm-block" style={{ overflowY: "scroll", height: "70%" }}>
								<div className="row m-4">
									<div className="col-md-12 col-sm-12">
										<img src={"./ParagraphText.png"} alt="Landing Page Image showing business" width={"80%"} />
									</div>
								</div>
								<div className="row m-4">
									<div className="col-md-12">
										<center style={{ fontSize: "30px" }}>
											Streamlined tracking and reconciliation for your purchase agreements
										</center>
									</div>
								</div>
								<div className="row m-5">
									<div className="col-md-4">
										<div className="col-md-12">
											<img src={"./TrackManageProgress1.png"} alt="Landing Page Image showing business" width={"50%"} height={"auto"} />
										</div>
										<div className="col-md-12 landingMsgSubTitle">
											Track & manage progress
										</div>
									</div>
									<div className="col-md-4">
										<div className="col-md-12">
											<img src={"./TrackManageProgress2.png"} alt="Landing Page Image showing business" width={"50%"} height={"auto"} />
										</div>
										<div className="col-md-12 landingMsgSubTitle">
											Reconcile work & payments
										</div>
									</div>
									<div className="col-md-4">
										<div className="col-md-12">
											<img src={"./TrackManageProgress3.png"} alt="Landing Page Image showing business" width={"50%"} height={"auto"} />
										</div>
										<div className="col-md-12 landingMsgSubTitle">
											Easy communication & audit
										</div>
									</div>
								</div>
							</div>
						</div>
							
						</div>
					</div>
				</div>
		</>
	);
};
export default SignInPage;