import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormSubmitButton from "../FormParts/FormSubmitButton";
import Form from "react-bootstrap/Form";
import FormButton from "../FormParts/FormButton";
import UserProfile from "../Context/UserProfile";
import "./DetailPO.css";
import InputFieldBlank from "../FormParts/InputFieldBlank";
import AddAttachment from "../CommonPages/AddAttachment";

const SublettingAgreement = ({ setUserName, setUserType }) => {
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
	//HomeMaintenance Contract – Hiring plumbers, electricians, painters


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
								<div className="col-md-12">
									<p>
										<h5>SUBLEASE AGREEMENT</h5>
										This Sublease Agreement is made on {new Date().toDateString()}, by <InputFieldBlank name="ContractCreator" label="Creator Name" type="text" /> and between:
										<br />
										<strong>1. SUBLESSOR (Original Tenant)</strong>
										<br />
										<InputFieldBlank name="SublessorName" label="Name" type="text" /> &nbsp; &nbsp;
										<InputFieldBlank name="SublessorAddress" label="Address" type="text" /> &nbsp; &nbsp;
										<InputFieldBlank name="SublessorPhNo" label="Contact No." type="text" /> &nbsp; &nbsp;
										<InputFieldBlank name="SublessorEmail" label="Email" type="text" />
										<br />
										<strong>
											2. SUBLESSEE (New Occupant)
										</strong>
										<br />
										<InputFieldBlank name="SublesseeName" label="Name" type="text" /> &nbsp; &nbsp;
										<InputFieldBlank name="SublesseeAddress" label="Address" type="text" /> &nbsp; &nbsp;
										<InputFieldBlank name="SublesseePhNo" label="Contact No." type="text" /> &nbsp; &nbsp;
										<InputFieldBlank name="SublesseeEmail" label="Email" type="text" /> &nbsp; &nbsp;
										<br />
										Together referred to as the “Parties.”
										<br />
										<strong>
											3. PROPERTY BEING SUBLET
										</strong>
										<br />
										The property being sublet is located at:
										<br />
										<InputFieldBlank name="SublessorAddress" label="Address" type="text" />
										<br />
										If partial, specify:
										<br />
										<InputFieldBlank name="SharedSpace" label="Shared spaces" type="text" /> &nbsp; &nbsp;
										<InputFieldBlank name="PrivateSpace" label="Private spaces" type="text" /> &nbsp; &nbsp;
										<br />
										<strong>
											4. TERM OF SUBLEASE</strong>
										<br />
										<InputFieldBlank name="StartDate" label="Start Date" type="date" /> &nbsp; &nbsp;
										<InputFieldBlank name="EndDate" label="End Date" type="date" />
										<br />
										This Sublease shall not exceed the term of the Master Lease Agreement signed between Sublessor and the Landlord.
										<br /><strong>
											5. RENT AND PAYMENT TERMS</strong>
										<br />
										<InputFieldBlank name="MonthlyRent" label="Monthly Rent" type="number" /> &nbsp; &nbsp;
										<InputFieldBlank name="DueDate" label="Due Date" type="date" /> &nbsp; &nbsp;
										<InputFieldBlank name="PaymentMode" label="Mode of Payment" type="text" /> &nbsp; &nbsp;
										<InputFieldBlank name="PaymentTo" label="Payable to" type="text" /> &nbsp; &nbsp;
										<InputFieldBlank name="Security" label="Security deposit (if applicable)" type="number" />
										<strong>
											<br />
											6. LANDLORD APPROVAL</strong>
										<br />
										<InputFieldBlank name="chk1" type="checkbox" label={"Sublease is authorized by the Landlord as per written permission dated " + new Date().toDateString()} />
										<br />
										<InputFieldBlank name="chk2" type="checkbox" label={"Sublease is pending landlord’s written consent, which must be obtained before the Sublessee moves in."} />
										<br />
										<InputFieldBlank name="chk3" type="checkbox" label={"Sublease is not approved yet, and the Sublessor assumes all liability in case of any objection by the Landlord."} />
										<br /><strong>
											7. CONDITIONS & RESPONSIBILITIES</strong>
										<br /><strong>
											A. Obligations of the Sublessee:</strong>
										<br />
										Follow all rules outlined in the original lease agreement between the Sublessor and Landlord.

										Maintain cleanliness and avoid damage to the premises.

										Not engage in illegal, disruptive, or dangerous activity.

										Not sub-sublet the property to another party.
										<br /><strong>
											B. Maintenance & Utilities:
										</strong>
										<br />
										Utility bills will be:
										<br />
										<InputFieldBlank name="chk4" type="checkbox" label="Shared equally" />
										<br />
										<InputFieldBlank name="chk5" type="checkbox" label="Included in rent" />
										<br />
										<InputFieldBlank name="chk6" type="checkbox" label="Paid separately by Sublessee" />
										<br />
										Repairs/damages caused by Sublessee will be borne by Sublessee.
										<br /><strong>
											8. TERMINATION & NOTICE</strong>
										<br />
										Sublease can be terminated by either party with <InputFieldBlank name="MonthlyRent" label="[Notice period]" type="number" /> days written notice.
										<br />
										Early termination by Sublessee may result in forfeiture of security deposit unless otherwise agreed.
										<br /><strong>
											9. INSPECTION & DAMAGES</strong>
										A joint inspection will be conducted at move-in and move-out.
										<br />
										Deductions, if any, will be made from the security deposit based on damages beyond normal wear and tear.
										<br /><strong>
											10. ATTACHMENTS</strong>
										<br />
										Copy of the original lease agreement
										<br />
										Landlord’s written permission (if obtained)
										<br />
										Inventory checklist (furniture, appliances, etc.)
										<br /><strong>
											11. GOVERNING LAW</strong>
										<br />
										This Sublease Agreement shall be governed by the laws of <InputFieldBlank name="GovernBy" label=" State & Country" type="text" />,
										and disputes shall be subject to the courts located in <InputFieldBlank name="GovernByCity" label=" City" type="text" />.
									</p>
								</div>
								
							</div>
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
export default SublettingAgreement;
