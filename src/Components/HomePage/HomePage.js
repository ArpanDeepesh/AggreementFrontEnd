import "./HomePage.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserProfile from "../Context/UserProfile";
import FormButton from "../FormParts/FormButton";
import { getRequest } from "../Services/ContrectBackendAPI";
import { useState } from "react";
import PurchaseOrder from "../Context/PurchaseOrder";
import DelayMsgs from "../CommonPages/DelayMsgs";
import OtherData from "../Context/OtherData";


const HomePage = ({ setUserName, setUserType}) => {
    const navigate = useNavigate();
    const [agreementList, setAgreementList] = useState();
    const [userProposalLst, setUserProposalLst] = useState();
    const [activeProposalLst, setActiveProposalLst] = useState();
    const [delayMsg, setDelayMsg] = useState([]);
    const [inviteList, setInviteList] = useState([]);
    useEffect(() => {
        if (UserProfile.getLoginStatus() !== "1") {
            navigate("/");
        }
        setUserName(UserProfile.getName());
        setUserType(UserProfile.getUserType());
        loadInviteList();
        loadAgreementList();
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
    
    const loadAgreementList = (pid) => {
        getRequest("api/Business/GetUserAgreements", UserProfile.getToken()).then(x => x.json()).then(res => {
            console.log(res);
            setAgreementList(res.data);
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
    const copyPurchaseOrder = (e, po) => {
        e.preventDefault();
        console.log(po);
        //getRequest("api/POManagement/CopyPurchaseOrder?poId=" + po.poId, UserProfile.getToken()).then(rr => rr.text()).then(res => {
        //    console.log(res);
        //    if (res > 0) {
        //        console.log(res);
        //        PurchaseOrder.setPoId(res);
        //        PurchaseOrder.setPurchaseOrderEditFlag(1);
        //        if (po.sellerId.toString() === UserProfile.getUserId()) {
        //            PurchaseOrder.setRaisedBy("Buyer");
        //        } else {
        //            PurchaseOrder.setRaisedBy("Seller");
        //        }
        //        navigate("/New");
        //    }
            
        //}).catch(err => console.log(err));
    }
    const editAgreement = (e, agrmnt) =>
    {
        e.preventDefault();
        OtherData.setData(JSON.stringify(agrmnt));
        navigate("/draftAgreement");
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
                        <FormButton name="Generate RFQ" onClick={(e) => {
                            PurchaseOrder.setRaisedBy("Seller");
                            OtherData.resetData();
                            navigate("/NewRFQ");
                        }} myClass="routingBtn" mystyle={{width:'80%'}} />

                    </div>
                    <div className="col-md-3 p-0 m-0" >
                        <FormButton name="User Terms" onClick={(e) => {
                            PurchaseOrder.setRaisedBy("Buyer");
                            navigate("/userTerms");
                        }} myClass="routingBtn"/>

                    </div>
                    <div className="col-md-3 p-0 m-0" >
                        <FormButton name="Catalog" onClick={(e) => {
                            PurchaseOrder.setRaisedBy("Buyer");
                            navigate("/userItems");
                        }} myClass="routingBtn" />

                    </div>
                    <div className="col-md-3 p-0 m-0" >
                        <FormButton name="Draft Agreement" onClick={(e) => {
                            PurchaseOrder.setRaisedBy("Buyer");
                            navigate("/draftAgreement");
                        }} myClass="routingBtn" />

                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 col-xs-12">
                        <div className="tabs">
                            <div className="tab-buttons">
                                <button className="tab-Hbutton" onClick={(e) => { openTab(e, "DraftAggrements"); }}>RFQ/Invites</button>
                                <button className="tab-Hbutton active" onClick={(e) => { openTab(e, "ActiveAggrements"); }}>Agreements</button>
                                <button className="tab-Hbutton" onClick={(e) => { openTab(e, "CompletedAggrements"); }}>Contracts</button>
                            </div>
                            <div id="DraftAggrements" className="tab-content">
                                <div className="table mr-1">
                                    <h4>User Proposal</h4>
                                    <div className="d-none d-md-block">
                                        <div className="row tableHeader ">
                                            <div className="col-md-3">
                                                Owner
                                            </div>
                                            <div className="col-md-2">
                                                Duration
                                            </div>
                                            <div className="col-md-4">
                                                LD Details
                                            </div>
                                            <div className="col-md-1">
                                                Status
                                            </div>
                                            <div className="col-md-2" style={{ textAlign: "center" }}>
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
                                <div className="table mr-1">
                                    <h4>Active Proposal</h4>
                                    <div className="d-none d-md-block">
                                        <div className="row tableHeader ">
                                            <div className="col-md-3">
                                                Owner
                                            </div>
                                            <div className="col-md-2">
                                                Duration
                                            </div>
                                            <div className="col-md-4">
                                                LD Details
                                            </div>
                                            <div className="col-md-1">
                                                Status
                                            </div>
                                            <div className="col-md-2" style={{ textAlign: "center" }}>
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
                                <div className="table mr-1">
                                    <h4>User Invites</h4>
                                    <div className="d-none d-md-block">
                                        <div className="row tableHeader ">
                                            <div className="col-md-1 ">
                                                S. No.
                                            </div>
                                            <div className="col-md-6 ">
                                                Raised By
                                            </div>

                                            <div className="col-md-2 ">Status</div>
                                            <div className="col-md-3 ">Action</div>
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
                            <div id="ActiveAggrements" className="tab-content active">
                                <h4>Agreements</h4>
                                <div className="table ml-1 ">
                                    <div className="d-none d-md-block align-items-center">
                                        <div className="row tableHeader">
                                            <div className="col-md-3">
                                                Buyer
                                            </div>
                                            <div className="col-md-3">
                                                Seller
                                            </div>
                                            <div className="col-md-2">
                                                Status
                                            </div>
                                            <div className="col-md-2">
                                                LD / Advance:
                                            </div>
                                            <div className="col-md-2" style={{ textAlign: "center" }}>
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
                                    </div>:<></>
                                    ) : <div className="row tablebox">No Data present</div>}

                                </div>
                            </div>
                            <div id="CompletedAggrements" className="tab-content">
                                <h4>Completed Or Expired Contracts</h4>
                                <div className="table ml-1 ">
                                    <div className="d-none d-md-block">
                                        <div className="row tableHeader">
                                            <div className="col-md-3">
                                                LD condition
                                            </div>
                                            <div className="col-md-2">
                                                Buyer
                                            </div>
                                            <div className="col-md-2">
                                                Seller
                                            </div>
                                            <div className="col-md-1">
                                                Status
                                            </div>
                                            <div className="col-md-4" style={{ textAlign: "center" }}>
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
                                    </div>:<></>
                                    ) : <div className="row tablebox">No Data present</div>}

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
