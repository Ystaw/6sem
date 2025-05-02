import React from 'react';
import SignInForm from '../components/auth/SignInForm';

const LoginPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-red-100 py-12">
            <SignInForm />
        </div>
    );
};

export default LoginPage; 