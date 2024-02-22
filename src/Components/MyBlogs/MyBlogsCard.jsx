/* eslint-disable react/prop-types */
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { MdDelete } from "react-icons/md";
// import UpdateBlogs from "./UpdateBlogs"
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

const MyBlogsCard = ({ blog, refetch }) => {
    const axiosPublic = useAxiosPublic()
    const [showFullDescription, setShowFullDescription] = useState(false);

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };


    // delete Blogs
    const handleDeleteItem = blog => {
        Swal.fire({
            title: "Are you sure?",
            text: `You won't be delete ${blog?.blogName}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosPublic.delete(`/delete_blog/${blog?._id}`);
                // console.log(res.data);
                if (res.data.deletedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: `${blog?.name} has been Delete!`,
                        showConfirmButton: false,
                        timer: 1000
                    });
                }

            }
        });
    }
    return (
        <div key={blog._id} className="container mx-auto my-4">
            <div className=" mx-auto bg-white text-black p-4 rounded-md shadow-lg shadow-gray-500">
                <div className="w-full h-56 overflow-hidden">
                    <img src={blog?.blogImg} alt='' className="w-full max-w-lg mx-auto" />
                </div>
                <h1 className="text-3xl font-bold my-2">{blog?.blogName}</h1>
                <div dangerouslySetInnerHTML={{ __html: `${blog.blogDes.slice(0 - 350)}` }} className="min-h-20">
                    {/* {showFullDescription ? (
                        <span>{blog?.blogDes}</span>
                    ) : (
                        <span>{blog?.blogDes.slice(0, 150)}</span>
                    )}
                    {blog?.blogDes.length > 150 && (
                        <span className="text-sm font-semibold text-primary cursor-pointer" onClick={toggleDescription}>
                            {showFullDescription ? ' See less' : ' See more...'}
                        </span>
                    )} */}
                </div>
                <h5 className="bmiNumber">Post: {(new Date(blog?.time)).toLocaleDateString().split('/').reverse().join('-')}</h5>
                {/* <h5 className="bmiNumber">Post: {blog?.time}</h5> */}
                <div className='w-[100%] h-[2px] bg-secondary'></div>
                <div className="mt-4 flex justify-evenly">
                    {/* update bloguct */}
                    {/* <UpdateBlogs blog={blog} refetch={refetch}></UpdateBlogs> */}
                    <Link to={`/dashboard/updateBlogs/${blog?._id}`}>
                        <button
                            className="px-4 py-2 text-sm flex gap-2 uppercase bg-primary rounded-lg text-white font-semibold hover:shadow-xl hover:shadow-gray-400 transition duration-700 ease-in-out"
                            >Update <FaEdit className="text-lg" />
                        </button>
                    </Link>
                    {/* delete Blogs */}
                    <button onClick={() => handleDeleteItem(blog)} className="px-4 py-2 flex gap-2 uppercase text-sm bg-secondary rounded-lg text-white font-semibold hover:shadow-xl hover:shadow-gray-400 transition duration-700 ease-in-out">delete <MdDelete className="text-xl" /></button>
                </div>
            </div>
        </div>
    );
};
export default MyBlogsCard;