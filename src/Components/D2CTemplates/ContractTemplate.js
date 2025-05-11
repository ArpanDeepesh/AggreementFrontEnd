/* eslint-disable no-loop-func */
// ContractTemplate.jsx
import React, { useState, useEffect } from 'react';
import UserRoleSection from './UserRoleSection';
import AgreementDetails from './AgreementDetails';
import TermDuration from './TermDuration';
import FinancialTerms from './FinancialTerms';
import TermsConditions from './TermsConditions';
import ContractPreview from './ContractPreview';
import FormActions from './FormActions';
import { findUserRequest, getRequestAllowAll, sendPostRequest, getRequest } from '../Services/ContrectBackendAPI';
import UserProfile from '../Context/UserProfile';
import OtherData from '../Context/OtherData';
import { useNavigate } from "react-router-dom";

const ContractTemplate = ({ oldFormData, title }) => {
    const navigate = useNavigate();
    const [itemUnitOptions, setItemUnitOptions] = useState([]);
    const [itemCurrencyOptions, setItemCurrencyOptions] = useState([]);
    useEffect(() => {
        setRolesForTitles(title);
        if (oldFormData && oldFormData.counterpartyDetails && oldFormData.counterpartyDetails.length > 0) {
            console.log(999);
            setFormData(oldFormData);
        } else
        {
            getRequestAllowAll("api/general/TemplateTerms?agTempType=" + title).then(r => r.json()).then(res => {
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
            getRequestAllowAll("api/general/TemplateItem?agTempType=" + title).then(r => r.json()).then(res => {
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
                            unit: res.data[i].unit,
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
        getRequestAllowAll("api/General/CurrencyList").then(x => x.json()).then(res => {
            if (res.status === 1) {
                setItemCurrencyOptions(res.data);
            }
        }).catch(err => console.log(err));
        if (UserProfile.getToken().length > 0)
        {
            console.log("1");
            if (UserProfile.getPhoneNumber().length > 0) {
                console.log("2");
                VerifyUser(UserProfile.getPhoneNumber(), "firstpartyDetails");
            } else if (UserProfile.getEmail().length > 0)
            {
                console.log("3");
                VerifyUser(UserProfile.getEmail(), "firstpartyDetails");
            }
                
        }
        
    }, [title]);

    const [userRoleLst, setUserRoleLst] = useState();
    const [formData, setFormData] = useState(
        {
            userRole: '',
            firstpartyDetails: '',
            counterpartyDetails: '',
            counterpartyContact: '',
            startDate: '',
            contractDuration: '30',
            penalityDays: 0,
            penalityPercent:0,
            advance: 0,
            deposite: 0,
            currency:'INR',
            paymentTerms: [],
            lineItems: [],
            customTerms: []
        }
    );

    const setRolesForTitles = (inputTitle) => {
                                 
        if (inputTitle === "Rental Agreement")
        {
            setUserRoleLst([{ valueData: "tenant", displayData: "Tenant" }, { valueData: "landlord", displayData: "Landlord" }]);
        } else if (inputTitle === "Subletting") {
            setUserRoleLst([{ valueData: "sublessee", displayData: "Sublessee" }, { valueData: "sublesser", displayData: "Sublesser" }]);
        }
        else if (inputTitle === "Interior Design") {
            setUserRoleLst([{ valueData: "design_client", displayData: "Client" }, { valueData: "designer", displayData: "Designer" }]);
        }
        else if (inputTitle === "Maintenance") {

            setUserRoleLst([{ valueData: "building_owner", displayData: "Building owner" }, { valueData: "maintenance_contractor", displayData: "Contractor" }]);
        }
        else if (inputTitle === "Home Renovation") {

            setUserRoleLst([{ valueData: "home_owner", displayData: "Home owner" }, { valueData: "renovation_contractor", displayData: "Contractor" }]);
        }
        else if (inputTitle === "Consulting") {

            setUserRoleLst([{ valueData: "consulting_client", displayData: "Client" }, { valueData: "consultant", displayData: "Consultant" }]);
        }
        else if (inputTitle === "NDA") {

            setUserRoleLst([{ valueData: "receiving_party", displayData: "Receiving party" }, { valueData: "disclosing_party", displayData: "Disclosing party" }]);
        }
        else if (inputTitle === "Consent Agreement") {

            setUserRoleLst([{ valueData: "acceptor", displayData: "Acceptor" }, { valueData: "creator", displayData: "Creator" }]);
        }
        else if (inputTitle === "Loan Agreement") {

            setUserRoleLst([{ valueData: "borrower", displayData: "Borrower" }, { valueData: "lender", displayData: "Lender" }]);
        }
        else if (inputTitle === "Freelance") {

            setUserRoleLst([{ valueData: "service_receiver", displayData: "Service receiver" }, { valueData: "service_provider", displayData: "Service provider" }]);
        }
        else if (inputTitle === "Sales") {

            setUserRoleLst([{ valueData: "buyer", displayData: "Buyer" }, { valueData: "seller", displayData: "Seller" }]);
        }
        else if (inputTitle === "Custom") {

            setUserRoleLst([{ valueData: "spending_party", displayData: "Spending party" }, { valueData: "receiving_party", displayData: "Receiving party" }]);
        }
        else {

            setUserRoleLst([{ valueData: "buyer", displayData: "Buyer" }, { valueData: "seller", displayData: "Seller" }]);
        }
    };
  const [contractSent, setContractSent] = useState(false);

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
            rate: '',
            timeToComplete: 0,
            currency: 2,
            tax: 18,
            unit: 1,
            amount: 0
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
  const addCustomTerm = (termId,termText,termTitle) => {
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
    if (!formData.counterpartyContact.trim()) {
      alert('Please enter counterparty email or phone number');
      return;
      }
      var termType = 1;//seller
      if (formData.userRole === "tenant"
          || formData.userRole === "sublessee"
          || formData.userRole === "design_client"
          || formData.userRole === "building_owner"
          || formData.userRole === "home_owner"
          || formData.userRole === "consulting_client"
          || formData.userRole === "receiving_party"
          || formData.userRole === "acceptor"
          || formData.userRole === "borrower"
          || formData.userRole === "service_receiver"
          || formData.userRole === "buyer"
          || formData.userRole === "spending_party") {
          termType = 2;
      }
      if (UserProfile.getToken().length > 0) {
          var formBody = {
              Id: 0,
              CreatorId: UserProfile.getUserId(),
              CreatorType: termType===1?"seller":"buyer",
              OtherPartyContactInfo: formData.counterpartyContact,
              LDDays: formData.penalityDays,
              LDPercent: formData.penalityPercent,
              Advance: formData.advance,
              NumberOfDays: formData.contractDuration,
              ContractType: title,
              StartDate: formData.startDate,
              Deposit: formData.deposite
          };
          
          sendPostRequest('api/Business/CustomContract', UserProfile.getToken(), formBody).then(r => r.json()).then(async res => {
              OtherData.setData(JSON.stringify(res.data));
              var promises = [];
              if (res.status === 1) {
                  for (var i = 0; i < formData.lineItems.length; i++) {

                      var itemForm = {
                          AgItemId:0,
                          AgId: res.data.id,
                          CreatorId: UserProfile.getUserId(),
                          Rate: formData.lineItems[i].rate,
                          Tax: formData.lineItems[i].tax,
                          ItemTitle: formData.lineItems[i].title,
                          ItemDescription: formData.lineItems[i].description,
                          ItemCode: formData.lineItems[i].hsnSac,
                          ItemDeliveredInDays: formData.lineItems[i].timeToComplete,
                          Qty: formData.lineItems[i].quantity,
                          CurrencyId: 2,
                          UnitId: 1
                      };
                      // eslint-disable-next-line no-loop-func
                      var p1 = sendPostRequest('api/Business/AddAgreementItem', UserProfile.getToken(), itemForm).then(r => {
                          if (!r.ok) throw new Error(`Fetch failed: AddAgreementItem`);
                          return r.json();
                      }).then(resI => {
                          if (resI.status !== 1) {
                              alert("Some error while adding item " + formData.lineItems[i].title);
                          }
                      }).catch(err => console.log(err));
                      promises.push(p1);
                  }
                  for (var j = 0; j < formData.customTerms.length; j++) {
 
                      var termForm = {
                          Id: 0,
                          TermTitle: formData.customTerms[j].title,
                          TermTxt: formData.customTerms[j].text,
                          TermTypeId: termType,
                          TermRfpId: res.data.id,
                          Attachments:[]
                      };
                      // eslint-disable-next-line no-loop-func
                      var p2 =sendPostRequest('api/Business/AddAgreementTerm', UserProfile.getToken(), termForm).then(r => {
                          if (!r.ok) throw new Error(`Fetch failed: AddAgreementItem`);
                          return r.json(); }).then(rest => {
                          if (rest.status !== 1) {
                              alert("Some error while adding item " + formData.customTerms[j].title);
                          } 
                          }).catch(err => console.log(err));
                      promises.push(p2);
                  }
                  for (var k = 0; k < formData.paymentTerms.length; k++) {

                      var termPForm = {
                          Id: 0,
                          TermTitle: formData.customTerms[k].title,
                          TermTxt: formData.customTerms[k].text,
                          TermTypeId: termType,
                          TermRfpId: res.data.id,
                          Attachments: []
                      };
                      // eslint-disable-next-line no-loop-func
                      var p3=sendPostRequest('api/Business/AddAgreementTerm', UserProfile.getToken(), termPForm).then(r => {
                          if (!r.ok) throw new Error(`Fetch failed: AddAgreementItem`);
                          return r.json(); }).then(respt => {
                          if (respt.status !== 1) {
                              alert("Some error while adding item " + formData.paymentTerms[k].title);
                          }
                          
                          }).catch(err => console.log(err));
                      promises.push(p3);
                  }
                  var results = await Promise.all(promises);
                  console.log(results);
                  if (results.length === formData.lineItems.length + formData.customTerms.length + formData.paymentTerms.length)
                  {
                      getRequest("api/Business/StartAgreement?agreementId=" + res.data.id, UserProfile.getToken())
                          .then(x => x.json())
                          .then(resp => {
                              console.log(resp);
                              if (resp.status === 1) {
                                  navigate("/DetailAgreement");
                              }
                          }).catch(err => console.log(err));
                  }
              }


              //OtherData.setData(JSON.stringify(res.data));
              //navigate("/draftD2C");

          }).catch(err => {
              console.log(err);
          });
      } else
      {
          var tempData = formData;
          tempData.userRole = termType === 1 ? "seller" : "buyer";
          tempData['contractType'] = title;
          OtherData.setData(JSON.stringify(tempData));
          navigate("/signup");
      }
      
    
    // In a real app, you would send this to your API
    console.log('Contract data:', formData);
    setContractSent(true);
  };

    const VerifyUser = (contactDetail,inputProperty) => {
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
    const editCustomTerm = (id,termtitle,termText) =>
    {

        setFormData(prevData => ({
            ...prevData,
            customTerms: prevData.customTerms.map(t => t.id === id ? { ...t, title: termtitle, text: termText } :t)
        }));
    }
    const editPaymentTerm = (id, termtitle, termText) => {

        setFormData(prevData => ({
            ...prevData,
            paymentTerms: prevData.paymentTerms.map(t => t.id === id ? { ...t, title: termtitle, text: termText } : t)
        }));
    }

    const getPartyTitle = (isFirstParty) => {
        if (!formData.userRole) return 'Party';
        const partyTitles = {
            tenant: ['Tenant', 'Landlord'],
            landlord: ['Landlord', 'Tenant'],
            sublessee: ['Sublessee', 'Sublesser'],
            sublesser: ['Sublesser', 'Sublessee'],
            design_client: ['Client', 'Designer'],
            designer: ['Designer', 'Client'],
            building_owner: ['Building owner', 'Contractor'],
            maintenance_contractor: ['Contractor', 'Building owner'],
            home_owner: ['Home owner', 'Contractor'],
            renovation_contractor: ['Contractor', 'Home owner'],
            consulting_client: ['Client', 'Consultant'],
            consultant: ['Consultant', 'Client'],
            receiving_party: ['Receiving party', 'Disclosing party'],
            disclosing_party: ['Disclosing party', 'Receiving party'],
            acceptor: ['Acceptor', 'Creator'],
            creator: ['Creator', 'Acceptor'],
            borrower: ['Borrower', 'Lender'],
            lender: ['Lender', 'Borrower'],
            service_receiver: ['Service receiver', 'Service provider'],
            service_provider: ['Service provider', 'Service receiver'],
            buyer: ['Buyer', 'Seller'],
            seller: ['Seller', 'Buyer'],
            spending_party: ['Spending party', 'Receiving party'],
            receiving_party: ['Receiving party', 'Spending party']
        };


        return partyTitles[formData.userRole]
            ? (isFirstParty ? partyTitles[formData.userRole][0] : partyTitles[formData.userRole][1])
            : 'Party';
    };

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
        <h1 id="template-title">
                  {/*{formData.userRole ? getContractTitle(formData.userRole) : 'CONTRACT AGREEMENT'}*/}
                  {title}
        </h1>
        <p>Fill in the details below to create your contract</p>
      </div>
      
      <div className="template-body">
              <UserRoleSection 
                  displayList={userRoleLst}
                  userRole={formData.userRole}
                  counterPartyDetail={formData.counterpartyDetails}
          counterpartyContact={formData.counterpartyContact}
          onRoleChange={(value) => handleInputChange('userRole', value)}
          onContactChange={(value) => handleInputChange('counterpartyContact', value)}
                  onVerifyContact={() => VerifyUser(formData.counterpartyContact, "counterpartyDetails")}
              />
              <div className="form-section" >
                  <h2>Agreement Details</h2>
                  <p>This Agreement({title || 'AGREEMENT'}) is made between:</p>
                  <h2>FIRST PARTY ({getPartyTitle(true)})</h2>
                  <p>{formData.firstpartyDetails && formData.firstpartyDetails !== "" ? getUserDetailToDisplay(formData.firstpartyDetails) : "[Your details will appear here]"}</p>
                  <h2>SECOND PARTY ({getPartyTitle(false)})</h2>
                  <p>{formData.counterpartyDetails && formData.counterpartyDetails !== "" ? getUserDetailToDisplay(formData.counterpartyDetails) : "[Counterparty details will be filled after sending]"}</p>

              </div>
        
              <TermDuration 
                  agreementPenalityPercent={formData.penalityPercent}
                  agreementPenalityDays={formData.penalityDays}
                  onPenalityPercentChange={(value) => handleInputChange('penalityPercent', value)}
                  onPenalityDaysChange={(value) => handleInputChange('penalityDays', value)}
          startDate={formData.startDate}
          contractDuration={formData.contractDuration}
          onStartDateChange={(value) => handleInputChange('startDate', value)}
          onDurationChange={(value) => handleInputChange('contractDuration', value)}
        />
        
              <FinancialTerms 
                  agreementAdvance={formData.advance}
                  agreementDeposite={formData.deposite}
                  onAdvanceChange={(value) => handleInputChange('advance', value)}
                  onDepositeChange={(value) => handleInputChange('deposite', value)}
                  agreementCurrency={formData.currency}
                  unitOptions={itemUnitOptions}
                  currencyOptions={itemCurrencyOptions}
                  onCurrencyChange={(value) => handleInputChange('currency', value)}
                  lineItems={formData.lineItems}
                  onItemChange={updateLineItem}
                  onAddItem={addLineItem}
                  onRemoveItem={removeLineItem}
                  paymentTerms={formData.paymentTerms}
                  onRemovePaymentTerm={removePaymentTerm}
                  onPaymentTermsChange={addPaymentTerm}
                  handleEditTerm={editPaymentTerm}
        />
        
        <TermsConditions 
                  customTerms={formData.customTerms}
                  onAddTerm={addCustomTerm}
                  onRemoveTerm={removeCustomTerm}
                  handleEditTerm={editCustomTerm}
        />
        
        <ContractPreview formData={formData} />
        
        <FormActions 
          onSendContract={sendContract}
          disabled={contractSent}
          sent={contractSent}
        />
      </div>
    </div>
  );
};

// Helper function to get contract title based on role
function getContractTitle(role) {
  const titles = {
    landlord: "RESIDENTIAL LEASE AGREEMENT",
    tenant: "RESIDENTIAL LEASE AGREEMENT",
    buyer: "SALE AGREEMENT",
    seller: "SALE AGREEMENT",
    licensor: "LICENSE AGREEMENT",
    licensee: "LICENSE AGREEMENT",
    service_provider: "SERVICE AGREEMENT",
    client: "SERVICE AGREEMENT"
  };
  return titles[role] || "CONTRACT AGREEMENT";
}

export default ContractTemplate;