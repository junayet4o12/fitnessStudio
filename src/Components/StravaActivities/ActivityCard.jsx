/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import morningWalkImg from '../../assets/images/stravaImg/morning-walk.jpg'
import morningRunImg from '../../assets/images/stravaImg/morning-run.jpg'
import eveningWalkImg from '../../assets/images/stravaImg/evening-walk.jpg'
import eveningRunImg from '../../assets/images/stravaImg/evening-run.jpg'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import ActivityChartModal from './ActivityChartModal';
import toast from 'react-hot-toast';
const ActivityCard = ({ activity, handleCompare, comparingCard }) => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { name, max_speed, average_speed, distance, moving_time, sport_type, start_date, type, elapsed_time, id } = activity
    console.log(id);
    const time = new Date(start_date);
    // const cardImg = name === 'Morning Walk' ? morningWalkImg : (name === ('Morning Run' || 'Lunch Run') ? morningRunImg : (name === 'Evening Walk' ? eveningWalkImg : eveningRunImg))
    let cardImg = '';
    if (name === 'Morning Walk' || name === 'Lunch Walk') {
        cardImg = morningWalkImg
    } else if (name === 'Morning Run' || name === 'Lunch Run') {
        cardImg = morningRunImg
    } else if (name === 'Evening Walk') {
        cardImg = eveningWalkImg
    } else if (name === 'Evening Run') {
        cardImg = eveningRunImg
    }
    const formattedTime = time.toLocaleTimeString("en-US", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    const distanceInKm = parseFloat((distance / 1000).toFixed(2))
    const showingDistance = distanceInKm < 0.5 ? `${distance} meter` : `${distanceInKm} Kilometer`
    const formattedDate = time.toLocaleDateString("en-US", { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });

    return (
        <div className=''>
            <Card className="mt-6 w-72 xs:w-96 bg-primary/10 shadow-xl shadow-primary/30">
                <CardHeader color="blue-gray" className="relative h-56 m-0 rounded-br-none rounded-bl-none">
                    <img
                        src={cardImg}
                    />
                </CardHeader>
                <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                        Type: {name}
                    </Typography>
                    <Typography variant="h6" color="blue-gray" className="mb-2">
                        Time: <span className='font-normal'>{formattedTime}, {formattedDate}</span>
                        <br />
                    </Typography>
                    <Typography variant="h6" color="blue-gray" className="mb-2">
                        Distance: <span className='font-normal'>{showingDistance}</span>
                        <br />
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                    <Button onClick={handleOpen} className='text-black bg-primary/40 hover:bg-primary/70 transition-all duration-500'>Details</Button>

                    <Button onClick={() => handleCompare(id)} className='text-black bg-secondary/40 hover:bg-secondary/70 transition-all duration-500 ml-5'>{comparingCard[0]===id ? 'Comparing' : 'Compare'}</Button>
                </CardFooter>
            </Card>
            <ActivityChartModal open={open} handleOpen={handleOpen} handleClose={handleClose} activity={activity}></ActivityChartModal>
        </div>
    );
};

export default ActivityCard;