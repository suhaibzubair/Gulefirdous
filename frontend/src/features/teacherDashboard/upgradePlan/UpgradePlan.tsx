// UpgradePlan.tsx

import React, { useState } from "react";
import "./UpgradePlan.scss";
import CustomButton from "../../../components/shared/button/Button";
import CustomModal from "../../organizations/createOrganization/customModal/CustomModal";
import PricingPlans from "../../pricingPlans/pricingPlans/PricingPlans";

const UpgradePlan: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpgradeButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="upgrade-plan-container">
      <h1 className="upgrade-plan-heading">UPGRADE PLAN</h1>
      <p className="upgrade-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <CustomButton
        className="upgrade-button"
        variant="primary"
        onClick={handleUpgradeButtonClick}
      >
        Upgrade Now
      </CustomButton>

      <CustomModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        customStyles={{}}
      >
        <PricingPlans modelPricingPlan={true} />
      </CustomModal>
    </div>
  );
};

export default UpgradePlan;
