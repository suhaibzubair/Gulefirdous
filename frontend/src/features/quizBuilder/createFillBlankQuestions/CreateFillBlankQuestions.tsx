import React, { useState } from "react";
import CustomButton from "../../../components/shared/button/Button";
import { ReactComponent as PlusIcon } from "../../../assets/images/plus.svg";
import FillBlankGenerator from "../fillBlankGenerator/FillBlankGenerator";
import { Question } from "./CreateFillBlankQuestions.d";

const CreateFillBlankQuestions = ({ index, question, setQuestions }: any) => {
  // const [questions, setQuestions] = useState<Question[]>([]);

  // const handleAdd = () => {
  //   setQuestions([...questions, { text: `Question ${questions.length + 1}` }]);
  // };

  // const removeItemAtIndex = (indexToRemove: number) => {
  //   setQuestions((prevItems) => prevItems.filter((_, index) => index !== indexToRemove));
  // };

  return (
    <div>
      <FillBlankGenerator
        index={index}
        question={question}
        setQuestions={setQuestions}
      />
      {/* <div style={{ marginTop: '32px' }} className="d-flex flex-column gap-10">
        {questions.map((question, index) => {
          return 
        })}
      </div>
      <CustomButton
        variant="primary" // Add the variant property here
        onClick={handleAdd}
        customStyle={{
          height: '44px',
          padding: '10px',
          marginTop: '32px',
          backgroundColor: 'rgba(16, 186, 172, 0.05)',
          color: '#10BAAC',
        }}
        className="w-100"
        childClasses="d-flex align-center justify-center gap-5"
      >
        <PlusIcon /> More Fill In The Blanks
      </CustomButton> */}
    </div>
  );
};

export default CreateFillBlankQuestions;
