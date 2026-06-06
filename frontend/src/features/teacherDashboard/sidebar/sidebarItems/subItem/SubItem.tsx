import React from "react";
import { useNavigate } from "react-router-dom";
import {SubitemProps} from './SubItem.d';
import './SubItem.scss';


const SubItem: React.FC<SubitemProps> = ({
  Icon,
  label,
  href,
  selectedOption,
  setSelectedOption,
  subOptionIndex,
  optionIndex,
}) => {
  const navigate = useNavigate();

  const handleRouteChange = (route: string) => {
    navigate(route);
  };

  return (
    <div
      className={`subitem-item ${
        selectedOption.option === optionIndex &&
        selectedOption.subOption === subOptionIndex
          ? "subitem-item-selected"
          : ""
      }`}
      onClick={() => {
        setSelectedOption(optionIndex, subOptionIndex);
        handleRouteChange(href);
      }}
    >
      <div className="subitem-item-content">
        {Icon && (
          <Icon
            className={`subitem-item-icon ${
              selectedOption.option === optionIndex &&
              selectedOption.subOption === subOptionIndex
                ? "subitem-item-icon-selected"
                : ""
            }`}
          />
        )}
        <p
          className={`subitem-item-text ${
            selectedOption.option === optionIndex &&
            selectedOption.subOption === subOptionIndex
              ? "subitem-item-text-selected"
              : ""
          }`}
        >
          {label}
        </p>
      </div>
    </div>
  );
};

export default SubItem;
