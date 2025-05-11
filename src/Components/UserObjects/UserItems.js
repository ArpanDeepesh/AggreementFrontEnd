import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputField from "../FormParts/InputField";
import FormSubmitButton from "../FormParts/FormSubmitButton";
import FormButton from "../FormParts/FormButton";
import { getRequest, getRequestAllowAll, sendPostRequest, deleteRequest } from "../Services/ContrectBackendAPI";
import UserProfile from "../Context/UserProfile";
import MessageDisplay from "../CommonPages/MessageDisplay";
import InputNumberField from "../FormParts/InputNumberField";
import AddAttachment from "../CommonPages/AddAttachment";
import DeleteItemConfirmation from "../CommonPages/DeleteItemConfirmation";

const UserItems = ({ displayLogin, setDisplayLogin }) => {
	const itemForm = useRef(null);
	const navigate = useNavigate();
	const [msg, setMsg] = useState("");
	const [sellerItemList, setSellerItemList] = useState([]);
	const [buyerItemList, setBuyerItemList] = useState([]);
	const [itemId, setItemId] = useState();
	const [itemTitle, setItemTitle] = useState();
	const [itemHsnCsnUin, setItemHsnCsnUin] = useState();
	const [itemDescription, setItemDescription] = useState();
	const [itemCurrencyOption, setItemCurrencyOptions] = useState([]);
	const [itemTypeOption, setItemTypeOptions] = useState([]);
	const [itemType, setItemType] = useState([]);
	const [itemRate, setItemRate] = useState();
	const [itemTax, setItemTax] = useState();
	const [itemRateCurrency, setItemRateCurrency] = useState();
	const [itemRateUnit, setItemRateUnit] = useState();
	const [itemUnitOption, setItemUnitOptions] = useState([]);
	const [itemAttachments, setItemAttachments] = useState([]);

	const [deleteMsg, setDeleteMsg] = useState();
	const [deleteData, setDeleteData] = useState();
	useEffect(() => {
		if (UserProfile.getLoginStatus() === 1) {
			navigate("/Home");
		}
		resetItemForm();

		getRequestAllowAll("api/General/TermsTypes").then(x => x.json()).then(res => {
			if (res.status === 1)
			{
				setItemTypeOptions(res.data);
			}
		}).catch(err => console.log(err));
		getRequestAllowAll("api/General/UnitList").then(x => x.json()).then(res => {
			if (res.status === 1) {
				setItemUnitOptions(res.data);
			}
		}).catch(err => console.log(err));
		getRequestAllowAll("api/General/CurrencyList").then(x => x.json()).then(res => {
			if (res.status === 1) {
				setItemCurrencyOptions(res.data);
			}
		}).catch(err => console.log(err));
		loadItemList();
	}, []);
	const loadItemList = () => {
		getRequest("api/Auth/GetCatalogItem", UserProfile.getToken()).then(x => x.json()).then(res => {
			console.log(res);
			var buyList = [];
			var sellList = [];
			for (var i = 0; i < res.data.length; i++) {
				if (res.data[i].itemType === "Seller") {
					sellList.push(res.data[i]);
				} else
				{
					buyList.push(res.data[i]);
				}
			}
			setBuyerItemList(buyList);
			setSellerItemList(sellList);
		}).catch(err => console.log(err));
	}
	const resetItemForm = () => {
		setItemId(0);
		setItemType("-99");
		setItemRateCurrency("-99");
		setItemRateUnit("-99");
		setItemTitle("");
		setItemDescription("");
		setItemAttachments([]);
		setItemRate(0);
		setItemTax(0);
		setItemHsnCsnUin("");
		itemForm.current['ItemHsnCsnUin'].value = "";
		itemForm.current['ItemTitle'].value = "";
		itemForm.current['ItemDescription'].value = "";
		itemForm.current['ItemRate'].value = "";
		itemForm.current['ItemTax'].value = "";

	}
	const validateForm = () => {
		if (itemType === "-99") {
			setMsg("Item type has to be valid");
			return false;
		}
		if (itemRateCurrency === "-99") {
			setMsg("Currency has to be selected");
			return false;
		}
		if (itemRateUnit === "-99") {
			setMsg("Unit has to be selected");
			return false;
		}
		return true;
	}
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!validateForm())
		{
			return;
		}
		var postBody = {
			AddRequest: {
				Id: itemId > 0?itemId:0,
				ItemHsnCsnUin: itemForm.current['ItemHsnCsnUin'].value,
				ItemRateUnitId: itemRateCurrency,
				ItemSellingUnitId: itemRateUnit,
				ItemTypeId: itemType,
				ItemTitle: itemForm.current['ItemTitle'].value,
				ItemDescription: itemForm.current['ItemDescription'].value,
				ItemRate: itemForm.current['ItemRate'].value,
				ItemTax: itemForm.current['ItemTax'].value
			}, 
			AddAttachmentRequest: itemAttachments,
			OwnerId: UserProfile.getUserId()

		};
		console.log(UserProfile.getToken());
		var url = "api/Auth/AddCatalogItem";
		if (itemId > 0) {
			url = "api/Auth/UpdateCatalogItem";
		} 
		sendPostRequest(url, UserProfile.getToken(), postBody).then(r => r.json()).then(res => {
			console.log(res);
			if (res.status === 1) {
				resetItemForm();
				loadItemList();
			} else {
				setMsg("Not able to save data");
			}

		}).catch(err => {
			console.log(err);
		});
		
	};
	const editItem = (e, item) => {
		e.preventDefault();
		console.log(item);
		for (var i = 0; i < itemTypeOption.length; i++) {
			if (itemTypeOption[i].typeValue === item.itemType)
			{
				setItemType(itemTypeOption[i].id);
				break;
			}
		}
		for (var i = 0; i < itemCurrencyOption.length; i++) {
			if (itemCurrencyOption[i].typeValue === item.currency) {
				setItemRateCurrency(itemCurrencyOption[i].id);
				break;
			}
		}
		for (var i = 0; i < itemUnitOption.length; i++) {
			if (itemUnitOption[i].typeValue === item.sellingUnit) {
				setItemRateUnit(itemUnitOption[i].id);
				break;
			}
		}
		setItemTitle(item.itemTitle);
		setItemDescription(item.itemDescription);
		setItemAttachments([]);
		setItemRate(item.itemRate);
		setItemTax(item.itemTax);
		setItemHsnCsnUin(item.itemHsnCsnUin);


		itemForm.current['ItemHsnCsnUin'].value = item.itemHsnCsnUin;
		itemForm.current['ItemTitle'].value = item.itemTitle;
		itemForm.current['ItemDescription'].value = item.itemDescription;
		itemForm.current['ItemRate'].value = item.itemRate;
		itemForm.current['ItemTax'].value = item.itemTax;
		setItemId(item.id);
	}
	const deleteAction = (url) => {
		deleteRequest(url, UserProfile.getToken()).then(x => x.json()).then(res => {
			setMsg("Deleted successfully");
			loadItemList();
		}).catch(err => console.log(err));
	}

	return (<>
		<div className="main-content">
			<MessageDisplay msg={msg} setMsg={setMsg} />
			<DeleteItemConfirmation msg={deleteMsg} setMsg={setDeleteMsg} action={deleteAction} data={deleteData} />
			<div className="table">
				<div className="row">
					<div className="col-md-1" style={{ textAlign:"left" }}><FormButton name="Back" onClick={(e) => { navigate("/home") }} /></div>
					<div className="col-md-11"><h4 style={{ color: "#007bff" }}> Create catalog</h4></div>
				</div>
				<Form ref={itemForm} onSubmit={handleSubmit}>
					<div className="row">
						<div className="col-md-2">
							<div className="form-group" style={{ textAlign: 'left' }}>
								<label style={{ fontsize: '20px', color: 'black', fontWeight: '700' }} >Item Type</label>
								<select name="ItemType" className="form-control"
									value={itemType} onChange={(e) => {
										e.preventDefault();
										setItemType(e.target.value);
									}} selected={itemType}>
									<option value="-99" selected >-Select-</option>
									{/*{itemTypeOption && itemTypeOption.length > 0 ?*/}
									{/*	itemTypeOption.map(x => <option value={x.id} >{x.typeValue}</option>) :*/}
									{/*	<></>}*/}
									<option value={1} >To Sell</option>
									<option value={2} >To Buy</option>
								</select>
							</div>
						</div>
						<div className="col-md-2">
							<InputField name="ItemTitle" type="text" label="Title" value={itemTitle} />
						</div>
						<div className="col-md-2">
							<InputField name="ItemDescription" type="text" label="Description" value={itemDescription} />
						</div>
						<div className="col-md-2">
							<InputField name="ItemHsnCsnUin" type="text" label="HSN/CSN/UIN" value={itemHsnCsnUin} />
						</div>
						<div className="col-md-2">
							<div className="form-group" style={{ textAlign: 'left' }}>
								<label style={{ fontsize: '20px', color: 'black', fontWeight: '700' }} >Currency</label>
								<select name="ItemCurrency" className="form-control"
									value={itemRateCurrency} onChange={(e) => {
										e.preventDefault();
										setItemRateCurrency(e.target.value);
									}} selected={itemRateCurrency }>
									<option value="-99" selected >-Select-</option>
									{itemCurrencyOption && itemCurrencyOption.length > 0 ?
										itemCurrencyOption.map(x => <option value={x.id} >{x.typeValue}</option>) :
										<></>}
								</select>
							</div>
						</div>
						<div className="col-md-2">
							<InputNumberField name="ItemRate" type="decimal" label="Rate" onChange={(e) => console.log("Rate Changed")} value={itemRate} />
						</div>
						<div className="col-md-2">
							<div className="form-group" style={{ textAlign: 'left' }}>
								<label style={{ fontsize: '20px', color: 'black', fontWeight: '700' }} >Unit</label>
								<select name="ItemUnit" className="form-control"
									value={itemRateUnit} onChange={(e) => {
										e.preventDefault();
										setItemRateUnit(e.target.value);
									}} selected={itemRateUnit }>
									<option value="-99" selected >-Select-</option>
									{itemUnitOption && itemUnitOption.length > 0 ?
										itemUnitOption.map(x => <option value={x.id} >{x.typeValue}</option>) :
										<></>}
								</select>
							</div>
						</div>
						<div className="col-md-2">
							<InputNumberField name="ItemTax" type="decimal" label="Tax (%)" onChange={(e) => console.log("Rate Changed")} value={itemTax} />
						</div>

					</div>
					<div className="row" style={{ textAlign: "left", paddingTop: '20px' }}>
						<div className="col-md-12">
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
				<div className="d-none d-md-block">
					<div className="row tableHeader">
						<div className="col-md-1 ">
							Code
							Type
						</div>
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
							Tax
						</div>
						<div className="col-md-2 ">
							Attachments
						</div>
						<div className="col-md-2 " style={{ textAlign: "center" }}>
							Actions
						</div>
					</div>
				</div>
				<h5 style={{ color: "#007bff" }}>Buy List</h5>
				{buyerItemList && buyerItemList.length > 0 ? buyerItemList.map(x => < div className="row tablebox">
					<div className="col-md-1 d-flex align-items-center">
						<span>
							<strong className="d-inline d-md-none">Code: </strong>
							{x.itemHsnCsnUin}</span>
					</div>
					<div className="col-md-2 d-flex align-items-center">
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
							<strong className="d-inline d-md-none">Rate: </strong>
							{x.itemRate}<br /><span style={{ fontSize:'10px' }}>{x.currency}/{x.sellingUnit}</span></span>
					</div>
					
					<div className="col-md-1 d-flex align-items-center">
						<span>
							<strong className="d-inline d-md-none">Tax: </strong>
							{x.itemTax}</span>
					</div>
					<div className="col-md-2 d-flex align-items-center">
						<span>
							<strong className="d-inline d-md-none">Attachments: </strong>
							{x.catalogAttachments ? x.catalogAttachments.map((i) => < div className="col-md-12" style={{ marginBottom:"2px" }}>
								<a href={i.link} target={"new"}><img src={i.link} width={50} height={50} /></a> <span className="removeLink" onClick={(e) => {
									e.preventDefault();
									setDeleteMsg("Are you sure you want to delete the attachment ?");
									setDeleteData("api/Auth/DeleteItemAttachment?attachId=" + i.id + "&itemId=" + x.id);
								}}> Remove </span>
							</div>) : <span style={{ fontsize: "70%" }}>No Attachments</span>}
						</span>

					</div>
					<div className="col-md-2" style={{ textAlign: "center" }}>
						<span>
							<FormButton name="Edit" onClick={(e) => { editItem(e, x) }} />
							<span className="removeLink" onClick={(e) => {
								e.preventDefault();
								setDeleteMsg("Are you sure you want to delete the attachment ?");
								setDeleteData("api/Auth/DeleteCatalogItem?itemId=" + x.id);
							}}> Remove </span>
						</span>

						{/*<FormButton name="Remove"  />*/}
					</div>
				</div>) : <>No Item Is Present.</>}
				<h5 style={{ color: "#007bff" }}>Sell List</h5>
				{sellerItemList && sellerItemList.length > 0 ? sellerItemList.map(x => < div className="row tablebox">
					<div className="col-md-1 d-flex align-items-center">
						<span>
							<strong className="d-inline d-md-none">Code: </strong>
							{x.itemHsnCsnUin}</span>
					</div>
					<div className="col-md-2 d-flex align-items-center">
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
							<strong className="d-inline d-md-none">Rate: </strong>
							{x.itemRate}<br /><span style={{ fontSize: '10px' }}>{x.currency}/{x.sellingUnit}</span></span>
					</div>

					<div className="col-md-1 d-flex align-items-center">
						<span>
							<strong className="d-inline d-md-none">Tax: </strong>
							{x.itemTax}</span>
					</div>
					<div className="col-md-2 d-flex align-items-center">
						<span>
							<strong className="d-inline d-md-none">Attachments: </strong>
							{x.catalogAttachments ? x.catalogAttachments.map((i) => < div className="col-md-12" style={{ marginBottom: "2px" }}>
								<a href={i.link} target={"new"}><img src={i.link} width={50} height={50} /></a> <span className="removeLink" onClick={(e) => {
									e.preventDefault();
									setDeleteMsg("Are you sure you want to delete the attachment ?");
									setDeleteData("api/Auth/DeleteItemAttachment?attachId=" + i.id + "&itemId=" + x.id);
								}}> Remove </span>
							</div>) : <span style={{ fontsize: "70%" }}>No Attachments</span>}
						</span>

					</div>
					<div className="col-md-2" style={{ textAlign: "center" }}>
						<span>
							<FormButton name="Edit" onClick={(e) => { editItem(e, x) }} />
							<span className="removeLink" onClick={(e) => {
								e.preventDefault();
								setDeleteMsg("Are you sure you want to delete the attachment ?");
								setDeleteData("api/Auth/DeleteCatalogItem?itemId=" + x.id);
							}}> Remove </span>
						</span>

						{/*<FormButton name="Remove"  />*/}
					</div>
				</div>) : <>No Item Is Present.</>}
			</div>
		</div>
	</>);
}
export default UserItems;