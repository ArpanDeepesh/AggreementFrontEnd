import "./NewPO.css";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputField from "../FormParts/InputField";
import FormSubmitButton from "../FormParts/FormSubmitButton";
import {  sendPostRequest } from "../Services/POContractBackendAPI";
import UserProfile from "../Context/UserProfile";
import { useState } from "react";


const NewPO = () => {
	const usrForm = useRef(null);
	const navigate = useNavigate();
	const [poAmount, setPoAmount] = useState();
		useEffect(() => {
			console.log();
			setPoAmount(0);
	}, []);
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Submit button is clicked.");
		var formBody = {
			Id: 0,
			PoRaisedBy: UserProfile.getUserId(),
			PoRaisedForPhoneNumber: usrForm.current['PoRaisedForPhoneNumber'].value,
			PoTitle: usrForm.current['PoTitle'].value,
			PoDescription: usrForm.current['PoDescription'].value,
			PoNotificationPeriod: usrForm.current['PoNotificationPeriod'].value,
			PoCompletionDurationInDays: usrForm.current['PoCompletionDurationInDays'].value,
			PoStartDate: new Date(),
			PoTotalAmount: 0,
			PoDiscount: usrForm.current['PoDiscount'].value
		};
		sendPostRequest().then(r => r.json()).then(res => {
			console.log(res);
			if (res === true) {
				UserProfile.setContactNumber(usrForm.current['PhoneNumber'].value);
				navigate("/ValidateUser");
			}

		}).catch(err => {
			console.log(err);
		});

	};
	const submitBtnClicked = (e) => {
		console.log("btn is clicked");
	}
	const openTab = (e, id) =>
	{
		e.preventDefault();
		var tabContent = document.getElementsByClassName("tab-content");
		for (var i = 0; i < tabContent.length; i++) {
			tabContent[i].style.display = "none";
			tabContent[i].classList.remove("active");
		}
		var tabButtons = document.getElementsByClassName("tab-button");
		for (var i = 0; i < tabButtons.length; i++) {
			tabButtons[i].classList.remove("active");
		}
		document.getElementById(id).style.display = "block";
		document.getElementById(id).classList.add("active");
		e.currentTarget.classList.add("active");
	}
	const openPaymentTab = (e, id) =>
	{
		e.preventDefault();
		var tabContent = document.getElementsByClassName("payment-tab-content");
		for (var i = 0; i < tabContent.length; i++) {
			tabContent[i].style.display = "none";
			tabContent[i].classList.remove("active");
		}
		var tabButtons = document.getElementsByClassName("payment-tab-button");
		for (var i = 0; i < tabButtons.length; i++) {
			tabButtons[i].classList.remove("active");
		}
		document.getElementById(id).style.display = "block";
		document.getElementById(id).classList.add("active");
		e.currentTarget.classList.add("active");
	}

	return (
		<>
			<div>
				<div className="">

						<Form ref={usrForm} onSubmit={handleSubmit}>
							<div className="row">
								<div className="col-md-4">
									<InputField name="PoRaisedForPhoneNumber" type="tel" label="Raised For Phone Number" />
								</div>
								<div className="col-md-4">
									<InputField name="PoTitle" type="tel" label="Title" />
								</div>
								<div className="col-md-4">
									<InputField name="PoDescription" type="tel" label="Description" />
								</div>
							</div>
							<div className="row">
								<div className="col-md-4">
									<InputField name="PoNotificationPeriod" type="number" label="Notification period (in Days)" />
								</div>
								<div className="col-md-4">
									<InputField name="PoCompletionDurationInDays" type="number" label="Total completion time (in Days)" />
								</div>
								<div className="col-md-4">
									<InputField name="PoDiscount" type="number" label="Discount" />
								</div>
							</div>
							<div className="row">

							</div>
							Total Amount {poAmount}

							<FormSubmitButton name="Create Order" onClick={(e) => submitBtnClicked(e)} />
						</Form>
				</div>
				<div>
					<div className="tabs">
						<div className="tab-buttons">
							<button className="tab-button active" onClick={(e) => { openTab(e, "Items") }}>Items</button>
							<button className="tab-button"  onClick={(e) => { openTab(e, "Taxes") }}>Taxes</button>
							<button className="tab-button"  onClick={(e) => { openTab(e, "Terms") }}>Terms and Conditions</button>
							<button className="tab-button"  onClick={(e) => { openTab(e, "Payments") }}>Payments</button>
						</div>
						<div id="Items" class="tab-content active">
							<div className="table">
								<div className="row">
									<div className="col-md-3">
										<InputField name="ItemTitle" type="text" label="Title" />
									</div>
									<div className="col-md-3">
										<InputField name="ItemTitle" type="text" label="Description" />
									</div>
									<div className="col-md-2">
										<InputField name="ItemTitle" type="text" label="Rate" />
									</div>
									<div className="col-md-2">
										<InputField name="ItemTitle" type="text" label="Quantity" />
									</div>
									<div className="col-md-2">
										<InputField name="ItemTitle" type="text" label="Total" />
									</div>
								</div>
								<div className="row" style={{ textAlign: "right" }}>
									<div className="col-md-8">
										<FormSubmitButton name="Add Attachment" />
									</div>
									<div className="col-md-4">
										<FormSubmitButton name="Add Item" />
									</div>
									
								</div>
							</div>
							<div className="table">
								<div className="row" style={{ backgroundColor:"rgba(100,100,100,0.5)" }}>
									<div className="col-md-3">
										Title
									</div>
									<div className="col-md-3">
										Description
									</div>
									<div className="col-md-1">
										Rate
									</div>
									<div className="col-md-1">
										Quanitity
									</div>
									<div className="col-md-1">
										Sub Total
									</div>
									<div className="col-md-2">
										Attachments
									</div>
									<div className="col-md-1">
										Actions
									</div>
								</div>
								<div className="row" style={{ borderBottom:"1px solid black" }}>
									<div className="col-md-3">
										Bulbs
									</div>
									<div className="col-md-3">
										Green Color Philips
									</div>
									<div className="col-md-1">
										50
									</div>
									<div className="col-md-1">
										10
									</div>
									<div className="col-md-1">
										500
									</div>
									<div className="col-md-2">
										Attachment1.png
										<br />
										Attachment2.png
									</div>
									<div className="col-md-1">
										Edit
										<br/>
										Remove
									</div>
								</div>
								<div className="row" style={{ borderBottom: "1px solid black" }}>
									<div className="col-md-3">
										Bulbs
									</div>
									<div className="col-md-3">
										Green Color Philips
									</div>
									<div className="col-md-1">
										50
									</div>
									<div className="col-md-1">
										10
									</div>
									<div className="col-md-1">
										500
									</div>
									<div className="col-md-2">
										Attachment1.png
										<br />
										Attachment2.png
									</div>
									<div className="col-md-1">
										Edit
										<br />
										Remove
									</div>
								</div>

							</div>
							
						</div>

						<div id="Taxes" class="tab-content">
							<div className="table">
								<div className="row">
									<div className="col-md-6">
										<InputField name="ItemTitle" type="text" label="Title" />
									</div>
									<div className="col-md-6">
										<InputField name="TaxPercent" type="number" label="Percent" />
									</div>
									<div className="col-md-12" style={{ textAlign: "right" }}>
										<FormSubmitButton name="Add Tax" />
									</div>
								</div>
							</div>
							<div className="table">
								<div className="row" style={{ backgroundColor: "rgba(100,100,100,0.5)" }}>
									<div className="col-md-5">
										Title
									</div>
									<div className="col-md-5">
										Percent
									</div>
									<div className="col-md-2">
										Action
									</div>
								</div>
								<div className="row" style={{ borderBottom: "1px solid black" }}>
									<div className="col-md-5">
										CGST
									</div>
									<div className="col-md-5">
										8.5
									</div>
									<div className="col-md-2">
										Edit
										<br />
										Remove
									</div>
								</div>
								<div className="row" style={{ borderBottom: "1px solid black" }}>
									<div className="col-md-5">
										SGST
									</div>
									<div className="col-md-5">
										8.5
									</div>
									<div className="col-md-2">
										Edit
										<br />
										Remove
									</div>
								</div>

							</div>
						</div>

						<div id="Terms" class="tab-content">
							<div className="table">
								<div className="row">
									<div className="col-md-2">
										<InputField name="TermSeq" type="number" label="Term Sequence" />
									</div>
									<div className="col-md-10">
										<InputField name="TermText" type="text" label="Term" />
									</div>
								</div>
								<div className="row" style={{ textAlign: "right" }}>
									<div className="col-md-8">
										<FormSubmitButton name="Add Attachment" />
									</div>
									<div className="col-md-4">
										<FormSubmitButton name="Add Term" />
									</div>

								</div>
							</div>
							<div className="table">
								<div className="row" style={{ backgroundColor: "rgba(100,100,100,0.5)" }}>
									<div className="col-md-2">
										Seq
									</div>
									<div className="col-md-8">
										Terms and Conditions
									</div>
									<div className="col-md-2">
										Actions
									</div>
								</div>
								<div className="row" style={{ borderBottom: "1px solid black" }}>
									<div className="col-md-2">
										1
									</div>
									<div className="col-md-8">
										Payment should be completed within 25 days of acceptance.
									</div>
									<div className="col-md-2">
										Edit
										<br />
										Remove
									</div>

								</div>
								<div className="row" style={{ borderBottom: "1px solid black" }}>
									<div className="col-md-2">
										2
									</div>
									<div className="col-md-8">
										Final Payment should be completed within 2 days of order delivery
									</div>
									<div className="col-md-2">
										Edit
										<br />
										Remove
									</div>

								</div>

							</div>
						</div>

						<div id="Payments" class="tab-content">

							<div class="payment-tabs">
								<div class="payment-tab-buttons">
									<button class="payment-tab-button active" onClick={(e) => { openPaymentTab(e, 'Advance') }}>Advance Payment</button>
									<button class="payment-tab-button" onClick={(e) => { openPaymentTab(e, 'Frequency') }}>Frequency Based</button>
									<button class="payment-tab-button" onClick={(e) => { openPaymentTab(e, 'ItemBased') }} >Items Based</button>
									<button class="payment-tab-button" onClick={(e) => { openPaymentTab(e, 'Final') }}>Final Payment</button>
								</div>

								<div id="Advance" class="payment-tab-content active">
									<div>

										<div className="row">

										</div>
										<div className="row">
										</div>
									</div>
								</div>

								<div id="Frequency" class="payment-tab-content">
									<h2>Taxes</h2>
									<p>Details about taxes will go here.</p>
								</div>

								<div id="ItemBased" class="payment-tab-content">
									<h2>Terms and Conditions</h2>
									<p>Details about terms and conditions will go here.</p>
								</div>

								<div id="Final" class="payment-tab-content">
									<h2>Payments</h2>
									<p>Details about payments will go here.</p>
								</div>
							</div>
							<div className="table">
								<div className="row" style={{ backgroundColor: "rgba(100,100,100,0.5)" }}>
									<div className="col-md-1">Seq</div>
									<div className="col-md-3">Note</div>
									<div className="col-md-3">Amt</div>
									<div className="col-md-1">PaymentType</div>
									<div className="col-md-4">Extra Information</div>
								</div>
								<div className="row" style={{ borderBottom: "1px solid black" }}>
									<div className="col-md-1">1</div>
									<div className="col-md-3">Advance payment</div>
									<div className="col-md-3">1000</div>
									<div className="col-md-1">Adavance</div>
									<div className="col-md-4">NA</div>
								</div>
								<div className="row" style={{ borderBottom: "1px solid black" }}>
									<div className="col-md-1">2</div>
									<div className="col-md-3">Have to pay 3 times every month on the day of accpetance</div>
									<div className="col-md-3">1000</div>
									<div className="col-md-1">Frequency Based</div>
									<div className="col-md-4">3 times monthly </div>
								</div>
								<div className="row" style={{ borderBottom: "1px solid black" }}>
									<div className="col-md-1">3</div>
									<div className="col-md-3">Once the items are completed</div>
									<div className="col-md-3">1000</div>
									<div className="col-md-1">Item Based</div>
									<div className="col-md-4">Item 1, Item 2,Item 3</div>
								</div>
								<div className="row" style={{ borderBottom: "1px solid black" }}>
									<div className="col-md-1">4</div>
									<div className="col-md-3">Final Pay</div>
									<div className="col-md-3">20000</div>
									<div className="col-md-1">Final Pay</div>
									<div className="col-md-4">NA</div>
								</div>
							</div>
						</div>
					</div>
				</div>


			</div>
		</>
	);
};
export default NewPO;