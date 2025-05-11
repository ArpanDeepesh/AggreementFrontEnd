import { useEffect } from "react";
import UserProfile from "../Context/UserProfile";
import { getRequest } from "../Services/ContrectBackendAPI";
import { useState } from "react";


const RFQList = () => {
    const [userDraftProposalLst, setDraftProposalLst] = useState([]);
    const [userActiveProposalLst, setActiveProposalLst] = useState([]);
    const [userClosedProposalLst, setClosedProposalLst] = useState([]);
    const [inviteList, setInviteList] = useState([]);
    useEffect(() => {
        getRequest("api/Business/GetUserRFQList", UserProfile.getToken()).then(rr => rr.json()).then(res => {
            console.log(res);
            if (res.status === 1 && res.data.length > 0) {
                var draftlst = [];
                var activeLst = [];
                var closedLst = [];
                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].status === "Draft") {
                        draftlst.push(res.data[i]);
                    }
                    else if (res.data[i].status === "Active")
                    {
                        activeLst.push(res.data[i]);
                    } else if (res.data[i].status === "Closed" || res.data[i].status === "Completed" || res.data[i].status === "Expired") {
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
    const openTab = (e, id) => {
        e.preventDefault();
        var tabContent = document.getElementsByClassName("status-content");
        for (var i = 0; i < tabContent.length; i++) {
            /*tabContent[i].style.display = "none";*/
            tabContent[i].classList.remove("active");
        }
        var tabButtons = document.getElementsByClassName("status-tab");
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
                <h3 class="section-title">Contract Status</h3>
                <a href="#" class="view-all">View All</a>
            </div>

            <div class="status-tabs">
                <div class="status-tab active" onClick={(e) => { openTab(e, "draftProposals") }}>Draft ({userDraftProposalLst.length})</div>
                <div class="status-tab" onClick={(e) => { openTab(e, "activeProposals") }}>Active ({userActiveProposalLst.length})</div>
                <div class="status-tab" onClick={(e) => { openTab(e, "proposalInvites") }}>Invites ({inviteList.length})</div>
                <div class="status-tab" onClick={(e) => { openTab(e, "completedProposals") }}>Completed ({userClosedProposalLst.length})</div>
            </div>
            <div class="status-content active" id="draftProposals">
                <ul class="contract-list">
                    {userDraftProposalLst && userDraftProposalLst.length > 0 ? userDraftProposalLst.map(x => {
                        <li class="contract-item">
                        <div class="contract-icon">
                            <i class="fas fa-file-alt"></i>
                        </div>
                        <div class="contract-details">
                                <div class="contract-title">Proposal id: {x.proposalUID} </div>
                            <div class="contract-meta">
                                    <span><i class="fas fa-user"></i> {x.owner.usrName }</span>
                                <span><i class="fas fa-calendar"></i> Created on: </span>
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
                    </li> }):<></>}
                </ul>
            </div>

            <div class="status-content" id="activeProposals">
                <ul class="contract-list">
                    {userActiveProposalLst && userActiveProposalLst.length > 0 ? userActiveProposalLst.map(x => {
                        <li class="contract-item">
                            <div class="contract-icon">
                                <i class="fas fa-file-alt"></i>
                            </div>
                            <div class="contract-details">
                                <div class="contract-title">Consulting Services Agreement</div>
                                <div class="contract-meta">
                                    <span><i class="fas fa-user"></i> John Smith</span>
                                    <span><i class="fas fa-calendar"></i> Created: 2 days ago</span>
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
                    }) : <></>}
                </ul>
            </div>

            <div class="status-content" id="proposalInvites">
                <ul class="contract-list">
                    {inviteList && inviteList.length > 0 ? inviteList.map(x => {
                        <li class="contract-item">
                            <div class="contract-icon">
                                <i class="fas fa-file-alt"></i>
                            </div>
                            <div class="contract-details">
                                <div class="contract-title">Consulting Services Agreement</div>
                                <div class="contract-meta">
                                    <span><i class="fas fa-user"></i> John Smith</span>
                                    <span><i class="fas fa-calendar"></i> Created: 2 days ago</span>
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
                    }) : <></>}
                </ul>
            </div>

            <div class="status-content" id="completedProposals">
                <ul class="contract-list">
                    {userClosedProposalLst && userClosedProposalLst.length > 0 ? userClosedProposalLst.map(x => {
                        <li class="contract-item">
                            <div class="contract-icon">
                                <i class="fas fa-file-alt"></i>
                            </div>
                            <div class="contract-details">
                                <div class="contract-title">Consulting Services Agreement</div>
                                <div class="contract-meta">
                                    <span><i class="fas fa-user"></i> John Smith</span>
                                    <span><i class="fas fa-calendar"></i> Created: 2 days ago</span>
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
                    }) : <></>}
                </ul>
            </div>
        </div>
    </>);
}
export default RFQList;