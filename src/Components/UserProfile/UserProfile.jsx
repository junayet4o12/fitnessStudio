// import React from 'react';

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import pageBg from '../../assets/images/dumbbells-floor-gym-ai-generative.jpg'
import UserProfileMain from "./UserProfileMain";
import Loading from "../Loading";
const UserProfile = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic()
    // style Variable start

    const inputFieldStyle = `border-[1px] w-full bg-white/70 p-3  border-primary rounded font-semibold  text-black`
    const selectFieldFieldStyle = ` border-[1px] w-full  bg-white/70 h-[50px]  border-primary rounded font-semibold  text-black`

    // style Variable end
    const { data: userData, isLoading, refetch } = useQuery({
        queryKey: [id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/single_user/${id}`)
            return res?.data
        }
    })
    if (isLoading) {
        return <Loading></Loading>
    }
    console.log(userData);
    const myBMI = (userData.weight / Math.pow(userData.height / 39.37, 2)).toFixed(2)
    const age = userData.birthDay && Math.floor((new Date() - new Date(userData.birthDay)) / 31556952000)

    const bmrForMale = 88.362 + (13.397 * userData.weight) + (4.799 * (userData?.height * 2.54)) - (5.677 * parseInt(age))
    const bmrForFemale = 447.593 + ((9.247 * userData?.weight) + (3.098 * (userData?.height * 2.54))) - (4.330 * parseInt(age))

    const myBMR = (userData?.gender === 'Male' ? bmrForMale : bmrForFemale).toFixed(2)
    return (
        <div className='p-5 lg:p-10' style={{ background: `url(${pageBg})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundAttachment: 'fixed', backgroundSize: 'cover' }}>
            <UserProfileMain age={age} myBMI={myBMI} myBMR={myBMR} userDetails={userData} refetch={refetch}></UserProfileMain>
            <div>
                <div className='w-full  bg-white/70  mx-auto p-5 pt-12 rounded relative shadow-lg '>

                    <div className=' grid grid-cols-1 sm:grid-cols-2 gap-3  p-5'>
                        <p className='text-2xl font-bold mb-2 sm:col-span-2'>Personal Information</p>
                        {/* name  */}
                        <div>
                            <label className='font-bold flex gap-0'>Name <span className='text-primary text-lg'>*</span></label>
                            <div className={`${inputFieldStyle}`}>
                                {userData?.name}
                            </div>
                        </div>
                        {/* date of birth  */}
                        <div>
                            <label className='font-bold flex gap-0'>Date of Birth <span className='text-primary text-lg'>*</span></label>
                            <div className={`${inputFieldStyle} `} >
                                {userData?.birthDay || 'Not Given'}
                            </div>

                        </div>
                        {/* weight  */}
                        <div>
                            <label className='font-bold flex gap-0'>Weight <span className='text-primary text-lg'>*</span></label>
                            <label className='font-bold text-sm'>KG</label>
                            <div className={`${inputFieldStyle}`}>
                                {userData?.weight || 'Not Given'}
                            </div>
                        </div>
                        {/* height  */}
                        <div>
                            <label className='font-bold flex gap-0'>Height <span className='text-primary text-lg'>*</span></label>
                            <div className='grid grid-cols-2 gap-3'>
                                <div>
                                    <label className='font-bold text-sm'>Feet</label>
                                    <div className={`${inputFieldStyle} `} placeholder='Feet' defaultValue={Math.floor(userData?.height / 12) || 'Not Given'} >
                                        {Math.floor(userData?.height / 12) || 'Not Given'}
                                    </div>
                                </div>
                                <div>
                                    <label className='font-bold text-sm'>Inch</label>
                                    <div className={`${inputFieldStyle} `}>
                                        {userData?.height ? (userData?.height % 12) : 'Not Given'}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* gender  */}
                        <div className='relative'>
                            <label className='font-bold flex gap-0'>Gender <span className='text-primary text-lg'>*</span></label>
                            <div className={`${selectFieldFieldStyle} flex items-center px-3`} >
                                {userData?.gender || 'Not Given'}
                            </div>
                        </div>
                        {/* action  */}

                    </div>

                </div>
            </div >
        </div >
    );
};

export default UserProfile;