// ContractTemplate.jsx
import React, { useState, useEffect } from 'react';
import UserRoleSection from './UserRoleSection';
import AgreementDetails from './AgreementDetails';
import TermDuration from './TermDuration';
import FinancialTerms from './FinancialTerms';
import TermsConditions from './TermsConditions';
import ContractPreview from './ContractPreview';
import FormActions from './FormActions';
import { getRequestAllowAll } from '../Services/ContrectBackendAPI';

const ContractTemplate = ({ title }) => {
    useEffect(() => {
        setRolesForTitles(title);
        getRequestAllowAll("api/general/TemplateTerms?agTempType=" + title).then(r => r.json()).then(res => {
            console.log(res);
            if (res.data && res.data.length > 0)
            {
                for (var i = 0; i < res.data.length; i++) {
                    addCustomTerm(res.data[i].termDescription, res.data[i].termName);
				}
            }
        }).catch(err => console.log(err));
    }, [title]);
    
    const [userRoleLst, setUserRoleLst] = useState();
  const [formData, setFormData] = useState({
    userRole: '',
    counterpartyContact: '',
    agreementTitle: '',
    agreementDate: new Date().toISOString().split('T')[0],
    propertyDescription: '',
    startDate: '',
    endDate: '',
    noticePeriod: '30',
    paymentTerms: 'Payment shall be made within 15 days of invoice. Late payments will attract interest at 1.5% per month.',
    lineItems: [
      {
        id: 1,
        description: 'Security Deposit',
        hsnSac: '997211',
        quantity: 1,
        rate: '',
        currency: 'INR',
        tax: 18,
        amount: 0
      },
      {
        id: 2,
        description: 'Service Fee',
        hsnSac: '9985',
        quantity: 1,
        rate: '',
        currency: 'INR',
        tax: 18,
        amount: 0
      }
    ],
    customTerms: []
  });
    const setRolesForTitles = (inputTitle) => {
                                 
        if (inputTitle === "Rental Agreement")
        {
            setUserRoleLst([{ valueData: "buyer", displayData: "Renter" }, { valueData: "seller", displayData: "Landlord" }]);
        } else if (inputTitle === "Subletting") {
            setUserRoleLst([{ valueData: "buyer", displayData: "Sublessee" }, { valueData: "seller", displayData: "Sublesser" }]);
        }
        else if (inputTitle === "Interior Design") {
            setUserRoleLst([{ valueData: "buyer", displayData: "Client" }, { valueData: "seller", displayData: "Designer" }]);
        }
        else if (inputTitle === "Maintenance") {

            setUserRoleLst([{ valueData: "buyer", displayData: "Building owner" }, { valueData: "seller", displayData: "Contractor" }]);
        }
        else if (inputTitle === "Home Renovation") {

            setUserRoleLst([{ valueData: "buyer", displayData: "Home owner" }, { valueData: "seller", displayData: "Contractor" }]);
        }
        else if (inputTitle === "Consulting") {

            setUserRoleLst([{ valueData: "buyer", displayData: "Client" }, { valueData: "seller", displayData: "Consultant" }]);
        }
        else if (inputTitle === "NDA") {

            setUserRoleLst([{ valueData: "buyer", displayData: "Receiving party" }, { valueData: "seller", displayData: "Disclosing party" }]);
        }
        else if (inputTitle === "Consent Agreement") {

            setUserRoleLst([{ valueData: "buyer", displayData: "Acceptor" }, { valueData: "seller", displayData: "Creator" }]);
        }
        else if (inputTitle === "Loan Agreement") {

            setUserRoleLst([{ valueData: "buyer", displayData: "Borrower" }, { valueData: "seller", displayData: "Lender" }]);
        }
        else if (inputTitle === "Freelance") {

            setUserRoleLst([{ valueData: "buyer", displayData: "Service receiver" }, { valueData: "seller", displayData: "Service provider" }]);
        }
        else if (inputTitle === "Sales") {

            setUserRoleLst([{ valueData: "buyer", displayData: "Buyer" }, { valueData: "seller", displayData: "Seller" }]);
        }
        else if (inputTitle === "Custom") {

            setUserRoleLst([{ valueData: "buyer", displayData: "Spending party" }, { valueData: "seller", displayData: "Receiving party" }]);
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
          description: '',
          hsnSac: '',
          quantity: 1,
          rate: '',
          currency: 'INR',
          tax: 18,
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

  // Add custom term
  const addCustomTerm = (termText,termTitle) => {
    if (!termText.trim()) return;
    
    setFormData(prev => ({
      ...prev,
      customTerms: [
        ...prev.customTerms,
        {
            id: Date.now(),
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
    
    // In a real app, you would send this to your API
    console.log('Contract data:', formData);
    setContractSent(true);
  };
    
   


  return (
    <div className="template-container">
      <div className="template-header">
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
          counterpartyContact={formData.counterpartyContact}
          onRoleChange={(value) => handleInputChange('userRole', value)}
          onContactChange={(value) => handleInputChange('counterpartyContact', value)}
          onVerifyContact={() => alert("Verification request sent to"+ formData.counterpartyContact)}
        />
        
        <AgreementDetails 
          agreementTitle={formData.agreementTitle}
          agreementDate={formData.agreementDate}
          propertyDescription={formData.propertyDescription}
          onTitleChange={(value) => handleInputChange('agreementTitle', value)}
          onDateChange={(value) => handleInputChange('agreementDate', value)}
          onDescriptionChange={(value) => handleInputChange('propertyDescription', value)}
        />
        
        <TermDuration 
          startDate={formData.startDate}
          endDate={formData.endDate}
          noticePeriod={formData.noticePeriod}
          onStartDateChange={(value) => handleInputChange('startDate', value)}
          onEndDateChange={(value) => handleInputChange('endDate', value)}
          onNoticePeriodChange={(value) => handleInputChange('noticePeriod', value)}
        />
        
        <FinancialTerms 
          lineItems={formData.lineItems}
          onItemChange={updateLineItem}
          onAddItem={addLineItem}
          onRemoveItem={removeLineItem}
          paymentTerms={formData.paymentTerms}
          onPaymentTermsChange={(value) => handleInputChange('paymentTerms', value)}
        />
        
        <TermsConditions 
          customTerms={formData.customTerms}
          onAddTerm={addCustomTerm}
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