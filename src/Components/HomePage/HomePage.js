import "./HomePage.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserProfile from "../Context/UserProfile";
import FormButton from "../FormParts/FormButton";
import { getRequest, sendPostRequest } from "../Services/ContrectBackendAPI";
import { useState } from "react";
import PurchaseOrder from "../Context/PurchaseOrder";
import DelayMsgs from "../CommonPages/DelayMsgs";
import OtherData from "../Context/OtherData";
import ClientPorgress from "../CommonPages/ClientPorgress";
import CashFlowProgress from "../CommonPages/CashFlowProgress";


const HomePage = ({ setUserName, setUserType}) => {
    const navigate = useNavigate();
    const [agreementList, setAgreementList] = useState();
    const [userProposalLst, setUserProposalLst] = useState();
    const [activeProposalLst, setActiveProposalLst] = useState();
    const [clientReport, setClientReport] = useState();
    const [attensionRequired, setAttensionRequired] = useState();
    const [delayMsg, setDelayMsg] = useState([]);
    const [inviteList, setInviteList] = useState([]);
    useEffect(() => {
        if (UserProfile.getLoginStatus() !== "1") {
            navigate("/");
        }
        var d = OtherData.getData();
        if (d.length > 0 && d.startsWith("{"))
        {
            var dObj = JSON.parse(d);
            if (dObj.typeValue && dObj.typeValue.length > 0) {
                navigate("/Pay");
            }
            if (dObj.counterpartyDetails && dObj.counterpartyDetails.length>0)
            {
                navigate("/CustomAgreement");
                //var formData = dObj;
                //var formBody = {
                //    Id: 0,
                //    CreatorId: UserProfile.getUserId(),
                //    CreatorType: formData.userRole,
                //    OtherPartyContactInfo: formData.counterpartyContact,
                //    LDDays: formData.penalityDays,
                //    LDPercent: formData.penalityPercent,
                //    Advance: formData.advance,
                //    NumberOfDays: formData.contractDuration,
                //    ContractType: formData.contractType,
                //    StartDate: formData.startDate,
                //    Deposit: formData.deposite
                //};
                //sendPostRequest('api/Business/CustomContract', UserProfile.getToken(), formBody).then(r => r.json()).then(res => {

                //    if (res.status === 1) {
                //        for (var i = 0; i < formData.lineItems.length; i++) {

                //            var itemForm = {
                //                AgItemId: 0,
                //                AgId: res.data.id,
                //                CreatorId: UserProfile.getUserId(),
                //                Rate: formData.lineItems[i].rate,
                //                Tax: formData.lineItems[i].tax,
                //                ItemTitle: formData.lineItems[i].title,
                //                ItemDescription: formData.lineItems[i].description,
                //                ItemCode: formData.lineItems[i].hsnSac,
                //                ItemDeliveredInDays: formData.lineItems[i].timeToComplete,
                //                Qty: formData.lineItems[i].quantity,
                //                CurrencyId: formData.currency,
                //                UnitId: 1
                //            };
                //            // eslint-disable-next-line no-loop-func
                //            sendPostRequest('api/Business/AddAgreementItem', UserProfile.getToken(), itemForm).then(r => r.json()).then(resI => {
                //                if (resI.status !== 1) {
                //                    alert("Some error while adding item " + formData.lineItems[i].title);
                //                }
                //            }).catch(err => console.log(err));
                //        }
                //        for (var j = 0; j < formData.customTerms.length; j++) {

                //            var termForm = {
                //                Id: 0,
                //                TermTitle: formData.customTerms[j].title,
                //                TermTxt: formData.customTerms[j].text,
                //                TermTypeId: formData.userRole==='seller'?1:2,
                //                TermRfpId: res.data.id,
                //                Attachments: []
                //            };
                //            // eslint-disable-next-line no-loop-func
                //            sendPostRequest('api/Business/AddAgreementTerm', UserProfile.getToken(), termForm).then(r => r.json()).then(rest => {
                //                alert(JSON.stringify(rest));
                //                if (rest.status !== 1) {
                //                    alert("Some error while adding item " + formData.customTerms[j].title);
                //                }
                //            }).catch(err => console.log(err));
                //        }
                //        for (var k = 0; k < formData.paymentTerms.length; k++) {

                //            var termPForm = {
                //                Id: 0,
                //                TermTitle: formData.customTerms[k].title,
                //                TermTxt: formData.customTerms[k].text,
                //                TermTypeId: formData.userRole === 'seller' ? 1 : 2,
                //                TermRfpId: res.data.id,
                //                Attachments: []
                //            };
                //            // eslint-disable-next-line no-loop-func
                //            sendPostRequest('api/Business/AddAgreementTerm', UserProfile.getToken(), termPForm).then(r => r.json()).then(respt => {
                //                alert(JSON.stringify(respt));
                //                if (respt.status !== 1) {
                //                    alert("Some error while adding item " + formData.lineItems[k].title);
                //                }
                //            }).catch(err => console.log(err));
                //        }

                //    }


                //    //OtherData.setData(JSON.stringify(res.data));
                //    //navigate("/draftD2C");

                //}).catch(err => {
                //    console.log(err);
                //});
            }
        }
        
        setUserName(UserProfile.getName());
        setUserType(UserProfile.getUserType());
        loadInviteList();
        loadAgreementList();
        loadClientReport();
        //getRequest("api/POManagerAuth/getClientInfo", UserProfile.getToken()).then(rr => rr.json()).then(resD => {
        //    if (resD.message && resD.message === "Unauthorized:User is invalid")
        //    {
        //        UserProfile.resetUser();
        //        navigate("/");
        //        return;
        //    }
        //    setUserName(resD.data.name);
        //    UserProfile.setUserId(resD.data.id);
        //    UserProfile.setEmail(resD.data.email);
        //    UserProfile.setName(resD.data.name);
        //    UserProfile.setContactNumber(resD.data.phoneNumber);
        //}).catch(err => console.log(err));
        getRequest("api/Business/GetUserRFQList", UserProfile.getToken()).then(rr => rr.json()).then(res => {
            console.log(res);
            if (res.status === 1 && res.data.length > 0)
            {
                setUserProposalLst(res.data);
            }
        }).catch(err => console.log(err));
        getRequest("api/Business/GetAllRFQList", UserProfile.getToken()).then(rr => rr.json()).then(res => {
            console.log(res);
            if (res.status === 1 && res.data.length > 0) {
                setActiveProposalLst(res.data);
            }
        }).catch(err => console.log(err));
        //getRequest("api/POManagement/GetPOAssociatedWithUser?isRaisedBy=false", UserProfile.getToken()).then(rr => rr.json()).then(res => {
        //    if (res.status === 0 && res.data.length > 0) {
        //        setRaisedForList(res.data);
        //    }
        //}).catch(err => console.log(err));
    }, []);
    const loadClientReport = () => {
        getRequest("api/Business/ClientReport", UserProfile.getToken()).then(x => x.json()).then(res => {
            console.log(res);
            setClientReport(res.data);
        }).catch(err => console.log(err));
    }
    const loadAttensionRequired = (data) => {
        getRequest("api/Business/ActiveTxnNoteAgList", UserProfile.getToken()).then(x => x.json()).then(resAt => {
            console.log(resAt);
            var requiredAttension = [];
            for (var i = 0; i < resAt.data.length; i++) {
                for (var j = 0; j < data.length; j++) {
                    if (data[j].id === resAt.data[i])
                    {
                        requiredAttension.push(data[j]);
                        break;
                    }
                }
            }
            setAttensionRequired(requiredAttension);
        }).catch(err => console.log(err));
    }
    const loadAgreementList = (pid) => {
        getRequest("api/Business/GetUserAgreements", UserProfile.getToken()).then(x => x.json()).then(res => {
            console.log(res);
            setAgreementList(res.data);
            loadAttensionRequired(res.data);
        }).catch(err => console.log(err));
    }
    const loadInviteList = (pid) => {
        getRequest("api/Business/GetAllInvitesOfUser", UserProfile.getToken()).then(x => x.json()).then(res => {
            console.log(res);
            setInviteList(res.data);
        }).catch(err => console.log(err));
    }
    const editRFQ = (e, po) => {
        e.preventDefault();
        OtherData.setData(JSON.stringify(po));
        navigate("/NewRFQ");

    }
    const ApplyForInvite = (inviteId) => {
        getRequest("api/Business/GetProposalFromInvite?inviteId=" + inviteId, UserProfile.getToken()).then(r => r.json()).then(res => {
            if (res.status === 1) {
                OtherData.setData(JSON.stringify(res.data));
                navigate("/ApplyRFQ");
            } else
            {
                alert("Not able to fetch proposal data");
            }
        }).catch(err => console.log(err));
    }
    const editAgreement = (e, agrmnt) =>
    {
        e.preventDefault();
        OtherData.setData(JSON.stringify(agrmnt));
        if (agrmnt.proposalId > 0) {
            navigate("/draftAgreement");
        } else
        {
            navigate("/draftD2C");
        }
        
    }
    const openTab = (e, id) => {
        e.preventDefault();
        var tabContent = document.getElementsByClassName("tab-content");
        for (var i = 0; i < tabContent.length; i++) {
            tabContent[i].style.display = "none";
            tabContent[i].classList.remove("active");
        }
        var tabButtons = document.getElementsByClassName("tab-Hbutton");
        for (var i = 0; i < tabButtons.length; i++) {
            tabButtons[i].classList.remove("active");
        }
        document.getElementById(id).style.display = "block";
        document.getElementById(id).classList.add("active");
        e.currentTarget.classList.add("active");
    }

    return (
        <div className="h-100" style={{ overflowY: "scroll" }}>
            <DelayMsgs msgList={delayMsg} setMsgList={setDelayMsg} />
            <div className="mt-1" >
                <div className="row mb-1">
                    <div className="col-md-3 p-0 m-0" >
                        <div className="landingPageAction"
                            onClick={e => {
                                e.preventDefault();
                                navigate("/SelectTemplate");
                            }}
                            style={{ cursor: "pointer", backgroundColor:"#007bff", color:"white" }} >
                            {/*<img src={"/DraftAgreement.png"} width={40} height={40} />*/}
                            &#128221;
                            <br />
                            <span className="">
                                <strong>Draft Agreement</strong>
                                <br />
                                Create and manage agreements easily
                            </span>
                        </div>

                        {/*<FormButton name="Draft Agreement" onClick={(e) => {*/}

                        {/*}} myClass="routingBtn" />*/}

                    </div>
                    <div className="col-md-3 p-0 m-0" >
                        <div className="landingPageAction" onClick={e => {
                            e.preventDefault();
                            navigate("/userItems");
                        }}>
                            {/*<img src={"/Catalogue.png"} width={40} height={40} />*/}
                            &#128717;&#65039;
                            <br />
                            <span className="">
                                <strong>Catalogue</strong>
                                <br />
                                Manage and list your buy/sell items
                            </span>
                            
                        </div>
                        
                        {/*<FormButton name="Generate RFQ" onClick={(e) => {*/}
                        {/*    PurchaseOrder.setRaisedBy("Seller");*/}
                        {/*    OtherData.resetData();*/}
                        {/*    navigate("/NewRFQ");*/}
                        {/*}} myClass="routingBtn" mystyle={{width:'80%'}} />*/}

                    </div>
                    <div className="col-md-3 p-0 m-0" >
                        <div className="landingPageAction" onClick={e => {
                            e.preventDefault();
                            navigate("/userTerms");
                        }}>
                            {/*<img src={"/Terms.png"} width={40} height={40} />*/}
                            &#128220;
                            <br />
                            <span className="">
                                <strong>User Terms</strong>
                                <br />
                                Predefine terms for quick agreement generation
                            </span>
                            
                        </div>
                        {/*<FormButton name="User Terms" onClick={(e) => {*/}
                            
                        {/*}} myClass="routingBtn"/>*/}

                    </div>
                    <div className="col-md-3 p-0 m-0" >
                        <div className="landingPageAction" onClick={e => {
                            e.preventDefault();
                            OtherData.resetData();
                            navigate("/NewRFQ");
                        }}>
                            {/*<img src={"/rfq.png"} width={40} height={40} />*/}
                            &#128232;
                            <br />
                            <span className="">
                                <strong>Generate Request Quote</strong>
                                <br />
                                Easily request supplier quotes
                            </span>
                            
                        </div>
                        {/*<FormButton name="Catalog" onClick={(e) => {*/}
                            
                        {/*}} myClass="routingBtn" />*/}

                    </div>

                </div>
                <div className="row">
                    <div className="col-md-12 col-xs-12">
                        <div className="landingPageReport">
                            <div className="tabs">
                                <div className="tab-buttons">
                                    <button className="tab-Hbutton active" onClick={(e) => { openTab(e, "ActiveAggrements"); }}>Dashboard</button>
                                    <button className="tab-Hbutton" onClick={(e) => { openTab(e, "DraftAggrements"); }}>RFQ/Invites</button>
                                    <button className="tab-Hbutton" onClick={(e) => { openTab(e, "CompletedAggrements"); }}>Contracts</button>
                                </div>
                                <div className="">
                                    <div id="ActiveAggrements" className="tab-content active">
                                        <div className="landingPageReport">
                                            <h4 style={{ textAlign: "left" }}>Dashboard</h4>
                                            <div className="table">
                                                <div className="row">
                                                    <div className="col-md-6 ">
                                                        <div className="landingPageReport">
                                                            <h5 style={{ textAlign: "left" }}>Receivables Overview</h5>

                                                            {clientReport ? <>
                                                                <ClientPorgress totalValue={clientReport.totalSellerContractAmount}
                                                                    invoiceRaised={clientReport.totalSellerInvoiceAmount}
                                                                    invoiceCleared={clientReport.totalSellerInvoiceAmountCleared}
                                                                    cashOutflow={clientReport.totalCashIn} />
                                                            </> : <>Loading data..</>}
                                                        </div>

                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="landingPageReport">
                                                            <h5 style={{ textAlign: "left" }}>Payables Overview</h5>
                                                            {clientReport ? <>
                                                                <ClientPorgress totalValue={clientReport.totalBuyerContractAmount}
                                                                    invoiceRaised={clientReport.totalBuyerInvoiceAmount}
                                                                    invoiceCleared={clientReport.totalBuyerInvoiceAmountCleared}
                                                                    cashOutflow={clientReport.totalCashOut} />
                                                            </> : <>Loading data..</>}
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="row m-5">
                                                    <div className="col-md-6 ">
                                                        <div className="landingPageReport">
                                                            <h5 style={{ textAlign: "left" }}>Actions required</h5>
                                                            {attensionRequired && attensionRequired.length > 0 ? <>
                                                                <ul>
                                                                    {attensionRequired.map(x => <li>
                                                                        (Buyer){x.buyer.usrName} and (Seller) {x.seller.usrName} agreement required your attention <span className="clickableLink" onClick={(e) => {
                                                                            e.preventDefault();
                                                                            OtherData.setData(JSON.stringify(x));
                                                                            navigate("/DetailContract")
                                                                        }}>click here to see the agreement.</span>
                                                                    </li>)}
                                                                </ul>

                                                            </> : <>No urgent action</>}
                                                        </div>

                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="landingPageReport">
                                                            <h5 style={{ textAlign: "left" }}>Cash flow</h5>
                                                            {clientReport ? <>
                                                                <CashFlowProgress cashIn={clientReport.totalCashIn } cashOut={clientReport.totalCashOut }/>
                                                            </> : <>Loading data..</>}
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div id="DraftAggrements" className="tab-content">
                                        <div className="landingPageReport">
                                            <div className="table mr-1">
                                                <h5 style={{ textAlign: "left" }}>User Proposal</h5>
                                                <div className="d-none d-md-block">
                                                    <div className="row tableHeader ">
                                                        <div className="col-md-3 tableSingelHeading">
                                                            Owner
                                                        </div>
                                                        <div className="col-md-2 tableSingelHeading">
                                                            Duration
                                                        </div>
                                                        <div className="col-md-4 tableSingelHeading">
                                                            LD Details
                                                        </div>
                                                        <div className="col-md-1 tableSingelHeading">
                                                            Status
                                                        </div>
                                                        <div className="col-md-2 tableSingelHeading" style={{ textAlign: "center" }}>
                                                            Action
                                                        </div>
                                                    </div>
                                                </div>
                                                {userProposalLst && userProposalLst.length > 0 ? userProposalLst.map(tempPO => <div className="row tablebox">
                                                    <div className="col-md-3 col-xs-12 d-flex align-items-center">
                                                        <span>
                                                            <strong className="d-inline d-md-none">Owner: </strong>
                                                            {tempPO.owner.usrName} <br />
                                                            <span style={{ fontSize: '10px' }}>
                                                                {tempPO.owner.email}
                                                                {tempPO.owner.phoneNumber}
                                                                {tempPO.owner.usrGstin}</span>
                                                        </span>

                                                    </div>
                                                    <div className="col-md-2 col-xs-12 d-flex align-items-center">
                                                        <span>
                                                            <strong className="d-inline d-md-none">Duration: </strong>
                                                            {tempPO.proposalCompletionInDays}<br />

                                                        </span>
                                                    </div>
                                                    <div className="col-md-4 col-xs-12 d-flex align-items-center">
                                                        <span>
                                                            <strong className="d-inline d-md-none">LD Details </strong>
                                                            {tempPO.proposalLdPercent}% after {tempPO.proposalLdAppliedAfterDays} days delay

                                                        </span>
                                                    </div>
                                                    <div className="col-md-1 col-xs-12 d-flex align-items-center">
                                                        <span>
                                                            <strong className="d-inline d-md-none">Status: </strong>
                                                            <span class="badge bg-secondary text-light">{tempPO.proposalStatus}</span>
                                                        </span>
                                                    </div>
                                                    <div className="col-md-2 col-xs-12 d-flex align-items-center justify-content-center" style={{ textAlign: "center" }} >
                                                        {tempPO.proposalStatus === "Active" ? <FormButton name="Detail" onClick={(e) => {
                                                            e.preventDefault();
                                                            OtherData.setData(JSON.stringify(tempPO));
                                                            navigate("/DetailProposal");
                                                        }} /> : <></>}
                                                        {tempPO.proposalStatus === "Draft" ? <FormButton name="Edit" onClick={(e) => {
                                                            editRFQ(e, tempPO);
                                                        }} /> : <></>}

                                                    </div>
                                                </div>
                                                ) : <div className="row tablebox">No Data present</div>}

                                            </div>
                                        </div>
                                        <div className="landingPageReport">
                                            <div className="table mr-1">
                                                <h5 style={{ textAlign: "left" }}>Active Proposal</h5>
                                                <div className="d-none d-md-block">
                                                    <div className="row tableHeader ">
                                                        <div className="col-md-3 tableSingelHeading">
                                                            Owner
                                                        </div>
                                                        <div className="col-md-2 tableSingelHeading">
                                                            Duration
                                                        </div>
                                                        <div className="col-md-4 tableSingelHeading">
                                                            LD Details
                                                        </div>
                                                        <div className="col-md-1 tableSingelHeading">
                                                            Status
                                                        </div>
                                                        <div className="col-md-2 tableSingelHeading" style={{ textAlign: "center" }}>
                                                            Action
                                                        </div>
                                                    </div>
                                                </div>
                                                {activeProposalLst && activeProposalLst.length > 0 ? activeProposalLst.map(tempPO => <div className="row tablebox">
                                                    <div className="col-md-3 col-xs-12 d-flex align-items-center">
                                                        <span>
                                                            <strong className="d-inline d-md-none">Owner: </strong>
                                                            {tempPO.owner.usrName} <br />
                                                            <span style={{ fontSize: '10px' }}>
                                                                {tempPO.owner.email}
                                                                {tempPO.owner.phoneNumber}
                                                                {tempPO.owner.usrGstin}</span>
                                                        </span>

                                                    </div>
                                                    <div className="col-md-2 col-xs-12 d-flex align-items-center">
                                                        <span>
                                                            <strong className="d-inline d-md-none">Duration: </strong>
                                                            {tempPO.proposalCompletionInDays}<br />

                                                        </span>
                                                    </div>
                                                    <div className="col-md-4 col-xs-12 d-flex align-items-center">
                                                        <span>
                                                            <strong className="d-inline d-md-none">LD Details </strong>
                                                            {tempPO.proposalLdPercent}% after {tempPO.proposalLdAppliedAfterDays} days delay

                                                        </span>
                                                    </div>
                                                    <div className="col-md-1 col-xs-12 d-flex align-items-center">
                                                        <span>
                                                            <strong className="d-inline d-md-none">Status: </strong>
                                                            <span class="badge bg-secondary text-light">{tempPO.proposalStatus}</span>
                                                        </span>
                                                    </div>
                                                    <div className="col-md-2 col-xs-12 d-flex align-items-center justify-content-center" style={{ textAlign: "center" }} >
                                                        <FormButton name="Apply" onClick={(e) => {
                                                            e.preventDefault();
                                                            OtherData.setData(JSON.stringify(tempPO));
                                                            navigate("/ApplyRFQ");
                                                        }} />
                                                    </div>
                                                </div>
                                                ) : <div className="row tablebox">No Data present</div>}

                                            </div>
                                        </div>
                                        
                                        <div className="landingPageReport">
                                            <div className="table mr-1">
                                                <h5 style={{ textAlign: "left" }}>User Invites</h5>
                                                <div className="d-none d-md-block">
                                                    <div className="row tableHeader ">
                                                        <div className="col-md-1 tableSingelHeading">
                                                            S. No.
                                                        </div>
                                                        <div className="col-md-6 tableSingelHeading">
                                                            Raised By
                                                        </div>

                                                        <div className="col-md-2 tableSingelHeading">Status</div>
                                                        <div className="col-md-3 tableSingelHeading">Action</div>
                                                    </div>
                                                </div>

                                                {inviteList && inviteList.length > 0 ? inviteList.map((x, ind) => <div className="row p-1 tablebox">
                                                    <div className="col-md-1">
                                                        <strong className="d-inline d-md-none">S.No.: </strong>
                                                        {ind + 1}

                                                    </div>
                                                    <div className="col-md-6">
                                                        <strong className="d-inline d-md-none">Raised For: </strong>
                                                        {x.raisedByUser.usrName}
                                                        <br />
                                                        ({x.raisedByUser.phoneNumber})
                                                        <br />
                                                        {x.raisedByUser.email}
                                                    </div>
                                                    <div className="col-md-2">
                                                        <strong className="d-inline d-md-none">Status: </strong>
                                                        {x.inviteStatusId}<br />
                                                    </div>
                                                    <div className="col-md-3 ">
                                                        <FormButton name="Apply" onClick={(e) => {
                                                            e.preventDefault();
                                                            ApplyForInvite(x.id);
                                                        }} />
                                                    </div>
                                                </div>) : <div className="row"> No Items in Proposal</div>}
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div id="CompletedAggrements" className="tab-content">
                                        <div className="landingPageReport">
                                            <h5 style={{ textAlign: "left" }}>Agreements</h5>
                                            <div className="table ml-1 ">
                                                <div className="d-none d-md-block align-items-center">
                                                    <div className="row tableHeader">
                                                        <div className="col-md-3 tableSingelHeading">
                                                            Buyer
                                                        </div>
                                                        <div className="col-md-3 tableSingelHeading">
                                                            Seller
                                                        </div>
                                                        <div className="col-md-2 tableSingelHeading">
                                                            Status
                                                        </div>
                                                        <div className="col-md-2 tableSingelHeading">
                                                            LD / Advance:
                                                        </div>
                                                        <div className="col-md-2 tableSingelHeading" style={{ textAlign: "center" }}>
                                                            Action
                                                        </div>
                                                    </div>
                                                </div>
                                                {agreementList && agreementList.length > 0 ? agreementList.map(tempPO => (
                                                    tempPO.status === "Draft"
                                                    || tempPO.status === "Proposed"
                                                    || tempPO.status === "Accepted"
                                                    || tempPO.status === "Waiting for Seller"
                                                    || tempPO.status === "Waiting for Buyer"
                                                ) ? < div className="row tablebox" >
                                                    <div className="col-md-3 d-flex align-items-center">
                                                        <span>
                                                            <strong className="d-inline d-md-none">Buyer: </strong>{tempPO.buyer.usrName}<br />
                                                            <span style={{ fontSize: '10px' }}>{tempPO.buyer.phoneNumber}</span><br />
                                                            <span style={{ fontSize: '10px' }}>{tempPO.buyer.email}</span><br />
                                                            <span style={{ fontSize: '10px' }}>{tempPO.buyer.usrAddress}</span>
                                                        </span>
                                                    </div>
                                                    <div className="col-md-3 d-flex align-items-center">
                                                        <span>
                                                            <strong className="d-inline d-md-none">Buyer: </strong>{tempPO.seller.usrName}<br />
                                                            <span style={{ fontSize: '10px' }}>{tempPO.seller.phoneNumber}</span><br />
                                                            <span style={{ fontSize: '10px' }}>{tempPO.seller.email}</span><br />
                                                            <span style={{ fontSize: '10px' }}>{tempPO.seller.usrAddress}</span>
                                                        </span>

                                                    </div>
                                                    <div className="col-md-2 d-flex align-items-center">

                                                        <span>
                                                            <strong className="d-inline d-md-none">Status: </strong>
                                                            <span class="badge bg-success text-light">{tempPO.status}</span>
                                                        </span>
                                                    </div>
                                                    <div className="col-md-2 d-flex align-items-center">
                                                        <span>
                                                            <strong className="d-block d-md-none">LD / Advance: </strong>
                                                            {tempPO.ldPercent}% will be deduced after {tempPO.ldDays} days delay
                                                            and advance of {tempPO.advance}%

                                                        </span>
                                                    </div>
                                                    <div className="col-md-2 d-flex align-items-center justify-content-center" style={{ textAlign: "center" }}>
                                                        <div className="d-none d-md-block">
                                                            <div className="row m-0 p-0">
                                                                <div className="col-md-6 m-0 p-0" style={{ textAlign: "right" }}>
                                                                    {tempPO.status === "Draft" ?
                                                                        <FormButton name="Edit" onClick={(e) => editAgreement(e, tempPO)} /> : <></>}

                                                                </div>
                                                                <div className="col-md-6 m-0 p-0" style={{ textAlign: "left" }}>
                                                                    <FormButton name="Respond" onClick={(e) => {
                                                                        e.preventDefault();
                                                                        OtherData.setData(JSON.stringify(tempPO));
                                                                        navigate("/DetailAgreement")
                                                                    }} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-block d-md-none">
                                                            <div className="row m-0 p-0">
                                                                <div className="col-xs-6 m-0 p-0">
                                                                    <FormButton name="Respond" onClick={(e) => {
                                                                        e.preventDefault();
                                                                        PurchaseOrder.setPoId(tempPO.poId);
                                                                        navigate("/DetailAgreement")
                                                                    }} />
                                                                </div>
                                                            </div>
                                                        </div>


                                                    </div>
                                                </div> : <></>
                                                ) : <div className="row tablebox">No Data present</div>}

                                            </div>
                                        </div>
                                        <div className="landingPageReport">
                                            <h5 style={{ textAlign: "left" }}>Contracts</h5>
                                            <div className="table ml-1 ">
                                                <div className="d-none d-md-block">
                                                    <div className="row tableHeader">
                                                        <div className="col-md-3 tableSingelHeading">
                                                            LD condition
                                                        </div>
                                                        <div className="col-md-2 tableSingelHeading">
                                                            Buyer
                                                        </div>
                                                        <div className="col-md-2 tableSingelHeading">
                                                            Seller
                                                        </div>
                                                        <div className="col-md-1 tableSingelHeading">
                                                            Status
                                                        </div>
                                                        <div className="col-md-4 tableSingelHeading" style={{ textAlign: "center" }}>
                                                            Action
                                                        </div>
                                                    </div>
                                                </div>
                                                {agreementList && agreementList.length > 0 ? agreementList.map(tempPO => tempPO.status === "Active" || tempPO.status === "Completed" ?
                                                    <div className="row tablebox">
                                                        <div className="col-md-3 d-flex align-items-center">
                                                            <span>
                                                                <strong className="d-block d-md-none">LD / Advance: </strong>
                                                                {tempPO.ldPercent}% will be deduced after {tempPO.ldDays} days delay
                                                                and advance of {tempPO.advance}%

                                                            </span>

                                                        </div>
                                                        <div className="col-md-2 d-flex align-items-center">
                                                            <span>
                                                                <strong className="d-inline d-md-none">Buyer: </strong>{tempPO.buyer.usrName}<br />
                                                                <span style={{ fontSize: '10px' }}>{tempPO.buyer.phoneNumber}</span><br />
                                                                <span style={{ fontSize: '10px' }}>{tempPO.buyer.email}</span><br />
                                                                <span style={{ fontSize: '10px' }}>{tempPO.buyer.usrAddress}</span>
                                                            </span>

                                                        </div>
                                                        <div className="col-md-2 d-flex align-items-center">
                                                            <span>
                                                                <strong className="d-inline d-md-none">Buyer: </strong>{tempPO.seller.usrName}<br />
                                                                <span style={{ fontSize: '10px' }}>{tempPO.seller.phoneNumber}</span><br />
                                                                <span style={{ fontSize: '10px' }}>{tempPO.seller.email}</span><br />
                                                                <span style={{ fontSize: '10px' }}>{tempPO.seller.usrAddress}</span>
                                                            </span>

                                                        </div>
                                                        <div className="col-md-1 d-flex align-items-center">
                                                            <span>
                                                                <strong className="d-inline d-md-none">Status: </strong>
                                                                <span class="badge bg-secondary text-light">{tempPO.status}</span>
                                                            </span>
                                                        </div>
                                                        <div className="col-md-4 d-flex align-items-center justify-content-center" style={{ textAlign: "center" }}>
                                                            <div className="d-none d-md-block">
                                                                <div className="row m-0 p-0 ">
                                                                    <div className="col-md-6 m-0 p-0" style={{ textAlign: "left" }}>
                                                                        <FormButton name="Detail" onClick={(e) => {
                                                                            e.preventDefault();
                                                                            OtherData.setData(JSON.stringify(tempPO));
                                                                            navigate("/DetailContract")
                                                                        }} />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="d-block d-md-none">
                                                                <div className="row m-0 p-0 ">
                                                                    <div className="col-xs-6 m-0 p-0" style={{ textAlign: "center" }}>
                                                                        <FormButton name="Detail" onClick={(e) => {
                                                                            e.preventDefault();
                                                                            OtherData.setData(JSON.stringify(tempPO));
                                                                            navigate("/DetailContract")
                                                                        }} />
                                                                    </div>
                                                                </div>
                                                            </div>


                                                        </div>
                                                    </div> : <></>
                                                ) : <div className="row tablebox">No Data present</div>}

                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
		</div>
	);
};

export default HomePage;
