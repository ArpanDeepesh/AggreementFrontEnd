import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormSubmitButton from "../FormParts/FormSubmitButton";
import Form from "react-bootstrap/Form";
import FormButton from "../FormParts/FormButton";
import UserProfile from "../Context/UserProfile";
import "./DetailPO.css";
import AddAttachment from "../CommonPages/AddAttachment";
import InputFieldBlank from "../FormParts/InputFieldBlank";

const BuySellBtw2Parties = ({ setUserName, setUserType }) => {
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
						<h4 style={{ textAlign: "left", color: '#007bff' }}>Agreement Details </h4>
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
										<h5>BUY-SELL AGREEMENT FOR GOODS
										</h5>
										
										This Agreement is made on this [Date], by and between:
										<br />
										<strong>1. SELLER</strong>
										<br/>
										<InputFieldBlank name="SellerName" label="Name" type="text" /> &nbsp; &nbsp;
										<InputFieldBlank name="SellerAddress" label="Address" type="text" /> &nbsp; &nbsp;
										<InputFieldBlank name="SellerPhNo" label="Contact No." type="text" /> &nbsp; &nbsp;
										<InputFieldBlank name="SellerEmail" label="Email" type="text" /> &nbsp; &nbsp;
										<InputFieldBlank name="SellerGSTIN" label="GSTIN (optional)" type="text" /> 
										<br />
										<strong>2. BUYER</strong>
										<br />
										<InputFieldBlank name="BuyerName" label="Name" type="text" /> &nbsp; &nbsp;
										<InputFieldBlank name="BuyerAddress" label="Address" type="text" /> &nbsp; &nbsp;
										<InputFieldBlank name="BuyerPhNo" label="Contact No." type="text" /> &nbsp; &nbsp;
										<InputFieldBlank name="BuyerEmail" label="Email" type="text" /> &nbsp; &nbsp;
										<InputFieldBlank name="BuyerGSTIN" label="GSTIN (optional)" type="text" /> 
										<br />
										<strong>3. GOODS TO BE SOLD</strong>
										<br />
										
										The Seller agrees to sell, and the Buyer agrees to purchase the following goods:

										Item Description	Quantity	Unit Price (₹)	Total (₹)	HSN Code
										[e.g., Cotton Shirts]	100 pcs	300.00	30,000.00	[HSN Code]
										[e.g., Linen Pants]	50 pcs	450.00	22,500.00
										Total Invoice Value (₹): ₹[Total Amount] (Rupees [In Words])

										Includes GST @ [Rate]% if applicable

										Detailed invoice attached as Annexure A.
										<br />
										<strong>4. DELIVERY TERMS</strong>
										<br />
										<InputFieldBlank name="DeliveryAddress" label="Delivery Location" type="text" />
										<br />
										<InputFieldBlank name="DeliveryDate" label="Delivery date" type="date" />
										<br />

										Delivery Mode:
										<InputFieldBlank name="BySellerChk" label="By Seller" type="checkbox" />
										<InputFieldBlank name="BuyerPickupChk" label="Buyer Pickup" type="checkbox" />
										<InputFieldBlank name="CourierChk" label="Courier/Logistics Partner" type="checkbox" />
										<br />
										Freight Charges:
										<InputFieldBlank name="BySellerChk" label="Included" type="checkbox" /><br />
										<InputFieldBlank name="BuyerPickupChk" label="Extra" type="checkbox" /><InputFieldBlank name="DeliveryAddress" label="[Extra Charge]" type="number" /><br />
										<InputFieldBlank name="CourierChk" label="Paid by Buyer/Seller" type="checkbox" /><br />

										Ownership Transfer:<br />
										<InputFieldBlank name="BySellerChk" label="Risk and title transfer upon delivery to buyer" type="checkbox" />  or 
										<InputFieldBlank name="BuyerPickupChk" label="upon full payment" type="checkbox" />
										<br />
										<strong>5. PACKAGING & DOCUMENTATION</strong>
										<br />
										
										Goods shall be properly packed and labeled with necessary markings.<br />

										Documents to be provided:
										<br />
										<InputFieldBlank name="BySellerChk" label="Invoice" type="checkbox" /> 
										<InputFieldBlank name="BuyerPickupChk" label="Delivery Challan" type="checkbox" />
										<InputFieldBlank name="BuyerPickupChk" label="E-way Bill" type="checkbox" />
										<InputFieldBlank name="BuyerPickupChk" label="Warranty Card (if applicable)" type="checkbox" />
										<InputFieldBlank name="BuyerPickupChk" label="Test Certificate (if applicable)" type="checkbox" />
										<br />
										<strong>6. PAYMENT TERMS</strong>
										<br />
										
										Total Payable Amount: ₹[Amount]

										Payment Due: ☐ Advance ☐ On Delivery ☐ Net [X] days
										<br />
										<strong>Payment Mode:</strong>
										<br />
										<InputFieldBlank name="UPIChk" type="checkbox" label="UPI" />  &nbsp; &nbsp;
										<InputFieldBlank name="BankTransferChk" type="checkbox" label="Bank Transfer" />  &nbsp; &nbsp;
										<InputFieldBlank name="ChequeChk" type="checkbox" label="Cheque" />  &nbsp; &nbsp;
										<InputFieldBlank name="CashChk" type="checkbox" label="Cash" />
										<br />

										Bank Account Details (if applicable):
										<br />
										<InputFieldBlank name="AccNumber" label="Bank Account Number" type="text" />
										<InputFieldBlank name="AccIFSC" label="Bank Account IFSC" type="text" />
										<InputFieldBlank name="BankName" label="Bank Name" type="text" />



										Late payments may attract interest @ <InputFieldBlank name="ReturnDays" label="[Penality %]" type="number" />% per month after <InputFieldBlank name="dueDate" label="[Due Date]" type="date" />.
										<br />
										<strong>7. INSPECTION & ACCEPTANCE</strong>
										<br />
										
										Buyer shall inspect goods upon delivery and notify seller of any damage, defect, or mismatch within
										<InputFieldBlank name="ReturnDays" label="[Notify before]" type="number" /> days.

										Failure to notify within stipulated time will be deemed acceptance.

										Defective goods will be repaired, replaced, or refunded at Seller’s discretion.
										<br />
										<strong>8. RETURN / REPLACEMENT POLICY</strong>
										<br />
										
										Returns accepted only for:
										<InputFieldBlank name="UPIChk" type="checkbox" label="Manufacturing Defects" />  &nbsp; &nbsp;
										<InputFieldBlank name="BankTransferChk" type="checkbox" label="Damage in Transit" />
										<br />
										Return to be initiated within <InputFieldBlank name="ReturnDays" label="[Return before]" type="number" /> days of delivery.
										<br />
										Return freight
										<InputFieldBlank name="UPIChk" type="checkbox" label="borne by Buyer" />  &nbsp; &nbsp;
										<InputFieldBlank name="BankTransferChk" type="checkbox" label="borne by Seller" />
										<br />
										No returns for saleable stock once accepted, unless otherwise agreed.
										<br />
										<strong>9. WARRANTIES & REPRESENTATIONS</strong>
										<br />
										
										Seller warrants that goods are new, genuine, and of merchantable quality.

										Warranty period (if any): [e.g., 12 months from delivery]

										Buyer shall not hold Seller liable for misuse, wear & tear, or third-party modifications.
										<br />
										<strong>10. FORCE MAJEURE</strong>
										<br />
										
										Neither party shall be liable for delay or failure in performance caused by acts beyond their control such as natural disasters, transport strike, government orders, etc.
										<br />
										<strong>11. CONFIDENTIALITY</strong>
										<br />
										
										Parties agree to keep pricing and terms confidential unless required by law or mutual agreement.
										<br />
										<strong>12. TERMINATION</strong>
										<br />
										
										Agreement may be terminated by mutual consent or breach of contract.

										In case of breach, the affected party shall give <InputFieldBlank name="GovernBy" label="[delay days]" type="number" /> days written notice for remedy before termination.
										<br />
										<strong>13. GOVERNING LAW & DISPUTE RESOLUTION</strong>
										<br />
										
										This Agreement shall be governed by the laws of  <InputFieldBlank name="GovernBy" label=" State & Country" type="text" />.

										Any disputes shall be subject to the jurisdiction of courts at  <InputFieldBlank name="GovernByCity" label=" City" type="text" />.
										<br />
										<strong>14. ENTIRE AGREEMENT</strong>
										<br />
										
										This Agreement along with attached Annexures constitutes the complete understanding between both parties and supersedes all prior communications.
										<br />
										<strong>15. ANNEXURES</strong>
										<br />
										<InputFieldBlank name="BySellerChk" label="Annexure A – Invoice/Quotation" type="checkbox" /><br />
										<InputFieldBlank name="BuyerPickupChk" label="Annexure B – Product Specifications / Photos (if applicable)" type="checkbox" /><br />
										<InputFieldBlank name="BuyerPickupChk" label="Annexure C – Delivery Schedule (if phased)" type="checkbox" />
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
export default BuySellBtw2Parties;
