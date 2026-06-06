import React from 'react';
import CustomButton from '../../components/shared/button/Button';
import {ReactComponent as PlusIcon} from '../../assets/images/plus.svg';
import {ReactComponent as QuizIcon} from '../../assets/images/quiz.svg';
import { Link } from 'react-router-dom';
import './Quizes.scss';

export default function Quizes() {
    return (
        <div className='quizes-container'>
            <div className='d-flex justify-space-between align-center'>
                <h1>Create A Quiz</h1>
                <Link to='/create-quiz'>
                    <CustomButton
                        customStyle={{ padding: "10px", width: '128px', height: '44px',backgroundColor: '#10BAAC', color:'white' }}
                        childClasses={'d-flex justify-space-between align-center'}
                        variant={'primary'}
                        onClick={() => {/* your click handler here */}}
                        className=""
                    >
                        <PlusIcon /> Create Quiz
                    </CustomButton>
                </Link>
            </div>
            <div style={{ marginTop: '100px' }} className='d-flex justify-center' >
                <div className='quiz-hero-section'>
                    <div className='d-flex justify-center'>
                        <QuizIcon />
                    </div>
                    <div className='text-center' style={{ padding: '32px 60px' }}>
                        <h2>No Quiz Created Yet</h2>
                        <span className='p1 light-text'>
                            Write something here that’ll make your reader excited! You can write anything in here. Get started.
                        </span>
                    </div>
                    <Link to='/create-quiz'>
                        <CustomButton
                            className='w-100'
                            variant="primary"
                            childClasses={'d-flex align-center justify-center gap-5'}
                            onClick={() => {/* your click handler here */}}
                            customStyle={{ backgroundColor: '#10BAAC', color:'white'}}
                        >
                            <PlusIcon /> Create Quiz
                        </CustomButton>
                    </Link>
                </div>
            </div>
        </div>
    );
}
