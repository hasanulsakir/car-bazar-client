import React from 'react';
import useAuth from '../../../Hooks/useAuth';

const DashboardHome = () => {
    const { user } = useAuth();
    return (
        <div>
            <h1 className="fs-2 fw-bolder text-black">Welcome, <span className="text-primary">{user.displayName}</span></h1>
        </div>
    );
};

export default DashboardHome;