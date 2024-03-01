// import React from 'react';

import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Loading from "../Loading";
import useAuth from "../../Hooks/useAuth";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const UserProfile = () => {
    const { email, id } = useParams();
    const axiosPublic = useAxiosPublic()
    const [productsState, setProductsState] = useState("")
    const [blogsState, setBlogsState] = useState("border-b-[3px] border-primary")
    const [productsview, setproductsView]= useState("hidden")
    const [blogsview, setBlogsView]= useState("grid grid-cols-1 md:grid-cols-3 gap-2 my-[100px] p-[10px]")
    const {user} = useAuth()
    // style Variable start

    // style Variable end
    const { data: userData, isLoading, refetch } = useQuery({
        queryKey: [email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/user?email=${email}`)
            return res?.data
        }
    })

    const { data: logedInUser, refetch:loggedinRefetch} = useQuery({
        queryKey: [user.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/user?email=${user.email}`)
            return res?.data
        }
    })

    const { data: userProducts, refetch:loadUserProduts} = useQuery({
        queryKey: [user.name],
        queryFn: async () => {
            const res = await axiosPublic.get(`/products?email=${email}`)
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

    const checkingFollowing = logedInUser?.following?.filter(data => data === userData._id)

    console.log(userProducts);


    const handleFollow = () => {
        axiosPublic.put(`/following/${logedInUser?._id}`, userData)
          .then(res => {
            refetch()
            loggedinRefetch()
            if (res.data.followingResult.matchedCount > 0) {
              Swal.fire({
                title: "Followed successfully",
                icon: "success"
              })
              refetch()
            }
          })
          .catch(err => {
            console.log(err);
          })
      }

      const unfollow = () => {
        Swal.fire({
          title: "Are you sure?",
          text: "Do you really want to unfollow this user?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Unfollow"
        }).then((result) => {
          if (result.isConfirmed) {
            axiosPublic.put(`/unfollowing/${logedInUser?._id}`, userData)
              .then(res => {
                Swal.fire({
                  title: "Unfollow!",
                  text: "unfollowed successfully",
                  icon: "success"
                });
                refetch()
                loggedinRefetch()
              })
              .catch(err => {
                console.log(err);
              })
          }
        });
      }

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href)
        Swal.fire({
            title:"Copyed the profile link",
            icon:"success"
        })
    }

    const productsFilter = ()=>{
        loadUserProduts()
        setBlogsView("hidden")
        setproductsView("grid grid-cols-1 md:grid-cols-4 gap-3 p-[10px] my-[100px]")
        setProductsState("border-b-[3px] border-primary")
        setBlogsState('')
    }

    const BlogsFilter = ()=>{
        setBlogsView("grid grid-cols-1 md:grid-cols-3 gap-2 my-[100px] p-[10px]")
        setproductsView("hidden")
        setProductsState("")
        setBlogsState("border-b-[3px] border-primary")
    }
    console.log(userData.following?.length);

    return (
        <div className='p-5 lg:p-10 '
        >

            <div className="ProfileSection flex flex-col items-center justify-center gap-3 bmiNumber  p-[20px]">
                <img className="w-[150px] object-cover rounded-full" src={userData.image} alt="" />
                <h1  className="text-xl md:text-2xl font-[600]">{userData.name}</h1>
                <h1 className="font-[500] break-words text-sm">{userData.email}</h1>
                <h1 className="font-[500]">{userData.following?.length === undefined ? "0 following" : `${userData.following?.length} following`}, {userData.followed?.length === undefined ? "0 following" : `${userData.followed?.length} followed`}</h1>
                <div className={`${logedInUser._id === userData._id ? "hidden":"Followbuttons block"}`}>
                    <button
                    onClick={handleFollow}
                    className={`${checkingFollowing?.length>0? "hidden":"bg-secondary text-white p-[10px] rounded-full text-xl"}`}>Follow</button>
                    <button
                    onClick={unfollow}
                    className={`${checkingFollowing?.length>0?"bg-primary text-white p-[10px] rounded-full text-xl":"hidden"}`}>Unfollow</button>
                </div>
                <div className={`${logedInUser._id !== userData._id ? "hidden":"profileButtons flex gap-2"}`}>
                    <button
                    onClick={copyLink}
                    className="bg-primary text-white p-[10px] rounded-full md:only:text-xl">Shere</button>
                    <Link to="/dashboard/profile">
                        <button className="bg-secondary text-white p-[10px] rounded-full md:text-xl">Update profile</button>
                    </Link>
                </div>
            </div>
            <div className="contentSection">
                <div className="filters flex gap-2 items-center justify-center">
                    <h1 
                    onClick={productsFilter}
                    className={`text-xl font-[600] px-[10px] cursor-pointer ${productsState}`}>Products</h1>
                    <h1 
                    onClick={BlogsFilter}
                    className={`text-xl font-[600] px-[10px] cursor-pointer ${blogsState}`}>Blogs</h1>
                </div>
                <div className={`${blogsview}`}>
                    {
                        userPost.map(post=> 
                        <div 
                        className="bmiNumber flex flex-col justify-evenly gap-3 shadow-lg rounded-md p-[10px]"
                        key={post._id}>
                            <img className="h-[250px] w-full object-cover" src={post.blogImg}/>
                            <Link to={`/blogs/${post._id}`}>
                                <h1 className="tect-2xl font-[600]">{post.blogName}</h1>
                            </Link>
                            <div dangerouslySetInnerHTML ={{__html: `${post.blogDes.slice(0,150)}`}}></div>
                        </div>)
                    }
                </div>
                    <div className={productsview}>
                    {userProducts?.length<1?
                    <div className="h-[100vh] w-full flex items-center justify-center">
                        <h1 className="font-[600]">You didnt post any products yet wanna list a product? &nbsp; 
                            <span
                            className="p-[10px] bg-primary rounded-full text-white font-[600]">
                                <Link to="/dashboard/productForm">&nbsp;Click here &nbsp;</Link>
                            </span>
                        </h1>
                    </div>
                    :
                    
                        userProducts.map(products=> 
                        <div
                        className="bmiNumber border-2 border-primary"
                        key={products._id}>
                            <img className="h-[300px] object-cover w-full border-b-2 border-primary" src={products.imgUrl} alt="" />
                            <div className="p-[10px]">
                                <Link to={`/shop/${products._id}`}>
                                    <h1 className="text-xl font-[600]">{products.Pname}</h1>
                                </Link>
                                <h1>৳ {products.Pprice}</h1>
                            </div>
                        </div>
                        )
                    }
                    </div>
            </div>
            
        </div >
    );
};

export default UserProfile;