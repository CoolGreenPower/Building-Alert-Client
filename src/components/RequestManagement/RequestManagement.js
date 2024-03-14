import React from 'react';
import ManagementList from '../ManagementList';
import BAAppBar from '../BAAppBar';
function RequestManagement() {
  const requestItems = [
    { label: 'New Requests', route: '/requests/requests' },
    { label: 'In Progress Requests', route: '/requests/in-progress' },
    { label: 'Completed Requests', route: '/requests/completed' },
  ];

  return (
    <div className='bg-white h-screen'>
      <BAAppBar
        className='baappbar'
        title="Request Management"
        leading={<div className='w-8' />}
      />

      <ManagementList
        title={"Request Management"}
        items={requestItems} />
    </div>
  );
}

export default RequestManagement;
