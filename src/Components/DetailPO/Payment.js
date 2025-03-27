import "./Payment.css";
import { useRef } from "react";
import Form from "react-bootstrap/Form";
import InputField from "../FormParts/InputField";
import FormSubmitButton from "../FormParts/FormSubmitButton";
import { sendPostRequest, getRequest } from "../Services/ContrectBackendAPI";
import UserProfile from "../Context/UserProfile";
import { useState } from "react";
import InputNumberField from "../FormParts/InputNumberField"

const Payment = ({reloadMethod,data,setData}) => {

    const remarkForm = useRef(null);
	const [remarkMsg, setRemarkMsg] = useState("");
	const [displayForm, setDisplayForm] = useState(1);
    const closeModule = (e) => {
		e.preventDefault();
		setData();
		setRemarkMsg("");
		setDisplayForm(1);
		reloadMethod();
		
	}
	const resetForm = () => {
		remarkForm.current["PaidAmount"].value = 0; 
		remarkForm.current["PaymentNote"].value = "";
	}
    const submitRemark = (e) => {
		e.preventDefault();
		console.log(data);
		var formBody = {
			NotePaymentId: data.id,
			PaidAmount: remarkForm.current["PaidAmount"].value,
			PaymentNote: remarkForm.current["PaymentNote"].value
		};
		sendPostRequest("api/Business/MakePayment", UserProfile.getToken(), formBody).then(r => r.json()).then(res => {
			console.log(res);
			setDisplayForm(0);
			resetForm();
			if (res.status === 1) {
				
				setRemarkMsg("Payment done");
			} else
			{
				setRemarkMsg("Not able to save payment");
			}
		}).catch(err => console.log(err));

    }
 

	return (
		<>
			{data && data.id !== 0 ? <div className={data.id === 0 ? "modalOverlay hidden" : "modalOverlay"}>
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
									<InputNumberField name="PaidAmount" label="Amount" value={data.totalDueAmount - data.totalPaidAmount} />
									</div>
									<div className="col-md-12">
										<InputField name="PaymentNote" label="Note" />
									</div>
									<div className="col-md-12">
										<FormSubmitButton name="Submit" onClick={(e) => { submitRemark(e) }} />
									</div>
								</div>

							</Form>
						</div> : <></>}
					</div>
			</div> : <></>}
		</>
		
		);
};

export default Payment;