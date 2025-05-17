import { useEffect } from "react";
import UserProfile from "../Context/UserProfile";
import { getRequest } from "../Services/ContrectBackendAPI";
import { useState } from "react";
import OtherData from "../Context/OtherData";
import { useNavigate } from "react-router-dom";


const ContractList = () => {
    const [userDraftContractLst, setDraftContractLst] = useState([]);
    const [userActiveContractLst, setActiveContractLst] = useState([]);
    const [userProposedContractLst, setProposedContractLst] = useState([]);
    const [userClosedContractLst, setClosedContractLst] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getRequest("api/Business/GetUserAgreements", UserProfile.getToken()).then(rr => rr.json()).then(res => {
            console.log(res);
            if (res.status === 1 && res.data.length > 0) {
                var draftlst = [];
                var proposedLst = [];
                var activeLst = [];
                var closedLst = [];
                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].status === "Draft") {
                        draftlst.push(res.data[i]);
                    }
                    else if (res.data[i].status === "Active") {
                        activeLst.push(res.data[i]);
                    } else if (res.data[i].status === "Closed" || res.data[i].status === "Expired" || res.data[i].status === "Completed") {
                        closedLst.push(res.data[i]);
                    } else if (res.data[i].status === "Proposed") {
                        proposedLst.push(res.data[i]);
                    }
                }
                setDraftContractLst(draftlst);
                setActiveContractLst(activeLst);
                setProposedContractLst(proposedLst);
                setClosedContractLst(closedLst);
            }
        }).catch(err => console.log(err));
    }, []);
    
    const editAgreement = (e, agrmnt) => {
        e.preventDefault();
        OtherData.setData(JSON.stringify(agrmnt));
        if (agrmnt.proposalId > 0) {
            navigate("/draftAgreement");
        } else {
            navigate("/draftD2C");
        }

    }
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
                {/*<a href="#" class="view-all">View All</a>*/}
            </div>

            <div class="status-tabs">
                <div class="status-tab active" onClick={(e) => { openTab(e,"draftContracts") }} >Draft ({userDraftContractLst.length})</div>
                <div class="status-tab" onClick={(e) => { openTab(e, "proposedContracts") }}>Proposed ({userProposedContractLst.length})</div>
                <div class="status-tab"  onClick={(e) => { openTab(e, "activeContracts") }}>Active ({userActiveContractLst.length})</div>
                <div class="status-tab"  onClick={(e) => { openTab(e, "expiredContracts") }}>Expired ({userClosedContractLst.length})</div>
            </div>

            <div class="status-content active" id="draftContracts">
                <ul class="contract-list">
                    {
                        userDraftContractLst && userDraftContractLst.length > 0 ? userDraftContractLst.map(x => <li class="contract-item">
                            <div class="contract-icon">
                                <i class="fas fa-file-alt"></i>
                            </div>
                            <div class="contract-details">
                                <div class="contract-title">Contract ({x.contractType}) of id- {x.agreementUID} counter party {x.creator.usrId === x.buyer.usrId ? x.seller.usrName : x.buyer.usrName}</div>
                                <div class="contract-meta">
                                    <span><i class="fas fa-user"></i>{x.creator.usrName}</span>
                                    <span><i class="fas fa-calendar"></i> Created on: {x.createdOn}</span>
                                </div>
                            </div>
                            <div class="contract-actions">
                                <button class="contract-btn" title="Edit" onClick={(e) => { editAgreement(e, x); }}>
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="contract-btn" title="Delete" onClick={(e) => { editAgreement(e, x); }}>
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </li>) : <></>
                    }
                   
                </ul>
            </div>

            <div class="status-content" id="proposedContracts">
                <ul class="contract-list">
                    {
                        userProposedContractLst && userProposedContractLst.length > 0 ? userProposedContractLst.map(x => <li class="contract-item">
                            <div class="contract-icon">
                                <i class="fas fa-file-alt"></i>
                            </div>
                            <div class="contract-details">
                                <div class="contract-title">Contract ({x.contractType}) of id- {x.agreementUID} counter party {x.creator.usrId === x.buyer.usrId ? x.seller.usrName : x.buyer.usrName}</div>
                                <div class="contract-meta">
                                    <span><i class="fas fa-user"></i>{x.creator.usrName}</span>
                                    <span><i class="fas fa-calendar"></i> Created on: {x.createdOn}</span>
                                </div>
                            </div>
                            <div class="contract-actions">
                                <button class="contract-btn" title="Edit" onClick={(e) => { editAgreement(e, x); }}>
                                    <i class="fas fa-info-circle"></i>
                                </button>
                                <button class="contract-btn" title="Delete" onClick={(e) => { editAgreement(e, x); }}>
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </li>) : <></>
                    }

                </ul>
            </div>

            <div class="status-content" id="activeContracts">
                <ul class="contract-list">
                    {
                        userActiveContractLst && userActiveContractLst.length > 0 ? userActiveContractLst.map(x => <li class="contract-item">
                            <div class="contract-icon">
                                <i class="fas fa-file-alt"></i>
                            </div>
                            <div class="contract-details">
                                <div class="contract-title">Contract ({x.contractType}) of id- {x.agreementUID} counter party {x.creator.usrId === x.buyer.usrId ? x.seller.usrName : x.buyer.usrName}</div>
                                <div class="contract-meta">
                                    <span><i class="fas fa-user"></i>{x.creator.usrName}</span>
                                    <span><i class="fas fa-calendar"></i> Created on: {x.createdOn}</span>
                                </div>
                            </div>
                            <div class="contract-actions">
                                <button class="contract-btn" title="Edit" onClick={(e) => { editAgreement(e, x); }}>
                                    <i class="fas fa-info-circle"></i>
                                </button>
                                <button class="contract-btn" title="Delete" onClick={(e) => { editAgreement(e, x); }}>
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </li>) : <></>
                    }

                </ul>
            </div>

            <div class="status-content" id="expiredContracts">
                <ul class="contract-list">
                    {
                        userClosedContractLst && userClosedContractLst.length > 0 ? userClosedContractLst.map(x => <li class="contract-item">
                            <div class="contract-icon">
                                <i class="fas fa-file-alt"></i>
                            </div>
                            <div class="contract-details">
                                <div class="contract-title">Contract ({x.contractType}) of id- {x.agreementUID} counter party {x.creator.usrId === x.buyer.usrId ? x.seller.usrName : x.buyer.usrName}</div>
                                <div class="contract-meta">
                                    <span><i class="fas fa-user"></i>{x.creator.usrName}</span>
                                    <span><i class="fas fa-calendar"></i> Created on: {x.createdOn}</span>
                                </div>
                            </div>
                            <div class="contract-actions">
                                <button class="contract-btn" title="Detail View" onClick={(e) => { editAgreement(e, x); }}>
                                    <i class="fas fa-info-circle"></i>
                                </button>
                                <button class="contract-btn" title="Delete" onClick={(e) => { editAgreement(e, x); }}>
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </li>) : <></>
                    }

                </ul>
            </div>
        </div>
    </>);
}
export default ContractList;