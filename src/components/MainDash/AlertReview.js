import React from 'react';
import { useParams } from 'react-router-dom';

const AlertReview = () => {
    const { alertId } = useParams();
    return (
        <div className='flex pt-48 h-screen items-center justify-center'>
            <h1>Alert Review</h1>
            <p>Alert ID: {alertId}</p>
        </div>
    );
}

export default AlertReview;
