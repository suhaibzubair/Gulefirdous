import React from 'react';
import { Modal, ModalProps } from 'antd';
import {ModalWrapperProps} from './ModalWraper.d'


const ModalWrapper: React.FC<ModalWrapperProps> = ({
  title,
  visible,
  onCancel,
  onOk,
  size,
  children,
}) => {
  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}
      width={size}
    >
      {children}
    </Modal>
  );
};

export default ModalWrapper;
