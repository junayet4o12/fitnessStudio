/* eslint-disable react/prop-types */
// import React from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
const MaxAvgSpeedComparePie = ({ data }) => {

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    return (
        <div className='flex '>
            <PieChart width={300} height={300}>
                <Pie

                    data={data}
                    cx={150}
                    cy={150}
                    innerRadius={50}
                    outerRadius={90}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}

                </Pie>
                <Legend />
                <Tooltip />
            </PieChart>
        </div>
    );
};

export default MaxAvgSpeedComparePie;