import "./MessageDisplay.css";
import { useRef } from "react";
import Form from "react-bootstrap/Form";
import InputField from "../FormParts/InputField";
import FormSubmitButton from "../FormParts/FormSubmitButton";
import { sendPostRequest } from "../Services/POContractBackendAPI";
import UserProfile from "../Context/UserProfile";
import AddAttachment from "../CommonPages/AddAttachment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddRemark = ({ id, setId, type,actionText }) => {

    const remarkForm = useRef(null);
	const [remarkMsg, setRemarkMsg] = useState("");
	const [displayForm, setDisplayForm] = useState(1);
	const [remarkAttachments, setRemarkAttachments] = useState([]);
	const navigate = useNavigate();
    const closeModule = (e) => {
        e.preventDefault();
        setId(0);
		setRemarkMsg("");
		setDisplayForm(1);
		setRemarkAttachments([]);
		if (type === "O") {
			navigate("/Home");
		} else {
			navigate("/Details");
		}
		
		
    }
    const submitRemark = (e, id, type) => {
        e.preventDefault();
        console.log("Remark Submit id:" + id + " type: " + type);
        var formBody = {
            Remark: remarkForm.current["remarkText"].value,
            Parent: type,
            ParentId: id,
			AttachmentLinks: remarkAttachments
		};
		sendPostRequest('api/POManagement/AddRemarks', UserProfile.getToken(), formBody).then(r => r.json()).then(res => {
			console.log(res);
			if (res > 0) {
				if (actionText === "Submit Remark") {
					setRemarkMsg("Remark Added Successfully. Close the remark section.");
					remarkForm.current["remarkText"].value = "";
					setDisplayForm(0);
				} else if (actionText === "Decline Agreement") {
					declineBtnClicked();
				} else if (actionText === "Accept Agreement") {
					acceptBtnClicked();
				} else if (actionText === "Reconsider Agreement") {
					reconsiderBtnClicked();
				} else if (actionText === "Claim Item Delivery") {
					claimItemBtnClicked();
				} else if (actionText === "Unclaim Item Delivery") {
					notCompleteItemBtnClicked();
				} else if (actionText === "Accept Item Delivery") {
					completeItemBtnClicked();
				} else if (actionText === "Ask For Payment") {
					askForPayOrNotDoneBtnClicked();
				} else if (actionText === "Accept Payment Sent") {
					paymentDoneRaiseForReceivalClaimBtnClicked();
				} else if (actionText === "Accept Payment Received") {
					receivePaymentAskBtnClicked();
				} else if (actionText === "Invalid Payment Ask") {
					invalidPaymentAskBtnClicked();
				} else if (actionText === "Payment Not Received") {
					askForPayOrNotDoneBtnClicked();
				}
			}

		}).catch(err => {
			console.log(err);
			setRemarkMsg("Error Occured.Close the section and try after some time.");
		});
		
        
    }

	const declineBtnClicked = () => {

		console.log("btn is clicked");
		var formBody = {}
		sendPostRequest('api/POManagement/DeclinePurchaseOrder?poId=' + id, UserProfile.getToken(), formBody).then(r => r.json()).then(res => {
			console.log(res);
			if (res > 0) {
				setRemarkMsg("Status Changed Successfully. Agreement is declined");
				remarkForm.current["remarkText"].value = "";
				setDisplayForm(0);
				
			}

		}).catch(err => {
			console.log(err);
		});
	}
	const reconsiderBtnClicked = () => {
		console.log("btn is clicked");
		var formBody = {}
		sendPostRequest('api/POManagement/ReconsiderPurchaseOrder?poId=' + id, UserProfile.getToken(), formBody).then(r => r.json()).then(res => {
			console.log(res);
			if (res > 0) {
				setRemarkMsg("Status Changed Successfully. Agreement is sent for reconsideration");
				remarkForm.current["remarkText"].value = "";
				setDisplayForm(0);
			}

		}).catch(err => {
			console.log(err);
		});
	}
	const acceptBtnClicked = () => {
		console.log("btn is clicked");
		var formBody = {}
		sendPostRequest('api/POManagement/AcceptPurchaseOrder?poId=' + id, UserProfile.getToken(), formBody).then(r => r.json()).then(res => {
			console.log(res);
			if (res > 0) {
				setRemarkMsg("Status Changed Successfully. Agreement is Accepted");
				remarkForm.current["remarkText"].value = "";
				setDisplayForm(0);
			}

		}).catch(err => {
			console.log(err);
		});
	}
	const claimItemBtnClicked = () => {
		console.log("btn is clicked");
		var formBody = {}
		sendPostRequest('api/POManagement/ClaimItem?itemId=' + id, UserProfile.getToken(), formBody).then(r => r.json()).then(res => {
			console.log(res);
			if (res > 0) {
				setRemarkMsg("Status Changed Successfully. Item completion claim raised.");
				remarkForm.current["remarkText"].value = "";
				setDisplayForm(0);
			}

		}).catch(err => {
			console.log(err);
		});
	}
	const completeItemBtnClicked = () => {
		console.log("btn is clicked");
		var formBody = {}
		sendPostRequest('api/POManagement/CompleteItemClaim?itemId=' + id, UserProfile.getToken(), formBody).then(r => r.json()).then(res => {
			console.log(res);
			if (res > 0) {
				setRemarkMsg("Status Changed Successfully. Item receival is accepted");
				remarkForm.current["remarkText"].value = "";
				setDisplayForm(0);
			}

		}).catch(err => {
			console.log(err);
		});
	}
	const notCompleteItemBtnClicked = () => {
		console.log("btn is clicked");
		var formBody = {}
		sendPostRequest('api/POManagement/UnclaimItem?itemId=' + id, UserProfile.getToken(), formBody).then(r => r.json()).then(res => {
			console.log(res);
			if (res > 0) {
				setRemarkMsg("Status Changed Successfully. Item receival is declined");
				remarkForm.current["remarkText"].value = "";
				setDisplayForm(0);
			}

		}).catch(err => {
			console.log(err);
		});
	}
	const askForPayOrNotDoneBtnClicked = () => {
		console.log("btn is clicked");
		var formBody = {}
		sendPostRequest('api/POManagement/AskForOrPayNotDone?payId=' + id, UserProfile.getToken(), formBody).then(r => r.json()).then(res => {
			console.log(res);
			if (res > 0) {
				setRemarkMsg("Status Changed Successfully. Payment status is cahanges");
				remarkForm.current["remarkText"].value = "";
				setDisplayForm(0);
			}

		}).catch(err => {
			console.log(err);
		});
	}
	const paymentDoneRaiseForReceivalClaimBtnClicked = () => {
		console.log("btn is clicked");
		var formBody = {}
		sendPostRequest('api/POManagement/PaymentDoneAskForAcceptance?payId=' + id, UserProfile.getToken(), formBody).then(r => r.json()).then(res => {
			console.log(res);
			if (res > 0) {
				setRemarkMsg("Status Changed Successfully. Waiting for receival acceptance.");
				remarkForm.current["remarkText"].value = "";
				setDisplayForm(0);
			}

		}).catch(err => {
			console.log(err);
		});
	}
	const invalidPaymentAskBtnClicked = () => {
		console.log("btn is clicked");
		var formBody = {}
		sendPostRequest('api/POManagement/InvalidPaymentAsk?payId=' + id, UserProfile.getToken(), formBody).then(r => r.json()).then(res => {
			console.log(res);
			if (res > 0) {
				setRemarkMsg("Status Changed Successfully. Payment ask is invalid.");
				remarkForm.current["remarkText"].value = "";
				setDisplayForm(0);
			}

		}).catch(err => {
			console.log(err);
		});
	}
	const receivePaymentAskBtnClicked = () => {
		console.log("btn is clicked");
		var formBody = {}
		sendPostRequest('api/POManagement/PaymentReceived?payId=' + id, UserProfile.getToken(), formBody).then(r => r.json()).then(res => {
			console.log(res);
			if (res > 0) {
				setRemarkMsg("Status Changed Successfully. Payment is received");
				remarkForm.current["remarkText"].value = "";
				setDisplayForm(0);
			}

		}).catch(err => {
			console.log(err);
		});
	}


    return (
		<div className={id === 0 ? "modalOverlay hidden" : "modalOverlay"}>
			
			<div className="modalContent" >
				<button className="closeButton" onClick={(e) => { closeModule(e) }}>X</button>
				<div className="row">
					<div className="col-md-12">
						{remarkMsg && remarkMsg.includes("Successfully") ?
							<span style={{ color: "green" }}>{remarkMsg}</span> : <span style={{ color: "red" }}>{remarkMsg}</span>}
					</div>
				</div>
				{displayForm ===1?<div>
					<Form ref={remarkForm} onSubmit={(e) => { e.preventDefault() }}>
						<div className="row">

                        
							<div className="col-md-12">
								{type === "I" ? <span>Adding Item Remark</span> : type === "P" ? <span>Adding Payment Remark</span> :
									< span > Adding Purchase Agreement Remark</span>}
							</div>
                    
							<div className="col-md-12">
								<InputField name="remarkText" label="Provide Remark"  /> 
							</div>
							<div className="col-md-12">
								<FormSubmitButton name={actionText} onClick={(e) => { submitRemark(e,id,type)  }} />
							</div>
						</div>
					</Form>
					<div className="row">
						<AddAttachment fileLinkList={remarkAttachments} setFileLinkList={setRemarkAttachments }  />
					</div>
				</div>:<></>}
            </div>
        </div>);
};

export default AddRemark;