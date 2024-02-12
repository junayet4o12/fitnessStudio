/* eslint-disable react/prop-types */
import React from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAuth from '../../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const SearchedPeople = ({ info, personalInfo, followingSearch, setFollowing }) => {
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()
    const navigate = useNavigate();

    console.log(personalInfo?._id);
    const handleFollow = () => {
        axiosPublic.put(`/following/${personalInfo?._id}`, info)
            .then(res => {
                console.log(res?.data?.followingResult, res?.data?.followedResult);
                setFollowing(followingSearch + 1)
            })
            .catch(err => {
                console.log(err);
            })
    }

    const followedByMe = info?.followed
    const follower = info?.following
    const isFollow = followedByMe ? followedByMe.find(data => data === personalInfo?._id) : ''
    const isFollower = follower ? follower.find(data => data === personalInfo?._id) : ''
    console.log(followedByMe, personalInfo?._id, isFollow);
    const handleProfile = () => {
        navigate(`/dashboard/users_profile/${info?._id}`)
    }
    if (info?._id === personalInfo?._id) {
        return ''
    }
    return (
        <div className="relative flex w-full max-w-[35rem] mx-auto my-4 border-b border-l-[1.5px] border-gray-700 p-[6px] rounded shadow-md shadow-primary/20 justify-between items-center ">
            <div className='flex gap-3 items-center'>
                <img className='h-9 w-9 rounded-full' src={info?.image} alt="" />
                <h2 className="text-sm font-bold">{info?.name}</h2>
            </div>
            <div>
                {
                    isFollow ? <p className='btn btn-sm bg-blue-500 text-white hover:bg-blue-600'>Following</p> : (isFollower ? <p className='btn btn-sm bg-blue-500 text-white hover:bg-blue-600'>Follower</p> : <p onClick={handleFollow} className='btn btn-sm bg-blue-500 text-white hover:bg-blue-600'>Follow</p>)
                }
                <p onClick={handleProfile} className='btn btn-sm bg-gray-800 text-white border border-gray-800 hover:bg-black  hover:border-black transition-all duration-500 ml-2'>Profile</p>
            </div>
        </div>
    );
};

export default SearchedPeople;