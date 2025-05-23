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
                    } else if (res.data[i].proposalStatus === "Closed"
                        || res.data[i].proposalStatus === "Completed"
                        || res.data[i].proposalStatus === "Expired") {
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
        <div className="status-overview">
            <div className="section-header">
                <h3 className="section-title">RFQ List</h3>
                {/*<a href="#" className="view-all">View All</a>*/}
            </div>

            <div className="status-tabs">
                <div className="status-tab status-RFQ-tab " onClick={(e) => { openTab(e, "otherActiveProposals") }}>Others Active({otherActiveProposalLst && otherActiveProposalLst.length && otherActiveProposalLst.length > 0 ? otherActiveProposalLst.length : 0})</div>
                <div className="status-tab status-RFQ-tab active" onClick={(e) => { openTab(e, "draftProposals") }}>User Draft ({userDraftProposalLst && userDraftProposalLst.length && userDraftProposalLst.length > 0 ? userDraftProposalLst.length :0})</div>
                <div className="status-tab status-RFQ-tab" onClick={(e) => { openTab(e, "activeProposals") }}>User Active ({userActiveProposalLst && userActiveProposalLst.length && userActiveProposalLst.length > 0 ? userActiveProposalLst.length:0})</div>
                <div className="status-tab status-RFQ-tab" onClick={(e) => { openTab(e, "proposalInvites") }}>User Invites ({inviteList && inviteList.length && inviteList.length > 0 ? inviteList.length:0})</div>
                <div className="status-tab status-RFQ-tab" onClick={(e) => { openTab(e, "completedProposals") }}>User Completed ({userClosedProposalLst && userClosedProposalLst.length && userClosedProposalLst.length>0?userClosedProposalLst.length:0})</div>
            </div>
            <div className="status-content status-RFQ-content" id="otherActiveProposals">
                <ul className="contract-list">
                    {otherActiveProposalLst && otherActiveProposalLst.length > 0 ? otherActiveProposalLst.map(x =>
                        <li className="contract-item">
                            <div className="contract-icon">
                                <i className="fas fa-file-alt"></i>
                            </div>
                            <div className="contract-details">
                                <div className="contract-title">Proposal id: {x.proposalUID} </div>
                                <div className="contract-meta">
                                    <span><i className="fas fa-user"></i> {x.owner.usrName}</span>
                                    <span><i className="fas fa-calendar"></i> Created on:{x.createdOn} </span>
                                </div>
                            </div>
                            <div className="contract-actions">
                                <button className="contract-btn" title="Apply" onClick={(e) => {
                                    e.preventDefault();
                                    OtherData.setData(JSON.stringify(x));
                                    navigate("/ApplyRFQ");
                                }}>
                                    <i className="fas fa-edit"></i>
                                </button>
                                <button className="contract-btn" title="Detail" onClick={(e) => {
                                    e.preventDefault();
                                    OtherData.setData(JSON.stringify(x));
                                    navigate("/DetailProposal");
                                }}>
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        </li>) : <></>}
                </ul>
            </div>
            <div className="status-content status-RFQ-content active" id="draftProposals">
                <ul className="contract-list">
                    {userDraftProposalLst && userDraftProposalLst.length > 0 ? userDraftProposalLst.map(x => 
                        <li className="contract-item">
                            <div className="contract-icon">
                                <i className="fas fa-file-alt"></i>
                        </div>
                            <div className="contract-details">
                                <div className="contract-title">Proposal id: {x.proposalUID} </div>
                            <div className="contract-meta">
                                    <span><i className="fas fa-user"></i> {x.owner.usrName }</span>
                                    <span><i className="fas fa-calendar"></i> Created on:{x.createdOn} </span>
                            </div>
                        </div>
                            <div className="contract-actions">
                                <button className="contract-btn" title="Edit" onClick={(e) => { editRFQ(e, x); }}>
                                    <i className="fas fa-edit"></i>
                            </button>
                                <button className="contract-btn" title="Delete">
                                    <i className="fas fa-trash"></i>
                            </button>
                        </div>
                    </li> ):<></>}
                </ul>
            </div>

            <div className="status-content status-RFQ-content" id="activeProposals">
                <ul className="contract-list">
                    {userActiveProposalLst && userActiveProposalLst.length > 0 ? userActiveProposalLst.map(x => 
                        <li className="contract-item">
                            <div className="contract-icon">
                                <i className="fas fa-file-alt"></i>
                            </div>
                            <div className="contract-details">
                                <div className="contract-title">RFQ with Id - {x.proposalUID}</div>
                                <div className="contract-meta">
                                    <span><i className="fas fa-user"></i> {x.owner.usrName}</span>
                                    <span><i className="fas fa-calendar"></i> Created on: {x.createdOn}</span>
                                </div>
                            </div>
                            <div className="contract-actions">
                                <button className="contract-btn" title="Detail" onClick={(e) => {
                                    e.preventDefault();
                                    OtherData.setData(JSON.stringify(x));
                                    navigate("/DetailProposal");
                                }}>
                                    <i className="fas fa-check-square"></i>
                                </button>
                            </div>
                        </li>
                    ) : <></>}
                </ul>
            </div>

            <div className="status-content status-RFQ-content" id="proposalInvites">
                <ul className="contract-list">
                    {inviteList && inviteList.length > 0 ? inviteList.map(x => 
                        <li className="contract-item">
                            <div className="contract-icon">
                                <i className="fas fa-file-alt"></i>
                            </div>
                            <div className="contract-details">
                                <div className="contract-title">Invite id: {x.inviteUID}</div>
                                <div className="contract-meta">
                                    <span><i className="fas fa-user"></i> {x.raisedByUser.usrName}</span>
                                    {/*<span><i className="fas fa-calendar"></i> Created on: {x.createdOn}</span>*/}
                                </div>
                            </div>
                            <div className="contract-actions">
                                <button className="contract-btn" title="Edit">
                                    <i className="fas fa-edit"></i>
                                </button> 
                                <button className="contract-btn" title="Delete">
                                    <i className="fas fa-trash"></i>
                                </button>
                                <button className="contract-btn" title="Apply" onClick={(e) => {
                                    e.preventDefault();
                                    ApplyForInvite(x.id);
                                }}>
                                    <i className="fas fa-check-square"></i>
                                </button>
                            </div>
                        </li>
                    ) : <></>}
                </ul>
            </div>

            <div className="status-content status-RFQ-content" id="completedProposals">
                <ul className="contract-list">
                    {userClosedProposalLst && userClosedProposalLst.length > 0 ? userClosedProposalLst.map(x => 
                        <li className="contract-item">
                            <div className="contract-icon">
                                <i className="fas fa-file-alt"></i>
                            </div>
                            <div className="contract-details">
                                <div className="contract-title">Proposal id: {x.proposalUID}</div>
                                <div className="contract-meta">
                                    <span><i className="fas fa-user"></i> {x.owner.usrName}</span>
                                    <span><i className="fas fa-calendar"></i> Created on: {x.createdOn}</span>
                                </div>
                            </div>
                            <div className="contract-actions">
                                <button className="contract-btn" title="Edit">
                                    <i className="fas fa-edit"></i>
                                </button>
                                <button className="contract-btn" title="Delete">
                                    <i className="fas fa-trash"></i>
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