import { useQuery } from "@tanstack/react-query";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import Title from '../Components/Title/Title';
const ManageUsers = () => {

    const axiosPublic = useAxiosPublic()

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users')
            return res.data
        }
    })

    // make admin
    const handleMakeAdmin = async (email) => {
        const { data } = await axiosPublic.put(`/make-admin/${email}`);
        if (data.modifiedCount) {
            toast.success("Updated Successfully");
        } else {
            toast.error("Something went wrong");
        }
        refetch();
    };

    // user delete with confirmatin
    const handleDeleteUser = user => {
        Swal.fire({
            title: "Are you sure?",
            text: `You won't be delete ${user?.name} user!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: `${user?.name} has been deleted.`,
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <>
            <Helmet>
                <title>Dashboard | AllUsers</title>
            </Helmet>
            <Title title={"User Management"} />
            <div className="mx-auto bmiNumber md:my-8 px-2">
                <div className="text-2xl lg:text-4xl font-semibold py-4">
                    <h3 style={{ textShadow: '0px 0px 5px #FF4804', webkitTextStroke: '1px black' }}>Total Users: {users?.length}</h3>
                </div>
                <div className="overflow-x-auto rounded-lg scroll-auto touch-auto" style={{ boxShadow: '0px 0px 20px #FF4804'}}>
                    <table className="table">
                        <thead className="text-[12px] md:text-md lg:text-xl text-black font-bold">
                            <tr className="bg-secondary text-white">
                                <th>SL</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs lg:text-lg">
                            {
                                users.map((user, index) =>
                                    <tr key={user._id} className="hover">
                                        <th>{index + 1}</th>
                                        <td>{user?.name}</td>
                                        <td>{user?.email}</td>
                                        <td>
                                            <button
                                                disabled={user.role === "Admin"}
                                                onClick={() => handleMakeAdmin(user.email)} title="Make Admin"
                                                className="disabled:cursor-not-allowed disabled:text-primary disabled:bg-white text-[8px] lg:text-base px-2 py-1 rounded-md bg-primary text-white hover:text-primary hover:border-primary hover:bg-white"
                                            >
                                                {user.role === "Admin" ? "Admin" : "Make Admin"}
                                            </button>
                                        </td>
                                        <td>
                                            <button onClick={() => handleDeleteUser(user)} className="text-error bg-gray-200 px-1 md:px-2 py-1 rounded-lg text-base md:text-lg lg:text-3xl" title="Delete User"><MdDeleteForever /></button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default ManageUsers;