import React, { useEffect, useState } from "react";
import CustomButton from "../../../components/shared/button/Button";
import CustomSelect from "../../../components/inputs/select/Select";
import { ReactComponent as CrossIcon } from "../../../assets/images/cross-white.svg";
import { ReactComponent as PlusIcon } from "../../../assets/images/plus.svg";
import { Choice } from "./CreateMultipleChoiceQuestions.d";
import Input from "antd/es/input/Input";

const CreateMultipleChoiceQuestions = ({
  index,
  question,
  setQuestions,
}: any) => {
  const [multiSelect, setMultiSelect] = useState(false);

  useEffect(() => {
    setQuestions((prevQuestions: any) => {
      const newQuestions = [...prevQuestions];
      const thirdQuestion = newQuestions[index];
      if (thirdQuestion) {
        thirdQuestion.selectType =
          multiSelect === true ? "multi-select" : "single-select";
      }
      return newQuestions;
    });
  }, [multiSelect]);

  const handleAdd = () => {
    setQuestions((prevQuestions: any) => {
      const newQuestions = [...prevQuestions];
      const thirdQuestion = newQuestions[index];
      if (thirdQuestion) {
        console.log(thirdQuestion);
        thirdQuestion.option[thirdQuestion?.option?.length ?? 0] = {
          opt: "",
          correct: false,
        };
      }
      return newQuestions;
    });
  };

  const removeItemAtIndex = (indexToRemove: number) => {
    setQuestions((prevQuestions: any) => {
      const newQuestions = [...prevQuestions];
      const currentQuestion = newQuestions[index];
      if (currentQuestion) {
        currentQuestion.option = currentQuestion.option.filter(
          (_: {}, i: number) => i !== indexToRemove
        );
      }
      return newQuestions;
    });
  };

  const questionOptions = [
    {
      label: "Correct",
      value: "correct",
    },
    {
      label: "Incorrect",
      value: "incorrect",
    },
  ];

  return (
    <div>
      <div>
        <label>Write Your Statement Here</label>
        <Input
          type="text"
          onChange={(e: any) => {
            setQuestions((prevQuestions: any) => {
              const newQuestions = [...prevQuestions];
              const thirdQuestion = newQuestions[index];
              if (thirdQuestion) {
                thirdQuestion.discription = e.target.value;
              }
              return newQuestions;
            });
          }}
        />
      </div>
      <button
        onClick={() => setMultiSelect(false)}
        className={`select-button ${!multiSelect && "selected-select-button"}`}
      >
        <h4>Single Select</h4>
      </button>
      <button
        onClick={() => setMultiSelect(true)}
        className={`select-button ${multiSelect && "selected-select-button"}`}
      >
        <h4>Multi Select</h4>
      </button>
      <div style={{ marginTop: "32px" }} className="d-flex flex-column gap-10">
        {question.option.map((opt: {}, i: number) => {
          return (
            <div key={i} className="d-flex gap-5">
              <div
                style={{
                  padding: "10px",
                  backgroundColor: "#10BAAC",
                  color: "white",
                  borderRadius: "4px",
                }}
              >
                <h3 style={{ margin: "0" }}>{i + 1}.</h3>
              </div>
              <div
                style={{
                  flexBasis: "70%",
                  backgroundColor: "#EBEAED",
                  padding: "11px 12px 11px 12px",
                }}
              >
                <h4 style={{ margin: "0" }}>
                  <Input
                    type={"text"}
                    onChange={(e: any) => {
                      setQuestions((prevQuestions: any) => {
                        const newQuestions = [...prevQuestions];
                        const thirdQuestion = newQuestions[index];
                        if (thirdQuestion) {
                          thirdQuestion.option[i] = {
                            opt: e.target.value,
                            correct: false,
                          };
                        }
                        return newQuestions;
                      });
                    }}
                  />
                </h4>
              </div>
              <div style={{ flexBasis: "20%" }}>
                <CustomSelect
                  options={questionOptions}
                  handleChange={(e: any) => {
                    setQuestions((prevQuestions: any) => {
                      const newQuestions = [...prevQuestions];
                      const thirdQuestion = newQuestions[index];
                      if (thirdQuestion) {
                        thirdQuestion.option[i].correct =
                          e === "correct" ? true : false;
                      }
                      return newQuestions;
                    });
                  }}
                  selected={question.option[i].correct===true?"correct":'incorrect'}
                  variant={"single-select"}
                />
              </div>
              <div
                onClick={() => removeItemAtIndex(index)}
                style={{
                  padding: "10px",
                  backgroundColor: "#F04B61",
                  borderRadius: "6px",
                }}
                className="d-flex align-center"
              >
                <CrossIcon />
              </div>
            </div>
          );
        })}
        <div onClick={handleAdd} className="d-flex align-center gap-10 pointer">
          <PlusIcon />{" "}
          <span
            style={{ fontSize: "14px", fontWeight: "500", color: "#08496D" }}
          >
            More Options
          </span>
        </div>
      </div>
    </div>
  );
};

export default CreateMultipleChoiceQuestions;
