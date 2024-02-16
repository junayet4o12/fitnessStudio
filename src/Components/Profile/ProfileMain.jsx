/* eslint-disable react/prop-types */
import { useState } from 'react';
import useBMISuggestions from './useBMISuggestions';
import useAgeSuggestions from './useAgeSuggestions';
import useBMRSuggestions from './useBMRSuggestions';
import { DialogHeader } from '@material-tailwind/react';
import HealthSuggestionsModal from './HealthSuggestionsModal';
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom';



const ProfileMain = ({ age, myBMI, myBMR, userDetails }) => {
    const [openSuggestionsModal, setOpenSuggestionsModal] = useState(false);
    const BMISuggestions = useBMISuggestions(myBMI);
    const ageSuggestions = useAgeSuggestions(age);
    const BMRSuggestions = useBMRSuggestions(myBMR)
    const navigate = useNavigate()
    const infoStyle = 'w-[100%] flex flex-wrap flex-col items-center gap-2 justify-evenly border-l-2 border-b-2 border-t border-r border-primary  px-2  rounded-lg shadow-lg hover:shadow-2xl  py-[6px]  bg-white/70 transition-all duration-500 hover:bg-white hover:border-primary/90 hover:border-l-[10px] active:scale-90 min-h-[100px] text-center '
    const buttonStyle = 'btn transition-all duration-500 font-bold text-white rounded border-[3px]  '
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
            <div className='profile-Status-Section w-full mx-auto flex  flex-col sm:flex-row justify-center items-center sm:items-center sm:justify-start   py-7 gap-5  lg:gap-10 p-4 bg-white/60 rounded my-5 shadow-2xl px-10'>
                <div className='flex flex-col justify-center items-center'>
                    <div className='w-[200px] h-[200px] min-w-[200px] min-h-[200px] 
                lg:w-[250px]  lg:h-[250px] lg:min-w-[250px] lg:min-h-[250px] p-1 rounded-full border-l-[4px] border-b-[3px] border-t-2 border-r border-primary overflow-hidden flex justify-center items-center '>
                        <img className='w-full h-full rounded-full' src={userDetails?.image} alt="" />
                    </div>
                    <div>
                        <button onClick={() => setOpenSuggestionsModal(true)} className={`${buttonStyle} active:bg-primary/70  bg-primary hover:bg-primary/90  border-transparent hover:border-primary my-4`}>Personal Suggestions</button>
                    </div>
                </div>
                <div className='w-full  flex justify-center items-center'>
                    <div className=' font-medium w-[100%]   grid grid-cols-2 md:grid-cols-2 gap-2 lg:gap-5 my-auto text-sm md:text-xs lg:text-sm'>
                        <p onClick={handleNavigateToConnectedPage} className={`${infoStyle} cursor-pointer`}>
                            <span className='font-bold text-primary'>Connected With</span>
                            <span>
                                <span className='text-sm font-bold'>Following: {userDetails?.following?.length || '0'}</span>
                                <br />
                                <span className='text-sm font-bold'>Follower: {userDetails?.followed?.length || '0'}</span>
                            </span>
                        </p>
                        <p className={infoStyle}>
                            <span className='font-bold text-primary'>My Age</span>
                            <span className='text-sm font-bold'>{age ? `${age} Year` : 'Update Data'} </span>
                        </p>
                        <p className={infoStyle}>
                            <span className='font-bold text-primary'>My BMI</span>
                            <span className='text-sm font-bold'>{!isNaN(myBMI) ? `${myBMI} kg/m` : 'Update Data'}  {!isNaN(myBMI) ? <sup> 2</sup> : ''}</span>
                        </p>
                        <p className={infoStyle}>
                            <span className='font-bold text-primary'>My BMR</span>
                            <span className='text-sm font-bold'>
                                {!isNaN(myBMR) ? `${myBMR} Cal/Day` : 'Update Data'}
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