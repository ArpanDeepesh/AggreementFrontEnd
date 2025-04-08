import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormSubmitButton from "../FormParts/FormSubmitButton";
import Form from "react-bootstrap/Form";
import FormButton from "../FormParts/FormButton";
import UserProfile from "../Context/UserProfile";
import "./DetailPO.css";
import AddAttachment from "../CommonPages/AddAttachment";
import InputFieldBlank from "../FormParts/InputFieldBlank";

const PersonalLoan = ({ setUserName, setUserType }) => {
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
										<h5>PERSONAL LOAN AGREEMENT</h5>
										This Personal Loan Agreement is made on {new Date().toDateString()}, by <InputFieldBlank name="ContractCreator" label="Creator Name" type="text" /> and between:
										<br />
										<strong>1. LENDER</strong>
										<br />
										<InputFieldBlank name="LenderName" label="Name" type="text" /> &nbsp; &nbsp;
										<InputFieldBlank name="LenderAddress" label="Address" type="text" /> &nbsp; &nbsp;
										<InputFieldBlank name="LenderPhNo" label="Contact No." type="text" /> &nbsp; &nbsp;
										<InputFieldBlank name="LenderEmail" label="Email" type="text" /> &nbsp; &nbsp;
										<InputFieldBlank name="LenderPan" label="Pan (optional)" type="text" /> &nbsp; &nbsp;
										<InputFieldBlank name="LenderAadhar" label="Aadhar (optional)" type="text" />
										<br />
										<strong>2. BORROWER
										</strong>
										<br />
										<InputFieldBlank name="BorrowerName" label="Name" type="text" /> &nbsp; &nbsp;
										<InputFieldBlank name="BorrowerAddress" label="Address" type="text" /> &nbsp; &nbsp;
										<InputFieldBlank name="BorrowerPhNo" label="Contact No." type="text" /> &nbsp; &nbsp;
										<InputFieldBlank name="BorrowerEmail" label="Email" type="text" /> &nbsp; &nbsp;
										<InputFieldBlank name="BorrowerPan" label="Pan (optional)" type="text" /> &nbsp; &nbsp;
										<InputFieldBlank name="BorrowerAadhar" label="Aadhar (optional)" type="text" />
										<br />
										<strong>3. LOAN DETAILS
										</strong>
										<br />
										<InputFieldBlank name="LoanAmount" label="Loan Amount (₹)" type="number" /> (Rupees [Amount in words])
										<br />
										<InputFieldBlank name="LoanDate" label="Date of Disbursement" type="date" />
										<br />
										<strong>Disbursement Method:</strong>
										<br />
										<InputFieldBlank name="UPIChk" type="checkbox" label="UPI" />  &nbsp; &nbsp;
										<InputFieldBlank name="BankTransferChk" type="checkbox" label="Bank Transfer" />  &nbsp; &nbsp;
										<InputFieldBlank name="ChequeChk" type="checkbox" label="Cheque" />  &nbsp; &nbsp;
										<InputFieldBlank name="CashChk" type="checkbox" label="Cash" />
										<br/>
										<InputFieldBlank name="LoanPurpose" label="Purpose of Loan" type="text" />
										<br />
										<strong>4. REPAYMENT TERMS
										</strong>
										<br />
										<InputFieldBlank name="RepaymentAmount" label="Repayment Amount" type="number" /> per &nbsp; &nbsp;
										<InputFieldBlank name="MonthChk" type="checkbox" label="Month" />  &nbsp; &nbsp;
										<InputFieldBlank name="QuarterChk" type="checkbox" label="Quarter" />  &nbsp; &nbsp;
										<InputFieldBlank name="YearChk" type="checkbox" label="Year" />
										<br />
										<InputFieldBlank name="InstallmentCount" label="Number of Installments" type="number" />
										<br />
										<InputFieldBlank name="FirstInstallmentDate" label="First Installment Due On" type="date" />
										<InputFieldBlank name="FirstInstallmentDate" label="Final Installment Due On" type="date" />
										<br />
										<InputFieldBlank name="AccNumber" label="Bank Account Number for Repayment (if any)" type="text" />
										<InputFieldBlank name="AccIFSC" label="Bank Account IFSC for Repayment (if any)" type="text" />
										<InputFieldBlank name="BankName" label="Bank Account Name for Repayment (if any)" type="text" />
										<br/>
										<InputFieldBlank name="LoanAmount" label="Late Payment Penalty (if any) ₹" type="number" />
										<InputFieldBlank name="LoanAmount" label="after" type="number" /> days of due date
										<br />
										<strong>5. INTEREST (if applicable)
										</strong>
										<br />
										<InputFieldBlank name="InterestFreeChk" type="checkbox" label="Interest-Free Loan" />
										<br />
										<InputFieldBlank name="InterestRate" type="number" label="Interest Rate" /> % per annum 
										<br />
										<InputFieldBlank name="InterestSimpleChk" type="checkbox" label="Simple" />&nbsp; &nbsp;
										<InputFieldBlank name="InterestMonthlyChk" type="checkbox" label="Compounded Monthly" />&nbsp; &nbsp;
										<InputFieldBlank name="InterestYearlyChk" type="checkbox" label="Compounded Yearly" />
										<br />
										<strong>Interest Payable:</strong>
										<br />
										<InputFieldBlank name="MonthlyWithPrincipalChk" type="checkbox" label="Monthly with Principal" />
										<br />
										<InputFieldBlank name="EndOfTermChk" type="checkbox" label="At End of Term" />
										<br />
										<InputFieldBlank name="OtherChk" type="checkbox" label="Other" />&nbsp; &nbsp;
										<InputFieldBlank name="InterestOtherText" label="Purpose of Loan" type="text" />

										<br />
										<strong>6. PREPAYMENT & EARLY CLOSURE
										</strong>
										<InputFieldBlank name="FreeClosureChk" type="checkbox" label="Allowed without penalty" />
										<br/>
										<InputFieldBlank name="ClosurePenalityPercentChk" type="checkbox" label="Prepayment Penalty" />&nbsp; &nbsp;
										<InputFieldBlank name="ClosurePenalityPercent" label="Penality percent" type="number" /> %
										<br />
										<InputFieldBlank name="ClosurePenalityAmtChk" type="checkbox" label="Prepayment Penalty" /> ₹ &nbsp; &nbsp;
										<InputFieldBlank name="ClosurePenalityAmt" label="Penality amount" type="number" />
										<br />
										<InputFieldBlank name="FreeClosureChk" type="checkbox" label="Full closure allowed with final settlement" />
										<br />
										<strong>7. DEFAULT & CONSEQUENCES
										</strong>
										<br />
										Borrower will be in default if:

										Payment is delayed beyond <InputFieldBlank name="DelayDaysAllowed" label="[No. Of delay Days]" type="number" /> days without written notice

										Borrower becomes insolvent or bankrupt

										On default:

										Lender may demand full repayment

										Legal proceedings may be initiated

										Interest may continue to accrue on unpaid amount
										<br />
										<strong>8. COLLATERAL / SECURITY (if any)
										</strong>
										<br />
										<InputFieldBlank name="UnsecuredLoanChk" type="checkbox" label="Unsecured Loan" />
										<br />
										<InputFieldBlank name="SecuredByChk" type="checkbox" label="Secured by" /> &nbsp; &nbsp;
										<InputFieldBlank name="SecurityDetailsTxt" label="Security Details" type="text" />
										<br />
										<strong>9. ACKNOWLEDGEMENTS
										</strong>
										<br />
										Borrower acknowledges receipt of loan amount in full.

										Borrower agrees to repay the loan as per the terms above.

										Both parties declare this is a legitimate, personal financial transaction.
										<br />
										<strong>10. GOVERNING LAW & DISPUTE RESOLUTION
										</strong>
										<br />
										This Agreement shall be governed by the laws of India.

										Disputes shall be subject to courts in <InputFieldBlank name="GovernByCity" label=" City" type="text" />.
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
export default PersonalLoan;
