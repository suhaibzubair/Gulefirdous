import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface RoutesWrapperProps {
    children: React.ReactNode;
}

const RoutesWrapper: React.FC<RoutesWrapperProps> = ({ children }) => {
    const navigate = useNavigate();

    // useEffect(() => {
    //     const isLoggedIn = false; // Replace with your actual authentication logic

    //     if (isLoggedIn) {
    //         navigate('/dashboard');
    //     } else {
    //         navigate('/login');
    //     }
    // }, [navigate]);

    return (
        <div> {children} </div>
    );
};

export default RoutesWrapper;
