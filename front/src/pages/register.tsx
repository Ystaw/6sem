import React from 'react';
import SignUpForm from '../components/auth/SignUpForm';

const RegisterPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 py-12">
            <SignUpForm />
        </div>
    );
};

export default RegisterPage; 