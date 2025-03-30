import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputField from "../FormParts/InputField";
import FormSubmitButton from "../FormParts/FormSubmitButton";
import FormButton from "../FormParts/FormButton";
import { getRequest, deleteRequest, sendPostRequest } from "../Services/ContrectBackendAPI";
import UserProfile from "../Context/UserProfile";
import MessageDisplay from "../CommonPages/MessageDisplay";
import AddAttachment from "../CommonPages/AddAttachment";
import OtherData from "../Context/OtherData";
import DeleteItemConfirmation from "../CommonPages/DeleteItemConfirmation";

const UserTermConditions = () => {
	const termForm = useRef(null);
	const navigate = useNavigate();
	const [msg, setMsg] = useState("");
	const [termList, setTermList] = useState([]);
	const [termId, setTermId] = useState();
	const [termGroup, setTermGroup] = useState();
	const [termTitle, setTermTitle] = useState();
	const [termDescription, setTermDescription] = useState();
	const [termAttachments, setTermAttachments] = useState([]);

	const [deleteMsg, setDeleteMsg] = useState();
	const [deleteData, setDeleteData] = useState();

	useEffect(() => {
		if (UserProfile.getLoginStatus() === 1) {
			navigate("/Home");
		}
		resetForm();
		console.log(JSON.parse(OtherData.getData()));
		setTermGroup(JSON.parse(OtherData.getData()));
		getRequest("api/Auth/GetTermList?groupId=" + JSON.parse(OtherData.getData()).groupId, UserProfile.getToken()).then(x => x.json()).then(res => {
			console.log(res);
			setTermList(res.data);
			OtherData.resetData();
		}).catch(err => console.log(err));
	}, []);
	const loadGroupElements = () => {
		getRequest("api/Auth/GetTermList?groupId=" + termGroup.groupId, UserProfile.getToken()).then(x => x.json()).then(res => {
			console.log(res);
			setTermList(res.data);
			OtherData.resetData();
		}).catch(err => console.log(err));
	}
	const resetForm = () => {
		setTermId(0);
		setTermTitle("");
		setTermDescription("");
		setTermAttachments([]);
		termForm.current['TermTitle'].value = "";
		termForm.current['TermDescription'].value = "";
	}
	const validateForm = () => {
		if (termForm.current['TermTitle'].value === "")
		{
			setMsg("Please enter valid title");
			return false;
		}
		if (termForm.current['TermDescription'].value === "") {
			setMsg("Please enter valid title");
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
			Id: termId > 0 ? termId : 0,
			GroupId: termGroup.groupId,
			TermTitle: termForm.current['TermTitle'].value,
			TermTxt: termForm.current['TermDescription'].value,
			AttachmentList: termAttachments
		};
		console.log(UserProfile.getToken());
		var url = "api/Auth/AddTermInTermGroup";
		if (termId > 0) {
			url = "api/Auth/UpdateTermInTermGroup";
		}
		sendPostRequest(url, UserProfile.getToken(), postBody).then(r => r.json()).then(res => {
			console.log(res);
			if (res.status === 1) {
				loadGroupElements();
				resetForm();
			} else {
				setMsg("Not able to save data");
			}

		}).catch(err => {
			console.log(err);
		});
	};
	const editTerm = (e, term) => {
		setTermId(term.id);
		setTermTitle(term.termTitle);
		setTermDescription(term.termTxt);
		termForm.current['TermTitle'].value = term.termTitle;
		termForm.current['TermDescription'].value = term.termTxt;
	}
	const deleteAction = (url) => {
		deleteRequest(url, UserProfile.getToken()).then(x => x.json()).then(res => {
			setMsg("Deleted successfully");
			loadGroupElements();
		}).catch(err => console.log(err));
	}
	return (<>
		<div className="scrollable-section">
			<MessageDisplay msg={msg} setMsg={setMsg} />
			<DeleteItemConfirmation msg={deleteMsg} setMsg={setDeleteMsg} action={deleteAction} data={deleteData} />
			<div className="table">
				{termGroup ? <>
					<div className="row">
						<div className="col-md-1">
							<FormButton name="Back" onClick={(e) => { navigate("/userTerms") }} />
						</div>
						<div className="col-md-11"><h4 style={{ color:"#007bff" }}>Group Name: {termGroup.groupName}</h4></div>
					</div>
					<div className="row" style={{ border: "solid 1px #007bff" }}></div>
					<div className="row" style={{ paddingTop: "5px", paddingBottom: "5px", textAlign:"left" }}>
						<div className="col-md-6"><strong>Description:</strong> {termGroup.description}</div>
						<div className="col-md-2"><strong>Group type:</strong> {termGroup.typeName}</div>
						<div className="col-md-2"><strong>LD percent:</strong> {termGroup.ldPercentOnlyForBuying}</div>
						<div className="col-md-2"><strong>LD days:</strong> {termGroup.ldAppliedInDaysOnlyForBuying}</div>
						</div>
					</> : <>"loading Data"</>}
				<div className="row" style={{ border:"solid 1px #007bff" }}>
				</div>
				<Form ref={termForm} onSubmit={handleSubmit}>
					<div className="row">
						<h4 style={{ color: "#007bff" }}>
						Add terms in group
						</h4>
					</div>
					<div className="row">
						<div className="col-md-4">
							<InputField name="TermTitle" type="text" label="Title" value={termTitle} />
						</div>
						<div className="col-md-8">
							<InputField name="TermDescription" type="text" label="Description" value={termDescription} />
						</div>
						
					</div>
					<div className="row" style={{ textAlign: "left", paddingTop: '20px' }}>
						<div className="col-md-12">
							<label style={{ fontsize: '20px', color: 'black', fontWeight: '700', paddingLeft: '18px' }} >Attachments</label>
							<AddAttachment fileLinkList={termAttachments} setFileLinkList={setTermAttachments} />
						</div>
					</div>
					<div className="row">
						<div className="offset-md-8 col-md-4" style={{ textAlign: "right" }}>
							<FormSubmitButton name={termId > 0 ? "Save Edit" : "Save New Item"} />
						</div>
					</div>
				</Form>
			</div>

			<div className="table" style={{ textAlign: "left" }}>
				<div className="d-none d-md-block">
					<div className="row tableHeader">
						<div className="col-md-3 ">
							Title
						</div>
						<div className="col-md-5 ">
							Description
						</div>
						<div className="col-md-2 ">
							Attachments
						</div>
						<div className="col-md-2 " style={{ textAlign: "center" }}>
							Actions
						</div>
					</div>
				</div>
				{termList && termList.length > 0 ? termList.map(x => < div className="row tablebox">
					<div className="col-md-3 d-flex align-items-center">
						<span>
							<strong className="d-inline d-md-none">Title: </strong>
							{x.termTitle}</span>
					</div>
					<div className="col-md-5 d-flex align-items-center">
						<span>
							<strong className="d-inline d-md-none">Description: </strong>
							{x.termTxt}</span>
					</div>
					<div className="col-md-2 d-flex align-items-center">
						<span>
							<strong className="d-inline d-md-none">Attachments: </strong>
							{x.attachmentList ? x.attachmentList.map((i) => < div className="col-md-12" style={{
								marginBottom:"2px"
							}}>
								<a href={i.link} target={"new"}>
									<img src={i.link} width={50} height={50} />
								</a> <span className="removeLink" onClick={(e) => {
									e.preventDefault();
									setDeleteData("api/Auth/RemoveUserTermAttachment?termAttachmentId=" + i.id);
									setDeleteMsg("Are you sure you want to delete the attachment?");
								}}> Remove </span>
							</div>) : <span style={{ fontsize: "70%" }}>No Attachments</span>}
						</span>

					</div>
					<div className="col-md-2" style={{ textAlign: "center" }}>
						<span>
							<FormButton name="Edit" onClick={(e) => { editTerm(e, x); }} />
							<span className="removeLink" onClick={(e) => {
								e.preventDefault();
								setDeleteData("api/Auth/RemoveUserTermFromGroup?userTermId=" + x.id);
								setDeleteMsg("Are you sure you want to delete the attachment?");
							}}> Remove </span>
						</span>
					</div>
				</div>) : <>No Item Is Present.</>}

			</div>
		</div>
	</>);
}
export default UserTermConditions;