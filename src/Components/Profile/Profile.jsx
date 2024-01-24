import { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleUser } from '../../Redux/SingleUserSlice/singleUserSlice';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { updateProfile } from '@firebase/auth';
import auth from '../../firebase/firebase.config';

const Profile = () => {
    const dispatch = useDispatch()
    const { user } = useAuth()
    const { isLoading, error, user: userDetails } = useSelector(state => state.user)
    const [edit, setedit] = useState(false)
    const [ageerr, setageerr] = useState('')
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
    return (
        <div className='p-4'>
            <div className='flex justify-center items-center py-7 flex-col gap-3'>
                <img className='w-32 h-32 rounded-full' src={userDetails?.image} alt="" />

            </div>
            <div>
                <div className='w-full max-w-[450px] bg-red-500/10 mx-auto p-5 pt-12 rounded relative'>
                    <p className='text-lg font-bold mb-2 text-center'>Personal Information</p>
                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
                        {/* name  */}
                        <div>
                            <label className='font-bold flex gap-0'>Name <span className='text-primary text-lg'>*</span></label>
                            <input
                                required
                                disabled={!edit}
                                {...register("name")}
                                className={`${selectFieldFieldStyle}`} placeholder='Your Name' defaultValue={userDetails?.name} />
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
                            <button className={`${buttonStyle} active:bg-[#ff470470]  bg-[#ff4704] hover:bg-orange-700  border-transparent hover:border-[#ff4704]`}>Change</button>
                            <p onClick={handleCancel} className={`${buttonStyle} active:bg-red-800  bg-red-500 hover:bg-red-700  border-transparent hover:border-red-500`}>Cancel</p>
                        </div>
                    </form>
                    <div className={`${edit && 'hidden'} absolute top-5 right-5`}>
                        <button onClick={() => setedit(true)} className='btn btn-sm bg-primary hover:bg-orange-700 text-white'>Edit</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Profile;