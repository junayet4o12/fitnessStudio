/* eslint-disable react/prop-types */

import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useEffect } from "react";
import { fetchSingleUser } from "../../Redux/SingleUserSlice/singleUserSlice";
import Loading from "../Loading";

const UserProfileMain = ({ age, myBMI, myBMR, userDetails, refetch, userPost }) => {
    const dispatch = useDispatch()
    const { user } = useAuth()
    const { user: personalInfo, isLoading } = useSelector(state => state.user)
    const axiosPublic = useAxiosPublic()
    useEffect(() => {
        dispatch(fetchSingleUser(user?.email))
    }, [dispatch, user])

    if (isLoading) {
        return <Loading></Loading>
    }
    const infoStyle = 'w-[100%] flex flex-wrap flex-col items-center gap-2 justify-evenly border-l-2 border-b-2 border-t border-r border-primary  px-2  rounded-lg shadow-lg hover:shadow-2xl  py-[6px]  bg-white/70 transition-all duration-500 hover:bg-white hover:border-primary/90 hover:border-l-[10px] active:scale-90 min-h-[100px] text-center '
    const infoStyle2 = 'w-[100%] flex flex-wrap  items-center gap-2 justify-evenly border-l-2 border-b-2 border-t border-r border-primary  px-2  rounded-lg shadow-lg hover:shadow-2xl  py-[6px]  bg-white/70 transition-all duration-500 hover:bg-white hover:border-primary/90 hover:border-l-[10px] active:scale-90 min-h-[100px] text-center '

    const handleFollow = () => {
        axiosPublic.put(`/following/${personalInfo?._id}`, userDetails)
            .then(res => {
                console.log(res?.data?.followingResult, res?.data?.followedResult);
                refetch()
            })
            .catch(err => {
                console.log(err);
            })
    }

    const followedByMe = userDetails?.followed
    const follower = userDetails?.following
    const isFollow = followedByMe ? followedByMe.find(data => data === personalInfo?._id) : ''
    const isFollower = follower ? follower.find(data => data === personalInfo?._id) : ''
    console.log(followedByMe, personalInfo?._id, isFollow);


    return (
        <div className='max-w-7xl mx-auto'>
            <div className='profile-Status-Section w-full mx-auto flex  flex-col sm:flex-row justify-center items-center sm:items-center sm:justify-start   py-7 gap-5  lg:gap-10 p-4 bg-white/60 rounded my-5 shadow-2xl px-10'>
                <div className='flex flex-col justify-center items-center'>
                    <div className='w-[200px] h-[200px] min-w-[200px] min-h-[200px] 
                lg:w-[250px]  lg:h-[250px] lg:min-w-[250px] lg:min-h-[250px] p-1 rounded-full border-l-[4px] border-b-[3px] border-t-2 border-r border-primary overflow-hidden flex justify-center items-center '>
                        <img className='w-full h-full rounded-full' src={userDetails?.image} alt="" />
                    </div>
                    {
                        isFollow ? <p className='btn btn-sm bg-blue-500 text-white hover:bg-blue-600 border-none mt-2'>Following</p> : (isFollower ? <p className='btn btn-sm bg-blue-500 text-white hover:bg-blue-600 border-none mt-2'>Follower</p> : <p onClick={handleFollow} className='btn btn-sm bg-blue-500 text-white hover:bg-blue-600 border-none mt-2'>Follow</p>)
                    }
                </div>
                <div className='w-full  flex justify-center items-center'>
                    <div className=' font-medium w-[100%]   grid grid-cols-2 md:grid-cols-2 gap-2 lg:gap-5 my-auto text-sm md:text-xs lg:text-sm'>
                        <p className={infoStyle}>
                            <span className='font-bold text-primary'>Connected With</span>
                            <span className="border-l-2 border-b-2 rounded-md border-primary p-2">
                                <span className='text-sm font-bold'>Following: {userDetails?.following?.length || '0'}</span>
                                <br />
                                <span className='text-sm font-bold'>Follower: {userDetails?.followed?.length || '0'}</span>
                            </span>
                        </p>
                        <p className={infoStyle}>
                            <span className='font-bold text-primary'>Total Posts</span>
                            <span className='text-sm font-bold border-l-2 border-b-2 rounded-md border-primary p-2'>
                                {userPost?.length}
                            </span>
                        </p>
                        <p className={`${infoStyle2}`}>
                            <span className="flex flex-wrap justify-center items-center gap-2 flex-col border-l-2 border-b-2 rounded-md border-primary p-2">
                                <span className='font-bold text-primary'>Age</span>
                                <span className='text-sm font-bold'>{age ? `${age} Year` : 'Not Updated'} </span>
                            </span>

                            <span className="flex flex-wrap justify-center items-center gap-2 flex-col border-l-2 border-b-2 rounded-md border-primary p-2">
                                <span className='font-bold text-primary'>Gender</span>
                                <span className='text-sm font-bold'>{userDetails?.gender} </span>
                            </span>
                        </p>
                        <p className={infoStyle2}>
                            <span className="flex flex-wrap justify-center items-center gap-2 flex-col border-l-2 border-b-2 rounded-md border-primary p-2">
                                <span className='font-bold text-primary'>BMI</span>
                                <span className='text-sm font-bold'>{!isNaN(myBMI) ? `${myBMI} kg/m` : 'Not Updated'}  {!isNaN(myBMI) ? <sup> 2</sup> : ''}</span>
                            </span>

                            <span className="flex flex-wrap justify-center items-center gap-2 flex-col border-l-2 border-b-2 rounded-md border-primary p-2">
                                <span className='font-bold text-primary'>Weight</span>
                                <span className='text-sm font-bold'>{userDetails?.weight ? `${userDetails?.weight} KG` : 'Not Updated'} </span>
                            </span>

                        </p>

                    </div>

                </div>
            </div>

        </div>
    );
};
// ProfileMain.propTypes ={
//     image: PropTypes.string.isRequired,
//     age: PropTypes.number.isRequired,
//     myBMI: PropTypes.number.isRequired,
//     myBMR: PropTypes.number.isRequired

// }
export default UserProfileMain;