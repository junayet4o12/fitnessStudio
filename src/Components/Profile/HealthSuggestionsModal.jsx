import { Button, Dialog, DialogFooter } from '@material-tailwind/react';
import ModalBG2 from '../../assets/images/fitnessModalPic2.jpg'
import PropTypes from 'prop-types'

const HealthSuggestionsModal = ({ open, setOpen, suggestions }) => {
    return (
        <div>
            <Dialog
                color='white'
                open={open}
                size={'xxl'}
                className=' bg-[#00000062]  flex justify-center items-center p-5 text-white'
            >
                <div className='w-full rounded max-w-[600px] overflow-y-scroll max-h-[75%] md:max-h-[90%] relative  bg-no-repeat bg-cover  bg-center border-2 border-white' style={{ backgroundImage: `url(${ModalBG2})` }}>
                    <div className='w-full max-w-[600px] bg-[#000000c0] text-white rounded shadow-xl  relative'>
                        <div className='text-end px-6 pt-3 sticky top-0 '>
                            <button
                                onClick={() => setOpen(false)} className='transition-all  px-2 duration-100 text-xl font-bold text-white sticky hover:text-gray-200  active:scale-90 active:text-gray-300'>X</button>
                        </div>
                        <div className='mt-[-20px] text-white'>
                            {suggestions}
                        </div>
                        <DialogFooter>
                            <Button
                                variant="text"
                                color="red"
                                onClick={() => setOpen(false)}
                                className="mr-1 bg-white text-black hover:bg-gray-300"
                            >
                                <span>OK</span>
                            </Button>
                        </DialogFooter>


                    </div>

                </div>
            </Dialog>
        </div>
    );
};

// HealthSuggestionsModal.propTypes = {
//     open: PropTypes.bool.isRequired,
//     setOpen: PropTypes.func.isRequired,
//     suggestions: PropTypes.arrayOf(PropTypes.string).isRequired,
//   };
export default HealthSuggestionsModal;