import { useEffect } from "react";
import UserProfile from "../Context/UserProfile";
import { getRequest } from "../Services/ContrectBackendAPI";
import { useState } from "react";
import OtherData from "../Context/OtherData";
import { useNavigate } from "react-router-dom";

const RFQList = () => {
    const [otherActiveProposalLst, setOtherProposalLst] = useState([]);
    const [userDraftProposalLst, setDraftProposalLst] = useState([]);
    const [userActiveProposalLst, setActiveProposalLst] = useState([]);
    const [userClosedProposalLst, setClosedProposalLst] = useState([]);
    const [inviteList, setInviteList] = useState([]);
    const navigate = useNavigate();
    useEffect(() => { 
        getRequest("api/Business/GetAllRFQList", UserProfile.getToken()).then(rr => rr.json()).then(res => {
            console.log(res);
            if (res.status === 1 && res.data.length > 0) {
                var activeLst = [];
                for (var i = 0; i < res.data.length; i++) {
                    activeLst.push(res.data[i]);
                }
                setOtherProposalLst(activeLst);

            }
        }).catch(err => console.log(err));
        getRequest("api/Business/GetUserRFQList", UserProfile.getToken()).then(rr => rr.json()).then(res => {
            console.log(res);
            if (res.status === 1 && res.data.length > 0) {
                var draftlst = [];
                var activeLst = [];
                var closedLst = [];
                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].proposalStatus === "Draft") {
                        draftlst.push(res.data[i]);
                    }
                    else if (res.data[i].proposalStatus === "Active")
                    {
                        activeLst.push(res.data[i]);
                    } else if (res.data[i].proposalStatus === "Closed" || res.data[i].proposalStatus === "Completed" || res.data[i].proposalStatus === "Expired") {
                        closedLst.push(res.data[i]);
                    }
                }
                setClosedProposalLst(closedLst);
                setActiveProposalLst(activeLst);
                setDraftProposalLst(draftlst);

            }
        }).catch(err => console.log(err));
        getRequest("api/Business/GetAllInvitesOfUser", UserProfile.getToken()).then(x => x.json()).then(res => {
            console.log(res);
            setInviteList(res.data);
        }).catch(err => console.log(err));
    }, []);
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
            } else {
                alert("Not able to fetch proposal data");
            }
        }).catch(err => console.log(err));
    }
    const openTab = (e, id) => {
        e.preventDefault();
        var tabContent = document.getElementsByClassName("status-RFQ-content");
        for (var i = 0; i < tabContent.length; i++) {
            /*tabContent[i].style.display = "none";*/
            tabContent[i].classList.remove("active");
        }
        var tabButtons = document.getElementsByClassName("status-RFQ-tab");
        for (var i = 0; i < tabButtons.length; i++) {
            tabButtons[i].classList.remove("active");
        }
        /*document.getElementById(id).style.display = "block";*/
        document.getElementById(id).classList.add("active");
        e.currentTarget.classList.add("active");
    }
    return (<>
        <div class="status-overview">
            <div class="section-header">
                <h3 class="section-title">RFQ List</h3>
                {/*<a href="#" class="view-all">View All</a>*/}
            </div>

            <div class="status-tabs">
                <div class="status-tab status-RFQ-tab " onClick={(e) => { openTab(e, "otherActiveProposals") }}>Others Active({otherActiveProposalLst && otherActiveProposalLst.length && otherActiveProposalLst.length > 0 ? otherActiveProposalLst.length : 0})</div>
                <div class="status-tab status-RFQ-tab active" onClick={(e) => { openTab(e, "draftProposals") }}>User Draft ({userDraftProposalLst && userDraftProposalLst.length && userDraftProposalLst.length > 0 ? userDraftProposalLst.length :0})</div>
                <div class="status-tab status-RFQ-tab" onClick={(e) => { openTab(e, "activeProposals") }}>User Active ({userActiveProposalLst && userActiveProposalLst.length && userActiveProposalLst.length > 0 ? userActiveProposalLst.length:0})</div>
                <div class="status-tab status-RFQ-tab" onClick={(e) => { openTab(e, "proposalInvites") }}>User Invites ({inviteList && inviteList.length && inviteList.length < 0 ? inviteList.length:0})</div>
                <div class="status-tab status-RFQ-tab" onClick={(e) => { openTab(e, "completedProposals") }}>User Completed ({userClosedProposalLst && userClosedProposalLst.length && userClosedProposalLst.length>0?userClosedProposalLst.length:0})</div>
            </div>
            <div class="status-content status-RFQ-content" id="otherActiveProposals">
                <ul class="contract-list">
                    {otherActiveProposalLst && otherActiveProposalLst.length > 0 ? otherActiveProposalLst.map(x =>
                        <li class="contract-item">
                            <div class="contract-icon">
                                <i class="fas fa-file-alt"></i>
                            </div>
                            <div class="contract-details">
                                <div class="contract-title">Proposal id: {x.proposalUID} </div>
                                <div class="contract-meta">
                                    <span><i class="fas fa-user"></i> {x.owner.usrName}</span>
                                    <span><i class="fas fa-calendar"></i> Created on:{x.createdOn} </span>
                                </div>
                            </div>
                            <div class="contract-actions">
                                <button class="contract-btn" title="Apply" onClick={(e) => {
                                    e.preventDefault();
                                    OtherData.setData(JSON.stringify(x));
                                    navigate("/ApplyRFQ");
                                }}>
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="contract-btn" title="Detail" onClick={(e) => {
                                    e.preventDefault();
                                    OtherData.setData(JSON.stringify(x));
                                    navigate("/DetailProposal");
                                }}>
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </li>) : <></>}
                </ul>
            </div>
            <div class="status-content status-RFQ-content active" id="draftProposals">
                <ul class="contract-list">
                    {userDraftProposalLst && userDraftProposalLst.length > 0 ? userDraftProposalLst.map(x => 
                        <li class="contract-item">
                        <div class="contract-icon">
                            <i class="fas fa-file-alt"></i>
                        </div>
                        <div class="contract-details">
                                <div class="contract-title">Proposal id: {x.proposalUID} </div>
                            <div class="contract-meta">
                                    <span><i class="fas fa-user"></i> {x.owner.usrName }</span>
                                    <span><i class="fas fa-calendar"></i> Created on:{x.createdOn} </span>
                            </div>
                        </div>
                            <div class="contract-actions">
                                <button class="contract-btn" title="Edit" onClick={(e) => { editRFQ(e, x); }}>
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="contract-btn" title="Delete">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </li> ):<></>}
                </ul>
            </div>

            <div class="status-content status-RFQ-content" id="activeProposals">
                <ul class="contract-list">
                    {userActiveProposalLst && userActiveProposalLst.length > 0 ? userActiveProposalLst.map(x => 
                        <li class="contract-item">
                            <div class="contract-icon">
                                <i class="fas fa-file-alt"></i>
                            </div>
                            <div class="contract-details">
                                <div class="contract-title">RFQ with Id - {x.proposalUID}</div>
                                <div class="contract-meta">
                                    <span><i class="fas fa-user"></i> {x.owner.usrName}</span>
                                    <span><i class="fas fa-calendar"></i> Created on: {x.createdOn}</span>
                                </div>
                            </div>
                            <div class="contract-actions">
                                <button class="contract-btn" title="Detail" onClick={(e) => {
                                    e.preventDefault();
                                    OtherData.setData(JSON.stringify(x));
                                    navigate("/DetailProposal");
                                }}>
                                    <i class="fas fa-check-square"></i>
                                </button>
                            </div>
                        </li>
                    ) : <></>}
                </ul>
            </div>

            <div class="status-content status-RFQ-content" id="proposalInvites">
                <ul class="contract-list">
                    {inviteList && inviteList.length > 0 ? inviteList.map(x => 
                        <li class="contract-item">
                            <div class="contract-icon">
                                <i class="fas fa-file-alt"></i>
                            </div>
                            <div class="contract-details">
                                <div class="contract-title">Proposal id: {x.proposalUID}</div>
                                <div class="contract-meta">
                                    <span><i class="fas fa-user"></i> {x.owner.usrName}</span>
                                    <span><i class="fas fa-calendar"></i> Created on: {x.createdOn}</span>
                                </div>
                            </div>
                            <div class="contract-actions">
                                <button class="contract-btn" title="Edit">
                                    <i class="fas fa-edit"></i>
                                </button> 
                                <button class="contract-btn" title="Delete">
                                    <i class="fas fa-trash"></i>
                                </button>
                                <button class="contract-btn" title="Apply" onClick={(e) => {
                                    e.preventDefault();
                                    ApplyForInvite(x.id);
                                }}>
                                    <i class="fas fa-check-square"></i>
                                </button>
                            </div>
                        </li>
                    ) : <></>}
                </ul>
            </div>

            <div class="status-content status-RFQ-content" id="completedProposals">
                <ul class="contract-list">
                    {userClosedProposalLst && userClosedProposalLst.length > 0 ? userClosedProposalLst.map(x => 
                        <li class="contract-item">
                            <div class="contract-icon">
                                <i class="fas fa-file-alt"></i>
                            </div>
                            <div class="contract-details">
                                <div class="contract-title">Proposal id: {x.proposalUID}</div>
                                <div class="contract-meta">
                                    <span><i class="fas fa-user"></i> {x.owner.usrName}</span>
                                    <span><i class="fas fa-calendar"></i> Created on: {x.createdOn}</span>
                                </div>
                            </div>
                            <div class="contract-actions">
                                <button class="contract-btn" title="Edit">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="contract-btn" title="Delete">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </li>
                    ) : <></>}
                </ul>
            </div>
        </div>
    </>);
}
export default RFQList;