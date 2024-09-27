import "./MessageDisplay.css";
import FormButton from "../FormParts/FormButton";
import { getRequest } from "../Services/POContractBackendAPI";
import UserProfile from "../Context/UserProfile";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DeleteConfirmation = ({ deleteId, setDeleteId,type}) => {

    const [remarkMsg, setRemarkMsg] = useState("");
	const navigate = useNavigate();
    const closeModule = (e) => {
        e.preventDefault();
        setDeleteId(0);
        setRemarkMsg("");
        navigate("/New");
    }
    const submitAttachments = (e, id) => {
        e.preventDefault();
        console.log("Remark Submit id:" + id);
        var address = "api/POManagement/";
        if (type === "OA") {
            address += "DeletePurchaseOrderAttachment?attachId="+id;
        } else if (type === "IA") {
            address += "DeleteLineItemAttachment?attachId="+id;
        } else if (type === "LI")
        {
            address += "DeleteItem?itemId="+id;
        }
        else if (type === "TAX") {
            address += "DeleteTax?taxId=" + id;
        } else if (type === "TNC") {
            address += "DeleteTerm?termId=" + id;
        } else if (type === "PAY") {
            address += "DeletePay?payId=" + id;
        }
        getRequest(address, UserProfile.getToken()).then(r => r.json()).then(res => {
            console.log(res);
            if (res) {
                if (type === "LI") {
                    setRemarkMsg("Line item deleted successfully. Close this section.");
                } else
                {
                    setRemarkMsg("Attachments deleted successfully. Close this section.");
                }
                
                
            }

        }).catch(err => {
            console.log(err);
            setRemarkMsg("Error Occured.Close the section and try after some time.");
        });
		
        
    }

    return (
        <div className={deleteId === 0 ? "modalOverlay hidden" : "modalOverlay"}>
            <div className="modalContent">
                <button className="closeButton" onClick={(e) => { closeModule(e) }}>X</button>
                    <div className="row">
                        <div className="col-md-12">
                            {remarkMsg !== "" ? <>{remarkMsg}</> : <></>}
                        </div>
                        <div className="col-md-8">
                            {type === "OA" ? <>Are you sure you want to delete purchase order attachment?</>:<></>}
                            {type === "IA" ? <>Are you sure you want to delete line item attachment?</> : <></>}
                            {type === "LI" ? <>Are you sure you want to delete line item?</> : <></> }
                            
                        </div>
                        <div className="col-md-4">
                        <FormButton name="Yes" onClick={(e) => { submitAttachments(e, deleteId); }} />
                        </div>
                    </div>
            </div>
        </div>);
};

export default DeleteConfirmation;