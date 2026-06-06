import React, { useState } from 'react';
import { CheckCircleOutlined } from '@ant-design/icons';
import './NewClient.scss';

const NewClient: React.FC = () => {
  const [organizationName, setOrganizationName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [companyAddress, setCompanyAddress] = useState<string>('');
  const [billingFrequency, setBillingFrequency] = useState<string>('');

  return (
    <div className="new-client">
      <div className="bar">
        <div className="bar-elements">
          <span>Invitation send</span>
          <div className="icon">
            <CheckCircleOutlined style={{ color: '#10baac', marginRight: '20px', fontSize: '30px' }} />
          </div>
        </div>
      </div>
      <div className="form">
        <h2>Create New Client Form</h2>
        <div className="form-details">
          <div className="form-row">
            <div className="label-input-wrap">
              <label htmlFor="organizationName">Organization Name</label>
              <input
                type="text"
                id="organizationName"
                placeholder="Name"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
              />
            </div>
            <div className="label-input-wrap">
              <label htmlFor="email">Sign up Email Address</label>
              <input
                type="text"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="label-input-wrap">
              <label htmlFor="companyName">Company Name</label>
              <input
                type="text"
                id="companyName"
                placeholder="Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div className="label-input-wrap">
              <label htmlFor="selectedPlan">Select A Plan</label>
              <select
                placeholder='Select Plan'
                id="selectedPlan"
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
              >
                <option value="">Select a Plan</option>
                <option value="plan1">Plan 1</option>
                <option value="plan2">Plan 2</option>
                <option value="plan3">Plan 3</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="label-input-wrap">
              <label htmlFor="companyAddress">Company Address</label>
              <input
                type="text"
                id="companyAddress"
                placeholder="Address"
                value={companyAddress}
                onChange={(e) => setCompanyAddress(e.target.value)}
              />
            </div>
            <div className="label-input-wrap">
              <label htmlFor="billingFrequency">Select Billing Frequency</label>
              <select
                id="billingFrequency"
                placeholder='Select Billing'
                value={billingFrequency}
                onChange={(e) => setBillingFrequency(e.target.value)}
              >
                <option value="" className="custom-option" >Select Billing</option>
                <option value="monthly">Monthly</option>
                <option value="annually">Annually</option>
                <option value="quarterly">Quarterly</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className='create-btn'>
        <button>Create And Send</button>
      </div>
    </div>
  );
};

export default NewClient;
