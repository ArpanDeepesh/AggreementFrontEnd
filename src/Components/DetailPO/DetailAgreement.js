import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormSubmitButton from "../FormParts/FormSubmitButton";
import FormButton from "../FormParts/FormButton";
import { getRequest } from "../Services/ContrectBackendAPI";
import UserProfile from "../Context/UserProfile";
import PurchaseOrder from "../Context/PurchaseOrder";
import "./DetailApplication.css";
import AgreementNegotiation from "../CommonPages/AgreementNegotiation";
import RemarkListDisplay from "../CommonPages/RemarkListDisplay";
import TreeDisplay from "./TreeDisplay";
import OtherData from "../Context/OtherData";

const DetailAgreement = ({ setUserName, setUserType }) => {
	const [remarkList, setRemarkList] = useState();
	const [agreementObj, setAgreementObj] = useState();
	const [itemList, setItemList] = useState();
	const [buyerTermList, setBuyerTermList] = useState();
	const [sellerTermList, setSellerTermList] = useState();
	const [remarkType, setRemarkType] = useState();
	const [remarkData, setRemarkData] = useState();
	const [treeDisplay, setTreeDisplay] = useState();
	const [showAcceptButton, setShowAcceptButton] = useState(0);
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
			loadItemList(obj.id);
			loadBuyerTermList(obj.id);
			loadSellerTermList(obj.id);
		}

	}, []);
	const loadItemList = (agreementId) => {
		getRequest("api/Business/GetAgreementItems?agreementid=" + agreementId, UserProfile.getToken()).then(x => x.json()).then(res => {
			console.log(res);
			setItemList(res.data);
			checkItemsAccepted(res.data);
			checkTermAccepted(buyerTermList);
			checkTermAccepted(sellerTermList);
		}).catch(err => console.log(err));
	}
	const loadBuyerTermList = (pid) => {
		getRequest("api/Business/AgreementTermList?agreementId=" + pid + "&termType=Buyer", UserProfile.getToken()).then(x => x.json()).then(res => {
			console.log(res);
			setBuyerTermList(res.data);
			checkTermAccepted(res.data);
			checkTermAccepted(sellerTermList);
			checkItemsAccepted(itemList);
		}).catch(err => console.log(err));
	}
	const loadSellerTermList = (pid) => {
		getRequest("api/Business/AgreementTermList?agreementId=" + pid + "&termType=Seller", UserProfile.getToken()).then(x => x.json()).then(res => {
			console.log(res);
			setSellerTermList(res.data);
			checkTermAccepted(res.data);
			checkTermAccepted(buyerTermList);
			checkItemsAccepted(itemList);
		}).catch(err => console.log(err));
	}
	const reloadMethod = () => {
		if (remarkType !== "AA" && remarkType !== "RA") {
			loadItemList(agreementObj.id);
			loadBuyerTermList(agreementObj.id);
			loadSellerTermList(agreementObj.id);
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
								{showAcceptButton === 1 ? <div className="col-md-3">
										<FormButton name="Start" onClick={(e) => {
											e.preventDefault();
											setRemarkData(agreementObj);
											setRemarkType("AA");

										}} />
									</div> :<></>
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
						{agreementObj.status === "Accepted" ? <span class="badge bg-success text-light">{agreementObj.status}</span> :<></>}
					</div>

				</div>

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
								<div className="col-md-1 ">
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

								<div className="col-md-1 " style={{ textAlign: "center" }}>
									Actions
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
							<div className="col-md-1 d-flex align-items-center" style={{ fontSize:"70%" }}>
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
							<div className="col-md-1" style={{ textAlign: "center" }}>
								{UserProfile.getUserId().toString() === agreementObj.buyer.usrId.toString() && x.itemStatus === "Proposed" ? <>
									<FormButton name="Negotiate" onClick={(e) => {
										e.preventDefault();
										setRemarkData(x);
										setRemarkType("BIN");
									}} />
								</> : <></>}
								{UserProfile.getUserId().toString() === agreementObj.buyer.usrId.toString() && x.itemStatus === "Waiting for Buyer" ? <>
									{x.sellerRate === x.buyerRate && x.sellerItemCompletion === x.buyerItemCompletion ? <FormButton name="Accept" onClick={(e) => {
										e.preventDefault();
										setRemarkData(x);
										setRemarkType("BIA");
									}} /> : <></>}
									<FormButton name="Negotiate" onClick={(e) => {
										e.preventDefault();
										setRemarkData(x);
										setRemarkType("BIN");
									}} />
								</> : <></>}
								{UserProfile.getUserId().toString() === agreementObj.seller.usrId.toString() && x.itemStatus === "Waiting for Seller" ? <>
									{x.sellerRate === x.buyerRate && x.sellerItemCompletion === x.buyerItemCompletion ? <FormButton name="Accept" onClick={(e) => {
										e.preventDefault();
										setRemarkData(x);
										setRemarkType("SIA");
									}} /> : <></>}
									<FormButton name="Negotiate" onClick={(e) => {
										e.preventDefault();
										setRemarkData(x);
										setRemarkType("SIN"); }} />
								</> : <></>}
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
							<div className="col-md-2 tableHeader">Attachment</div>
							<div className="col-md-1 tableHeader">Action</div>
						</div>

						{buyerTermList && buyerTermList.length > 0 ? buyerTermList.map((x, ind) => <div className="row p-1 tablebox">
							<div className="col-md-1">
								<strong className="d-inline d-md-none">S.No.: </strong>
								{ind + 1} </div>
							<div className="col-md-2">
								<strong className="d-inline d-md-none">Title: </strong>
								{ x.termTitle} </div>
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
							<div className="col-md-2">
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
							<div className="col-md-1">
								{UserProfile.getUserId().toString() === agreementObj.seller.usrId.toString()
									&& (x.termStatus === "Proposed" || x.termStatus === "Waiting for Seller") ? <>
										<FormButton name="Accept" onClick={(e) => {
											e.preventDefault();
											setRemarkData(x);
											setRemarkType("BTSA");
										}} />
										<FormButton name="Negotiate" onClick={(e) => {
											e.preventDefault();
											setRemarkData(x);
											setRemarkType("BTSN");
										}} />
								</> : <></>}
								{UserProfile.getUserId().toString() === agreementObj.buyer.usrId.toString() && x.termStatus === "Waiting for Buyer" ? <>
									<FormButton name="Negotiate" onClick={(e) => {
										e.preventDefault();
										setRemarkData(x);
										setRemarkType("BTBN");
									}} />
								</> : <></>}
							</div>
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
							<div className="col-md-2 tableHeader">Attachment</div>
							<div className="col-md-1 tableHeader">Action</div>
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
									<br/>
								<span class="badge bg-success text-light">{x.termStatus}</span>
							</div>
							<div className="col-md-2">
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
							<div className="col-md-1">
								{UserProfile.getUserId().toString() === agreementObj.buyer.usrId.toString()
									&& (x.termStatus === "Proposed" || x.termStatus === "Waiting for Buyer") ? <>
										<FormButton name="Accept" onClick={(e) => {
											e.preventDefault();
											setRemarkData(x);
											setRemarkType("STBA");
										}} />
										<FormButton name="Negotiate" onClick={(e) => {
											e.preventDefault();
											setRemarkData(x);
											setRemarkType("STBN");
										}} />
								</> : <></>}
								{UserProfile.getUserId().toString() === agreementObj.seller.usrId.toString() && x.termStatus === "Waiting for Seller" ? <>
									<FormButton name="Negotiate" onClick={(e) => {
										e.preventDefault();
										setRemarkData(x);
										setRemarkType("STSN");
									}} />
								</> : <></>}
							</div>
						</div>) : <div className="row"> No Items in Purchase Agreement</div>}
					</div>
				</div>
			</div> : <div> Not able to display order details</div>}
		</div>
			
			
		</>
	);
};
export default DetailAgreement;
