import React from 'react';
import { Steps } from 'antd';
import LogoImg from '../../../assets/images/urqaalogo.svg';
import './MainProgressBar.scss';
import { VerticalProgressBarProps } from './MainProgressBar.d';

const { Step } = Steps;



const VerticalProgressBar: React.FC<VerticalProgressBarProps> = ({ currentStep, steps }) => {
    return (
        <>
            <div className="bar-wraper">
                <div className="logo-img">
                    <img src={LogoImg} alt="" />
                </div>
                <Steps direction="vertical" current={currentStep}>
                    {steps.map((step, index) => (
                        <Step
                            key={index}
                            title={step.title}
                            description={step.description}
                        // icon={index === currentStep ? <span className="dot" /> : undefined}
                        />
                    ))}
                </Steps>

            </div>
        </>
    );
};

export default VerticalProgressBar;
