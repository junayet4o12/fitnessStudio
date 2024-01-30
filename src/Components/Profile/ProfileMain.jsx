import { useState } from 'react';
import useBMISuggestions from './useBMISuggestions';
import useAgeSuggestions from './useAgeSuggestions';
import useBMRSuggestions from './useBMRSuggestions';
import { DialogHeader } from '@material-tailwind/react';
import HealthSuggestionsModal from './HealthSuggestionsModal';
import PropTypes from 'prop-types'


const ProfileMain = ({ image, age, myBMI, myBMR }) => {
    const [openSuggestionsModal, setOpenSuggestionsModal] = useState(false);
    const BMISuggestions = useBMISuggestions(myBMI);
    const ageSuggestions = useAgeSuggestions(age);
    const BMRSuggestions = useBMRSuggestions(myBMR)
    const infoStyle = 'w-[100%] flex flex-wrap flex-col items-center gap-2 justify-evenly border-l-2 border-b-2 border-t border-r border-primary  px-2  rounded-lg shadow-lg hover:shadow-2xl cursor-pointer py-[6px]  bg-orange-100 transition-all duration-500 hover:bg-white hover:border-red-600 hover:border-l-[10px] active:scale-90 min-h-[100px] text-center'
    const buttonStyle = 'btn transition-all duration-500 font-bold text-white rounded border-[3px]  '

    const suggestions = (age && myBMI && myBMR) ? <>
        {ageSuggestions}
        <hr className='w-[90%] mx-auto mt-3 border-[1.3px]' />
        {BMISuggestions}
        <hr className='w-[90%] mx-auto mt-3 border-[1.3px]' />
        {BMRSuggestions}
    </> : <>
        <DialogHeader >Please Update Your Personal Data!!!</DialogHeader>
    </>
    return (
        <div>
            <div className='profile-Status-Section w-full mx-auto flex  flex-col sm:flex-row justify-center items-center sm:items-center sm:justify-start   py-7  gap-5   p-4 bg-orange-200 rounded my-5 shadow-2xl '>
                <div className='flex flex-col justify-center items-center'>
                    <div className='w-[200px] h-[200px] min-w-[200px] min-h-[200px] 
                lg:w-[250px]  lg:h-[250px] lg:min-w-[250px] lg:min-h-[250px] p-1 rounded-full border-l-[4px] border-b-[3px] border-t-2 border-r border-primary overflow-hidden flex justify-center items-center '>
                        <img className='w-full h-full rounded-full' src={image} alt="" />
                    </div>
                    <div>
                        <button onClick={() => setOpenSuggestionsModal(true)} className={`${buttonStyle} active:bg-[#ff470470]  bg-[#ff4704] hover:bg-orange-700  border-transparent hover:border-[#ff4704] my-4`}>Personal Suggestions</button>
                    </div>
                </div>
                <div className='w-full'>
                    <div className='text-sm font-medium w-[100%] lg:w-[80%]  grid grid-cols-2 md:grid-cols-2 gap-2 my-auto'>
                        <p className={infoStyle}>
                            <span className='font-bold text-primary'>Connected With</span>
                            <span className='text-base'>0 Friend</span>
                        </p>
                        <p className={infoStyle}>
                            <span className='font-bold text-primary'>My Age</span>
                            <span className=' text-base '>{age ? `${age} Year` : 'Update Data'} </span>
                        </p>
                        <p className={infoStyle}>
                            <span className='font-bold text-primary'>My BMI</span>
                            <span className=' text-base'>{!isNaN(myBMI) ? `${myBMI} kg/m` : 'Update Data'}  {!isNaN(myBMI) ? <sup> 2</sup> : ''}</span>
                        </p>
                        <p className={infoStyle}>
                            <span className='font-bold text-primary'>My BMR</span>
                            <span className=' text-base'>
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