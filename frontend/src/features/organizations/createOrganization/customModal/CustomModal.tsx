import React, { FC, ReactNode } from "react";
import "./CustomModal.scss";
import crossImage from "../../../../assets/images/cross ison.png"; 

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  customStyles?: React.CSSProperties;
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="custom-modal">
      <div className="modal-content">
        <div className="close-icon" onClick={onClose}>
          <img src={crossImage} alt="Close" />
        </div>
        {children}
      </div>
    </div>
  );
};

export default CustomModal;



