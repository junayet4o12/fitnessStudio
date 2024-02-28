/* eslint-disable react/prop-types */
import { useState } from 'react';
import useBMISuggestions from './useBMISuggestions';
import useAgeSuggestions from './useAgeSuggestions';
import useBMRSuggestions from './useBMRSuggestions';
import { DialogHeader } from '@material-tailwind/react';
import HealthSuggestionsModal from './HealthSuggestionsModal';
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import { MdOutlineDone, MdOutlineDoneAll, MdOutlineTipsAndUpdates } from "react-icons/md";
import { heightInInch } from '../../Hooks/height';
import { ageInYearandDay } from '../../Hooks/age';
import { FaEye, FaPeopleGroup, FaPlus, FaUsers } from 'react-icons/fa6';
import { GoGoal } from "react-icons/go";
import { VscEye } from "react-icons/vsc";
const ProfileMain = ({ age, myBMI, myBMR, userDetails }) => {
    const [openSuggestionsModal, setOpenSuggestionsModal] = useState(false);
    const { user } = useAuth()
    const BMISuggestions = useBMISuggestions(myBMI);
    const ageSuggestions = useAgeSuggestions(age);
    const BMRSuggestions = useBMRSuggestions(myBMR)
    const navigate = useNavigate()
    const infoStyle = 'text-black w-[100%] max-w-[300px] sm:max-w-full mx-auto flex flex-wrap flex-col items-center gap-2 justify-evenly border-l-2 border-b-2 border-t border-r border-primary  px-2  rounded-lg shadow-lg hover:shadow-2xl  py-[6px]  bg-white transition-all duration-500 hover:bg-white/90 hover:border-primary/90 hover:border-l-[10px] active:scale-90 min-h-[100px] text-center '
    const linkStyle = ' flex gap-2 items-center underline hover:text-blue-800 active:scale-90 transition-all duration-500 font-medium text-sm'
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
                <div className='flex flex-wrap justify-center  items-center gap-4 border-b-[8px] sm:border-r-[8px] border-white p-5 pt-16 sm:rounded-br'>
                    <div className='w-[160px] h-[160px] min-w-[160px] min-h-[160px]  p-1 rounded-full border-l-[4px] border-b-[3px] border-t-2 border-r border-primary overflow-hidden flex justify-center items-center '>
                        <img className='w-full h-full rounded-full object-cover' src={user?.photoURL} alt="" />
                    </div>
                    <div>
                        <p className='text-lg font-semibold'>{userDetails?.name}</p>
                        <button onClick={() => setOpenSuggestionsModal(true)} className={`${buttonStyle} active:bg-primary/70  my-4 border-0 border-l-[1.4px] border-b-[1.4px] rounded-md border-white p-2 flex  gap-1`}>Personal Tips<span className='text-base tipscolor'><MdOutlineTipsAndUpdates /></span></button>
                    </div>
                </div>
                <div className='w-[100%] max-w-[300px] sm:max-w-full mx-auto flex flex-col justify-start items-start gap-[10px]  sm:px-5 mt-16'>
                    <button onClick={()=> navigate('/dashboard/set_goal')} className={linkStyle}><GoGoal /> Create Goal</button>
                    <button onClick={()=> navigate('/dashboard/goal_tracking')} className={linkStyle}><MdOutlineDoneAll /> Complete Goal</button>
                    <button onClick={()=> navigate('/dashboard/connected_with')} className={linkStyle}><FaUsers /> See People</button>
                    <button onClick={()=> navigate('/dashboard/connect_people')} className={linkStyle}><FaPlus /> Add People</button>
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
                                <span className='flex  flex-col gap-2 '>
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
                        <p className={infoStyle}>
                            <span className={boxTitleStyle}>My Gender</span>
                            <span className='text-sm font-semibold  '>
                                {userDetails?.gender ? userDetails?.gender : 'Not updated'}
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