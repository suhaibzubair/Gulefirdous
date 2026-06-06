import React, { ReactNode, CSSProperties, MouseEventHandler } from "react";
import { CustomButtonProps } from "./Button.d";
import { ReactComponent as Plus } from "../../../assets/images/plus2.svg";
import { Icon } from '@iconify/react';

import "./Button.scss";

export default function CustomButton({
  children,
  variant,
  className,
  customStyle,
  onClick,
  childClasses,
  showPlusButton=false,
}: CustomButtonProps): JSX.Element {
  const buttonClass =
    variant === "primary"
      ? "primary-button"
      : variant === "secondary"
      ? "secondary-button"
      : "default-button";

  return (
    <button
      onClick={onClick}
      style={customStyle}
      className={`${buttonClass} ${className} main-btn`}
    >
      {showPlusButton?<Icon icon="ic:baseline-plus" height="24" />:null}
      
      <span className={`btn-text ${childClasses}`}>{children}</span>
    </button>
  );
}
