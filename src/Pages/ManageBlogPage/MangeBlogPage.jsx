import { useQuery } from "@tanstack/react-query";
import Title from "../../Components/Title/Title";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const MangeBlogPage = () => {
  const axiosPublic = useAxiosPublic();
  const { data: allBlogs, refetch } = useQuery({
    queryKey: ["allBlogs"],
    queryFn: async () => {
      const res = await axiosPublic.get("/blogs");
      return res?.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Deleting...");
        axiosPublic.delete(`/delete_blog/${id}`).then((res) => {
          if (res?.data?.deletedCount > 0) {
            refetch();
            toast.success("This blog has been deleted.", { id: toastId });
          }
        });
      }
    });
  };

  const buttonStyle =
    "p-2 xs:p-2.5 transition-all duration-500 w-[110px] xs:w-[110px] font-bold text-white rounded border-[3px] active:bg-[#ff470470] active:scale-90";

  return (
    <div className="lg:px-20 lg:pb-20 lg:pt-10">
      <Title title="Manage Blog"></Title>
      <div className="bg-[#F6F6F6] p-8 md:p-10 lg:p-20 md:mt-10 rounded-xl">
        <div>
          <div className="flex justify-between">
            <h1 className="text-4xl font-bold underline underline-offset-8">
              Total Blogs: <span className="font-sans">{allBlogs?.length}</span>
            </h1>
          </div>
          {/*  */}
          <div>
            <div className="overflow-x-auto">
              <table className="table w-full my-10">
                {/* head */}
                <thead>
                  <tr>
                    <th className="text-lg text-black">Blog Image</th>
                    <th className="text-lg text-black">Blog Title</th>
                    <th className="text-lg text-black">Writer</th>
                    <th className="text-lg text-black">Email</th>
                    <th className="text-lg text-black">Date</th>
                    <th className="text-lg text-black">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allBlogs?.map((blog) => (
                    <tr key={blog._id}>
                      <th>
                        <div className="avatar">
                          <div className="w-24 h-16 object-cover rounded-lg">
                            <img src={blog?.blogImg} />
                          </div>
                        </div>
                      </th>
                      <td className="text-gray-500">
                        <div className="tooltip" data-tip={blog?.blogName}>
                          {blog?.blogName?.slice(0, 30)} ...
                        </div>
                      </td>
                      <td className="text-gray-500">{blog?.userName}</td>
                      <td className="text-gray-500 ">{blog?.userEmail}</td>
                      <td className="text-gray-500 ">{blog?.time}</td>
                      <th>
                        <button
                          onClick={() => handleDelete(blog?._id)}
                          className={`${buttonStyle} bg-red-500 hover:bg-red-100  border-transparent hover:border-red-500 hover:text-black `}>
                          Delete
                        </button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MangeBlogPage;
