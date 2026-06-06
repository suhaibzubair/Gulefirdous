import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import Otp from "../../../../assets/images/Otp.png";
import "./OtpPage.scss";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../../components/shared/button/Button";

function OtpPage() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [resentCode, setResendCode] = useState(false);
useEffect(()=>{
  if (otp.length === 6) {
    navigate("/organization");
  }
},[otp])
  const handleResendCode = () => {
    setResendCode(true);
  };

  const handleSignUpNavigate = () => {
    navigate('/register');
  };

  const handleNextClick = () => {
   
  };

  return (
    <div className="MainBackground">
      <div className="Background">
        <div className="centered-content">
          <div className="logo">
            <img src={Otp} alt="otp image" />
          </div>
          <h1 className="otp-heading" style={{ justifyContent: "center" }}>
            OTP Authentication
          </h1>
          <p className="para">
            please check the email linked to your account to retrieve your verification code
          </p>
          <div className="otp-input">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
              shouldAutoFocus
            />
          </div>

          <p className="resend-code">
            I didn't receive the code.{" "}
            <span style={{ color: "#10BAAC" }} onClick={handleResendCode}>
              {" "}
              Resend Code
            </span>
          </p>
          <br />
          <CustomButton
            variant="primary"
            className="centered-button"
            onClick={handleNextClick}
          >
            Next
          </CustomButton>
          <p className="terms-and-conditions">
            New user?{" "}
            <span style={{ color: "#10BAAC" }} onClick={handleSignUpNavigate}>
              Signup here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default OtpPage;
