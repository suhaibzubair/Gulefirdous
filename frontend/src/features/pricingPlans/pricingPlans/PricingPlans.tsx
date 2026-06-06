import React , {useState} from 'react';
import Header from '../pricingHeader/PricingHeader';
import Plans from '../plans/Plans';
import Register from '../../../pages/auth/register/Register';


const PricingPlans= ({modelPricingPlan}:any) => {
  return (
    <div>
      <Plans modelPricingPlan={modelPricingPlan} />
    </div>
  );
}

export default PricingPlans;
