import "./Payment.css";
import { useRef } from "react";
import Form from "react-bootstrap/Form";
import InputField from "../FormParts/InputField";
import FormSubmitButton from "../FormParts/FormSubmitButton";
import { sendPostRequest, getRequest } from "../Services/ContrectBackendAPI";
import UserProfile from "../Context/UserProfile";
import AddAttachment from "../CommonPages/AddAttachment";
import { useState } from "react";

const PaymentNegotiation = ({ reloadAction, type, payId, setPayId }) => {

    const remarkForm = useRef(null);
	const [remarkMsg, setRemarkMsg] = useState("");
	const [displayForm, setDisplayForm] = useState(1);
	const [remarkAttachments, setRemarkAttachments] = useState([]);
    const closeModule = (e) => {
		e.preventDefault();
		reloadAction();
		setPayId(0);
		setRemarkMsg("");
		setDisplayForm(1);
		setRemarkAttachments([]);
		
	}
	const resetForm = () => {
		remarkForm.current["remarkText"].value = "";
		setRemarkAttachments([]);
	}
    const submitRemark = (e, id, type) => {
		e.preventDefault();
		var formBody = {
			Id: 0,
			RemarkText: remarkForm.current["remarkText"].value,
			OwnerId: Number(UserProfile.getUserId()),
			ParentId: id,
			Attachments: remarkAttachments
		};
		var url = "api/Business/PaymentReceived";
		if (type === "PNR") {
			url = "api/Business/PaymentNotReceived";
		} else if (type === "PD")
		{
			url = "api/Business/PaymentRespond";
		}
		sendPostRequest(url, UserProfile.getToken(), formBody).then(r => r.json()).then(res => {
			if (res.status === 1) {
				setRemarkMsg(res.message);
				resetForm();
				setDisplayForm(0);
			} else {
				console.log("Not able to save agreement launching remark");
			}
		}).catch(err => console.log(err));
		
    }

	return (
		<>
		{
				payId > 0 ? <div className={payId === 0 ? "modalOverlay hidden" : "modalOverlay"}>

			<div className="modalContent" >
				<button className="closeButton" onClick={(e) => { closeModule(e) }}>X</button>
				<div className="row">
					<div className="col-md-12">
						{remarkMsg && remarkMsg.includes("Successfully") ?
							<span style={{ color: "green" }}>{remarkMsg}</span> : <span style={{ color: "red" }}>{remarkMsg}</span>}
					</div>
				</div>
						{displayForm === 1 ? <div>
							<Form ref={remarkForm} onSubmit={(e) => { e.preventDefault() }}>

								<div className="row">

									<div className="col-md-12">
										<InputField name="remarkText" label="Provide Remark" />
									</div>
									<div className="col-md-12">
										<FormSubmitButton name="Submit" onClick={(e) => { submitRemark(e, payId, type) }} />
									</div>
								</div>

							</Form>
							<div className="row">
								<AddAttachment fileLinkList={remarkAttachments} setFileLinkList={setRemarkAttachments} />
							</div>
				</div> : <></>}
			</div>
				</div> : <></>}
		</>
		
		);
};

export default PaymentNegotiation;