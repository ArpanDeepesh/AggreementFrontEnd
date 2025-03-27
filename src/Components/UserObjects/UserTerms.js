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
import OtherData from "../Context/OtherData";
import DeleteItemConfirmation from "../CommonPages/DeleteItemConfirmation";

const UserTerms = () => {
	const termForm = useRef(null);
	const navigate = useNavigate();
	const [msg, setMsg] = useState("");
	const [termList, setTermList] = useState([]);
	const [termId, setTermId] = useState();
	const [termTitle, setTermTitle] = useState();
	const [termLDPercent, setLDPercent] = useState();
	const [termLDDays, settermLDDays] = useState();
	const [termDescription, setTermDescription] = useState();
	const [termType, setTermType] = useState();
	const [termTypeOptions, setTermTypeOptions] = useState([]);

	const [deleteMsg, setDeleteMsg] = useState();
	const [deleteData, setDeleteData] = useState();

	useEffect(() => {
		if (UserProfile.getLoginStatus() === 1) {
			navigate("/Home");
		}
		resetForm();
		getRequestAllowAll("api/General/TermsTypes").then(x => x.json()).then(res => {
			if (res.status === 1) {
				setTermTypeOptions(res.data);
			}
		}).catch(err => console.log(err));
		loadList();
	}, []);
	const resetForm = () => {
		setTermId(0);
		setTermType("-99");
		setTermTitle("");
		setTermDescription("");
		settermLDDays(0);
		setLDPercent(0);
		termForm.current['GroupName'].value = "";
		termForm.current['Description'].value = "";
		termForm.current['TypeName'].value = "-99";
		termForm.current['LDPercentOnlyForBuying'].value=0;
		termForm.current['LDAppliedInDaysOnlyForBuying'].value = 0;
	}
	const validateForm = () => {
		if (termType === "-99") {
			setMsg("Please select a valid type.");
			return false;
		}
		if (termForm.current['GroupName'].value === "") {
			setMsg("Please enter a valid name.");
			return false;
		}
		if (termForm.current['Description'].value === "") {
			setMsg("Please enter a valid description.");
			return false;
		}

		return true;
	}
	const loadList = () => {
		getRequest("api/Auth/GetTermGroupList", UserProfile.getToken()).then(x => x.json()).then(res => {
			console.log(res);
			setTermList(res.data);
		}).catch(err => console.log(err));
	}
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!validateForm())
		{
			return;
		}
		var postBody = {
			GroupId: termId > 0 ? termId:0,
			GroupName: termForm.current['GroupName'].value,
			Description: termForm.current['Description'].value,
			TypeName: termType,
			LDPercentOnlyForBuying: termForm.current['LDPercentOnlyForBuying'].value,
			LDAppliedInDaysOnlyForBuying: termForm.current['LDAppliedInDaysOnlyForBuying'].value
		};
		console.log(UserProfile.getToken());
		var url = "api/Auth/AddUserTermGroup";
		if (termId > 0)
		{
			url = "api/Auth/UpdateUserTermGroup";
		}
		sendPostRequest(url, UserProfile.getToken(), postBody).then(r => r.json()).then(res => {
			console.log(res);
			if (res.status === 1) {
				loadList();
				resetForm();
			} else {
				setMsg("Not able to save data");
			}

		}).catch(err => {
			console.log(err);
		});
	};
	const editTerm = (e, term) => {
		e.preventDefault();
		console.log(term);
		setTermId(term.groupId);
		setTermTitle(term.groupName);
		setTermDescription(term.description);
		setLDPercent(term.ldPercentOnlyForBuying);
		settermLDDays(term.ldAppliedInDaysOnlyForBuying);
		setTermType(term.typeName);

		termForm.current['GroupName'].value = term.groupName;
		termForm.current['Description'].value = term.description;
		termForm.current['LDPercentOnlyForBuying'].value = term.ldPercentOnlyForBuying;
		termForm.current['LDAppliedInDaysOnlyForBuying'].value = term.ldAppliedInDaysOnlyForBuying;
	}
	const deleteAction = (url) => {
		deleteRequest(url, UserProfile.getToken()).then(x => x.json()).then(res => {
			setMsg("Deleted successfully");
			loadList();
		}).catch(err => console.log(err));
	}

	return (<>
		<div className="scrollable-section">
			<MessageDisplay msg={msg} setMsg={setMsg} />
			<DeleteItemConfirmation msg={deleteMsg} setMsg={setDeleteMsg} action={deleteAction} data={deleteData} />
			<div className="table">
				<Form ref={termForm} onSubmit={handleSubmit}>
					<div className="row">
						<div className="col-md-2">
							<InputField name="GroupName" type="text" label="Group Name" value={termTitle} />
						</div>
						<div className="col-md-4">
							<InputField name="Description" type="text" label="Description" value={termDescription} />
						</div>
						<div className="col-md-2">
							<div className="form-group" style={{ textAlign: 'left' }}>
								<label style={{ fontsize: '20px', color: 'black', fontWeight: '700' }} >Term Type</label>
								<select name="TypeName" className="form-control"
									value={termType} onChange={(e) => {
										e.preventDefault();
										setTermType(e.target.value);
									}} selected={termType}>
									<option value="-99">-Select-</option>
									{termTypeOptions && termTypeOptions.length > 0 ?
										termTypeOptions.map(x => <option value={x.typeValue} >{x.typeValue}</option>) :
										<></>}
								</select>
							</div>
						</div>
						<div className="col-md-1">
							<InputNumberField name="LDPercentOnlyForBuying" type="text" label="LD Percent" value={termLDPercent} />
						</div>
						<div className="col-md-1">
							<InputNumberField name="LDAppliedInDaysOnlyForBuying" type="text" label="LD duration" value={termLDDays} />
						</div>
					</div>
					<div className="row">
						<div className="offset-md-8 col-md-4" style={{ textAlign: "right" }}>
							<FormSubmitButton name={termId > 0 ? "Edit Term" : "Save New Term"} />
						</div>
					</div>
				</Form>
			</div>

			<div className="table" style={{ textAlign: "left" }}>
				<div className="d-none d-md-block">
					<div className="row tableHeader">
						<div className="col-md-2 ">
							Type
						</div>
						<div className="col-md-2 ">
							Title
						</div>
						<div className="col-md-3 ">
							Description
						</div>
						<div className="col-md-1 ">
							LD Percent
						</div>

						<div className="col-md-2 ">
							LD Applied in Days
						</div>
						<div className="col-md-2 " style={{ textAlign: "center" }}>
							Actions
						</div>
					</div>
				</div>
				{termList && termList.length > 0 ? termList.map(x => < div className="row tablebox">
					<div className="col-md-2 d-flex align-items-center">
						<span>
							<strong className="d-inline d-md-none">Type: </strong>
							{x.typeName}</span>
					</div>
					<div className="col-md-2 d-flex align-items-center">
						<span>
							<strong className="d-inline d-md-none">Title: </strong>
							{x.groupName}
						</span>
					</div>
					<div className="col-md-3 d-flex align-items-center">
						<span>
							<strong className="d-inline d-md-none">Description: </strong>
							{x.description}</span>
					</div>
					<div className="col-md-1 d-flex align-items-center">
						<span>
							<strong className="d-inline d-md-none">LD Percent: </strong>
							{x.ldAppliedInDaysOnlyForBuying}</span>
					</div>

					<div className="col-md-2 d-flex align-items-center">
						<span>
							<strong className="d-inline d-md-none">LD in days: </strong>
							{x.ldPercentOnlyForBuying}</span>
					</div>
					<div className="col-md-2" style={{ textAlign: "center" }}>
						<span>
							<FormButton name="Edit" onClick={(e) => { editTerm(e, x) }} />
							<FormButton name="Add Terms" onClick={(e) => {
								e.preventDefault();
								OtherData.setData(JSON.stringify(x));
								navigate("/TermConditions");
							}} />
							<span className="removeLink" onClick={(e) => {
								e.preventDefault();
								setDeleteMsg("Are you sure you want to delete this term group?")
								setDeleteData("api/Auth/DeleteUserTermGroup?termId=" + x.groupId);
							}}> Remove </span>
						</span>
					</div>
				</div>) : <>No Item Is Present.</>}

			</div>
		</div>
	</>);
}
export default UserTerms;