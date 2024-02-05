/* eslint-disable react/prop-types */
// import React from 'react';

import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const ActivityChartModal = ({ handleOpen, handleClose, activity, open }) => {
    const { name, max_speed, average_speed, distance, moving_time, sport_type, start_date, type, elapsed_time } = activity
    const data = [
        {
            name: "Speed Chart",
            'Maximum Speed': max_speed,
            'Average Speed': average_speed,
            amt: 1000
        },

    ];
    const CustomTooltip = ({ active, payload, label }) => {
        console.log(active, payload[0]?.payload['Maximum Speed'], label);
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip bg-black text-white p-5 rounded  text-center text-sm">
                    <p className="text-base">According to chart, your</p>
                    <p>{payload[0]?.dataKey} was <span className='font-bold text-base'>{(payload[0]?.payload['Maximum Speed'] * 1.60934).toFixed(2)} km/h</span></p> <p>&</p>
                    <p>{payload[1]?.dataKey} was <span className='font-bold text-base'>{(payload[0]?.payload['Average Speed'] * 1.60934).toFixed(2)} km/h</span></p>

                </div>
            );
        }

        return null;
    };
    return (
        <Dialog
            open={
                open
            }
            size={"xxl"}
            handler={handleOpen}
        >
            <DialogHeader>Its a simple dialog.</DialogHeader>
            <DialogBody>
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
            </DialogBody>
            <DialogFooter>
                <Button
                    variant="text"
                    color="red"
                    onClick={handleClose}
                    className="mr-1"
                >
                    <span>Cancel</span>
                </Button>
                <Button
                    variant="gradient"
                    color="green"
                    onClick={handleClose}
                    className='text-black'
                >
                    <span>Confirm</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
};

export default ActivityChartModal;