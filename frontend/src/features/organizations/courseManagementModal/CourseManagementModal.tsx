
import React, { useState } from "react";
import CustomModal from "../../organizations/createOrganization/customModal/CustomModal";
import "./courseManagementModal.css";
import CustomButton from "../../../components/shared/button/Button";

import imageUrl1 from "../../../assets/images/blankChoseTemplete.png";
import imageUrl2 from "../../../assets/images/choseTemplete.png";
import imageUrl3 from "../../../assets/images/miniChoseTemplet.png";
import imageUrl4 from "../../../assets/images/flagshipchosetemplete.png";
// import { ReactComponent as imageUrl1} from "../../../assets/images/blankChoseTemplete.svg";
// import { ReactComponent as imageUrl2} from "../../../assets/images/choseTemplete.svg";
// import { ReactComponent as imageUrl3} from "../../../assets/images/miniChoseTemplet.svg";
// import { ReactComponent as imageUrl4} from "../../../assets/images/flagshipchosetemplete.svg";




const CourseManagementModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const sampleData = [
    {
      id: 1,
      imageUrl: imageUrl1,
      heading: "Blank",
      text: "Start fresh and build your own course to watch your specific curriculum needs.",
    },
    {
      id: 2,
      imageUrl: imageUrl2,
      heading: "Pre-Sell",
      text: "Start fresh and build your own course to watch your specific curriculum needs.",
    },
    {
      id: 3,
      imageUrl: imageUrl3,
      heading: "Mini-course",
      text: "Start fresh and build your own course to watch your specific curriculum needs.",
    },
    {
      id: 4,
      imageUrl: imageUrl4,
      heading: "Flagship Course",
      text: "Start fresh and build your own course to watch your specific curriculum needs.",
    },
  ];

  return (
    <>
      <button onClick={openModal}>Open Course Management Modal</button>

      <CustomModal isOpen={isModalOpen} onClose={closeModal}>
        <div>
          <h2 style={{ color: "#081735", fontSize: "33px" ,}}>Choose Template</h2>
        </div>
        <div className="modal-row">
          {sampleData.map((item) => (
            <div className="modal-item" key={item.id}>
              <img src={item.imageUrl} alt={`Image ${item.id}`} />
              <h3 style={{ color: "black", fontSize: "20px" }}>{item.heading}</h3>
              <p>{item.text}</p>
              <CustomButton
                className="centered-button-modal"
                variant="primary"
                onClick={() => {}}
              >
                Selected
              </CustomButton>
            </div>
          ))}
        </div>
        <div className="modal-buttons">
          <CustomButton variant="secondary" onClick={() => {}}>
            Cancel
          </CustomButton>
          <CustomButton variant="primary" onClick={() => {}}>
            Save
          </CustomButton>
        </div>
      </CustomModal>
    </>
  );
};

export default CourseManagementModal;
