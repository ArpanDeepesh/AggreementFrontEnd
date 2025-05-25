import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormSubmitButton from "../FormParts/FormSubmitButton";
import FormButton from "../FormParts/FormButton";
import { getRequest, getRequestAllowAll } from "../Services/ContrectBackendAPI";
import UserProfile from "../Context/UserProfile";
import PurchaseOrder from "../Context/PurchaseOrder";
import "./DetailApplication.css";
import AgreementNegotiation from "../CommonPages/AgreementNegotiation";
import RemarkListDisplay from "../CommonPages/RemarkListDisplay";
import TreeDisplay from "./TreeDisplay";
import OtherData from "../Context/OtherData";
import ContractPreviewDisplay from "../D2CTemplates/ContractPreviewDisplay";

const DetailAgreement = ({ setUserName, setUserType }) => {
	const [remarkList, setRemarkList] = useState();
	const [agreementObj, setAgreementObj] = useState();
	const [itemList, setItemList] = useState();
	const [buyerTermList, setBuyerTermList] = useState();
	const [remarkType, setRemarkType] = useState();
	const [remarkData, setRemarkData] = useState();
	const [treeDisplay, setTreeDisplay] = useState();
	const [showAcceptButton, setShowAcceptButton] = useState(0);
	const [formDisplayData, setFormDisplayData] = useState();
	const [itemUnitOptions, setItemUnitOptions] = useState();
	const navigate = useNavigate();
	useEffect(() => {


		setTreeDisplay(0);

		setUserName(UserProfile.getName());
		setUserType(UserProfile.getUserType());
		if (UserProfile.getLoginStatus() === 1) {
			console.log("Arpan1");
			navigate("/Home");
		}
		if (OtherData.getData() !== "" && OtherData.getData().length > 0) {
			var obj = JSON.parse(OtherData.getData());
			console.log(obj);
			setAgreementObj(obj);
			checkAgreementAccepted(obj);
			obj["paymentTerms"] = [];
			obj["lineItems"] = [];
			obj["customTerms"] = [];
			getRequestAllowAll("api/General/UnitList").then(x => x.json()).then(res => {
				if (res.status === 1) {
					setItemUnitOptions(res.data);
				}
			}).catch(err => console.log(err));
			setFormDisplayData(obj);
			loadItemList(obj.id);
			loadBuyerTermList(obj.id);
			
		}

	}, []);
	const loadItemList = (agreementId) => {
		getRequest("api/Business/GetAgreementItems?agreementid=" + agreementId, UserProfile.getToken()).then(x => x.json()).then(res => {
			console.log(res);
			setItemList(res.data);
			//checkItemsAccepted(res.data);
			//checkTermAccepted(buyerTermList);
			for (var i = 0; i < res.data.length; i++) {
				addLineItem(res.data[i]);
            }
			
		}).catch(err => console.log(err));
	}
	const loadBuyerTermList = (pid) => {
		getRequest("api/Business/AgreementTermList?agreementId=" + pid , UserProfile.getToken()).then(x => x.json()).then(res => {
			console.log(res);
			setBuyerTermList(res.data);
			//checkTermAccepted(res.data);
			//checkItemsAccepted(itemList);
			for (var i = 0; i < res.data.length; i++) {
				if (res.data[i].isPaymentTerm) {
					addPaymentTerm(res.data[i].id, res.data[i].termTxt, res.data[i].termTitle);
				} else
				{
					addCustomTerm(res.data[i].id, res.data[i].termTxt, res.data[i].termTitle);
				}
				
			}
		}).catch(err => console.log(err));
	}

	const reloadMethod = () => {
		if (remarkType !== "AA" && remarkType !== "RA") {
			loadItemList(agreementObj.id);
			loadBuyerTermList(agreementObj.id);
		} else
		{
			navigate("/home");
		}
		

	}
	const checkItemsAccepted = (lst) => {
		for (var i = 0; i < lst.length; i++) {
			if (lst[i].itemStatus !== "Accepted") {
				setShowAcceptButton(0);
				return false;
			}
		}
		console.log("displaying btn3");
		setShowAcceptButton(1);
		return true;
	}

	const checkTermAccepted = (lst) =>
	{
		for (var i = 0; i < lst.length; i++) {
			if (lst[i].termStatus !== "Accepted") {
				setShowAcceptButton(0);
				return false;
			}
		}
		console.log("displaying btn2");
		setShowAcceptButton(1);
		return true;
	}
	const checkAgreementAccepted = (obj) =>
	{
		if (obj.status === "Accepted") {
			setShowAcceptButton(1);
			console.log("displaying btn1");
		} else {
			setShowAcceptButton(0);
			return false;
		}
		
		return true;
	}
	const addCustomTerm = (termId, termText, termTitle) => {
		if (!termText.trim()) return;
		removeCustomTerm(termId);
		setFormDisplayData(prev => ({
			...prev,
			customTerms: [
				...prev.customTerms,
				{
					id: termId === 0 ? Date.now() : termId,
					title: termTitle,
					text: termText,
					status: 'pending'
				}
			]
		}));
	};
	const addPaymentTerm = (termId, termText, termTitle) => {
		if (!termText.trim()) return;
		removePaymentTerm(termId);
		setFormDisplayData(prev => ({
			...prev,
			paymentTerms: [
				...prev.paymentTerms,
				{
					id: termId === 0 ? Date.now() : termId,
					title: termTitle,
					text: termText,
					status: 'pending'
				}
			]
		}));
	};
	const removePaymentTerm = (id) => {
		setFormDisplayData(prev => ({
			...prev,
			paymentTerms: prev.paymentTerms.filter(t => t.id !== id)
		}));
	};
	const removeCustomTerm = (id) => {
		setFormDisplayData(prev => ({
			...prev,
			customTerms: prev.customTerms.filter(t => t.id !== id)
		}));
	};
	const removeLineItem = (id) => {
		setFormDisplayData(prev => ({
			...prev,
			lineItems: prev.lineItems.filter(item => item.id !== id)
		}));
	};
	const addLineItem = (item) => {
		removeLineItem(item.id);
		setFormDisplayData(prev => ({
			...prev,
			lineItems: [
				...prev.lineItems,
				{

					id: item.id,
					title: item.itemTitle,
					description: item.itemDescription,
					hsnSac: item.itemHsnCsnUin,
					quantity: item.itemQuantity,
					unit: item.unit,
					buyerRate: item.buyerRate,
					sellerRate: item.sellerRate,
					currency:item.currency
				}
			]
		}));
	};
	const getStatusClass = (status) => {
		switch (status) {
			case 'Accepted': return 'status-accepted';
			case 'rejected': return 'status-rejected';
			case 'pending': return 'status-pending';
			case 'Active': return 'status-accepted';
			case 'Proposed': return 'status-pending';
			case 'Waiting for Seller': return 'status-pending';
			case 'Waiting for Buyer': return 'status-pending';
			default: return '';
		}
	};

	const getStatusText = (status) => {
		switch (status) {
			case 'Accepted': return 'Accepted';
			case 'rejected': return 'Rejected';
			case 'pending': return 'Pending';
			case 'Active': return 'Active';
			case 'Proposed': return 'Proposed';
			case 'Waiting for Seller': return 'Seller Action Pending';
			case 'Waiting for Buyer': return 'Buyer Action Pending';
			default: return '';
		}
	};

	return (
		<><div className="main-content" style={{ overflowY: 'scroll' }}>
			{agreementObj && agreementObj.id > 0 ? <div className="table" style={{ textAlign: "left" }}>
				<AgreementNegotiation
					reloadAction={reloadMethod}
					type={remarkType}
					data={remarkData}
					setData={setRemarkData}
				/>
				<RemarkListDisplay remarkLst={remarkList} setRemarkLst={setRemarkList} />
				<div className="row">
					<div className="col-md-12">
						<h4 className="headingStyle">Agreement Details </h4>
						{ agreementObj.buyer.usrId.toString() === UserProfile.getUserId().toString() ?
							<div className="row p-1" style={{ textAlign: "center" }}>
								<div className="col-md-1" style={{ textAlign:"left" }}>
								<FormButton name="< Back" onClick={(e) => {
									e.preventDefault();
									navigate("/Home");
								}} />
							</div>
							<div className="col-md-3">
								<FormButton name="Reject" onClick={(e) => {
										e.preventDefault();
										setRemarkData(agreementObj);
									setRemarkType("AR");


								}} />
								</div>
								{agreementObj.status === "Proposed"
									|| agreementObj.status === "Draft" ? <FormButton name="Start" onClick={(e) => {
										e.preventDefault();
										setRemarkData(agreementObj);
										setRemarkType("AA");

									}} />:<></>
								}
								

							</div> : <></>}
						{agreementObj.seller.usrId.toString() === UserProfile.getUserId().toString() ?
							<div className="row p-1" style={{ textAlign: "center" }}>
								<div className="col-md-1">
									<FormButton name="< Back" onClick={(e) => {
										e.preventDefault();
										navigate("/Home");
									}} />
								</div>
							</div> : <></>}
					</div>
				</div>
				<div className="row" style={{ textAlign: "left", paddingBottom:'10px' }}>
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
					<div className="col-md-6">
						{agreementObj.communication && agreementObj.communication.length > 0 ?
							<img src={"/comment2.png"} alt="Comment" className="commentIcon" width={20} height={20}
								onClick={(e) => {
									e.preventDefault();
									setRemarkList(agreementObj.communication);
								}}
							/> : <span style={{ fontSize: "70%" }}>No remarks</span>}
						{UserProfile.getUserId().toString() === agreementObj.buyer.usrId.toString() && agreementObj.status === "Proposed" ? <>
							<FormButton name="Negotiate" onClick={(e) => {
								e.preventDefault();
								setRemarkData(agreementObj);
								setRemarkType("BAN");
							}} />
						</> : <></>}
						{UserProfile.getUserId().toString() === agreementObj.buyer.usrId.toString() && agreementObj.status === "Waiting for Buyer" ? <>
							<FormButton name="Negotiate" onClick={(e) => {
								e.preventDefault();
								setRemarkData(agreementObj);
								setRemarkType("BAN");
							}} />
						</> : <></>}
						{UserProfile.getUserId().toString() === agreementObj.seller.usrId.toString() && agreementObj.status === "Waiting for Seller" ? <>
							<FormButton name="Accept" onClick={(e) => {
								e.preventDefault();
								setRemarkData(agreementObj);
								setRemarkType("SAA");
							}} />
							<FormButton name="Negotiate" onClick={(e) => {
								e.preventDefault();
								setRemarkData(agreementObj);
								setRemarkType("SAN");
							}} />
						</> : <></>}
						{agreementObj.status === "Accepted" ? <span className="badge bg-success text-light">{agreementObj.status}</span> :<></>}
					</div>

				</div>

				<div className="row">
					<div className="col-md-12 pt-2">
						<div className="col-md-12 pt-2">
							<div className="form-group">
								<label>Item List</label>
								<table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
									<thead>
										<tr>
											<th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Title</th>
											<th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Description</th>
											<th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Quantity</th>
											<th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Rates</th>
											<th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Tax</th>
											<th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Completion</th>
											<th style={{ textAlign: 'right', padding: '8px', borderBottom: '1px solid #ddd' }}></th>
										</tr>
									</thead>
									<tbody>
										{itemList && itemList.length > 0 ?itemList.map(item => (
											<tr key={item.id}>
												<td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{item.itemTitle|| 'Title'}<br />
													<br />{item.itemHsnCsnUin}</td>
												<td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{item.itemDescription|| 'Description'}</td>
												<td style={{  padding: '8px', borderBottom: '1px solid #ddd' }}>
													{item.itemQuantity} 
												</td>
												<td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
													{item.sellerRate && item.sellerRate > 0 ? <span>{item.sellerRate} {item.currency}/{item.unit} </span> : <span> Waiting</span>}
													<br />
													{item.buyerRate && item.buyerRate > 0 ? <span>{item.buyerRate} {item.currency}/{item.unit} </span> : <span> Waiting</span>}
												</td>
												<td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
													{item.itemTax} %
												</td>
												<td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
													{item.sellerItemCompletion} days / {item.buyerItemCompletion} days 
												</td>
												<td style={{ textAlign: 'right', padding: '8px', borderBottom: '1px solid #ddd' }}>
													<span className={`term-status ${getStatusClass(item.itemStatus)}`}>
														{getStatusText(item.itemStatus)}
													</span>
													<span>
														{item.communication && item.communication.length > 0 ?
															<span className="remove-item" onClick={(e) => {
																e.preventDefault();
																setRemarkList(item.communication);
															}}>
																<i className="fas fa-comments"></i>
															</span>
															: <span style={{ fontSize: "70%" }}>No remarks</span>}
														<br />
													</span>
													{UserProfile.getUserId().toString() === agreementObj.buyer.usrId.toString() && item.itemStatus === "Proposed" ? <>
														<span className="remove-item" onClick={(e) => {
															e.preventDefault();
															setRemarkData(item);
															setRemarkType("BIN");
														}}>
															<i className="fas fa-handshake"></i>
														</span>
													</> : <></>}
													{UserProfile.getUserId().toString() === agreementObj.buyer.usrId.toString() && item.itemStatus === "Waiting for Buyer" ? <>
														{item.sellerRate === item.buyerRate && item.sellerItemCompletion === item.buyerItemCompletion ? <span className="remove-item" onClick={(e) => {
															e.preventDefault();
															setRemarkData(item);
															setRemarkType("BIA");
														}}>
															<i className="fas fa-check"></i>
														</span> : <></>}
														<span className="remove-item" onClick={(e) => {
															e.preventDefault();
															setRemarkData(item);
															setRemarkType("BIN");
														}}>
															<i className="fas fa-handshake"></i>
														</span>
													</> : <></>}
													{UserProfile.getUserId().toString() === agreementObj.seller.usrId.toString() && item.itemStatus === "Waiting for Seller" ? <>
														{item.sellerRate === item.buyerRate && item.sellerItemCompletion === item.buyerItemCompletion ? <span className="remove-item" onClick={(e) => {
															e.preventDefault();
															setRemarkData(item);
															setRemarkType("SIA");
														}}>
															<i className="fas fa-check"></i>
														</span> : <></>}
														<span className="remove-item" onClick={(e) => {
															e.preventDefault();
															setRemarkData(item);
															setRemarkType("SIN");
														}}>
															<i className="fas fa-handshake"></i>
														</span>
													</> : <></>}
												</td>
											</tr>
										)):<></>}
									</tbody>
								</table>

							</div>
						</div>
						<div className="col-md-12 pt-2">
							<div className="form-group">
								<label>Terms</label>
								<ul className="terms-list">
									{buyerTermList && buyerTermList.length>0?buyerTermList.map(term => (
										<li className="term-item" key={term.id}>

											<label htmlFor={`custom-term-${term.id}`}>
												<span>
													{term.termTitle}
												</span>
											</label>
											<label >
												<span>
													{term.termTxt}
												</span>
											</label>
											<span className={`term-status ${getStatusClass(term.termStatus)}`}>
												{getStatusText(term.termStatus)}
											</span>
											{term.communication && term.communication.length > 0 ?
												<span className="remove-item" onClick={(e) => {
													e.preventDefault();
														setRemarkList(term.communication);
												}}>
													<i className="fas fa-comments"></i>
												</span>
												: <span style={{ fontSize: "70%" }}>No remarks</span>}
											{UserProfile.getUserId().toString() === agreementObj.seller.usrId.toString()
												&& (term.termStatus === "Proposed" || term.termStatus === "Waiting for Seller") ? <>
												<span className="remove-item" onClick={(e) => {
													e.preventDefault();
													setRemarkData(term);
													setRemarkType("BTSA");
												}}>
														<i className="fas fa-check"></i>
												</span>
												<span className="remove-item" onClick={(e) => {
													e.preventDefault();
													setRemarkData(term);
													setRemarkType("BTSN");
												}}>
														<i className="fas fa-handshake"></i>
												</span>
											</> : <></>}
											{UserProfile.getUserId().toString() === agreementObj.buyer.usrId.toString() && term.termStatus === "Waiting for Buyer" ? <>
												<span className="remove-item" onClick={(e) => {
													e.preventDefault();
													setRemarkData(term);
													setRemarkType("BTBN");
												}}>
													<i className="fas fa-handshake"></i>
												</span>
											</> : <></>}
										</li>
									)):<>Loading Term List</>}
								</ul>
							</div>
						</div>
					</div>
					<div className="col-md-12 pt-2">
						<ContractPreviewDisplay formData={formDisplayData} unitOptions={itemUnitOptions} />
					</div>
				</div>
			</div> : <div> Not able to display order details</div>}
		</div>
			
			
		</>
	);
};
export default DetailAgreement;
