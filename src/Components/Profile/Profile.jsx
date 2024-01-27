import { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleUser } from '../../Redux/SingleUserSlice/singleUserSlice';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { updateProfile } from '@firebase/auth';
import auth from '../../firebase/firebase.config';
import { DialogBody, DialogHeader } from '@material-tailwind/react';
import HealthSuggetionsModal from './HealthSuggetionsModal';

const Profile = () => {
    const dispatch = useDispatch()
    const { user } = useAuth()
    const { isLoading, user: userDetails } = useSelector(state => state.user)
    const data = useSelector(state=> state)
    console.log(data);
    const [edit, setedit] = useState(false)
    const [ageerr, setageerr] = useState('')
    const [openSuggetionsModal, setOpenSuggetionsModal] = useState(false);
    const { register, handleSubmit, reset, formState: { errors }, } = useForm()
    const axiosPublic = useAxiosPublic()
    useEffect(() => {
        dispatch(fetchSingleUser(user?.email))
    }, [dispatch, user, edit])
    if (isLoading) {
        return ''
    }

    const inputFieldStyle = ` ${edit ? 'input input-error border-[3px]' : 'border-[1.5px] cursor-not-allowed'}  w-full bg-white p-3  border-primary rounded font-semibold  text-black`
    const selectFieldFieldStyle = ` ${edit ? 'border-[3px]' : 'border-[1.5px] cursor-not-allowed'}   w-full  bg-white h-[50px]  border-primary rounded font-semibold  text-black`
    const buttonStyle = 'btn transition-all duration-500 font-bold text-white rounded border-[3px]  '
    const handleCancel = () => {
        reset()
        setedit(false)
    }
    const onSubmit = (data) => {
        setageerr('')
        const name = data?.name;
        const birthDay = data?.birthDay;
        const weight = parseFloat(data?.weight);
        const feet = data?.feet;
        const inch = data?.inch;
        const gender = data?.gender;
        const height = feet * 12 + parseFloat(inch);
        const isperfectAge = new Date() - new Date(birthDay);
        const ageInYears = Math.floor(isperfectAge / 31556952000);
        console.log(ageInYears);

        if (ageInYears < 5) {
            setageerr('Make sure Your age is more than 5')
            return
        }
        updateProfile(auth.currentUser, {
            displayName: name
        })
            .then(res => {
                console.log(res);
                const personalData = {
                    name,
                    birthDay,
                    weight,
                    height,
                    gender
                }
                axiosPublic.put(`/update_user_data/${user?.email}`, personalData)
                    .then(res => {
                        console.log(res?.data);
                        if (res?.data.modifiedCount > 0) {
                            Swal.fire({
                                icon: "success",
                                title: "Updated data successfully",
                                timer: 1500
                            });
                            setedit(false)
                        }
                    })
                    .catch(err => {
                        console.log(err?.message);
                    })
            })
            .catch(err => {
                console.log(err);
            })
    }
    const infoStyle = 'w-[100%] flex flex-wrap flex-col items-center gap-2 justify-evenly border-l-2 border-b-2 border-t border-r border-primary  px-2  rounded-lg shadow-lg hover:shadow-2xl cursor-pointer py-[6px]  bg-orange-100 transition-all duration-500 hover:bg-white hover:border-red-600 hover:border-l-[10px] active:scale-90 min-h-[100px] text-center'

    const BMI = (userDetails.weight / Math.pow(userDetails.height / 39.37, 2)).toFixed(2)
    const age = userDetails.birthDay && Math.floor((new Date() - new Date(userDetails.birthDay)) / 31556952000)
    const bmrForMale = 88.362 + (13.397 * userDetails.weight) + (4.799 * (userDetails?.height * 2.54)) - (5.677 * parseInt(age))

    const bmrForFemale = 447.593 + ((9.247 * userDetails?.weight) + (3.098 * (userDetails?.height * 2.54))) - (4.330 * parseInt(age))

    const myBMR = (userDetails?.gender === 'Male' ? bmrForMale : bmrForFemale).toFixed(2)
    console.log(isNaN(myBMR));
    let BMIsuggetions = '';
    let ageSuggetions = ''
    if (BMI < 18.5) {
        BMIsuggetions = <>
            <DialogHeader className='py-3'>Underweight</DialogHeader>
            <DialogBody className='py-0'>
                <ul className='list-decimal px-5 text-sm'>
                    <li>Increase caloric intake with nutrient-dense foods.</li>
                    <li>Include healthy fats, proteins, and carbohydrates in meals.</li>
                    <li>Strength training exercises to build muscle mass.</li>
                </ul>

            </DialogBody>
        </>
    }
    else if (BMI >= 18.5 && BMI <= 24.9) {
        BMIsuggetions = <>
            <DialogHeader className='py-3'>Normal Weight</DialogHeader>
            <DialogBody className='py-0'>
                <ul className='list-decimal px-5 text-sm'>
                    <li>Maintain balanced nutrition with whole foods.</li>
                    <li>Engage in regular aerobic exercise (150 minutes per week)</li>
                    <li>Monitor portion sizes and avoid excessive calorie intake.</li>
                </ul>


            </DialogBody>
        </>
    }
    else if (BMI >= 25 && BMI <= 29.9) {
        BMIsuggetions = <>
            <DialogHeader className='py-3'>Overweight</DialogHeader>
            <DialogBody className='py-0'>
                <ul className='list-decimal px-5 text-sm'>
                    <li>Adopt a balanced diet emphasizing fruits, vegetables, and lean proteins.</li>
                    <li>Increase physical activity (150 to 300 minutes of moderate-intensity exercise per week).</li>
                    <li>Focus on gradual weight loss through sustainable habits.</li>
                </ul>


            </DialogBody>
        </>
    }
    else if (BMI >= 30 && BMI <= 34.9) {
        BMIsuggetions = <>
            <DialogHeader className='py-3'>Obese Class I</DialogHeader>
            <DialogBody className='py-0'>
                <ul className='list-decimal px-5 text-sm'>
                    <li>Consult with professionals for a personalized weight loss plan.</li>
                    <li>Combine balanced diet with increased physical activity.</li>
                    <li>Include both aerobic exercise and strength training.</li>
                </ul>


            </DialogBody>
        </>
    }
    else if (BMI >= 35 && BMI <= 39.9) {
        BMIsuggetions = <>
            <DialogHeader className='py-3'>Obese Class II</DialogHeader>
            <DialogBody className='py-0'>
                <ul className='list-decimal px-5 text-sm'>

                    <li>Seek comprehensive weight management guidance.</li>
                    <li>Gradual, sustainable weight loss with behavioral interventions.</li>
                    <li>Consider professional support for lifestyle changes.</li>
                </ul>
            </DialogBody>
        </>
    }
    else if (BMI >= 40) {
        BMIsuggetions = <>
            <DialogHeader className='py-3'>Obese Class III</DialogHeader>
            <DialogBody className='py-0'>
                <ul className='list-decimal px-5 text-sm'>
                    <li>Immediate medical attention and intervention.</li>
                    <li>Work with a healthcare team for a supervised weight loss plan.</li>
                    <li>Bariatric surgery might be considered in extreme cases.</li>
                </ul>
            </DialogBody>
        </>
    }


    if (age <= 12) {
        ageSuggetions = <>
            <DialogHeader className='py-3'>You&apos;re a child</DialogHeader>
            <DialogBody className='py-0'>
                <p className='text-lg'>Cause, your age is {age}. and it&apos;s between 5 and 12</p>
                <p className='font-bold text-sm underline'>Suggetions According to your age:</p>
                <ul className='list-decimal py-1 px-5 text-sm'>
                    <li>Play with building blocks, puzzles, or art supplies.</li>
                    <li>Perticipate at age-appropriate educational games or interactive toys.</li>
                    <li>Plan with you parent for a family outing to a zoo, museum, or a kid-friendly event.</li>
                </ul>


            </DialogBody>
        </>
    }
    else if (age >= 13 && age <= 17) {
        ageSuggetions = <>
            <DialogHeader className='py-3'>You&apos;re a Teenager</DialogHeader>
            <DialogBody className='py-0'>
                <p className='text-lg'>Cause, your age is {age}. and it&apos;s between 13 and 17</p>
                <p className='font-bold text-sm underline'>Suggetions According to your age:</p>
                <ul className='list-decimal py-1 px-5 text-sm'>
                    <li>Read a book from a genre you enjoy or a popular series.</li>
                    <li>Consider sports equipment or gear related to your hobbies.</li>
                    <li>Go to Mosque or your religion tample for a better life and stay with friend a little bit</li>
                </ul>


            </DialogBody>
        </>
    }
    else if (age >= 18 && age <= 25) {
        ageSuggetions = <>
            <DialogHeader className='py-3'>You&apos;re a Young Adult</DialogHeader>
            <DialogBody className='py-0'>
                <p className='text-lg'>Cause, your age is {age}. and it&apos;s between 18 and 25</p>
                <p className='font-bold text-sm underline'>Suggetions According to your age:</p>
                <ul className='list-decimal py-1 px-5 text-sm'>
                    <li>Try to stay with tech gadgets, accessories, or subscriptions based on your interests.</li>
                    <li>Keep some Personalized items like custom jewelry, monogrammed accessories, or a custom-made piece of art.</li>
                    <li>Outdoor adventure experiences or cooking classes for a unique and memorable gift.</li>
                </ul>


            </DialogBody>
        </>
    }
    else if (age >= 26 && age <= 40) {
        ageSuggetions = <>
            <DialogHeader className='py-3'>You&apos;re an Adult</DialogHeader>
            <DialogBody className='py-0'>
                <p className='text-lg'>Cause, your age is {age}. and it&apos;s between 26 and 40</p>
                <p className='font-bold text-sm underline'>Suggetions According to your age:</p>
                <ul className='list-decimal py-1 px-5 text-sm'>
                    <li>High-quality kitchen gadgets, personalized home decor, or a cozy blanket.</li>
                    <li>Subscription services like streaming, books, or gourmet food.</li>
                    <li>Consider a spa day, weekend getaway, or tickets to a favorite show or event.</li>
                </ul>


            </DialogBody>
        </>
    }
    else if (age >= 41 && age <= 60) {
        ageSuggetions = <>
            <DialogHeader className='py-3'>You&apos;re a Middle-aged Adult</DialogHeader>
            <DialogBody className='py-0'>
                <p className='text-lg'>Cause, your age is {age}. and it&apos;s between 41 and 60</p>
                <p className='font-bold text-sm underline'>Suggetions According to your age:</p>
                <ul className='list-decimal py-1 px-5 text-sm'>
                    <li>Classy accessories like a watch, leather goods, or a stylish bag.</li>
                    <li>Customized items such as engraved photo frames or personalized family gifts.</li>
                    <li>Relaxing experiences like a weekend retreat, spa package, or a fine dining experience.</li>
                </ul>


            </DialogBody>
        </>
    }
    else if (age >= 61) {
        ageSuggetions = <>
            <DialogHeader className='py-3'>You&apos;re a Senior person</DialogHeader>
            <DialogBody className='py-0'>
                <p className='text-lg'>Cause, your age is {age}. and it&apos;s more than 60</p>
                <p className='font-bold text-sm underline'>Suggetions According to your age:</p>
                <ul className='list-decimal py-1 px-5 text-sm'>
                    <li>Thoughtful gifts like family photo albums, personalized calendars, or memory books.</li>
                    <li>Comfortable items such as a cozy blanket, warm slippers, or a heated throw.</li>
                    <li>Consider activities like gardening tools, hobby supplies, or tickets to a show or concert.</li>
                </ul>


            </DialogBody>
        </>
    }

    let bmrInstruction = <>
        <DialogHeader className='py-3 text-xl'>Maintaining calory According to BMR.</DialogHeader>
        <DialogBody className='py-0'>
            <ul className='list-disc px-5 text-sm space-y-2 '>
                <li>If you are  <strong>Sedentary (Little to no exercise)</strong>, then you need to maintain <strong className='text-base'>{Math.round((myBMR * 1.2))} calories</strong> in a day</li>
                <li>If you are  <strong>Lightly Active (Light exercise/sports 1-3 days/week)</strong>, then you need to maintain <strong className='text-base'>{Math.round((myBMR * 1.375))} calories</strong> in a day</li>
                <li>If you are  <strong>Moderately Active (Moderate exercise/sports 3-5 days/week)</strong>, then you need to maintain <strong className='text-base'>{Math.round((myBMR * 1.55))} calories</strong> in a day</li>
                <li>If you are  <strong>Very Active (Hard exercise/sports 6-7 days a week)</strong>, then you need to maintain <strong className='text-base'>{Math.round((myBMR * 1.725))} calories</strong> in a day</li>
                <li>If you are  <strong>Extra Active (Very hard exercise/sports & physical job or 2x training)</strong>, then you need to maintain <strong className='text-base'>{Math.round((myBMR * 1.9))} calories</strong> in a day</li>
            </ul>


        </DialogBody>
    </>
    const suggetions = userDetails?.birthDay ? <>
        {ageSuggetions}
        <hr className='w-[90%] mx-auto mt-3 border-[1.3px]' />
        {BMIsuggetions}
        <hr className='w-[90%] mx-auto mt-3 border-[1.3px]' />
        {bmrInstruction}
    </> : <>
        <DialogHeader >Please Update Your Personal Data!!!</DialogHeader>
    </>
    console.log(BMIsuggetions);



    return (
        <div className='p-4'>

            <div className='profile-Status-Section w-full mx-auto flex  flex-col sm:flex-row justify-center items-center sm:items-center sm:justify-start   py-7  gap-5   p-4 bg-orange-200 rounded my-5 shadow-2xl bmiNumber'>
                <div className='flex flex-col justify-center items-center'>
                    <div className='w-[200px] h-[200px] min-w-[200px] min-h-[200px] 
                lg:w-[250px]  lg:h-[250px] lg:min-w-[250px] lg:min-h-[250px] p-1 rounded-full border-l-[4px] border-b-[3px] border-t-2 border-r border-primary overflow-hidden flex justify-center items-center '>
                        <img className='w-full h-full rounded-full' src={userDetails?.image} alt="" />
                    </div>
                    <div>
                        <button onClick={() => setOpenSuggetionsModal(true)} className={`${buttonStyle} active:bg-[#ff470470]  bg-[#ff4704] hover:bg-orange-700  border-transparent hover:border-[#ff4704] my-4`}>Personal Suggetions</button>
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
                            <span className=' text-base'>{!isNaN(BMI) ? `${BMI} kg/m` : 'Update Data'}  {!isNaN(BMI) ? <sup> 2</sup> : ''}</span>
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
            <div>
                <div className='w-full max-w-[500px] bg-orange-200  mx-auto p-5 pt-12 rounded relative shadow-lg'>
                    <p className='text-lg font-bold mb-2 text-center'>Personal Information</p>
                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
                        {/* name  */}
                        <div>
                            <label className='font-bold flex gap-0'>Name <span className='text-primary text-lg'>*</span></label>
                            <input
                                required
                                disabled={!edit}
                                {...register("name")}
                                className={`${inputFieldStyle}`} placeholder='Your Name' defaultValue={userDetails?.name} />
                        </div>
                        {/* date of birth  */}
                        <div>
                            <label className='font-bold flex gap-0'>Date of Birth <span className='text-primary text-lg'>*</span></label>
                            <input
                                required
                                disabled={!edit}
                                {...register("birthDay")}
                                type={edit ? 'date' : 'text'}
                                className={`${inputFieldStyle} `} placeholder='Date of Birth' defaultValue={userDetails?.birthDay || 'Not Given'} />
                            <span className="text-sm font-bold text-red-500">{ageerr}</span>
                        </div>
                        {/* weight  */}
                        <div>
                            <label className='font-bold flex gap-0'>Weight(KG) <span className='text-primary text-lg'>*</span></label>
                            <input
                                required
                                disabled={!edit}
                                {...register("weight", {
                                    required: true, min: { value: 7, message: "weight must be minimum 7 kg" }
                                })}
                                type={edit ? 'number' : 'text'}
                                className={`${inputFieldStyle}`} placeholder='Your weight' defaultValue={userDetails?.weight ? userDetails?.weight : 'Not Given'} />
                        </div>
                        {/* height  */}
                        <div>
                            <label className='font-bold flex gap-0'>Height <span className='text-primary text-lg'>*</span></label>
                            <div className='flex gap-3'>
                                <div>
                                    <label className='font-bold text-sm'>Feet</label>
                                    <input
                                        disabled={!edit}
                                        required
                                        type={edit ? 'number' : 'text'}
                                        {...register("feet", {
                                            required: true, min: { value: 2, message: "Feet must be minimum 2" },
                                            max: { value: 7, message: "Feet Maximum be  maximum 7 feet " }
                                        })}
                                        className={`${inputFieldStyle}`} placeholder='Feet' defaultValue={Math.floor(userDetails?.height / 12) || 'Not Given'} />
                                    {errors.feet && <span className="text-sm font-bold text-red-500">{errors.feet.message}</span>}
                                </div>
                                <div>
                                    <label className='font-bold text-sm'>Inch</label>
                                    <input
                                        disabled={!edit}
                                        required
                                        type={edit ? 'number' : 'text'}
                                        {...register("inch", {
                                            required: true,
                                            max: { value: 11, message: "Inch must be Maximum 11 inch " }
                                        })}
                                        className={`${inputFieldStyle}`} placeholder='Inch' defaultValue={userDetails?.height ? (userDetails?.height % 12) : 'Not Given'} />
                                    {errors.inch && <span className="text-sm font-bold text-red-500">{errors.inch.message}</span>}
                                </div>
                            </div>
                        </div>
                        {/* gender  */}
                        <div className='relative '>
                            <label className='font-bold flex gap-0'>Gender <span className='text-primary text-lg'>*</span></label>
                            <select
                                required
                                disabled={!edit}
                                {...register("gender")}
                                className={`${selectFieldFieldStyle}`} placeholder='Your gender' defaultValue={userDetails?.gender}>
                                <option value={''} disabled selected>
                                    Select Gender
                                </option>
                                <option >
                                    Male
                                </option>
                                <option >
                                    Female
                                </option>
                            </select>
                            <div className={`${!edit ? 'block' : 'hidden'} w-4 h-7 bg-white absolute bottom-3 right-1 `}></div>
                        </div>
                        {/* action  */}
                        <div className={`${!edit && 'hidden'} flex gap-5`}>
                            <button className={`${buttonStyle} active:bg-[#ff470470]  bg-[#ff4704] hover:bg-orange-700  border-transparent hover:border-[#ff4704]`}>Update</button>
                            <p onClick={handleCancel} className={`${buttonStyle} active:bg-red-800  bg-red-500 hover:bg-red-700  border-transparent hover:border-red-500`}>Cancel</p>
                        </div>
                    </form>
                    <div className={`${edit && 'hidden'} absolute top-5 right-5`}>
                        <button onClick={() => setedit(true)} className='btn btn-sm bg-primary hover:bg-orange-700 text-white'>Edit</button>
                    </div>
                </div>
            </div>
            <HealthSuggetionsModal open={openSuggetionsModal} setOpen={setOpenSuggetionsModal} suggetions={suggetions}></HealthSuggetionsModal>
        </div>
    );
};

export default Profile;