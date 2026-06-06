import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import { Collapse } from "antd";
import CustomRadio from "../../../components/inputs/radio/Radio";
import Questions from "../question/Question";
import ReactQuill from "react-quill";
import CustomInput from "../../../components/inputs/input/Input";
import { useNavigate } from "react-router-dom";
const { TabPane } = Tabs;
const { Panel } = Collapse;

export default function QuizBuilder() {
  const navigate=useNavigate()
  const [quizDetail, setQuizDetails] = useState<any>({
    title: "",
    description: "",
    quizType: "practiceQuiz",
    shuffleAnswers: false,
    seeResponses: false,
    allowMultipleAttempts: false,
    showOneQuestionAtATime: false,
    timeInMin: "",
    shareThrough: "accessCode",
    restriction: "assignToEveryone",
  });

  useEffect(() => {
    console.log(quizDetail);
  }, [quizDetail]);

  const handleAssignmentGroupChange = (option: any) => {
    setQuizDetails((prevOptions: any) => ({
      ...prevOptions,
      [option]: !prevOptions[option],
    }));
  };

  return (
    <div className="quizes-container">
      <div className="d-flex">
        <h1>Create A Quiz</h1>
      </div>
      <div>
        <Tabs>
          <TabPane tab="Detail" key="detail">
            <div className="d-flex flex-column" style={{ gap: "10px" }}>
              <Collapse
                size="large"
                expandIconPosition="end"
                style={{ backgroundColor: "white" }}
                className="test"
                bordered={false}
              >
                <Panel
                  header={<h4 style={{ margin: "0" }}>General Info</h4>}
                  key="1"
                >
                  <div className="simple-input">
                    <label className="title">Title Here</label> <br />
                    <CustomInput
                      placeholder="Text"
                      value={quizDetail?.title}
                      onChange={(e) => {
                        setQuizDetails((state: any) => ({
                          ...state,
                          title: e.target.value,
                        }));
                      }}
                    />
                  </div>
                  <div className="textarea-wraper">
                    <label className="textarea-title">Description:</label>
                    <div style={{ height: "auto" }} className="custom-quill">
                      <ReactQuill
                        theme="snow"
                        // value={courseDescription}
                        onChange={(value: string) => {
                          setQuizDetails((state: any) => ({
                            ...state,
                            description: value,
                          }));
                        }}
                        style={{
                          border: "none",
                          width: "100%",
                          background: "none",
                        }}
                      />
                    </div>
                  </div>{" "}
                </Panel>
              </Collapse>
              <Collapse
                size="large"
                expandIconPosition="end"
                style={{ backgroundColor: "white" }}
                className="test"
                bordered={false}
              >
                <Panel
                  header={<h4 style={{ margin: "0" }}>Quiz Type:</h4>}
                  key="1"
                >
                  <div className="d-flex" style={{ gap: "10px" }}>
                    <span className="d-flex align-start gap-5">
                      <CustomRadio
                        value={"practiceQuiz"}
                        checked={quizDetail?.quizType == "practiceQuiz"}
                        onChange={(e: any) =>
                          setQuizDetails((state: any) => ({
                            ...state,
                            quizType: e.target.value,
                          }))
                        }
                      />
                      Practical Quiz
                    </span>
                    <span className="d-flex align-start gap-5">
                      <CustomRadio
                        value={"gradedQuiz"}
                        checked={quizDetail?.quizType == "gradedQuiz"}
                        onChange={(e: any) =>
                          setQuizDetails((state: any) => ({
                            ...state,
                            quizType: e.target.value,
                          }))
                        }
                      />
                      Grade Quiz
                    </span>
                  </div>
                </Panel>
              </Collapse>
              <Collapse
                size="large"
                expandIconPosition="end"
                style={{ backgroundColor: "white" }}
                className="test"
                bordered={false}
              >
                <Panel
                  header={<h4 style={{ margin: "0" }}>Assignment Group:</h4>}
                  key="1"
                >
                  <div className="d-flex flex-column gap-10">
                    <div className="d-flex" style={{ gap: "20px" }}>
                      <span className="d-flex align-center gap-5">
                        <CustomRadio
                          checked={quizDetail.shuffleAnswers === true}
                          onChange={() =>
                            handleAssignmentGroupChange("shuffleAnswers")
                          }
                        />
                        Shuffle Answers
                      </span>
                      <span className="d-flex align-center gap-5">
                        <CustomRadio
                          checked={quizDetail.seeResponses}
                          onChange={() =>
                            handleAssignmentGroupChange("seeResponses")
                          }
                        />
                        Let students see their responses
                      </span>
                      <span className="d-flex align-center gap-5">
                        <CustomRadio
                          checked={quizDetail.allowMultipleAttempts}
                          onChange={() =>
                            handleAssignmentGroupChange("allowMultipleAttempts")
                          }
                        />
                        Allow Multiple Attempts
                      </span>
                      <span className="d-flex align-center gap-5">
                        <CustomRadio
                          checked={quizDetail.showOneQuestionAtATime}
                          onChange={() =>
                            handleAssignmentGroupChange(
                              "showOneQuestionAtATime"
                            )
                          }
                        />
                        Show one question at a time
                      </span>
                    </div>
                    <div className="d-flex" style={{ gap: "20px" }}>
                      <span className="d-flex align-center gap-5">
                        <CustomRadio
                          checked={quizDetail.timeLimit}
                          onChange={() =>
                            handleAssignmentGroupChange("timeLimit")
                          }
                        />
                        Time Limit
                      </span>
                      <button className="d-flex align-center minutes-button p2 gap-5">
                        Minutes
                        <input
                          type="number"
                          className="text-center"
                          style={{
                            height: "24px",
                            width: "34px",
                            fontSize: "16px",
                            fontWeight: 600,
                          }}
                          onChange={(e) => {
                            setQuizDetails((state: any) => ({
                              ...state,
                              timeInMin: e.target.value,
                            }));
                          }}
                        />
                      </button>
                    </div>
                  </div>
                </Panel>
              </Collapse>
              <Collapse
                size="large"
                expandIconPosition="end"
                style={{ backgroundColor: "white" }}
                className="test"
                bordered={false}
              >
                <Panel
                  header={<h4 style={{ margin: "0" }}>Quiz Restriction:</h4>}
                  key="1"
                >
                  <div className="d-flex flex-column gap-10">
                    <span className="d-flex align-center gap-5">
                      <CustomRadio
                        value={"accessCode"}
                        checked={quizDetail?.shareThrough == "accessCode"}
                        onChange={(e: any) =>
                          setQuizDetails((state: any) => ({
                            ...state,
                            shareThrough: e.target.value,
                          }))
                        }
                      />
                      Require An Access Code
                    </span>
                    <span className="d-flex align-center gap-5">
                      <CustomRadio
                        value={"ipAddress"}
                        checked={quizDetail?.shareThrough == "ipAddress"}
                        onChange={(e: any) =>
                          setQuizDetails((state: any) => ({
                            ...state,
                            shareThrough: e.target.value,
                          }))
                        }
                      />
                      Filter IP Address
                    </span>
                  </div>
                </Panel>
              </Collapse>
              <Collapse
                size="large"
                expandIconPosition="end"
                style={{ backgroundColor: "white" }}
                className="test"
                bordered={false}
              >
                <Panel
                  header={<h4 style={{ margin: "0" }}>Quiz Restrictions:</h4>}
                  key="1"
                >
                  <div className="d-flex flex-column gap-10">
                    <span className="d-flex align-center gap-5">
                      <CustomRadio
                        value={"assignToEveryone"}
                        checked={quizDetail?.restriction == "assignToEveryone"}
                        onChange={(e: any) =>
                          setQuizDetails((state: any) => ({
                            ...state,
                            restriction: e.target.value,
                          }))
                        }
                      />
                      Assign To Everyone
                    </span>
                    <span className="d-flex align-center gap-5">
                      <CustomRadio
                        value={"assignToGroup"}
                        checked={quizDetail?.restriction == "assignToGroup"}
                        onChange={(e: any) =>
                          setQuizDetails((state: any) => ({
                            ...state,
                            restriction: e.target.value,
                          }))
                        }
                      />
                      Create A Group
                    </span>
                  </div>
                </Panel>
              </Collapse>
              <div className="d-flex justify-end gap-10">
                <button className="reset-button">Reset All</button>
                <button className="save-btn" onClick={()=>navigate('/create-Question')}>Save & Continue</button>
              </div>
            </div>
          </TabPane>
          <TabPane tab="Questions" key="questions">
            <Questions />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
