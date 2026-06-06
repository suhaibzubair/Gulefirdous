import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateEssay = ({ index, question, setQuestions }: any) => {
  return (
    <div style={{ marginTop: "32px" }} className="d-flex flex-column gap-10">
      <h4>Essay Description:</h4>
      <ReactQuill
        style={{ height: "400px" }}
        theme="snow"
        value={question.discription}
        onChange={(e:any)=>{    setQuestions((prevQuestions: any) => {
          const newQuestions = [...prevQuestions];
          const thirdQuestion = newQuestions[index];
          if (thirdQuestion) {
            thirdQuestion.discription = e;
          }
          return newQuestions;
        });}}
      />
    </div>
  );
};

export default CreateEssay;
