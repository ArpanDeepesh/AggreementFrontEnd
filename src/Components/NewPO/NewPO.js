import "./NewPO.css";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputField from "../FormParts/InputField";
import FormSubmitButton from "../FormParts/FormSubmitButton";
import FormButton from "../FormParts/FormButton";
import { sendPostRequest, getRequest } from "../Services/POContractBackendAPI";
import UserProfile from "../Context/UserProfile";
import PurchaseOrder from "../Context/PurchaseOrder";
import { useState } from "react";
import DraftFlowPresentation from "../FlowPresentation/DraftFlowPresentation";
import MessageDisplay from "../CommonPages/MessageDisplay";
import AddPOAttachments from "../CommonPages/AddPOAttachments";
import DeleteConfirmation from "../CommonPages/DeleteConfirmation";
import DisappearingMessage from "../CommonPages/DisappearingMessage";
import InputNumberField from "../FormParts/InputNumberField";
import AddAttachment from "../CommonPages/AddAttachment";

const NewPO = ({ setUserName }) => {
	const poForm = useRef(null);
	const itemForm = useRef(null);
	const taxForm = useRef(null);
	const termForm = useRef(null);
	const payForm = useRef(null);
	const payFrqForm = useRef(null);
	const itemPayForm = useRef(null);
	const [availableItems, setAvailableItems] = useState([{ displayTxt: 'Item 1', value: '1' }, { displayTxt: 'Item 2', value: '2' },
		{ displayTxt: 'Item 3', value: '3' }, { displayTxt: 'Item 4', value: '4' }]);
	const [selectedItems, setSelectedItems] = useState([]);
	const [draggedItem, setDraggedItem] = useState(null);
	const [msg, setMsg] = useState("");
	const [msgDis, setMsgDis] = useState("");
	const [msgType, setMsgType] = useState("");
	
	const navigate = useNavigate();
	//Item related
	const [itemId, setItemId] = useState();
	const [itemTitle, setItemTitle] = useState();
	const [itemDescription, setItemDescription] = useState();
	const [itemRate, setItemRate] = useState();
	const [itemQuantity, setItemQuantity] = useState();
	const [itemDaysToComplete, setItemDaysToComplete] = useState();
	const [itemTotal, setItemTotal] = useState();
	const [itemAttachments, setItemAttachments] = useState([]);

	const [itemList, setItemList] = useState([]);
	const [itemIdToAttach, setItemIdToAttach] = useState(0);

	//OP related
	const [editMode, setEditMode] = useState(1);
	const [poId, setPoId] = useState();
	const [poTitle, setPoTitle] = useState();
	const [poRaiseForPhNo, setPoRaisedForPhNo] = useState();
	const [poDescription, setPoDescription] = useState();
	const [poNotificationPeriod, setPoNotificationPeriod] = useState();
	const [poCompletionInDays, setPoCompletionInDays] = useState();
	const [poDiscount, setPoDiscount] = useState();
	const [poCurrency, setPoCurrency] = useState();
	const [poSellerGstin, setPoSellerGstin] = useState();
	const [poSellerAddress, setPoSellerAddress] = useState();
	const [poSellerCompany, setPoSellerCompany] = useState();
	const [poBuyerGstin, setPoBuyerGstin] = useState();
	const [poBuyerAddress, setPoBuyerAddress] = useState();
	const [poBuyerCompany, setPoBuyerCompany] = useState();
	const [poAmount, setPoAmount] = useState();

	//Tax related setTaxId setTaxTitle setTaxPercent  taxId taxTitle taxPercent
	const [taxId, setTaxId] = useState();
	const [taxTitle, setTaxTitle] = useState();
	const [taxPercent, setTaxPercent] = useState();

	const [taxList, setTaxList] = useState([]);

	//Term related setTermId setTermSeq setTermValue termId termSeq termValue
	const [termId, setTermId] = useState();
	const [termValue, setTermValue] = useState();

	const [termList, setTermList] = useState([]);

	//Payment related
	const [payId, setPayId] = useState();
	const [payType, setPayType] = useState();
	const [payPartNote, setPayPartNote] = useState();
	const [payPartAmt, setPayPartAmt] = useState();
	const [payPartFrq, setPayPartFrq] = useState();
	const [payPeriodicNote, setPayPeriodicNote] = useState();
	const [payPeriodicAmt, setPayPeriodicAmt] = useState();
	const [payPeriodicFrq, setPayPeriodicFrq] = useState();
	const [payItemNote, setPayItemNote] = useState();
	const [payItemAmt, setPayItemAmt] = useState();
	

	const [payList, setPayList] = useState([]);

	
	const [autoCalculateOn, setAutoCalculateOn] = useState();
	const [remarkList, setRemarkList] = useState();
	const [attachmentList, setAttachmentList] = useState([]);

	const [attachmentId, setAttachmentId] = useState(0);
	const [attachmentParentType, setAttachmentParentType] = useState("");
	const [deleteId, setDeleteId] = useState(0);
	const [deleteType, setDeleteType] = useState("");

	const [itemDayArray, setItemDayArray] = useState([]);
	const [itemNameList, setItemNameList] = useState([]);
	const [paymentDisplayList, setPaymentDisplayList] = useState([]);
	const [payDayList, setPayDayList] = useState([]);
	

	useEffect(() => {
		if (UserProfile.getLoginStatus() !== "1") {
			navigate("/");
		}
		console.log("New PO is created"); console.log("Arpan Value Edit Mode-" + editMode);
		console.log(PurchaseOrder.getRaisedBy());
		setUserName(UserProfile.getName());
		setPoAmount(0);
		setAutoCalculateOn(1);
		resetItem(0);
		resetTax();
		termReset();
		resetPayForms();
		setPoRaisedForPhNo("+91");
		setPoNotificationPeriod(0);
		setPoDiscount(0);
		setPoCurrency('INR');
		setPoCompletionInDays(1);
		console.log(PurchaseOrder.getPoId() + PurchaseOrder.getPurchaseOrderEditFlag());
		console.log(PurchaseOrder.getPurchaseOrderEditFlag() === 1)
		if ( Number(PurchaseOrder.getPoId())>0) {

			setPurchaseOrder(PurchaseOrder.getPoId());
			addValueInItemList();
			addValueInTaxList();
			addValueInTermList();
			addValueInPayList();
			console.log("Order is already present");
		} else {
			console.log("Order not present");
		}
		console.log("Arpan Value Edit Mode-" + editMode);
	}, []);
	useEffect(() => {
		calculateDisplayVariables();
	}, [itemList, payList])
	const setPurchaseOrder = (id) => {
		getRequest('api/POManagement/GetPurchaseOrder?poId=' + id, UserProfile.getToken())
			.then(r => r.json()).then(res => {
				if (res.data.poTitle === "Locked")
				{
					PurchaseOrder.resetData();
					setMsg("Someone else is editing the purchase order. Please rediect to the home page.");
					setMsgType("Info");
					return;
				}
				lockPurchaseOrder(res.data.id);
				console.log(res);
				if (Number(res.status) === 0) {
					
					setPoId(res.data.id);
					setPoRaisedForPhNo(PurchaseOrder.getRaisedBy() === "Seller" ? res.data.poSellerPhoneNumber : res.data.poBuyerPhoneNumber);
					
					setPoTitle(res.data.poTitle);
					setPoAmount(res.data.poTotalAmount);
					setPoDescription(res.data.poDescription);
					setPoNotificationPeriod(res.data.poNotificationPeriod);
					setPoDiscount(res.data.poDiscount);
					setPoCurrency(res.data.poCurrency);
					
					setPoCompletionInDays(res.data.poCompletionDurationInDays);
					setRemarkList(res.data.remarks);
					setAttachmentList(res.data.attachments);
					setPoBuyerAddress(res.data.poBuyerAddress);
					setPoSellerAddress(res.data.poSellerAddress);
					
					setPoBuyerGstin(res.data.poBuyerGSTIN);
					setPoSellerGstin(res.data.poSellerGSTIN);
					setPoBuyerCompany(res.data.poBuyerCompany);
					setPoSellerCompany(res.data.poSellerCompany);
					setEditMode(0);
					resetInputItem(res.data.poCompletionDurationInDays);
				}
			}).catch(err => {
				console.log(err);
			});

	}
	const validatePurchaseOrder = () => {

		poForm.current['PoTitle'].style.borderColor = '#ced4da';
		poForm.current['PoRaisedForPhoneNumber'].style.borderColor = '#ced4da';
		poForm.current['PoDescription'].style.borderColor = '#ced4da';
		poForm.current['PoBuyerGSTIN'].style.borderColor = '#ced4da';
		poForm.current['PoSellerGSTIN'].style.borderColor = '#ced4da';
		poForm.current['PoSellerAddress'].style.borderColor = '#ced4da';
		poForm.current['PoBuyerAddress'].style.borderColor = '#ced4da';
		poForm.current['PoSellerCompany'].style.borderColor = '#ced4da';
		poForm.current['PoBuyerCompany'].style.borderColor = '#ced4da';
		poForm.current['PoNotificationPeriod'].style.borderColor = '#ced4da';
		poForm.current['PoCompletionDurationInDays'].style.borderColor = '#ced4da';
		poForm.current['PoDiscount'].style.borderColor = "#ced4da";


		var data = poForm.current['PoRaisedForPhoneNumber'].value;
		var isnum = /^\+91\d+$/.test(data);
		var message = "";
		console.log("1111");
		if (!isnum) {
			poForm.current['PoRaisedForPhoneNumber'].style.borderColor = 'red';
			message += "Phone Number should start with +91 \n";
			console.log("11112");
		}
		if (data.length !== 13) {
			poForm.current['PoRaisedForPhoneNumber'].style.borderColor = 'red';
			message += "Phone Number length is incorrect \n";
			console.log("11113");
		}
		if (data === "")
		{
			poForm.current['PoRaisedForPhoneNumber'].style.borderColor = 'red';
			message += "Phone Number is required \n";
			console.log("11114");
		}
		data = poForm.current['PoTitle'].value;
		if (data==="" || data.length > 99)
		{
			poForm.current['PoTitle'].style.borderColor = 'red';
			message += " Title is required and cannot be more than 100 characters \n";
			console.log("11115");
		}
		data = poForm.current['PoDescription'].value;
		if (data !== "" && data.length > 1000) {
			poForm.current['PoDescription'].style.borderColor = 'red';
			message += " Description cannot be more than 1000 characters \n";
			console.log("11116");
		}
		data = poForm.current['PoBuyerGSTIN'].value;
		if (data!=="" && !/^[A-Za-z0-9]{15}$/.test(data)) {
			poForm.current['PoBuyerGSTIN'].style.borderColor = 'red';
			message += " Buyer GSTIN should be 15 charcters and can contain only alphanumeric values. \n";
			console.log("11117");
		}
		data = poForm.current['PoSellerGSTIN'].value;
		if (data !== "" && ! /^[A-Za-z0-9]{15}$/.test(data)) {
			poForm.current['PoSellerGSTIN'].style.borderColor = 'red';
			message += " Seller GSTIN should be 15 charcters and can contain only alphanumeric values. \n";
			console.log("11118");
		}
		if (data!=="" && data === poForm.current['PoBuyerGSTIN'].value) {
			poForm.current['PoBuyerGSTIN'].style.borderColor = 'red';
			poForm.current['PoSellerGSTIN'].style.borderColor = 'red';
			message += "Buyer GSTIN and seller GSTIN cannot be equal. \n";
			console.log("11117");
		}
		data = poForm.current['PoSellerAddress'].value;
		if (data !== "" && data.length>150) {
			poForm.current['PoSellerAddress'].style.borderColor = 'red';
			message += " Seller address should be less than 150 characters \n";
			console.log("11118");
		}
		data = poForm.current['PoBuyerAddress'].value;
		if (data !== "" && data.length > 150) {
			poForm.current['PoBuyerAddress'].style.borderColor = 'red';
			message += " Buyer address should be less than 150 characters \n";
			console.log("11120");
		}
		data = poForm.current['PoSellerCompany'].value;
		if (data !== "" && data.length > 100) {
			poForm.current['PoSellerCompany'].style.borderColor = 'red';
			message += " Seller Company should be less than 100 characters \n";
			console.log("11119");
		}
		data = poForm.current['PoBuyerCompany'].value;
		if (data !== "" && data.length > 100) {
			poForm.current['PoBuyerCompany'].style.borderColor = 'red';
			message += " Buyer Company should be less than 100 characters \n";
			console.log("11121");
		}
		data = poForm.current['PoNotificationPeriod'].value;
		console.log("Notification Period" + data)
		if (data==="" || Number(data) > Number(poForm.current['PoCompletionDurationInDays'].value)) {
			console.log(poForm.current['PoCompletionDurationInDays'].value + "-----" + data);
			console.log(data > poForm.current['PoCompletionDurationInDays'].value);
			poForm.current['PoNotificationPeriod'].style.borderColor = 'red';
			message += " Notification Period cannot be negative and can not be more than completion days \n";
			console.log("11122");
		}
		data = poForm.current['PoCompletionDurationInDays'].value;
		if (data === "" || Number(data) <= 0) {
			poForm.current['PoCompletionDurationInDays'].style.borderColor = 'red';
			message += " Completion days cannot be less than 1 \n";
			console.log("11123");
		}
		data = poForm.current['PoDiscount'].value;
		if (data === "" || Number(data) < 0) {
			poForm.current['PoDiscount'].style.borderColor = 'red';
			message += "Discount cannot be negative \n";
			console.log("11123");
		}
		if (message !== "") {
			setMsg(message);
			setMsgType("Error");
		}
		return message === "";
	}
	const closeDeleteConfirmation = () => {
		setDeleteId(0);
		if (deleteType === 'LI' || deleteType === 'IA') {
			addValueInItemList();
		} else if (deleteType === 'TAX') {
			addValueInTaxList();
		} else if (deleteType === 'TNC') {
			addValueInTermList();
		} else if (deleteType === 'PAY') {
			addValueInPayList();
		} else {
			setPurchaseOrder(poId);
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		
		if (!validatePurchaseOrder())
		{
			console.log("Validation failed");
			return;
		}
		console.log("Submit button is clicked."+ UserProfile.getUserId());
		var formBody = {
			Id: poId > 0 ? poId : 0,
			PoSellerPhoneNumber: PurchaseOrder.getRaisedBy() === "Seller" ? UserProfile.getContactNumber() : poForm.current['PoRaisedForPhoneNumber'].value,
			PoBuyerPhoneNumber: PurchaseOrder.getRaisedBy() === "Buyer" ? UserProfile.getContactNumber() : poForm.current['PoRaisedForPhoneNumber'].value,
			PoTitle: poForm.current['PoTitle'].value,
			PoDescription: poForm.current['PoDescription'].value,
			PoNotificationPeriod: poForm.current['PoNotificationPeriod'].value,
			PoCompletionDurationInDays: poForm.current['PoCompletionDurationInDays'].value,
			PoStartDate: new Date().toJSON(),
			PoTotalAmount: poAmount,
			PoDiscount: poForm.current['PoDiscount'].value,
			PoCurrency: poForm.current['PoCurrency'].value,
			PoBuyerGSTIN: poForm.current['PoBuyerGSTIN'].value,
			PoSellerGSTIN: poForm.current['PoSellerGSTIN'].value,
			PoBuyerAddress: poForm.current['PoBuyerAddress'].value,
			PoSellerAddress: poForm.current['PoSellerAddress'].value,
			PoBuyerCompany: poForm.current['PoBuyerCompany'].value,
			PoSellerCompany: poForm.current['PoSellerCompany'].value
		};
		sendPostRequest('api/POManagement/AddOrUpdatePurchaseOrder', UserProfile.getToken(), formBody).then(r => r.json()).then(res => {
			console.log(res);
			if (res > 0) {
				PurchaseOrder.setPoId(res);
				setPoId(res);
				setPurchaseOrder(res);
				PurchaseOrder.setPurchaseOrderEditFlag(1);
				setMsg("Purchase order is created successfully.");
				setMsgType("Success");
			}

		}).catch(err => {
			console.log(err);
		});

	};
	const lockPurchaseOrder = (pId) => {
		console.log("Unlock button is clicked." + UserProfile.getUserId());
		getRequest('api/POManagement/LockPO?poId=' + pId, UserProfile.getToken()).then(r => r.json()).then(res => {
			console.log(res);
			if (res) {
				console.log("Setting purchae Id to " + pId);

			}
		}).catch(err => {
			console.log(err);
		});

	};
	const unlockPurchaseOrder = (e) => {
		e.preventDefault();
		console.log("Unlock button is clicked." + UserProfile.getUserId());

		getRequest('api/POManagement/UnlockPO?poId=' + poId, UserProfile.getToken()).then(r => r.json()).then(res => {
			console.log(res);
			if (res) {
				PurchaseOrder.resetData();
				navigate("/Home");
			}

		}).catch(err => {
			console.log(err);
		});

	};
	const resetItem = (defaultCompletionDays) => {
		setItemId(0);
		setItemTitle("");
		setItemDescription("");
		setItemQuantity(0);
		setItemRate(0);
		setItemDaysToComplete(defaultCompletionDays);
		setItemTotal(0);
	}
	const resetInputItem = (defaultCompletionDays) => {
		itemForm.current['ItemTitle'].value = "";
		itemForm.current['ItemDescription'].value = "";
		itemForm.current['ItemQty'].value = 0;
		itemForm.current['ItemRate'].value = 0;
		itemForm.current['ItemCompDays'].value = defaultCompletionDays;
	}
	const editItem = (e, item) => {
		console.log(item);
		e.preventDefault();
		setItemId(item.id);
		setItemTitle(item.liTitle);
		itemForm.current['ItemTitle'].value = item.liTitle;
		setItemDescription(item.liDescription);
		itemForm.current['ItemDescription'].value = item.liDescription;
		setItemQuantity(item.liQuantity);
		itemForm.current['ItemQty'].value = item.liQuantity;
		
		setItemRate(item.liRate);
		itemForm.current['ItemRate'].value = item.liRate;
		
		setItemDaysToComplete(item.liItemCompletionInDays);
		itemForm.current['ItemCompDays'].value = item.liItemCompletionInDays;
		setItemTotal(item.liQuantity * item.liRate);
	}
	const validateItem = () => {
		itemForm.current['ItemTitle'].style.borderColor = '#ced4da';
		itemForm.current['ItemDescription'].style.borderColor = '#ced4da';
		itemForm.current['ItemQty'].style.borderColor = '#ced4da';
		itemForm.current['ItemRate'].style.borderColor = '#ced4da';
		itemForm.current['ItemCompDays'].style.borderColor = '#ced4da';
		var message = "";
		var data = itemForm.current['ItemTitle'].value;
		if (data === "") {
			itemForm.current['ItemTitle'].style.borderColor = 'red';
			message += "Title is required and cannot be negative \n";
		}
		data = itemForm.current['ItemDescription'].value;
		if (data !== "" && data.length > 1000) {
			itemForm.current['ItemDescription'].style.borderColor = 'red';
			message += "Item description cannot be more than 1000\n";
		}
		data = itemForm.current['ItemQty'].value;
		if (data === "") {
			itemForm.current['ItemQty'].style.borderColor = 'red';
			message += "Item quantity is required \n";
		}
		if (data !== "" && Number(data) <= 0) {
			itemForm.current['ItemQty'].style.borderColor = 'red';
			message += "Item quantity should be greater than 0\n";
		}
		data = itemForm.current['ItemRate'].value;
		if (data === "") {
			itemForm.current['ItemRate'].style.borderColor = 'red';
			message += "Item rate is required \n";
		}
		if (data !== "" && Number(data) <= 0) {
			itemForm.current['ItemRate'].style.borderColor = 'red';
			message += "Item rate should be greater than 0\n";
		}
		data = itemForm.current['ItemCompDays'].value;
		if (data === "") {
			itemForm.current['ItemCompDays'].style.borderColor = 'red';
			message += "Item completion days is required \n";
		}
		if (data !== "" && Number(data) < 0) {
			itemForm.current['ItemCompDays'].style.borderColor = 'red';
			message += "Item completion days should be greater than 0\n";
		} if (data !== "" && Number(data) > 0 && Number(data) > Number(poCompletionInDays)) {
			itemForm.current['ItemCompDays'].style.borderColor = 'red';
			message += "Item completion days cannot be greater than contract completion days\n";
		}
		if (message !== "") {
			setMsg(message);
			setMsgType("Error");
		}
		return message === "";
	}
	const itemSubmit = (e) => {
		e.preventDefault();
		if (poId && !poId > 0) {
			setMsg("First Create Purchase Order");
			setMsgType("Error");
			return;
		}
		if (!validateItem()) {
			return;
		}
		console.log("Submit button is clicked.");
		var formBody = {
			Id: itemId,
			PurchaseOrderId: PurchaseOrder.getPoId(),
			LiTitle: itemForm.current['ItemTitle'].value,
			LiDescription: itemForm.current['ItemDescription'].value,
			LiQuantity: itemForm.current['ItemQty'].value,
			LiRate: itemForm.current['ItemRate'].value,
			LiItemCompletionInDays: itemForm.current['ItemCompDays'].value,
			LineItemStatus: 0
		}
		sendPostRequest('api/POManagement/AddOrUpdateItem', UserProfile.getToken(), formBody).then(r => r.json()).then(res => {
			console.log(res);
			if (res > 0) {
				setMsgDis("New Item is added successfully.");
				resetInputItem(poCompletionInDays);
				//setMsgType("Success");
				if (itemIdToAttach === -1)
				{
					setItemIdToAttach(res);
				}
				if (autoCalculateOn === 1)
				{
					getRequest('api/POManagement/AmountUpdatePurchaseOrder?poId=' + PurchaseOrder.getPoId() , UserProfile.getToken())
						.then(r => r.json()).then(r => {
							console.log(r);
							if (r >0) {
								setPoAmount(r);
								
								resetItem(poCompletionInDays);
								if (itemAttachments.length > 0) {
									var attachmentformBody = {
										ItemId: res,
										AttachmentLinks: itemAttachments
									};
									sendPostRequest("api/POManagement/AddLineItemAttachment", UserProfile.getToken(), attachmentformBody).then(r => r.json()).then(resAtt => {
										console.log(resAtt);
										if (resAtt.length > 0) {
											setMsgDis("Attachments added successfully.");
											setItemAttachments([]);
											addValueInItemList();
										}

									}).catch(err => {
										console.log(err);
										setMsg("Error Occured while adding attachment. Close the section and try after some time.");
										setMsgType("Error");
									});

								} else {
									addValueInItemList();
								}
								
						}
					}).catch(err => {
						console.log(err);
					});
				}
			}
		}).catch(err => {
			console.log(err);
		});
	};

	const addValueInItemList = () =>
	{
		getRequest('api/POManagement/GetPurchaseOrderItems?poId=' + PurchaseOrder.getPoId(), UserProfile.getToken())
			.then(r => r.json()).then(res => {
				console.log(res);
				if (res.status===0) {
					setItemList(res.data);
					var tempItemList = [];
					for (var i = 0; i < res.data.length; i++) {
						tempItemList.push({ displayTxt: res.data[i].liTitle, value: res.data[i].id });
                    }
					//res.data.foreach(x => tempItemList.push(x.liTitle + ":" + x.id));
					setAvailableItems(tempItemList);
					setSelectedItems([]);
					
				}
			}).catch(err => {
				console.log(err);
			});
	}

	const addValueInTaxList = () => {
		getRequest('api/POManagement/GetPurchaseOrderTaxes?poId=' + PurchaseOrder.getPoId(), UserProfile.getToken())
			.then(r => r.json()).then(res => {
				console.log(res);
				if (res.status === 0) {
					setTaxList(res.data);
				}
			}).catch(err => {
				console.log(err);
			});
	}
	const editTax = (e, tax) => {
		console.log(tax);
		e.preventDefault();
		setTaxId(tax.taxId);
		setTaxTitle(tax.title);
		setTaxPercent(tax.percent);
	}
	const resetTax = () => {
		setTaxId(0);
		setTaxTitle("");
		setTaxPercent(0);

	}
	const resetTaxInputFields = () => {
		taxForm.current['TaxPercent'].value = "0";
		taxForm.current['TaxTitle'].value = "";
	}
	const validateTax = () => {
		taxForm.current['TaxPercent'].style.borderColor = '#ced4da';
		taxForm.current['TaxTitle'].style.borderColor = '#ced4da';
		var message = "";
		var data = taxForm.current['TaxPercent'].value;
		if (data === "" || Number(data) <= 0) {
			taxForm.current['TaxPercent'].style.borderColor = 'red';
			message += "Tax percent is required and has to be greater than 0\n";
		}
		data = taxForm.current['TaxTitle'].value;
		if (data === "") {
			taxForm.current['TaxTitle'].style.borderColor = 'red';
			message+="Tax title cannot be empty \n"
		}
		if (message !== "")
		{
			setMsg(message);
			setMsgType("Error");
		}
		return message === "";
	}
	const taxSubmit = (e) => {
		e.preventDefault();
		if (poId && !poId > 0) {
			
			setMsg("First Create Purchase Order");
			setMsgType("Error");
			return;
		}
		if (!validateTax())
		{
			return;
		}
		console.log("Submit button is clicked.");
		var formBody = {
			TaxId: taxId,
			PoId: PurchaseOrder.getPoId(),
			Percent: taxForm.current['TaxPercent'].value,
			Title: taxForm.current['TaxTitle'].value
		}
		sendPostRequest('api/POManagement/AddOrUpdatePurchaseOrderTaxes', UserProfile.getToken(), formBody).then(r => r.json()).then(res => {
			console.log(res);
			if (res > 0) {
				resetTaxInputFields();
				setMsgDis("Tax is added successfully in the purchase order");
				if (autoCalculateOn === 1) {
					getRequest('api/POManagement/AmountUpdatePurchaseOrder?poId=' + PurchaseOrder.getPoId(), UserProfile.getToken())
						.then(r => r.json()).then(res => {
							console.log(res);
							if (res >0) {
								setPoAmount(res);
								addValueInTaxList();
								resetTax()
							}
						}).catch(err => {
							console.log(err);
						});
				}

			}

		}).catch(err => {
			console.log(err);
		});

	};
	const addValueInTermList = () => {
		getRequest('api/POManagement/GetPurchaseOrderTerms?poId=' + PurchaseOrder.getPoId(), UserProfile.getToken())
			.then(r => r.json()).then(res => {
				console.log(res);
				if (res.status === 0) {
					setTermList(res.data);
				}
			}).catch(err => {
				console.log(err);
			});
	}
	const editTerm = (e, term) => {
		console.log(term);
		e.preventDefault();
		setTermId(term.termId);
		setTermValue(term.val);
	}
	const termReset = () => {
		setTermId(0);
		setTermValue("");
		
	}
	const termInputReset = () => {
		termForm.current['TermText'].value = "";
	}
	const validateTerms = () => {
		termForm.current['TermText'].style.borderColor = '#ced4da';
		var data = termForm.current['TermText'].value;
		var message = "";
		if (data === "")
		{
			termForm.current['TermText'].style.borderColor = 'red';
			message = "Cannot submit term without value";
		}
		if (message !== "") {
			setMsg(message);
			setMsgType("Error");
		}
		return message === "";
	}
	const termSubmit = (e) => {
		e.preventDefault();
		if (poId && !poId > 0) {
			
			setMsg("First Create Purchase Order");
			setMsgType("Error");
			return;
		}
		if (!validateTerms()) {
			return;
		}
		console.log("Submit button is clicked.");
		var formBody = {
			TermId: termId,
			PoId: PurchaseOrder.getPoId(),
			Val: termForm.current['TermText'].value
		}
		sendPostRequest('api/POManagement/AddOrUpdateTermsAndConditions', UserProfile.getToken(), formBody).then(r => r.json()).then(res => {
			console.log(res);
			if (res > 0) {
				//setTermId(res);
				addValueInTermList();
				setMsgDis("Term is added successfully in the purchase order");
				termReset();
				termInputReset();
			}

		}).catch(err => {
			console.log(err);
		});

	};

	const resetPayForms = () => {
		setPayId(0);
		setPayPartNote("");
		setPayPartAmt(0);
		setPayPartFrq(0);

		setPayPeriodicNote("");
		setPayPeriodicAmt(0);
		setPayPeriodicFrq(0);
		setPayItemNote("");
		setPayItemAmt(0);
		
	}
	const resetInputPayForms = () => {
		setPayId(0);
		payForm.current['PayNote'].value = "";
		if (payType === 'A' || payType === 'P')
		{
			payForm.current['PayAmount'].value = '';
			payForm.current['PayPercent'].value = '';
		}
		if (payType === 'P') {
			payForm.current['PayFreq'].value = '';
		}

		payFrqForm.current['PayNote'].value = '';
		payFrqForm.current['PayAmount'].value = '';
		payFrqForm.current['PayPercent'].value = '';
		payFrqForm.current['PayFreq'].value = '';
		itemPayForm.current['PayNote'].value = '';
		itemPayForm.current['PayAmount'].value = '';
		itemPayForm.current['PayPercent'].value = '';

	}
	const validatePay = () => {
		var message = "";
		if (payType === 'F' || payType === 'P' || payType==='A') {
			payForm.current['PayNote'].style.borderColor = '#ced4da';
			
			payForm.current['PaymentType'].style.borderColor = '#ced4da';
			var data = payForm.current['PayNote'].value;
			if (data === "") {
				payForm.current['PayNote'].style.borderColor = 'red';
				message += "Pay note cannot be empty \n";
			}
			if (payType !== 'F') {
				payForm.current['PayAmount'].style.borderColor = '#ced4da';
				data = payForm.current['PayAmount'].value;
				if (data === "") {
					payForm.current['PayAmount'].style.borderColor = 'red';
					message += "Pay amount is required \n";
				}
			}
			if (payType === 'P') {
				data = payForm.current['PayFreq'].value;
				payForm.current['PayFreq'].style.borderColor = "#ced4da";
				if (data === "" || Number(data) <= 0 || Number(data)>Number(poCompletionInDays) ) {
					payForm.current['PayFreq'].style.borderColor = 'red';
					message += "Payment in days is required \n Payment in days should be greater than 0 \n Payment in days cannot be more than contract completion days \n";
				}
			}
			if (payListContainAdvancePay() && (!poId || Number(poId) === 0)) {
				payForm.current['PaymentType'].style.borderColor = 'red';
				message += "Cannot add more than 1 advance payment in the payment list \n";
			}
				
		}
		else if (payType === 'W' || payType === 'M' || payType === 'Q') {
			payFrqForm.current['PayNote'].style.borderColor = '#ced4da';
			payFrqForm.current['PayAmount'].style.borderColor = '#ced4da';
			payFrqForm.current['PayFreq'].style.borderColor = "#ced4da";
			var data = payFrqForm.current['PayNote'].value;
			if (data === "") {
				payFrqForm.current['PayNote'].style.borderColor = 'red';
				message += "Pay note cannot be empty \n";
			}
			data = payFrqForm.current['PayAmount'].value;
			if (data === "") {
				payFrqForm.current['PayAmount'].style.borderColor = 'red';
				message += "Pay amount is required \n";
			}
			data = payFrqForm.current['PayFreq'].value;
			if (data === "" || Number(data) <= 0) {
				payFrqForm.current['PayFreq'].style.borderColor = 'red';
				message += "Number of payment is required \n  Number of payments should be greater than 0 \n";
			} else {
				var d = new Date();
				var completionDate = new Date();
				completionDate.setDate(completionDate.getDate() + poCompletionInDays);
				if (payType === 'Q') {
					d.setMonth(d.getMonth() + Number(payFrqForm.current['PayFreq'].value) * 3);
				} else if (payType === "M") {
					d.setMonth(d.getMonth() + Number(payFrqForm.current['PayFreq'].value));
				} else {
					d.setDate(d.getDate() + Number(payFrqForm.current['PayFreq'].value) * 7);
				}
				if (d > completionDate) {
					payFrqForm.current['PayFreq'].style.borderColor = 'red';
					message = "Frequency pay duration cannot be more than contract completion time\n";
				}
			}
			
		}

		if (message !== "") {
			setMsg(message);
			setMsgType("Error");
		}
		return message === "";
	}
	const validateItemPay = () => {

		payFrqForm.current['PayFreq'].style.borderColor = '#ced4da';
		var data = itemPayForm.current['PayNote'].value;
		var message = "";
		if (data === "") {
			itemPayForm.current['PayNote'].style.borderColor = 'red';
			message += "Note is required.\n";
		}
		data = itemPayForm.current['PayAmount'].value;
		if (data === "") {
			itemPayForm.current['PayAmount'].style.borderColor = 'red';
			message = "Pay amount is required.\n";
		}
		if (selectedItems.length <= 0) {
			message = "Must select atleast one item \n";
		}
		if (message !== "") {
			setMsg(message);
			setMsgType("Error");
		}
		return message === "";
	}
	const remaingPay = () => {
		var remainingAmt = poAmount;
		for (var i = 0; i < payList.length; i++) {
			remainingAmt -= payList[i].amt;
		}
		return remainingAmt;
	}
	const payListContainAdvancePay = () => {
		for (var i = 0; i < payList.length; i++) {
			if (payList[i].extraInfo.startsWith('1st', 0)) {
				return true;
			}
		}
		return false;
	}
	const basePaySubmit = (e) =>
	{
		e.preventDefault();
		if (poId && !poId > 0) {
			setMsg("First Create Purchase Order");
			setMsgType("Error");
			return;
		}
		if (!validatePay()) { return; }
		var formBody = {
			PayId: payId,
			PoId: poId,
			Note: payForm.current['PayNote'].value,
			Amt: payType === 'F' ? remaingPay() : payForm.current['PayAmount'].value,
			Frq: payType === 'P' ? payForm.current['PayFreq'].value : 0,
			PaymentType: payType
		}
		//console.log(formBody);
		sendPostRequest('api/POManagement/AddOrUpdatePreApprovalPaymentFrequencyAndPartBased', UserProfile.getToken(), formBody).then(r => r.json()).then(res => {
			console.log(res);
			if (res > 0) {
				setMsgDis("Payment added successfully");
				addValueInPayList();
			}

		}).catch(err => {
			console.log(err);
		});
	}
	const frequencyPaySubmit = (e) => {
		e.preventDefault();
		if (poId && !poId > 0) {
			
			setMsg("First Create Purchase Order");
			setMsgType("Error");
			return;
		}
		if (!validatePay()) { return; }
		var formBody = {
			PayId: payId,
			PoId: poId,
			Note: payFrqForm.current['PayNote'].value,
			Amt: payFrqForm.current['PayAmount'].value,
			Frq: payFrqForm.current['PayFreq'].value,
			PaymentType: payType
		}
		//console.log(formBody);
		sendPostRequest('api/POManagement/AddOrUpdatePreApprovalPaymentFrequencyAndPartBased', UserProfile.getToken(), formBody).then(r => r.json()).then(res => {
			console.log(res);
			if (res > 0) {
				setMsgDis("Payment added successfully");
				addValueInPayList();
			}

		}).catch(err => {
			console.log(err);
		});
	}

	const itemPaySubmit = (e) => {
		e.preventDefault();
		if (poId && !poId > 0) {
			
			setMsg("First Create Purchase Order");
			setMsgType("Error");
			return;
		}
		if (!validateItemPay()) { return; }
		console.log("Submit button is clicked." );
		var formBody = {
			PayId: payId,
			PoId: poId,
			Note: itemPayForm.current['PayNote'].value,
			Amt: itemPayForm.current['PayAmount'].value,
			ItemIds: [],
		};
		for (var i = 0; i < selectedItems.length; i++) {
			formBody.ItemIds.push(selectedItems[i].value);
        }
		 
		//setMsg(JSON.stringify(formBody));
		sendPostRequest('api/POManagement/AddOrUpdatePreApprovalPaymentItemBased', UserProfile.getToken(), formBody).then(r => r.json()).then(res => {
			console.log(res);
			if (res > 0) {
				setMsgDis("Payment added successfully");
				addValueInPayList();
			}

		}).catch(err => {
			console.log(err);
		});
	};
	const addValueInPayList = () => {
		getRequest('api/POManagement/GetPurchaseOrderDraftPayments?poId=' + PurchaseOrder.getPoId(), UserProfile.getToken())
			.then(r => r.json()).then(res => {
				console.log(res);
				if (res.status === 0) {
					setPayList(res.data);
					//calculateDisplayVariables();
				}
			}).catch(err => {
				console.log(err);
			});
	}
	const editPay = (e, p) => {
		e.preventDefault();
		console.log(p);
		setPayId(p.payId);
		if (p.type === "Base payment") {
			openPaymentTab(e, "Advance");
			if (p.extraInfo.includes("1st")) {
				setPayType('A'); setPayPartAmt(p.amt);
				payForm.current["PayAmount"].value = p.amt;
				payForm.current["PayPercent"].value = Number(p.amt) * 100 / Number(poAmount); }
			else if (p.extraInfo.includes("Final")) { setPayType('F'); }
			else if (p.extraInfo.includes("number")) {
				setPayType('P');
				setPayPartFrq(0);
				setPayPartAmt(p.amt);
				payForm.current["PayAmount"].value = p.amt;
				payForm.current["PayPercent"].value = Number(p.amt) * 100 / Number(poAmount);
			}
			//setPayType('A');
			
			
			setPayPartNote(p.note);
			
		} else if (p.type === "Item Based") {
			openPaymentTab(e, "ItemBased");
			setPayType('I')
			setPayItemAmt(p.amt);
			setPayItemNote(p.note);
			payFrqForm.current["PayAmount"].value = p.amt;
			payFrqForm.current["PayPercent"].value = Number(p.amt) * 100 / Number(poAmount);
			
		}
		else if (p.type === "Frequency Based")
		{
			openPaymentTab(e, "Frequency");
			if (p.extraInfo.includes("Monthly")) { setPayType('M'); }
			else if (p.extraInfo.includes("Weekly")) { setPayType('W'); }
			else if (p.extraInfo.includes("Quaterly"))
			{ setPayType('Q'); }
			
			setPayPeriodicAmt(p.amt);
			setPayPeriodicNote(p.note);
			itemPayForm.current["PayAmount"].value = p.amt;
			itemPayForm.current["PayPercent"].value = Number(p.amt) * 100 / Number(poAmount);
		}
	}

	const submitBtnClicked = (e) => {
		console.log("btn is clicked");
		
	}
	const publishBtnClicked = (e) => {
		e.preventDefault();
		var paymentAmt = 0;
		for (var i = 0; i < payList.length; i++) { paymentAmt += Number(payList[i].amt); }
		console.log(paymentAmt);
		console.log(poAmount);
		if (Number(paymentAmt) < Number(poAmount))
		{
			setMsg("You need to add more amount in the payment list to make it equal to the contract amount.");
			setMsgType("Error");
			return;
		}
		if (Number(paymentAmt) > Number(poAmount)) {
			setMsg("You have added more amount in the payment list. Change the payment list items to reduce the payment.");
			setMsgType("Error");
			return;
		}
		var formBody = {}
		sendPostRequest('api/POManagement/RaisePurchaseOrder?poId='+poId, UserProfile.getToken(), formBody).then(r => r.json()).then(res => {
			console.log(res);
			if (res > 0) {
				navigate("/Home");
			}

		}).catch(err => {
			console.log(err);
		});

	}
	const openTab = (e, id) =>
	{
		e.preventDefault(); 
		if (id === 'Payments') {
			payForm.current['PaymentType'].value = 'P';
			openPaymentTab(e,'Advance');
		}
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
		if (id === 'Frequency' && (!payId || payId<=0))
		{
			setPayType('W');
		}
		if (id === 'Advance' && (!payId || payId <= 0)) {
			setPayType('P');
		}
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
	const updateAmount = () => {
		setItemTotal(itemForm.current['ItemRate'].value * itemForm.current['ItemQty'].value);
	}
	const onDiscountChange = (e) => {
		e.preventDefault();
		if (autoCalculateOn === 1 && PurchaseOrder.getPurchaseOrderEditFlag() === 1)
		{
			getRequest('api/POManagement/AmountUpdatePurchaseOrder?poId=' + PurchaseOrder.getPoId(), UserProfile.getToken())
				.then(r => r.json()).then(res => {
					console.log(res);
					if (res > 0) {
						setPoAmount(res);
					}
				}).catch(err => {
					console.log(err);
				});
		}
	}
	const handleDragStart = (item, listType) => {
		setDraggedItem({ item, listType });
	};

	const handleDrop = (listType) => {
		if (draggedItem) {
			if (draggedItem.listType !== listType) {
				if (listType === 'selected') {
					setAvailableItems(availableItems.filter(i => i !== draggedItem.item));
					setSelectedItems([...selectedItems, draggedItem.item]);
				} else {
					setSelectedItems(selectedItems.filter(i => i !== draggedItem.item));
					setAvailableItems([...availableItems, draggedItem.item]);
				}
			}
		}
		setDraggedItem(null);
	};
	const calculateDisplayVariables = () => {
		console.log("Calculate display variable is called " + payList.length);
		var itemNameList = [];
		var itemCompletionDayList = [];
		var tempPayList = [];
		var payCompletionDayList = [];
		for (var i = 0; i < itemList.length; i++) {
			itemNameList.push(itemList[i].liTitle);
			itemCompletionDayList.push(itemList[i].liItemCompletionInDays);
		}
		for (var ind = 0; ind < payList.length; ind++)
		{
			console.log("Adding Payment "+ind);
			if (payList[ind].type === 'Base payment') {
				console.log('Base payment');
				tempPayList.push(payList[ind].amt);
				if (payList[ind].extraInfo.startsWith('1st', 0)) {
					payCompletionDayList.push(1);
					console.log('Advance payment');
				}
				else if (payList[ind].extraInfo.startsWith('Final', 0)) {
					
					payCompletionDayList.push(Number(poCompletionInDays));
					console.log('Final payment');
				} else {
					payCompletionDayList.push(Number(payList[ind].extraInfo.split(" ")[2]));
					console.log('Part payment' + payList[ind].extraInfo.split(" "));
				}
			}
			else if (payList[ind].type === 'Frequency Based') {
				var freq = Number(payList[ind].extraInfo.split(' ')[1]);
				console.log("Freq" + freq);
				var daysToAdd = 0;
				if (payList[ind].extraInfo.startsWith("Weekly", 0)) {
					daysToAdd = 7;
				} else if (payList[ind].extraInfo.startsWith("Monthly", 0)) {
					daysToAdd = 30;
				} else if (payList[i].extraInfo.startsWith("Quaterly", 0)) {
					daysToAdd = 120;
				}
				console.log(daysToAdd);
				for (var ix = 1; ix <= freq; ix++) {
					tempPayList.push(payList[ind].amt);
					payCompletionDayList.push(ix * daysToAdd);
                }
			} else if (payList[ind].type === 'Item Based') {
				var allItems = payList[ind].extraInfo.split(',');
				var maxDays = 0;
				for (var i = 0; i < allItems.length; i++) {
					for (var indI = 0; indI < itemList.length; indI++) {
						if (itemList[indI].id === Number(allItems[i]))
						{
							if (maxDays < itemList[indI].liItemCompletionInDays) {
								maxDays = itemList[indI].liItemCompletionInDays;
							}
						}
                    }
					
				}
				tempPayList.push(payList[ind].amt);
				payCompletionDayList.push(maxDays);
			}
			
			//payCompletionDayList.push(i);
		}
		console.log(tempPayList);
		console.log(itemCompletionDayList);
		console.log(itemNameList);
		console.log(payCompletionDayList);

		setItemDayArray( itemCompletionDayList);
		setItemNameList(itemNameList);
		setPayDayList(payCompletionDayList);
		setPaymentDisplayList(tempPayList);

	}

	return (
        <>
			<div className="row" style={{ paddingTop: "25px" }}>
				<DisappearingMessage msg={msgDis} setMsg={setMsgDis }  />
				<MessageDisplay msgType={msgType} msg={msg} setMsg={setMsg} />
				<AddPOAttachments id={attachmentId} setId={setAttachmentId} type={attachmentParentType} />
				<DeleteConfirmation deleteId={deleteId} closeConfirmation={closeDeleteConfirmation} type={deleteType} />
                <div className="col-md-8 scrollable-section">
                    <div className="">

						<Form ref={poForm} onSubmit={handleSubmit}>
							<div className="row">
								<div className="col-md-12">
									<h2 style={{ color: '#007bff', textAlign: 'left', fontSize: '24px', fontWeight:'700' }}>
										{PurchaseOrder.getRaisedBy() === "Seller" ? "Sales Contract" : "Purchase Contract"}
									</h2>
								</div>
							</div>
							
                            <div className="row">
                                
                                <div className="col-md-6">
									<InputField name="PoTitle" type="tel" label="Title" value={poTitle} readOnlyValue={editMode === 0} />
								</div>
								<div className="col-md-6">
									<InputField name="PoDescription" type="tel" label="Description" value={poDescription} readOnlyValue={editMode === 0} />
								</div>
                                
							</div>
							<div className="row">
								<div className="col-md-6">
									<InputField name="PoRaisedForPhoneNumber" type="tel"
										label={PurchaseOrder.getRaisedBy() === "Seller" ? "Buyer Phone Number" : "Seller Phone Number"}
										value={poRaiseForPhNo} readOnlyValue={editMode === 0} />
								</div>
								
								<div className="col-md-6">
									<InputNumberField name="PoCompletionDurationInDays" type="number" label="Total completion time (in Days)"
										value={poCompletionInDays} readOnlyValue={editMode === 0} />
								</div>
								
							</div>
							<div className="row">
								<div className="col-md-6">
									<InputField name="PoSellerAddress" type="text"
										label={PurchaseOrder.getRaisedBy() === "Buyer" ? "Seller Address" : "Your Address"}
										value={poSellerAddress} readOnlyValue={editMode === 0} />
								</div>
								<div className="col-md-6">
									<InputField name="PoBuyerAddress" type="text"
										label={PurchaseOrder.getRaisedBy() === "Seller" ? "Buyer Address" : "Your Address"}
										value={poBuyerAddress} readOnlyValue={editMode === 0} />
								</div>
								
								
							</div>
							<div className="row">
								<div className="col-md-6">
									<InputField name="PoSellerGSTIN" type="text"
										label={PurchaseOrder.getRaisedBy() === "Buyer" ? "Seller GSTIN" : "Your GSTIN"}
										value={poSellerGstin} readOnlyValue={editMode === 0} />
								</div>
								
								<div className="col-md-6">
									<InputField name="PoBuyerGSTIN" type="text"
										label={PurchaseOrder.getRaisedBy() === "Seller" ? "Buyer GSTIN" : "Your GSTIN"}
										value={poBuyerGstin}
										readOnlyValue={editMode === 0} />
								</div>
								
							</div>
							<div className="row">
								<div className="col-md-6">
									<InputField name="PoSellerCompany" type="text"
										label={PurchaseOrder.getRaisedBy() === "Buyer" ? "Seller Company Name" : "Your Company Name"}
										value={poSellerCompany} readOnlyValue={editMode === 0} />
								</div>
								<div className="col-md-6">
									<InputField name="PoBuyerCompany" type="text"
										label={PurchaseOrder.getRaisedBy() === "Seller" ? "Buyer Company Name" : "Your Company Name"}
										value={poBuyerCompany} readOnlyValue={editMode === 0} />
								</div>
                                
							</div>
							<div className="row">
								<div className="col-md-6">
									<InputNumberField name="PoNotificationPeriod" type="number" label="Notify after (in Days)"
										value={poNotificationPeriod} readOnlyValue={editMode === 0} />
								</div>

								<div className="col-md-6">
									<InputNumberField name="PoDiscount" type="number" label="Discount" onChange={(e) => onDiscountChange(e)}
										value={poDiscount} readOnlyValue={editMode === 0} />
								</div>
								
							</div>
							<div className="row">
								<div className="col-md-6">
									<div className="form-group" style={{ textAlign: 'left' }}>
										<label style={{ fontsize: '20px', color: 'black', fontWeight: '700' }} >Currency</label>
										<select name="PoCurrency" className="form-control" disabled={editMode === 0} value={poCurrency} onChange={(e) => {
											e.preventDefault();
											setPoCurrency(e.target.value);
										}}>
											<option value="USD" >USD</option>
											<option value="INR">INR</option>
											<option value="AUD">AUD</option>
											<option value="RUB">RUB</option>
											<option value="CNY">CNY</option>
											<option value="GBP">GBP</option>
											<option value="JPY">JPY</option>
											<option value="EUR">EUR</option>
										</select>
									</div>
								</div>
								<div className="col-md-6" style={{ textAlign: "center", paddingTop: '35px', fontWeight: '700', fontSize: '20px', paddingBottom: '10px', color: "#007bff" }}>
									{poId > 0 && editMode === 0 ? <>Total Amount: {poCurrency} {poAmount} </> : <></>}
								</div>
							</div>
							<div className="row" style={{ paddingBottom: '20px', paddingTop:'20px' }}>
								
								<div className="col-md-4 col-xs-12">
									{poId > 0 && editMode === 0 ? <FormButton name="Edit Details" myStyle={{width:'100%'}} onClick={(e) => {
										e.preventDefault();
										setEditMode(1);
										alert("Current Edit mode " + editMode);
									}} /> : <FormSubmitButton name={poId > 0 ? "Save" : "Create Order"} myStyle={{ width: '100%' }} onClick={(e) => submitBtnClicked(e)} />}
								</div>
								<div className="col-md-4 col-xs-12">
									{poId && poId > 0 ? <FormButton name="Back" myStyle={{ width: '100%' }} onClick={(e) => unlockPurchaseOrder(e)} /> : <></>}
								</div>
                                <div className="col-md-4 col-xs-12">
									{poId && poId > 0 ? <FormButton name="Publish" myStyle={{ width: '100%' }} onClick={(e) => publishBtnClicked(e)} /> : <></>}
								</div>
								

                            </div>
                        </Form>
                    </div>

					{poId > 0 && editMode === 0 ? <div>
                        <div className="tabs">
                            <div className="tab-buttons">
								<button className="tab-button active" onClick={(e) => {
									openTab(e, "Items");
								}}>Items</button>
								<button className="tab-button" onClick={(e) => { openTab(e, "Taxes"); }}>Taxes</button>
								<button className="tab-button" onClick={(e) => { openTab(e, "Terms"); }}>Terms and Conditions</button>
								<button className="tab-button" onClick={(e) => { openTab(e, "Payments"); }}>Payments</button>
                            </div>
                            <div id="Items" className="tab-content active">
                                <div className="table">
                                    <Form ref={itemForm} onSubmit={itemSubmit}>
                                        <div className="row">
                                            <div className="col-md-2">
                                                <InputField name="ItemTitle" type="text" label="Title" value={itemTitle} />
                                            </div>
                                            <div className="col-md-3">
                                                <InputField name="ItemDescription" type="text" label="Description" value={itemDescription} />
                                            </div>
                                            <div className="col-md-2">
                                                <InputNumberField name="ItemRate" type="decimal" label="Rate" onChange={(e) => updateAmount()} value={itemRate} />
                                            </div>
                                            <div className="col-md-2">
                                                <InputNumberField name="ItemQty" type="number" label="Quantity" onChange={(e) => updateAmount()} value={itemQuantity} />
                                            </div>
                                            <div className="col-md-3">
                                                <InputNumberField name="ItemCompDays" type="number" label="Days To Complete" value={itemDaysToComplete} />
                                            </div>
                                            
										</div>
										<div className="row" style={{ textAlign: "left", paddingTop: '20px' }}>
											<div className="col-md-4" style={{ textAlign: "center", fontWeight: '700', fontSize: '20px', color: "#007bff", paddingTop:'30px' }}>
												Total: {poCurrency} {itemTotal} 
											</div>
                                            <div className="col-md-8">
												<label style={{ fontsize: '20px', color: 'black', fontWeight: '700', paddingLeft: '18px' }} >Attachments</label>
												<AddAttachment fileLinkList={itemAttachments} setFileLinkList={setItemAttachments} />

											</div>
											

										</div>
										<div className="row">
											<div className="offset-md-8 col-md-4" style={{ textAlign: "right" }}>
												<FormSubmitButton name={itemId > 0 ? "Save Edit" : "Save New Item"} />
											</div>
										</div>
                                    </Form>
                                </div>

								<div className="table" style={{ textAlign: "left" }}>
                                    <div className="row tableHeader">
                                        <div className="col-md-2 ">
                                            Title
                                        </div>
                                        <div className="col-md-3 ">
                                            Description
                                        </div>
                                        <div className="col-md-1 ">
                                            Rate
                                        </div>
                                        <div className="col-md-1 ">
                                            Qty
                                        </div>
                                        <div className="col-md-1 ">
                                            Total
                                        </div>
                                        <div className="col-md-2 ">
                                            Attachments
										</div>
										<div className="col-md-2 " style={{ textAlign: "center" }}>
                                            Actions
                                        </div>
                                    </div>
                                    {itemList && itemList.length > 0 ? itemList.map(x => < div className="row" style={{ borderBottom: "1px solid black" }}>
										<div className="col-md-2 d-flex align-items-center">
                                            {x.liTitle}
                                        </div>
										<div className="col-md-3 d-flex align-items-center">
                                            {x.liDescription}
                                        </div>
										<div className="col-md-1 d-flex align-items-center">
                                            {x.liRate}
                                        </div>
										<div className="col-md-1 d-flex align-items-center">
                                            {x.liQuantity}
                                        </div>
										<div className="col-md-1 d-flex align-items-center">
                                            {x.liRate * x.liQuantity}
                                        </div>
										<div className="col-md-2 d-flex align-items-center">
                                            {x.attachments ? x.attachments.map((f, i) => < div className="col-md-12">
												<a href={f.link} target={"new"}> Att-{i + 1}</a> <span className="removeLink" onClick={(e) => {
													e.preventDefault();
													setDeleteId(f.id);
													setDeleteType("IA");
												}}> Remove </span>
                                            </div>) : <>No Attachments</>}
                                        </div>
										<div className="col-md-2">
											<span>
												<div style={{ display: "inline-block", width:"50%" }}>
													<FormButton name="Edit" onClick={(e) => { editItem(e, x) }} />
												</div>
												<span className="removeLink" onClick={(e) => {
													e.preventDefault();
													setDeleteId(x.id);
													setDeleteType("LI");
												}}> Remove </span>
											</span>
											
                                            {/*<FormButton name="Remove"  />*/}
                                        </div>
                                    </div>) : <>No Item Is Present.</>}

                                </div>

                            </div>

                            <div id="Taxes" className="tab-content">
                                <div className="table">
                                    <Form ref={taxForm} onSubmit={taxSubmit}>

                                        <div className="row">

                                            <div className="col-md-6">

                                                <InputField name="TaxTitle" type="text" label="Title" value={taxTitle} />

                                            </div>

                                            <div className="col-md-6">

												<InputNumberField name="TaxPercent" type="decimal" label="Percent" value={taxPercent} />

                                            </div>

											<div className="col-md-12" style={{ textAlign: "right", paddingTop:'20px' }}>
                                                <FormSubmitButton name="Add Tax" />
                                            </div>
                                        </div>
                                    </Form>
								</div>
								<div className="table" style={{ textAlign: "left" }}>
                                    <div className="row tableHeader">
                                        <div className="col-md-5 ">
                                            Title
                                        </div>
                                        <div className="col-md-5 ">
                                            Percent
										</div>
										<div className="col-md-2 " style={{ textAlign: "center" }}>
                                            Action
                                        </div>
                                    </div>

                                    {taxList && taxList.length > 0 ? taxList.map(x => <div className="row" style={{ borderBottom: "1px solid black" }}>
										<div className="col-md-5 d-flex align-items-center">
                                            {x.title}
                                        </div>
										<div className="col-md-5 d-flex align-items-center">
                                            {x.percent}
                                        </div>
										<div className="col-md-2">
											<span>
												<div style={{ display: "inline-block", width: "50%" }}>
													<FormButton name="Edit" onClick={(e) => { editTax(e, x) }} />
												</div>
												<span className="removeLink" onClick={(e) => {
													e.preventDefault();
													setDeleteId(x.taxId);
													setDeleteType("TAX");
												}}> Remove </span>
											</span>
                                        </div>
                                    </div>) : <div className="row">No Tax Info Is Present.</div>}

                                </div>
                            </div>

                            <div id="Terms" className="tab-content">
                                <div className="table">
                                    <Form ref={termForm} onSubmit={termSubmit}>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <InputField name="TermText" type="text" label="Term" value={termValue} />
                                            </div>
                                        </div>
										<div className="row" style={{ textAlign: "right", paddingTop: '20px' }}>
                                            <div className="col-md-8">
                                                <FormButton name="Add Attachment" onClick={(e) => {
                                                    e.preventDefault();
                                                    setAttachmentParentType("T");
                                                    setAttachmentId(poId);
                                                }} />
											</div>
											<div className="col-md-4" >
                                                <FormSubmitButton name="Add Term" />
                                            </div>

                                        </div>
                                    </Form>
                                </div>
                                <div className="table">
                                    <div className="row tableHeader">
                                        <div className="col-md-10 ">
                                            Terms and Conditions
										</div>
										<div className="col-md-2 " style={{ textAlign: "center" }}>
                                            Actions
                                        </div>
                                    </div>
                                    {termList && termList.length > 0 ? termList.map(x => <div className="row" style={{ borderBottom: "1px solid black" }}>
										<div className="col-md-10 d-flex align-items-center">
                                            {x.val}
                                        </div>
										<div className="col-md-2">
											<span>
												<div style={{ display: "inline-block", width: "50%" }}>
													<FormButton name="Edit" onClick={(e) => { editTerm(e, x) }} />
												</div>
												<span className="removeLink" onClick={(e) => {
													e.preventDefault();
													setDeleteId(x.termId);
													setDeleteType("TNC");
												}}> Remove </span>
											</span>
                                        </div>
                                    </div>) : <div className="row">No terms and conditions are Present.</div>}

                                </div>
                            </div>

                            <div id="Payments" className="tab-content">

                                <div className="payment-tabs">
                                    <div className="payment-tab-buttons">
										<button className="payment-tab-button active" onClick={(e) => {
											openPaymentTab(e, 'Advance');
											resetInputPayForms();
										}}>Basic Payment</button>
										<button className="payment-tab-button" onClick={(e) => {
											openPaymentTab(e, 'Frequency');
											resetInputPayForms();
										}}>Frequency Based</button>
										<button className="payment-tab-button" onClick={(e) => {
											openPaymentTab(e, 'ItemBased');
											resetInputPayForms();
										}} >Items Based</button>

                                    </div>

                                    <div id="Advance" className="payment-tab-content active">
										<h4 style={{ color: "#007bff" }}>Basic Payment</h4>
                                        <div className="table">
                                            <Form ref={payForm} onSubmit={basePaySubmit}>
                                                <div className="row">

                                                    <div className="offset-md-2 col-md-8">
														<div className="form-group" style={{ padding: '5px', textAlign: "left" }}>
															<label style={{ fontsize: '20px', color: 'black', fontWeight: '700' }} >Select Type</label>
															<select name="PaymentType" className="form-control" onChange={(e) => {
																e.preventDefault();
																setPayType(e.target.value);
																resetInputPayForms();
															}} selected={payType}>
																<option value='A' >Advance Payment</option>
																<option value='P'>Part Payment</option>
																<option value='F'>Final Payment</option>
															</select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className={payType === 'F'?'col-md-6':"col-md-3"}>
                                                        <InputField name="PayNote" type="text" label="Note" value={payPartNote} />
                                                    </div>
													<div className={payType === 'F'?'col-md-6':"col-md-3"}>
														{payType === 'A' || payType === 'P' ? <InputField name="PayPercent" type="decimal" label="Percent" onChange={(e) => {
															e.preventDefault()
															payForm.current["PayAmount"].value = Number(e.target.value) * Number(poAmount) / 100;
														}} /> : <></>}
														{payType === 'F' ? <><div style={{ textAlign: "left", fontWeight: '700', fontSize: '20px', color: "#007bff", paddingTop:'20px' }}>
															<span>Remaining Amount: {poCurrency} {(Math.round(remaingPay() * 100) / 100).toFixed(2)}</span> 
														</div></>:<></>}
														
													</div>
													<div className={payType !== 'F' ? 'col-md-3' : ""}>
														{payType === 'A' || payType === 'P' ?
															<InputField name="PayAmount" type="decimal" label="Amount" value={payPartAmt} onChange={(e) => {
															e.preventDefault();
															payForm.current["PayPercent"].style.borderColor = "#ced4da";
															payForm.current["PayPercent"].value = Number(e.target.value) * 100 / Number(poAmount);
															if (Number(payForm.current["PayPercent"].value) > 100)
															{
																payForm.current["PayPercent"].style.borderColor = "red";
																setMsg("Percent cannot be greater than 100");
																setMsgType("Error");
															}
															}} /> : <> </>}
														
													</div>
													<div className={payType!== 'F' ? 'col-md-3' : ""}>
														{payType === 'A' || payType === 'F' ? <></> :
                                                            <InputField name="PayFreq" type="number" value={payPartFrq}
                                                                label="Payment due (in days)" />}
                                                    </div>
                                                </div>
												<div className="row">
													<div className="offset-md-9 col-md-3" style={{ paddingTop:'20px' }}>
														<FormSubmitButton name={payId && payId>0?"Save Payment Changes":"Add Payment"} />
                                                    </div>
                                                </div>
                                            </Form>
                                        </div>
                                    </div>

                                    <div id="Frequency" className="payment-tab-content">
										<h4 style={{ color: "#007bff" }}>Frequency Based</h4>
                                        <div className="table">
                                            <Form ref={payFrqForm} onSubmit={frequencyPaySubmit}>
                                                <div className="row">

                                                    <div className="offset-md-2 col-md-8">
														<div className="form-group" style={{ padding: '5px', textAlign: "left" }}>
															<label style={{ fontsize: '20px', color: 'black', fontWeight: '700' }} >Select Type</label>
                                                            <select className="form-control" onChange={(e) => { setPayType(e.target.value) }} selected={payType}>
                                                                <option value='W' >Weekly</option>
                                                                <option value='M'>Monthly</option>
                                                                <option value='Q'>Quaterly</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <InputField name="PayNote" type="text" label="Note" value={payPeriodicNote} />
                                                    </div>
													<div className="col-md-3">
														<InputField name="PayPercent" type="decimal" label="Percent" onChange={(e) => {
															e.preventDefault()
															payFrqForm.current["PayAmount"].value = Number(e.target.value) * Number(poAmount) / 100;
														}} /> 

													</div>
													<div className="col-md-3">
														<InputField name="PayAmount" type="decimal" label="Amount" value={payPartAmt} onChange={(e) => {
															e.preventDefault();
															payFrqForm.current["PayPercent"].style.borderColor = "#ced4da";
															payFrqForm.current["PayPercent"].value = Number(e.target.value) * 100 / Number(poAmount);
															if (Number(payFrqForm.current["PayPercent"].value) > 100) {
																payFrqForm.current["PayPercent"].style.borderColor = "red";
																setMsg("Percent cannot be greater than 100");
																setMsgType("Error");
															}
														}} />

													</div>
                                                    <div className="col-md-3">
                                                        <InputField name="PayFreq" type="number" label="Number of payments" value={payPeriodicFrq} />
                                                    </div>
                                                </div>
                                                <div className="row">
													<div className="offset-md-9 col-md-3" style={{ paddingTop: '20px' }}>
                                                        <FormSubmitButton name="Add Payment" />
                                                    </div>
                                                </div>
                                            </Form>
                                        </div>
                                    </div>

									<div id="ItemBased" className="payment-tab-content">
										<h4 style={{ color:"#007bff" }}>Item Based Payment</h4>
                                        <div className="table">
                                            <Form ref={itemPayForm} onSubmit={itemPaySubmit}>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <InputField name="PayNote" type="text" label="Note" value={payItemNote} />
                                                    </div>
													<div className="col-md-4">
														<InputField name="PayPercent" type="decimal" label="Percent" onChange={(e) => {
															e.preventDefault()
															itemPayForm.current["PayAmount"].value = Number(e.target.value) * Number(poAmount) / 100;
														}} />

													</div>
													<div className="col-md-4">
														<InputField name="PayAmount" type="decimal" label="Amount" value={payPartAmt} onChange={(e) => {
															e.preventDefault();
															itemPayForm.current["PayPercent"].style.borderColor = "#ced4da";
															itemPayForm.current["PayPercent"].value = Number(e.target.value) * 100 / Number(poAmount);
															if (Number(itemPayForm.current["PayPercent"].value) > 100) {
																itemPayForm.current["PayPercent"].style.borderColor = "red";
																setMsg("Percent cannot be greater than 100");
																setMsgType("Error");
															}
														}} />

													</div>
												</div>
												<div className="row" style={{ paddingTop:"20px" }}>
                                                    <div className="col-md-6">
                                                        <div className="section" onDrop={() => handleDrop('available')} onDragOver={(e) => e.preventDefault()}>
                                                            <h2>Available Items</h2>
                                                            <ul className="item-list">
                                                                {availableItems.map((item, index) => (
                                                                    <li key={index} draggable
                                                                        onDragStart={() => handleDragStart(item, 'available')}>
                                                                        {item.displayTxt}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="section" onDrop={() => handleDrop('selected')} onDragOver={(e) => e.preventDefault()}>
                                                            <h2>Selected Items</h2>
                                                            <ul className="item-list">
                                                                {selectedItems.map((item, index) => (
                                                                    <li key={index} draggable
                                                                        onDragStart={() => handleDragStart(item, 'selected')}>
                                                                        {item.displayTxt}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
													<div className="offset-md-9 col-md-3" style={{ paddingTop: '20px' }}>
                                                        <FormSubmitButton name="Add Payment" />
                                                    </div>
                                                </div>
                                            </Form>
                                        </div>
                                    </div>
								</div>
								<div className="table" style={{ textAlign: "left" }}>
                                    <div className="row tableHeader">
                                        <div className="col-md-4 ">Note</div>
                                        <div className="col-md-3 ">Amt</div>
                                        {/*<div className="col-md-1 ">PaymentType</div>*/}
										<div className="col-md-3 ">Extra Information</div>
										<div className="col-md-2" style={{ textAlign: "center" }}>Action</div>
                                    </div>
                                    {payList && payList.length > 0 ? payList.map(x => <div className="row" style={{ borderBottom: "1px solid black" }}>
										<div className="col-md-4 d-flex align-items-center" >{x.note}</div>
										<div className="col-md-3 d-flex align-items-center">{x.amt}</div>
                                      {/*  <div className="col-md-1">{x.type}</div>*/}
										<div className="col-md-3 d-flex align-items-center">{x.extraInfo}</div>
										<div className="col-md-2">

											<span>
												<div style={{ display: "inline-block", width: "50%" }}>
													{x.extraInfo.startsWith("Final payment", 0) ? <></> :
														<FormButton name="Edit" onClick={(e) => { editPay(e, x) }} />}
												</div>
												<span className="removeLink" onClick={(e) => {
													e.preventDefault();
													setDeleteId(x.payId);
													setDeleteType("PAY");
												}}> Remove </span>
											</span>
                                        </div>
                                    </div>) : <div className="row">No payments are Present.</div>}
                                </div>
                            </div>
					</div>
						
						<div className="row">
							<div className="col-md-9 p-0">
								<h4 style={{ paddingTop: "10px", textAlign: "left", color: '#007bff' }}>Agreement Attachments</h4>
							</div>
							<div className="col-md-3" style={{ paddingBottom: '10px', paddingTop: '10px', textAlign: "right" }}>
								{poId && poId > 0 ? <FormButton name="Extra Documents" myStyle={{ width: '100%' }} onClick={(e) => {
									e.preventDefault();
									setAttachmentParentType("N");
									setAttachmentId(poId);
								}} /> : <></>}
							</div>
						</div>
						<div className="row">
							<div className="col-md-8 tableHeader">Attachments</div>
							<div className="col-md-2 tableHeader">Attachment Type</div>
							<div className="col-md-2 tableHeader">Actions</div>
						</div>
						{attachmentList && attachmentList.length ? attachmentList.map((f, i) => < div className="row">
							<div className="col-md-8"><a href={f.link} target={"new"}> Attachment {i + 1}</a></div>
							<div className="col-md-2">{f.attachmentType}</div>
							<div className="col-md-2"><FormButton name="Remove" onClick={(e) => {
								e.preventDefault();
								setDeleteId(f.id);
								setDeleteType("OA");
							}} /></div>
						</div>) : <div className="row">
							No Attachments are present
						</div>}
						<h4 style={{ textAlign: "left", paddingBottom:'10px', color:'#007bff' }}>Agreement Remarks</h4>
						<div className="table">
							<div className="row tableHeader">
								<div className="col-md-2 ">Remark By</div>
								<div className="col-md-6 ">Remark</div>
								<div className="col-md-2 ">Attachments</div>
								<div className="col-md-2 ">Remark on</div>
							</div>
							{remarkList && remarkList.length > 0 ? remarkList.map(x => <div className="row p-1">
								<div className="col-md-2">{x.createdBy} </div>
								<div className="col-md-6">{x.description} </div>
								<div className="col-md-2"> {x.attachments && x.attachments.length > 0 ? x.attachments.map(a => <div><a href={a.link} target={"new"}>Attachment{a.id}</a></div>) : <>No Attachments</>}</div>
								<div className="col-md-2">{x.remarkDate} </div>
							</div>) : <div className="row"> No remarks in Purchase Aggrement</div>}
						</div>
                    </div> : <></>}

                </div>
				<div className="col-md-4 scrollable-section">

					<DraftFlowPresentation days={poCompletionInDays} itemDaysArray={itemDayArray} itemList={itemNameList} payDaysArray={payDayList} payList={paymentDisplayList} cur={poCurrency} />
                </div>
            </div>
        </>
	);
};
export default NewPO;