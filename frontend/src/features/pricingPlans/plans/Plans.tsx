import React, { useState } from "react";
import { useAppDispatch } from "../../../hooks/useTypedSelector";
import QuizLandingImg from "../../../assets/images/mainlandingpage.svg";
import { PricingPlan } from "./Plans.d";
import "./Plans.scss";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../components/shared/button/Button";
import { ReactComponent as Play } from "../../../assets/images/buttonPlay.svg";
const PricingComponent = ({modelPricingPlan=false}:any) => {
  const [billingCycle, setBillingCycle] = useState<string>("monthly");
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const handleBillingCycleChange = (cycle: string) => {
    setBillingCycle(cycle);
  };

  const pricingPlans: PricingPlan[] = [
    {
      title: "Free",
      price: billingCycle === "monthly" ? "$0/month" : "$0/year",
      description: "Standard listing submission, active for 30 days",
      features: [
        "Feature 1",
        "Feature 2",
        "Feature 3",
        "Feature 4",
        "Feature 5",
      ],
    },
    {
      title: "Basic",
      price: billingCycle === "monthly" ? "$10/month" : "$100/year",
      description: "Standard listing submission, active for 30 days",
      features: [
        "Basic Feature 1",
        "Basic Feature 2",
        "Basic Feature 3",
        "Basic Feature 4",
        "Basic Feature 5",
      ],
    },
    {
      title: "Professional",
      price: billingCycle === "monthly" ? "$10/month" : "$100/year",
      description: "Standard listing submission, active for 30 days",
      features: [
        "Basic Feature 1",
        "Basic Feature 2",
        "Basic Feature 3",
        "Basic Feature 4",
        "Basic Feature 5",
      ],
    },
    {
      title: "Premium",
      price: billingCycle === "monthly" ? "$10/month" : "$100/year",
      description: "Standard listing submission, active for 30 days",
      features: [
        "Basic Feature 1",
        "Basic Feature 2",
        "Basic Feature 3",
        "Basic Feature 4",
        "Basic Feature 5",
      ],
      sale: true,
    },
  ];

  pricingPlans.forEach((plan) => {
    plan.oldPrice = billingCycle === "monthly" ? "$10" : "$100";
    plan.newPrice = billingCycle === "monthly" ? "$5" : "$50";
  });

  const handlePlansSelection = (plan: any) => {
    console.log(plan);
    localStorage.setItem('selectedPlan', JSON.stringify(plan.title + '-' + plan.price));
    navigate('/register')
  };
  return (
    <div className="main-landingpage-wrapper"
     style={modelPricingPlan?{width:'100%',height:'500px',overflow:'scroll'}:{}}
      >
      {!modelPricingPlan?<div className="Quiz-container-1">
        <div className="left-content-container-1">
          <div className="text-container">
            <h1>
              LMS Unlock culture with <br />ongoing recognition and <br /> feedback
            </h1>
            <p>
              We help managers get rich insights about team culture on a  <br />dashboard. Team members use a fun app to give feedback <br />and recognition to peers.
            </p>
            <div className="landing-page-btns">
              <CustomButton className="left-content-container-But" variant="primary" onClick={() => { }}>Start for free</CustomButton>
              <CustomButton variant="secondary" onClick={() => { }} className="play-btn">
                Learn more</CustomButton>
            </div>
            <p className="promition-text">Simple, fast and no credit card needed</p>
          </div>
        </div>
        <div className="right-content-container-1">
          <img src={QuizLandingImg} alt="LandingImg" />
        </div>
      </div>:null}
      <div className="heading-wraper" >
        <div className="header-container" >
          <h2>Pricing</h2>
          <h4>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old.
          </h4>
        </div>

        <div className="billing-cycle-toggle">
          <h3
            onClick={() => handleBillingCycleChange("monthly")}
            className={billingCycle === "monthly" ? "selected" : ""}
          >
            Monthly
          </h3>
          <h3
            onClick={() => handleBillingCycleChange("yearly")}
            className={billingCycle === "yearly" ? "selected" : ""}
          >
            Yearly
          </h3>
        </div>
      </div>
      <div className="plans-container">
        {pricingPlans.map((plan, index) => (
          <div
            className={`plan ${plan.sale ? "on-sale" : ""}`}
            key={index}
            onClick={() => handlePlansSelection(plan)}
          >
            {plan.sale && <div className="sale-strip">50% off Azadi Sale</div>}
            <div
              className={`uper-wraper ${plan.sale ? "" : ""}`}
            >
              <p className="title">{plan.title}</p>
              {plan.sale ? (
                <div className="striken-price">
                  <s>{plan.oldPrice}</s>
                  <span>/{plan.newPrice}</span>
                </div>
              ) : (
                <h3>{plan.price}</h3>
              )}
              <p>{plan.description}</p>
              <ul>
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>{feature}</li>
                ))}
              </ul>
            </div>
            <button className="get-started-button">GET STARTED</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingComponent;
