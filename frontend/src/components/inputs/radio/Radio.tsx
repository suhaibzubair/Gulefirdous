// CustomRadio.tsx
import React from 'react';
import { CustomRadioProps } from './Radio.d';

const CustomRadio: React.FC<CustomRadioProps> = ({ onChange, value ,checked}: CustomRadioProps): JSX.Element => {
  return (
    <input
      className='radio-button'
      value={value || ''} // Set a default value to avoid 'undefined'
      onClick={onChange}
      type='radio'
      checked={checked}
    />
  );
};

export default CustomRadio;
