// import React from 'react';
import installImg from '../../assets/images/stravaImg/SuggetionsImg/Install.jpg'
import allowAll from '../../assets/images/stravaImg/SuggetionsImg/allowAll.jpg'
import location from '../../assets/images/stravaImg/SuggetionsImg/allowLocation.jpg'
import recordImg from '../../assets/images/stravaImg/SuggetionsImg/record.jpg'
import startImg from '../../assets/images/stravaImg/SuggetionsImg/startActivity.jpg'
import finishImg from '../../assets/images/stravaImg/SuggetionsImg/finishActivity.jpg'
import typeImg from '../../assets/images/stravaImg/SuggetionsImg/selectType.jpg'
import saveActivityImg from '../../assets/images/stravaImg/SuggetionsImg/SaveActivity.jpg'

const StravaActivityTutorial = () => {
    const textSideStyle = "flex flex-col gap-7  w-full md:w-[50%] max-w-[550px]";
    return (
        <div className='p-5'>
            <p className='text-xl font-bold text-center'>You Don&apos;t have any Activity in Strava.</p>
            <p className="text-base font-bold text-center mb-7">Here&apos;s a tutorial on how to create a new activity in the Strava app.</p>
            <hr className='border-[1.3px] border-primary my-2' />
            <div className='space-y-7'>
                <div className=" flex flex-col md:flex-row-reverse  justify-between items-center gap-7">
                    <div className="w-[50%] max-w-[350px]">
                        <img className="md:w-full mx-auto" src={installImg} alt="" />
                    </div>
                    <div className={`${textSideStyle} md:items-end`}>
                        <h2 className="text-4xl font-semibold">Install Strava App</h2>
                        <p className="text-sm font-semibold md:text-right">
                            To install the Strava app, go to the App Store if you&apos;re using an iOS device or the Google Play Store for Android. Search for <strong>Strava</strong> in the search bar, then install the app that matches the <strong>official Strava icon</strong>. Once installed, open the app and either sign up for a new account or log in if you already have one.
                        </p>
                    </div>

                </div>
                <hr className='border-[1.3px] border-primary my-2' />
                <div className="flex flex-col md:flex-row  justify-between items-center gap-7">
                    <div className="w-[50%] max-w-[350px]">
                        <img className="md:w-full mx-auto" src={allowAll} alt="" />
                    </div>
                    <div className={`${textSideStyle}`}>
                        <h2 className="text-4xl font-semibold">Allow all</h2>
                        <p className="text-sm font-semibold">
                            The app will require certain permissions from your device to track your activities effectively. Please grant all the necessary permissions to the app for an enhanced experience.
                        </p>

                    </div>
                </div>
                <hr className='border-[1.3px] border-primary my-2' />
                <div className=" flex flex-col md:flex-row-reverse  justify-between items-center gap-7">
                    <div className="w-[30%] max-w-[350px]">
                        <img className="md:w-full mx-auto" src={location} alt="" />
                    </div>
                    <div className={`${textSideStyle} md:items-end`}>
                        <h2 className="text-4xl font-semibold">Give Location Permission</h2>
                        <p className="text-sm font-semibold md:text-right">
                            The app requires your device&apos;s <strong>location permission</strong> from Google Maps. Please <strong>grant this permission</strong>. In some cases, even after granting permission, it may not work as expected. If this happens, go to your
                            <br />
                            <strong>
                                {'Device Settings >> Find Apps >> Find Strava apps >> go to Permission >> give location permission.'}
                            </strong>
                            <br />
                            Then, it will work perfectly.
                        </p>
                    </div>

                </div>
                <hr className='border-[1.3px] border-primary my-2' />
                <div className="flex flex-col md:flex-row  justify-between items-center gap-7">
                    <div className="w-[50%] max-w-[350px]">
                        <img className="md:w-full mx-auto" src={recordImg} alt="" />
                    </div>
                    <div className={`${textSideStyle}`}>
                        <h2 className="text-4xl font-semibold">Click Record</h2>
                        <p className="text-sm font-semibold">
                            To begin your activity, simply click on the <strong>Record</strong> button. This button initiates the tracking of your activity, allowing you to monitor your progress, distance covered, time elapsed, and other relevant metrics in real-time.
                        </p>

                    </div>
                </div>
                <hr className='border-[1.3px] border-primary my-2' />
                <div className=" flex flex-col md:flex-row-reverse  justify-between items-center gap-7">
                    <div className="w-[50%] max-w-[350px]">
                        <img className="md:w-full mx-auto" src={startImg} alt="" />
                    </div>
                    <div className={`${textSideStyle} md:items-end`}>
                        <h2 className="text-4xl font-semibold">Start Activity</h2>
                        <p className="text-sm font-semibold md:text-right">
                            Click the <strong>Start</strong> button to initiate your activity. Once clicked, your activity will commence, and the app will begin tracking your <strong>progress, distance, time, and other pertinent metrics</strong>.
                        </p>
                    </div>

                </div>
                <hr className='border-[1.3px] border-primary my-2' />
                <div className="flex flex-col md:flex-row  justify-between items-center gap-7">
                    <div className="w-[50%] max-w-[350px]">
                        <img className="md:w-full mx-auto" src={finishImg} alt="" />
                    </div>
                    <div className={`${textSideStyle}`}>
                        <h2 className="text-4xl font-semibold">Finish Activity</h2>
                        <p className="text-sm font-semibold">
                            Click the <strong>Finish</strong> button to conclude your activity. Upon clicking this button, your session will be marked as completed, and the app will stop tracking your progress. Additionally, you have the option to click the <strong>Resume</strong> button if you wish to continue an incomplete activity, allowing you to pick up where you left off and seamlessly continue your session.
                        </p>

                    </div>
                </div>
                <hr className='border-[1.3px] border-primary my-2' />
                <div className=" flex flex-col md:flex-row-reverse  justify-between items-center gap-7">
                    <div className="w-[50%] max-w-[350px]">
                        <img className="md:w-full mx-auto" src={typeImg} alt="" />
                    </div>
                    <div className={`${textSideStyle} md:items-end`}>
                        <h2 className="text-4xl font-semibold">Select Type</h2>
                        <p className="text-sm font-semibold md:text-right">
                            Choose the activity type from the <strong>Type Selector</strong>. This feature allows you to specify the type of activity you are about to engage in, such as <strong>running, cycling, swimming, hiking,</strong> or any other relevant option available in the selector.
                        </p>
                    </div>

                </div>
                <hr className='border-[1.3px] border-primary my-2' />
                <div className="flex flex-col md:flex-row  justify-between items-center gap-7">
                    <div className="w-[50%] max-w-[350px]">
                        <img className="md:w-full mx-auto" src={saveActivityImg} alt="" />
                    </div>
                    <div className={`${textSideStyle}`}>
                        <h2 className="text-4xl font-semibold">Save Activity</h2>
                        <p className="text-sm font-semibold">
                        Click the <strong>Save Activity</strong> button to preserve your activity data. After saving your activity, you can view its details on our web page. Furthermore, you&apos;ll have the option to compare this activity with others, providing insights into your progress and performance over time.
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default StravaActivityTutorial;