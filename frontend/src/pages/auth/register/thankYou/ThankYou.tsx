import React from "react";
import iconspace from "../../../../assets/images/iconspace.png"
import "./Thankyou.scss";
import copy from "../../../../assets/images/copy.png"
import { useNavigate } from 'react-router-dom';
const ThankYou = () => {
  const navigate = useNavigate()


 const handleDashboardClick = () =>{
  navigate("/school-dashboard")
 }
  return (
    <>
      <div className="MainBackground_Thankyou">
        <div className="Background_Thankyou">
          <div className="centered-content_Thankyou">
            <div className="topRightCorner">
              <button className="button">
                <img src={copy} alt="Copy" /> Copy Link
              </button>
            </div>
            <div className="logo_Thankyou">
              <img src={iconspace} alt="iconspace" />
            </div>
            <h1 className="heading_Thankyou">Purchase Success!</h1>
            <p className="para_Thankyou">
              The point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here, <br />content
              here', making it look like readable English.
            </p>
            <p className="resend-code_Thankyou">
              We have shared the link on your email.{" "}
              <span style={{ color: "#10BAAC" }}>numanzafar994@gmail.com</span>
              get the services by clicking on the link
            </p>
            <div className="button-container">
              <button className="centered-button_Thankyou button">Create School later</button>
              <button className="secondary-button_Thankyou button" onClick={handleDashboardClick}>School Dashboard</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThankYou;
