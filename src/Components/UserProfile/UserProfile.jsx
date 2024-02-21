// import React from 'react';

import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import pageBg from '../../assets/images/dumbbells-floor-gym-ai-generative.jpg'
import UserProfileMain from "./UserProfileMain";
import Loading from "../Loading";
import Title from "../Title/Title";
const UserProfile = () => {
    const { email, id } = useParams();
    const axiosPublic = useAxiosPublic()
    // style Variable start

    const inputFieldStyle = `border-[1px] w-full bg-white/70 p-3  border-primary rounded font-semibold  text-black`
    const selectFieldFieldStyle = ` border-[1px] w-full  bg-white/70 h-[50px]  border-primary rounded font-semibold  text-black`

    // style Variable end
    const { data: userData, isLoading, refetch } = useQuery({
        queryKey: [email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/user?email=${email}`)
            return res?.data
        }
    })
    const { data: userPost, isLoading: userPostIsLoading, refetch: userPostRefetch } = useQuery({
        queryKey: [email, 'userPost'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/my_blogs/${email}`)
            return res?.data
        }
    })
    if (isLoading || userPostIsLoading) {
        return <Loading></Loading>
    }
    console.log(userData, userPost);
    const myBMI = (userData.weight / Math.pow(userData.height / 39.37, 2)).toFixed(2)
    const age = userData.birthDay && Math.floor((new Date() - new Date(userData.birthDay)) / 31556952000)

    const bmrForMale = 88.362 + (13.397 * userData.weight) + (4.799 * (userData?.height * 2.54)) - (5.677 * parseInt(age))
    const bmrForFemale = 447.593 + ((9.247 * userData?.weight) + (3.098 * (userData?.height * 2.54))) - (4.330 * parseInt(age))

    const myBMR = (userData?.gender === 'Male' ? bmrForMale : bmrForFemale).toFixed(2)
    return (
        <div className='p-5 lg:p-10 bg-gradient-to-r from-[#000428] to-[#004e92]'
        // style={{ background: `url(${pageBg})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundAttachment: 'fixed', backgroundSize: 'cover' }}
        >
            <UserProfileMain age={age} myBMI={myBMI} myBMR={myBMR} userDetails={userData} refetch={refetch} userPost={userPost}></UserProfileMain>
            {/* user Blogs  */}
            <div className="text-white">
               <Title title={'Posted Blog'}></Title>
            </div>
            <div className="flex flex-col md:flex-row flex-wrap justify-evenly gap-2">

                {
                    userPost?.length < 1 ? <span className="text-xl font-bold text-white">
                    <span className="text-2xl block text-center">Opps!!</span>
                    No posts have been uploaded yet.</span> : (

                        userPost.map(blog =>
                            <div
                                className="lg:w-[30%] shadow-xl rounded-md flex flex-col justify-between overflow-hidden bg-white text-black"
                                key={blog._id}>
                                <img className="h-[260px] w-full object-cover" src={blog.blogImg} />
                                <div className="p-[10px] flex flex-col gap-2">
                                    <Link
                                        to={`/blogs/${blog._id}`}
                                    >
                                        <h1 className="text-2xl font-[600]">{blog.blogName}</h1>
                                    </Link>
                                    <p>published at: <span className="bmiNumber">{blog.time}</span></p>
                                    <div dangerouslySetInnerHTML={{ __html: `${blog.blogDes.slice(0 - 350)}}` }} />
                                </div>
                            </div>)

                    )
                }
            </div>
            {/* user Blogs  */}
        </div >
    );
};

export default UserProfile;