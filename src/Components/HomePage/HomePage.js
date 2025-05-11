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
import ContractList from "./ContractList";
import RFQList from "./RFQList";


const HomePage = ({ setUserName, setUserType}) => {
    const navigate = useNavigate();
    const [agreementList, setAgreementList] = useState();
    const [displayName, setDisplayName] = useState();
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
        setDisplayName(UserProfile.getName());
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
        <div className="main-content" >
            <div class="headerHome">
                <div class="page-title">
                    <h1>Dashboard</h1>
                    <p>Welcome back, here's what's happening with your contracts today</p>
                </div>
                <div class="user-profile">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User profile" />
                    <div class="user-info">
                        <h4>{displayName}</h4>
                        <p>Premium Plan</p>
                        <a href="/LogOut" style={{ color: "#007bff" }}>Logout</a>
                    </div>
                </div>
            </div>
            <DelayMsgs msgList={delayMsg} setMsgList={setDelayMsg} />
            <div class="quick-actions">
                <div class="action-card" onClick={e => {
                    e.preventDefault();
                    navigate("/SelectTemplate");
                }}>
                    <i class="fas fa-file-contract"></i>
                    <h3>Create Contract</h3>
                    <p>Start a new contract from template</p>
                </div>
                <div class="action-card" onClick={e => {
                    e.preventDefault();
                    OtherData.resetData();
                    navigate("/NewRFQ");
                }}>
                    <i class="fas fa-clipboard-list"></i>
                    <h3>Generate RFQ</h3>
                    <p>Request for quotations</p>
                </div>
                <div class="action-card" onClick={e => {
                    e.preventDefault();
                    navigate("/userTerms");
                }} >
                    <i class="fas fa-file-alt"></i>
                    <h3>User Terms</h3>
                    <p>Create default terms</p>
                </div>
                <div class="action-card"  onClick={e => {
                    e.preventDefault();
                    navigate("/userItems");
                }}>
                    <i class="fas fa-boxes"></i>
                    <h3>Create Catalogue</h3>
                    <p>Build product/service catalog</p>
                </div>
            </div>


            <div class="dashboard-stats">
                <div class="stat-card">
                    <div class="stat-header">
                        <div>
                            <div class="stat-title">Active Contracts</div>
                            <div class="stat-value">24</div>
                        </div>
                        <div class="stat-change up">
                            <i class="fas fa-arrow-up"></i>
                            <span>12%</span>
                        </div>
                    </div>
                    <div class="stat-chart">
                        <div class="chart-placeholder">Chart: Active Contracts</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-header">
                        <div>
                            <div class="stat-title">Pending Signatures</div>
                            <div class="stat-value">8</div>
                        </div>
                        <div class="stat-change down">
                            <i class="fas fa-arrow-down"></i>
                            <span>5%</span>
                        </div>
                    </div>
                    <div class="stat-chart">
                        <div class="chart-placeholder">Chart: Pending Signatures</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-header">
                        <div>
                            <div class="stat-title">Upcoming Renewals</div>
                            <div class="stat-value">5</div>
                        </div>
                        <div class="stat-change up">
                            <i class="fas fa-arrow-up"></i>
                            <span>3%</span>
                        </div>
                    </div>
                    <div class="stat-chart">
                        <div class="chart-placeholder">Chart: Upcoming Renewals</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-header">
                        <div>
                            <div class="stat-title">Contract Value</div>
                            <div class="stat-value">¥1.2M</div>
                        </div>
                        <div class="stat-change up">
                            <i class="fas fa-arrow-up"></i>
                            <span>18%</span>
                        </div>
                    </div>
                    <div class="stat-chart">
                        <div class="chart-placeholder">Chart: Contract Value</div>
                    </div>
                </div>
            </div>


            <div class="financial-overview">
                <div class="chart-container">
                    <div class="chart-header">
                        <h3 class="section-title">Contract Value Trend</h3>
                        <div class="chart-actions">
                            <button class="chart-btn active">Monthly</button>
                            <button class="chart-btn">Quarterly</button>
                            <button class="chart-btn">Yearly</button>
                        </div>
                    </div>
                    <div class="chart-placeholder">Contract Value Trend Chart</div>
                </div>
                <div class="top-contracts">
                    <div class="chart-header">
                        <h3 class="section-title">Top Contracts</h3>
                        <a href="#" class="view-all">View All</a>
                    </div>
                    <div class="contract-rank">
                        <div class="rank-number top">1</div>
                        <div class="rank-details">
                            <div class="rank-title">Office Lease Agreement</div>
                            <div class="rank-value">¥320,000</div>
                        </div>
                    </div>
                    <div class="contract-rank">
                        <div class="rank-number top">2</div>
                        <div class="rank-details">
                            <div class="rank-title">IT Services Contract</div>
                            <div class="rank-value">¥280,000</div>
                        </div>
                    </div>
                    <div class="contract-rank">
                        <div class="rank-number top">3</div>
                        <div class="rank-details">
                            <div class="rank-title">Marketing Agency</div>
                            <div class="rank-value">¥195,000</div>
                        </div>
                    </div>
                    <div class="contract-rank">
                        <div class="rank-number">4</div>
                        <div class="rank-details">
                            <div class="rank-title">Consulting Services</div>
                            <div class="rank-value">¥150,000</div>
                        </div>
                    </div>
                    <div class="contract-rank">
                        <div class="rank-number">5</div>
                        <div class="rank-details">
                            <div class="rank-title">Equipment Rental</div>
                            <div class="rank-value">¥85,000</div>
                        </div>
                    </div>
                </div>
            </div>
            <RFQList/>

            <ContractList/>
            


            <div class="status-overview">
                <div class="section-header">
                    <h3 class="section-title">RFQ Status</h3>
                    <a href="#" class="view-all">View All</a>
                </div>

                <div class="status-tabs">
                    <div class="status-tab active" data-tab="rfq-draft">Draft (2)</div>
                    <div class="status-tab" data-tab="rfq-active">Active (4)</div>
                    <div class="status-tab" data-tab="rfq-invites">Invites (12)</div>
                    <div class="status-tab" data-tab="rfq-completed">Completed (5)</div>
                </div>

                <div class="status-content active" id="rfq-draft">
                    <ul class="contract-list">
                        <li class="contract-item">
                            <div class="contract-icon">
                                <i class="fas fa-clipboard-list"></i>
                            </div>
                            <div class="contract-details">
                                <div class="contract-title">Office Furniture RFQ</div>
                                <div class="contract-meta">
                                    <span><i class="fas fa-user"></i> John Smith</span>
                                    <span><i class="fas fa-calendar"></i> Created: 1 day ago</span>
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
                        <li class="contract-item">
                            <div class="contract-icon">
                                <i class="fas fa-clipboard-list"></i>
                            </div>
                            <div class="contract-details">
                                <div class="contract-title">IT Equipment RFQ</div>
                                <div class="contract-meta">
                                    <span><i class="fas fa-user"></i> Michael Chen</span>
                                    <span><i class="fas fa-calendar"></i> Created: 3 days ago</span>
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
                    </ul>
                </div>

                <div class="status-content" id="rfq-active">
                </div>

                <div class="status-content" id="rfq-invites">
                </div>

                <div class="status-content" id="rfq-completed">
                </div>
            </div>

        </div>
	);
};

export default HomePage;
