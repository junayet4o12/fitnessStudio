/* eslint-disable react/prop-types */
import { useState } from 'react';
import useBMISuggestions from './useBMISuggestions';
import useAgeSuggestions from './useAgeSuggestions';
import useBMRSuggestions from './useBMRSuggestions';
import { DialogHeader } from '@material-tailwind/react';
import HealthSuggestionsModal from './HealthSuggestionsModal';
import brongeBadge from '../../assets/images/badge/brongeBadge.png'
import silverBadge from '../../assets/images/badge/silverBadge.png'
import goldBadge from '../../assets/images/badge/goldBadge.png'
import diamondBadge from '../../assets/images/badge/diamondBadge.png'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import { MdOutlineDone, MdOutlineDoneAll, MdOutlineTipsAndUpdates } from "react-icons/md";
import { heightInInch } from '../../Hooks/height';
import { ageInYearandDay } from '../../Hooks/age';
import { FaEye, FaPeopleGroup, FaPlus, FaRegPenToSquare, FaUsers } from 'react-icons/fa6';
import { GoGoal } from "react-icons/go";
import { VscEye } from "react-icons/vsc";
import { CiMenuKebab } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import Loading from '../Loading';
const ProfileMain = ({ age, myBMI, myBMR, userDetails, showMenu, setShowMenu, edit, setEdit }) => {
    const [openSuggestionsModal, setOpenSuggestionsModal] = useState(false);

    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const BMISuggestions = useBMISuggestions(myBMI);
    const ageSuggestions = useAgeSuggestions(age);
    const BMRSuggestions = useBMRSuggestions(myBMR)
    const navigate = useNavigate()
    const [showRewardCriteria, setShowRewardCryteria] = useState(false)
    const {
        data: completedGoals = {},
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["user_goal", user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/user_completed_goal_count/${user?.email}`);
            return res.data;
        },
    });
    if (isLoading) {
        return <Loading></Loading>
    }
    const completedGoal = completedGoals?.completedGoal
    const infoStyle = 'text-black w-[100%] max-w-[300px] sm:max-w-full mx-auto flex flex-wrap flex-col items-center gap-2 justify-evenly border-l-2 border-b-2 border-t border-r border-primary  px-2  rounded-lg shadow-lg hover:shadow-2xl  py-[6px]  bg-white transition-all duration-500 hover:bg-white/90 hover:border-primary/90 hover:border-l-[10px] active:scale-90 min-h-[100px] text-center '
    const linkStyle = ' flex gap-2 items-center underline hover:text-blue-800 active:scale-90 transition-all duration-500 font-medium text-sm'
    const linkStyle2 = ' flex gap-2 items-center underline hover:text-blue-500 active:scale-90 transition-all duration-500 font-medium text-sm'
    const buttonStyle = 'btn transition-all duration-500 font-semibold text-white rounded bg-primary/70 hover:bg-primary '
    console.log('hello', localStorage.getItem('stravaKey'));
    const boxTitleStyle = 'font-semibold text-primary border-b-[1.5px] border-primary px-2 rounded-sm'

    const suggestions = (age && myBMI && myBMR) ? <>
        {ageSuggestions}
        <hr className='w-[90%] mx-auto mt-3 border-[1.3px]' />
        {BMISuggestions}
        <hr className='w-[90%] mx-auto mt-3 border-[1.3px]' />
        {BMRSuggestions}
    </> : <>
        <DialogHeader className='text-white'>Please Update Your Personal Data!!!</DialogHeader>
    </>
    const handleNavigateToConnectedPage = () => {
        navigate('/dashboard/connected_with')
    }

    return (
        <div className='max-w-7xl mx-auto bmiNumber'>
            <div className='profile-Status-Section w-full mx-auto    bg-gray-300 rounded  shadow-2xl grid grid-cols-1  sm:grid-cols-2  pb-10'>
                <div className='flex flex-wrap justify-center  items-center gap-4 border-b-[17px] sm:border-r-[17px] border-white p-5 pt-16 sm:rounded-br'>
                    <div className='w-[140px] h-[140px] min-w-[140px] min-h-[140px]  p-1 rounded-full border-l-[4px] border-b-[3px] border-t-2 border-r border-primary overflow-hidden flex justify-center items-center '>
                        <img className='w-full h-full rounded-full object-cover' src={user?.photoURL} alt="" />
                    </div>
                    <div className='relative'>

                        <p className='text-base font-semibold'>{userDetails?.name}</p>
                        <span className='block sm:hidden relative'>
                            <span className='flex gap-2 items-center'>Your Badge <button onClick={() => setShowRewardCryteria(!showRewardCriteria)} className='text-sm flex justify-center items-center rounded-full transition-all duration-500 hover:bg-black/10 active:scale-90 relative h-6 w-6'> <span
                                className={`
                             absolute
                             duration-500 transition-all ${!showRewardCriteria ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
                            `}
                            ><CiMenuKebab /></span> <span
                                className={`
                                absolute
                                duration-500 transition-all ${showRewardCriteria ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
                            `}
                            ><RxCross2 /></span></button></span>
                            <span className={`flex gap-2 items-center`}>
                                <span className={`text-xs font-medium ${completedGoal < 1 ? 'block' : 'hidden'}`}>You Do not complete any goal yet!!</span>
                                <img className={`w-5 ${completedGoal > 0 ? 'block' : 'hidden'}`} src={brongeBadge} alt="" />
                                <img className={`w-5 ${completedGoal > 2 ? 'block' : 'hidden'}`} src={silverBadge} alt="" />
                                <img className={`w-5 ${completedGoal > 4 ? 'block' : 'hidden'}`} src={goldBadge} alt="" />
                                <img className={`w-5 ${completedGoal > 10 ? 'block' : 'hidden'}`} src={diamondBadge} alt="" />
                            </span>
                            <div onClick={() => setShowRewardCryteria(false)} className={` w-[150px] border-black border-2 absolute bg-white top-7 left-10 z-10  transition-all duration-500 ${!showRewardCriteria ? 'opacity-0 scale-y-0' : 'opacity-100 scale-y-100'} px-2 rounded-md`}>
                                <span className='text-xs'>According to number of completing goal</span>
                                <hr className='border  border-black' />
                                <span className='flex flex-col gap-1 py-1'>
                                    <span className='flex items-center gap-2 text-xs'><img className='w-4' src={brongeBadge} alt="" /> = 1 or more Goal</span>
                                    <span className='flex items-center gap-2 text-xs'><img className='w-4' src={silverBadge} alt="" /> = 3 or more Goal</span>
                                    <span className='flex items-center gap-2 text-xs'><img className='w-4' src={goldBadge} alt="" /> = 5 or more Goal</span>
                                    <span className='flex items-center gap-2 text-xs'><img className='w-4' src={diamondBadge} alt="" /> = 10 or more Goal</span>
                                </span>
                            </div>
                        </span>
                        <span className='flex gap-4 items-center'>
                            <button onClick={() => setOpenSuggestionsModal(true)} className={`${buttonStyle} active:bg-primary/70  my-4 border-0 border-l-[1.4px] border-b-[1.4px] rounded-md border-white p-2 flex  gap-1 text-sm`}>Personal Tips<span className='text-base tipscolor'><MdOutlineTipsAndUpdates /></span></button>

                            <button onClick={() => setShowMenu(!showMenu)} className='text-2xl  w-12 h-12 flex justify-center items-center rounded-full transition-all duration-500 hover:bg-black/10 active:scale-90  sm:hidden  relative'> <span
                                className={`
                             absolute
                             duration-500 transition-all ${!showMenu ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
                            `}
                            ><CiMenuKebab /></span> <span
                                className={`
                                absolute
                                duration-500 transition-all ${showMenu ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
                            `}
                            ><RxCross2 /></span></button>
                        </span>
                        <div
                            className={`p-3 rounded-lg w-max  border-black bg-black/80 text-white absolute bottom-[-150px] right-0  flex-col gap-2 transition-all duration-500 ${!showMenu ? 'opacity-0 scale-y-0' : 'opacity-100 scale-y-100'} flex sm:hidden`}>

                            <button onClick={() => navigate('/dashboard/set_goal')} className={linkStyle2}><GoGoal /> Create Goal</button>
                            <button onClick={() => navigate('/dashboard/goal_tracking')} className={linkStyle2}><MdOutlineDoneAll /> Complete Goal</button>
                            <button onClick={() => navigate('/dashboard/connected_with')} className={linkStyle2}><FaUsers /> See People</button>
                            <button onClick={() => navigate('/dashboard/connect_people')} className={linkStyle2}><FaPlus /> Add People</button>
                            <button onClick={() => {
                                setEdit(true)
                                setShowMenu(false)
                            }} className='transition-all duration-300 p-1 bg-white text-black rounded text-sm font-medium flex justify-center items-center hover:bg-blue-700 hover:text-white hover:rounded-md  active:scale-90'><FaRegPenToSquare />Edit Profile</button>
                        </div>
                    </div>
                </div>
                <div className='w-[100%] max-w-[300px] sm:max-w-full mx-auto sm:flex flex-col justify-start items-start gap-[10px]  sm:px-5 mt-16 hidden relative'>
                    <span><span className='flex gap-2 items-center'>Your Badge <button onClick={() => setShowRewardCryteria(!showRewardCriteria)} className='text-sm flex justify-center items-center rounded-full transition-all duration-500 hover:bg-black/10 active:scale-90 relative h-6 w-6'> <span
                        className={`
                             absolute
                             duration-500 transition-all ${!showRewardCriteria ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
                            `}
                    ><CiMenuKebab /></span> <span
                        className={`
                                absolute
                                duration-500 transition-all ${showRewardCriteria ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
                            `}
                    ><RxCross2 /></span></button></span>
                        <span className={`flex gap-2 items-center`}>
                            <span className={`text-xs font-medium ${completedGoal < 1 ? 'block' : 'hidden'}`}>You Do not complete any goal yet!!</span>
                            <img className={`w-5 ${completedGoal > 0 ? 'block' : 'hidden'}`} src={brongeBadge} alt="" />
                            <img className={`w-5 ${completedGoal > 2 ? 'block' : 'hidden'}`} src={silverBadge} alt="" />
                            <img className={`w-5 ${completedGoal > 4 ? 'block' : 'hidden'}`} src={goldBadge} alt="" />
                            <img className={`w-5 ${completedGoal > 10 ? 'block' : 'hidden'}`} src={diamondBadge} alt="" />
                        </span>
                        <div onClick={() => setShowRewardCryteria(false)} className={` w-[150px] border-black border-2 absolute bg-white top-7 left-20  transition-all duration-500 ${!showRewardCriteria ? 'opacity-0 scale-y-0' : 'opacity-100 scale-y-100'} px-2 rounded-md`}>
                            <span className='text-xs'>According to number of completing goal</span>
                            <hr className='border  border-black' />
                            <span className='flex flex-col gap-1 py-1'>
                                <span className='flex items-center gap-2 text-xs'><img className='w-4' src={brongeBadge} alt="" /> = 1 or more Goal</span>
                                <span className='flex items-center gap-2 text-xs'><img className='w-4' src={silverBadge} alt="" /> = 3 or more Goal</span>
                                <span className='flex items-center gap-2 text-xs'><img className='w-4' src={goldBadge} alt="" /> = 5 or more Goal</span>
                                <span className='flex items-center gap-2 text-xs'><img className='w-4' src={diamondBadge} alt="" /> = 10 or more Goal</span>
                            </span>
                        </div>
                    </span>
                    <button onClick={() => navigate('/dashboard/set_goal')} className={linkStyle}><GoGoal /> Create Goal</button>
                    <button onClick={() => navigate('/dashboard/goal_tracking')} className={linkStyle}><MdOutlineDoneAll /> Complete Goal</button>
                    <button onClick={() => navigate('/dashboard/connected_with')} className={linkStyle}><FaUsers /> See People</button>
                    <button onClick={() => navigate('/dashboard/connect_people')} className={linkStyle}><FaPlus /> Add People</button>
                </div>
                <div className='w-full  flex justify-center items-center sm:col-span-2 px-4 md:px-10 mt-10'>
                    <div className=' font-medium w-[100%]   grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-5 my-auto text-sm md:text-xs lg:text-sm'>
                        <p onClick={handleNavigateToConnectedPage} className={`${infoStyle} cursor-pointer`}>
                            <span className={boxTitleStyle}>Connected With</span>
                            <span className=' '>
                                <span className='text-sm font-semibold'>Following: {userDetails?.following?.length || '0'}</span>
                                <br />
                                <span className='text-sm font-semibold'>Follower: {userDetails?.followed?.length || '0'}</span>
                            </span>
                        </p>
                        <p className={infoStyle}>
                            <span className='flex flex-wrap  gap-x-5 gap-y-3 justify-around w-full'>
                                <span className='flex  flex-col gap-2 '>
                                    <span className={boxTitleStyle}>My Age</span>
                                    <span className='text-sm font-semibold   h-full'>{ageInYearandDay(userDetails?.birthDay)} </span>
                                </span>
                                <span className='flex flex-col justify-around'>
                                    <span className={boxTitleStyle}>My Gender</span>
                                    <span className='text-sm font-semibold'>
                                        {userDetails.gender ? userDetails?.gender : 'Not Updated'}
                                    </span>
                                </span>
                            </span>
                        </p>
                        <p className={infoStyle}>
                            <span className='flex gap-2 justify-around w-full flex-wrap  h-full'>
                                <span className='flex flex-col justify-around'>
                                    <span className={boxTitleStyle}>My Weight(KG)</span>
                                    <span className='text-sm font-semibold '>{userDetails.weight ? userDetails?.weight : 'Not Updated'}</span>
                                </span>
                                <span className='flex  flex-col justify-around '>
                                    <span className={boxTitleStyle}>My Height</span>
                                    <span className='text-sm font-semibold  '>{heightInInch(userDetails?.height)} </span>
                                </span>

                            </span>
                        </p>
                        <p className={infoStyle}>
                            <span className='flex gap-2 justify-around w-full flex-wrap  h-full'>
                                <span className='flex flex-col justify-around'>
                                    <span className={boxTitleStyle}>My BMI</span>
                                    <span className='text-sm font-semibold '>{!isNaN(myBMI) ? `${myBMI} kg/m` : 'Update Data'}  {!isNaN(myBMI) ? <sup> 2</sup> : ''}</span>
                                </span>
                                <span className='flex flex-col justify-around'>
                                    <span className={boxTitleStyle}>My BMR</span>
                                    <span className='text-sm font-semibold'>
                                        {!isNaN(myBMR) ? `${myBMR} Cal/Day` : 'Update Data'}
                                    </span>
                                </span>
                            </span>
                        </p>

                        <p className={`${infoStyle} sm:col-span-2 h-40`}>
                            <span className="flex flex-wrap  gap-2 flex-col   h-full w-full overflow-hidden">
                                <span className='font-semibold text-primary text-start'>Bio</span>
                                <span className='text-sm font-semibold text-start'>{!userDetails?.bio ? 'Not given' : userDetails?.bio} </span>
                            </span>
                        </p>
                    </div>

                </div>
            </div>
            <HealthSuggestionsModal open={openSuggestionsModal} setOpen={setOpenSuggestionsModal} suggestions={suggestions}></HealthSuggestionsModal>
        </div>
    );
};
// ProfileMain.propTypes ={
//     image: PropTypes.string.isRequired,
//     age: PropTypes.number.isRequired,
//     myBMI: PropTypes.number.isRequired,
//     myBMR: PropTypes.number.isRequired

// }
export default ProfileMain;