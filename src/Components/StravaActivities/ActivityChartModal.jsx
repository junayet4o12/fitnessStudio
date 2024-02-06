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
const ActivityChartModal = ({ handleOpen, handleClose, activity, open }) => {
    const { name, max_speed, average_speed, distance, moving_time, sport_type, start_date, type, elapsed_time, map } = activity
    const [showBarHidePie, SetShowBarHidePie] = useState(false)
    const data = [
        {
            name: "Speed Chart",
            'Maximum Speed': max_speed===0 ? 0.00001 : parseFloat((max_speed * 1.60934).toFixed(2)),
            'Average Speed': average_speed===0 ? 0.00001 : parseFloat((average_speed * 1.60934).toFixed(2)),
            amt: 2000
        },

    ];
    const data2 = [
        { name: 'Max Speed', value: max_speed===0 ? 0.00001 : parseFloat((max_speed * 1.60934).toFixed(2)) },
        { name: 'Avg Speed', value: average_speed===0 ? 0.00001 : parseFloat((average_speed * 1.60934).toFixed(2)) }

    ];
    console.log(map);

    return (
        <Dialog
            open={open}
            size={"lg"}
            handler={handleOpen}
            className="mx-auto my-5  overflow-y-scroll  relative"
        >
            <DialogHeader className=" p-5 px-20">
                <StravaActivitiesTitle start_date={start_date} name={name}></StravaActivitiesTitle>
            </DialogHeader>
            <DialogBody>
                <div className="grid grid-cols-1 md:grid-cols-3">
                    <div className="flex  flex-col items-center">
                        <div className={`${!showBarHidePie && 'hidden'}`}>
                            <MaxAvgSpeedCompare data={data}></MaxAvgSpeedCompare>
                        </div>
                        <div className={`${showBarHidePie && 'hidden'}`}>
                            <MaxAvgSpeedComparePie data={data2}></MaxAvgSpeedComparePie>
                        </div>
                        <div className="my-5">
                            <button onClick={() => SetShowBarHidePie(true)} className="btn btn-sm font-medium text-sm bg-primary/70 hover:bg-primary/80 text-white ml-2">Bar Chart</button>
                            <button onClick={() => SetShowBarHidePie(false)} className="btn btn-sm font-medium text-sm bg-primary/70 hover:bg-primary/80 text-white ml-2">Pie Chart</button>
                        </div>
                    </div>
                    <div className="md:col-span-2 flex flex-wrap gap-x-5 justify-center items-center">
                        <div className=" flex justify-center items-center gap-5 flex-wrap">
                            {/* distance start  */}
                            <div className="w-[270px]">
                                <DistanceAct distance={distance}></DistanceAct>
                            </div>
                            {/* distance end  */}

                            {/* calory start  */}
                            <div className="w-[270px]">
                                <CaloryAct type={type} moving_time={moving_time}></CaloryAct>
                            </div>
                            {/* calory end  */}
                        </div>
                        <div className="flex justify-center items-center gap-5 flex-wrap">
                            {/* duration start  */}
                            <div className="w-[270px]">
                                <DurationAct elapsed_time={elapsed_time}></DurationAct>
                            </div>
                            {/* duration end */}
                            {/* movingTime start  */}
                            <div className="w-[270px]">
                                <MovingTimeAct moving_time={moving_time}></MovingTimeAct>
                            </div>
                            {/* movingTime end */}
                        </div>
                    </div>

                </div>
                {/* <ActMap map={map}></ActMap> */}

            </DialogBody>
            <DialogFooter className="sticky bottom-0">

                <Button
                    variant="gradient"
                    color="green"
                    onClick={handleClose}
                    className='text-primary bg-primary/20'
                >
                    <span>Okay</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
};

export default ActivityChartModal;