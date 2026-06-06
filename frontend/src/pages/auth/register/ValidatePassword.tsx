import React, { useState, useEffect } from "react";
import CustomCheckbox from "../../../components/inputs/checkbox/Checkbox";
import './Register.scss';

interface PasswordValidatorProps {
  password: string;
}

interface CheckboxStates {
  digit: boolean;
  uppercase: boolean;
  specialCharacter: boolean;
  lowercase: boolean;
}

const PasswordValidator: React.FC<PasswordValidatorProps> = ({ password }) => {
  const [checkboxStates, setCheckboxStates] = useState<CheckboxStates>({
    digit: false,
    uppercase: false,
    specialCharacter: false,
    lowercase: false,
  });

  const checkboxLabels: string[] = [
    "Be at least 8 characters.",
    "have at least 1 uppercase.",
    "have at least 1 number.",
    "have at least 1 lowercase.",
];
  const checkboxKeys = Object.keys(checkboxStates) as Array<
    keyof CheckboxStates
  >;

  useEffect(() => {
    // Update checkbox states based on conditions whenever the password prop changes
    setCheckboxStates({
      digit: password.length > 7,
      uppercase: checkConditions("uppercase", password),
      specialCharacter: checkConditions("specialCharacter", password),
      lowercase: checkConditions("lowercase", password),
    });
  }, [password]);

  const checkConditions = (
    type: keyof CheckboxStates,
    value: string
  ): boolean => {
    switch (type) {
      case "digit":
        return /\d/.test(value);
      case "uppercase":
        return /[A-Z]/.test(value);
      case "specialCharacter":
        return /[!@#$%^&*(),.?":{}|<>]/.test(value) || /\d/.test(value);
      case "lowercase":
        return /[a-z]/.test(value);
      default:
        return false;
    }
  };

  return (
    <div className="password-validator">
      <h4>Password must:</h4>
      {checkboxLabels.map((label, index) => (
        <div key={index}>
          <CustomCheckbox checked={checkboxStates[checkboxKeys[index]]} />
          <label>{label}</label>
        </div>
      ))}
    </div>
  );
};

export default PasswordValidator;
