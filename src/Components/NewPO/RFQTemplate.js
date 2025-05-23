/* eslint-disable no-loop-func */
// ContractTemplate.jsx
import React, { useState, useEffect } from 'react';
import RFQTermDuration from './RFQTermDuration';
import RFQFinancialTerms from './RFQFinancialTerms';
import RFQTermsConditions from './RFQTermsConditions';
import RFQPreview from './RFQPreview';
import RFQFormActions from './RFQFormActions';
import { findUserRequest, getRequestAllowAll, sendPostRequest, getRequest } from '../Services/ContrectBackendAPI';
import UserProfile from '../Context/UserProfile';
import OtherData from '../Context/OtherData';
import { useNavigate } from "react-router-dom";

const RFQTemplate = ({ oldFormData, rfqId }) => {
    const navigate = useNavigate();
    const [itemUnitOptions, setItemUnitOptions] = useState([]);
    const [contractSent, setContractSent] = useState(false);
    const [proposalId, setProposalId] = useState();
    const [formData, setFormData] = useState(
        {
            firstpartyDetails: '',
            contractDuration: '30',
            penalityDays: 0,
            penalityPercent: 0,
            inviteOnly: true,
            paymentTerms: [],
            lineItems: [],
            customTerms: []
        }
    );


    useEffect(() => {
        setProposalId(rfqId);
        if (oldFormData && oldFormData.counterpartyDetails && oldFormData.counterpartyDetails.length > 0) {
            console.log(999);
            setFormData(oldFormData);
        } else {
            getRequestAllowAll("api/general/TemplateTerms?agTempType=Sales").then(r => r.json()).then(res => {
                console.log(res);
                if (res.data && res.data.length > 0) {
                    for (var i = 0; i < res.data.length; i++) {
                        if (res.data[i].isPaymentTerm === false) {
                            addCustomTerm(res.data[i].id, res.data[i].termDescription, res.data[i].termName);
                        } else {
                            addPaymentTerm(res.data[i].id, res.data[i].termDescription, res.data[i].termName);
                        }

                    }
                }
            }).catch(err => console.log(err));
            getRequestAllowAll("api/general/TemplateItem?agTempType=Sales" ).then(r => r.json()).then(res => {
                console.log(res);
                if (res.data && res.data.length > 0) {
                    var customItem = [];
                    for (var i = 0; i < res.data.length; i++) {
                        customItem.push({
                            id: i + 1,
                            title: res.data[i].itemTitle,
                            description: res.data[i].itemDescription,
                            hsnSac: res.data[i].itemHsnCsnUin,
                            quantity: res.data[i].itemQuantity,
                            rate: res.data[i].rate,
                            timeToComplete: res.data[i].itemCompletion,
                            currency: res.data[i].currency,
                            tax: res.data[i].itemTax,
                            unit: 1,
                            amount: 0
                        });
                    }
                    handleInputChange("lineItems", customItem);
                }
            }).catch(err => console.log(err));
        }
        getRequestAllowAll("api/General/UnitList").then(x => x.json()).then(res => {
            if (res.status === 1) {
                setItemUnitOptions(res.data);
            }
        }).catch(err => console.log(err));
        if (UserProfile.getToken().length > 0) {
            console.log("1");
            if (UserProfile.getPhoneNumber().length > 0) {
                console.log("2");
                VerifyUser(UserProfile.getPhoneNumber(), "firstpartyDetails");
            } else if (UserProfile.getEmail().length > 0) {
                console.log("3");
                VerifyUser(UserProfile.getEmail(), "firstpartyDetails");
            }

        }

    }, []);

    

    // Update form data
    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Update line item
    const updateLineItem = (id, field, value) => {
        setFormData(prev => {
            const updatedItems = prev.lineItems.map(item => {
                if (item.id === id) {
                    // Calculate amount if rate or quantity changes
                    if (field === 'rate' || field === 'quantity' || field === 'tax') {
                        const rate = field === 'rate' ? parseFloat(value) || 0 : item.rate;
                        const quantity = field === 'quantity' ? parseFloat(value) || 0 : item.quantity;
                        const taxRate = field === 'tax' ? parseFloat(value) || 0 : item.tax;
                        const amount = rate * quantity;
                        const taxAmount = amount * (taxRate / 100);
                        const total = amount + taxAmount;

                        return {
                            ...item,
                            [field]: value,
                            amount: total
                        };
                    }
                    return { ...item, [field]: value };
                }
                return item;
            });

            return { ...prev, lineItems: updatedItems };
        });
    };

    // Add new line item
    const addLineItem = () => {
        setFormData(prev => ({
            ...prev,
            lineItems: [
                ...prev.lineItems,
                {

                    id: Date.now(),
                    title: "",
                    description: "",
                    hsnSac: "",
                    quantity: 0,
                    timeToComplete: 0,
                    unit: 1
                }
            ]
        }));
    };

    // Remove line item
    const removeLineItem = (id) => {
        setFormData(prev => ({
            ...prev,
            lineItems: prev.lineItems.filter(item => item.id !== id)
        }));
    };
    const removePaymentTerm = (id) => {
        setFormData(prev => ({
            ...prev,
            paymentTerms: prev.paymentTerms.filter(t => t.id !== id)
        }));
    };
    const removeCustomTerm = (id) => {
        setFormData(prev => ({
            ...prev,
            customTerms: prev.customTerms.filter(t => t.id !== id)
        }));
    };

    // Add custom term
    const addCustomTerm = (termId, termText, termTitle) => {
        if (!termText.trim()) return;
        removeCustomTerm(termId);
        setFormData(prev => ({
            ...prev,
            customTerms: [
                ...prev.customTerms,
                {
                    id: termId === 0 ? Date.now() : termId,
                    title: termTitle,
                    text: termText,
                    status: 'pending'
                }
            ]
        }));
    };
    // Add payment term
    const addPaymentTerm = (termId, termText, termTitle) => {
        if (!termText.trim()) return;
        removePaymentTerm(termId);
        setFormData(prev => ({
            ...prev,
            paymentTerms: [
                ...prev.paymentTerms,
                {
                    id: termId === 0 ? Date.now() : termId,
                    title: termTitle,
                    text: termText,
                    status: 'pending'
                }
            ]
        }));
    };
    // Send contract
    const sendContract = () => {
        if (UserProfile.getToken().length > 0) {
            var formBody = {
                Id: proposalId && proposalId > 0 ? proposalId : 0,
                ProposalCompletionInDays: formData.contractDuration,
                ProposalLdPercent: formData.penalityPercent,
                ProposalLdAppliedAfterDays: formData.penalityDays,
                OwnerId: UserProfile.getUserId(),
                InviteOnly: formData.inviteOnly
            };
            console.log(formBody);
            sendPostRequest('api/Business/SaveRFQ', UserProfile.getToken(),formBody).then(r => r.json()).then(async res => {
                //OtherData.setData(JSON.stringify(res.data)); 
                var promises = [];
                if (res.status === 1) {
                    for (var i = 0; i < formData.lineItems.length; i++) {
                        var itemForm = {
                            Id: 0,
                            ItemRfpId: res.id,
                            ItemTitle: formData.lineItems[i].title,
                            ItemDescription: formData.lineItems[i].description,
                            ItemHsnCsnUin: formData.lineItems[i].hsnSac,
                            ItemQuantity: formData.lineItems[i].quantity,
                            Unit: formData.lineItems[i].unit
                        };
                        console.log(itemForm);
                        // eslint-disable-next-line no-loop-func
                        var p1 = sendPostRequest('api/Business/AddRFQItem', UserProfile.getToken(), itemForm).then(r => {
                            if (!r.ok) throw new Error(`Fetch failed: AddAgreementItem`);
                            return r.json();
                        }).then(resI => {
                            if (resI.status !== 1) {
                                alert("Some error while adding item " + formData.lineItems[i].title);
                            }
                            return resI;
                        }).catch(err => console.log(err));
                        promises.push(p1);
                    }
                    for (var j = 0; j < formData.customTerms.length; j++) {
                        var termForm = {
                            Id: 0,
                            TermTitle: formData.customTerms[j].title,
                            TermTxt: formData.customTerms[j].text,
                            TermRfpId: res.id,
                            IsPaymentTerm:false,
                            Attachments: []
                        };
                        // eslint-disable-next-line no-loop-func
                        var p2 = sendPostRequest('api/Business/AddRFQTerm', UserProfile.getToken(), termForm).then(r => {
                            if (!r.ok) throw new Error(`Fetch failed: AddAgreementItem`);
                            return r.json();
                        }).then(rest => {
                            if (rest.status !== 1) {
                                alert("Some error while adding item " + formData.customTerms[j].title);
                            }
                            return rest;
                        }).catch(err => console.log(err));
                        promises.push(p2);
                    }
                    for (var k = 0; k < formData.paymentTerms.length; k++) {

                        var termPForm = {
                            Id: 0,
                            TermTitle: formData.paymentTerms[k].title,
                            TermTxt: formData.paymentTerms[k].text,
                            IsPaymentTerm: true,
                            TermRfpId: res.id,
                            Attachments: []
                        };
                        // eslint-disable-next-line no-loop-func
                        var p3 = sendPostRequest('api/Business/AddRFQTerm', UserProfile.getToken(), termPForm).then(r => {
                            if (!r.ok) throw new Error(`Fetch failed: AddAgreementItem`);
                            return r.json();
                        }).then(respt => {
                            if (respt.status !== 1) {
                                alert("Some error while adding item " + formData.paymentTerms[k].title);
                            }
                            return respt;
                        }).catch(err => console.log(err));
                        promises.push(p3);
                    }
                    var results = await Promise.all(promises);
                    console.log(results);
                    if (results.length === formData.lineItems.length + formData.customTerms.length + formData.paymentTerms.length) {
                        getRequest("api/Business/StartRFQ?proposalId=" + res.id, UserProfile.getToken())
                            .then(x => x.json())
                            .then(resp => {
                                console.log(resp);
                                if (resp.status === 1) {
                                    navigate("/Home");
                                }
                            }).catch(err => console.log(err));
                    }
                }


                //OtherData.setData(JSON.stringify(res.data));
                //navigate("/draftD2C");

            }).catch(err => {
                console.log(err);
            });
        } else {
            OtherData.setData(JSON.stringify(formData));
            navigate("/signup");
        }


        // In a real app, you would send this to your API
        console.log('Contract data:', formData);
        setContractSent(true);
    };
    const saveContract = () => {
        if (UserProfile.getToken().length > 0) {
            var formBody = {
                Id: proposalId && proposalId > 0 ? proposalId : 0,
                ProposalCompletionInDays: formData.contractDuration,
                ProposalLdPercent: formData.penalityPercent,
                ProposalLdAppliedAfterDays: formData.penalityDays,
                OwnerId: UserProfile.getUserId(),
                InviteOnly: formData.inviteOnly
            };
            console.log(formBody);
            sendPostRequest('api/Business/SaveRFQ', UserProfile.getToken(), formBody).then(r => r.json()).then(async res => {
                //OtherData.setData(JSON.stringify(res.data)); 
                var promises = [];
                if (res.status === 1) {
                    for (var i = 0; i < formData.lineItems.length; i++) {
                        var itemForm = {
                            Id: 0,
                            ItemRfpId: res.id,
                            ItemTitle: formData.lineItems[i].title,
                            ItemDescription: formData.lineItems[i].description,
                            ItemHsnCsnUin: formData.lineItems[i].hsnSac,
                            ItemQuantity: formData.lineItems[i].quantity,
                            Unit: formData.lineItems[i].unit
                        };
                        // eslint-disable-next-line no-loop-func
                        var p1 = sendPostRequest('api/Business/AddRFQItem', UserProfile.getToken(), itemForm).then(r => {
                            if (!r.ok) throw new Error(`Fetch failed: AddAgreementItem`);
                            return r.json();
                        }).then(resI => {
                            if (resI.status !== 1) {
                                alert("Some error while adding item " + formData.lineItems[i].title);
                            }
                            return resI;
                        }).catch(err => console.log(err));
                        promises.push(p1);
                    }
                    for (var j = 0; j < formData.customTerms.length; j++) {
                        var termForm = {
                            Id: 0,
                            TermTitle: formData.customTerms[j].title,
                            TermTxt: formData.customTerms[j].text,
                            TermRfpId: res.id,
                            IsPaymentTerm: false,
                            Attachments: []
                        };
                        // eslint-disable-next-line no-loop-func
                        var p2 = sendPostRequest('api/Business/AddRFQTerm', UserProfile.getToken(), termForm).then(r => {
                            if (!r.ok) throw new Error(`Fetch failed: AddAgreementItem`);
                            return r.json();
                        }).then(rest => {
                            if (rest.status !== 1) {
                                alert("Some error while adding item " + formData.customTerms[j].title);
                            }
                            return rest;
                        }).catch(err => console.log(err));
                        promises.push(p2);
                    }
                    for (var k = 0; k < formData.paymentTerms.length; k++) {

                        var termPForm = {
                            Id: 0,
                            TermTitle: formData.paymentTerms[k].title,
                            TermTxt: formData.paymentTerms[k].text,
                            IsPaymentTerm: true,
                            TermRfpId: res.id,
                            Attachments: []
                        };
                        // eslint-disable-next-line no-loop-func
                        var p3 = sendPostRequest('api/Business/AddRFQTerm', UserProfile.getToken(), termPForm).then(r => {
                            if (!r.ok) throw new Error(`Fetch failed: AddAgreementItem`);
                            return r.json();
                        }).then(respt => {
                            if (respt.status !== 1) {
                                alert("Some error while adding item " + formData.paymentTerms[k].title);
                            }
                            return respt;
                        }).catch(err => console.log(err));
                        promises.push(p3);
                    }
                    var results = await Promise.all(promises);
                    console.log(results);
                    if (results.length === formData.lineItems.length + formData.customTerms.length + formData.paymentTerms.length) {
                        navigate("/Home");
                    }
                }


                //OtherData.setData(JSON.stringify(res.data));
                //navigate("/draftD2C");

            }).catch(err => {
                console.log(err);
            });
        } else {
            OtherData.setData(JSON.stringify(formData));
            navigate("/signup");
        }


        // In a real app, you would send this to your API
        console.log('Contract data:', formData);
        setContractSent(true);
    };
    const VerifyUser = (contactDetail, inputProperty) => {
        findUserRequest({ ContactInfo: contactDetail }).then(r => r.json()).then(res => {
            console.log(res);
            var detail = "Name: " + res.data['usrName'];
            detail += "\nEmail: " + res.data['email'];
            detail += "\nPhone Number: " + res.data['phoneNumber'];
            detail += "\nGSTIN: " + res.data['usrGstin'];
            detail += "\nAddress: " + res.data['usrAddress'];
            handleInputChange(inputProperty, detail);
        }).catch(err => console.log(err));
    }
    const getUserDetailToDisplay = (d) => {
        var arr = d.split("\n");
        return (<>{arr[0]}<br />{arr[1]}<br />{arr[2]}<br />{arr[3]}<br />{arr[4]}</>);
    }
    const editCustomTerm = (id, termtitle, termText) => {

        setFormData(prevData => ({
            ...prevData,
            customTerms: prevData.customTerms.map(t => t.id === id ? { ...t, title: termtitle, text: termText } : t)
        }));
    }
    const editPaymentTerm = (id, termtitle, termText) => {

        setFormData(prevData => ({
            ...prevData,
            paymentTerms: prevData.paymentTerms.map(t => t.id === id ? { ...t, title: termtitle, text: termText } : t)
        }));
    }

    return (
        <div className="template-container">
            <div className="template-header">
                <div className="logo">
                    <a style={{ textDecoration: "none" }} href="/">
                        <span style={{ color: 'white' }}>Contr
                            <span style={{ color: "#ff8400" }}>e</span>
                            ct</span>
                    </a>

                </div>
                <p>Fill in the details below to create your contract</p>
            </div>

            <div className="template-body">
                <div className="form-section" >
                    <h2>Proposal (RFQ) Details</h2>
                    <p>This Proposal(RFQ) is made by:</p>
                    <h2>REQUESTING PARTY</h2>
                    <p>{formData.firstpartyDetails && formData.firstpartyDetails !== "" ? getUserDetailToDisplay(formData.firstpartyDetails) : "[Your details will appear here]"}</p>
                </div>

                <RFQTermDuration
                    agreementPenalityPercent={formData.penalityPercent}
                    agreementPenalityDays={formData.penalityDays}
                    onPenalityPercentChange={(value) => handleInputChange('penalityPercent', value)}
                    onPenalityDaysChange={(value) => handleInputChange('penalityDays', value)}
                    contractDuration={formData.contractDuration}
                    onDurationChange={(value) => handleInputChange('contractDuration', value)}
                    inviteOnly={formData.inviteOnly}
                    onInviteOnlyChange={(value) => handleInputChange('inviteOnly', value)}
                />

                <RFQFinancialTerms
                    unitOptions={itemUnitOptions}
                    lineItems={formData.lineItems}
                    onItemChange={updateLineItem}
                    onAddItem={addLineItem}
                    onRemoveItem={removeLineItem}
                    paymentTerms={formData.paymentTerms}
                    onRemovePaymentTerm={removePaymentTerm}
                    onPaymentTermsChange={addPaymentTerm}
                    handleEditTerm={editPaymentTerm}
                />

                <RFQTermsConditions
                    customTerms={formData.customTerms}
                    onAddTerm={addCustomTerm}
                    onRemoveTerm={removeCustomTerm}
                    handleEditTerm={editCustomTerm}
                />

                <RFQPreview formData={formData} />

                <RFQFormActions
                    onSendContract={sendContract}
                    disabled={contractSent}
                    onSaveContract={saveContract }
                    sent={contractSent}
                />
            </div>
        </div>
    );
};


export default RFQTemplate;