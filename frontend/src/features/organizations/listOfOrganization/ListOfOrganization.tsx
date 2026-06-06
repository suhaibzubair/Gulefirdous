import React, { useState } from "react";
import CustomButton from "../../../components/shared/button/Button";
import "./ListOfOrganization.scss";
import {
  ListOfOrganizationData,
  monthlyPrices,
  yearlyPrices,
  rows,
} from "../../../constants/Constants";

const ListOfOrganization = () => {


const [selectedToggle, setSelectedToggle] = useState<string>("Monthly");
const prices = selectedToggle === "Monthly" ? monthlyPrices : yearlyPrices;
const [selectedPriceIndex, setSelectedPriceIndex] = useState<number | null>(null);

const handleToggleChange = (toggle: string) => {
  setSelectedToggle(toggle);
  setSelectedPriceIndex(null); 
}

const handleRadioChange = (index: number) => {
  setSelectedPriceIndex(index);
};

  return (
    <>
      <div id="ListOfOrganization-container">
        <div className="org-heading" style={{ margin: "20px 30px" }}>
          <h1 style={{ margin: "0px" }}>List of Organizations</h1>
          <CustomButton
            variant="primary"
            showPlusButton={true}
            customStyle={{ height: "50px" }}
            onClick={() => {}}
            
          >
            Create An Organization
          </CustomButton>
        </div>

        <div className="ListOfOrganization-content">
          {ListOfOrganizationData.map((row, index) => (
            <div key={index} className="organization-item">
              <div className="content-left">
                <div className="row-header">
                  <h2>{row.heading}</h2>
                  {/* <input type="radio" name="organizationRadio" /> */}
                  <input
                    type="radio"
                    name="organizationRadio"
                    onChange={() => handleRadioChange(index)}
                    checked={selectedPriceIndex === index}
                  />
                </div>
                <p>{row.para}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="ListOfOrganization-toggle">
          <h3
            onClick={() => handleToggleChange("Monthly")}
            className={selectedToggle === "Monthly" ? "selected" : ""}
          >
            Monthly
          </h3>
          <h3
            onClick={() => handleToggleChange("Yearly")}
            className={selectedToggle === "Yearly" ? "selected" : ""}
          >
            Yearly
          </h3>
        </div>

        <div className="grid-container">
          {/* {prices.map((item, index) => (
            <div key={index} className="grid-item">
              <div className="heading-wrapper">
                <h1 style={{ color: "#10BAAC" }}>{item.price}</h1>
                <h6 style={{ color: "grey" }}>{item.smallHeading}</h6>
              </div>
              <button>{item.buttonText}</button>
            </div>
          ))} */}


            {prices.map((item, index) => (
            <div key={index} className="grid-item">
              <div className="heading-wrapper">
                <h1 style={{ color: "#10BAAC" }}>{selectedPriceIndex !== null ? prices[selectedPriceIndex].price : item.price}</h1>
                <h6 style={{ color: "grey" }}>{selectedPriceIndex !== null ? prices[selectedPriceIndex].smallHeading : item.smallHeading}</h6>
              </div>
              <button>{selectedPriceIndex !== null ? prices[selectedPriceIndex].buttonText : item.buttonText}</button>
            </div>
          ))}



          {rows.slice(3).map((row, index) => (
            <div key={index} className="grid-item-inner-container">
              {row.imgSrc ? (
                <div className="image-wrapper">
                  <img
                    src={row.imgSrc}
                    alt={`Row ${index + 13} Image`}
                    className="custom-img-class"
                  />
                </div>
              ) : (
                <>
                  <div className="grid-item2">
                    <h3>{row.heading}</h3>
                    <div className={"red"}>
                      <h2
                        style={{
                          textAlign: "left",
                          display: "block",
                          padding: "5px",
                          margin: "0",
                          fontSize:"17px"
                        }}
                      >
                        {row.headings}
                      </h2>
                      <p>{row.para}</p>
                      <span
                        style={{
                          textAlign: "left",
                          display: "block",
                          padding: "5px",
                          color: "#858a9e",
                        }}
                      >
                        {row.para2}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ListOfOrganization;



