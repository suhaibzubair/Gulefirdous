import React, { useState } from 'react';
import { ForgetPasswordProps } from './ForgetPassword.d';
import { Link } from 'react-router-dom';
import back from '../../../../assets/images/Back.png'
import Button  from '../../../../components/shared/button/Button';
import './ForgetPassword.scss'
const ForgetPassword: React.FC<ForgetPasswordProps> = ({oldemail,setShowForget}) => {
    const [email, setEmail] = useState<string>('');
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const handleSendCode = () => {
        // Implement the logic to send the code to the provided email<Link to="/">
        console.log(`Sending code to ${email}`);
        // You can make an API call here to send the code or reset password link
    };
    return (
        <div className='forget-password-container'>
            <Link to="/login">
                <button className="back-button" onClick={()=>setShowForget(false)}> 
                <img src={back} alt="back-arrow" />
                </button>
            </Link>
            <div className="content-wraper">
                <h1>Forget Password</h1>
                <p>
                    Enter the email address associated with your account.
                </p>
                <Link to="/">
                    <p className='link-text'>
                        Enter your email address below, and we'll send you a code or a reset password link.
                    </p>
                </Link>
                <p>
                    Please enter a correct Email address.
                </p>
                <div className='email-input'>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email || oldemail}
                        onChange={handleEmailChange}
                        placeholder="Enter your email"
                    />
                </div>
                <Button onClick={handleSendCode} variant="primary"
                    className="code-custom-button"
                    customStyle={{ /* your custom styles here */ }}
                    childClasses="">Send Code</Button>
            </div>
        </div>
    );
};
export default ForgetPassword;