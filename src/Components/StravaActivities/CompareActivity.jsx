import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiosStravaFetch from "../../Hooks/useAxiosStravaFetch";
import Title from "../Title/Title";
import { InfinitySpin } from 'react-loader-spinner';
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

const CompareActivity = () => {
    const { id1, id2 } = useParams();
    const axiosStravaFetch = useAxiosStravaFetch()
    console.log(id1, id2);
    const { data: data1, isLoading: isLoading1 } = useQuery({
        queryKey: ['compare', id1],
        queryFn: async () => {
            const res = await axiosStravaFetch.get(`/activities/${id1}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('stravaKey')}`,
                    'Content-Type': 'application/json'
                }
            })
            return res?.data
        }
    })
    const { data: data2, isLoading: isLoading2 } = useQuery({
        queryKey: ['compare', id2],
        queryFn: async () => {
            const res = await axiosStravaFetch.get(`/activities/${id2}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('stravaKey')}`,
                    'Content-Type': 'application/json'
                }
            })
            return res?.data
        }
    })
    if (isLoading1 || isLoading2) {
        return <div className='h-screen flex items-center justify-center'>
            {/* <Spinner className="h-16 w-16 text-gray-900/50" /> */}
            <InfinitySpin
                visible={true}
                width="300"
                color="#FF4804"
                ariaLabel="infinity-spin-loading"
            />
        </div>
    }
    console.log(data1, data2);

    // Image1 
    let cardImg1 = RunImg;
    if (data1?.type === 'Walk') {
        cardImg1 = WalkImg
    } else if (data1?.type === 'Run') {
        cardImg1 = RunImg
    } else if (data1?.type === 'Swim') {
        cardImg1 = swimmingImg
    } else if (data1?.type === 'Soccer') {
        cardImg1 = soccerImg
    } else if (data1?.type === 'Yoga') {
        cardImg1 = yogaImg
    } else if (data1?.type === 'Golf') {
        cardImg1 = golfImg
    } else if (data1?.type === 'Hike') {
        cardImg1 = hikingImg
    } else if (data1?.type === 'Ride') {
        cardImg1 = ridingImg
    } else if (data1?.type === 'EBikeRide') {
        cardImg1 = CycleridingImg
    } else if (data1?.type === 'Velomobile') {
        cardImg1 = VelomobileImg
    } else if (data1?.type === 'Rowing' || data1?.type === 'Kayaking' || data1?.type === 'Canoeing') {
        cardImg1 = KayakingImg
    } else if (data1?.type === 'Kitesurf' || data1?.type === 'Surfing' || data1?.type === 'Windsurf') {
        cardImg1 = surfingImg
    } else if (data1?.type === 'StandUpPaddling') {
        cardImg1 = standuppaddlingImg
    } else if (data1?.type === 'Sail') {
        cardImg1 = sailImg
    } else if (data1?.type === 'AlpineSki' || data1?.type === 'BackcountrySki' || data1?.type === 'NordicSki' || data1?.type === 'Snowboard') {
        cardImg1 = alpineskyImg
    } else if (data1?.type === 'IceSkate' || data1?.type === 'Snowshoe') {
        cardImg1 = IceSkateImg
    } else if (data1?.type === 'Workout' || data1?.type === 'Crossfit' || data1?.type === 'WeightTraining') {
        cardImg1 = workoutImg
    } else if (data1?.type === 'Elliptical') {
        cardImg1 = EllipticalImg
    } else if (data1?.type === 'Handcycle') {
        cardImg1 = handcycleImg
    } else if (data1?.type === 'InlineSkate' || data1?.type === 'RollerSki' || data1?.type === 'Skateboard') {
        cardImg1 = skittingImg
    } else if (data1?.type === 'RockClimbing') {
        cardImg1 = RockClimbingImg
    } else if (data1?.type === 'StairStepper') {
        cardImg1 = stairStapperImg
    } else if (data1?.type === 'Wheelchair') {
        cardImg1 = wheelchairImg
    }
    
    // Image2
    let cardImg2 = RunImg;
    if (data2?.type === 'Walk') {
        cardImg2 = WalkImg
    } else if (data2?.type === 'Run') {
        cardImg2 = RunImg
    } else if (data2?.type === 'Swim') {
        cardImg2 = swimmingImg
    } else if (data2?.type === 'Soccer') {
        cardImg2 = soccerImg
    } else if (data2?.type === 'Yoga') {
        cardImg2 = yogaImg
    } else if (data2?.type === 'Golf') {
        cardImg2 = golfImg
    } else if (data2?.type === 'Hike') {
        cardImg2 = hikingImg
    } else if (data2?.type === 'Ride') {
        cardImg2 = ridingImg
    } else if (data2?.type === 'EBikeRide') {
        cardImg2 = CycleridingImg
    } else if (data2?.type === 'Velomobile') {
        cardImg2 = VelomobileImg
    } else if (data2?.type === 'Rowing' || data2?.type === 'Kayaking' || data2?.type === 'Canoeing') {
        cardImg2 = KayakingImg
    } else if (data2?.type === 'Kitesurf' || data2?.type === 'Surfing' || data2?.type === 'Windsurf') {
        cardImg2 = surfingImg
    } else if (data2?.type === 'StandUpPaddling') {
        cardImg2 = standuppaddlingImg
    } else if (data2?.type === 'Sail') {
        cardImg2 = sailImg
    } else if (data2?.type === 'AlpineSki' || data2?.type === 'BackcountrySki' || data2?.type === 'NordicSki' || data2?.type === 'Snowboard') {
        cardImg2 = alpineskyImg
    } else if (data2?.type === 'IceSkate' || data2?.type === 'Snowshoe') {
        cardImg2 = IceSkateImg
    } else if (data2?.type === 'Workout' || data2?.type === 'Crossfit' || data2?.type === 'WeightTraining') {
        cardImg2 = workoutImg
    } else if (data2?.type === 'Elliptical') {
        cardImg2 = EllipticalImg
    } else if (data2?.type === 'Handcycle') {
        cardImg2 = handcycleImg
    } else if (data2?.type === 'InlineSkate' || data2?.type === 'RollerSki' || data2?.type === 'Skateboard') {
        cardImg2 = skittingImg
    } else if (data2?.type === 'RockClimbing') {
        cardImg2 = RockClimbingImg
    } else if (data2?.type === 'StairStepper') {
        cardImg2 = stairStapperImg
    } else if (data2?.type === 'Wheelchair') {
        cardImg2 = wheelchairImg
    }

    // Distance KiloMeter To Meter
    const distanceInKm1 = parseFloat((data1?.distance / 1000).toFixed(2))
    const showingDistance1 = distanceInKm1 < 0.5 ? `${data1?.distance} meter` : `${distanceInKm1} Kilometer`
    const distanceInKm2 = parseFloat((data2?.distance / 1000).toFixed(2))
    const showingDistance2 = distanceInKm2 < 0.5 ? `${data2?.distance} meter` : `${distanceInKm2} Kilometer`

    // Minutes To Second
    const showingTime1 = data1?.moving_time >= 60 ? `${Math.round((data1?.moving_time / 60))}  min ${data1?.moving_time % 60 === 0 ? '' : `${data1?.moving_time % 60} sec`}` : `${data1?.moving_time} sec`
    const showingTime2 = data2?.moving_time >= 60 ? `${Math.round((data2?.moving_time / 60))}  min ${data2?.moving_time % 60 === 0 ? '' : `${data2?.moving_time % 60} sec`}` : `${data2?.moving_time} sec`;

    // Time and Date formate
    const time1 = new Date(data1?.start_date);
    const formattedTime1 = time1.toLocaleTimeString("en-US", {
        hour: '2-digit',
        minute: '2-digit'
    });
    const formattedDate1 = time1.toLocaleDateString("en-US", { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });

    const time2 = new Date(data2?.start_date);
    const formattedTime2 = time2.toLocaleTimeString("en-US", {
        hour: '2-digit',
        minute: '2-digit'
    });
    const formattedDate2 = time2.toLocaleDateString("en-US", { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });

    return (
        <>
            <Title title={'Compare Between two Activity'}></Title>
            <div>
                {/* image and timeline */}
                <ul className="timeline timeline-vertical px-2">
                    <li className="gap-2">
                        <div className="timeline-start timeline-box">
                            <img className="md:h-64 md:w-64 lg:h-80 lg:w-72 rounded-md" src={cardImg1} alt="Photo" />
                            {/* <img className="md:h-64 md:w-64 lg:h-96 lg:w-72 rounded-md" src={data1?.photos?.primary?.urls[600]} alt="Photo" /> */}
                        </div>
                        <hr />
                        <div className="timeline-middle">
                            <p className="border rounded-full py-1 px-[6px] border-primary font-bold text-gray-500">VS</p>
                        </div>
                        <div className="timeline-end timeline-box">
                            <img className="md:h-64 md:w-64 lg:h-80 lg:w-72 rounded-md" src={cardImg2} alt="Photo" />
                            {/* <img className="md:h-64 md:w-64 lg:h-96 lg:w-72 rounded-md" src={data2?.photos?.primary?.urls[600]} alt="Photo" /> */}
                        </div>
                        <hr />
                    </li>
                </ul>
                {/* compare names */}
                <div className="flex gap-4 lg:gap-8 justify-center items-center text-xl md:text-3xl lg:text-4xl font-bold py-2">
                    <div>
                        <p>{data1?.name}</p>
                        <h1 className="bmiNumber text-xs md:text-sm text-center py-2">{formattedTime1}{formattedDate1}</h1>
                    </div>
                    <p className="text-primary font-extrabold">VS</p>
                    <div>
                        <p>{data2?.name}</p>
                        <h1 className="bmiNumber text-xs md:text-sm text-center py-2">{formattedTime2}{formattedDate2}</h1>
                    </div>
                </div>

                {/* Compare Table */}
                <div className="overflow-x-auto mx-6 my-12 p-2 border-x border-b border-primary rounded-md shadow-xl">
                    <table className="table bmiNumber">
                        <thead>
                            <tr className="text-sm md:text-lg lg:text-xl text-black font-bold">
                                <th>Activities</th>
                                <th>{data1?.name}</th>
                                <th>{data2?.name}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="hover">
                                <th className="text-xs md:text-sm">Distance</th>
                                <td>{showingDistance1}</td>
                                <td>{showingDistance2}</td>
                            </tr>
                            <tr className="hover">
                                <th className="text-xs md:text-sm">Active Time</th>
                                <td>{showingTime1}</td>
                                <td>{showingTime2}</td>
                            </tr>
                            <tr className="hover">
                                <th className="text-xs md:text-sm">Average Speed</th>
                                <td>{(data1?.average_speed * 1.60934).toFixed(2)} km/h</td>
                                <td>{(data2?.average_speed * 1.60934).toFixed(2)} km/h</td>
                            </tr>
                            <tr className="hover">
                                <th className="text-xs md:text-sm">Max Speed</th>
                                <td>{(data1?.max_speed * 1.60934).toFixed(2)} km/h</td>
                                <td>{(data2?.max_speed * 1.60934).toFixed(2)} km/h</td>
                            </tr>
                            <tr className="hover">
                                <th className="text-xs md:text-sm">Elev High</th>
                                <td>{data1?.elev_high}</td>
                                <td>{data2?.elev_high}</td>
                            </tr>
                            <tr className="hover">
                                <th className="text-xs md:text-sm">Elev Low</th>
                                <td>{data1?.elev_low}</td>
                                <td>{data2?.elev_low}</td>
                            </tr>
                            <tr className="hover">
                                <th className="text-xs md:text-sm">Tracking Type</th>
                                <td>{data1?.sport_type}</td>
                                <td>{data2?.sport_type}</td>
                            </tr>
                            <tr className="hover">
                                <th className="text-xs md:text-sm">Country</th>
                                <td>{data1?.location_country}</td>
                                <td>{data2?.location_country}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default CompareActivity;










// import { useQuery } from "@tanstack/react-query";
// import { useParams } from "react-router";
// import useAxiosStravaFetch from "../../Hooks/useAxiosStravaFetch";
// import Title from "../Title/Title";
// import { InfinitySpin } from 'react-loader-spinner';
// import * as stravaImages from '../../assets/images/stravaImg';

// const activityImages = {
//     Walk: stravaImages.WalkImg,
//     Run: stravaImages.RunImg,
//     Swim: stravaImages.swimmingImg,
//     Soccer: stravaImages.soccerImg,
//     Yoga: stravaImages.yogaImg,
//     Golf: stravaImages.golfImg,
//     Hike: stravaImages.hikingImg,
//     Ride: stravaImages.ridingImg,
//     EBikeRide: stravaImages.CycleridingImg,
//     Velomobile: stravaImages.VelomobileImg,
//     Rowing: stravaImages.KayakingImg,
//     Kayaking: stravaImages.KayakingImg,
//     Canoeing: stravaImages.KayakingImg,
//     Kitesurf: stravaImages.surfingImg,
//     Surfing: stravaImages.surfingImg,
//     Windsurf: stravaImages.surfingImg,
//     StandUpPaddling: stravaImages.standuppaddlingImg,
//     Sail: stravaImages.sailImg,
//     AlpineSki: stravaImages.alpineskyImg,
//     BackcountrySki: stravaImages.alpineskyImg,
//     NordicSki: stravaImages.alpineskyImg,
//     Snowboard: stravaImages.alpineskyImg,
//     IceSkate: stravaImages.IceSkateImg,
//     Snowshoe: stravaImages.IceSkateImg,
//     Workout: stravaImages.workoutImg,
//     Crossfit: stravaImages.workoutImg,
//     WeightTraining: stravaImages.workoutImg,
//     Elliptical: stravaImages.EllipticalImg,
//     Handcycle: stravaImages.handcycleImg,
//     InlineSkate: stravaImages.skittingImg,
//     RollerSki: stravaImages.skittingImg,
//     Skateboard: stravaImages.skittingImg,
//     RockClimbing: stravaImages.RockClimbingImg,
//     StairStepper: stravaImages.stairStapperImg,
//     Wheelchair: stravaImages.wheelchairImg,
// };

// const CompareActivity = () => {
//     const { id1, id2 } = useParams();
//     const axiosStravaFetch = useAxiosStravaFetch();

//     const { data: data1, isLoading: isLoading1 } = useQuery({
//         queryKey: ['compare', id1],
//         queryFn: async () => {
//             const res = await axiosStravaFetch.get(`/activities/${id1}`, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('stravaKey')}`,
//                     'Content-Type': 'application/json'
//                 }
//             })
//             return res?.data
//         }
//     })

//     const { data: data2, isLoading: isLoading2 } = useQuery({
//         queryKey: ['compare', id2],
//         queryFn: async () => {
//             const res = await axiosStravaFetch.get(`/activities/${id2}`, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('stravaKey')}`,
//                     'Content-Type': 'application/json'
//                 }
//             })
//             return res?.data
//         }
//     })

//     if (isLoading1 || isLoading2) {
//         return (
//             <div className='h-screen flex items-center justify-center'>
//                 <InfinitySpin visible={true} width="300" color="#FF4804" ariaLabel="infinity-spin-loading" />
//             </div>
//         );
//     }

//     // Helper function to format time
//     const formatTime = (time) => {
//         const formattedTime = new Date(time);
//         return formattedTime.toLocaleTimeString("en-US", {
//             hour: '2-digit',
//             minute: '2-digit'
//         });
//     };

//     // Helper function to format date
//     const formatDate = (time) => {
//         const formattedDate = new Date(time);
//         return formattedDate.toLocaleDateString("en-US", { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
//     };

//     // Helper function to convert distance to proper unit
//     const formatDistance = (distance) => {
//         const distanceInKm = parseFloat((distance / 1000).toFixed(2));
//         return distanceInKm < 0.5 ? `${distance} meter` : `${distanceInKm} Kilometer`;
//     };

//     // Helper function to convert time to proper unit
//     const formatTimeUnit = (time) => {
//         return time >= 60 ? `${Math.round((time / 60))}  min ${time % 60 === 0 ? '' : `${time % 60} sec`}` : `${time} sec`;
//     };

//     // Helper function to convert speed to proper unit
//     const formatSpeed = (speed) => {
//         return (speed * 1.60934).toFixed(2);
//     };

//     return (
//         <>
//             <Title title={'Compare Between two Activity'} />
//             <div>
//                 {/* image and timeline */}
//                 <ul className="timeline timeline-vertical px-2">
//                     <li className="gap-2">
//                         <div className="timeline-start timeline-box">
//                             <img className="md:h-64 md:w-64 lg:h-80 lg:w-72 rounded-md" src={activityImages[data1?.type]} alt="Photo" />
//                         </div>
//                         <hr />
//                         <div className="timeline-middle">
//                             <p className="border rounded-full py-1 px-[6px] border-primary font-bold text-gray-500">VS</p>
//                         </div>
//                         <div className="timeline-end timeline-box">
//                             <img className="md:h-64 md:w-64 lg:h-80 lg:w-72 rounded-md" src={activityImages[data2?.type]} alt="Photo" />
//                         </div>
//                         <hr />
//                     </li>
//                 </ul>
//                 {/* compare names */}
//                 <div className="flex gap-4 lg:gap-8 justify-center items-center text-xl md:text-3xl lg:text-4xl font-bold py-2">
//                     <div>
//                         <p>{data1?.name}</p>
//                         <h1 className="bmiNumber text-xs md:text-sm text-center py-2">{formatTime(data1?.start_date)}{formatDate(data1?.start_date)}</h1>
//                     </div>
//                     <p className="text-primary font-extrabold">VS</p>
//                     <div>
//                         <p>{data2?.name}</p>
//                         <h1 className="bmiNumber text-xs md:text-sm text-center py-2">{formatTime(data2?.start_date)}{formatDate(data2?.start_date)}</h1>
//                     </div>
//                 </div>

//                 {/* Compare Table */}
//                 <div className="overflow-x-auto mx-6 my-12 p-2 border-x border-b border-primary rounded-md shadow-xl">
//                     <table className="table bmiNumber">
//                         <thead>
//                             <tr className="text-sm md:text-lg lg:text-xl text-black font-bold">
//                                 <th>Activities</th>
//                                 <th>{data1?.name}</th>
//                                 <th>{data2?.name}</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr className="hover">
//                                 <th className="text-xs md:text-sm">Distance</th>
//                                 <td>{formatDistance(data1?.distance)}</td>
//                                 <td>{formatDistance(data2?.distance)}</td>
//                             </tr>
//                             <tr className="hover">
//                                 <th className="text-xs md:text-sm">Active Time</th>
//                                 <td>{formatTimeUnit(data1?.moving_time)}</td>
//                                 <td>{formatTimeUnit(data2?.moving_time)}</td>
//                             </tr>
//                             <tr className="hover">
//                                 <th className="text-xs md:text-sm">Average Speed</th>
//                                 <td>{formatSpeed(data1?.average_speed)} km/h</td>
//                                 <td>{formatSpeed(data2?.average_speed)} km/h</td>
//                             </tr>
//                             <tr className="hover">
//                                 <th className="text-xs md:text-sm">Max Speed</th>
//                                 <td>{formatSpeed(data1?.max_speed)} km/h</td>
//                                 <td>{formatSpeed(data2?.max_speed)} km/h</td>
//                             </tr>
//                             <tr className="hover">
//                                 <th className="text-xs md:text-sm">Elev High</th>
//                                 <td>{data1?.elev_high}</td>
//                                 <td>{data2?.elev_high}</td>
//                             </tr>
//                             <tr className="hover">
//                                 <th className="text-xs md:text-sm">Elev Low</th>
//                                 <td>{data1?.elev_low}</td>
//                                 <td>{data2?.elev_low}</td>
//                             </tr>
//                             <tr className="hover">
//                                 <th className="text-xs md:text-sm">Tracking Type</th>
//                                 <td>{data1?.sport_type}</td>
//                                 <td>{data2?.sport_type}</td>
//                             </tr>
//                             <tr className="hover">
//                                 <th className="text-xs md:text-sm">Country</th>
//                                 <td>{data1?.location_country}</td>
//                                 <td>{data2?.location_country}</td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default CompareActivity;