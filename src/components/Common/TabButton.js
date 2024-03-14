import React from 'react';


function TabButton({ label, icon, selected, onClick }) {
    return (
        <div
            className={`flex flex-col px-4 py-2 w-screen cursor-pointer ${selected ? 'bg-tabSurface text-primaryColor' : 'bg-white text-tabUnselected'} items-center`}
            onClick={onClick}>
            {icon}
            <span className='ml-2'>{label}</span>
        </div>
    );
}

export default TabButton;