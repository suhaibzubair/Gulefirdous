import React, { useState, FormEvent, useEffect, useRef } from "react";
import "./organization.scss";
import { useNavigate } from "react-router-dom";
import schoolSetUp from "../../../assets/images/schoolSetup.png";
import { Organization } from "./organization.d";
import { createOrganization } from "../../../redux/Slices/OrganizationSlice";
import { useAppDispatch } from "../../../hooks/useTypedSelector";
import BAR from "../../../components/shared/mainProgressBar/MainProgressBar";
import uploadImgIcon from "../../../assets/images/upload.svg";
import { Icon } from '@iconify/react';
import { Modal } from "antd";
import "cropperjs/dist/cropper.css";

// import 'react-image-crop/dist/ReactCrop.css';
import axios from "axios";
import CustomModal from "./customModal/CustomModal";
import CustomButton from "../../../components/shared/button/Button";
import { Select } from "antd";
import ImageCropper from "../../../components/shared/ImageCropper/ImageCrop";
// import { click } from "@testing-library/user-event/dist/click";

const { Option } = Select;
export default function OrganizationSetup() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [countries, setCountries] = useState<[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<any>();
  const fileInputRef = useRef<any>(null);
  const cropperRef = useRef<any>(null);
  const [src, setSrc] = useState<any>("");
  // const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      // Checking file size
      if (file.size > 2 * 1024 * 1024) {
        console.error("File size exceeds 2MB limit");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setSrc(result);
      };
      reader.readAsDataURL(file);
    }
    setImgCropModalOpen(true)
  };


  //Side progress bar related data
  const steps = [
    { title: "Org.Info", description: "Please provide your name and email" },
    { title: "LMS info", description: "A few details about your LMS" },
  ];
  const currentStep = 1;

  const [organizationData, setOrganizationData] = useState<Organization>({
    OrganizationName: "",
    OrgUrl: "",
    companyURL: "",
    Thumbnail: "",
    currency: "",
    timezone: "",
    language: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cropedImg, setCropedimg] = useState('')
  const [ImgCropModalOpen, setImgCropModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateOrganization = () => {
    dispatch(createOrganization(organizationData));
    navigate("/lms-setup");
  };
  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const companyName = e.target.value;
    setOrganizationData((state) => ({
      ...state,
      OrganizationName: companyName,
      OrgUrl: `${companyName.toLowerCase()}.urqa.com`,
    }));
  };

  const getCountryDetail = async () => {
    try {
      const res = await axios.get("https://restcountries.com/v3.1/all");

      const countries: any = await Promise.all(
        res?.data?.map(async (country: any) => {
          const currencyCode = country?.currencies
            ? Object.keys(country.currencies)
            : [];

          const currencyData =
            (await currencyCode.length) > 0
              ? country.currencies[currencyCode[0]]
              : null;

          const lanCode = country?.languages
            ? Object.keys(country.languages)
            : [];
          const langData =
            (await lanCode.length) > 0 ? country.languages[lanCode[0]] : null;
          if (currencyData) {
            return {
              name: country.name.official,
              timezones: country.timezones,
              currency: currencyData.name,
              flagsvg: country.flags.svg,
              countryCode: country.cca2,
              language: langData,
            };
          }
        })
      );
      const cont = countries.filter((country: any) => country);
      const options: any = { localeMatcher: "lookup", timeZone: "UTC" };
      const locale = new Intl.DateTimeFormat(
        undefined,
        options
      ).resolvedOptions().locale;
      const [language, countryCode] = locale.split("-");
      const selected = cont?.filter(
        (country: any) => country?.countryCode == countryCode
      );
      console.log("selected", selected[0]);
      if (selected.length) {
        setOrganizationData((state) => ({
          ...state,
          language: selected[0].language,
          currency: selected[0].currency,
          // timezone: selected[0]?.timezone, || getDefaultTimeZone(),
          timezone: selected[0]?.timezone || getDefaultTimeZone(),
        }));
      }
      setCountries(cont);

      return res;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getDefaultTimeZone = () => {
    const options: any = { localeMatcher: "lookup", timeZone: "UTC" };
    const locale = new Intl.DateTimeFormat(undefined, options).resolvedOptions()
      .timeZone;
    return locale;
  };


  useEffect(() => {
    getCountryDetail();
  }, []);

  return (
    <>
      <div className="schoolSetup_home_container">
        <div
          className="Org_home_image"
          style={{
            backgroundImage: `url(${schoolSetUp})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <BAR currentStep={currentStep} steps={steps} />
        </div>

        <div className="signup_container-org">
          <div className="schoolSetup_Card_box_shadow-org">
            <div>
              <div className="SchoolSetup_heading">
                <h1>Organization Setup</h1>
              </div>
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className="m_t_20">
                <label htmlFor="email" className="Org_input_label">
                  Organization Name*
                </label>
                <input
                  className="Org_input_field"
                  placeholder="Your Organization Name"
                  required
                  value={organizationData.OrganizationName}
                  onChange={(e) => handleNameChange(e)}
                />
              </div>

              <div className="m_t_20">
                <label htmlFor="email" className="Org_input_label">
                  organization url
                </label>
                <input
                  className="Org_input_field"
                  placeholder="Text  .urqa.com"
                  value={organizationData.OrgUrl}
                  onChange={(e) =>
                    setOrganizationData((state) => ({
                      ...state,
                      OrgUrl: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="m_t_20">
                <label htmlFor="password" className="Org_input_label">
                  Company Website URL (opt)
                </label>
                <input
                  className="Org_input_field"
                  placeholder=""
                  value={organizationData.companyURL}
                  onChange={(e) =>
                    setOrganizationData((state) => ({
                      ...state,
                      companyURL: e.target.value,
                    }))
                  }
                />
              </div>
              <label className="thumbnail-label">Thumbnail</label>
              <div className="image-container">
                {cropedImg ? (
                  <>
                    <label className="image-upload-label" htmlFor="thumbnailInput">
                      <div
                        className="cropped-image"
                        onMouseEnter={() => {
                          setIsHovered(true);
                        }}
                        onMouseLeave={() => setIsHovered(false)}
                      >
                        <img
                          src={cropedImg}
                          style={{ opacity: isHovered ? '50%' : '100%' }}
                          alt="not found"
                        />
                        {isHovered && (
                          <div className="pencil">
                            <Icon icon="mdi:pencil-box" height="24" />
                          </div>
                        )}
                      </div>
                    </label>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      id="thumbnailInput"
                      className="Org_input_field"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                  </>

                ) : (
                  <>
                    <label
                      className="Org_input_field"
                      htmlFor="thumbnailInput"
                      style={{ textAlign: "center" }}
                    >
                      <span>
                        <img src={uploadImgIcon} alt="" />
                      </span>
                      {src ? "Change Thumbnail" : "Upload Thumbnail PNG"}
                    </label>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      id="thumbnailInput"
                      className="Org_input_field"
                      onChange={handleFileChange}

                      style={{ display: "none" }}
                    />
                  </>
                )}
              </div>

              <Modal
                title="Crop Image"
                open={ImgCropModalOpen}
                onCancel={() => setImgCropModalOpen(false)}
                footer={null}
              >
                {/* Integrate the Demo component with necessary props */}
                <ImageCropper setCropedimg={setCropedimg} images={src} />

                <CustomButton variant="primary" onClick={() => { setImgCropModalOpen(false) }} customStyle={{ marginTop: "15px" }}> Crop & Save</CustomButton>
              </Modal>

              <br />
              <div className="SchoolSetup_form_btn_div">
                <button
                  type="submit"
                  className="Org_form_btn"
                  onClick={handleCreateOrganization}
                >
                  Create
                </button>
              </div>

              {/* Wrap the Timezone-container  */}
              <div className="Timezone-container" onClick={openModal}>
                <p>Your current time zone is</p> <br></br>
                <span style={{ color: "#10BAAC" }}>
                  {organizationData.timezone}
                </span>
                <div>
                  <p>Language is</p>&nbsp;
                  <span style={{ color: "#10BAAC" }}>
                    {organizationData.language}
                  </span>
                </div>
                <div>
                  <p>Currency locale is</p>&nbsp;
                  <span style={{ color: "#10BAAC" }}>
                    {organizationData.currency}
                  </span>

                </div>
              </div>

              {/* CustomModal for Timezone-container */}
              <CustomModal isOpen={isModalOpen} onClose={closeModal}>
                <div
                  className="Timezone-container-modal-content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h1>Localization setting</h1>
                  <div onClick={openModal}>
                    <label
                      htmlFor="timezone"
                      className="AboutYourSchool_input_label"
                    >
                      <p> Select time zone</p> <br />
                    </label>

                    <Select
                      style={{ width: 500 }}
                      value={organizationData.timezone}
                      onChange={(value) =>
                        setOrganizationData((state) => ({
                          ...state,
                          timezone: value,
                        }))
                      }
                    >
                      {countries.map((country: any) => (
                        <Option
                          key={country.timezones[0]}
                          value={country.timezones[0]}
                        >
                          ({country.timezones[0]}) {country.name}
                        </Option>
                      ))}
                    </Select>
                  </div>
                  <div onClick={openModal}>
                    <label
                      htmlFor="language"
                      className="AboutYourSchool_input_label"
                    >
                      <p>Language is</p>
                      <br />
                    </label>
                    <Select
                      style={{ width: 500 }}
                      value={organizationData.language}
                      onChange={(value) =>
                        setOrganizationData((state) => ({
                          ...state,
                          language: value,
                        }))
                      }
                    >
                      {countries?.map((language: any) => (

                        <Option
                          key={language?.language}
                          value={language?.language}
                        >
                          {language?.language} ({language.name})
                        </Option>
                      ))}
                    </Select>
                  </div>
                  <div onClick={openModal}>
                    <label
                      htmlFor="currency"
                      className="AboutYourSchool_input_label"
                    >
                      <p>Currency locale is</p>
                      <br />
                    </label>
                    <Select
                      style={{ width: 500, marginBottom: 20 }}
                      value={
                        organizationData.currency ?? selectedCountry.currency
                      }
                      onChange={(value) => {
                        setOrganizationData((state) => ({
                          ...state,
                          currency: value,
                        }));
                      }}
                    >
                      {countries?.map((currency: any) => (
                        <option
                          key={currency?.currency}
                          value={currency?.currency}
                        >
                          {currency?.currency}
                        </option>
                      ))}

                    </Select>
                  </div>
                </div>
                <div
                  className="button-row-org"
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <CustomButton
                    variant="secondary"
                    onClick={closeModal}
                    customStyle={{ marginLeft: "auto", marginRight: "10px" }}
                  >
                    Cancel
                  </CustomButton>

                  <CustomButton
                    variant="primary"
                    onClick={closeModal}
                    customStyle={{}}
                  >
                    Save & Update
                  </CustomButton>
                </div>
              </CustomModal>
            </form>
          </div>
        </div >
      </div >
    </>
  );
}
