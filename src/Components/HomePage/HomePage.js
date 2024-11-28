import "./HomePage.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserProfile from "../Context/UserProfile";
import FormButton from "../FormParts/FormButton";
import { getRequest } from "../Services/POContractBackendAPI";
import { useState } from "react";
import PurchaseOrder from "../Context/PurchaseOrder";
import PieChart from "../CommonPages/PieChart";
import DelayMsgs from "../CommonPages/DelayMsgs";


const HomePage = ({ setUserName }) => {
    const navigate = useNavigate();
    const [raisedForLst, setRaisedForList] = useState();
    const [raisedByLst, setRaisedByList] = useState();
    const [delayMsg, setDelayMsg] = useState([]);
    useEffect(() => {
        if (UserProfile.getLoginStatus() !== "1") {
            navigate("/");
        }
        setUserName(UserProfile.getName());
        PurchaseOrder.resetData();
        getRequest("api/POManagerAuth/getClientInfo", UserProfile.getToken()).then(rr => rr.json()).then(resD => {
            console.log(resD);
            setUserName(resD.data.name);
            UserProfile.setUserId(resD.data.id);
            UserProfile.setEmail(resD.data.email);
            UserProfile.setName(resD.data.name);
            UserProfile.setContactNumber(resD.data.phoneNumber);
        }).catch(err => console.log(err));
        getRequest("api/POManagement/GetPOAssociatedWithUser?isRaisedBy=true", UserProfile.getToken()).then(rr => rr.json()).then(res => {
            //console.log(res);
            if (res.status === 0 && res.data.length > 0)
            {
                console.log(res);
                console.log("raised By you is set")
                setRaisedByList(res.data);
                openTab()
            }
        }).catch(err => console.log(err));
        getRequest("api/POManagement/GetPOAssociatedWithUser?isRaisedBy=false", UserProfile.getToken()).then(rr => rr.json()).then(res => {
            //console.log(res);
            if (res.status === 0 && res.data.length > 0) {
                console.log(res);
                console.log("raised for you is set")
                setRaisedForList(res.data);
            }
        }).catch(err => console.log(err));
    }, []);
    const editPurchaseOrder = (e, po) => {
        e.preventDefault();
        PurchaseOrder.setPoId(po.poId);
        PurchaseOrder.setPurchaseOrderEditFlag(1);
        if (po.sellerId.toString() === UserProfile.getUserId()) {
            PurchaseOrder.setRaisedBy("Buyer");
        } else {
            PurchaseOrder.setRaisedBy("Seller");
        }
        
        navigate("/New");

    }

    const copyPurchaseOrder = (e, po) => {
        e.preventDefault();
        getRequest("api/POManagement/CopyPurchaseOrder?poId="+po.poId, UserProfile.getToken()).then(rr => rr.text()).then(res => {
            //console.log(res);
            if (res > 0) {
                PurchaseOrder.setPoId(res);
                PurchaseOrder.setPurchaseOrderEditFlag(1);
                if (po.sellerId.toString() === UserProfile.getUserId()) {
                    PurchaseOrder.setRaisedBy("Buyer");
                } else {
                    PurchaseOrder.setRaisedBy("Seller");
                }
                navigate("/New");
            }
            
        }).catch(err => console.log(err));
    }
    const openTab = (e, id) => {
        e.preventDefault();
        var tabContent = document.getElementsByClassName("tab-content");
        for (var i = 0; i < tabContent.length; i++) {
            tabContent[i].style.display = "none";
            tabContent[i].classList.remove("active");
        }
        var tabButtons = document.getElementsByClassName("tab-button");
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
                    <div className="col-md-6 p-0 m-0" >
                        <FormButton name="Sale Contract" onClick={(e) => {
                            PurchaseOrder.setRaisedBy("Seller");
                            navigate("/New");
                        }} myClass="routingBtn" mystyle={{width:'80%'}} />

                    </div>
                    <div className="col-md-6 p-0 m-0" >
                        <FormButton name="Purchase Contract" onClick={(e) => {
                            PurchaseOrder.setRaisedBy("Buyer");
                            navigate("/New");
                        }} myClass="routingBtn"/>

                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 col-xs-12">
                        <div className="tabs">
                            <div className="tab-buttons">
                                <button className="tab-Hbutton" onClick={(e) => { openTab(e, "DraftAggrements"); }}>Draft</button>
                                <button className="tab-Hbutton" onClick={(e) => { openTab(e, "ActiveAggrements"); }}>Active</button>
                                <button className="tab-Hbutton" onClick={(e) => { openTab(e, "CompletedAggrements"); }}>Finished</button>
                            </div>
                            <div id="DraftAggrements" className="tab-content">
                                <h4>Draft Contracts</h4>
                                <div className="table mr-1">
                                    <div className="d-none d-md-block">
                                        <div className="row tableHeader ">
                                            <div className="col-md-3">
                                                Title
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
                                            <div className="col-md-2">
                                                Last Modified
                                            </div>
                                            <div className="col-md-2" style={{ textAlign: "center" }}>
                                                Action
                                            </div>
                                        </div>
                                    </div>
                                   
                                        {raisedByLst && raisedByLst.length > 0 ? raisedByLst.map(tempPO => <div className="row tablebox">
                                            <div className="col-md-3">
                                                <strong className="d-block d-md-none">Title:</strong>
                                                {tempPO.editLock === true ?
                                                    <img src={"./redlock.png"} width={20} height={20} alt="Contract is locked"
                                                        className="delayIcon" /> :
                                                    <img src={"./greenunlock.png"} width={20} height={20} alt="Contract is unlocked"
                                                        className="delayIcon" />} {tempPO.title}
                                            </div>
                                            <div className="col-md-2">
                                                <strong className="d-block d-md-none">Buyer:</strong>{tempPO.buyerName}<br /><span style={{ fontSize: '10px' }}>{tempPO.buyerPhoneNo}</span>
                                            </div>
                                            <div className="col-md-2">
                                                <strong className="d-block d-md-none">Seller:</strong>{tempPO.sellerName}<br /><span style={{ fontSize: '10px' }}>{tempPO.sellerPhoneNo}</span>
                                            </div>
                                            <div className="col-md-1">
                                                <strong className="d-block d-md-none">Status:</strong><span class="badge bg-secondary text-light">{tempPO.status}</span>
                                            </div>
                                            <div className="col-md-2">
                                                {/* {tempPO.delaysAndWaitingResponse ? tempPO.delaysAndWaitingResponse.map(x => <div style={{ fontSize:'8px' }}>{x}</div>):<></>}*/}
                                                <strong className="d-block d-md-none">Modified on:</strong>{new Date(tempPO.modifiedOn)
                                                    .toLocaleString('en-US')}
                                            </div>
                                            <div className="col-md-2" style={{ textAlign: "center" }} >
                                                <FormButton name="Edit" onClick={(e) => editPurchaseOrder(e, tempPO)} />
                                            </div>
                                        </div>
                                        ) : <div className="row tablebox">No Data present</div>}

                                    </div>
                                
                            </div>
                            <div id="ActiveAggrements" className="tab-content active">
                                <h4>Active Or Waiting Contracts</h4>
                                <div className="table ml-1 ">
                                    <div className="d-none d-md-block">
                                        <div className="row tableHeader">
                                            <div className="col-md-2">
                                                Title
                                            </div>
                                            <div className="col-md-2">
                                                Seller
                                            </div>
                                            <div className="col-md-2">
                                                Buyer
                                            </div>
                                            <div className="col-md-1">
                                                Status
                                            </div>
                                            <div className="col-md-1">
                                                Statements
                                            </div>
                                            <div className="col-md-1">
                                                Completion
                                            </div>
                                            <div className="col-md-1">
                                                Payments
                                            </div>
                                            <div className="col-md-2" style={{ textAlign: "center" }}>
                                                Action
                                            </div>
                                        </div>
                                    </div>
                                    {raisedForLst && raisedForLst.length > 0 ? raisedForLst.map(tempPO => tempPO.status === "Active" || tempPO.status === "Raised" ? < div className = "row tablebox" >
                                        <div className="col-md-2">
                                            <strong className="d-block d-md-none">Title:</strong>{tempPO.title}
                                        </div>
                                        <div className="col-md-2">
                                            <strong className="d-block d-md-none">Buyer:</strong>{tempPO.buyerName}<br /><span style={{ fontSize: '10px' }}>{tempPO.buyerPhoneNo}</span>
                                        </div>
                                        <div className="col-md-2">
                                            <strong className="d-block d-md-none">Seller:</strong>{tempPO.sellerName}<br /><span style={{ fontSize: '10px' }}>{tempPO.sellerPhoneNo}</span>
                                        </div>
                                        <div className="col-md-1">
                                            <strong className="d-block d-md-none">Status:</strong> <span class="badge bg-success text-light">{tempPO.status}</span>
                                        </div>
                                        <div className="col-md-1"><strong className="d-block d-md-none">Statements:</strong>
                                            {tempPO.delaysAndWaitingResponse && tempPO.delaysAndWaitingResponse.length ?
                                                <img src={"./info.png"} width={20} height={20} alt="Alter icon"
                                                    className="delayIcon" 
                                                    onClick={(e) => {
                                                    e.preventDefault();
                                                    console.log("Click is success" + tempPO.delaysAndWaitingResponse.length);
                                                    setDelayMsg(tempPO.delaysAndWaitingResponse);
                                                }} /> : <></>}
                                        </div>
                                        <div className="col-md-1">
                                            <strong className="d-block d-md-none">Work graph:</strong>
                                            <PieChart dataArray={tempPO.workDoneStatus} />
                                        </div>
                                        <div className="col-md-1">
                                            <strong className="d-block d-md-none">Payment graph:</strong>
                                            <PieChart dataArray={tempPO.paymentStatus} />
                                        </div>
                                        <div className="col-md-2" style={{ textAlign: "center" }}>
                                            <div className="row m-0 p-0">
                                                <div className="col-md-6 m-0 p-0" style={{ textAlign: "right" }}>
                                                    <FormButton name="Copy" onClick={(e) => copyPurchaseOrder(e, tempPO)} />
                                                </div>
                                                <div className="col-md-6 m-0 p-0" style={{ textAlign: "left" }}>
                                                    <FormButton name="Respond" onClick={(e) => {
                                                        e.preventDefault();
                                                        console.log("Calling Respond Button");
                                                        PurchaseOrder.setPoId(tempPO.poId);
                                                        navigate("/Details")
                                                    }} />
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
                                                Title
                                            </div>
                                            <div className="col-md-2">
                                                Seller
                                            </div>
                                            <div className="col-md-2">
                                                Buyer
                                            </div>
                                            <div className="col-md-1">
                                                Status
                                            </div>
                                            <div className="col-md-4" style={{ textAlign: "center" }}>
                                                Action
                                            </div>
                                        </div>
                                    </div>
                                    {raisedForLst && raisedForLst.length > 0 ? raisedForLst.map(tempPO => tempPO.status === "Completed" || tempPO.status === "Expired" ?
                                        <div className="row tablebox">
                                            <div className="col-md-3">
                                                <strong className="d-block d-md-none">Title:</strong>
                                            {tempPO.title}
                                        </div>
                                            <div className="col-md-2">
                                                <strong className="d-block d-md-none">Buyer:</strong>
                                            {tempPO.buyerName}<br /><span style={{ fontSize: '10px' }}>{tempPO.buyerPhoneNo}</span>
                                        </div>
                                            <div className="col-md-2">
                                                <strong className="d-block d-md-none">Seller:</strong>
                                            {tempPO.sellerName}<br /><span style={{ fontSize: '10px' }}>{tempPO.sellerPhoneNo}</span>
                                        </div>
                                            <div className="col-md-1">
                                                <strong className="d-block d-md-none">Status:</strong>
                                                <span class="badge bg-secondary text-light">{tempPO.status}</span>
                                            
                                        </div>
                                            <div className="col-md-4" style={{ textAlign: "center" }}>
                                                <div className="row m-0 p-0">
                                                    <div className="col-md-6 m-0 p-0" style={{ textAlign: "right" }}>
                                                        <FormButton name="Copy" onClick={(e) => copyPurchaseOrder(e, tempPO)} />
                                                    </div>
                                                    <div className="col-md-6 m-0 p-0" style={{ textAlign: "left" }}>
                                                        <FormButton name="Detail" onClick={(e) => {
                                                            e.preventDefault();
                                                            console.log("Calling Respond Button");
                                                            PurchaseOrder.setPoId(tempPO.poId);
                                                            navigate("/Details")
                                                        }} />
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
