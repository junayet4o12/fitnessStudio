// import React from 'react';
import { useEffect, useState } from 'react';
import Container from '../../../Components/Container/Container';
import Title from '../../../Components/Title/Title';
import TandCImg from '../../../assets/images/TermAndCondition.jpg'
import ConnectStravaModal from './ConnectStravaModal';
import useAxiosStrava from '../../../Hooks/useAxiosStrava';
import { useNavigate } from 'react-router';
const StravaCondition = () => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [exchangeCode, setExchangeCode] = useState('')
    const [isRegister, setIsRegister] = useState(localStorage.getItem('stravaKey'))
    const axiosStrava = useAxiosStrava()
    const buttonStyle =
        "btn transition-all duration-500  font-bold text-white hover:text-black text-sm rounded border-[3px] active:bg-[#ff470470] active:scale-90";
    const disbuttonStyle =
        "transition-all duration-500  font-bold text-white  text-sm rounded border-[3px]  active:scale-90";
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');

        if (!exchangeCode) {
            if (code) {

                console.log('Received authorization code:', code);
                setExchangeCode(code)
                axiosStrava.post('http://localhost:5000/callbackstrava', { exchangeCode: code })
                    .then(res => {
                        console.log(res.data.accessToken)
                        const token = res.data.accessToken
                        localStorage.setItem('stravaKey', token)
                        navigate('/dashboard/connect_app')
                    })
                    .catch(err => {
                        console.log(err?.message);
                    })
            }
        }
        else {
            console.log('eroi');
        }
    }, []);
    return (
        <Container>
            <div className='p-4'>
                <Title title={'Connect Strava'}></Title>
                <div className=' grid lg:grid-cols-2 justify-center items-center gap-10 '>
                    <div className='p-5 flex justify-center items-center'>
                        <div className='max-w-[450px]'>
                            <div className='text-sm font-medium'>
                                <p>
                                    1.  Once your Strava account is connected, ensure that your activities are syncing correctly. You should see your recent workouts, runs, rides, and other activities displayed on our platform.
                                </p>
                                <hr className='border-[1.3px] border-primary my-2' />
                                <p>
                                    2. Consider setting personal fitness goals within our platform based on your Strava activities. Whether it's a certain mileage target for running or a number of cycling sessions per week, setting goals can help keep you motivated and focused.
                                </p>
                                <hr className='border-[1.3px] border-primary my-2' />

                                <p>
                                    3. Keep an eye out for updates and new features released on our platform. We're constantly striving to improve the user experience and add value to your fitness journey.
                                </p>
                                <hr className='border-[1.3px] border-primary my-2' />
                            </div>
                            {
                                isRegister ? <button 
                                disabled
                                className={`${disbuttonStyle} bg-[#ff4704]   border-transparent  my-3 p-3`}>Already Connected</button> : <button onClick={() => setOpen(true)} className={`${buttonStyle} bg-[#ff4704] hover:bg-[#ff470436]  border-transparent hover:border-[#ff4704] my-3`}>Connect Strava</button>
                            }
                            
                        </div>
                    </div>

                    <img className=' hidden lg:block h-full' src={TandCImg} alt="" />

                </div>

            </div>
            <ConnectStravaModal open={open} setOpen={setOpen}></ConnectStravaModal>
        </Container>
    );
};

export default StravaCondition;