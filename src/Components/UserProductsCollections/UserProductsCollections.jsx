import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Authentication/AuthProvider/AuthProviders'
import useAxiosPublic from '../../Hooks/useAxiosPublic'
import { FaCheckCircle } from "react-icons/fa";
import { FaPencilRuler } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';


const UserProductsCollections = () => {
    const {user} = useContext(AuthContext)
    const [products, setProducts] = useState()
    const [reload, setReload] = useState(false)
    const Axoispublic = useAxiosPublic()
    const [allstate, setAllState] = useState(true)
    const [soldstate, setSoldState] = useState(false)
    const [authorizedState, setauthorizedState]= useState(false)

    useEffect(()=>{
        Axoispublic(`/products?email=${user.email}`)
        .then(res => setProducts(res.data))
        setAllState(true)
        setSoldState(false)
        setauthorizedState(false)
    },[reload])

    const allFunction = () =>{
        Axoispublic(`/products?email=${user.email}`)
        .then(res => setProducts(res.data))
        setAllState(true)
        setSoldState(false)
        setauthorizedState(false)
    }

    const SoldFunction = () =>{
        Axoispublic(`/products?sold=sold`)
        .then(res => setProducts(res.data))
        setAllState(false)
        setSoldState(true)
        setauthorizedState(false)
    }

    const unverified = () =>{
        Axoispublic(`/products?verify=verified`)
        .then(res => setProducts(res.data))
        setauthorizedState(true)
        setAllState(false)
        setSoldState(false)
    }


    const sellFuction = (id) => {
        Swal.fire({
            title: "Is your product Sold?",
            text: "Once you mark your product as sold, the product will be removed from our store",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "I sold it"
          }).then((result) => {
            if (result.isConfirmed) {
                Axoispublic.post(`/sold_product/${id}`)
                .then(res=>
                    Swal.fire({
                      title: "Sold!",
                      text: "Your items are marked as sold.",
                      icon: "success"
                    }),
                    setReload(!reload)
                    )
            }
          });
    }
    
    

    const deletingProduct = (id)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this product!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                Axoispublic.get(`/Delproduct/${id}`)
                .then(res=>
                    Swal.fire({
                      title: "Deleted!",
                      text: "Your file has been deleted.",
                      icon: "success"
                    }),
                    setReload(!reload)
                    )
            }
          });
    }


  return (
    <div className='pb-[50px]'>
      <div className='pt-[50px] pb-[50px]'>
        <h1 className='text-3xl font-bold'>Your Listings</h1>
        <p className='font-[500]'>Manage your products mark items as Sold, update them, or delete them.</p>
      </div>
      
      <div className='flex flex-wrap gap-2 mb-[25px]'>
        <button
        onClick={allFunction}
        className={`${allstate? 'text-xl text-secondary font-bold border-b-4 border-secondary pl-[10px] pr-[10px]' :'text-xl font-bold border-b-4 border-transparent pl-[10px] pr-[10px]'}`}
        >All</button>
        <button
        onClick={unverified}
        className={`${authorizedState? 'text-xl text-secondary font-bold border-b-4 border-secondary pl-[10px] pr-[10px]' :'text-xl font-bold border-b-4 border-transparent pl-[10px] pr-[10px]'}`}
        >Live</button>
        <button
        onClick={SoldFunction}
        className={`${soldstate? 'text-xl text-secondary font-bold border-b-4 border-secondary pl-[10px] pr-[10px]' :'text-xl font-bold border-b-4 border-transparent pl-[10px] pr-[10px]'}`}
        >Sold</button>
      </div>
        <div>
            {
                products?.length > 0 ? 
                <div className='flex flex-col gap-4'>
                    {
                        products.map(product => 
                                <div className=' flex flex-col md:flex-row gap-2 items-center justify-between shadow-inner shadow-white rounded-md' key={product._id}>
                                    <div 
                            className='flex flex-col md:flex-row gap-2 items-center w-full'>
                                <div>
                                    <img
                                    className='w-full md:w-[250px] md:h-[150px] object-cover rounded-md'
                                    src={product.imgUrl} />
                                </div>
                                <div className="w-full p-[10px]">
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
                                </div>
                                </div>
                                <div className={`${product?.sold ? "hidden" :'p-[10px] flex gap-2 '}`}>
                                    <button title='sold'
                                    onClick={()=>sellFuction(product._id)}
                                    className={`${product.verify === "notVerified" ? "hidden" :'text-2xl text-white  border-2 border-secondary bg-primary rounded-md p-[10px]'}`}
                                    ><FaCheckCircle /></button>
                                    <Link to={`updateProducts/${product._id}`}>
                                    <button title='Modify'
                                    className='text-2xl text-white  border-2 border-secondary bg-primary rounded-md p-[10px]'
                                    ><FaPencilRuler/></button>
                                    </Link>
                                    <button title='Delete'
                                    onClick = {()=> deletingProduct(product._id)}
                                    className='text-2xl text-white  border-2 border-secondary bg-primary rounded-md p-[10px]'
                                    ><MdDelete/></button>
                                </div>
                            </div> )
                    }
                </div>
                : 
                <div className='flex flex-col h-[100vh] items-center justify-center text-xl font-bold'>
                    <h1>{soldstate? "You didn't sell any products yet." : "You didn't listed any products your"} </h1>
                </div>
            }
        </div>
    </div>
  )
}

export default UserProductsCollections
