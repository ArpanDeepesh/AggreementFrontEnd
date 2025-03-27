import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormButton from "../FormParts/FormButton";
import { getRequest } from "../Services/ContrectBackendAPI";
import UserProfile from "../Context/UserProfile";
import "./DetailApplication.css";
import RemarkListDisplay from "../CommonPages/RemarkListDisplay";
import OtherData from "../Context/OtherData";
import Payment from "./Payment";
import PaymentList from "./PaymentList";
import AgreementNegotiation from "../CommonPages/AgreementNegotiation";

const DetailContract = ({ setUserName, setUserType }) => {
	const [remarkList, setRemarkList] = useState();
	const [agreementObj, setAgreementObj] = useState();
	const [itemList, setItemList] = useState();
	const [buyerTermList, setBuyerTermList] = useState();
	const [sellerTermList, setSellerTermList] = useState();
	const [invoiceList, setInvoiceList] = useState();
	const [paymentData, setPaymentData] = useState();
	const [payList, setPayList] = useState();
	const [remarkType, setRemarkType] = useState();
	const [remarkData, setRemarkData] = useState();
	const [payListDisplay, setPayListDisplay] = useState(0);
	const navigate = useNavigate();
	useEffect(() => {


		setUserName(UserProfile.getName());
		setUserType(UserProfile.getUserType());
		setPayListDisplay("");
		if (UserProfile.getLoginStatus() === 1) {
			console.log("Arpan1");
			navigate("/Home");
		}
		if (OtherData.getData() !== "" && OtherData.getData().length > 0) {
			var obj = JSON.parse(OtherData.getData());
			console.log(obj);
			setAgreementObj(obj);
			loadItemList(obj.id);
			loadBuyerTermList(obj.id);
			loadSellerTermList(obj.id);
			loadInvoiceList(obj.id);
		}

	}, []);
	const loadItemList = (agreementId) => {
		getRequest("api/Business/GetAgreementItems?agreementid=" + agreementId, UserProfile.getToken()).then(x => x.json()).then(res => {
			console.log(res);
			setItemList(res.data);
		}).catch(err => console.log(err));
	}
	const loadBuyerTermList = (pid) => {
		getRequest("api/Business/AgreementTermList?agreementId=" + pid + "&termType=Buyer", UserProfile.getToken()).then(x => x.json()).then(res => {
			console.log(res);
			setBuyerTermList(res.data);
		}).catch(err => console.log(err));
	}
	const loadSellerTermList = (pid) => {
		getRequest("api/Business/AgreementTermList?agreementId=" + pid + "&termType=Seller", UserProfile.getToken()).then(x => x.json()).then(res => {
			console.log(res);
			setSellerTermList(res.data);
		}).catch(err => console.log(err));
	}
	const loadInvoiceList = (pid) => {
		getRequest("api/Business/InvoiceList?ctId=" + pid, UserProfile.getToken()).then(x => x.json()).then(res => {
			console.log(res);
			setInvoiceList(res.data);
		}).catch(err => console.log(err));
	}
	const openTab = (e, id) => {
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
	const loadPaymentList = (txNotePayId) => {
		getRequest("api/Business/PayList?notePayId=" + txNotePayId, UserProfile.getToken()).then(r => r.json()).then(res => {
			if (res.status === 1)
			{
				console.log(res.data);
				if (agreementObj.seller.usrId.toString() === UserProfile.getUserId().toString()) {
					setPayListDisplay("Seller");
				} else
				{
					setPayListDisplay("Buyer");
				}
				if (res.data && res.data.length > 0) {

					setPayList(res.data);
				} else {
					setPayList([]);
				}
			}
			
		}).catch(err => console.log(err));
	}
	const generateNote = (id) => {
		getRequest("api/Business/GenerateTxnNote?invId=" + id, UserProfile.getToken()).then(r => r.json()).then(res => {
			if (res.status === 1) {
				var tempInv = {};
				for (var i = 0; i < invoiceList.length; i++) {
					if (invoiceList[i].id === id)
					{
						tempInv = invoiceList[i];
					}
                } 
				OtherData.setData(JSON.stringify({
					Agreement: agreementObj,
					Note: res.data,
					Invoice: tempInv
				}));
				navigate("/EditTxnNote");
			} else
			{
				console.log("Not able to generate note");
			}
			
		}).catch(err => console.log(err));
	}
	const completeTxnNote = (id) => {
		getRequest("?invId=" + id, UserProfile.getToken()).then(r => r.json()).then(res => {
			if (res.status === 1) {
				loadInvoiceList(agreementObj.id);
			} else {
				console.log("Not able to generate note");
			}

		}).catch(err => console.log(err));
	}

	return (
		<><div className="d-flex h-100" style={{ overflowY: 'scroll' }}>
			{agreementObj && agreementObj.id > 0 ? <div className="table" style={{ textAlign: "left" }}>
				<RemarkListDisplay remarkLst={remarkList} setRemarkLst={setRemarkList} />
				<Payment reloadMethod={() => loadInvoiceList(agreementObj.id)} data={paymentData} setData={setPaymentData} />
				<PaymentList setDisplayList={setPayListDisplay} displayList={payListDisplay} payLst={payList} setPayLst={setPayList} />
				<AgreementNegotiation
					reloadAction={() => { loadInvoiceList(agreementObj.id); }}
					type={remarkType}
					data={remarkData}
					setData={setRemarkData}
				/>
				<div className="row">
					<div className="col-md-12">
						<h4 className="headingStyle">Agreement Details </h4>
						{ agreementObj.buyer.usrId.toString() === UserProfile.getUserId().toString() ?
							<div className="row p-1" style={{ textAlign: "center" }}>
								<div className="col-md-1">
									<FormButton name="< Back" onClick={(e) => {
										e.preventDefault();
										OtherData.resetData();
										navigate("/Home");
									}} />
								</div>
							</div> : <></>}
						{agreementObj.seller.usrId.toString() === UserProfile.getUserId().toString() ?
							<div className="row p-1" style={{ textAlign: "center" }}>
								<div className="col-md-1">
									<FormButton name="< Back" onClick={(e) => {
										e.preventDefault();
										OtherData.resetData();
										navigate("/Home");
									}} />
								</div>
								<div className="col-md-3">
									<FormButton name="Raise Invoice" onClick={(e) => {
										e.preventDefault();
										OtherData.getData(JSON.stringify(agreementObj));
										navigate("/DraftInvoice");
									}} />
								</div>
							</div> : <></>}
					</div>
				</div>
				<div className="tabs">
					<div className="tab-buttons">
						<button className="tab-button active" onClick={(e) => {
							openTab(e, "Items");
						}}>Invoice & Payments</button>
						<button className="tab-button" onClick={(e) => { openTab(e, "Taxes"); }}>Contract Info</button>
						<button className="tab-button" onClick={(e) => { openTab(e, "Terms"); }}>Item & Terms</button>
					</div>
					<div id="Items" className="tab-content active">
						{invoiceList && invoiceList.length > 0 ? invoiceList.map(x => <>
							{x.invoiceStatus === "Draft" && agreementObj.seller.usrId.toString() === UserProfile.getUserId().toString() ? <>
								<div className="invoiceDisplay">

									<div className="row">
										<div className="col-md-12">
											<h4> Invoice detail</h4>
										</div>
										<div className="col-md-2">
											<span>
												<strong>Invoice Amount: </strong>
												{x.invoiceAmount}
											</span>
										</div>
										<div className="col-md-3">
											<span>
												<strong>Invoice Note: </strong>
												{x.invoiceNote}
											</span>
										</div>
										<div className="col-md-2">
											<span>
												<strong>Invoice Status: </strong>
												{x.invoiceStatus}
											</span>
										</div>
										<div className="col-md-3">
											<span>
												<strong>Raised On: </strong>
												{x.raisedOn}
											</span>
										</div>
										<div className="col-md-2">
											<FormButton name="Edit Invoice" onClick={(e) => {
												e.preventDefault();
												OtherData.setData(JSON.stringify({
													Agreement: agreementObj,
													Invoice:x
												}));
												navigate("/EditInvoice");
											}} />
										</div>
									</div>
								</div>
							</> : <></>}
							{x.invoiceStatus !== "Draft" ? <>
								<div className="invoiceDisplay">
									<div className="row">
										<div className="col-md-12">
											<h4> Invoice detail</h4>
										</div>
										<div className="col-md-3">
											<span>
												<strong>Invoice Amount: </strong>
												{x.invoiceAmount}
											</span>
										</div>
										<div className="col-md-3">
											<span>
												<strong>Invoice Note: </strong>
												{x.invoiceNote}
											</span>
										</div>
										<div className="col-md-3">
											<span>
												<strong>Invoice Status: </strong>
												{x.invoiceStatus}
											</span>
										</div>
										<div className="col-md-3">
											<span>
												<strong>Raised On: </strong>
												{x.raisedOn}
											</span>
										</div>
										<div className="col-md-12">
											<details>
												<summary>Invoice Item List</summary>
												<div>
													{x.itemList && x.itemList.length > 0 ? <>
														<div className="row tableHeader">
															<div className="col-md-1">Code</div>
															<div className="col-md-2">Title</div>
															<div className="col-md-2">Description</div>
															<div className="col-md-1">Tax</div>
															<div className="col-md-1">Quantity</div>
															<div className="col-md-1">Rate</div>
															<div className="col-md-2">Calculation</div>
															<div className="col-md-2">Note</div>
														</div>
														{x.itemList.map(y => <>

															<div className="row">
																<div className="col-md-1">{y.itemHsnCsnUin}</div>
																<div className="col-md-2">{y.itemTitle}</div>
																<div className="col-md-2">{y.itemDescription}</div>
																<div className="col-md-1">{y.itemTax}</div>
																<div className="col-md-1">{y.itemQuantityDelivered}</div>
																<div className="col-md-1">{y.itemProposedRate}</div>
																<div className="col-md-2">
																	{y.itemQuantityDelivered * y.itemProposedRate}
																	+{y.itemQuantityDelivered * y.itemProposedRate * y.itemTax / 100}=
																	{y.itemQuantityDelivered * y.itemProposedRate
																	+y.itemQuantityDelivered * y.itemProposedRate * y.itemTax / 100}
																</div>
																<div className="col-md-2">{y.inoviceItemNote}</div>
															</div>
														</>)}
													</> : <>No items in invoice</>}
												</div>
											</details>

										</div>
									</div>
									{x.txnNote && x.txnNote.id ? <>
										{
											x.txnNote.noteStatus === "Draft" && agreementObj.buyer.usrId.toString() === UserProfile.getUserId().toString() ? <div className="row">
												<div className="col-md-12">
													<h4> Transaction Note</h4>
												</div>
												<div className="col-md-3">
													<span>
														<strong>Note: </strong>
														{x.txnNote.noteRemark}
													</span>
												</div>
												<div className="col-md-3">
													<span>
														<strong>Status: </strong>
														{x.txnNote.noteStatus}
													</span>
												</div>
												<div className="col-md-3">
													<span>
														<strong>Panality: </strong>
														{x.txnNote.panalityPercent}
													</span>
												</div>
												
												<div className="col-md-3">
													<FormButton name="Edit" onClick={(e) => {
														e.preventDefault();
														OtherData.setData(JSON.stringify({
															Note: x.txnNote,
															Agreement: agreementObj,
															Invoice: x
														}));
														navigate("/EditTxnNote");
													}} />
												</div>
											</div> :<></>
										}
										{
											x.txnNote.noteStatus !== "Draft" ? <div className="row">
													<div className="col-md-12">
														<h4> Transaction Note</h4>
													</div>
													<div className="col-md-3">
														<span>
															<strong>Note: </strong>
															{x.txnNote.noteRemark}
														</span>
													</div>
													<div className="col-md-2">
														<span>
															<strong>Status: </strong>
															{x.txnNote.noteStatus}
														</span>
													</div>
													<div className="col-md-2">
														<span>
															<strong>Panality: </strong>
															{x.txnNote.panalityPercent}
														</span>
												</div>
												<div className="col-md-2">
													<div className="col-md-1">
														<strong className="d-inline d-md-none">Remarks: </strong>
														<span>
															{x.txnNote.communication && x.txnNote.communication.length > 0 ?
																<img src={"/comment2.png"} alt="Comment" className="commentIcon" width={20} height={20}
																	onClick={(e) => {
																		e.preventDefault();
																		setRemarkList(x.txnNote.communication);
																	}}
																/> : <span style={{ fontSize: "70%" }}>No remarks</span>}
															<br />
														</span>
													</div>
												</div>
												<div className="col-md-3">
													{(x.txnNote.noteStatus === "Waiting for seller or 2nd party" || x.txnNote.noteStatus === "Active" ) && agreementObj.seller.usrId.toString() === UserProfile.getUserId().toString() ? <>
														<FormButton name="Negotiate" onClick={(e) => {
															e.preventDefault();
															setRemarkType("TSN");
															setRemarkData(x.txnNote);

														}} />
														<FormButton name="Accept" onClick={(e) => {
															e.preventDefault();
															setRemarkType("TSA");
															setRemarkData(x.txnNote);
														}} />
													</> : <></>}
													{x.txnNote.noteStatus === "Waiting for Buyer or 1st party" && agreementObj.buyer.usrId.toString() === UserProfile.getUserId().toString() ? <>
														<FormButton name="Negotiate" onClick={(e) => {
															e.preventDefault();
															setRemarkType("TBN");
															setRemarkData(x.txnNote);

														}} />
														<FormButton name="Accept" onClick={(e) => {
															e.preventDefault();
															setRemarkType("TSA");
															setRemarkData(x.txnNote);
														}} />
													</> : <></>}
													{x.txnNote.noteStatus !== "Completed" && x.txnNote.noteStatus !== "Active" && agreementObj.buyer.usrId.toString() === UserProfile.getUserId().toString() ? <>
														<FormButton name="Complete" onClick={(e) => {
															e.preventDefault();
															setRemarkType("CTN");
															setRemarkData(x.txnNote);
														}} />
														
													</> : <></>}
														
													</div>
													<div className="col-md-12">
														<details>
															<summary>Transaction Note Item List</summary>
															<div>
																{x.txnNote.itemList && x.txnNote.itemList.length > 0 ? <>
																<div className="row tableHeader">
																	<div className="col-md-1">Status</div>
																	<div className="col-md-1">Code</div>
																	<div className="col-md-2">Title</div>
																	<div className="col-md-2">Description</div>
																	<div className="col-md-1">Buyer/Seller Rate</div>
																	<div className="col-md-1">Defected</div>
																	<div className="col-md-1">Delivered</div>
																	<div className="col-md-1">Remarks</div>
																	<div className="col-md-2">Action</div>
																	
																	</div>
																	{x.txnNote.itemList.map(y => <>

																		<div className="row">
																			<div className="col-md-1">{y.noteStatus}</div>
																			<div className="col-md-1">{y.itemHsnCsnUin}</div>
																			<div className="col-md-2">{y.itemTitle}</div>
																			<div className="col-md-2">{y.itemDescription}</div>
																			<div className="col-md-1">{y.buyerProposedRate}/{y.sellerProposedRate}</div>
																			<div className="col-md-1">{y.defectedCount}</div>
																			<div className="col-md-1">{y.deliveredCount}</div>
																			<div className="col-md-1">
																				<strong className="d-inline d-md-none">Remarks: </strong>
																				<span>
																					{y.communication && y.communication.length > 0 ?
																						<img src={"/comment2.png"} alt="Comment" className="commentIcon" width={20} height={20}
																							onClick={(e) => {
																								e.preventDefault();
																								setRemarkList(y.communication);
																							}}
																						/> : <span style={{ fontSize: "70%" }}>No remarks</span>}
																					<br />
																				</span>
																			</div>
																			<div className="col-md-2">
																				{y.noteStatus === "Active" && agreementObj.seller.usrId.toString() === UserProfile.getUserId().toString() ? <>
																					<FormButton name="Negotiate" onClick={(e) => {
																						e.preventDefault();
																						setRemarkType("TISN");
																						setRemarkData(y);
																					}} />
																					<FormButton name="Accept" onClick={(e) => {
																						e.preventDefault();
																						setRemarkType("TISA");
																						setRemarkData(y);
																					}} />
																				</> : <></>}
																				{y.noteStatus === "Waiting for seller or 2nd party" && agreementObj.seller.usrId.toString() === UserProfile.getUserId().toString() ? <>
																					<FormButton name="Negotiate" onClick={(e) => {
																						e.preventDefault();
																						setRemarkType("TISN");
																						setRemarkData(y);
																					}} />
																					{y.buyerProposedRate === y.sellerProposedRate ? <>
																						<FormButton name="Accept" onClick={(e) => {
																						e.preventDefault();
																						setRemarkType("TISA");
																						setRemarkData(y);
																						}} />
																					</> : <></>}
																					
																				</> : <></>}
																				{y.noteStatus === "Waiting for Buyer or 1st party" && agreementObj.buyer.usrId.toString() === UserProfile.getUserId().toString() ? <>
																					<FormButton name="Negotiate" onClick={(e) => {
																						e.preventDefault();
																						setRemarkType("TIBN");
																						setRemarkData(y);
																					}} />
																					{y.buyerProposedRate === y.sellerProposedRate ? <>
																						<FormButton name="Accept" onClick={(e) => {
																							e.preventDefault();
																							setRemarkType("TIBA");
																							setRemarkData(y);
																						}} />
																					</> : <></>}

																				</> : <></>}

																			</div>
																		</div>
																	</>)}
																</> : <>No items in transaction note</>}
																
															</div>
														</details>

													</div>

												{x.txnNote.notePayment && x.txnNote.notePayment.id ? <>
													<div className="row">
														<div className="col-md-12">
															<h4> Transaction Note Payment</h4>
														</div>
														<div className="col-md-3">
															<span>
																<strong>Status: </strong>
																{x.txnNote.notePayment.paymentStatus}
															</span>
														</div>
														<div className="col-md-3">
															<span>
																<strong>Total Due: </strong>
																{x.txnNote.notePayment.totalDueAmount}
															</span>
														</div>
														<div className="col-md-3">
															<span>
																<strong>Amount Paid: </strong>
																{x.txnNote.notePayment.totalPaidAmount}
															</span>
														</div>
														<div className="col-md-3">
															{agreementObj.buyer.usrId.toString() === UserProfile.getUserId().toString() ? <FormButton name="Pay" onClick={(e) => {
																e.preventDefault();
																setPaymentData(x.txnNote.notePayment);
															}} /> : <></>}
															<img src={"/payment-method.png"} alt="Comment" className="commentIcon" width={30} height={30}
																onClick={(e) => {
																	e.preventDefault();
																	loadPaymentList(x.txnNote.notePayment.id);
																}}
															/>
														</div>
													</div>
												</> : <>Complete the transaction note to generate payment</>}
											</div> : <></>
										}
										
									</> : <>{agreementObj.buyer.usrId.toString() === UserProfile.getUserId().toString() ? <FormButton name="Generate Note" onClick={(e) => {
											e.preventDefault();
											generateNote(x.id);
									}} /> :<></>}</>}


								</div>
							</> : <></>}
							
						</>) : <>No invoices</>}

					</div>
					<div id="Taxes" className="tab-content">
						<div className="row" style={{ textAlign: "left", paddingBottom: '10px' }}>
							<div className="col-md-6"><strong style={{ color: "#007bff" }}>Seller</strong>
								<br /><strong>Name: </strong>{agreementObj.seller.usrName}
								<br /><strong>Phone Number: </strong>{agreementObj.seller.phoneNumber}
								<br /><strong>Email: </strong>{agreementObj.seller.email}
								<br /><strong>Address: </strong>{agreementObj.seller.usrAddress}
								<br /><strong>GSTIN: </strong>{agreementObj.seller.usrGstin}
								<br /><strong>Pan: </strong>{agreementObj.seller.usrPan}
							</div>
							<div className="col-md-6"><strong style={{ color: "#007bff" }}>Buyer</strong>
								<br /><strong>Name: </strong>{agreementObj.buyer.usrName}
								<br /><strong>Phone Number: </strong>{agreementObj.buyer.phoneNumber}
								<br /><strong>Email: </strong>{agreementObj.buyer.email}
								<br /><strong>Address: </strong>{agreementObj.buyer.usrAddress}
								<br /><strong>GSTIN: </strong>{agreementObj.buyer.usrGstin}
								<br /><strong>Pan: </strong>{agreementObj.buyer.usrPan}
							</div>

						</div>
						<div className="row" style={{ textAlign: "left", paddingBottom: '10px' }}>

							<div className="col-md-6"><strong style={{ color: "#007bff" }}>Other details</strong>
								<br /><strong>Contract duration: </strong>{agreementObj.contractDuration} days
								<br /><strong>LD percent: </strong>{agreementObj.ldPercent}%
								<br /><strong>LD Days: </strong>{agreementObj.ldDays} days
								<br /><strong>Advance: </strong>{agreementObj.advance}%
								<br /><strong>Status: </strong>{agreementObj.status}
							</div>

						</div>
					</div>

					<div id="Terms" className="tab-content">
						<div className="row">
							<div className="col-md-12 pt-2 ">
								<div className="row">
									<div className="col-md-12 p-0">
										<h4 className="headingStyle">Line Items</h4>
									</div>
								</div>
								<div className="d-none d-md-block">
									<div className="row tableHeader ">
										<div className="col-md-1 ">
											Code
										</div>
										<div className="col-md-1 ">
											Title
										</div>
										<div className="col-md-3 ">
											Description
										</div>
										<div className="col-md-1 ">
											Quantity
										</div>
										<div className="col-md-2 ">
											Rate
										</div>
										<div className="col-md-2 ">
											Remarks
										</div>
										<div className="col-md-1 ">
											Tax
										</div>
										<div className="col-md-1 ">
											Completion
										</div>

									</div>
								</div>

								{itemList && itemList.length > 0 ? itemList.map((x, ind) => <div className="row p-1 tablebox">
									<div className="col-md-1 d-flex align-items-center">
										<span>
											<strong className="d-inline d-md-none">Code: </strong>
											{x.itemHsnCsnUin}</span>

									</div>
									<div className="col-md-1 d-flex align-items-center">
										<span>
											<strong className="d-inline d-md-none">Title: </strong>
											{x.itemTitle}
										</span>
									</div>
									<div className="col-md-3 d-flex align-items-center">
										<span>
											<strong className="d-inline d-md-none">Description: </strong>
											{x.itemDescription}</span>
									</div>
									<div className="col-md-1 d-flex align-items-center">
										<span>
											<strong className="d-inline d-md-none">Quantity: </strong>
											{x.itemQuantity}</span>
									</div>
									<div className="col-md-2 d-flex align-items-center" style={{ fontSize: "70%" }}>
										<span id={"displayRate" + x.id}>
											{x.sellerRate && x.sellerRate > 0 ? <span>{x.sellerRate} {x.currency}/{x.unit} </span> : <span> Waiting</span>}
											<br />
											{x.buyerRate && x.buyerRate > 0 ? <span>{x.buyerRate} {x.currency}/{x.unit} </span> : <span> Waiting</span>}
										</span>
									</div>
									<div className="col-md-2 d-flex align-items-center">
										<strong className="d-inline d-md-none">Remarks: </strong>
										<span>
											{x.communication && x.communication.length > 0 ?
												<img src={"/comment2.png"} alt="Comment" className="commentIcon" width={20} height={20}
													onClick={(e) => {
														e.preventDefault();
														setRemarkList(x.communication);
													}}
												/> : <span style={{ fontSize: "70%" }}>No remarks</span>}
											<br />
											<span class="badge bg-success text-light">{x.itemStatus}</span>
										</span>
									</div>
									<div className="col-md-1 d-flex align-items-center">
										<span id={"displayTax" + x.id}>
											{x.itemTax} %
										</span>
									</div>
									<div className="col-md-1 d-flex align-items-center">
										<span id={"displayCompletion" + x.id} style={{ fontSize: "70%" }}>
											{x.sellerItemCompletion} days / {x.buyerItemCompletion} days
										</span>
									</div>
								</div>) : <div className="row"> No Items in Purchase Agreement</div>}
							</div>

							<div className="col-md-12 pt-2 ">
								<div className="row">
									<div className="col-md-12 p-0">
										<h4 className="headingStyle">Buyer Terms</h4>
									</div>
								</div>
								<div className="row">
									<div className="col-md-1 tableHeader">S. No.</div>
									<div className="col-md-2 tableHeader">Title</div>
									<div className="col-md-4 tableHeader">Terms And Conditions</div>
									<div className="col-md-2 tableHeader">Remarks
										<br />
										status</div>
									<div className="col-md-3 tableHeader">Attachment</div>
								</div>

								{buyerTermList && buyerTermList.length > 0 ? buyerTermList.map((x, ind) => <div className="row p-1 tablebox">
									<div className="col-md-1">
										<strong className="d-inline d-md-none">S.No.: </strong>
										{ind + 1} </div>
									<div className="col-md-2">
										<strong className="d-inline d-md-none">Title: </strong>
										{x.termTitle} </div>
									<div className="col-md-4">
										<strong className="d-inline d-md-none">Terms And Conditions: </strong>
										{x.termTxt}
									</div>
									<div className="col-md-2">
										<strong className="d-inline d-md-none">Remarks: </strong>
										{x.communication && x.communication.length > 0 ?
											<img src={"/comment2.png"} alt="Comment" className="commentIcon" width={20} height={20}
												onClick={(e) => {
													e.preventDefault();
													setRemarkList(x.communication);
												}}
											/> : <span style={{ fontSize: "70%" }}>No remarks</span>}
										<br />
										<span class="badge bg-success text-light">{x.termStatus}</span>
									</div>
									<div className="col-md-3">
										<span>
											<strong className="d-inline d-md-none">Attachments: </strong>
											{x.attachments ? x.attachments.map((i) => < div className="col-md-12" style={{
												marginBottom: "2px"
											}}>
												<a href={i.link} target={"new"}>
													<img src={i.link} width={50} height={50} />
												</a>
											</div>) : <span style={{ fontsize: "70%" }}>No Attachments</span>}
										</span></div>
								</div>) : <div className="row"> No Items in Purchase Agreement</div>}
								<div className="row">
									<div className="col-md-12 p-0">
										<h4 className="headingStyle">Seller Terms</h4>
									</div>
								</div>
								<div className="row">
									<div className="col-md-1 tableHeader">S. No.</div>
									<div className="col-md-2 tableHeader">Title</div>
									<div className="col-md-4 tableHeader">Terms And Conditions</div>
									<div className="col-md-2 tableHeader">Remarks</div>
									<div className="col-md-3 tableHeader">Attachment</div>
								</div>
								{sellerTermList && sellerTermList.length > 0 ? sellerTermList.map((x, ind) => <div className="row p-1 tablebox">
									<div className="col-md-1">
										<strong className="d-inline d-md-none">S.No.: </strong>
										{ind + 1}
									</div>
									<div className="col-md-2">
										<strong className="d-inline d-md-none">Title: </strong>
										{x.termTitle} </div>
									<div className="col-md-4">
										<strong className="d-inline d-md-none">Terms And Conditions: </strong>
										{x.termTxt}
									</div>
									<div className="col-md-2">
										<strong className="d-inline d-md-none">Remarks: </strong>
										{x.communication && x.communication.length > 0 ?
											<img src={"/comment2.png"} alt="Comment" className="commentIcon" width={20} height={20}
												onClick={(e) => {
													e.preventDefault();
													setRemarkList(x.communication);
												}}
											/> : <span style={{ fontSize: "70%" }}>No remarks</span>}
										<br />
										<span class="badge bg-success text-light">{x.termStatus}</span>
									</div>
									<div className="col-md-3">
										<span>
											<strong className="d-inline d-md-none">Attachments: </strong>
											{x.attachments ? x.attachments.map((i) => < div className="col-md-12" style={{
												marginBottom: "2px"
											}}>
												<a href={i.link} target={"new"}>
													<img src={i.link} width={50} height={50} />
												</a>
											</div>) : <span style={{ fontsize: "70%" }}>No Attachments</span>}
										</span>
									</div>
								</div>) : <div className="row"> No Items in Purchase Agreement</div>}
							</div>
						</div>
					</div>
				</div>
				


			</div> : <div> Not able to display order details</div>}
		</div>
			
			
		</>
	);
};
export default DetailContract;
