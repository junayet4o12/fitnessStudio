import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Authentication/AuthProvider/AuthProviders'
import useAxiosPublic from '../../Hooks/useAxiosPublic'
import { FaCheckCircle } from "react-icons/fa";
import { FaPencilRuler } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';


const UserProductsCollections = () => {
    const {user} = useContext(AuthContext)
    const [products, setProducts] = useState()
    const Axoispublic = useAxiosPublic()

    useEffect(()=>{
        Axoispublic(`/products?email=${user.email}`)
        .then(res => setProducts(res.data))
    },[])

  return (
    <div>
      <div className='pt-[50px] pb-[50px]'>
        <h1 className='text-3xl font-bold'>Your Listings</h1>
        <p className='font-[500]'>Manage your products mark items as Sold, update them, or delete them.</p>
      </div>
        <div>
            {
                products? 
                <div className='flex flex-col gap-4'>
                    {
                        products.map(product => 
                                <div className='flex flex-col md:flex-row gap-2 items-center justify-between shadow-lg rounded-md' key={product._id}>
                                    <div 
                            className='flex flex-col md:flex-row gap-2 items-center w-full'>
                                <div>
                                    <img
                                    className='w-full md:w-[250px] md:h-[150px] object-cover rounded-md'
                                    src={product.imgUrl} />
                                </div>
                                <dv className="w-full p-[10px]">
                                    <Link to={product._id}>
                                    <h1 className='text-2xl font-bold'>{product.Pname}</h1>
                                    </Link>
                                    <h1 className='bmiNumber font-[600]'>Price: {product.Pprice} ৳</h1>
                                    <h1 
                                    className={`${product.verify === "notVerified"?
                                    "bg-red-500 text-white p-[10px] rounded-md flex w-fit cursor-pointer"
                                    :
                                    "bg-green-500 text-white p-[10px] rounded-md flex w-fit cursor-pointer"
                                }`}>
                                        {product.verify}</h1>
                                </dv>
                                </div>
                                <div className='p-[10px] flex gap-2 '>
                                    <button title='sold'
                                    className='text-2xl text-white  border-2 border-secondary bg-primary rounded-md p-[10px]'
                                    ><FaCheckCircle /></button>
                                    <button title='Modify'
                                    className='text-2xl text-white  border-2 border-secondary bg-primary rounded-md p-[10px]'
                                    ><FaPencilRuler/></button>
                                    <button title='Delete'
                                    className='text-2xl text-white  border-2 border-secondary bg-primary rounded-md p-[10px]'
                                    ><MdDelete/></button>
                                </div>
                            </div> )
                    }
                </div>
                : <h1>You didn't listed any products your </h1>
            }
        </div>
    </div>
  )
}

export default UserProductsCollections
