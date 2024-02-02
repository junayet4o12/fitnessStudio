// import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import MyBlogsCard from "./MyBlogsCard";
import { useQuery } from '@tanstack/react-query'
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const MyBlogs = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic()
    // const [myBlogs, setMyBlogs] = useState([])


    // useEffect(() => {
    //     fetch(`https://fitnessstudio-bacend.vercel.app/my_blogs?email=${user?.email}`)
    //         .then(res => res.json())
    //         .then(data => setMyBlogs(data))
    // }, [user?.email])

    const { data: myBlogs = [], refetch } = useQuery({
        queryKey: ['myBlogs'],
        queryFn: async () => {
            const response = await axiosPublic.get(`/my_blogs/${user?.email}`);
            return response.data;
        }
    })

    /*
        TODO: 
        1. Change button color with discuss 
    */

    return (
        <>
            {
                myBlogs.length === 0 ?
                    <div>
                        <p className="text-xl flex justify-center items-center h-screen text-gray-400">You don't have a blog</p>
                    </div>
                    :
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-2 max-w-5xl mx-auto">
                        {
                            myBlogs?.map((blog) =>
                                <MyBlogsCard key={blog} blog={blog} refetch={refetch}></MyBlogsCard>
                            )
                        }
                    </div>
            }
        </>
    );
};

export default MyBlogs;