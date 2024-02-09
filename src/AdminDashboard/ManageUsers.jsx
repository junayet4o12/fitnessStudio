import { QueryClient,useQuery, useQueryClient } from "@tanstack/react-query";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import Title from '../Components/Title/Title';
import { FaUsers } from "react-icons/fa6";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { current } from "@reduxjs/toolkit";

const ManageUsers = () => {

    const axiosPublic = useAxiosPublic()
    const queryClients =  useQueryClient()
    const [searchInput, SetSearchInput] = useState("")

    // variables or pagination
    const [Currentpage, setCurrentPgae] = useState(0)
    const totalUsers = useLoaderData().data.count
    const size = 10
    const pages = Math.ceil(totalUsers/size)
    const pageArray =[ ...Array(pages).keys()]

    console.log(Currentpage);


    const { data: users = [], refetch } = useQuery({
        queryKey: ['users', Currentpage],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users?page=${Currentpage}&size=${size}`)
            return res.data
        }
    })

        //previousButton function
        const previousFun = async ()=>{
            if (Currentpage >0) {
                setCurrentPgae(Currentpage -1)
                await refetch()
            }
        }
    
        //NextButton function
        const NextFun = async ()=>{
            if (Currentpage < pageArray.length - 1) {
                setCurrentPgae( Currentpage +1)
                await refetch()
            }
        }

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
    // make user
    const handleMakeUser = async (email) => {
        const { data } = await axiosPublic.put(`/make-user/${email}`);
        if (data.modifiedCount) {
            toast.success("Updated Successfully");
        } else {
            toast.error("Something went wrong");
        }
        refetch();
        // console.log("I am clicked");
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

    const SearchFunction = async (e)=>{
        e.preventDefault()
        const searchData = await axiosPublic(`/users?name=${searchInput}`)
        queryClients.setQueriesData("users", searchData.data)
    }

    return (
        <>
            <Helmet>
                <title>Dashboard | AllUsers</title>
            </Helmet>
            <Title title={"User Management"} />
            <div className="mx-auto bmiNumber md:my-8 px-4 md:px-0 lg:px-6 ">
                <div 
                className="text-2xl lg:text-4xl font-semibold py-4 flex flex-col lg:flex-row items-center justify-center lg:justify-between my-[25px] ">
                    <h3 className="flex items-center text-black gap-2" style={{ textShadow: '0px 0px 5px #FF4804', webkitTextStroke: '1px black' }}><FaUsers /> Total Users: {totalUsers}</h3>
                    <form
                    className=" w-[90%] md:w-fit lg:w-fit  flex mx-auto lg:mx-[0px]"
                    onSubmit={SearchFunction}>
                        <input 
                        className="text-xs md:text-xl p-[10px] font-[600] border-2 border-primary rounded-l-xl outline-none"
                        onChange={(e)=>SetSearchInput(e.target.value)} type="text" name="name" placeholder="Search Users" id="" />
                        <button
                        className="text-xs md:text-xl p-[10px] font-[600] border-2 border-primary rounded-r-xl outline-none bg-primary text-white"
                        >Search</button>
                    </form>
                </div>
                <div className="overflow-x-auto rounded-lg scroll-auto touch-auto" style={{ boxShadow: '0px 0px 20px #FF4804'}}>
                    <table className="table mb-[50px]">
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
                                users.length  === 0 ?
                                <td className="text-center p-[10px] font-bold">No users found</td>
                                :
                                
                                users.map((user, index) =>
                                    <tr key={user._id} className="hover">
                                        <th>{index + 1}</th>
                                        <td>{user?.name}</td>
                                        <td>{user?.email}</td>
                                        <td>
                                            <button
                                                // disabled={user.role === "Admin"}
                                                onClick={() => 
                                                    {user.role === "Admin"? 
                                                    handleMakeUser(user.email) : handleMakeAdmin(user.email)}} title="Make Admin"
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
                            {/* {
                                users.map((user, index) =>
                                    <tr key={user._id} className="hover">
                                        <th>{index + 1}</th>
                                        <td>{user?.name}</td>
                                        <td>{user?.email}</td>
                                        <td>
                                            <button
                                                // disabled={user.role === "Admin"}
                                                onClick={() => 
                                                    {user.role === "Admin"? 
                                                    handleMakeUser(user.email) : handleMakeAdmin(user.email)}} title="Make Admin"
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
                            } */}
                        </tbody>
                    </table>
                </div>

                {/* pagination Section */}
                <div className="flex gap-0 flex-wrap my-[25px]">
                    <button
                    onClick={previousFun}
                    className="bg-primary text-xl p-[10px] text-white rounded-l-xl"
                    >Previous</button>
                    {
                        pageArray.map((page, index)=>
                        <button
                        className={Currentpage === page ? 
                            "bg-white text-xl p-[10px] text-primary border-2 border-primary"
                            :"bg-primary text-xl p-[10px] text-white border-2 border-primary"}
                            onClick={()=>setCurrentPgae(page)}
                        key={index}>{page + 1}</button>)
                    }
                    <button
                    onClick={NextFun}
                    className="bg-primary text-xl p-[10px] text-white rounded-r-xl"
                    >Next</button>
                </div>
            </div>
        </>
    );
};

export default ManageUsers;
