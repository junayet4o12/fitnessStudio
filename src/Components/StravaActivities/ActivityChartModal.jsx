/* eslint-disable react/prop-types */
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";
import MaxAvgSpeedCompare from "./MaxAvgSpeedCompare";
import DistanceAct from "./DistanceAct";
import CaloryAct from "./CaloryAct";
import StravaActivitiesTitle from "./StravaActivitiesTitle";
import DurationAct from "./DurationAct";
import MovingTimeAct from './MovingTimeAct'
import ActMap from "./ActMap";
import MaxAvgSpeedComparePie from "./MaxAvgSpeedComparePie";
import { useState } from "react";
import { TiTick } from "react-icons/ti";
const ActivityChartModal = ({ handleOpen, handleClose, activity, open }) => {
    const { name, max_speed, average_speed, distance, moving_time, sport_type, start_date, type, elapsed_time, map } = activity
    const [showBarHidePie, SetShowBarHidePie] = useState(false)
    const data = [
        {
            name: "Speed Chart",
            'Maximum Speed': max_speed === 0 ? 0.00001 : parseFloat((max_speed * 1.60934).toFixed(2)),
            'Average Speed': average_speed === 0 ? 0.00001 : parseFloat((average_speed * 1.60934).toFixed(2)),
            amt: 2000
        },

    ];
    const data2 = [
        { name: 'Max Speed', value: max_speed === 0 ? 0.00001 : parseFloat((max_speed * 1.60934).toFixed(2)) },
        { name: 'Avg Speed', value: average_speed === 0 ? 0.00001 : parseFloat((average_speed * 1.60934).toFixed(2)) }

    ];
    // console.log(map);

    return (
        <Dialog
            open={open}
            size={"lg"}
            handler={handleOpen}
            className="mx-auto my-5  overflow-y-scroll  relative max-h-[90%]"
        >
            <DialogHeader className=" p-5 px-20">
                <StravaActivitiesTitle start_date={start_date} name={name}></StravaActivitiesTitle>
            </DialogHeader>
            <div>
                <div className="grid grid-cols-1 md:grid-cols-3">
                    <div className="flex  flex-col items-center">
                        <ul className="flex justify-center items-center gap-5 flex-wrap mb-2">
                            <li onClick={() => SetShowBarHidePie(false)} className={`transition-all duration-500 cursor-pointer text-sm font-semibold border-b-2   ${!showBarHidePie ? ' border-primary/70' : "border-transparent"}  hover:border-primary`}>Pie Chart</li>
                            <li onClick={() => SetShowBarHidePie(true)} className={`transition-all duration-500 cursor-pointer text-sm font-semibold border-b-2  ${showBarHidePie ? ' border-primary/70' : "border-transparent"}  hover:border-primary`}> Bar Chart</li>
                        </ul>
                        <div className={`${!showBarHidePie && 'hidden'}`}>
                            <MaxAvgSpeedCompare data={data}></MaxAvgSpeedCompare>
                        </div>
                        <div className={`${showBarHidePie && 'hidden'}`}>
                            <MaxAvgSpeedComparePie data={data2}></MaxAvgSpeedComparePie>
                        </div>

                    </div>
                    <div className="md:col-span-2 flex flex-wrap gap-x-5 justify-center items-center">
                        <div className=" flex justify-center items-center gap-5 flex-wrap">
                            {/* distance start  */}
                            <div className="w-[270px] text-black">
                                <DistanceAct distance={distance}></DistanceAct>
                            </div>
                            {/* distance end  */}

                            {/* calory start  */}
                            <div className="w-[270px] text-black">
                                <CaloryAct type={type} moving_time={moving_time}></CaloryAct>
                            </div>
                            {/* calory end  */}
                        </div>
                        <div className="flex justify-center items-center gap-5 flex-wrap">
                            {/* duration start  */}
                            <div className="w-[270px] text-black">
                                <DurationAct elapsed_time={elapsed_time}></DurationAct>
                            </div>
                            {/* duration end */}
                            {/* movingTime start  */}
                            <div className="w-[270px] text-black">
                                <MovingTimeAct moving_time={moving_time}></MovingTimeAct>
                            </div>
                            {/* movingTime end */}
                        </div>
                    </div>

                </div>
                {/* <ActMap map={map}></ActMap> */}

            </div>
            <DialogFooter className="sticky bottom-0">

                <Button
                    onClick={handleClose}
                    className='text-black bg-primary/40'
                >
                    <span>Okay</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
};

export default ActivityChartModal;