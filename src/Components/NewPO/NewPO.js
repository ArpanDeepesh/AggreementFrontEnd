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
import AddItemAndPOAttachments from "../CommonPages/AddItemAndPOAttachments";
import DeleteConfirmation from "../CommonPages/DeleteConfirmation";

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
	
	const navigate = useNavigate();
	//Item related
	const [itemId, setItemId] = useState();
	const [itemTitle, setItemTitle] = useState();
	const [itemDescription, setItemDescription] = useState();
	const [itemRate, setItemRate] = useState();
	const [itemQuantity, setItemQuantity] = useState();
	const [itemDaysToComplete, setItemDaysToComplete] = useState();
	const [itemTotal, setItemTotal] = useState();

	const [itemList, setItemList] = useState([]);
	const [itemIdToAttach, setItemIdToAttach] = useState(0);

	//OP related
	const [poId, setPoId] = useState();
	const [poTitle, setPoTitle] = useState();
	const [poRaiseForPhNo, setPoRaisedForPhNo] = useState();
	const [poDescription, setPoDescription] = useState();
	const [poNotificationPeriod, setPoNotificationPeriod] = useState();
	const [poCompletionInDays, setPoCompletionInDays] = useState();
	const [poDiscount, setPoDiscount] = useState();
	const [poAmount, setPoAmount] = useState();

	//Tax related setTaxId setTaxTitle setTaxPercent  taxId taxTitle taxPercent
	const [taxId, setTaxId] = useState();
	const [taxTitle, setTaxTitle] = useState();
	const [taxPercent, setTaxPercent] = useState();

	const [taxList, setTaxList] = useState([]);

	//Term related setTermId setTermSeq setTermValue termId termSeq termValue
	const [termId, setTermId] = useState();
	const [termSeq, setTermSeq] = useState();
	const [termValue, setTermValue] = useState();

	const [termList, setTermList] = useState([]);

	//Payment related
	const [payId, setPayId] = useState();
	const [payType, setPayType] = useState();
	const [payPartSeq, setPayPartSeq] = useState();
	const [payPartNote, setPayPartNote] = useState();
	const [payPartAmt, setPayPartAmt] = useState();
	const [payPartFrq, setPayPartFrq] = useState();
	const [payPeriodicSeq, setPayPeriodicSeq] = useState();
	const [payPeriodicNote, setPayPeriodicNote] = useState();
	const [payPeriodicAmt, setPayPeriodicAmt] = useState();
	const [payPeriodicFrq, setPayPeriodicFrq] = useState();
	const [payItemSeq, setPayItemSeq] = useState();
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
		console.log();
		setUserName(UserProfile.getName());
		setPoAmount(0);
		setAutoCalculateOn(1);
		resetItem();
		resetTax();
		termReset();
		resetPayForms();
		console.log(PurchaseOrder.getPoId() + PurchaseOrder.getPurchaseOrderEditFlag());
		console.log(PurchaseOrder.getPurchaseOrderEditFlag() === 1)
		if (PurchaseOrder.getPoId().toString() !== "0" && PurchaseOrder.getPoId()>0) {

			setPurchaseOrder(PurchaseOrder.getPoId());
			addValueInItemList();
			addValueInTaxList();
			addValueInTermList();
			addValueInPayList();
			console.log("Order is already present");
		} else {
			console.log("Order not present");
		}
	}, []);
	useEffect(() => {
		calculateDisplayVariables();
	}, [termList , payList])
	const setPurchaseOrder = (id) => {
		getRequest('api/POManagement/GetPurchaseOrder?poId=' + id, UserProfile.getToken())
			.then(r => r.json()).then(res => {
				console.log(res);
				if (res.status === 0) {
					setPoId(res.data.id);
					setPoRaisedForPhNo(res.data.poRaisedForPhoneNumber);
					setPoTitle(res.data.poTitle);
					setPoAmount(res.data.poTotalAmount);
					setPoDescription(res.data.poDescription);
					setPoNotificationPeriod(res.data.poNotificationPeriod);
					setPoDiscount(res.data.poDiscount);
					setPoCompletionInDays(res.data.poCompletionDurationInDays);
					setRemarkList(res.data.remarks);
					setAttachmentList(res.data.attachments);
				}
			}).catch(err => {
				console.log(err);
			});

	}

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Submit button is clicked."+ UserProfile.getUserId());
		var formBody = {
			Id: poId > 0 ? poId : 0,
			PoRaisedBy: UserProfile.getUserId(),
			PoRaisedForPhoneNumber: poForm.current['PoRaisedForPhoneNumber'].value,
			PoTitle: poForm.current['PoTitle'].value,
			PoDescription: poForm.current['PoDescription'].value,
			PoNotificationPeriod: poForm.current['PoNotificationPeriod'].value,
			PoCompletionDurationInDays: poForm.current['PoCompletionDurationInDays'].value,
			PoStartDate: new Date().toJSON(),
			PoTotalAmount: poAmount,
			PoDiscount: poForm.current['PoDiscount'].value
		};
		sendPostRequest('api/POManagement/AddOrUpdatePurchaseOrder', UserProfile.getToken(), formBody).then(r => r.json()).then(res => {
			console.log(res);
			if (res > 0) {
				PurchaseOrder.setPoId(res);
				PurchaseOrder.setPurchaseOrderEditFlag(1);
				setMsg("Purchase order is created successfully.");
			}

		}).catch(err => {
			console.log(err);
		});

	};
	const resetItem = () => {
		setItemId(0);
		setItemTitle("");
		setItemDescription("");
		setItemQuantity(0);
		setItemRate(0);
		setItemDaysToComplete(0);
		setItemTotal(0);
	}
	const editItem = (e, item) => {
		console.log(item);
		e.preventDefault();
		setItemId(item.id);
		setItemTitle(item.liTitle);
		setItemDescription(item.liDescription);
		setItemQuantity(item.liQuantity);
		setItemRate(item.liRate);
		setItemDaysToComplete(item.liItemCompletionInDays);
		setItemTotal(item.liQuantity * item.liRate);
	}
	const itemSubmit = (e) => {
		e.preventDefault();
		if (poId && !poId > 0) {
			setMsg("First Create Purchase Order");
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
				setMsg("New Item is added successfully.");
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
								addValueInItemList();
								resetItem();
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
	const taxSubmit = (e) => {
		e.preventDefault();
		if (poId && !poId > 0) {
			
			setMsg("First Create Purchase Order");
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
				//setTaxId(res);
				setMsg("Tax is added successfully in the purchase order");
				if (autoCalculateOn === 1) {
					getRequest('api/POManagement/AmountUpdatePurchaseOrder?poId=' + PurchaseOrder.getPoId(), UserProfile.getToken())
						.then(r => r.json()).then(res => {
							console.log(res);
							if (res >0) {
								setPoAmount(res);
								addValueInTaxList();
								resetTax();
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
		setTermSeq(term.seq);
		setTermValue(term.val);
	}
	const termReset = () => {
		setTermId(0);
		setTermSeq(0);
		setTermValue("");
	}
	const termSubmit = (e) => {
		e.preventDefault();
		if (poId && !poId > 0) {
			
			setMsg("First Create Purchase Order");
			return;
		}
		console.log("Submit button is clicked.");
		var formBody = {
			TermId: termId,
			PoId: PurchaseOrder.getPoId(),
			Seq: termForm.current['TermSeq'].value,
			Val: termForm.current['TermText'].value
		}
		sendPostRequest('api/POManagement/AddOrUpdateTermsAndConditions', UserProfile.getToken(), formBody).then(r => r.json()).then(res => {
			console.log(res);
			if (res > 0) {
				//setTermId(res);
				addValueInTermList();
				setMsg("Term is added successfully in the purchase order");
				termReset();
			}

		}).catch(err => {
			console.log(err);
		});

	};

	const resetPayForms = () => {
		setPayId(0);
		setPayPartSeq(payList.lenght + 1);
		setPayPartNote("");
		setPayPartAmt(0);
		setPayPartFrq(0);

		setPayPeriodicNote("");
		setPayPeriodicSeq(payList.lenght + 1);
		setPayPeriodicAmt(0);
		setPayPeriodicFrq(0);
		setPayItemSeq(payList.lenght + 1);
		setPayItemNote("");
		setPayItemAmt(0);
		
	}
	const basePaySubmit = (e) =>
	{
		e.preventDefault();
		if (poId && !poId > 0) {
			setMsg("First Create Purchase Order");
			return;
		}
		var formBody = {
			PayId: payId,
			PoId: poId,
			Seq: payForm.current['PaySeq'].value,
			Note: payForm.current['PayNote'].value,
			Amt: payForm.current['PayAmount'].value,
			Frq: payType === 'P' ? payForm.current['PayFreq'].value : 0,
			PaymentType: payType
		}
		//console.log(formBody);
		sendPostRequest('api/POManagement/AddOrUpdatePreApprovalPaymentFrequencyAndPartBased', UserProfile.getToken(), formBody).then(r => r.json()).then(res => {
			console.log(res);
			if (res > 0) {
				setMsg("Payment added successfully");
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
			return;
		}
		var formBody = {
			PayId: payId,
			PoId: poId,
			Seq: payFrqForm.current['PaySeq'].value,
			Note: payFrqForm.current['PayNote'].value,
			Amt: payFrqForm.current['PayAmount'].value,
			Frq: payFrqForm.current['PayFreq'].value,
			PaymentType: payType
		}
		//console.log(formBody);
		sendPostRequest('api/POManagement/AddOrUpdatePreApprovalPaymentFrequencyAndPartBased', UserProfile.getToken(), formBody).then(r => r.json()).then(res => {
			console.log(res);
			if (res > 0) {
				setMsg("Payment added successfully");
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
			return;
		}
		console.log("Submit button is clicked." );
		var formBody = {
			PayId: payId,
			PoId: poId,
			Seq: itemPayForm.current['PaySeq'].value,
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
				setMsg("Payment added successfully");
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
					calculateDisplayVariables();
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

			if (p.extraInfo.includes("Advance")) { setPayType('A') }
			else if (p.extraInfo.includes("Final")) { setPayType('F') }
			else if (p.extraInfo.includes("number")) { setPayType('P') }
			//setPayType('A');
			setPayPartAmt(p.amt);
			setPayPartFrq();
			setPayPartNote(p.note);
			setPayPartSeq(p.seq)
			openPaymentTab(e, "Advance");
		} else if (p.type === "Item Based") {
			setPayType()
			setPayItemAmt(p.amt);
			setPayItemNote(p.note);
			setPayItemSeq(p.seq)
			openPaymentTab(e, "ItemBased");
		}
		else if (p.type === "Frequency Based")
		{
			
			if (p.extraInfo.includes("Monthly")) { setPayType('M') }
			else if (p.extraInfo.includes("Weekly")) { setPayType('W') }
			else if (p.extraInfo.includes("Quaterly"))
			{ setPayType('Q') }
			openPaymentTab(e, "Frequency");
			setPayPeriodicAmt(p.amt);
			setPayPeriodicNote(p.note);
			setPayPeriodicSeq(p.seq);
		}
	}

	const submitBtnClicked = (e) => {
		console.log("btn is clicked");
	}
	const publishBtnClicked = (e) => {
		e.preventDefault();
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
		if (id === "Payments") {
			setPayItemSeq(payList.length + 1);
			setPayPartSeq(payList.length + 1);
			setPayPeriodicSeq(payList.length + 1);
		} else if (id === "Terms")
		{
			setTermSeq(termList.length + 1);
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
			setPayType('A');
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
		var itemNameList = [];
		var itemCompletionDayList = [];
		var payList = [];
		var payCompletionDayList = [];
		for (var i = 0; i < itemList.length; i++) {
			itemNameList.push(itemList[i].liTitle);
			itemCompletionDayList.push(itemList[i].liItemCompletionInDays);
        }
		setItemDayArray( itemCompletionDayList);
		setItemNameList(itemNameList);
		setPayDayList(payCompletionDayList);
		setPaymentDisplayList(payList);

	}

	return (
        <>
            <div className="row" style={{ paddingTop: "25px" }}>
                <MessageDisplay msg={msg} setMsg={setMsg} />
                <AddItemAndPOAttachments id={attachmentId} setId={setAttachmentId} type={attachmentParentType} />
                <DeleteConfirmation deleteId={deleteId} setDeleteId={setDeleteId} type={deleteType} />
                <div className="col-md-8 scrollable-section">
                    <div className="">

                        <Form ref={poForm} onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-4">
                                    <InputField name="PoRaisedForPhoneNumber" type="tel" label="Raised For Phone Number" value={poRaiseForPhNo} />
                                </div>
                                <div className="col-md-4">
                                    <InputField name="PoTitle" type="tel" label="Title" value={poTitle} />
                                </div>
                                <div className="col-md-4">
                                    <InputField name="PoDescription" type="tel" label="Description" value={poDescription} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <InputField name="PoNotificationPeriod" type="number" label="Notification period (in Days)" value={poNotificationPeriod} />
                                </div>
                                <div className="col-md-4">
                                    <InputField name="PoCompletionDurationInDays" type="number" label="Total completion time (in Days)" value={poCompletionInDays} />
                                </div>
                                <div className="col-md-4">
                                    <InputField name="PoDiscount" type="number" label="Discount" onChange={(e) => onDiscountChange(e)} value={poDiscount} />
                                </div>
                            </div>
                            <div className="row">
                                {autoCalculateOn !== 1 ?
                                    <InputField name="PoAmount" type="number"
                                        label="Amount"
                                        onChange={(e) => { setPoAmount(e.target.value) }}
                                        value={poAmount}
                                    /> : <></>}
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    Total Amount {poAmount}
                                </div>
                                <div className="col-md-4">
                                    <InputField name="autoCalculateAmount" type="checkbox"
                                        label="Uncheck the box if you want to provide the aggreement amount."
                                        onChange={(e) => { setAutoCalculateOn(e.target.checked === true ? 1 : 0) }}
                                        value='true'
                                    />
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <FormSubmitButton name="Create Order" onClick={(e) => submitBtnClicked(e)} />
                                </div>
                                <div className="col-md-4">
                                    {poId && poId > 0 ? <FormButton name="Publish" onClick={(e) => publishBtnClicked(e)} /> : <></>}
                                </div>
                                <div className="col-md-4">
                                    {poId && poId > 0 ? <FormButton name="Add Attachments" onClick={(e) => {
                                        e.preventDefault();
                                        setAttachmentParentType("N");
                                        setAttachmentId(poId);
                                    }} /> : <></>}
                                </div>
                            </div>
                        </Form>
                    </div>
                    {poId > 0 ? <div>
                        <div className="row">
                            <div className="col-md-8 tableHeader">Attachments</div>
                            <div className="col-md-2 tableHeader">Attachment Type</div>
                            <div className="col-md-2 tableHeader">Actions</div>
                        </div>
                        {attachmentList ? attachmentList.map((f, i) => < div className="row">
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
                        <div className="table">
                            <div className="row tableHeader"><div className="col-md-12">Aggreement Remarks</div>
                                <div className="col-md-2 ">Remark By</div>
                                <div className="col-md-6 ">Remark</div>
                                <div className="col-md-2 ">Attachments</div>
                                <div className="col-md-2 ">Remark on</div>
                            </div>
                            {remarkList ? remarkList.map(x => <div className="row p-1">
                                <div className="col-md-2">{x.createdBy} </div>
                                <div className="col-md-6">{x.description} </div>
                                <div className="col-md-2"> {x.attachments && x.attachments.length > 0 ? x.attachments.map(a => <div><a href={a.link} target={"new"}>Attachment{a.id}</a></div>) : <>No Attachments</>}</div>
                                <div className="col-md-2">{x.remarkDate} </div>
                            </div>) : <div className="row"> No remarks in Purchase Aggrement</div>}
                        </div>
                        <div className="tabs">
                            <div className="tab-buttons">
                                <button className="tab-button active" onClick={(e) => { openTab(e, "Items") }}>Items</button>
                                <button className="tab-button" onClick={(e) => { openTab(e, "Taxes") }}>Taxes</button>
                                <button className="tab-button" onClick={(e) => { openTab(e, "Terms") }}>Terms and Conditions</button>
                                <button className="tab-button" onClick={(e) => { openTab(e, "Payments") }}>Payments</button>
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
                                                <InputField name="ItemRate" type="number" label="Rate" onChange={(e) => updateAmount()} value={itemRate} />
                                            </div>
                                            <div className="col-md-2">
                                                <InputField name="ItemQty" type="number" label="Quantity" onChange={(e) => updateAmount()} value={itemQuantity} />
                                            </div>
                                            <div className="col-md-2">
                                                <InputField name="ItemCompDays" type="number" label="Days To Complete" value={itemDaysToComplete} />
                                            </div>
                                            <div className="col-md-1">
                                                Total: {itemTotal}
                                            </div>
                                        </div>
                                        <div className="row" style={{ textAlign: "right" }}>
                                            <div className="col-md-8">
                                                {itemId > 0 ?
                                                    <FormButton name="Add Attachment" onClick={(e) => {
                                                        e.preventDefault();
                                                        setAttachmentParentType("I");
                                                        setAttachmentId(itemId);

                                                    }} /> : <></>}

                                            </div>
                                            <div className="col-md-4">
                                                <FormSubmitButton name="Add Item" />
                                            </div>

                                        </div>
                                    </Form>
                                </div>

                                <div className="table">
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
                                            Quanitity
                                        </div>
                                        <div className="col-md-1 ">
                                            Sub Total
                                        </div>
                                        <div className="col-md-2 ">
                                            Attachments
                                        </div>
                                        <div className="col-md-2 ">
                                            Actions
                                        </div>
                                    </div>
                                    {itemList && itemList.length > 0 ? itemList.map(x => < div className="row" style={{ borderBottom: "1px solid black" }}>
                                        <div className="col-md-2">
                                            {x.liTitle}
                                        </div>
                                        <div className="col-md-3">
                                            {x.liDescription}
                                        </div>
                                        <div className="col-md-1">
                                            {x.liRate}
                                        </div>
                                        <div className="col-md-1">
                                            {x.liQuantity}
                                        </div>
                                        <div className="col-md-1">
                                            {x.liRate * x.liQuantity}
                                        </div>
                                        <div className="col-md-2">
                                            {x.attachments ? x.attachments.map((f, i) => < div className="col-md-12">
                                                <a href={f.link} target={"new"}> Attachment {i + 1}</a>
                                                <br />
                                                <FormButton name="Remove" onClick={(e) => {
                                                    e.preventDefault();
                                                    setDeleteId(f.id);
                                                    setDeleteType("IA");
                                                }} />
                                            </div>) : <>No Attachments</>}
                                        </div>
                                        <div className="col-md-2">
                                            <FormButton name="Edit" onClick={(e) => { editItem(e, x) }} />
                                            <FormButton name="Remove" onClick={(e) => {
                                                e.preventDefault();
                                                setDeleteId(x.id);
                                                setDeleteType("LI");
                                            }} />
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

                                                <InputField name="TaxPercent" type="number" label="Percent" value={taxPercent} />

                                            </div>

                                            <div className="col-md-12" style={{ textAlign: "right" }}>
                                                <FormSubmitButton name="Add Tax" />
                                            </div>
                                        </div>
                                    </Form>
                                </div>
                                <div className="table">
                                    <div className="row tableHeader">
                                        <div className="col-md-5 ">
                                            Title
                                        </div>
                                        <div className="col-md-5 ">
                                            Percent
                                        </div>
                                        <div className="col-md-2 ">
                                            Action
                                        </div>
                                    </div>

                                    {taxList && taxList.length > 0 ? taxList.map(x => <div className="row" style={{ borderBottom: "1px solid black" }}>
                                        <div className="col-md-5">
                                            {x.title}
                                        </div>
                                        <div className="col-md-5">
                                            {x.percent}
                                        </div>
                                        <div className="col-md-2">
                                            <FormButton name="Edit" onClick={(e) => { editTax(e, x) }} />
                                            <FormButton name="Remove" onClick={(e) => {
                                                e.preventDefault();
                                                setDeleteId(x.taxId);
                                                setDeleteType("TAX");
                                            }} />
                                        </div>
                                    </div>) : <div className="row">No Tax Info Is Present.</div>}

                                </div>
                            </div>

                            <div id="Terms" className="tab-content">
                                <div className="table">
                                    <Form ref={termForm} onSubmit={termSubmit}>
                                        <div className="row">
                                            <div className="col-md-2">
                                                <InputField name="TermSeq" type="number" label="Term Sequence" value={termSeq} />
                                            </div>
                                            <div className="col-md-10">
                                                <InputField name="TermText" type="text" label="Term" value={termValue} />
                                            </div>
                                        </div>
                                        <div className="row" style={{ textAlign: "right" }}>
                                            <div className="col-md-8">
                                                <FormButton name="Add Attachment" onClick={(e) => {
                                                    e.preventDefault();
                                                    setAttachmentParentType("T");
                                                    setAttachmentId(poId);
                                                }} />
                                            </div>
                                            <div className="col-md-4">
                                                <FormSubmitButton name="Add Term" />
                                            </div>

                                        </div>
                                    </Form>
                                </div>
                                <div className="table">
                                    <div className="row tableHeader">
                                        <div className="col-md-2 ">
                                            Seq
                                        </div>
                                        <div className="col-md-8 ">
                                            Terms and Conditions
                                        </div>
                                        <div className="col-md-2 ">
                                            Actions
                                        </div>
                                    </div>
                                    {termList && termList.length > 0 ? termList.map(x => <div className="row" style={{ borderBottom: "1px solid black" }}>
                                        <div className="col-md-5">
                                            {x.seq}
                                        </div>
                                        <div className="col-md-5">
                                            {x.val}
                                        </div>
                                        <div className="col-md-2">
                                            <FormSubmitButton name="Edit" onClick={(e) => { editTerm(e, x) }} />
                                            <FormButton name="Remove" onClick={(e) => {
                                                e.preventDefault();
                                                setDeleteId(x.termId);
                                                setDeleteType("TNC");
                                            }} />
                                        </div>
                                    </div>) : <div className="row">No terms and conditions are Present.</div>}

                                </div>
                            </div>

                            <div id="Payments" className="tab-content">

                                <div className="payment-tabs">
                                    <div className="payment-tab-buttons">
                                        <button className="payment-tab-button active" onClick={(e) => { openPaymentTab(e, 'Advance') }}>Basic Payment</button>
                                        <button className="payment-tab-button" onClick={(e) => { openPaymentTab(e, 'Frequency') }}>Frequency Based</button>
                                        <button className="payment-tab-button" onClick={(e) => { openPaymentTab(e, 'ItemBased') }} >Items Based</button>

                                    </div>

                                    <div id="Advance" className="payment-tab-content active">
                                        <h2>Basic Payment</h2>
                                        <div className="table">
                                            <Form ref={payForm} onSubmit={basePaySubmit}>
                                                <div className="row">

                                                    <div className="offset-md-2 col-md-8">
                                                        <div className="form-group" style={{ padding: '5px' }}>
                                                            <label style={{ fontsize: '20px', color: 'black' }} >Select Type</label>
                                                            <select className="form-control" onChange={(e) => { setPayType(e.target.value) }} selected={payType}>
                                                                <option value='A' >Advance Payment</option>
                                                                <option value='P'>Part Payment</option>
                                                                <option value='F'>Final Payment</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <InputField name="PaySeq" type="number" label="Sequence" value={payPartSeq} />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <InputField name="PayNote" type="text" label="Note" value={payPartNote} />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <InputField name="PayAmount" type="number" label="Amount" value={payPartAmt} />
                                                    </div>
                                                    <div className="col-md-3">
                                                        {payType === 'A' || payType === 'F' ? <></> :
                                                            <InputField name="PayFreq" type="number" value={payPartFrq}
                                                                label="Number of days from start date you want to receive this payment" />}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="offset-md-9 col-md-3">
                                                        <FormSubmitButton name="Add Payment" />
                                                    </div>
                                                </div>
                                            </Form>
                                        </div>
                                    </div>

                                    <div id="Frequency" className="payment-tab-content">
                                        <h2>Frequency Based</h2>
                                        <div className="table">
                                            <Form ref={payFrqForm} onSubmit={frequencyPaySubmit}>
                                                <div className="row">

                                                    <div className="offset-md-2 col-md-8">
                                                        <div className="form-group" style={{ padding: '5px' }}>
                                                            <label style={{ fontsize: '20px', color: 'black' }} >Select Type</label>
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
                                                        <InputField name="PaySeq" type="number" label="Sequence" value={payPeriodicSeq} />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <InputField name="PayNote" type="text" label="Note" value={payPeriodicNote} />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <InputField name="PayAmount" type="number" label="Amount" value={payPeriodicAmt} />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <InputField name="PayFreq" type="number" label="Number of times you want to recieve" value={payPeriodicFrq} />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="offset-md-9 col-md-3">
                                                        <FormSubmitButton name="Add Payment" />
                                                    </div>
                                                </div>
                                            </Form>
                                        </div>
                                    </div>

                                    <div id="ItemBased" className="payment-tab-content">
                                        <h2>Item Based Payment</h2>
                                        <div className="table">
                                            <Form ref={itemPayForm} onSubmit={itemPaySubmit}>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <InputField name="PaySeq" type="number" label="Sequence" value={payItemSeq} />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <InputField name="PayNote" type="text" label="Note" value={payItemNote} />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <InputField name="PayAmount" type="number" label="Amount" value={payItemAmt} />
                                                    </div>
                                                </div>
                                                <div className="row">
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
                                                    <div className="offset-md-9 col-md-3">
                                                        <FormSubmitButton name="Add Payment" />
                                                    </div>
                                                </div>
                                            </Form>
                                        </div>
                                    </div>
                                </div>
                                <div className="table">
                                    <div className="row tableHeader">
                                        <div className="col-md-1 ">Seq</div>
                                        <div className="col-md-3 ">Note</div>
                                        <div className="col-md-2 ">Amt</div>
                                        <div className="col-md-1 ">PaymentType</div>
                                        <div className="col-md-3 ">Extra Information</div>
                                        <div className="col-md-2 ">Action</div>
                                    </div>
                                    {payList && payList.length > 0 ? payList.map(x => <div className="row" style={{ borderBottom: "1px solid black" }}>
                                        <div className="col-md-1">{x.seq}</div>
                                        <div className="col-md-3">{x.note}</div>
                                        <div className="col-md-2">{x.amt}</div>
                                        <div className="col-md-1">{x.type}</div>
                                        <div className="col-md-3">{x.extraInfo}</div>
                                        <div className="col-md-2">
                                            <FormSubmitButton name="Edit" onClick={(e) => { editPay(e, x) }} />
                                            <FormButton name="Remove" onClick={(e) => {
                                                e.preventDefault();
                                                setDeleteId(x.payId);
                                                setDeleteType("PAY");
                                            }} />
                                        </div>
                                    </div>) : <div className="row">No payments are Present.</div>}
                                </div>
                            </div>
                        </div>
                    </div> : <></>}

                </div>
                <div className="col-md-4 fixed-section">

                    <DraftFlowPresentation days={poCompletionInDays} itemDaysArray={itemDayArray} itemList={itemNameList} payDaysArray={payDayList} payList={paymentDisplayList} />
                </div>
            </div>
        </>
	);
};
export default NewPO;