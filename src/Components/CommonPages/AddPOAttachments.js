import "./MessageDisplay.css";
import { sendPostRequest } from "../Services/POContractBackendAPI";
import UserProfile from "../Context/UserProfile";
import AddAttachment from "../CommonPages/AddAttachment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormButton from "../FormParts/FormButton";

const AddPOAttachments = ({ id, setId, type }) => {

    const [remarkMsg, setRemarkMsg] = useState("");
	const [attachments, setAttachments] = useState([]);
	const navigate = useNavigate();
    const closeModule = (e) => {
        e.preventDefault();
        setId(0);
        setRemarkMsg("");
        setAttachments([]);
        navigate("/New");
		
		
    }
    const submitAttachments = (e, id, type) => {
        e.preventDefault();
        console.log("Remark Submit id:" + id + " type: " + type);
        var formBody = {
            OrderId: id,
            AttachmentType: type,
            AttachmentLinks: attachments
        };
        var address = 'api/POManagement/AddPurchaseOrderAttachment';
        sendPostRequest(address, UserProfile.getToken(), formBody).then(r => r.json()).then(res => {
            console.log(res);
            if (res.length > 0) {
                setRemarkMsg("Attachments added successfully. Close this section if you dont want to add new files.");
                
            }

        }).catch(err => {
            console.log(err);
            setRemarkMsg("Error Occured.Close the section and try after some time.");
        });
		
        
    }

    return (
        <div className={id === 0 ? "modalOverlay hidden" : "modalOverlay"}>
            <div className="modalContent">
                <button className="closeButton" onClick={(e) => { closeModule(e) }}>X</button>
                    <div className="row">
                        <div className="col-md-12">
                            {remarkMsg !== "" ? <>{remarkMsg}</> : <></>}
                        </div>
                        <div className="col-md-8">
                            {type === "N" ? <>Adding Purchase Order Attachments</> : <></>}
                            {type === "T" ? <>Adding Purchase Order Terms and conditions Attachments</> : <></>}
                            {type === "I" ? <>Adding Line Item Attachments</> : <></>}
                        </div>
                    <div className="col-md-4">
                        <FormButton name="Save Attachment" onClick={(e) => { submitAttachments(e, id, type); } } />
                        </div>
                    </div>

                <div className="row">
                    <AddAttachment fileLinkList={attachments} setFileLinkList={setAttachments }  />
                </div>
            </div>
        </div>);
};

export default AddPOAttachments;