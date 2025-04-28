import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormSubmitButton from "../FormParts/FormSubmitButton";
import Form from "react-bootstrap/Form";
import FormButton from "../FormParts/FormButton";
import UserProfile from "../Context/UserProfile";
import "./DetailPO.css";
import OtherData from "../Context/OtherData";

const SelectContractTmplet = ({ setUserName, setUserType }) => {
	const navigate = useNavigate();
	const poForm = useRef(null);
	useEffect(() => {
		if (UserProfile.getLoginStatus() !== "1") {
			navigate("/");
		}
		setUserName(UserProfile.getName());
		setUserType(UserProfile.getUserType());

		
	}, []);
	const handleSubmit = (e) => {
		e.preventDefault();
	}
	//Home Maintenance Contract – Hiring plumbers, electricians, painters


	return (
        <><div className="d-flex h-100" style={{ overflowY: 'scroll' }}>
            <div className="table">
                <div className="row">
                    <div className="col-md-1">
                        <FormButton name="< Back" onClick={(e) => {
                            e.preventDefault();
                            navigate("/Home");
                        }} />
                    </div>
                    <div className="col-md-10">
                        <h4 style={{ textAlign: "center", color: '#007bff', margin: "0", marginBottom:"8px" }}>Agreement Templates</h4>
                    </div>
                </div>
                <div className="row" style={{ textAlign: "left", paddingBottom: '10px' }}>
                    <div className="col-md-3 p-0 m-0" >
                        <div className="selectTemplateAction" onClick={e => {
                            e.preventDefault();
                            //navigate("/HomeMaintenanceT1");
                            OtherData.setData("Home Maintenance");
                            navigate("/CustomAgreement");
                        }}>
                            <img src={"/Catalogue.png"} width={70} height={70} />
                            <br />
                            <span className="">
                                <strong>Home Maintenance</strong>
                                <br />
                                Manage and list your buy/sell items
                            </span>

                        </div>

                    </div>
                    <div className="col-md-3 p-0 m-0" >
                        <div className="selectTemplateAction" onClick={e => {
                            e.preventDefault();
                            //navigate("/PersonalLoanT1");
                            OtherData.setData("Personal Loan");
                            navigate("/CustomAgreement");
                        }}>
                            <img src={"/Terms.png"} width={70} height={70} />
                            <br />
                            <span className="">
                                <strong>personal Loan</strong>
                                <br />
                                Predefine terms for quick agreement generation
                            </span>

                        </div>

                    </div>
                    <div className="col-md-3 p-0 m-0" >
                        <div className="selectTemplateAction" onClick={e => {
                            e.preventDefault();
                            //navigate("/SublettingAgreementT1");
                            OtherData.setData("Subletting");
                            navigate("/CustomAgreement");
                        }}>
                            <img src={"/Terms.png"} width={70} height={70} />
                            <br />
                            <span className="">
                                <strong>Subletting</strong>
                                <br />
                                Predefine terms for quick agreement generation
                            </span>

                        </div>

                    </div>
                    <div className="col-md-3 p-0 m-0" >
                        <div className="selectTemplateAction" onClick={e => {
                            e.preventDefault();
                            /*navigate("/ResidentialAgreementT1");*/
                            OtherData.setData("Residential Agreement");
                            navigate("/CustomAgreement");
                        }}>
                            <img src={"/rfq.png"} width={70} height={70} />
                            <br />
                            <span className="">
                                <strong>Residential Agreement</strong>
                                <br />
                                Easily request supplier quotes
                            </span>

                        </div>

                    </div>
                </div>
                <div className="row" style={{ textAlign: "left", paddingBottom: '10px' }}>
                    <div className="col-md-3 p-0 m-0" >
                        <div className="selectTemplateAction" onClick={e => {
                            e.preventDefault();
                            //navigate("/BuySellT1");
                            OtherData.setData("Buy Sell");
                            navigate("/CustomAgreement");
                        }}>
                            <img src={"/Catalogue.png"} width={70} height={70} />
                            <br />
                            <span className="">
                                <strong>Buy Sell</strong>
                                <br />
                                Manage and list your buy/sell items
                            </span>

                        </div>

                    </div>
                    <div className="col-md-3 p-0 m-0" >
                        <div className="selectTemplateAction" onClick={e => {
                            e.preventDefault();
                            OtherData.setData("Blank Agreement");
                            navigate("/CustomAgreement");
                        }}>
                            <img src={"/Catalogue.png"} width={70} height={70} />
                            <br />
                            <span className="">
                                <strong>Custom Agreement</strong>
                                <br />
                                Manage and list your buy/sell items
                            </span>

                        </div>

                    </div>

                </div>
            </div>
			
		</div>
			
			
		</>
	);
};
export default SelectContractTmplet;
