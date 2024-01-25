import { Button, Dialog, DialogFooter } from '@material-tailwind/react';

const HealthSuggetionsModal = ({ open, setOpen, suggetions }) => {
    return (
        <div>
            <Dialog
                open={open}
                className='w-screen  max-h-screen min-h-screen bg-[#00000062] flex justify-center items-center   p-5'
            >
                <div className='w-full max-w-[600px] bg-gradient-to-b to-[#954016] from-primary text-white rounded shadow-xl overflow-y-scroll max-h-[90%] relative'>
                    <div className='text-end px-6 pt-3 sticky top-0 '>
                        <button
                        onClick={() => setOpen(false)} className='transition-all  px-2 duration-100 text-xl font-bold text-white sticky hover:text-gray-200  active:scale-90 active:text-gray-300'>X</button>
                    </div>
                    <div className='mt-[-20px]'>
                    {suggetions}
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
            </Dialog>
        </div>
    );
};

export default HealthSuggetionsModal;