import axios from 'axios';
import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import toast from 'react-hot-toast';

const UploadBlogs = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const imgHostingKey = import.meta.env.VITE_IMG_HOSTING_KEY;
    const imgHostingApi = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`;
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        // console.log(data);
        const toastId = toast.loading("Publishing...");
        const image = { image: data?.img[0] };
        try {

            const res = await axios.post(imgHostingApi, image, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            })
            const blogImg = res?.data?.data?.display_url;
            const userEmail = user?.email;
            const userName = user?.displayName;
            const userImg = user?.photoURL;
            const blogName = data?.blogname;
            const blogDes = data?.blog;
            const time = (new Date()).toLocaleDateString().split('/').reverse().join('-');
            const allData = { time, userEmail, userName, userImg, blogImg, blogName, blogDes }
            console.log(allData);
            axiosPublic.post('/post_blog', allData)
                .then(res => {
                    console.log(res?.data);
                    if (res?.data?.insertedId) {
                        reset()
                        toast.success("Published Successfully !", { id: toastId });
                    }
                })
                .catch((err) => {
                    toast.error(err?.code, { id: toastId });
                });
        }
        catch {
            toast.error('error', { id: toastId });
        }


    }
    return (
        <div className='p-[10px] my-[50px]'>
            <Helmet>
                <title>Upload a blog - FitnessStudio</title>
            </Helmet>
            <div className='flex flex-col items-center gap-[20px]'>
                <h1 className='text-center text-2xl font-bold'>Write a blog</h1>
                <div className='bg-primary w-[60%] md:w-[20%] h-[5px] rounded-box'></div>
                <p className='text-md md:text-xl text-secondary font-[500] text-center'>Ready to inspire others on their fitness journey? Let's make your voice heard</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='border-2 border-secondary my-[50px] flex flex-col gap-3 bg-opacity-70 rounded-xl formStyle'>
            <div className='flex flex-col gap-[20px] items-start w-full'>
                    {/* <label htmlFor='blogName'
                        className='font-bold text-xl'>
                        Blog name:
                    </label> */}
                    <input
                        {...register("blogname", { required: true })}
                        className='border-b-[3px] border-secondary rounded-t-xl outline-none w-full p-[10px]'
                        type="text" name="blogname" placeholder='Blog name' id="blogname" />
                </div>
            <div className='flex flex-col gap-[20px] items-start w-full'>
                    {/* <label htmlFor='blogName'
                        className='font-bold text-xl'>
                        Blog Image:
                    </label> */}
                    <input
                        {...register("img", { required: true })}
                        className='border-b-[3px] border-secondary outline-none w-full p-[10px]'
                        type="file" name="img" placeholder='blog name' id="img" />
                </div>
                
                <div className='flex flex-col gap-[20px] items-start w-full'>
                    {/* <label htmlFor='blogName'
                        className='font-bold text-xl'>
                        Blog:
                    </label> */}
                    <textarea
                        {...register("blog", { required: true })}
                        required
                        className=' outline-none w-full p-[10px] min-h-[250px] h-[250px] max-h-[250px]'
                        type="text" name="blog" placeholder='Whats on your mind?' id="blog" />
                </div>
                <button
                    className='bg-secondary text-white font-[600] p-[10px] text-xl rounded-md'
                    type='submit'>
                    Publish
                </button>
            </form>
        </div>
    )
}

export default UploadBlogs
