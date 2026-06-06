import React, { useState, FormEvent, ChangeEvent } from "react";
import Select from "../../components/inputs/select/Select";
import "./LmsSetup.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  updateAboutYourLmsData,
  selectAboutYourLmsData,
  FormData,
} from "../../redux/Slices/aboutYourLmsSlice";
import { useNavigate } from "react-router-dom";
import bg from "../../assets/images/bg.png";
import BAR from "../../components/shared/mainProgressBar/MainProgressBar";

import {
  IdentifyYourSelf,
  WorkInYourBusiness,
  BusinessIn,
  LearingBusiness,
  EmailList,
} from "../../constants/Constants";
import CustomButton from "../../components/shared/button/Button";

export default function AboutYourSchool({ updateSchoolData }: any) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [aboutData, setAboutData] = useState<FormData>({
    IdentifyYourSelf: "",
    WorkInYourBusiness: "",
    BusinessIn: "",
    LearingBusiness: "",
    EmailList: "",
  });

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Form Data:", aboutData);
  };

  const handleInputChange = (name: string, value: string) => {
    console.log(name, value);
    dispatch(updateAboutYourLmsData({ ...aboutData, [name]: value }));
  };
  const steps = [
    { title: 'Org.Info', description: 'Please provide your name and email.' },
    { title: 'LMS info', description: 'A few details about your School.' },

  ];
  const currentStep = 3;

  const handleNextClick = () => {
    navigate("/organization-dashboard");
  };

  //   const handleNextClick = () => {
  //     // dispatch(updateSchoolData(aboutData));
  //     updateSchoolData({ ...aboutData, AboutYourSchool: false, template: true });
  //     // console.log("schoolCreation", schoolCreation);
  //     // dispatch(createSchool(schoolCreation.school));
  //     // navigate('/select-school');
  //   };

  return (
    <>
      <div className="AboutYourSchool_home_container">
        <div
          className="Org_home_image"
          style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <BAR currentStep={currentStep} steps={steps} />
        </div>

        <div className="w_100_Lms_container">
          <div className="AboutYourLMS_heading">
            <h1> About your LMS</h1>
          </div>
          <div className="AboutYourLMS_para">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </div>
          <form onSubmit={handleFormSubmit}>
            <div className="m_t_20">
              <label htmlFor="email" className="AboutYourLMS_input_label">
                How would you identify yourself?
              </label>
              <Select
                options={IdentifyYourSelf}
                handleChange={(value: any) =>
                  handleInputChange("yourIdentity", value)
                }
                variant={"single-select"}
              />
            </div>
            <div className="m_t_20">
              <label htmlFor="email" className="AboutYourLMS_input_label">
                How many people currently work in your business?
              </label>
              <Select
                options={WorkInYourBusiness}
                handleChange={(value: any) =>
                  handleInputChange("currentlyWorkingPeople", value)
                }
                variant={"single-select"}
              />
            </div>{" "}
            <div className="m_t_20">
              <label htmlFor="email" className="AboutYourLMS_input_label">
                Which industry is your business in?
              </label>
              <Select
                options={BusinessIn}
                handleChange={(value: any) =>
                  handleInputChange("industryName", value)
                }
                variant={"single-select"}
              />
            </div>{" "}
            <div className="m_t_20">
              <label htmlFor="email" className="AboutYourLMS_input_label">
                Do you already have a learning business??
              </label>
              <Select
                options={LearingBusiness}
                handleChange={(value: any) =>
                  handleInputChange("isAlreadyHaveBusiness", value)
                }
                variant={"single-select"}
              />
            </div>
            <div className="m_t_20">
              <label htmlFor="email" className="AboutYourLMS_input_label">
                Do you already have a following or email list?
              
              </label>
              <Select
              
                options={EmailList}
                handleChange={(value: any) =>
                  handleInputChange("isAlreadyHavemail", value)
                }
                variant={"single-select"}
              />
            </div>
            <div>
              <div className="AboutYourLMS_form_btn_div">
                {" "}
                <CustomButton
                  onClick={() => {}}
                  variant="secondary"
                  className="AboutYourLMS_form_btn_1"
                >
                  Cancel
                </CustomButton>
                <CustomButton
                 variant="primary"
                  className="AboutYourLMS_form_btn"
                  onClick={handleNextClick}
                >
                  Next
                </CustomButton>{" "}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
