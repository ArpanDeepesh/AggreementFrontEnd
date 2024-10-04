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
    const editPurchaseOrder = (e, id) => {
        e.preventDefault();
        PurchaseOrder.setPoId(id);
        PurchaseOrder.setPurchaseOrderEditFlag(1);
        navigate("/New");

    }

    const copyPurchaseOrder = (e, id) => {
        e.preventDefault();
        getRequest("api/POManagement/CopyPurchaseOrder?poId="+id, UserProfile.getToken()).then(rr => rr.text()).then(res => {
            //console.log(res);
            if (res > 0) {
                PurchaseOrder.setPoId(res);
                PurchaseOrder.setPurchaseOrderEditFlag(1);
                navigate("/New");
            }
            
        }).catch(err => console.log(err));
    }

    return (
        <div className="d-flex h-100" style={{ overflowY: "scroll" }}>
            <DelayMsgs msgList={delayMsg} setMsgList={setDelayMsg} />
            <div className="mt-1" >
                <div className="row mb-1">
                    <div className="col-md-6 p-0 m-0" >
                        <FormButton name="Sale Contract" onClick={(e) => {
                            PurchaseOrder.setRaisedBy("Seller");
                            navigate("/New");
                        }} myClass="routingBtn"/>

                    </div>
                    <div className="col-md-6 p-0 m-0" >
                        <FormButton name="Purchase Contract" onClick={(e) => {
                            PurchaseOrder.setRaisedBy("Buyer");
                            navigate("/New");
                        }} myClass="routingBtn"/>

                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3 p-0 m-0" >
                        <div className="bg-success" style={{ color: "white", margin: '1px', fontSize: '12px' }}>
                            Completed
                        </div>
                        
                    </div>
                    <div className="col-md-3 p-0 m-0" >
                        <div className="bg-primary" style={{ color: "white", margin: '1px', fontSize: '12px' }}>
                            Active
                        </div>
                        
                    </div>
                    <div className="col-md-3 p-0 m-0" >
                        <div className="bg-info" style={{ color: "white", margin: '1px', fontSize: '12px' }}>
                            Claimed
                        </div>
                        
                    </div>
                    <div className="col-md-3 p-0 m-0" >
                        <div className="bg-danger" style={{ color: "white", margin: '1px', fontSize: '12px' }}>
                            Waiting
                        </div>
                        
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 col-xs-12">
                        <h4>Draft Contracts</h4>
                        <div className="table mr-1">
                            <div className="row tableHeader">
                                <div className="col-md-2">
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
                                <div className="col-md-3">
                                    Action
                                </div>
                            </div>
                            {raisedByLst && raisedByLst.length > 0 ? raisedByLst.map(tempPO => <div className="row tablebox">
                                    <div className="col-md-2">
                                    {tempPO.editLock === true ?
                                        <img src={"./redlock.png"} width={20} height={20} alt="Contract is locked"
                                        className="delayIcon" /> :
                                        <img src={"./greenunlock.png"} width={20} height={20} alt="Contract is unlocked"
                                            className="delayIcon"/>} {tempPO.title}
                                    </div>
                                <div className="col-md-2">
                                    {tempPO.buyerName}<br /><span style={{ fontSize: '10px' }}>{tempPO.buyerPhoneNo}</span>
                                </div>
                                <div className="col-md-2">
                                    {tempPO.sellerName}<br /><span style={{ fontSize: '10px' }}>{tempPO.sellerPhoneNo}</span>
                                </div>
                                    <div className="col-md-1">
                                    {tempPO.status}
                                    </div>
                                <div className="col-md-2">
                                    {/* {tempPO.delaysAndWaitingResponse ? tempPO.delaysAndWaitingResponse.map(x => <div style={{ fontSize:'8px' }}>{x}</div>):<></>}*/}
                                    {tempPO.modifiedOn}
                                    </div>
                                <div className="col-md-3">
                                    {tempPO.status === "Draft" ? <FormButton name="Edit" onClick={(e) => editPurchaseOrder(e, tempPO.poId)} /> :
                                        <> <FormButton name="Copy" onClick={(e) => copyPurchaseOrder(e, tempPO.poId)} />
                                            <FormButton name="Details" onClick={(e) => {
                                                e.preventDefault();
                                                console.log("Calling Respond Button");
                                                PurchaseOrder.setPoId(tempPO.poId);
                                                navigate("/Details");
                                            }} />
                                    </>}
                                    
                                    </div>
                                </div>
                            ) : <div className="row tablebox">No Data present</div>}
                            
                        </div>
                        
                    </div>
                    <div className="col-md-12 col-xs-12">
                        <h4>Other Contracts</h4>
                        <div className="table ml-1 ">
                            <div className="row tableHeader">
                                <div className="col-md-1">
                                    Title
                                </div>
                                <div className="col-md-1">
                                    Seller
                                </div>
                                <div className="col-md-1">
                                    Buyer
                                </div>
                                <div className="col-md-1">
                                    Status
                                </div>
                                <div className="col-md-2">
                                    Delay Statements
                                </div>
                                <div className="col-md-2">
                                    Work Done
                                </div>
                                <div className="col-md-2">
                                    Amount Spent
                                </div>
                                <div className="col-md-2">
                                    Action
                                </div>
                            </div>
                            {raisedForLst && raisedForLst.length > 0 ? raisedForLst.map(tempPO => <div className="row tablebox">
                                <div className="col-md-1">
                                    {tempPO.title}
                                </div>
                                <div className="col-md-1">
                                    {tempPO.buyerName}<br /><span style={{ fontSize: '10px' }}>{tempPO.buyerPhoneNo}</span>
                                </div>
                                <div className="col-md-1">
                                    {tempPO.sellerName}<br /><span style={{ fontSize: '10px' }}>{tempPO.sellerPhoneNo}</span>
                                </div>
                                <div className="col-md-1">
                                    {tempPO.status}
                                </div>
                                <div className="col-md-2">
                                    {tempPO.delaysAndWaitingResponse && tempPO.delaysAndWaitingResponse.length ?
                                        <img src={"./info.png"} width={20} height={20} alt="Alter icon" onClick={(e) => {
                                            e.preventDefault();
                                            console.log("Click is success" + tempPO.delaysAndWaitingResponse.length);
                                            setDelayMsg(tempPO.delaysAndWaitingResponse);
                                        }} /> : <></>}
                                </div>
                                <div className="col-md-2">
                                    <PieChart dataArray={tempPO.workDoneStatus} />
                                </div>
                                <div className="col-md-2">
                                    <PieChart dataArray={tempPO.paymentStatus} />
                                </div>
                                <div className="col-md-2">
                                    {tempPO.status === "Draft" ? <FormButton name="Edit" onClick={ (e)=>editPurchaseOrder(e,tempPO.poId)} /> :
                                        <>
                                            <FormButton name="Copy" onClick={(e) => copyPurchaseOrder(e, tempPO.poId)} />
                                            <FormButton name="Respond" onClick={(e) => {
                                                e.preventDefault();
                                                console.log("Calling Respond Button");
                                                PurchaseOrder.setPoId(tempPO.poId);
                                                navigate("/Details")
                                            }} />
                                        </>}

                                </div>
                            </div>
                            ) : <div className="row tablebox">No Data present</div>}

                        </div>
                    </div>
                </div>
            </div>
		</div>
	);
};

export default HomePage;
