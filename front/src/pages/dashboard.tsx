import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import authService from '../services/authService';

const DashboardPage: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        if (!authService.isAuthenticated()) {
            router.push('/login');
        }
    }, [router]);

    const handleLogout = () => {
        authService.logout();
        router.push('/login');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <h1 className="text-xl font-bold">Dashboard</h1>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-4">
                        <h2 className="text-2xl font-bold mb-4">Welcome to your Dashboard!</h2>
                        <p>This is a protected page that only authenticated users can access.</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardPage; 