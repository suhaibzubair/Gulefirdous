import React, { useEffect, useState } from "react";
import { ReactComponent as CheveronDown } from "../../../../../assets/images/Chevron2.svg";
import { ReactComponent as CheveronUp } from "../../../../assets/images/Chevron-up.svg";
import { ReactComponent as HomeIcon } from "../../../../assets/images/HomeStudent.svg";
import SubItem from "../subItem/SubItem";
import { useNavigate } from "react-router-dom";
import { ItemProps } from './Item.d';
import './Item.scss';


const Item: React.FC<ItemProps> = ({
  Icon,
  label,
  options,
  selectedOption,
  setSelectedOption,
  optionIndex,
  href,
  isSidebarCollapsed
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [showDiv, setShowDiv] = useState(false);

  const mountedStyle = {
    animation: "inAnimation 250ms ease-in",
  };
  const unmountedStyle = {
    animation: "outAnimation 270ms ease-out",
    animationFillMode: "forwards",
  };

  const navigate = useNavigate();

  const toggleSubMenu = () => {
    setIsMounted(!isMounted);
    if (!showDiv) setShowDiv(true);
  };
  return (
    <div className="student-sidebar-box">
      <div
        className="student-sidebar-item"
        onClick={() => {
          toggleSubMenu();
          href && navigate(href);
        }}>
        <div className="item-content">
          <div className="item-content item-text">
            {Icon && <Icon  className='item-icon'/>}
           { isSidebarCollapsed&& <p className="item-text">{label}</p>}
          </div>
        </div>
        {isSidebarCollapsed ? (options && (
          <CheveronDown
            className={`cheveron ${showDiv ? "cheveron-up" : ""}`}
          />
        )) : null}
      </div>
      {showDiv && options && (
        <div
          className="suboption-wrapper"
          style={isMounted ? mountedStyle : unmountedStyle}
          onAnimationEnd={() => {
            if (!isMounted) setShowDiv(false);
          }}>
          {options &&
            options.map((option, index) => {
              return (
                <SubItem
                  key={index}
                  optionIndex={optionIndex}
                  subOptionIndex={index}
                  Icon={option.icon}
                  label={option.label}
                  href={option.href}
                  setSelectedOption={setSelectedOption}
                  selectedOption={selectedOption}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Item;
