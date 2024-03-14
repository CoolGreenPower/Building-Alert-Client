import React, { useState } from "react";
import { BarChart } from '@mui/x-charts/BarChart';
import Colors from '../../constants/Colors';

export default function UtilityGraph(props) {

    const conversions = props.conversions;
    const firstKey = props.selectedUnit;
    const utility = props.utility;
    const [activeTab, setActiveTab] = useState(firstKey);
    if (props.data.length === 0) {
        return <div>No Data found</div>
    }
    const UnitComponent = ({ unit, rounded }) => {
        return (
            <div
                onClick={() => {
                    return setActiveTab(unit);
                }}
                className={`h-12 flex text-sm px-4 shadow cursor-pointer items-end ${activeTab === unit ? activeClassName : inActiveClassName}${rounded}`}>
                <p>{unit}</p>
            </div>
        );
    }

    const activeClassName = 'bg-white font-bold text-primaryColor';
    const inActiveClassName = 'font-normal bg-primaryColor text-white';

    const consumptions = props.data[0]['data'].map((item) => item['total_consumption'] / 1000 / conversions[activeTab]);
    const months = props.data[0]['data'].map((item) => item['month']);
    const convertToMonthInWords = (month) => {
        const [monthStr, yearStr] = month.split('-');
        const date = new Date(`${monthStr}-01-${yearStr}`);
        const monthInWords = date.toLocaleDateString('en-US', { month: 'short' });
        const formattedMonth = monthInWords.charAt(0).toUpperCase() + monthInWords.slice(1);
        return `${formattedMonth}${yearStr}`;
    };

    const monthsInWords = months.map((month) => convertToMonthInWords(month));
    const percentChange = (((consumptions[1] - consumptions[0]) / consumptions[0]) * 100).toPrecision(2);
    return (
        <div>
            <div className='flex rounded-md w-min-fit'>
                {Object.entries(conversions).map(([key, value], index) => {
                    return <UnitComponent unit={key}
                        rounded={index === 0 ? ' rounded-l-md' : index === Object.keys(conversions).length - 1 ? ' rounded-r-md' : ''}
                        conversionFactor={value} />
                })}
            </div>
            <BarChart
                xAxis={[
                    {
                        id: 'barCategories',
                        data: monthsInWords,
                        scaleType: 'band',
                        label: 'Monthly',
                    },
                ]}
                colors={[Colors.primary]}
                series={[
                    {
                        data: consumptions,
                    },
                ]}
                width={350}
                height={500}
                yAxis={[
                    {
                        // type: 'number',
                        label: 'Consumption',
                        scaleType: 'linear',
                        // tickInterval: 100,
                        // domain: [0, 1000],
                    }
                ]
                }
            />
            <div className='text-primaryColor my-4'>
                <p>This month you used {parseInt(consumptions[1])} {activeTab} of {utility}</p>
                <p> {Math.abs(percentChange)}% {percentChange > 0 ? 'more' : 'less'}  than last month {monthsInWords[0]}</p>
                {/* <p> { } % more than last year {monthsInWords[1]}</p> */}
            </div>
        </div>
    );
}