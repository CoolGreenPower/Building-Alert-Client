import React from 'react';
import ManagementList from '../ManagementList';
import BAAppBar from '../BAAppBar';

function AlertManagement() {
    const alertItems = [
        { label: 'New Alerts', route: '/alerts/new' },
        { label: 'In Progress Alerts', route: '/alerts/in-progress' },
        { label: 'Completed Alerts', route: '/alerts/completed' },
    ];

    return (
        <div className='bg-white h-screen'>
            <BAAppBar
                className='baappbar'
                title="Alert Management"
                leading={<div className='w-8' />}
            />
            <ManagementList
                title={"Alert Management"}
                items={alertItems} />
        </div>
    );
}

export default AlertManagement;
