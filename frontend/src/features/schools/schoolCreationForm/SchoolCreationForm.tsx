import React, { useState, FormEvent, ChangeEvent } from "react";
import "./SchoolCreationForm.scss";
import { useNavigate } from "react-router-dom";
import schoolSetUp from "../../../assets/images/schoolSetup.png";
import back from "../../../assets/images/Back.png";
import { SchoolCreation } from "./SchoolCreationForm.d";
import { updateSchoolData } from "../../../redux/Slices/SchoolSlice";
import { useAppDispatch } from "../../../hooks/useTypedSelector";
interface Props {
  setShowTemplates: React.Dispatch<React.SetStateAction<boolean>>;
}
const SchoolCreationForm : React.FC<Props>=({setShowTemplates}) =>{
  const [formData, setFormData] = useState<SchoolCreation>({
    textTitle: "",
    textUrl: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  // const screen1Data = useSelector((state: RootState) => state.schoolCreation.screen1Data);

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Form Data:", formData);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignUpClick = () => {
    dispatch(updateSchoolData(formData));
    setShowTemplates(true)
  };

  return (
    <>
      <div className="schoolSetup_home_container">
        <div
          className="schoolSetup_home_image"
          style={{
            backgroundImage: `url(${schoolSetUp})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        <div className="w_100 signup_container">
          <div className="schoolSetup_Card_box_shadow">
            <div>
              <img src={back} alt="back-arrow" />
              <div className="SchoolSetup_heading">
                <h1>School Setup</h1>
              </div>
              {/* <div className='SchoolSetup_para'>Already have an account?
          <span > <b onClick={handleSignUpClick} style={{cursor:"pointer",color:"#10BAAC"}}>Log in</b> </span>  */}
              {/* </div> */}
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className="m_t_20">
                <label htmlFor="email" className="SchoolSetup_input_label">
                  School Title
                </label>
                <input
                  className="SchoolSetup_input_field"
                  type="text"
                  name="textTitle"
                  id="textTitle"
                  placeholder="Title "
                  value={formData.textTitle}
                  onChange={handleInputChange}
                />
              </div>
              <div className="m_t_20">
                <label htmlFor="password" className="SchoolSetup_input_label">
                  School URL
                </label>
                <input
                  className="SchoolSetup_input_field"
                  type="text"
                  name="textUrl"
                  id="textUrl"
                  placeholder="www.example.com"
                  value={formData.textUrl}
                  onChange={handleInputChange}
                />
              </div>
              <div className="m_t_20">
                <label htmlFor="password" className="SchoolSetup_input_label">
                  Set password
                </label>
                <input
                  className="SchoolSetup_input_field"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="*********"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <br />
              <div className="SchoolSetup_form_btn_div">
                {" "}
                <button
                  type="submit"
                  className="SchoolSetup_form_btn"
                  onClick={handleSignUpClick}
                >
                  Next
                </button>{" "}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default  SchoolCreationForm