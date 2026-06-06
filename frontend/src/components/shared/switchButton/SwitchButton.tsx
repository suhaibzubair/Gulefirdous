import React, { useState } from 'react';
import { Switch } from 'antd';

export default function SwitchButton(): JSX.Element {
  const [active, setActive] = useState<boolean>(false);

  return (
    <Switch
      className='switch-color'
      style={active ? { backgroundColor: '#10BAAC' } : {}}
      onChange={() => {
        setActive(!active);
      }}
    />
  );
}
