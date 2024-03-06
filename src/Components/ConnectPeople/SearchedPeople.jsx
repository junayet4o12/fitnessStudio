/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAuth from '../../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleUser } from '../../Redux/SingleUserSlice/singleUserSlice';
const SearchedPeople = ({ info, personalInfo, followingSearch, setFollowing, followBtnLoading }) => {
    const axiosPublic = useAxiosPublic()
    const [updateLoading, setUpdateLoading] = useState(false)
    const { user } = useAuth()
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { user: userDetails, isLoading } = useSelector(state => state.user)
    useEffect(() => {
        dispatch(fetchSingleUser(user?.email))
    }, [dispatch, user])

    console.log(personalInfo?._id);
    const handleFollow = () => {
        setUpdateLoading(true)
        axiosPublic.put(`/following/${personalInfo?._id}`, info)
            .then(res => {
                console.log(res?.data?.followingResult, res?.data?.followedResult);
                setFollowing(followingSearch + 1)
                setUpdateLoading(false)
                const notificationInfo = {
                    userName: user?.displayName,
                    senderAvatar:user?.photoUR,
                    senderId: userDetails?._id,
                    receiverName:[info._id],
                    type:'followed',
                    time:new Date()
            
                }
                axiosPublic.post('/notifications',notificationInfo)
                .then(() =>{
                })
            })
            .catch(err => {
                console.log(err);
                setUpdateLoading(false)
            })
    }

    const followedByMe = info?.followed
    const follower = info?.following
    const isFollow = followedByMe ? followedByMe.find(data => data === personalInfo?._id) : ''
    const isFollower = follower ? follower.find(data => data === personalInfo?._id) : ''
    console.log(followedByMe, personalInfo?._id, isFollow);
    const handleProfile = () => {
        navigate(`/userProfile/${info?.email}`)
    }
    const followFollowingFollowerBtnStyle = `btn btn-sm bg-blue-500 text-white hover:bg-blue-600 border-none ${info?._id === personalInfo?._id ? 'hidden' : ' flex'}`
    return (
        <div className="relative flex w-full max-w-[35rem] mx-auto my-3 border-b border-l-[1.5px] border-gray-700 p-[6px] rounded shadow-md shadow-primary/50 justify-between items-center searchPeople ">
            <div className='flex gap-3 items-center'>
                <img className='h-9 w-9 rounded-full object-cover' src={info?.image} alt="" />
                <h2 className="text-sm font-bold">{info?.name}</h2>
            </div>
            <div className='flex items-center gap-2'>
                {
                    followBtnLoading ? <span className="loading loading-dots loading-sm"></span> : (isFollow ? <p className={`${followFollowingFollowerBtnStyle} cursor-default`}>Following</p> : (isFollower ? <p className={followFollowingFollowerBtnStyle}>Follower</p> : (!updateLoading ? <p onClick={handleFollow} className={followFollowingFollowerBtnStyle}>Follow</p> : <span className="loading loading-spinner loading-sm mr-4"></span>)))
                }
                <p
                title='Go to User profile'
                 onClick={handleProfile}
                  className=' cursor-pointer  w-9 h-9  flex justify-center items-center   transition-all duration-500 ml-2 text-2xl rounded-full active:scale-90 hover:text-black hover:bg-gray-200'><CgProfile/></p>
            </div>
        </div>
    );
};

export default SearchedPeople;