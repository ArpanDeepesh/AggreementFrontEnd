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
                    } else if (res.data[i].status === "Closed" || res.data[i].status === "Expired"
                        || res.data[i].status === "Completed" || res.data[i].status === "Rejected") {
                        closedLst.push(res.data[i]);
                    } else if (res.data[i].status === "Proposed"
                        || res.data[i].status === "Waiting for Seller"
                        || res.data[i].status === "Waiting for Buyer"
                        || res.data[i].status === "Accepted") {
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
    const deleteAgreement = (e, agrmnt) =>
    {
        alert("Not able to delete right now. try again after some time");
    }
    const detailAgreement = (e, agrmnt) =>
    {
        e.preventDefault();
        OtherData.setData(JSON.stringify(agrmnt));
        navigate("/DetailAgreement");
    }
    const detailContract = (e, agrmnt) =>
    {
        e.preventDefault();
        OtherData.setData(JSON.stringify(agrmnt));
        navigate("/DetailContract");
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
        <div className="status-overview">
            <div className="section-header">
                <h3 className="section-title">Contract Status</h3>
                {/*<a href="#" className="view-all">View All</a>*/}
            </div>

            <div className="status-tabs">
                <div className="status-tab active" onClick={(e) => { openTab(e,"draftContracts") }} >Draft ({userDraftContractLst.length})</div>
                <div className="status-tab" onClick={(e) => { openTab(e, "proposedContracts") }}>Proposed ({userProposedContractLst.length})</div>
                <div className="status-tab"  onClick={(e) => { openTab(e, "activeContracts") }}>Active ({userActiveContractLst.length})</div>
                <div className="status-tab"  onClick={(e) => { openTab(e, "expiredContracts") }}>Expired ({userClosedContractLst.length})</div>
            </div>

            <div className="status-content active" id="draftContracts">
                <ul className="contract-list">
                    {
                        userDraftContractLst && userDraftContractLst.length > 0 ? userDraftContractLst.map(x => <li className="contract-item">
                            <div className="contract-icon">
                                <i className="fas fa-file-alt"></i>
                            </div>
                            <div className="contract-details">
                                <div className="contract-title">Contract ({x.contractType}) of id- {x.agreementUID} counter party {x.creator.usrId === x.buyer.usrId ? x.seller.usrName : x.buyer.usrName}</div>
                                <div className="contract-meta">
                                    <span><i className="fas fa-user"></i>{x.creator.usrName}</span>
                                    <span><i className="fas fa-calendar"></i> Created on: {x.createdOn}</span>
                                </div>
                            </div>
                            <div className="contract-actions">
                                <button className="contract-btn" title="Edit" onClick={(e) => { editAgreement(e, x); }}>
                                    <i className="fas fa-edit"></i>
                                </button>
                                <button className="contract-btn" title="Delete" onClick={(e) => { deleteAgreement(e, x); }}>
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        </li>) : <></>
                    }
                   
                </ul>
            </div>

            <div className="status-content" id="proposedContracts">
                <ul className="contract-list">
                    {
                        userProposedContractLst && userProposedContractLst.length > 0 ? userProposedContractLst.map(x => <li className="contract-item">
                            <div className="contract-icon">
                                <i className="fas fa-file-alt"></i>
                            </div>
                            <div className="contract-details">
                                <div className="contract-title">Contract ({x.contractType}) of id- {x.agreementUID} counter party {x.creator.usrId === x.buyer.usrId ? x.seller.usrName : x.buyer.usrName}</div>
                                <div className="contract-meta">
                                    <span><i className="fas fa-user"></i>{x.creator.usrName}</span>
                                    <span><i className="fas fa-calendar"></i> Created on: {x.createdOn}</span>
                                </div>
                            </div>
                            <div className="contract-actions">
                                <button className="contract-btn" title="Edit" onClick={(e) => { detailAgreement(e, x); }}>
                                    <i className="fas fa-info-circle"></i>
                                </button>
                            </div>
                        </li>) : <></>
                    }

                </ul>
            </div>

            <div className="status-content" id="activeContracts">
                <ul className="contract-list">
                    {
                        userActiveContractLst && userActiveContractLst.length > 0 ? userActiveContractLst.map(x => <li className="contract-item">
                            <div className="contract-icon">
                                <i className="fas fa-file-alt"></i>
                            </div>
                            <div className="contract-details">
                                <div className="contract-title">Contract ({x.contractType}) of id- {x.agreementUID} counter party {x.creator.usrId === x.buyer.usrId ? x.seller.usrName : x.buyer.usrName}</div>
                                <div className="contract-meta">
                                    <span><i className="fas fa-user"></i>{x.creator.usrName}</span>
                                    <span><i className="fas fa-calendar"></i> Created on: {x.createdOn}</span>
                                </div>
                            </div>
                            <div className="contract-actions">
                                <button className="contract-btn" title="Details" onClick={(e) => { detailContract(e, x); }}>
                                    <i className="fas fa-info-circle"></i>
                                </button>
                            </div>
                        </li>) : <></>
                    }

                </ul>
            </div>

            <div className="status-content" id="expiredContracts">
                <ul className="contract-list">
                    {
                        userClosedContractLst && userClosedContractLst.length > 0 ? userClosedContractLst.map(x => <li className="contract-item">
                            <div className="contract-icon">
                                <i className="fas fa-file-alt"></i>
                            </div>
                            <div className="contract-details">
                                <div className="contract-title">Contract ({x.contractType}) of id- {x.agreementUID} counter party {x.creator.usrId === x.buyer.usrId ? x.seller.usrName : x.buyer.usrName}</div>
                                <div className="contract-meta">
                                    <span><i className="fas fa-user"></i>{x.creator.usrName}</span>
                                    <span><i className="fas fa-calendar"></i> Created on: {x.createdOn}</span>
                                </div>
                            </div>
                            <div className="contract-actions">
                                <button className="contract-btn" title="Detail View" onClick={(e) => { detailAgreement(e, x); }}>
                                    <i className="fas fa-info-circle"></i>
                                </button>
                                <button className="contract-btn" title="Delete" onClick={(e) => { deleteAgreement(e, x); }}>
                                    <i className="fas fa-trash"></i>
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