import React from 'react';
import { Alert, Space } from 'antd';
import {CustomAlertProps} from './Alert.d';

const CustomAlert: React.FC<CustomAlertProps> = ({ type }) => (
  <Space
    direction="vertical"
    style={{
      width: '100%',
    }}
  >
    <Alert
      message="Success Text"
      type={type}
      closeIcon
    />
  </Space>
);

export default CustomAlert;
