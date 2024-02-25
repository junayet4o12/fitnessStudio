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
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { heightInInch } from '../../Hooks/height';
import { ageInYearandDay } from '../../Hooks/age';


const ProfileMain = ({ age, myBMI, myBMR, userDetails }) => {
    const [openSuggestionsModal, setOpenSuggestionsModal] = useState(false);
    const { user } = useAuth()
    const BMISuggestions = useBMISuggestions(myBMI);
    const ageSuggestions = useAgeSuggestions(age);
    const BMRSuggestions = useBMRSuggestions(myBMR)
    const navigate = useNavigate()
    const infoStyle = 'text-black w-[100%] max-w-[300px] sm:max-w-full mx-auto flex flex-wrap flex-col items-center gap-2 justify-evenly border-l-2 border-b-2 border-t border-r border-primary  px-2  rounded-lg shadow-lg hover:shadow-2xl  py-[6px]  bg-white transition-all duration-500 hover:bg-white/90 hover:border-primary/90 hover:border-l-[10px] active:scale-90 min-h-[100px] text-center '
    const buttonStyle = 'btn transition-all duration-500 font-bold text-white rounded bg-primary/70 hover:bg-primary '
    console.log('hello', localStorage.getItem('stravaKey'));


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
        <div className='max-w-7xl mx-auto'>
            <div className='profile-Status-Section w-full mx-auto flex  flex-col    py-7 gap-5  lg:gap-10 p-4  bg-secondary/40 rounded  shadow-2xl px-10'>
                <div className='flex flex-wrap justify-center  items-center gap-4'>
                    <div className='w-[160px] h-[160px] min-w-[160px] min-h-[160px] xs:w-[200px] xs:h-[200px] xs:min-w-[200px] xs:min-h-[200px]  p-1 rounded-full border-l-[4px] border-b-[3px] border-t-2 border-r border-primary overflow-hidden flex justify-center items-center '>
                        <img className='w-full h-full rounded-full object-cover' src={user?.photoURL} alt="" />
                    </div>
                    <div>
                        <p className='text-lg font-bold'>{userDetails?.name}</p>
                        <button onClick={() => setOpenSuggestionsModal(true)} className={`${buttonStyle} active:bg-primary/70  my-4 border-0 border-l-[1.4px] border-b-[1.4px] rounded-md border-white p-2 flex  gap-1`}>Personal Tips<span className='text-base tipscolor'><MdOutlineTipsAndUpdates /></span></button>
                    </div>
                </div>
                <div className='w-full  flex justify-center items-center'>
                    <div className=' font-medium w-[100%]   grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-5 my-auto text-sm md:text-xs lg:text-sm'>
                        <p onClick={handleNavigateToConnectedPage} className={`${infoStyle} cursor-pointer`}>
                            <span className='font-bold text-primary'>Connected With</span>
                            <span className='border-l-2 border-b-2 rounded-md border-primary p-2'>
                                <span className='text-sm font-bold'>Following: {userDetails?.following?.length || '0'}</span>
                                <br />
                                <span className='text-sm font-bold'>Follower: {userDetails?.followed?.length || '0'}</span>
                            </span>
                        </p>
                        <p className={infoStyle}>
                            <span className='flex flex-wrap  gap-x-5 gap-y-3 justify-around w-full'>
                                <span className='flex  flex-col gap-2 '>
                                    <span className='font-bold text-primary'>My Age</span>
                                    <span className='text-sm font-bold border-l-2 border-b-2 rounded-md border-primary p-2 h-full'>{ageInYearandDay(userDetails?.birthDay)} </span>
                                </span>
                                <span className='flex  flex-col gap-2 '>
                                    <span className='font-bold text-primary'>My Height</span>
                                    <span className='text-sm font-bold border-l-2 border-b-2 rounded-md border-primary p-2'>{heightInInch(userDetails?.height)} </span>
                                </span>
                            </span>
                        </p>
                        <p className={infoStyle}>
                            <span className='flex gap-2 justify-around w-full flex-wrap'>
                                <span className='flex flex-col'>
                                    <span className='font-bold text-primary'>My BMI</span>
                                    <span className='text-sm font-bold border-l-2 border-b-2 rounded-md border-primary p-2 h-full'>{!isNaN(myBMI) ? `${myBMI} kg/m` : 'Update Data'}  {!isNaN(myBMI) ? <sup> 2</sup> : ''}</span>
                                </span>
                                <span className='flex flex-col'>
                                    <span className='font-bold text-primary '>My BMR</span>
                                    <span className='text-sm font-bold border-l-2 border-b-2 rounded-md border-primary p-2 h-full'>
                                        {!isNaN(myBMR) ? `${myBMR} Cal/Day` : 'Update Data'}
                                    </span>
                                </span>
                            </span>
                        </p>
                        <p className={infoStyle}>
                            <span className='font-bold text-primary '>My Gender</span>
                            <span className='text-sm font-bold border-l-2 border-b-2 rounded-md border-primary p-2'>
                                {userDetails?.gender ? userDetails?.gender : 'Not updated'}
                            </span>
                        </p>
                        <p className={`${infoStyle} sm:col-span-2 h-40`}>
                            <span className="flex flex-wrap  gap-2 flex-col border-l-2 border-b-2 rounded-md border-primary p-2 h-full w-full overflow-hidden">
                                <span className='font-bold text-primary text-start'>Bio</span>
                                <span className='text-sm font-bold text-start'>{!userDetails?.bio ? 'Not given' : userDetails?.bio} </span>
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