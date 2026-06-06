import React, { useState } from 'react';
import Input from '../../../components/inputs/input/Input';

export default function TrueFalse({ index, question, setQuestions }: any) {

    return (
        <div>
            <span className='p2'>Question Statement:</span>
            <Input customStyles={{ height: '88px' }} onChange={(e)=>{
                setQuestions((prevQuestions: any) => {
                    const newQuestions = [...prevQuestions];
                    const thirdQuestion = newQuestions[index];
                    if (thirdQuestion) {
                      thirdQuestion.discription=e.target.value
                    }
                    return newQuestions;
                  })
            }} />
            <div className='d-flex align-center gap-10'>
                <h4>Set As</h4>
                <button
                    style={{ margin: "0px", width: "56px" }}
                    onClick={() => { setQuestions((prevQuestions: any) => {
                        const newQuestions = [...prevQuestions];
                        const thirdQuestion = newQuestions[index];
                        if (thirdQuestion) {
                          thirdQuestion.answer=true
                        }
                        return newQuestions;
                      });}}
                    className={`select-button ${question.answer  ? 'selected-select-button' : ''}`}>
                    <h4>True</h4>
                </button>
                <button
                    style={{ margin: "0px", width: "56px" }}
                    onClick={() => {                   
                        setQuestions((prevQuestions: any) => {
                          const newQuestions = [...prevQuestions];
                          const thirdQuestion = newQuestions[index];
                          if (thirdQuestion) {
                            thirdQuestion.answer=false
                          }
                          return newQuestions;
                        });
                      }} 
                    className={`select-button ${!question.answer ? 'selected-select-button' : ''}`}>
                    <h4>False</h4>
                </button>
            </div>
        </div>
    );
}
