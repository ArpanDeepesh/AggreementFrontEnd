import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormSubmitButton from "../FormParts/FormSubmitButton";
import Form from "react-bootstrap/Form";
import FormButton from "../FormParts/FormButton";
import UserProfile from "../Context/UserProfile";
import "./DetailPO.css";
import AddAttachment from "../CommonPages/AddAttachment";
import InputFieldBlank from "../FormParts/InputFieldBlank";
import { sendPostRequest, getRequestAllowAll } from "../Services/ContrectBackendAPI";
import OtherData from "../Context/OtherData";

const ResidentialAgreement = ({ setUserName, setUserType }) => {
	const navigate = useNavigate();
	const poForm = useRef(null);
	const [itemCurrencyOption, setItemCurrencyOptions] = useState([]);
	useEffect(() => {
		if (UserProfile.getLoginStatus() !== "1") {
			navigate("/");
		}
		setUserName(UserProfile.getName());
		setUserType(UserProfile.getUserType());
		getRequestAllowAll("api/General/CurrencyList").then(x => x.json()).then(res => {
			if (res.status === 1) {
				setItemCurrencyOptions(res.data);
			}
		}).catch(err => console.log(err));
	}, []);
	const handleSubmit = (e) => {
		e.preventDefault();
		var postBody = {
			CreatorId: UserProfile.getUserId(),
			CreatorType: poForm.current['CreatorType'].value,
			OtherPartyContactInfo: poForm.current['OtherPartyContactInfo'].value,
			Rent: poForm.current['Rent'].value,
			Maintainance: poForm.current['Maintainance'].value,
			StartDate: poForm.current['StartDate'].value,
			EndDate: poForm.current['EndDate'].value,
			MonthCountRentAdvance: poForm.current['MonthCountRentAdvance'].value,
			CurrencyId: poForm.current['CurrencyId'].value,
		};
		console.log(postBody)
		sendPostRequest("api/Business/ResidentialRentalContract", UserProfile.getToken(), postBody).then(r => r.json()).then(res => {
			console.log(res);
			if (res.status === 1) {
				OtherData.setData(JSON.stringify(res.data));
				navigate("/draftD2C");
			}

		}).catch(err => console.log(err));
	}
	//Subletting Agreement – Tenant renting to another person

	return (
		<><div className="d-flex h-100" style={{ overflowY: 'scroll' }}>
			<div className="table">
				<div className="row">
					<div className="col-md-12">
						<div className="col-md-1">
							<FormButton name="< Back" onClick={(e) => {
								e.preventDefault();
								navigate("/SelectTemplate");
							}} />
						</div>

					</div>
				</div>
				<div className="row" style={{ textAlign: "left", paddingBottom: '10px' }}>
					<div className="col-md-12">
						<Form ref={poForm} onSubmit={handleSubmit}>
							<div className="row">

								<div className="col-md-3">
									<div className="form-group" style={{ padding: '5px', textAlign: "left" }}>
										<label style={{ fontsize: '20px', color: 'black', fontWeight: '700' }} >Select what you are?</label>
										<select name="CreatorType" className="form-control" onChange={(e) => {
											e.preventDefault();
										}} >
											<option value='' selected >=Select=</option>
											<option value='landlord' >Landlord</option>
											<option value='tenant'>Tenant</option>
											
										</select>
									</div>
								</div>
								<div className="col-md-3">
									<InputFieldBlank name="OtherPartyContactInfo" type="text" label="Contact info of other party"/>

								</div>
								<div className="col-md-3">
									<InputFieldBlank name="StartDate" type="date" label="Rent start date" />
								</div>
								<div className="col-md-3">
									<InputFieldBlank name="EndDate" type="date" label="Rent end date" />

								</div>
								
							</div>
							<div className="row">

								<div className="col-md-3">
									<InputFieldBlank name="Rent" type="number" label="Per month rent" />
								</div>
								<div className="col-md-3">
									<InputFieldBlank name="Maintainance" type="number" label="Per month maintenance" />
								</div>
								<div className="col-md-3">
									<div className="form-group" style={{ textAlign: 'left' }}>
										<label style={{ fontsize: '20px', color: 'black', fontWeight: '700' }} >Currency</label>
										<select name="CurrencyId" className="form-control"
											onChange={(e) => {
												e.preventDefault();
												//setItemRateCurrency(e.target.value);
											}}>
											<option value="-99" selected >-Select-</option>
											{itemCurrencyOption && itemCurrencyOption.length > 0 ?
												itemCurrencyOption.map(x => <option value={x.id} >{x.typeValue}</option>) :
												<></>}
										</select>
									</div>
									
								</div>
								<div className="col-md-3">
									<InputFieldBlank name="MonthCountRentAdvance" type="number" label="No of month rent as advance" />
								</div>
							</div>

							<div className="row">
								<div className="offset-md-8 col-md-4" style={{ textAlign: "right" }}>
									<FormSubmitButton name={"Publish Agreement"} />
								</div>
							</div>
						</Form>
					</div>
				</div>
			</div>
			
		</div>
			
			
		</>
	);
};
export default ResidentialAgreement;
