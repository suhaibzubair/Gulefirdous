import React, { useState } from 'react';
import { ReactComponent as ViewIcon } from '../../../assets/images/open-modal.svg';
import ModalWrapper from '../../../modals/ModalWraper';
import Input from '../../../components/inputs/input/Input';
import {FillBlankGeneratorProps} from './FillBlankGenerator.d';
import './FillBlankGenerator.scss';


const  FillBlankGenerator=({ index, question, setQuestions }: any)=> {
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const handleSelectToken = (index: number) => {
    if (question?.blankIndex?.includes(index)) {
      setQuestions((prevQuestions: any) => {
        const newQuestions = [...prevQuestions];
        const thirdQuestion = newQuestions[index];
        if (thirdQuestion) {
          thirdQuestion.blankIndex =question?.blankIndex?.filter((item:any) => item !== index)
        }
        return newQuestions;
      })
    } else {
      console.log(([...question?.blankIndex, index]))
      setQuestions((prevQuestions: any) => {
        const newQuestions = [...prevQuestions];
        const thirdQuestion = newQuestions[index];
        if (thirdQuestion) {
          thirdQuestion.blankIndex =([...question?.blankIndex, index])
        }
        return newQuestions;
      })
    }

  };

  return (
    <div className='d-flex flex-column gap-10'>
      <ModalWrapper
         title="Your Modal Title"
         visible={openModal}
         onCancel={() => setOpenModal(false)}
         onOk={() => {} /* Your onOk handler */}
         size="large"// Adjust the size according to your requirements
      >
        <div className='d-flex flex-column gap-10'>
          <div className='d-flex gap-5 align-end'>
            {question?.discription &&
              question?.discription.split(' ').map((word:string, index:number) => {
                return question?.blankIndex?.includes(index) ? (
                 ' ______ '
                ) : (
                  <span className='token-text'>{word}</span>
                );
              })}
          </div>
        </div>
      </ModalWrapper>
      Sentence:
      <Input
        // onChange={(e) => {
        //   setStatement(e.target.value);
        // }}
        onChange={(e) => { setQuestions((prevQuestions: any) => {
          const newQuestions = [...prevQuestions];
          const thirdQuestion = newQuestions[index];
          if (thirdQuestion) {
            thirdQuestion.discription=e.target.value
          }
          return newQuestions;
        });}}
        customStyles={{ height: '88px' }}
      />
      {/* <button
        onClick={() => {
          statement && setShowBlanks(true);
        }}
        style={{ margin: '0px', width: '286px' }}
        className={`select-button selected-select-button`}
      >
        <h4>Generate Fill In The Blank Chunks</h4>
      </button> */}
      {question?.discription && (
        <div className='select-blanks-container'>
          <div className='d-flex align-center gap-10'>
            <h4>Click to Add Blanks in this statement</h4>
            <div className='d-flex'>
              {
                question?.discription.split(' ').map((word:string, index:number) => {
                  return (
                    <span
                      onClick={() => {
                        handleSelectToken(index);
                      }}
                      className={`token token-text text-center ${selectedIndexes.includes(index) && 'selected-token'}`}
                    >
                      {word}
                    </span>
                  );
                })}
            </div>
            <div className='d-flex justify-end'>
              <ViewIcon onClick={() => setOpenModal(true)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default FillBlankGenerator;
