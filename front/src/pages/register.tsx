import React from 'react';
import RegisterForm from '../components/RegisterForm';
import Link from 'next/link';

const RegisterPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h1 className="text-center text-3xl font-extrabold text-gray-900">
                    Create your account
                </h1>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Or{' '}
                    <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                        sign in to your account
                    </Link>
                </p>
            </div>
            <RegisterForm />
        </div>
    );
};

export default RegisterPage; 