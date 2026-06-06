import React, { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import SchoolCreationForm from "../schoolCreationForm/SchoolCreationForm";
import SelectYourSchoolTemplete from "../selectYourSchoolTemplete/SelectYourSchoolTemplete";

const SchoolSetup = () => {
  const [showTemplates, setShowTemplates] = useState<boolean>(false);
  return (
    <>
      {/* <Sidebar/> */}
      {showTemplates ? (
        <SelectYourSchoolTemplete />
      ) : (
        <SchoolCreationForm setShowTemplates={setShowTemplates} />
      )}
    </>
  );
};

export default SchoolSetup;
