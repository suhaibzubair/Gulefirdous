import React, { useState } from "react";
import CustomSelect from "../../../components/inputs/select/Select";
import CreateMultipleChoiceQuestions from "../createMultipleChoiceQuestions/CreateMultipleChoiceQuestions";
import CreateTrueFalseQuestions from "../createTrueFalseQuestions/CreateTrueFalseQuestions";
import CreateFillBlankQuestions from "../createFillBlankQuestions/CreateFillBlankQuestions";
import CreateEssay from "../createEssay/CreateEssay";
import { Option, CreateQuestionsProps } from "./CreateQuestions.d";
import "./CreateQuestion.scss";
import FillBlankGenerator from "../fillBlankGenerator/FillBlankGenerator";

export default function CreateQuestions({
  index,
  question,
  setQuestions,
}: CreateQuestionsProps) {
  const options: Option[] = [
    {
      label: "True/False",
      value: "binary",
    },
    {
      label: "Fill In The Blanks",
      value: "blanks",
    },
    {
      label: "Multiple Choice Answers",
      value: "multi",
    },
    {
      label: "Matching",
      value: "match",
    },
    {
      label: "Essay Questions",
      value: "essay",
    },
  ];

  return (
    <div className="create-question-container">
      <CustomSelect
        variant="single-select"
        selected={question.type}
        handleChange={(value: any) =>
          setQuestions((prevQuestions: any) => {
            const newQuestions = [...prevQuestions];
            const thirdQuestion = newQuestions[index];
            if (thirdQuestion) {
              thirdQuestion.type = value;
            }
            return newQuestions;
          })
        }
        options={options}
      />

      {question.type.includes("multi") && (
        <CreateMultipleChoiceQuestions
          setQuestions={setQuestions}
          question={question}
          index={index}
        />
      )}
      {question.type.includes("binary") && (
        <CreateTrueFalseQuestions
          setQuestions={setQuestions}
          question={question}
          index={index}
        />
      )}
      {question.type.includes("blanks") && (
        <CreateFillBlankQuestions
          setQuestions={setQuestions}
          question={question}
          index={index}
        />
      )}
      {question.type.includes("match") && <div>Match</div>}
      {question.type.includes("essay") && (
        <CreateEssay
          setQuestions={setQuestions}
          question={question}
          index={index}
        />
      )}
    </div>
  );
}
