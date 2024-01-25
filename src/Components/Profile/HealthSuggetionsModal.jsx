import { Button, Dialog, DialogFooter } from '@material-tailwind/react';

const HealthSuggetionsModal = ({open, setOpen, suggetions}) => {
    return (
        <div>
            <Dialog
                open={open}
                className='w-screen  min-h-screen bg-[#00000062] flex justify-center items-center  p-5'
            >
                <div className='w-full max-w-[500px] bg-orange-800 text-white rounded shadow-xl'>
                    {suggetions}
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