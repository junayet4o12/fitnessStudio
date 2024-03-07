/* eslint-disable react/prop-types */
// import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MaxAvgSpeedCompare = ({ data }) => {
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip bg-black text-white p-5 rounded  text-center text-sm">
                    <p className="text-base">According to chart, your</p>
                    <p>{payload[0]?.dataKey} was <span className='font-bold text-base'>{payload[0]?.payload['Maximum Speed'].toFixed(2)} km/h</span></p> <p>&</p>
                    <p>{payload[1]?.dataKey} was <span className='font-bold text-base'>{payload[0]?.payload['Average Speed'].toFixed(2)} km/h</span></p>

                </div>
            );
        }

        return null;
    };
    return (
        <BarChart
            width={250}
            height={400}
            barGap={20}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
            }}
        >
            <CartesianGrid strokeDasharray="10 10" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="Maximum Speed" fill="#8884d8" />
            <Bar dataKey="Average Speed" fill="#82ca9d" />
        </BarChart>
    );
};

export default MaxAvgSpeedCompare;