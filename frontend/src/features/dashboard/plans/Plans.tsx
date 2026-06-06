import React from 'react';
import {PlanData} from './Plans.d';
import './Plans.scss';


function Plans() {
  const planData: PlanData[] = [
    {
      name: 'Free',
      annualFee: 0,
      transactionFee: '0',
      numberOfCourses: 1,
      numberOfAdmins: 1,
      numberOfCommunities: 1,
      blank: '2',
      numberOfStudents: 'Unlimited',
      support: 'Email & chatbot',
      dataStorageGB: '1',
    },
    {
      name: 'BASIC',
      annualFee: 0,
      transactionFee: '0',
      numberOfCourses: 1,
      numberOfAdmins: 1,
      numberOfCommunities: 1,
      blank: '2',
      numberOfStudents: 'Unlimited',
      support: 'Email & chatbot',
      dataStorageGB: '1',
    },
    {
      name: 'START',
      annualFee: 0,
      transactionFee: '0',
      numberOfCourses: 1,
      numberOfAdmins: 1,
      numberOfCommunities: 1,
      blank: '2',
      numberOfStudents: 'Unlimited',
      support: 'Email & chatbot',
      dataStorageGB: '1',
    },
  ];

  return (
    <>
      <div className='plans-wrapper'>
        <div className="plans-header">
          <div className="plans-heading">Packages</div>
          <button className="create-plan-button">Create New Plan</button>
        </div>

        {/* Plan Details Table */}
        <div className="plan-details">
          <div className="plan-keys">
            <div>Annual Fee</div>
            <div>Transaction Fee</div>
            <div>Number of Courses</div>
            <div>Number of Admins</div>
            <div>Number of Communities</div>
            <div>Blank</div>
            <div>Number of Students</div>
            <div>Support</div>
            <div>Data Storage</div>
          </div>
          {planData.map((plan, index) => (
            <div key={index} className="plan">
              <div className='plans-title'>{plan.name} Plan</div>
              <div key={index} className="plan-values">
                <div>{plan.annualFee}</div>
                <div>{plan.transactionFee}</div>
                <div>{plan.numberOfCourses}</div>
                <div>{plan.numberOfAdmins}</div>
                <div>{plan.numberOfCommunities}</div>
                <div>{plan.blank}</div>
                <div>{plan.numberOfStudents}</div>
                <div>{plan.support}</div>
                <div>{plan.dataStorageGB}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button className='edit-plan-btn'>Edit plan</button><br/>
    </>
  );
}

export default Plans;
