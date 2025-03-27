import { useState } from "react";
import "./SendInvite.css";
import InputField from "../FormParts/InputField";
import FormButton from "../FormParts/FormButton";
import { getRequest } from "../Services/ContrectBackendAPI";

const SendInvite = ({ openSendInvite, setOpenSendInvite }) => {

    const closeModule = (e) => {
        e.preventDefault();
        setOpenSendInvite(0);
    }

    return (
        <div className={openSendInvite === 0 ? "modalOverlay hidden" : "modalOverlay"}>
            <div className="modalContent">
                <button className="closeButton" onClick={(e) => { closeModule(e) }}>X</button>

            </div>
        </div>);
};
export default SendInvite;
