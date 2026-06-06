import React, { useState } from 'react';
import CustomButton from '../../../components/shared/button/Button';
import { ReactComponent as PlusIcon } from '../../../assets/images/plus.svg';
import TrueFalse from '../trueFalse/TrueFalse';
import {Question} from './CreateTrueFalseQuestions.d';
import '../../quizes/Quizes.scss';


export default function CreateTrueFalseQuestions( { index, question, setQuestions }: any) {
  return (
    <div>
      <div style={{ marginTop: '32px' }} className='d-flex flex-column gap-10'>
      <TrueFalse   setQuestions={setQuestions}
          question={question}
          index={index} />;
      </div>
    </div>
  );
}
