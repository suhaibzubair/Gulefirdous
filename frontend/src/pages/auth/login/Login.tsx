import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";
import Signup from "../../../assets/images/signup.png";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/useTypedSelector";
import { login } from "../../../redux/Slices/login-registerSlice";
import { Login } from "./Login.d";
import { ToastContainer, toast } from "react-toastify";
import ForgetPassword from "./forgetPassword/ForgetPassword";
export default function Home() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let { user, error } = useAppSelector((state: any) => state.user);
  const [showForget,setShowForget]=useState<boolean>(false)
  const [loginData, setLoginData] = useState<Login>({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user && user?.accessToken) {
      navigate("/varification");
    }
  }, [user]);

  const handleVarificationClick = () => {
    dispatch(login(loginData));
    error &&
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
      });
  };
  const handleForget=()=>{
    setShowForget(true)
  }
  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <>
    {showForget?<ForgetPassword oldemail={loginData.email} setShowForget={ setShowForget } />:
      <div className="home_container_Signin">
        <div
          className="home_image_Signin"
          style={{
            backgroundImage: `url(${Signup})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        <div className="w_100 signup_container_Signin">
          <div>
            <div className="form_heading_Signin">Log in</div>
          </div>
          <form onSubmit={handleFormSubmit}>
            <div className="d_f" style={{ gap: "20px" }}></div>
            <div className="m_t_20">
              <label htmlFor="email" className="input_label_Signin">
                Email*
              </label>
              <input
                className="input_field_Signin"
                placeholder="Enter your email"
                value={loginData.email}
                onChange={(e) => {
                  setLoginData((state) => ({
                    ...state,
                    email: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="m_t_20">
              <label htmlFor="password" className="input_label_Signin">
                Password*
              </label>
              <input
                className="input_field_Signin"
                type="password"
                placeholder="Create a password"
                value={loginData.password}
                onChange={(e) => {
                  setLoginData((state) => ({
                    ...state,
                    password: e.target.value,
                  }));
                }}
              />
            </div>
            <div
              className="input_password_details_letter_spac_1_3_Signin"
              onClick={handleForget}
              style={{ marginTop: "6px" }}
            >
              Forget Password.
            </div>

            <div>
              <button
                type="submit"
                className="form_btn_Signin"
                onClick={handleVarificationClick}
              >
                Log in
              </button>
              <ToastContainer />
            </div>
          </form>

          <div className="ending_details_Signin">
            Don't have an account ?
            <span style={{ color: "#0D9488" }}>
              <b
                onClick={() => {
                  navigate("/register");
                }}
              >
                Sign up
              </b>
            </span>
          </div>
        </div>
      </div>
}
    </>
  );
}
