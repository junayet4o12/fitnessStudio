/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import WalkImg from '../../assets/images/stravaImg/morning-walk.jpg'
import RunImg from '../../assets/images/stravaImg/morning-run.jpg'
import alpineskyImg from '../../assets/images/stravaImg/alpinesky.jpg'
import CycleridingImg from '../../assets/images/stravaImg/Cycleriding.jpg'
import EllipticalImg from '../../assets/images/stravaImg/Elliptical.jpg'
import golfImg from '../../assets/images/stravaImg/golf.jpg'
import handcycleImg from '../../assets/images/stravaImg/handcycle.jpg'
import hikingImg from '../../assets/images/stravaImg/hiking.jpg'
import IceSkateImg from '../../assets/images/stravaImg/IceSkate.jpg'
import KayakingImg from '../../assets/images/stravaImg/Kayaking.jpg'
import ridingImg from '../../assets/images/stravaImg/riding.jpg'
import RockClimbingImg from '../../assets/images/stravaImg/RockClimbing.jpg'
import sailImg from '../../assets/images/stravaImg/sail.jpg'
import skittingImg from '../../assets/images/stravaImg/skitting.jpg'
import soccerImg from '../../assets/images/stravaImg/soccer.jpg'
import stairStapperImg from '../../assets/images/stravaImg/stairStapper.jpg'
import standuppaddlingImg from '../../assets/images/stravaImg/standuppaddling.jpg'
import surfingImg from '../../assets/images/stravaImg/surfing.jpg'
import swimmingImg from '../../assets/images/stravaImg/swimming.jpg'
import VelomobileImg from '../../assets/images/stravaImg/Velomobile.jpg'
import wheelchairImg from '../../assets/images/stravaImg/wheelchair.jpg'
import workoutImg from '../../assets/images/stravaImg/workout.jpg'
import yogaImg from '../../assets/images/stravaImg/yoga.jpg'

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import ActivityChartModal from './ActivityChartModal';
const ActivityCard = ({ activity, handleCompare, comparingCard }) => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { name, max_speed, average_speed, distance, moving_time, sport_type, start_date, type, elapsed_time, id } = activity
    // console.log(type);
    const time = new Date(start_date);
    const typeToImgMap = {
        'Walk': WalkImg,
        'Run': RunImg,
        'Swim': swimmingImg,
        'Soccer': soccerImg,
        'Yoga': yogaImg,
        'Golf': golfImg,
        'Hike': hikingImg,
        'Ride': ridingImg,
        'EBikeRide': CycleridingImg,
        'Velomobile': VelomobileImg,
        'Rowing': KayakingImg,
        'Kayaking': KayakingImg,
        'Canoeing': KayakingImg,
        'Kitesurf': surfingImg,
        'Surfing': surfingImg,
        'Windsurf': surfingImg,
        'StandUpPaddling': standuppaddlingImg,
        'Sail': sailImg,
        'AlpineSki': alpineskyImg,
        'BackcountrySki': alpineskyImg,
        'NordicSki': alpineskyImg,
        'Snowboard': alpineskyImg,
        'IceSkate': IceSkateImg,
        'Snowshoe': IceSkateImg,
        'Workout': workoutImg,
        'Crossfit': workoutImg,
        'WeightTraining': workoutImg,
        'Elliptical': EllipticalImg,
        'Handcycle': handcycleImg,
        'InlineSkate': skittingImg,
        'RollerSki': skittingImg,
        'Skateboard': skittingImg,
        'RockClimbing': RockClimbingImg,
        'StairStepper': stairStapperImg,
        'Wheelchair': wheelchairImg
    };
    
    const cardImg = typeToImgMap[type] || RunImg;
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

                    <Button onClick={() => handleCompare({id, name})} className='text-black bg-secondary/40 hover:bg-secondary/70 transition-all duration-500 ml-5'>{(comparingCard[0]?.id === id || comparingCard[1]?.id === id) ? 'Comparing' : 'Compare'}</Button>
                </CardFooter>
            </Card>
            <ActivityChartModal open={open} handleOpen={handleOpen} handleClose={handleClose} activity={activity}></ActivityChartModal>
        </div>
    );
};

export default ActivityCard;