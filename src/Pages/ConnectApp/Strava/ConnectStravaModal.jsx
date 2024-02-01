import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react';
// import React from 'react';
import ModalBG2 from '../../../assets/images/strava.jpeg'
import { useNavigate } from 'react-router';
import useAxiosStrava from '../../../Hooks/useAxiosStrava';
const ConnectStravaModal = ({ open, setOpen }) => {
    const axiosStrava = useAxiosStrava()
    const navigate = useNavigate()
    const buttonStyle =
        "btn btn-xs transition-all duration-500  font-bold text-white rounded  active:bg-[#ff470470] active:scale-90 text-xs border-transparent hover:border-transparent";
    const handleAuthorize = async () => {


        try {
            const response = await axiosStrava.get('/authorizestrava');

            if (response.status === 200) {
                const authurl = response.data.auth
                console.log(authurl)
                setOpen(false)
                navigate(`//${authurl}`)
                console.log('Redirecting to Fitbit for authorization');
            } else {
                console.error('Authorization failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }

    };
    return (

        <Dialog
            open={open}
            size={'xl'}
            className='w-screen mx-auto   max-h-screen min-h-screen bg-[#00000062] flex justify-center items-center   p-5'
        >
            <div className='w-full rounded max-w-[600px] overflow-y-scroll max-h-[90%] relative bg-gray-200 ' >
                <div className='w-full max-w-[600px]   rounded shadow-xl max-h-[90%] relative text-black font-medium'>
                    <div className='text-end px-6 pt-3 sticky top-0 z-10'>
                        <button
                            onClick={() => setOpen(false)} className='transition-all  px-2 duration-100 text-xl font-bold text-gray-700 sticky hover:text-gray-900  active:scale-90 active:text-black z-10'>X</button>
                    </div>
                    <div className='mt-[-20px]'>
                        <DialogHeader className='py-3'>Terms and conditions</DialogHeader>
                        <DialogBody className='py-0'>
                            <ul className='list-disc py-1 px-5 text-sm'>
                                <li>By connecting your Strava account, you authorize our platform to access and retrieve certain data from your Strava account, including but not limited to your activities, workouts, routes, and profile information.</li>
                                <hr className='border-[1.3px] border-primary my-2' />

                                <li>We are committed to protecting your privacy and maintaining the security of your data. We will only use the information retrieved from your Strava account in accordance with our Privacy Policy. We will not share your data with any third parties without your consent, except as required by law.</li>
                                <hr className='border-[1.3px] border-primary my-2' />
                                <li>You are responsible for maintaining the security of your Strava account credentials. Do not share your login information with anyone else. You are solely responsible for any activities that occur under your Strava account.</li>
                                <hr className='border-[1.3px] border-primary my-2' />
                                <li>While we strive to ensure the accuracy and reliability of the data retrieved from your Strava account, we cannot guarantee the completeness, accuracy, or reliability of such data. You acknowledge that the data provided by Strava may be subject to errors or inaccuracies.</li>
                                <hr className='border-[1.3px] border-primary my-2' />
                                <li>We may use the data retrieved from your Strava account to provide you with personalized features, insights, and recommendations based on your activities. We may also use aggregated and anonymized data for analytical and research purposes.</li>
                                <hr className='border-[1.3px] border-primary my-2' />
                            </ul>


                        </DialogBody>
                    </div>
                    <div className='px-5 py-2 flex gap-3  bg-blue-300 sticky bottom-0'>
                        <button
                            className={`${buttonStyle} bg-blue-800 hover:bg-blue-900  `}
                            onClick={() => handleAuthorize()}

                        >
                            <span>I Accept</span>
                        </button>
                        <button

                            onClick={() => setOpen(false)}
                            className={`${buttonStyle} bg-red-600 hover:bg-red-700 `}
                        >
                            <span>Cancel</span>
                        </button>
                    </div>


                </div>

            </div>
        </Dialog>

    );
};

export default ConnectStravaModal;