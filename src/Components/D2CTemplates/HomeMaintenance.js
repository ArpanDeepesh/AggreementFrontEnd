import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormSubmitButton from "../FormParts/FormSubmitButton";
import Form from "react-bootstrap/Form";
import FormButton from "../FormParts/FormButton";
import UserProfile from "../Context/UserProfile";
import "./DetailPO.css";
import AddAttachment from "../CommonPages/AddAttachment";
import InputFieldBlank from "../FormParts/InputFieldBlank";

const HomeMaintenance = ({ setUserName, setUserType }) => {
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
	//Home Maintenance Contract – Hiring plumbers, electricians, painters


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
										<h5>HOME MAINTENANCE SERVICE CONTRACT</h5>
										This Home Maintenance Contract is made and entered into on {new Date().toDateString()}, by <InputFieldBlank name="ContractCreator" label="Creator Name" type="text" /> and between:
										<br />
										<strong>1. SERVICE RECIPIENT (Client/Homeowner/Tenant)</strong>
										<br />
										<InputFieldBlank name="RecipientName" label="Name" type="text" /> &nbsp; &nbsp;
										<InputFieldBlank name="RecipientAddress" label="Address" type="text" /> &nbsp; &nbsp;
										<InputFieldBlank name="RecipientPhNo" label="Contact No." type="text" /> &nbsp; &nbsp;
										<InputFieldBlank name="RecipientEmail" label="Email" type="text" />
										<br />
										<strong>2. SERVICE PROVIDER (Contractor/Technician)</strong>
										<br />
										<InputFieldBlank name="ServiceProvider" label="Name / Business Name" type="text" /> &nbsp; &nbsp;
										<br />
										<strong>Profession : </strong>
										<InputFieldBlank name="PlumberChk" type="checkbox" label="Plumber" />  &nbsp; &nbsp;
										<InputFieldBlank name="ElectricianChk" type="checkbox" label="Electrician" />  &nbsp; &nbsp;
										<InputFieldBlank name="PaintererChk" type="checkbox" label="Painter" />  &nbsp; &nbsp;
										<InputFieldBlank name="OtherChk" type="checkbox" label="Other" /><InputFieldBlank name="ServiceName" label="" type="text" />
										<br/>
										<InputFieldBlank name="ServiceLicense" label="License/ID No. (if applicable)" type="text" /> &nbsp; &nbsp;
										<InputFieldBlank name="ServiceAddress" label="Address" type="text" /> &nbsp; &nbsp;
										<InputFieldBlank name="ServicePhNo" label="Contact No." type="text" /> &nbsp; &nbsp;
										<InputFieldBlank name="ServiceEmail" label="Email" type="text" />
										<br />
										
										<strong>3. SCOPE OF WORK</strong>
										<br />
										The Service Provider agrees to perform the following maintenance services at the property mentioned above:
										<br />

										<InputFieldBlank name="PlumbingChk" type="checkbox" /> :<InputFieldBlank name="PlumbingDesc" label="Plumbing (Description)" type="text" />
										<br />

										<InputFieldBlank name="ElectricalChk" type="checkbox" /> :<InputFieldBlank name="ElectricalDesc" label="Electrical (Description)" type="text" />
										<br />

										<InputFieldBlank name="PaintingChk" type="checkbox" /> : <InputFieldBlank name="PaintingDesc" label="Painting (Description)" type="text" />
										<br />

										<InputFieldBlank name="OtherWorkChk" type="checkbox" /> : <InputFieldBlank name="OtherWorkDesc" label="Other Work" type="text" />
										<br />
										<InputFieldBlank name="ServiceDesc" label="Service description in detail" type="text" />
										<br />
										<strong>4. WORK SCHEDULE</strong>
										<br />
										<InputFieldBlank name="StartDate" label="Start Date" type="date" /> &nbsp; &nbsp;
										<InputFieldBlank name="EndDate" label="Expected Completion Date" type="date" />
										<br/>
										<InputFieldBlank name="StartTime" label="Working Hours" type="time" />
										<InputFieldBlank name="EndTime" label="to" type="time" />
										<br />
										<strong>Work Frequency (if applicable):</strong>
										<InputFieldBlank name="OneTimeChk" type="checkbox" label="One-time" />  &nbsp; &nbsp;
										<InputFieldBlank name="DailyChk" type="checkbox" label="Daily" />  &nbsp; &nbsp;
										<InputFieldBlank name="WeeklyChk" type="checkbox" label="Weekly" />  &nbsp; &nbsp;
										<InputFieldBlank name="MonthlyChk" type="checkbox" label="Monthly" />
										<br />
										<strong>5. PAYMENT TERMS</strong>
										<br />
										<InputFieldBlank name="TotalAgreedAmount" label="Total Amount Agreed (₹)" type="number" /> (Rupees [Amount in words])
										<br/>
										<strong>Payment Mode:</strong>
										<br />
										<InputFieldBlank name="UPIChk" type="checkbox" label="UPI" />  &nbsp; &nbsp;
										<InputFieldBlank name="BankTransferChk" type="checkbox" label="Bank Transfer" />  &nbsp; &nbsp;
										<InputFieldBlank name="ChequeChk" type="checkbox" label="Cheque" />  &nbsp; &nbsp;
										<InputFieldBlank name="CashChk" type="checkbox" label="Cash" />
										<br />
										<InputFieldBlank name="AdvanceAmount" label="Advance (if any)" type="number" /> &nbsp; &nbsp; paid on  &nbsp; &nbsp;
										<InputFieldBlank name="AdvanceDate" label="[Paid on date]" type="date" />

										<InputFieldBlank name="BalanceDueDate" label="Balance Due On" type="date" />
										<InputFieldBlank name="InvoiceNo" label="Invoice No. (If available)" type="text" />
										<br />
										<strong>6. MATERIALS & SUPPLIES</strong>
										<br />
										Materials will be provided by:
										<br />
										<InputFieldBlank name="MaterialClientChk" type="checkbox" label="Client" />  &nbsp; &nbsp;
										<InputFieldBlank name="MaterialSPChk" type="checkbox" label="Service Provider" />
										<br />
										<InputFieldBlank name="CostIncludedChk" type="checkbox" label="Cost of materials is included in the total amount" />
										<br />
										<InputFieldBlank name="ReimbursementChk" type="checkbox" label="Separate reimbursement for materials based on bills" />
										<br />
										<strong>7. WARRANTY / GUARANTEE</strong>
										<br />
										The Service Provider provides the following warranty on labor and materials:
										<br />
										<InputFieldBlank name="WarrantyChk" type="checkbox" /> :
										<InputFieldBlank name="WarrantyValueCount" type="number" label="[Warranty of]" />
										<InputFieldBlank name="WarrantyDayChk" type="checkbox" label="Days" /> &nbsp; / &nbsp;
										<InputFieldBlank name="WarrantyMonthChk" type="checkbox" label="Months" /> &nbsp; / &nbsp;
										<InputFieldBlank name="WarrantyYearChk" type="checkbox" label="Years" /> warranty on 

										<InputFieldBlank name="PlumbingWarrantyChk" type="checkbox" label="plumbing" />&nbsp; / &nbsp;
										<InputFieldBlank name="ElectricWarrantyChk" type="checkbox" label="electrical" />  work.
										<br />
										<InputFieldBlank name="NoWarrantyChk" type="checkbox" label="No warranty applicable." />
										<br />
										<InputFieldBlank name="NoWarrantyChk" type="checkbox" label="As per standard manufacturer warranty on equipment/material." />
										<br />
										<strong>8. RESPONSIBILITIES OF SERVICE PROVIDER</strong>
										<br />
										Perform services in a professional and safe manner.

										Ensure proper disposal of waste.

										Keep the premises clean post work.

										Follow local safety, labor, and environmental laws.

										Use proper tools and materials as agreed.
										<br />
										<strong>9. TERMINATION</strong>
										<br />
										Either party may terminate the contract with <InputFieldBlank name="WarrantyValueCount" type="number" label="[Number]" /> days’ written notice if:

										There is a breach of terms.

										Work is not completed as per schedule.

										Quality of work is unsatisfactory.
										<br />
										<strong>10. INDEMNITY & LIABILITY</strong>
										<br />
										The Service Provider shall be liable for damages caused due to negligence or improper work.

										The Client agrees to indemnify the Service Provider against injuries caused due to unsafe conditions not disclosed by the Client.
										<br />
										<strong>11. DISPUTE RESOLUTION</strong>
										<br />
										Any disputes shall be resolved:
										<br />
										<InputFieldBlank name="AmicablyChk" type="checkbox" label="Amicably through mutual discussion" />
										<br />
										<InputFieldBlank name="ArbitrationChk" type="checkbox" label="By arbitration in" /> &nbsp; <InputFieldBlank name="arbitrationyCity" label=" City" type="text" />
										<br />
										<InputFieldBlank name="JurisdictionChk" type="checkbox" label="In courts of jurisdiction of" /> &nbsp; <InputFieldBlank name="GovernByCity" label="City" type="text" />
										<br />
										<strong>12. ADDITIONAL TERMS (IF ANY)</strong>
										<br />
										<InputFieldBlank name="AgreementNote" label="Note" type="text" myStyle={{ margin: "5px", width:"95%" }} />
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
export default HomeMaintenance;
