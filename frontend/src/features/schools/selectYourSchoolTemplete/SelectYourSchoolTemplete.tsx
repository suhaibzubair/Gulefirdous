import React, { useState, FormEvent, ChangeEvent } from "react";
import "./SelectYourSchoolTemplete.scss";
import { useNavigate } from "react-router-dom";
import selectYourSchoolTemplete from "../../../assets/images/selectYourSchoolTemplete.png";
import templete from "../../../assets/images/Templete.png";
import templete1 from "../../../assets/images/Templete(1).png";

export default function SelectYourSchoolTemplete() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/organization-dashboard");
  };

  return (
    <>
      <div className="SelectYourSchoolTemplete_home_container">
        <div
          className="SelectYourSchoolTemplete_home_image"
          style={{
            backgroundImage: `url(${selectYourSchoolTemplete})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        <div className="SelectYourSchoolTemplete_container ">
          <div className="SelectYourSchoolTemplete_heading">
            <h1>Select your school temple</h1>
          </div>
          <div className="SelectYourSchoolTemplete_para">
            Lorem ipsum is a placeholder text commonly used to demonstrate the
            visual form of a document or a typeface without relying on
            meaningful content.
          </div>
          <div className="Card_box_shadow">
            <div className="SelectYourSchoolTemplete_images">
              <img
                src={templete}
                onClick={handleNext}
                width="47%"
                alt="templete "
                className="SelectYourSchoolTemplete_image"
              />
              <img
                src={templete1}
                onClick={handleNext}
                width="47%"
                alt="templete1"
                className="SelectYourSchoolTemplete_image"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
