import React, { useState } from "react";

export default function TabComponent(props) {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index, utility) => {
        setActiveTab(index);
        props.onTabSelected(utility);
    };
    const activeClassName = 'active underline font-bold';
    const inActiveClassName = 'font-normal';
    return (
        <div>
            <div className="tab-list cursor-pointer bg-tabSurface px-4 py-3 flex w-full xs:justify-between md:justify-evenly">
                {React.Children.map(props.children, (child, index) => (
                    <div
                        key={index}
                        className={`tab text-lg text-primaryColor ${activeTab === index ? activeClassName : inActiveClassName}`}
                        onClick={() => handleTabClick(index, child.props.label)}>
                        {child.props.label}
                    </div>
                ))}
            </div>
            <div className="tab-content flex h-screen justify-center">
                {React.Children.map(props.children, (child, index) => (
                    <div className={`tab-pane ${activeTab === index ? 'active' : ''}`} key={index}>
                        {child.props.children}
                    </div>
                ))}
            </div>
        </div>
    );
};