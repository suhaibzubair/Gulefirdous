import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";
import Signup from "../../../assets/images/LogeinImg.svg";
import Logo from "../../../assets/images/urqaalogo.svg";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import { Register } from "./Register.d";
import { Icon } from '@iconify/react';
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/useTypedSelector";
import { register } from "../../../redux/Slices/login-registerSlice";
import { ToastContainer, toast } from "react-toastify";
import PasswordValidator from "./ValidatePassword";

export default function Home() {
  const [signupData, setSignupData] = useState<Register>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const handleSignUpClick = () => {
    navigate("/login");
  };
  // let { user,error } = useAppSelector((state: any) => state.user);
  // useEffect(() => {
  //   if (user?.accessToken) {
  //     navigate("/otp");
  // }
  // },[user])
  const handleOtpClick = () => {
    // dispatch(register(signupData));
    // error && toast.error(error, {
    //   position: toast.POSITION.TOP_RIGHT,
    // });
    navigate("/otp");
  };
  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Form Data:", signupData);
  };
  return (
    <>
      <div className="home_container">
        <div
          className="home_image"
          style={{
            backgroundImage: `url(${Signup})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={Logo} alt="Logo" width={300} />
        </div>
        <div className="w_100 signup_container">
          <div className="login_details">
            Already have an account?
            <span>
              {" "}
              <b
                onClick={handleSignUpClick}
                style={{ cursor: "pointer", color: "#10BAAC" }}
              >
                Log in
              </b>{" "}
            </span>
          </div>
          <div>
            <div className="form_heading">Sign up</div>
          </div>
          <form onSubmit={handleFormSubmit}>
            <div className="d_f" style={{ gap: "20px" }}>
              <div className="w_50">
                <label htmlFor="firstName" className="input_label">
                  First Name
                </label>
                <input
                  className="input_field"
                  placeholder="Type Your Name"
                  required
                  value={signupData.firstName}
                  onChange={(e) => {
                    setSignupData((state) => ({
                      ...state,
                      firstName: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="w_50">
                <label htmlFor="lastName" className="input_label">
                  Last Name
                </label>
                <input
                  className="input_field"
                  placeholder="Type Your Last Name"
                  required
                  value={signupData.lastName}
                  onChange={(e) => {
                    setSignupData((state) => ({
                      ...state,
                      lastName: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>
            <div className="m_t_20">
              <label htmlFor="email" className="input_label">
                Email*
              </label>
              <input
                className="input_field"
                placeholder="Enter your email"
                required
                value={signupData.email}
                onChange={(e) => {
                  setSignupData((state) => ({
                    ...state,
                    email: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="m_t_20">
              <label htmlFor="password" className="input_label">
                Password*
              </label>
              <input
                className="input_field"
                type="password"
                placeholder="Create a password"
                required
                value={signupData.password}
                onChange={(e) => {
                  setSignupData((state) => ({
                    ...state,
                    password: e.target.value,
                  }));
                }}
              />
              <div
                className="d_f"
                style={{ margin: "32px auto", alignItems: "center" }}
              >
                <PasswordValidator password={signupData.password} />
                {/* <input type="checkbox" className="home_checkbox" />
              <div className="promotional-text">
                
              </div> */}
              </div>
            </div>
            <div className="m_t_20">
              <label htmlFor="password" className="input_label">
                Confirm Password*
              </label>
              <input
                className="input_field"
                type="password"
                placeholder="Confirm password"
                required
                value={signupData.confirmPassword}
                onChange={(e) => {
                  setSignupData((state) => ({
                    ...state,
                    confirmPassword: e.target.value,
                  }));
                }}
              />
            </div>
            <div
              className="d_f"
              style={{ margin: "32px auto", alignItems: "center" }}
            >
              <input type="checkbox" className="home_checkbox" />
              <div className="promotional-text">
                {" "}
                Sign up to receive the latest product updates, exclusive
                subscriber promotions, and inspiring Hero stories.
              </div>
            </div>
            <div>
              {" "}
              <button
                type="submit"
                className="form_btn"
                onClick={handleOtpClick}
              >
                Continue
              </button>{" "}
              <ToastContainer />
            </div>
          </form>
          <div className="social-icons-wrapper">
            <div className="signup-text-wraper">
              <span className="signup-line-left"></span>
              <div className="signup-text">
                or sign up with
              </div>
              <span className="signup-line-right"></span>
            </div>
            <div className="social-icons">
              <Icon icon="logos:google-icon" height="24" />
              <Icon icon="devicon:apple" height="24" />
              <Icon icon="fa-brands:yahoo" height="24" />
              <Icon icon="devicon:facebook" height="24" />
              <Icon icon="devicon:linkedin" height="24" />
              <Icon icon="skill-icons:twitter" height="24" />
             

            </div>
          </div>

          <div className="urqa-msg">
            <p>
              Urqa will use your data to enhance your experience and to send you
              information. You can change your communication preferences
              anytime. We may use your data as described in our Privacy Policy.
              By clicking “Continue”, you agree to our{" "}
              <span className="terms-and-service">Terms of Service </span> and
              acknowledge that you have read our{" "}
              <span className="privacy-policy">Privacy Policy</span>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
