import React from 'react';
// orginal line
// import { Checkbox, CheckboxChangeEvent } from 'antd';
import { Checkbox} from "antd";
import {CustomCheckboxProps} from './Checkbox.d';


export default function CustomCheckbox({ onChange, checked }: CustomCheckboxProps) {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  return (
    // <Checkbox onChange={handleCheckboxChange} checked={checked} />
    <Checkbox checked={checked}/>
  );
}
