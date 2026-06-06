import React, { useState } from "react";
import { ReactComponent as Swamp } from "../../../assets/images/swap.svg";
import { ReactComponent as Edit } from "../../../assets/images/edit.svg";
import { ReactComponent as DownArrow } from "../../../assets/images/chevron-down.svg";
import { ChildDetailProps } from "./ChildDetail.d";
import "./ChildDetail.scss";

const ChildDetail: React.FC<ChildDetailProps> = ({ title, description }) => {
  const [showTabsContent, setShowTabsContent] = useState(false);
  const [arrowRotation, setArrowRotation] = useState(180);

  const toggleTabsContent = () => {
    setShowTabsContent(!showTabsContent);
    setArrowRotation(arrowRotation === 0 ? 180 : 0);
  };

  return (
    <div className="child-detail-wraper">
      <div className="child-section-header">
        <div className="section-title-wraper">
          <Swamp />
          <div className="child-title">
            <div className="title-detial">
              <h4>{title}</h4>
              <p>{description}</p>
            </div>
            <Edit style={{ fontSize: "16px" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildDetail;
