
//  StrengthTraining 
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useState } from 'react'
import Select from 'react-select'
import useStyleProperty from "../../Hooks/useStyleProperty";
import { useForm } from "react-hook-form";
const StrengthTraining = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [goalType, setGoalType] = useState(null)
    const [exerciseName, setExerciseName] = useState(null)
    const [muscleGroup,setMuscleGroup]= useState(null)
    const [buttonStyle, labelStyle, inputStyle] = useStyleProperty()
    const options = [
        { value: 'specificExercise', label: 'Specific Exercise Focus' },
        { value: 'muscleGroup', label: 'Muscle Group Focus' },
    ];
    const exerciseOptions = [
        { value: 'benchPress', label: 'Bench press ' },
        { value: 'deadlift', label: 'Deadlift ' },
        { value: 'squat', label: 'Squat' },
    ];
    const muscleGroupOptions = [
        {value: 'shoulders', label: 'Shoulder'},
        {value: 'arms', label: 'Arms'},
        {value: 'core', label: 'Core'},
    ]

    const getExerciseName = (muscleGroup) => {
        switch (muscleGroup?.value) {
            case 'shoulders':
                return 'Overhead Press Focus';
            case 'arms':
                return 'Bicep Curl & Tricep Extension Focus';
            case 'core':
                return 'Plank & Russian Twist Focus';
            default:
                return '';
        }
    };

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm();



    const onSubmit = (data) => {

        Swal.fire({
            title: "Are you sure?",
            text: "Do you create goals?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Create!",
        }).then((result) => {
            if (result.isConfirmed) {
                const toastId = toast.loading("Goal Creating...");
                const goalInfo = {
                    user_name: user?.displayName,
                    user_email: user?.email,
                    user_image: user?.photoURL,
                    goalType: goalType?.value,
                    current1Rm:data?.current1Rm,
                    target1Rm:data?.target1Rm,
                    timeline:data?.timeline,
                    exerciseName:exerciseName?.value ?? undefined,
                    frequency:data?.frequency,
                    muscleGroup:muscleGroup?.value ?? undefined,
                    exerciseNames: data?.exerciseNames ?? undefined

                    
                };
                const filteredGoalInfo = Object.fromEntries(
                    Object.entries(goalInfo).filter(([key, value]) => value !== undefined)
                )
                console.log(filteredGoalInfo)
                axiosSecure.post("user_goal", goalInfo).then((res) => {
                    if (res?.data?.insertedId) {
                        reset();
                        toast.success("Goal Created Successfully!", { id: toastId });
                    }
                });
            }
        });
    };


    
    return (
        <div className="md:flex md:items-center md:justify-center min-h-screen px-5 lg:px-10 py-20">
            <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-5 md:gap-10 lg:gap-20">
                <div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                        <span className="text-primary">Set Your
                        </span> Strength Goal
                    </h1>
                    <p className="text-base text-gray-600 font-medium mt-2">
                        Stay on target with a weekly goal
                    </p>
                    {/*Set Strength training goal Form*/}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            {/* Form header */}
                            <h1 className="text-base text-black font-semibold mt-5 mb-2">
                                Activity <span className="text-primary text-2xl">*</span>
                            </h1>

                            {/* Main form starts here */}
                            <div>
                               
                                <div className="bg-slate-100 p-4 w-full text-black rounded-xl rounded-b-md">
                                    <div className="flex items-center justify-between">
                                        <h1 className="text-white">Goal Type</h1>
                                        <div className="min-w-40 relative h-11 py-2">
                                            <Select
                                                defaultValue={goalType}
                                                onChange={setGoalType}
                                                options={options}
                                            />
                                        </div>

                                    </div>
                                    {errors.goalType?.type === "required" && (
                                        <span className="text-red-400 text-xs ">
                                            This field is required
                                        </span>
                                    )}
                                    <label className={labelStyle}>Goal Type</label>
                                </div>
                                {/* Specific exercise related */}
                                {goalType?.value === 'specificExercise' && (
                                    <>
                                        {/* Specific Exercise fields */}
                                        <div className="bg-slate-100 p-4 w-full text-black rounded-xl rounded-b-md">
                                            <div className="flex items-center justify-between">
                                                <h1 className="text-white">Exercise Name</h1>
                                                <div className="min-w-40 relative h-11 py-2">
                                                    <Select
                                                        defaultValue={exerciseName}
                                                        onChange={setExerciseName}
                                                        options={exerciseOptions}
                                                    />
                                                </div>

                                            </div>
                                            {errors.exerciseName?.type === "required" && (
                                                <span className="text-red-400 text-xs ">
                                                    This field is required
                                                </span>
                                            )}
                                            <label className={labelStyle}>Exercise Name</label>
                                        </div>


                                        <div className="bg-slate-100 p-5 rounded-md mt-2">
                                            <div className="flex items-center justify-between">
                                                <h1 className="font-semibold">Current 1-RM</h1>
                                                <div>
                                                    <div className="relative h-11">
                                                        <input
                                                            type="number"
                                                            placeholder="00"
                                                            {...register("current1Rm", {
                                                                required: true,
                                                            })}
                                                            className={inputStyle}
                                                        />
                                                        <label className={labelStyle}>
                                                            KG
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            {errors.current1Rm?.type === "required" && (
                                                <span className="text-red-400 text-xs ">
                                                    This field is required
                                                </span>
                                            )}
                                        </div>

                                        <div className="bg-slate-100 p-5 rounded-md mt-2">
                                            <div className="flex items-center justify-between">
                                                <h1 className="font-semibold">Target 1-RM</h1>
                                                <div>
                                                    <div className="relative h-11 ">
                                                        <input
                                                            type="number"
                                                            placeholder="00"
                                                            {...register("target1Rm", {
                                                                required: true,
                                                            })}
                                                            className={inputStyle}
                                                        />
                                                        <label className={labelStyle}>
                                                            KG
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            {errors.target1Rm?.type === "required" && (
                                                <span className="text-red-400 text-xs ">
                                                    This field is required
                                                </span>
                                            )}
                                        </div>

                                        <div className="bg-slate-100 p-5 rounded-md mt-2">
                                            <div className="flex items-center justify-between">
                                                <h1 className="font-semibold">Timeline</h1>

                                                <div>
                                                    <div className="relative h-11">
                                                        <input
                                                            type="date"
                                                            {...register("timeline", {
                                                                required: true,
                                                            })}
                                                            className={inputStyle}
                                                        />
                                                        <label className={labelStyle}>
                                                            KG
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            {errors.timeline?.type === "required" && (
                                                <span className="text-red-400 text-xs ">
                                                    This field is required
                                                </span>
                                            )}
                                        </div>

                                        <div className="bg-slate-100 p-5 rounded-md mt-2">
                                            <div className="flex items-center justify-between">
                                                <h1 className="font-semibold">Frequency</h1>

                                                <div>
                                                    <div className="relative h-11">
                                                        <input
                                                            type="number"
                                                            placeholder='times'

                                                            {...register("frequency", {
                                                                required: true,
                                                            })}
                                                            className={inputStyle}
                                                        />
                                                        <label className={labelStyle}>
                                                            Weekly
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            {errors.frequency?.type === "required" && (
                                                <span className="text-red-400 text-xs ">
                                                    This field is required
                                                </span>
                                            )}
                                        </div>

                                        {/* Add other fields specific to the 'specificExercise' goal type */}
                                    </>
                                )}
                                {/* Specific muscles building */}
                                
                                {goalType?.value === 'muscleGroup' && (
                                    <>
                                     <div className="bg-slate-100 p-4 w-full text-black rounded-xl rounded-b-md">
                                            <div className="flex items-center justify-between">
                                                <h1 className="text-white">Muscle Group Focus</h1>
                                                <div className="min-w-40 relative h-11 py-2">
                                                    <Select
                                                        defaultValue={muscleGroup}
                                                        onChange={setMuscleGroup}
                                                        options={muscleGroupOptions}
                                                    />
                                                </div>

                                            </div>
                                            {errors.muscleGroup?.type === "required" && (
                                                <span className="text-red-400 text-xs ">
                                                    This field is required
                                                </span>
                                            )}
                                        </div>
                                        <div className="bg-slate-100 p-5 rounded-md mt-2">
                                            <div className="flex items-center justify-between">
                                                <h1 className="font-semibold">Exercise Name</h1>
                                                <div>
                                                    <div className="relative h-11 ">
                                                        <input
                                                            type="text"
                                                            // disabled
                                                            value={getExerciseName(muscleGroup)}
                                                            placeholder="00"
                                                            {...register("exerciseNames", {
                                                                required: true,
                                                            })}
                                                            className={inputStyle}
                                                        />
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div>

                                        <div className="bg-slate-100 p-5 rounded-md mt-2">
                                            <div className="flex items-center justify-between">
                                                <h1 className="font-semibold">{muscleGroup?.value ==='shoulders' ? 'Current Overhead Press 1RM' : muscleGroup?.value ==='arms' ? 'Current Bicep Curl 1RM' :
                                                        muscleGroup?.value ==='core' ? 'Current Plank Duration' :''}</h1>
                                                <div>
                                                    <div className="relative h-11">
                                                        <input
                                                            type="number"
                                                            placeholder="00"
                                                            {...register("current1Rm", {
                                                                required: true,
                                                            })}
                                                            className={inputStyle}
                                                        />
                                                        <label className={labelStyle}>
                                                        {muscleGroup?.value ==='shoulders' ? 'kG' : muscleGroup?.value ==='arms' ? 'KG' :
                                                        muscleGroup?.value ==='core' ? 'Minute' :''}
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            {errors.current1Rm?.type === "required" && (
                                                <span className="text-red-400 text-xs ">
                                                    This field is required
                                                </span>
                                            )}
                                        </div> 

                                        <div className="bg-slate-100 p-5 rounded-md mt-2">
                                            <div className="flex items-center justify-between">
                                                <h1 className="font-semibold">{muscleGroup?.value ==='shoulders' ? 'Target Overhead Press 1RM' : muscleGroup?.value ==='arms' ? 'Target Bicep Curl 1RM' :
                                                        muscleGroup?.value ==='core' ? 'Target Plank Duration' :''}</h1>
                                                <div>
                                                    <div className="relative h-11 ">
                                                        <input
                                                            type="number"
                                                            placeholder="00"
                                                            {...register("target1Rm", {
                                                                required: true,
                                                            })}
                                                            className={inputStyle}
                                                        />
                                                        <label className={labelStyle}>{muscleGroup?.value ==='shoulders' ? 'kG' : muscleGroup?.value ==='arms' ? 'KG' :
                                                        muscleGroup?.value ==='core' ? 'Minute' :''}</label>
                                                    </div>
                                                </div>
                                            </div>
                                            {errors.target1Rm?.type === "required" && (
                                                <span className="text-red-400 text-xs ">
                                                    This field is required
                                                </span>
                                            )}
                                        </div>

                                        <div className="bg-slate-100 p-5 rounded-md mt-2">
                                           <div className="flex items-center justify-between">
                                               <h1 className="font-semibold">Timeline</h1>

                                               <div>
                                                   <div className="relative h-11">
                                                       <input
                                                           type="date"
                                                           {...register("timeline", {
                                                               required: true,
                                                           })}
                                                           className={inputStyle}
                                                       />
                                                       <label className={labelStyle}>
                                                           KG
                                                       </label>
                                                   </div>
                                               </div>
                                           </div>
                                           {errors.timeline?.type === "required" && (
                                               <span className="text-red-400 text-xs ">
                                                   This field is required
                                               </span>
                                           )}
                                        </div> 

                                        <div className="bg-slate-100 p-5 rounded-md mt-2">
                                            <div className="flex items-center justify-between">
                                                <h1 className="font-semibold">Frequency</h1>

                                                <div>
                                                    <div className="relative h-11">
                                                        <input
                                                            type="number"
                                                            placeholder='times'

                                                            {...register("frequency", {
                                                                required: true,
                                                            })}
                                                            className={inputStyle}
                                                        />
                                                        <label className={labelStyle}>
                                                            Weekly
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            {errors.targetWeight?.type === "required" && (
                                                <span className="text-red-400 text-xs ">
                                                    This field is required
                                                </span>
                                            )}
                                        </div>
                                    </>
                                )}

                            </div>
                        </div>

                        {/* Form submit button */}
                        <button
                            type="submit"
                            className={`${buttonStyle} bg-primary hover:bg-[#ff470436]  border-transparent hover:border-primary hover:text-black mt-8 mb-10 lg:mb-0`}>
                            Create Goal
                        </button>

                    </form>
                    {/* Form ends */}

                </div>
                <div>
                    <img
                        src="https://i.ibb.co/bQrRftP/Screenshot-416-removebg-preview.png"
                        className="w-[500px] mt-5 md:mt-0"
                        alt=""
                    />
                </div>
            </div>
        </div>
    );
};

export default StrengthTraining;