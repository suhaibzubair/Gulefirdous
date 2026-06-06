
import React, { useEffect, useState } from 'react';
import CreateQuestions from '../createQuestions/CreateQuestions';
import CustomButton from '../../../components/shared/button/Button';
import { ReactComponent as PlusIcon } from '../../../assets/images/plus.svg';
import '../../quizes/Quizes.scss';

export default function Questions() {
    const [questions, setQuestions] = useState<any[]>([{
        type:'',
        discription:'',
        option:[],
        selectType:'',
        blankIndex:[],

    }]);

    const addQuestion = () => {
        setQuestions([...questions, {  type:'',
        discription:'',
        option:[],
        selectType:'',
        blankIndex:[],
    }]);
        console.log(questions)

    }

    return (
        <div>
            <h3>Create Quiz</h3>
            <div className='d-flex flex-column gap-10'>
                {questions.map((question, index) => {
                    return <CreateQuestions key={index} index={index} question={question} setQuestions={setQuestions}/>;
                })}
            </div>
            <CustomButton
                onClick={addQuestion}
                customStyle={{ height: '44px', padding: '10px', marginTop: '32px', backgroundColor: '#10BAAC', color: 'white' }}
                className='w-100'
                childClasses={'d-flex align-center justify-center gap-5'}
                variant='primary'
            >
                <PlusIcon />  Add Question
            </CustomButton>
            <div style={{ marginTop: '32px' }} className='d-flex justify-end gap-10'>
                <button style={{ backgroundColor: 'white' }} className='reset-button'>Cancel</button>
                <button className='draft-btn'>Save As draft</button>
                <button className='save-btn'>Save & Publish</button>
            </div>
        </div>
    );
}
