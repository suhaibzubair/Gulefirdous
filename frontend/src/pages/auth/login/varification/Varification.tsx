import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import "./Varification.scss"
import { useNavigate } from 'react-router-dom'; 
import { useAppSelector,useAppDispatch } from "../../../../hooks/useTypedSelector";
import { getOrganization } from "../../../../redux/Slices/OrganizationSlice";

const Varification = () => {
  const dispatch=useAppDispatch()

  const [otp, setOtp] = useState("");
  const [resentCode, setResendCode] = useState(false);
  useEffect(()=>{
    dispatch(getOrganization())
  },[dispatch])

  const {organization}=useAppSelector((state:any)=>state.organization)
  const navigate=useNavigate()
  const handleVerifyOTP = () => {
    // Implement code to resend the OTP here
    if(organization.length>0){
      navigate('/organization-dashboard')
    }else{
      navigate ("/organization")
    }
    setResendCode(true);
  }
  return (
    <>

      <div id="MainBackground_varification">
        <div id="Background_varification">
          <div id="centered-content_varification">

            <h1 id="heading_varification">Verification Code</h1>
            <p>HI ! First Name</p>
            <p id="para_varification">
              you have receive an authentication code on your email please copy this code.
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
            <button id="centered-button_varification" onClick={handleVerifyOTP}>
              PASTE YOUR OTP
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Varification