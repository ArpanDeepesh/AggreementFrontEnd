import { useEffect } from "react";
import UserProfile from "../Context/UserProfile";
import { getRequest } from "../Services/ContrectBackendAPI";
import { useState } from "react";
import ClientPorgress from "../CommonPages/ClientPorgress";
import CashFlowProgress from "../CommonPages/CashFlowProgress";
import OtherData from "../Context/OtherData";
import { useNavigate } from "react-router-dom";



const Analytics = () => {
    const [clientReport, setClientReport] = useState();
    const [attensionRequired, setAttensionRequired] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        loadClientReport();
        loadAgreementList();
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
                    if (data[j].id === resAt.data[i]) {
                        requiredAttension.push(data[j]);
                        break;
                    }
                }
            }
            setAttensionRequired(requiredAttension);
        }).catch(err => console.log(err));
    }
    const loadAgreementList = () => {
        getRequest("api/Business/GetUserAgreements", UserProfile.getToken()).then(x => x.json()).then(res => {
            console.log(res);
            loadAttensionRequired(res.data);
        }).catch(err => console.log(err));
    }
    return (<>

        <div className="dashboard-stats">
            <div className="stat-card">
                <div className="stat-header">
                    <div>
                        <div className="stat-title">Active Contracts</div>
                        <div className="stat-value">24</div>
                    </div>
                    <div className="stat-change up">
                        <i className="fas fa-arrow-up"></i>
                        <span>12%</span>
                    </div>
                </div>
                <div className="stat-chart">
                    <div className="chart-placeholder">
                        {clientReport ? <>
                            <ClientPorgress totalValue={clientReport.totalSellerContractAmount}
                                invoiceRaised={clientReport.totalSellerInvoiceAmount}
                                invoiceCleared={clientReport.totalSellerInvoiceAmountCleared}
                                cashOutflow={clientReport.totalCashIn} />
                        </> : <>Loading data..</>}
                    </div>
                </div>
            </div>
            <div className="stat-card">
                <div className="stat-header">
                    <div>
                        <div className="stat-title">Pending Signatures</div>
                        <div className="stat-value">8</div>
                    </div>
                    <div className="stat-change down">
                        <i className="fas fa-arrow-down"></i>
                        <span>5%</span>
                    </div>
                </div>
                <div className="stat-chart">
                    <div className="chart-placeholder">
                        {clientReport ? <>
                            <ClientPorgress totalValue={clientReport.totalBuyerContractAmount}
                                invoiceRaised={clientReport.totalBuyerInvoiceAmount}
                                invoiceCleared={clientReport.totalBuyerInvoiceAmountCleared}
                                cashOutflow={clientReport.totalCashOut} />
                        </> : <>Loading data..</>}
                    </div>
                </div>
            </div>
            <div className="stat-card">
                <div className="stat-header">
                    <div>
                        <div className="stat-title">Upcoming Renewals</div>
                        <div className="stat-value">5</div>
                    </div>
                    <div className="stat-change up">
                        <i className="fas fa-arrow-up"></i>
                        <span>3%</span>
                    </div>
                </div>
                <div className="stat-chart">
                    <div className="chart-placeholder">
                        {clientReport ? <>
                            <CashFlowProgress cashIn={clientReport.totalCashIn} cashOut={clientReport.totalCashOut} />
                        </> : <>Loading data..</>}
                    </div>
                </div>
            </div>
            <div className="stat-card">
                <div className="stat-header">
                    <div>
                        <div className="stat-title">Contract Value</div>
                        <div className="stat-value">¥1.2M</div>
                    </div>
                    <div className="stat-change up">
                        <i className="fas fa-arrow-up"></i>
                        <span>18%</span>
                    </div>
                </div>
                <div className="stat-chart">
                    <div className="chart-placeholder">{attensionRequired && attensionRequired.length > 0 ? <>
                        <ul>
                            {attensionRequired.map(x => <li>
                                (Buyer){x.buyer.usrName} and (Seller) {x.seller.usrName} agreement required your attention <span className="clickableLink" onClick={(e) => {
                                    e.preventDefault();
                                    OtherData.setData(JSON.stringify(x));
                                    navigate("/DetailContract")
                                }}>click here to see the agreement.</span>
                            </li>)}
                        </ul>

                    </> : <>No urgent action</>}</div>
                </div>
            </div>
        </div>


        <div className="financial-overview">
            <div className="chart-container">
                <div className="chart-header">
                    <h3 className="section-title">Contract Value Trend</h3>
                    <div className="chart-actions">
                        <button className="chart-btn active">Monthly</button>
                        <button className="chart-btn">Quarterly</button>
                        <button className="chart-btn">Yearly</button>
                    </div>
                </div>
                <div className="chart-placeholder">Contract Value Trend Chart</div>
            </div>
            <div className="top-contracts">
                <div className="chart-header">
                    <h3 className="section-title">Top Contracts</h3>
                   {/* <a href="/" className="view-all">View All</a>*/}
                </div>
                <div className="contract-rank">
                    <div className="rank-number top">1</div>
                    <div className="rank-details">
                        <div className="rank-title">Office Lease Agreement</div>
                        <div className="rank-value">¥320,000</div>
                    </div>
                </div>
                <div className="contract-rank">
                    <div className="rank-number top">2</div>
                    <div className="rank-details">
                        <div className="rank-title">IT Services Contract</div>
                        <div className="rank-value">¥280,000</div>
                    </div>
                </div>
                <div className="contract-rank">
                    <div className="rank-number top">3</div>
                    <div className="rank-details">
                        <div className="rank-title">Marketing Agency</div>
                        <div className="rank-value">¥195,000</div>
                    </div>
                </div>
                <div className="contract-rank">
                    <div className="rank-number">4</div>
                    <div className="rank-details">
                        <div className="rank-title">Consulting Services</div>
                        <div className="rank-value">¥150,000</div>
                    </div>
                </div>
                <div className="contract-rank">
                    <div className="rank-number">5</div>
                    <div className="rank-details">
                        <div className="rank-title">Equipment Rental</div>
                        <div className="rank-value">¥85,000</div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}
export default Analytics;