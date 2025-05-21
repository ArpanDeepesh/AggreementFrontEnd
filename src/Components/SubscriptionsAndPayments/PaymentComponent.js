import React, { useRef, useState } from "react";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
import { useEffect } from "react";
import { getRequest, sendPostRequest } from "../Services/ContrectBackendAPI";
import UserProfile from "../Context/UserProfile";
import FormButton from "../FormParts/FormButton";
import OtherData from "../Context/OtherData";

const PaymentComponent = ({ setUserName, setUserType }) => {
    const [subscriptionObj, setSubscriptionObj] = useState();
    const proposalForm = useRef(null);
    useEffect(() => {
        setUserName(UserProfile.getName());
        setUserType(UserProfile.getUserType());
        var subData = OtherData.getData();
        if (subData !== "" && subData.length > 0) {
            var obj = JSON.parse(OtherData.getData());
            console.log(obj);
            setSubscriptionObj(obj);
            OtherData.resetData();
        }
    }, []);
    const { error, isLoading, Razorpay } = useRazorpay();

    const handlePayment = () => {
        var body = {
            Amount: subscriptionObj.rate
        };
        sendPostRequest("api/payment/CreateOrder", UserProfile.getToken(), body).then(r => r.json()).then(res => {
            console.log(res);
            if (res.status === 1) {
                var options: RazorpayOrderOptions = {
                    key: res.razorKey,
                    amount: res.amount, // Amount in paise
                    currency: res.currency,
                    name: res.companyName,
                    description: res.description,
                    order_id: res.orderId, // Generate order_id on server
                    handler: (response) => {
                        console.log(response);
                        getRequest("api/payment/Recharge?subTypeId=" + subscriptionObj.id + "&note=" +
                            response.razorpay_payment_id + "&reciptId=" + response.razorpay_order_id, UserProfile.getToken())
                            .then(r => r.json())
                            .then(res => {
                                console.log(res);
                            }).catch(err => {
                                console.log(err);
                            });

                    },
                    prefill: {
                        name: res.clientName,
                        email: res.clientEmail,
                        contact: res.clientPhoneNumber,
                    },
                    theme: {
                        color: "#F37254",
                    },
                };

                const razorpayInstance = new Razorpay(options);
                razorpayInstance.open();
            } else {
                alert("Not able to create order");
            }
            
        }).catch(err => console.log(err));
        
    };

    return (
        <div className="main-content">
            {subscriptionObj && subscriptionObj.id && subscriptionObj.id > 0 ? <div>
                <h1>Payment Page</h1>
                {isLoading && <p>Loading Razorpay...</p>}
                {error && <p>Error loading Razorpay: {JSON.stringfy(error)}</p>}
                {JSON.stringify(subscriptionObj)}
                <h4>
                    {subscriptionObj.typeValue}
                </h4>
                <h6>
                    Rate- {subscriptionObj.rate} INR
                    <br />
                    Contract counts- {subscriptionObj.numberOfContracts}
                    <br />
                    Allowed number of attachments- {subscriptionObj.numberOfAttachments}
                    <br />
                    Max contract duration- {subscriptionObj.contractDurationLimit} days
                    <br />
                    Generated PDF count- {subscriptionObj.genPdfCount}
                    <br />
                    {/*Contract counts- {numberOfContracts}*/}
                    {/*<br />*/}
                    {/*Contract counts- {numberOfContracts}*/}
                    {/*<br />*/}
                    {/*Contract counts- {numberOfContracts}*/}
                    {/*<br />*/}
                    {/*Contract counts- {numberOfContracts}*/}
                    {/*<br />*/}
                    {/*Contract counts- {numberOfContracts}*/}
                    {/*<br />*/}
                </h6>
                <button onClick={handlePayment} disabled={isLoading}>
                    Pay Now
                </button>
            </div> : <span>Loading payment...</span>}
            
        </div>
    );
};

export default PaymentComponent;
