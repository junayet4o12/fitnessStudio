import { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleUser } from '../../Redux/SingleUserSlice/singleUserSlice';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { updateProfile } from '@firebase/auth';
import auth from '../../firebase/firebase.config';
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react';
import HealthSuggetionsModal from './HealthSuggetionsModal';

const Profile = () => {
    const dispatch = useDispatch()
    const { user } = useAuth()
    const { isLoading, error, user: userDetails } = useSelector(state => state.user)
    const [edit, setedit] = useState(false)
    const [ageerr, setageerr] = useState('')
    const [openBMIModal, setOpenBMIModal] = useState(false);
    const [openAgeModal, setOpenAgeModal] = useState(false);
    const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm()
    const axiosPublic = useAxiosPublic()
    useEffect(() => {
        dispatch(fetchSingleUser(user?.email))
    }, [dispatch, user, edit])
    if (isLoading) {
        return ''
    }
    const inputFieldStyle = ` ${edit ? 'input input-error border-[3px]' : 'border-[1.5px]'}  w-full bg-white p-3  border-primary rounded font-semibold  text-black`
    const selectFieldFieldStyle = ` ${edit ? 'border-[3px]' : 'border-[1.5px]'}   w-full bg-white p-3  border-primary rounded font-semibold  text-black z-10`
    const buttonStyle = 'btn transition-all duration-500 font-bold text-white rounded border-[3px]  '
    const handleCancel = () => {
        reset()
        setedit(false)
    }
    const onSubmit = (data) => {
        setageerr('')
        const name = data?.name;
        const birthDay = data?.birthDay;
        const weight = parseFloat(data?.weight);
        const feet = data?.feet;
        const inch = data?.inch;
        const gender = data?.gender;
        const height = feet * 12 + parseFloat(inch);
        const isperfectAge = new Date() - new Date(birthDay);
        const ageInYears = Math.floor(isperfectAge / 31556952000);
        console.log(ageInYears);

        if (ageInYears < 5) {
            setageerr('Make sure Your age is more than 5')
            return
        }
        updateProfile(auth.currentUser, {
            displayName: name
        })
            .then(res => {
                console.log(res);
                const personalData = {
                    name,
                    birthDay,
                    weight,
                    height,
                    gender
                }
                axiosPublic.put(`/upade_user_data/${user?.email}`, personalData)
                    .then(res => {
                        console.log(res?.data);
                        if (res?.data.modifiedCount > 0) {
                            Swal.fire({
                                icon: "success",
                                title: "Updated data successfully",
                                timer: 1500
                            });
                            setedit(false)
                        }
                    })
                    .catch(err => {
                        console.log(err?.message);
                    })
            })
            .catch(err => {
                console.log(err);
            })
    }
    const infoStyle = 'flex flex-wrap gap-2 justify-between border-l-2 border-b-2 border-t border-r border-primary  px-2  rounded shadow-lg hover:shadow-2xl cursor-pointer py-[6px]  bg-orange-100 transition-all duration-500 hover:bg-white hover:border-red-600 hover:border-l-[10px] active:scale-90'
    const BMI = (userDetails.weight / Math.pow(userDetails.height / 39.37, 2)).toFixed(2)

    let BMIsuggetions = '';
    if (BMI < 18.5) {
        BMIsuggetions = <>
            <DialogHeader>Underweight</DialogHeader>
            <DialogBody>
                <ul className='list-decimal p-5'>
                    <li>Increase caloric intake with nutrient-dense foods.</li>
                    <li>Include healthy fats, proteins, and carbohydrates in meals.</li>
                    <li>Strength training exercises to build muscle mass.</li>
                </ul>

            </DialogBody>
        </>
    }
    else if (BMI >= 18.5 && BMI <= 24.9) {
        BMIsuggetions = <>
            <DialogHeader>Normal Weight</DialogHeader>
            <DialogBody>
                <p>1. Maintain balanced nutrition with whole foods.</p>
                <p>2. Engage in regular aerobic exercise (150 minutes per week).</p>
                <p>3. Monitor portion sizes and avoid excessive calorie intake.</p>

            </DialogBody>
        </>
    }
    else if (BMI >= 25 && BMI <= 29.9) {
        BMIsuggetions = <>
            <DialogHeader>Overweight</DialogHeader>
            <DialogBody>
                <p>1. Adopt a balanced diet emphasizing fruits, vegetables, and lean proteins.</p>
                <p>2. Increase physical activity (150 to 300 minutes of moderate-intensity exercise per week).</p>
                <p>3. Focus on gradual weight loss through sustainable habits.</p>

            </DialogBody>
        </>
    }
    else if (BMI >= 30 && BMI <= 34.9) {
        BMIsuggetions = <>
            <DialogHeader>Obese Class I</DialogHeader>
            <DialogBody>
                <p>1. Consult with professionals for a personalized weight loss plan.</p>
                <p>2. Combine balanced diet with increased physical activity.</p>
                <p>3. Include both aerobic exercise and strength training.</p>

            </DialogBody>
        </>
    }
    else if (BMI >= 35 && BMI <= 39.9) {
        BMIsuggetions = <>
            <DialogHeader>Obese Class II</DialogHeader>
            <DialogBody>
                <p>1. Seek comprehensive weight management guidance.</p>
                <p>2. Gradual, sustainable weight loss with behavioral interventions.</p>
                <p>3. Consider professional support for lifestyle changes.</p>

            </DialogBody>
        </>
    }
    else if (BMI >= 40) {
        BMIsuggetions = <>
            <DialogHeader>Obese Class III</DialogHeader>
            <DialogBody>
                <p>1. Immediate medical attention and intervention.</p>
                <p>2. Work with a healthcare team for a supervised weight loss plan.</p>
                <p>3. Bariatric surgery might be considered in extreme cases.</p>

            </DialogBody>
        </>
    }

    console.log(BMIsuggetions);


    const age = Math.floor((new Date() - new Date(userDetails.birthDay)) / 31556952000)
    const bmrForMale = 88.362 + (13.397 * userDetails.weight) + (4.799 * (userDetails?.height * 2.54)) - (5.677 * parseInt(age))
    // 88.362 + (13.397 x weight in kg) + (4.799 x height in cm) – (5.677 x age in years)
    const bmrForFemale = 447.593 + ((9.247 * userDetails?.weight) + (3.098 * (userDetails?.height * 2.54))) - (4.330 * parseInt(age))
    // 447.593+(9.247×70)+(3.098×(70×2.54))−(4.330×22)
    // 447.593 + (9.247 x weight in kg) + (3.098 x height in cm) – (4.330 x age in years)
    const myBMR = (userDetails?.gender === 'Male' ? bmrForMale : bmrForFemale).toFixed(2)
    console.log(isNaN(myBMR));
    return (
        <div className='p-4'>
            <div className='w-full max-w-[500px] mx-auto flex  flex-col sm:flex-row justify-center items-center sm:items-start sm:justify-start   py-7  gap-3   p-4 bg-orange-200 rounded my-5 shadow-2xl '>
                <div className='w-32 h-32 min-w-32 min-h-32 p-1 rounded-full border-l-[4px] border-b-[3px] border-t-2 border-r border-primary overflow-hidden flex justify-center items-center '>
                    <img className='w-full h-full rounded-full' src={userDetails?.image} alt="" />

                </div>
                <div className='text-sm font-medium w-[90%] space-y-3'>

                    <p className={infoStyle}>
                        <span className='font-bold text-primary'>Connected With</span>
                        <span className='text-base'>0 Friend</span>
                    </p>
                    <p onClick={() => setOpenAgeModal(true)} className={infoStyle}>
                        <span className='font-bold text-primary'>My Age</span>
                        <span className=' text-base '>{age ? `${age} Year` : 'Update Data'} </span>
                    </p>
                    <p onClick={() => setOpenBMIModal(true)} className={infoStyle}>
                        <span className='font-bold text-primary'>My BMI</span>
                        <span className=' text-base'>{!isNaN(BMI) ? `${BMI} kg/m` : 'Update Data'}  {!isNaN(BMI) ? <sup> 2</sup> : ''}
                            <span className='ml-2 text-base font-bold'>^</span>
                        </span>
                    </p>
                    <p className={infoStyle}>
                        <span className='font-bold text-primary'>My BMR</span>
                        <span className=' text-base'>
                            {!isNaN(myBMR) ? `${myBMR} Cal/Day` : 'Update Data'}
                        </span>
                    </p>
                </div>
            </div>
            <div>
                <div className='w-full max-w-[500px] bg-orange-200  mx-auto p-5 pt-12 rounded relative shadow-lg'>
                    <p className='text-lg font-bold mb-2 text-center'>Personal Information</p>
                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
                        {/* name  */}
                        <div>
                            <label className='font-bold flex gap-0'>Name <span className='text-primary text-lg'>*</span></label>
                            <input
                                required
                                disabled={!edit}
                                {...register("name")}
                                className={`${inputFieldStyle}`} placeholder='Your Name' defaultValue={userDetails?.name} />
                        </div>
                        {/* date of birth  */}
                        <div>
                            <label className='font-bold flex gap-0'>Date of Birth <span className='text-primary text-lg'>*</span></label>
                            <input
                                required
                                disabled={!edit}
                                {...register("birthDay")}
                                type={edit ? 'date' : 'text'}
                                className={`${inputFieldStyle} `} placeholder='Date of Birth' defaultValue={userDetails?.birthDay || 'Not Given'} />
                            <span className="text-sm font-bold text-red-500">{ageerr}</span>
                        </div>
                        {/* weight  */}
                        <div>
                            <label className='font-bold flex gap-0'>Weight(KG) <span className='text-primary text-lg'>*</span></label>
                            <input
                                required
                                disabled={!edit}
                                {...register("weight", {
                                    required: true, min: { value: 7, message: "weight must be minimum 7 kg" }
                                })}
                                type={edit ? 'number' : 'text'}
                                className={`${inputFieldStyle}`} placeholder='Your weight' defaultValue={userDetails?.weight ? userDetails?.weight : 'Not Given'} />
                        </div>
                        {/* height  */}
                        <div>
                            <label className='font-bold flex gap-0'>Height <span className='text-primary text-lg'>*</span></label>
                            <div className='flex gap-3'>
                                <div>
                                    <label className='font-bold text-sm'>Feet</label>
                                    <input
                                        disabled={!edit}
                                        required
                                        type={edit ? 'number' : 'text'}
                                        {...register("feet", {
                                            required: true, min: { value: 2, message: "Feet must be minimum 2" },
                                            max: { value: 7, message: "Feet Maximum be  maximum 7 feet " }
                                        })}
                                        className={`${inputFieldStyle}`} placeholder='Feet' defaultValue={Math.floor(userDetails?.height / 12) || 'Not Given'} />
                                    {errors.feet && <span className="text-sm font-bold text-red-500">{errors.feet.message}</span>}
                                </div>
                                <div>
                                    <label className='font-bold text-sm'>Inch</label>
                                    <input
                                        disabled={!edit}
                                        required
                                        type={edit ? 'number' : 'text'}
                                        {...register("inch", {
                                            required: true,
                                            max: { value: 11, message: "Inch must be Maximum 11 inch " }
                                        })}
                                        className={`${inputFieldStyle}`} placeholder='Inch' defaultValue={userDetails?.height ? (userDetails?.height % 12) : 'Not Given'} />
                                    {errors.inch && <span className="text-sm font-bold text-red-500">{errors.inch.message}</span>}
                                </div>
                            </div>
                        </div>
                        {/* gender  */}
                        <div className='relative '>
                            <label className='font-bold flex gap-0'>Gender <span className='text-primary text-lg'>*</span></label>
                            <select
                                required
                                disabled={!edit}
                                {...register("gender")}
                                className={`${selectFieldFieldStyle}`} placeholder='Your gender' defaultValue={userDetails?.gender}>
                                <option value={''} disabled selected>
                                    Select Gender
                                </option>
                                <option >
                                    Male
                                </option>
                                <option >
                                    Female
                                </option>
                            </select>
                            <div className={`${!edit ? 'block' : 'hidden'} w-4 h-4 bg-white absolute bottom-4 right-1 `}></div>
                        </div>
                        {/* action  */}
                        <div className={`${!edit && 'hidden'} flex gap-5`}>
                            <button className={`${buttonStyle} active:bg-[#ff470470]  bg-[#ff4704] hover:bg-orange-700  border-transparent hover:border-[#ff4704]`}>Update</button>
                            <p onClick={handleCancel} className={`${buttonStyle} active:bg-red-800  bg-red-500 hover:bg-red-700  border-transparent hover:border-red-500`}>Cancel</p>
                        </div>
                    </form>
                    <div className={`${edit && 'hidden'} absolute top-5 right-5`}>
                        <button onClick={() => setedit(true)} className='btn btn-sm bg-primary hover:bg-orange-700 text-white'>Edit</button>
                    </div>
                </div>
            </div>
           <HealthSuggetionsModal open={openBMIModal} setOpen={setOpenBMIModal} suggetions={BMIsuggetions}></HealthSuggetionsModal>
           <HealthSuggetionsModal open={openAgeModal} setOpen={setOpenAgeModal} suggetions={BMIsuggetions}></HealthSuggetionsModal>
        </div>
    );
};

export default Profile;