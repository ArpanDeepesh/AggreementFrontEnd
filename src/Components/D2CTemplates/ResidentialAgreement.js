import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormSubmitButton from "../FormParts/FormSubmitButton";
import Form from "react-bootstrap/Form";
import FormButton from "../FormParts/FormButton";
import UserProfile from "../Context/UserProfile";
import "./DetailPO.css";
import AddAttachment from "../CommonPages/AddAttachment";
import InputFieldBlank from "../FormParts/InputFieldBlank";

const ResidentialAgreement = ({ setUserName, setUserType }) => {
	const navigate = useNavigate();
	const poForm = useRef(null);
	const [agreementAttachments, setAgreementAttachments] = useState([]);
	useEffect(() => {
		if (UserProfile.getLoginStatus() !== "1") {
			navigate("/");
		}
		setUserName(UserProfile.getName());
		setUserType(UserProfile.getUserType());

		
	}, []);
	const handleSubmit = (e) => {
		e.preventDefault();
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
							<p>
								<h5>RESIDENTIAL LEASE AGREEMENT
								</h5>
								
								This Lease Agreement is made and executed on this {new Date().toDateString()}, at <InputFieldBlank name="GovernBy" label="[State,City]" type="text" />, by &nbsp;
								<InputFieldBlank name="ContractCreator" label="Creator Name" type="text" />
								and between:
								<br/>
								<strong>PARTY OF THE FIRST PART (LANDLORD)</strong>
								<br />
								<InputFieldBlank name="LandLordName" label="Name" type="text" /> &nbsp; &nbsp;
								<InputFieldBlank name="LandLordAddress" label="Address" type="text" /> &nbsp; &nbsp;
								<InputFieldBlank name="LandLordPhNo" label="Contact No." type="text" /> &nbsp; &nbsp;
								<InputFieldBlank name="LandLordEmail" label="Email" type="text" />
								<br />
								Hereinafter referred to as the ""Landlord"" (which expression shall mean and include his/her heirs, successors, legal representatives and assigns).
								<br />
								<strong>PARTY OF THE SECOND PART (TENANT)</strong>
								<br />
								<InputFieldBlank name="TenantName" label="Name" type="text" /> &nbsp; &nbsp;
								<InputFieldBlank name="TenantAddress" label="Address" type="text" /> &nbsp; &nbsp;
								<InputFieldBlank name="TenantPhNo" label="Contact No." type="text" /> &nbsp; &nbsp;
								<InputFieldBlank name="TenantEmail" label="Email" type="text" />
								<br />
								Hereinafter referred to as the ""Tenant"" (which expression shall mean and include his/her heirs, executors, administrators and permitted assigns).

								The Landlord and Tenant shall collectively be referred to as “Parties” and individually as a “Party”.
								<br />
								<strong>1. PROPERTY DETAILS</strong>
								<br />
								The Landlord agrees to let and the Tenant agrees to take on rent the residential premises situated at:
								<br />
								<InputFieldBlank name="RentedAddress" label="Property Address (with PIN Code)" type="text" myStyle={{ margin: "5px", width: "70%" }} />
								<br />
								Type:
								<InputFieldBlank name="typeFlatChk" label="Flat" type="checkbox" />
								<InputFieldBlank name="typeApartmentChk" label="Apartment" type="checkbox" />
								<InputFieldBlank name="typeIndyHouseChk" label="Independent House" type="checkbox" />
								<InputFieldBlank name="typePortionChk" label="Portion" type="checkbox" />
								<br />
								<InputFieldBlank name="FloorName" label="Floor name (G, FF, etc)" type="text" />
								<br />
								<InputFieldBlank name="Configuration" label="BHK Configuration (1HK, 2BHK, etc)" type="text" />
								<br />
								Furnishing Status:
								<InputFieldBlank name="typeUFChk" label="Unfurnished" type="checkbox" />
								<InputFieldBlank name="typeSFChk" label="Semi-Furnished" type="checkbox" />
								<InputFieldBlank name="typeFFChk" label="Fully-Furnished" type="checkbox" />
								<br />
								<strong>2. TERM OF LEASE</strong>
								<br />
								This lease shall commence from  <InputFieldBlank name="StartDate" label="[Start Date]" type="date" /> and remain valid until
								<InputFieldBlank name="EndDate" label="[End Date]" type="date" />  unless terminated earlier.

								Either Party may terminate this agreement with <InputFieldBlank name="NoticePeriod" label="[Notice Period]" type="number" /> days prior written notice.
								<br />
								<strong>3. RENT & PAYMENT TERMS</strong>
								<br />
								<InputFieldBlank name="MonthlyRent" label="Monthly Rent (₹)" type="number" /> (Rupees [In Words] Only)
								<br />
								<InputFieldBlank name="EndDate" label="Due day (On or before [due day] of every month)" type="number" />
								<br />
								<strong>Mode of Payment:</strong>
								<br />
								<InputFieldBlank name="UPIChk" type="checkbox" label="UPI" />  &nbsp; &nbsp;
								<InputFieldBlank name="BankTransferChk" type="checkbox" label="Bank Transfer" />  &nbsp; &nbsp;
								<InputFieldBlank name="ChequeChk" type="checkbox" label="Cheque" />  &nbsp; &nbsp;
								<InputFieldBlank name="CashChk" type="checkbox" label="Cash" />
								<br />
								<strong>4. SECURITY DEPOSIT</strong>
								<br />
								The Tenant shall pay a refundable security deposit of ₹<InputFieldBlank name="SecurityDeposit" label="[Amount]" type="number" /> to the Landlord.

								This deposit shall be refunded at the time of vacating the premises after adjusting for any pending dues or damages.
								<br />
								<strong>5. MAINTENANCE & UTILITIES</strong>
								<br />
								Monthly Maintenance Charges:
								<InputFieldBlank name="InclusiveChk" type="checkbox" label="Inclusive" />  <br />
								<InputFieldBlank name="ExtraChk" type="checkbox" label="Extra" /> &nbsp; &nbsp;<InputFieldBlank name="SecurityDeposit" label="Specify amount if extra" type="number" /> 
								<br />
								Utilities (electricity, water, internet, gas): To be borne by the Tenant as per actual usage and bills.
								<br />
								<strong>6. RESPONSIBILITIES</strong>
								<br />
								Landlord Shall:
								Ensure peaceful enjoyment of the property.

								Carry out major structural repairs.

								Tenant Shall:
								Use the premises strictly for residential purposes.

								Maintain cleanliness and avoid any damage.

								Comply with society rules and local laws.
								<br />
								<strong>7. FURNITURE & APPLIANCE INVENTORY</strong>
								<br />
								The property includes the following (tick ✓ as applicable and mention quantity):

								Item	Qty	Condition	Remarks
								<br />
								<InputFieldBlank name="InclusiveChk" type="checkbox" label="Sofa Set" />
								<InputFieldBlank name="SecurityDeposit" label="" type="number" />
								<InputFieldBlank name="SecurityDeposit" label="" type="text" /> 
								<br />
								<InputFieldBlank name="InclusiveChk" type="checkbox" label="Dining Table + Chairs" />
								<InputFieldBlank name="SecurityDeposit" label="" type="number" />
								<InputFieldBlank name="SecurityDeposit" label="" type="text" />
								<br />
								<InputFieldBlank name="InclusiveChk" type="checkbox" label="Bed(s) + Mattress" />
								<InputFieldBlank name="SecurityDeposit" label="" type="number" />
								<InputFieldBlank name="SecurityDeposit" label="" type="text" />
								<br />
								<InputFieldBlank name="InclusiveChk" type="checkbox" label="Wardrobes" />
								<InputFieldBlank name="SecurityDeposit" label="" type="number" />
								<InputFieldBlank name="SecurityDeposit" label="" type="text" />
								<br />
								<InputFieldBlank name="InclusiveChk" type="checkbox" label="Curtains / Blinds" />
								<InputFieldBlank name="SecurityDeposit" label="" type="number" />
								<InputFieldBlank name="SecurityDeposit" label="" type="text" />
								<br />
								<InputFieldBlank name="InclusiveChk" type="checkbox" label="Gas Connection" />
								<InputFieldBlank name="SecurityDeposit" label="" type="number" />
								<InputFieldBlank name="SecurityDeposit" label="" type="text" />
								<br />
								<InputFieldBlank name="InclusiveChk" type="checkbox" label="Refrigerator" />
								<InputFieldBlank name="SecurityDeposit" label="" type="number" />
								<InputFieldBlank name="SecurityDeposit" label="" type="text" />
								<br />
								<InputFieldBlank name="InclusiveChk" type="checkbox" label="Washing Machine" />
								<InputFieldBlank name="SecurityDeposit" label="" type="number" />
								<InputFieldBlank name="SecurityDeposit" label="" type="text" />
								<br />
								<InputFieldBlank name="InclusiveChk" type="checkbox" label="Microwave / Oven" />
								<InputFieldBlank name="SecurityDeposit" label="" type="number" />
								<InputFieldBlank name="SecurityDeposit" label="" type="text" />
								<br />
								<InputFieldBlank name="InclusiveChk" type="checkbox" label="Geysers" />
								<InputFieldBlank name="SecurityDeposit" label="" type="number" />
								<InputFieldBlank name="SecurityDeposit" label="" type="text" />
								<br />
								<InputFieldBlank name="InclusiveChk" type="checkbox" label="Air Conditioner(s)" />
								<InputFieldBlank name="SecurityDeposit" label="" type="number" />
								<InputFieldBlank name="SecurityDeposit" label="" type="text" />
								<br />
								<InputFieldBlank name="InclusiveChk" type="checkbox" label="Water Purifier" />
								<InputFieldBlank name="SecurityDeposit" label="" type="number" />
								<InputFieldBlank name="SecurityDeposit" label="" type="text" />
								<br />
								<InputFieldBlank name="InclusiveChk" type="checkbox" label="Fans / Lights" />
								<InputFieldBlank name="SecurityDeposit" label="" type="number" />
								<InputFieldBlank name="SecurityDeposit" label="" type="text" />
								<br />
								<InputFieldBlank name="InclusiveChk" type="checkbox" label="TV" />
								<InputFieldBlank name="SecurityDeposit" label="" type="number" />
								<InputFieldBlank name="SecurityDeposit" label="" type="text" />
								<br />

								An inventory checklist signed by both Parties is annexed to this agreement.
								<br />
								<strong>8. RESTRICTIONS & SPECIAL CLAUSES</strong>
								<br />
								Subletting: Not allowed without prior written permission of the Landlord.
								<br />
								<InputFieldBlank name="PetsAllowedChk" type="checkbox" label="Pets allowed" />
								<br />
								<InputFieldBlank name="SmokingAllowedChk" type="checkbox" label="Smoking allowed" />
								<br />
								<InputFieldBlank name="DrinkingAllowedChk" type="checkbox" label="Drinking allowed" />
								<br />
								<InputFieldBlank name="NonVegAllowedChk" type="checkbox" label="Non-veg allowed" />
								<br />
								Guests Stay: Limited to  <InputFieldBlank name="GuestStayWithoutNotice" label="[days count]" type="number" /> without written consent.
								<br />
								<strong>9. RENEWAL & EXTENSION</strong>
								<br />
								On mutual consent, this agreement can be renewed for a further term on revised terms and conditions.

								Fresh documentation shall be executed at the time of renewal.
								<br />
								<strong>10. TERMINATION</strong>
								<br />
								Either Party can terminate with proper notice.

								Upon termination, the Tenant shall vacate the premises and hand over possession in good condition.
								<br />
								<strong>11. DISPUTE RESOLUTION</strong>
								<br />
								Any dispute arising out of this agreement shall be subject to the jurisdiction of courts in <InputFieldBlank name="GovernByCity" label=" City" type="text" />.
								<br />
								<strong>12. MISCELLANEOUS</strong>
								<br />
								This agreement does not constitute ownership rights.

								The Tenant shall not make any permanent alteration to the premises.

								The Tenant shall allow the Landlord or their representative to inspect the property with prior notice.

							</p>
							<div className="row" style={{ textAlign: "left", paddingTop: '20px' }}>
								<div className="col-md-12">
									<label style={{ fontsize: '20px', color: 'black', fontWeight: '700', paddingLeft: '18px' }} >Attachments</label>
									<AddAttachment fileLinkList={agreementAttachments} setFileLinkList={setAgreementAttachments} />
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
