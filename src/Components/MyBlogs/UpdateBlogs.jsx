/* eslint-disable react/prop-types */
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { FaEdit } from "react-icons/fa";
import toast from "react-hot-toast";

const UpdateBlogs = ({ blog, refetch }) => {
    const axiosPublic = useAxiosPublic();

    // console.log(blog);

    // Extract blog data
    const { blogImg, blogName, blogDes } = blog;

    const handleUpdate = () => {
        document.getElementById(`my_modal_${blog._id}`).showModal()
    }

    // Handle form submission
    const handleBlogUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;
        const updatedData = {
            blogImg: form.blogImg.value,
            blogName: form.blogName.value,
            blogDes: form.blogDes.value
        };

        try {
            await axiosPublic.put(`/update_blog/${blog._id}`, updatedData);
            toast.success('Blog has been updated');
            refetch()
        } catch (error) {
            console.error('Error updating blog:', error);
            toast.error('Failed to update blog');
        }

        form.reset();
        form.closest('dialog').close();
    };

    return (
        <div>
            <button
                className="px-4 py-2 text-sm flex gap-2 uppercase bg-primary rounded-lg text-white font-semibold hover:shadow-xl hover:shadow-gray-400 transition duration-700 ease-in-out"
                onClick={handleUpdate}>
                Update <FaEdit className="text-lg" />
            </button>

            <dialog id={`my_modal_${blog._id}`} className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-xl text-center">Update Your Blog!</h3>
                    <form onSubmit={handleBlogUpdate}>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text text-lg font-semibold">Blog Image:</span>
                            </div>
                            <input name="blogImg" type="text" defaultValue={blogImg} className="input input-error w-full" />
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text text-lg font-semibold">Blog Name:</span>
                            </div>
                            <input name="blogName" type="text" defaultValue={blogName} className="input input-error w-full" />
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text text-lg font-semibold">Blog Image:</span>
                            </div>
                            <textarea name="blogDes" type="text" defaultValue={blogDes} className="textarea textarea-error textarea-lg p-2 text-sm w-full min-h-[150px] max-h-[150px]" ></textarea>
                        </label>
                        <button 
                        className="px-5 py-2 mt-2 text-sm flex gap-2 uppercase bg-primary rounded-lg text-white font-semibold hover:shadow-xl hover:shadow-gray-400 transition duration-700 ease-in-out">Update
                        </button>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default UpdateBlogs;
