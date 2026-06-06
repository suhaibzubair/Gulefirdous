import React, { ChangeEvent, FocusEvent, CSSProperties } from 'react';
import { Input } from 'antd';
import {CustomInputProps} from './Input.d';
import './Input.scss';

export default function CustomInput({
  placeholder,
  customClass,
  height,
  width,
  customStyles,
  value,
  onChange,
  onBlur,
}: CustomInputProps): JSX.Element {
  return (
    <Input
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      placeholder={placeholder}
      style={{ ...customStyles, height, width }}
      className={`custom-input ${customClass}`}
    />

    
  );
}
